import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSave,
  FaTimes,
  FaClock,
  FaCalendarAlt,
  FaChair,
  FaLayerGroup,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../hook/useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";

const BatchRelease = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [batches, setBatches] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const [formData, setFormData] = useState({
    slot: "",
    batchNumber: "",
    time: "",
    days: "",
    totalSeat: 20,
    availableSeat: 20,
  });

  // Fetch batches
  const fetchBatches = useCallback(async () => {
    try {
      setDataLoading(true);
      const res = await axiosSecure.get("/batches");
      setBatches(res.data);
    } catch (err) {
      console.error("Error fetching batches:", err);
    } finally {
      setDataLoading(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    if (!authLoading && user) {
      fetchBatches();
    }
  }, [fetchBatches, authLoading, user]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // Submit new batch
  const handleCreateBatch = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axiosSecure.post("/batches", formData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Released!",
          text: "Batch released successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
        setFormData({
          slot: "",
          batchNumber: "",
          time: "",
          days: "",
          totalSeat: 20,
          availableSeat: 20,
        });
        fetchBatches();
      }
    } catch (err) {
      console.error("Failed to create batch:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to release batch.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Update existing batch
  const handleUpdateBatch = async (e) => {
    e.preventDefault();
    if (!selectedBatch) return;

    setSubmitting(true);
    try {
      const res = await axiosSecure.put(
        `/batches/${selectedBatch._id}`,
        selectedBatch
      );

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Batch updated successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
        setSelectedBatch(null);
        fetchBatches();
      }
    } catch (err) {
      console.error("Failed to update batch:", err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.message || "Failed to update batch.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Delete batch
  const handleDeleteBatch = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this batch slot?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/batches/${id}`);

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Batch slot has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchBatches();
      }
    } catch (err) {
      console.error("Failed to delete batch:", err);
      Swal.fire({
        icon: "error",
        title: "Deletion Failed",
        text: err.response?.data?.message || "Failed to delete batch.",
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center gap-4 p-4">
        <span className="loading loading-bars loading-lg text-primary"></span>
        <p className="text-gray-500 text-sm sm:text-base font-medium animate-pulse text-center">
          Authenticating user...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-6 sm:space-y-12">
      {/* SECTION 1: CREATE NEW BATCH FORM */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaPlus className="text-blue-600 text-lg sm:text-xl shrink-0" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Release New Batch Slot
          </h2>
        </div>

        <form
          onSubmit={handleCreateBatch}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Slot Number
            </label>
            <input
              type="text"
              name="slot"
              placeholder="e.g. 01"
              value={formData.slot}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Batch Number
            </label>
            <input
              type="text"
              name="batchNumber"
              placeholder="e.g. 01"
              value={formData.batchNumber}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Class Time
            </label>
            <input
              type="text"
              name="time"
              placeholder="e.g. 9:00 AM - 11:00 AM"
              value={formData.time}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Schedule Days
            </label>
            <input
              type="text"
              name="days"
              placeholder="e.g. Sat • Mon • Wed"
              value={formData.days}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Total Seats
            </label>
            <input
              type="number"
              name="totalSeat"
              value={formData.totalSeat}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Available Seats
            </label>
            <input
              type="number"
              name="availableSeat"
              value={formData.availableSeat}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div className="md:col-span-2 lg:col-span-3 flex justify-end mt-2 sm:mt-4">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary w-full sm:w-auto sm:px-8 gap-2"
            >
              {submitting && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
              Release Batch
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: BATCH LIST & EDIT */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
          Active Released Batches
        </h2>

        {dataLoading ? (
          <div className="py-12 flex flex-col justify-center items-center gap-3">
            <span className="loading loading-spinner loading-md text-blue-600"></span>
            <p className="text-sm text-gray-500 font-medium">
              Fetching active batches...
            </p>
          </div>
        ) : batches.length === 0 ? (
          <p className="text-gray-500 text-sm sm:text-base">
            No active batch slots released yet.
          </p>
        ) : (
          <div>
            {/* MOBILE CARD VIEW (< sm) */}
            <div className="block sm:hidden space-y-4">
              {batches.map((batch) => (
                <div
                  key={batch._id}
                  className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <span className="font-bold text-blue-600 text-base">
                      Slot #{batch.slot}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Batch #{batch.batchNumber}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <FaClock className="text-gray-400 shrink-0" />
                      <span className="truncate">{batch.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-gray-400 shrink-0" />
                      <span className="truncate">{batch.days}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-1.5 mt-1">
                      <FaChair className="text-gray-400 shrink-0" />
                      <span>
                        Seats: <strong>{batch.availableSeat}</strong> available /{" "}
                        <strong>{batch.totalSeat}</strong> total
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => setSelectedBatch(batch)}
                      className="btn btn-xs btn-outline btn-info flex-1 gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBatch(batch._id)}
                      className="btn btn-xs btn-outline btn-error flex-1 gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP/TABLET TABLE VIEW (≥ sm) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="table w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-left">
                    <th className="p-4">Slot</th>
                    <th className="p-4">Batch</th>
                    <th className="p-4">Time</th>
                    <th className="p-4">Days</th>
                    <th className="p-4">Seats (Total / Avail)</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {batches.map((batch) => (
                    <tr
                      key={batch._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 font-bold">#{batch.slot}</td>
                      <td className="p-4">#{batch.batchNumber}</td>
                      <td className="p-4">{batch.time}</td>
                      <td className="p-4">{batch.days}</td>
                      <td className="p-4">
                        {batch.totalSeat} / {batch.availableSeat}
                      </td>
                      <td className="p-4 text-center space-x-3">
                        <button
                          onClick={() => setSelectedBatch(batch)}
                          className="btn btn-sm btn-outline btn-info gap-2"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBatch(batch._id)}
                          className="btn btn-sm btn-outline btn-error gap-2"
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {selectedBatch && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-3 sm:p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-2xl shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedBatch(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <FaTimes className="text-lg sm:text-xl" />
            </button>

            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 pr-8">
              Edit Batch #{selectedBatch.batchNumber}
            </h3>

            <form
              onSubmit={handleUpdateBatch}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
            >
              <div>
                <label className="text-xs font-semibold text-gray-500">
                  Slot
                </label>
                <input
                  type="text"
                  value={selectedBatch.slot}
                  onChange={(e) =>
                    setSelectedBatch({
                      ...selectedBatch,
                      slot: e.target.value,
                    })
                  }
                  className="input input-bordered w-full mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500">
                  Batch Number
                </label>
                <input
                  type="text"
                  value={selectedBatch.batchNumber}
                  onChange={(e) =>
                    setSelectedBatch({
                      ...selectedBatch,
                      batchNumber: e.target.value,
                    })
                  }
                  className="input input-bordered w-full mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500">
                  Time
                </label>
                <input
                  type="text"
                  value={selectedBatch.time}
                  onChange={(e) =>
                    setSelectedBatch({
                      ...selectedBatch,
                      time: e.target.value,
                    })
                  }
                  className="input input-bordered w-full mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500">
                  Days
                </label>
                <input
                  type="text"
                  value={selectedBatch.days}
                  onChange={(e) =>
                    setSelectedBatch({
                      ...selectedBatch,
                      days: e.target.value,
                    })
                  }
                  className="input input-bordered w-full mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500">
                  Total Seats
                </label>
                <input
                  type="number"
                  value={selectedBatch.totalSeat}
                  onChange={(e) =>
                    setSelectedBatch({
                      ...selectedBatch,
                      totalSeat: Number(e.target.value),
                    })
                  }
                  className="input input-bordered w-full mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500">
                  Available Seats
                </label>
                <input
                  type="number"
                  value={selectedBatch.availableSeat}
                  onChange={(e) =>
                    setSelectedBatch({
                      ...selectedBatch,
                      availableSeat: Number(e.target.value),
                    })
                  }
                  className="input input-bordered w-full mt-1"
                />
              </div>

              <div className="col-span-1 sm:col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedBatch(null)}
                  className="btn btn-ghost w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary gap-2 w-full sm:w-auto"
                >
                  {submitting ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <FaSave />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchRelease;