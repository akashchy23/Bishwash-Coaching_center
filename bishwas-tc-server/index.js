const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const express = require('express');
const cors = require("cors");
const port = 5000;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


const admin = require("firebase-admin");
const decoded = Buffer.from(process.env.FB_SERVICE_KEY, 'base64').toString('utf8')
const serviceAccount = JSON.parse(decoded);
console.log(admin);
console.log(admin.credential);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



const verifyFbToken = async (req, res, next) => {
  const token = req.headers.authorization
  // console.log(token)
  if (!token) {
    return res.status(401).send({ message: 'unauthorize access' })
  }

  try {
    const idToken = token.split(' ')[1]
    const decoded = await admin.auth().verifyIdToken(idToken)
    // console.log('decoded info', decoded)
    req.decoded_email = decoded.email
    next()
  }
  catch (error) {
    // console.log(error)
    return res.status(401).send({ message: 'unauthorize access' })
  }
}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dhzu8eh.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const database = client.db("bishwasDB");
    const studentCollection = database.collection("students");
    const batchCollection = database.collection("batches");
    const userCollection = database.collection("users")
    const todayDueCollection = database.collection("todayDuePayments");


    // Api for User List 

    app.post("/user", async (req, res) => {

      const user = req.body
      console.log(user)
      const existingUser = await userCollection.findOne({
        email: user.email,
      });

      if (existingUser) {
        return res.send({
          message: "User already exists",
          inserted: false,
        });
      }
      user.role = "staff";
      user.createdAt = new Date();
      const result = await userCollection.insertOne(user)
      res.send(result);
    })

    // api for total user
    app.get('/user', verifyFbToken, async (req, res) => {
      const result = await userCollection.find().project({
        name: 1,
        role: 1,
        _id: 0,
        email: 1
      }).toArray()
      res.send(result)
    })

    // api for user role check
    app.get('/user/role/:email', async (req, res) => {
      const { email } = req.params
      const query = { email: email }
      const result = await userCollection.findOne(query)
      res.send(result)
    })
    // ==========================================
    // BATCH MANAGEMENT ROUTES
    // ==========================================


    // Get all batches with dynamic available seat calculation
    app.get("/batches", verifyFbToken, async (req, res) => {
      try {
        const batches = await batchCollection.find().sort({ slot: 1 }).toArray();

        // Dynamically compute enrolled students for each batch
        const batchesWithDynamicSeats = await Promise.all(
          batches.map(async (batch) => {
            const enrolledCount = await studentCollection.countDocuments({
              batchNumber: { $regex: `^${batch.batchNumber}$`, $options: "i" }
            });

            const totalSeat = Number(batch.totalSeat) || 20;
            const availableSeat = Math.max(0, totalSeat - enrolledCount);

            return {
              ...batch,
              totalSeat,
              enrolledCount,
              availableSeat
            };
          })
        );

        res.send(batchesWithDynamicSeats);
      } catch (error) {
        console.error("Error fetching batches:", error);
        res.status(500).send({ message: "Failed to fetch batches" });
      }
    });

    // Create a new batch slot
    app.post("/batches", async (req, res) => {
      try {
        const batchData = req.body;

        const newBatch = {
          slot: batchData.slot,
          batchNumber: batchData.batchNumber,
          time: batchData.time,
          days: batchData.days,
          totalSeat: Number(batchData.totalSeat) || 20,
          createdAt: new Date()
        };

        const result = await batchCollection.insertOne(newBatch);
        res.status(201).send(result);
      } catch (error) {
        console.error("Error creating batch:", error);
        res.status(500).send({ message: "Failed to create batch" });
      }
    });

    // Update batch details by ID
    app.put("/batches/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedData = req.body;

        delete updatedData._id;

        const updatedDoc = {
          $set: {
            slot: updatedData.slot,
            batchNumber: updatedData.batchNumber,
            time: updatedData.time,
            days: updatedData.days,
            totalSeat: Number(updatedData.totalSeat) || 20,
            updatedAt: new Date()
          }
        };

        const result = await batchCollection.updateOne(filter, updatedDoc);

        if (result.matchedCount === 0) {
          return res.status(404).send({ message: "Batch not found" });
        }

        res.send(result);
      } catch (error) {
        console.error("Error updating batch:", error);
        res.status(500).send({ message: "Failed to update batch" });
      }
    });

    // Delete batch slot
    app.delete("/batches/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await batchCollection.deleteOne(filter);

        if (result.deletedCount === 0) {
          return res.status(404).send({ message: "Batch not found" });
        }

        res.send(result);
      } catch (error) {
        console.error("Error deleting batch:", error);
        res.status(500).send({ message: "Failed to delete batch" });
      }
    });

    // ==========================================
    // STUDENT & PAYMENT ROUTES
    // ==========================================

    // Create a new student with seat validation
    app.post("/students", async (req, res) => {
      try {
        const student = req.body;

        if (!student.batchNumber) {
          return res.status(400).send({ message: "Batch number is required" });
        }

        // Check current enrollment count for this batch
        const enrolledCount = await studentCollection.countDocuments({
          batchNumber: { $regex: `^${student.batchNumber}$`, $options: "i" }
        });

        // Find total seat capacity for this batch (default to 20 if not explicitly defined)
        const batchDoc = await batchCollection.findOne({
          batchNumber: { $regex: `^${student.batchNumber}$`, $options: "i" }
        });

        const maxSeats = batchDoc ? Number(batchDoc.totalSeat) : 20;

        if (enrolledCount >= maxSeats) {
          return res.status(400).send({
            message: `Batch #${student.batchNumber} is full. Maximum limit is ${maxSeats} students.`
          });
        }

        student.createdAt = new Date();
        const result = await studentCollection.insertOne(student);
        res.status(201).send(result);
      } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).send({ message: "Failed to create student record" });
      }
    });

    app.get("/students/recent", verifyFbToken, async (req, res) => {
      try {
        const result = await studentCollection
          .find()
          .sort({ createdAt: -1 })
          .limit(10)
          .toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    app.get("/students", verifyFbToken, async (req, res) => {
      try {
        const batch = req.query.batch;
        const query = {};

        if (batch) {
          query.batchNumber = {
            $regex: `^${batch}$`,
            $options: "i"
          };
        }

        const result = await studentCollection
          .find(query)
          .sort({ createdAt: -1 })
          .toArray();

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    app.put("/students/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedData = req.body;

        delete updatedData._id;

        const updatedDoc = {
          $set: {
            studentNameEnglish: updatedData.studentNameEnglish,
            mobileNumber: updatedData.mobileNumber,
            batchNumber: updatedData.batchNumber,
            preferredTime: updatedData.preferredTime,
            referenceName: updatedData.referenceName,
            paidAmount: Number(updatedData.paidAmount),
            duePayment: Number(updatedData.duePayment),
            updatedAt: new Date(),
          },
        };

        const result = await studentCollection.updateOne(filter, updatedDoc);

        if (result.matchedCount === 0) {
          return res.status(404).send({ message: "Student not found" });
        }

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to update student information" });
      }
    });

    app.delete("/students/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await studentCollection.deleteOne(query);

        if (result.deletedCount === 0) {
          return res.status(404).send({ message: "Student not found" });
        }

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to delete student record" });
      }
    });

    app.get("/payment-summary", async (req, res) => {
      try {
        const result = await studentCollection.aggregate([
          {
            $group: {
              _id: null,
              totalStudents: { $sum: 1 },
              totalAmount: {
                $sum: {
                  $add: [
                    { $ifNull: ["$paidAmount", 0] },
                    { $ifNull: ["$duePayment", 0] }
                  ]
                }
              },
              totalPaid: {
                $sum: {
                  $ifNull: ["$paidAmount", 0]
                }
              },
              totalDue: {
                $sum: {
                  $ifNull: ["$duePayment", 0]
                }
              }
            }
          }
        ]).toArray();

        res.send(result[0] || {
          totalStudents: 0,
          totalAmount: 0,
          totalPaid: 0,
          totalDue: 0,
        });

      } catch (err) {
        res.status(500).send({ message: "Server Error" });
      }
    });

    app.get("/payment-info", async (req, res) => {
      try {
        const result = await studentCollection.find(
          {},
          {
            projection: {
              studentNameEnglish: 1,
              mobileNumber: 1,
              batchNumber: 1,
              paidAmount: 1,
              duePayment: 1,
              createdAt: 1
            }
          }
        )
          .sort({ createdAt: -1 })
          .toArray();

        const paymentData = result.map(student => ({
          ...student,
          totalPayment:
            Number(student.paidAmount || 0) +
            Number(student.duePayment || 0)
        }));

        res.send(paymentData);

      } catch (err) {
        res.status(500).send({ message: "Server Error" });
      }
    });

    // ========================================
    // Today's Admission Students
    // ========================================

    app.get("/today-admission-students", async (req, res) => {
      try {
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const result = await studentCollection
          .find(
            {
              createdAt: {
                $gte: start,
                $lte: end,
              },
            },
            {
              projection: {
                _id: 1,
                studentNameEnglish: 1,
                batchNumber: 1,
                admissionDate: 1,
                paidAmount: 1,
              },
            }
          )
          .sort({ createdAt: -1 })
          .toArray();

        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({
          message: "Failed to load today's admission students",
        });
      }
    });
    // ---------------------------------------------------------------------------
    // ========================================
    // Save Today's Due Payment
    // ========================================

    app.post("/today-due-payment", async (req, res) => {
      try {
        const payment = req.body;

        if (!payment.studentName) {
          return res.status(400).send({
            message: "Student name is required",
          });
        }

        if (!payment.batchNumber) {
          return res.status(400).send({
            message: "Batch number is required",
          });
        }

        if (!payment.amount) {
          return res.status(400).send({
            message: "Amount is required",
          });
        }

        const duePayment = {
          studentName: payment.studentName,
          batchNumber: payment.batchNumber,
          amount: Number(payment.amount),
          createdAt: new Date(),
        };

        const result = await todayDueCollection.insertOne(duePayment);

        res.send(result);

      } catch (error) {
        console.log(error);

        res.status(500).send({
          message: "Failed to save due payment",
        });
      }
    });

    // ========================================
    // Get Today's Due Payments
    // ========================================

    app.get("/today-due-payment", async (req, res) => {

      try {

        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const result = await todayDueCollection.find({

          createdAt: {
            $gte: start,
            $lte: end,
          },

        })
          .sort({
            createdAt: -1,
          })
          .toArray();

        res.send(result);

      } catch (error) {

        console.log(error);

        res.status(500).send({
          message: "Failed to load due payments",
        });

      }

    });
    // ========================================
    // Delete Due Payment
    // ========================================

    app.delete("/today-due-payment/:id", async (req, res) => {

      try {

        const id = req.params.id;

        const result = await todayDueCollection.deleteOne({
          _id: new ObjectId(id),
        });

        res.send(result);

      } catch (error) {

        console.log(error);

        res.status(500).send({
          message: "Delete Failed",
        });

      }

    });
    // ========================================
    // Today's Payment Summary
    // ========================================

    app.get("/today-payment-summary", async (req, res) => {

      try {

        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        // Today's Admission Payment

        const admission = await studentCollection.aggregate([

          {
            $match: {
              createdAt: {
                $gte: start,
                $lte: end,
              },
            },
          },

          {
            $group: {

              _id: null,

              admissionPaid: {
                $sum: "$paidAmount",
              },

            },

          },

        ]).toArray();


        // Today's Due Payment

        const due = await todayDueCollection.aggregate([

          {
            $match: {

              createdAt: {

                $gte: start,
                $lte: end,

              },

            },

          },

          {

            $group: {

              _id: null,

              duePaid: {

                $sum: "$amount",

              },

            },

          },

        ]).toArray();

        const admissionPaid = admission[0]?.admissionPaid || 0;

        const duePaid = due[0]?.duePaid || 0;

        res.send({

          admissionPaid,

          duePaid,

          totalCollection: admissionPaid + duePaid,

        });

      } catch (error) {

        console.log(error);

        res.status(500).send({

          message: "Failed to load summary",

        });

      }

    });


    // ----------------------------------------------------------

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Connected to MongoDB!");
  } finally {
    // Keep connection open
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Bishwas Training Center');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});