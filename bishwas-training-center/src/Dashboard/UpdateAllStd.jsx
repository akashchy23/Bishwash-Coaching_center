import React, { useState } from "react";
import useAxios from "../hook/useAxios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  FaSearch,
  FaFilePdf,
  FaUserGraduate,
  FaEdit,
  FaTrashAlt,
  FaExclamationTriangle,
  FaTimes,
} from "react-icons/fa";
import useAxiosSecure from "../hook/useAxiosSecure";

const UpdateAllStd = () => {
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  const [batchNumber, setBatchNumber] = useState("");
  const [students, setStudents] = useState([]);

  // Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({
    studentNameEnglish: "",
    mobileNumber: "",
    batchNumber: "",
    preferredTime: "",
    referenceName: "",
    admissionDate: "",
    paidAmount: "",
    duePayment: "",
  });

  const handleSearch = () => {
    if (!batchNumber) {
      alert("Please enter Batch Number");
      return;
    }

    axiosSecure
      .get(`/students?batch=${batchNumber}`)
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => console.log(err));
  };

  // --- DELETE LOGIC ---
  const openDeleteModal = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedStudent) return;

    axiosInstance
      .delete(`/students/${selectedStudent._id}`)
      .then(() => {
        setStudents((prev) =>
          prev.filter((item) => item._id !== selectedStudent._id)
        );
        setIsDeleteModalOpen(false);
        setSelectedStudent(null);
      })
      .catch((err) => {
        console.error("Error deleting student:", err);
        alert("Failed to delete student");
      });
  };

  // --- EDIT LOGIC ---
  const openEditModal = (student) => {
    setSelectedStudent(student);
    setEditFormData({
      studentNameEnglish: student.studentNameEnglish || "",
      mobileNumber: student.mobileNumber || "",
      batchNumber: student.batchNumber || "",
      preferredTime: student.preferredTime || "",
      referenceName:
        student.referenceName || student.reference || "",
      admissionDate: student.admissionDate || "",
      paidAmount: student.paidAmount || 0,
      duePayment: student.duePayment || 0,
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateStudent = (e) => {
    e.preventDefault();
    if (!selectedStudent) return;

    axiosInstance
      .put(`/students/${selectedStudent._id}`, editFormData)
      .then((res) => {
        setStudents((prev) =>
          prev.map((item) =>
            item._id === selectedStudent._id
              ? { ...item, ...editFormData }
              : item
          )
        );
        setIsEditModalOpen(false);
        setSelectedStudent(null);
      })
      .catch((err) => {
        console.error("Error updating student:", err);
        alert("Failed to update student information");
      });
  };

  // --- PDF EXPORT ---
  const handleExportPDF = () => {
    if (students.length === 0) {
      alert("No student data found!");
      return;
    }

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Bishwas Mobile Training Institute", 14, 15);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Batch Number: ${batchNumber}`, 14, 22);

    autoTable(doc, {
      startY: 28,
      margin: { left: 8, right: 8 },
      head: [
        [
          "#",
          "Student Name",
          "Mobile",
          "Batch",
          "Batch Time",
          "Adm. Date",
          "Reference",
          "Paid",
          "Due",
        ],
      ],
      body: students.map((student, index) => [
        index + 1,
        student.studentNameEnglish,
        student.mobileNumber,
        student.batchNumber,
        student.preferredTime,
        student.admissionDate || "N/A",
        student.referenceName || student.reference || "Direct",
        `BDT ${student.paidAmount}`,
        `BDT ${student.duePayment}`,
      ]),
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: 255,
        halign: "center",
        fontStyle: "bold",
      },
      bodyStyles: {
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 7 },
        1: { cellWidth: 35, halign: "left" },
        2: { cellWidth: 26 },
        3: { cellWidth: 20 },
        4: { cellWidth: 22 },
        5: { cellWidth: 22 },
        6: { cellWidth: 22 },
        7: { cellWidth: 20 },
        8: { cellWidth: 20 },
      },
    });

    doc.save(`${batchNumber}-Student-List.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-6 lg:p-8">
      {/* Search Header Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Student Information
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Search and view students enrolled by Batch Number
        </p>

        {/* Search Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mt-5 sm:mt-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter Batch Number (e.g. BMTI-001)"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl sm:rounded-lg px-4 py-2.5 text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleSearch}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl sm:rounded-lg text-sm transition shadow-xs cursor-pointer active:scale-95"
            >
              <FaSearch className="text-xs" />
              <span>Search</span>
            </button>

            <button
              onClick={handleExportPDF}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-xl sm:rounded-lg text-sm transition shadow-xs cursor-pointer active:scale-95"
            >
              <FaFilePdf className="text-xs" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Data Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs mt-6 overflow-hidden">
        
        {/* --- MOBILE CARD VIEW (< sm) --- */}
        <div className="block sm:hidden divide-y divide-gray-100">
          {students.length > 0 ? (
            students.map((student, index) => (
              <div key={student._id} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h3 className="font-bold text-gray-900 text-base">
                      {student.studentNameEnglish}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(student)}
                      title="Edit Student"
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <FaEdit className="text-base" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(student)}
                      title="Delete Student"
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <FaTrashAlt className="text-base" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400 block">Mobile</span>
                    <span className="font-mono font-medium text-gray-700">
                      {student.mobileNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Batch</span>
                    <span className="font-semibold text-blue-600">
                      {student.batchNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Batch Time</span>
                    <span className="font-medium text-gray-600">
                      {student.preferredTime || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Admission Date</span>
                    <span className="font-medium text-gray-700">
                      {student.admissionDate || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Reference</span>
                    <span className="inline-block bg-purple-50 border border-purple-100 text-purple-700 px-2 py-0.5 rounded text-[11px] font-semibold mt-0.5">
                      {student.referenceName || student.reference || "Direct"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-xs font-semibold">
                  <div>
                    <span className="text-gray-400 mr-1">Paid:</span>
                    <span className="text-emerald-600">BDT {student.paidAmount}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 mr-1">Due:</span>
                    <span className="text-rose-600">BDT {student.duePayment}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaUserGraduate className="text-xl" />
              </div>
              <h3 className="text-base font-semibold text-gray-800">
                No Student Found
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Enter a batch number above to search and fetch records.
              </p>
            </div>
          )}
        </div>

        {/* --- DESKTOP/TABLET TABLE VIEW (≥ sm) --- */}
        <div className="hidden sm:block overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 text-center whitespace-nowrap">#</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Student Name</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Mobile</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Batch</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Batch Time</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Admission Date</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Reference</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Paid</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Due</th>
                <th className="py-3.5 px-4 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr
                    key={student._id}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-center font-medium text-gray-400 whitespace-nowrap">
                      {index + 1}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-gray-900 whitespace-nowrap">
                      {student.studentNameEnglish}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-gray-600 whitespace-nowrap">
                      {student.mobileNumber}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-blue-600 whitespace-nowrap">
                      {student.batchNumber}
                    </td>

                    <td className="py-3.5 px-4 font-medium text-gray-600 whitespace-nowrap">
                      {student.preferredTime}
                    </td>

                    <td className="py-3.5 px-4 font-medium text-gray-600 whitespace-nowrap">
                      {student.admissionDate || "N/A"}
                    </td>

                    <td className="py-3.5 px-4 font-medium text-purple-700 whitespace-nowrap">
                      <span className="bg-purple-50 border border-purple-100 text-purple-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                        {student.referenceName || student.reference || "Direct"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-emerald-600 whitespace-nowrap">
                      <span className="text-xs font-medium text-emerald-500 mr-1">BDT</span>
                      {student.paidAmount}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-rose-600 whitespace-nowrap">
                      <span className="text-xs font-medium text-rose-500 mr-1">BDT</span>
                      {student.duePayment}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(student)}
                          title="Edit Student"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <FaEdit className="text-base" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(student)}
                          title="Delete Student"
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <FaTrashAlt className="text-base" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-12 px-4">
                    <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaUserGraduate className="text-xl" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-800">
                      No Student Found
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Enter a batch number above to search and fetch records.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaExclamationTriangle className="text-xl" />
            </div>

            <h3 className="text-lg font-bold text-gray-900 text-center">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-500 text-center mt-2">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                {selectedStudent?.studentNameEnglish}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-lg transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT STUDENT MODAL --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-lg w-full shadow-xl border border-gray-100 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Update Student Information
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleUpdateStudent} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  name="studentNameEnglish"
                  value={editFormData.studentNameEnglish}
                  onChange={handleEditChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Mobile
                  </label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={editFormData.mobileNumber}
                    onChange={handleEditChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Batch
                  </label>
                  <input
                    type="text"
                    name="batchNumber"
                    value={editFormData.batchNumber}
                    onChange={handleEditChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Batch Time
                  </label>
                  <input
                    type="text"
                    name="preferredTime"
                    value={editFormData.preferredTime}
                    onChange={handleEditChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Admission Date
                  </label>
                  <input
                    type="date"
                    name="admissionDate"
                    value={editFormData.admissionDate}
                    onChange={handleEditChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Reference
                </label>
                <input
                  type="text"
                  name="referenceName"
                  value={editFormData.referenceName}
                  onChange={handleEditChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Paid Amount (BDT)
                  </label>
                  <input
                    type="number"
                    name="paidAmount"
                    value={editFormData.paidAmount}
                    onChange={handleEditChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Due Payment (BDT)
                  </label>
                  <input
                    type="number"
                    name="duePayment"
                    value={editFormData.duePayment}
                    onChange={handleEditChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition cursor-pointer"
                >
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

export default UpdateAllStd;