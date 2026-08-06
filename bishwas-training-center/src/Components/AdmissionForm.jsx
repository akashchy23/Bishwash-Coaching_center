import React, { useState } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaMoneyBillWave,
  FaCheckCircle,
  FaUndo,
  FaSpinner,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../hook/useAxios";

const AdmissionForm = () => {
  const axiosInstance = useAxios();

  // State for live calculation of Due Payment & Loading status
  const [totalPayment, setTotalPayment] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const dueAmount = Math.max(totalPayment - paidAmount, 0);

  // Dedicated handler function for form submission
  const handleStudentInfo = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const studentInfo = {
      studentNameBangla: form.studentNameBangla.value,
      studentNameEnglish: form.studentNameEnglish.value,
      fatherName: form.fatherName.value,
      motherName: form.motherName.value,
      dob: form.dob.value,
      gender: form.gender.value,
      presentAddress: form.presentAddress.value,
      permanentAddress: form.permanentAddress.value,
      city: form.city.value,
      division: form.division.value,
      postalCode: form.postalCode.value,
      country: form.country.value,
      mobileNumber: form.mobileNumber.value,
      guardianMobileNumber: form.guardianMobileNumber.value,
      bloodGroup: form.bloodGroup.value,
      nidOrBirthCert: form.nidOrBirthCert.value,
      batchNumber: form.batchNumber.value,
      preferredTime: form.preferredTime.value,
      courseDuration: form.courseduration.value,
      referenceName: form.reference.value,
      admissionDate: form.admissionDate.value,
      totalPayment: Number(form.totalPayment.value),
      paidAmount: Number(form.paidAmount.value),
      duePayment: dueAmount, // calculated live value
    };

    axiosInstance
      .post("/students", studentInfo)
      .then((res) => {
        setLoading(false);
        if (res.data.insertedId || res.data.success) {
          Swal.fire({
            title: "Success!",
            text: "Student admission form submitted successfully.",
            icon: "success",
            confirmButtonColor: "#059669", // Tailwind emerald-600
          });
          form.reset();
          setTotalPayment(0);
          setPaidAmount(0);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error submitting form:", error);
        Swal.fire({
          title: "Submission Failed!",
          text: "Failed to submit form. Please check backend connection.",
          icon: "error",
          confirmButtonColor: "#dc2626", // Tailwind red-600
        });
      });
  };

  const handleReset = (e) => {
    e.preventDefault();
    const form = e.target.closest("form");

    Swal.fire({
      title: "Are you sure?",
      text: "This will clear all entered form data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reset it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (form) form.reset();
        setTotalPayment(0);
        setPaidAmount(0);
        Swal.fire({
          title: "Reset!",
          text: "Form has been cleared.",
          icon: "info",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-8 lg:p-10">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 pb-6 border-b border-gray-100">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            বিশ্বাস মোবাইল ট্রেনিং ইন্সটিটিউট
          </h1>
          <p className="text-xs sm:text-sm font-medium text-gray-500 mt-2">
            Student Admission Form
          </p>
        </div>

        <form onSubmit={handleStudentInfo} className="space-y-8">
          {/* Personal Information Section */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaUser className="text-emerald-600 text-sm" />
              Personal Information
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {/* Student Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Student's Name (Bangla)
                  </label>
                  <input
                    type="text"
                    name="studentNameBangla"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    placeholder="Enter student's name in Bangla"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Student's Name (English)
                  </label>
                  <input
                    type="text"
                    name="studentNameEnglish"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    placeholder="Enter student's name in English"
                    required
                  />
                </div>
              </div>

              {/* Parents */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    placeholder="Enter father's name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    placeholder="Enter mother's name"
                    required
                  />
                </div>
              </div>

              {/* DOB + Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Gender
                  </label>
                  <select
                    name="gender"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Mobile Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    placeholder="+8801XXXXXXXXX"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Guardian Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="guardianMobileNumber"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    placeholder="+8801XXXXXXXXX"
                    required
                  />
                </div>
              </div>

              {/* Blood Group & NID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select Blood Group
                    </option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    National ID / Birth Certificate No.
                  </label>
                  <input
                    type="text"
                    name="nidOrBirthCert"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    placeholder="Enter NID or Birth Certificate Number"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-emerald-600 text-sm" />
              Address Details
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {/* Present & Permanent Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Present Address
                  </label>
                  <textarea
                    rows={3}
                    name="presentAddress"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    placeholder="Enter Present Address"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Permanent Address
                  </label>
                  <textarea
                    rows={3}
                    name="permanentAddress"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    placeholder="Enter Permanent Address"
                    required
                  ></textarea>
                </div>
              </div>

              {/* City & Division */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    placeholder="City"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Division
                  </label>
                  <input
                    type="text"
                    name="division"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    placeholder="Division"
                    required
                  />
                </div>
              </div>

              {/* Postal Code & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    placeholder="Postal Code"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Country
                  </label>
                  <select
                    name="country"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    defaultValue="Bangladesh"
                    required
                  >
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="India">India</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Nepal">Nepal</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Batch Information Section */}
          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaGraduationCap className="text-emerald-600 text-sm" />
              Batch Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Batch Number
                </label>
                <input
                  type="text"
                  name="batchNumber"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                  placeholder="Enter Batch Number"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Preferred Time
                </label>
                <select
                  name="preferredTime"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select Batch Time
                  </option>
                  <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                  <option value="11:30 AM - 1:30 PM">11:30 AM - 1:30 PM</option>
                  <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                  <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Admission Date
                </label>
                <input
                  type="date"
                  name="admissionDate"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Course Duration
                </label>
                <input
                  type="text"
                  name="courseduration"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                  placeholder="Enter Course Duration"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Reference
                </label>
                <input
                  type="text"
                  name="reference"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                  placeholder="Enter Reference"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Information Section */}
          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaMoneyBillWave className="text-emerald-600 text-sm" />
              Payment Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {/* Total Payment */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Total Payment (BDT)
                </label>
                <input
                  type="number"
                  name="totalPayment"
                  onChange={(e) =>
                    setTotalPayment(Number(e.target.value) || 0)
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                  placeholder="5000"
                  required
                />
              </div>

              {/* Paid Amount */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Paid Amount (BDT)
                </label>
                <input
                  type="number"
                  name="paidAmount"
                  onChange={(e) => setPaidAmount(Number(e.target.value) || 0)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                  placeholder="3000"
                  required
                />
              </div>

              {/* Due Payment */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Due Payment (BDT)
                </label>
                <input
                  type="number"
                  name="duePayment"
                  value={dueAmount}
                  readOnly
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm font-bold text-red-600 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-2.5 rounded-lg text-sm transition shadow-xs cursor-pointer disabled:opacity-50"
            >
              <FaUndo className="text-xs" />
              Reset Form
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-2.5 rounded-lg text-sm transition shadow-xs cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-xs" />
                  Submitting...
                </>
              ) : (
                <>
                  <FaCheckCircle className="text-xs" />
                  Submit Admission
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;