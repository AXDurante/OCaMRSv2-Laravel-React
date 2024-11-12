import React, { useState } from "react"; // Import useState
import Navbar2 from "@/Layouts/Navbar2";
import Navbar from "../../Layouts/Navbar";
import TSRpdf from "./TSRpdf";
import { PDFViewer } from "@react-pdf/renderer"; // Removed PDFDownloadLink
import Modal from "react-modal"; // Import Modal
import { Link, useForm } from "@inertiajs/react";
import {
    FaTimesCircle,
    FaCheck,
    FaCheckCircle,
    FaHourglassHalf,
    FaSpinner,
    FaClock,
    FaFlag,
} from "react-icons/fa";

function TSR({ jobOrder, auth }) {
    const [showPreview, setShowPreview] = useState(false); // State to control preview visibility

    const handlePreviewClick = () => {
        setShowPreview(true); // Show the preview when the button is clicked
    };

    const closeModal = () => {
        setShowPreview(false); // Close the modal
    };

    // Update the useForm hook to match your TSR model fields
    const { data, setData, post, processing, errors } = useForm({
        tsr_num: "",
        instrument: "",
        model: "",
        serial_num: "",
        problemReported: "",
        diagnosis: "",
        actionTaken: "",
        recommendation: "Test",
        tsr_remarks: "",
        date_request: jobOrder.date_request,
        phone: jobOrder.user.phoneNumber,
        job_id: jobOrder.job_id,
        tech_id: `${auth.user.firstName} ${auth.user.lastName}`,
    });

    // Update the input fields to use setData instead of separate state variables
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    function onSubmit(e) {
        e.preventDefault();
        post(route("technician.store-tsr"));
    }

    console.log(jobOrder);
    return (
        <div className="container py-4">
            <h2 className="mb-4">
                Technical Service Report{" "}
                <span className="text-muted fw-light">| Create</span>
            </h2>

            <div className="card-container">
                <div className="row g-0">
                    {/* Left Sidebar */}
                    <div className="col-12 col-md-3">
                        <div className="card bg-dark text-white h-100 rounded-0 rounded-start rounded-bottom-md-start rounded-end-md-0">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <div className="mb-4">
                                    <i className="bi bi-file-text-fill fs-1"></i>
                                </div>
                                <h3 className="mb-3">
                                    TSR-{data.tsr_num || "000"}
                                </h3>

                                {/* Added Status Section */}
                                <div className="mb-4 text-center">
                                    <small className="text-muted d-block mb-1">
                                        Status
                                    </small>
                                    <span
                                        className={`badge ${
                                            jobOrder.status === "Cancelled"
                                                ? "bg-danger"
                                                : jobOrder.status === "Approved"
                                                ? "bg-success"
                                                : jobOrder.status ===
                                                  "Completed"
                                                ? "bg-info"
                                                : jobOrder.status ===
                                                  "For Approval"
                                                ? "bg-warning"
                                                : jobOrder.status ===
                                                  "Processing"
                                                ? "bg-primary"
                                                : jobOrder.status === "Pending"
                                                ? "bg-secondary"
                                                : "bg-secondary"
                                        } px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1`}
                                    >
                                        {jobOrder.status === "Cancelled" && (
                                            <FaTimesCircle />
                                        )}
                                        {jobOrder.status === "Approved" && (
                                            <FaCheck />
                                        )}
                                        {jobOrder.status === "Completed" && (
                                            <FaCheckCircle />
                                        )}
                                        {jobOrder.status === "For Approval" && (
                                            <FaHourglassHalf />
                                        )}
                                        {jobOrder.status === "Processing" && (
                                            <FaSpinner className="spinner-icon" />
                                        )}
                                        {jobOrder.status === "Pending" && (
                                            <FaClock />
                                        )}
                                        {jobOrder.status}
                                    </span>
                                </div>

                                {/* Added Priority Section */}
                                <div className="mb-4 text-center">
                                    <small className="text-muted d-block mb-1">
                                        Priority
                                    </small>
                                    <span
                                        className={`badge ${
                                            jobOrder.priority === "High"
                                                ? "bg-danger"
                                                : jobOrder.priority === "Medium"
                                                ? "bg-warning"
                                                : "bg-success"
                                        } px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1`}
                                    >
                                        <FaFlag />
                                        {jobOrder.priority}
                                    </span>
                                </div>

                                {/* Added Technician Info */}
                                <div className="mt-2 text-center">
                                    <small className="text-muted d-block mb-1">
                                        Technician
                                    </small>
                                    <div className="d-flex align-items-center gap-2">
                                        <i className="bi bi-person-circle"></i>
                                        <span>
                                            {auth.user.firstName}{" "}
                                            {auth.user.lastName}
                                        </span>
                                    </div>
                                </div>

                                {/* Added Date Info */}
                                <div className="mt-4 text-center">
                                    <small className="text-muted d-block mb-1">
                                        Created On
                                    </small>
                                    <div className="d-flex align-items-center gap-2">
                                        <i className="bi bi-calendar3"></i>
                                        <span>
                                            {new Date().toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="col-12 col-md-9">
                        <div className="card shadow-sm h-100 rounded-0 rounded-end rounded-top-md-end rounded-bottom-md-end mt-3 mt-md-0">
                            <div className="card-body">
                                <div className="row g-3">
                                    {/* Form fields */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            TSR Number*
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="tsr_num"
                                            value={data.tsr_num}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Date Requested
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={jobOrder.date_request}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Instrument*
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="instrument"
                                            value={data.instrument}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Tel No.
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={jobOrder.user.phoneNumber}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Model
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="model"
                                            value={data.model}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Serial No.
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="serial_num"
                                            value={data.serial_num}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-bold">
                                            Problem Reported
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="problemReported"
                                            value={data.problemReported}
                                            onChange={handleInputChange}
                                            rows="2"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-bold">
                                            Diagnosis/Observation
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="diagnosis"
                                            value={data.diagnosis}
                                            onChange={handleInputChange}
                                            rows="2"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-bold">
                                            Action Taken
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="actionTaken"
                                            value={data.actionTaken}
                                            onChange={handleInputChange}
                                            rows="2"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Recommendation
                                        </label>
                                        <select
                                            className="form-select"
                                            name="recommendation"
                                            value={data.recommendation}
                                            onChange={handleInputChange}
                                        >
                                            <option value="For Pull-Out">
                                                For Pull-Out
                                            </option>
                                            <option value="Forward to Supplier">
                                                Forward to Supplier
                                            </option>
                                            <option value="For Repair">
                                                For Repair
                                            </option>
                                            <option value="Beyond Repair">
                                                Beyond Repair
                                            </option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Remarks
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="tsr_remarks"
                                            value={data.tsr_remarks}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="col-12 mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary me-2"
                                            onClick={handlePreviewClick}
                                        >
                                            <i className="bi bi-eye me-1"></i>
                                            Preview PDF
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={onSubmit}
                                        >
                                            <i className="bi bi-save me-1"></i>
                                            Save Document
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PDF Preview Modal */}
            <Modal
                isOpen={showPreview}
                onRequestClose={closeModal}
                className="modal-lg"
                overlayClassName="modal-overlay"
                style={{
                    content: {
                        width: "90%",
                        height: "90%",
                        margin: "auto",
                        backgroundColor: "white",
                        borderRadius: "12px",
                        padding: "0",
                        border: "none",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        overflow: "hidden", // Prevents content from breaking the border radius
                    },
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1000,
                    },
                }}
            >
                <div className="modal-header d-flex justify-content-between align-items-center px-4 py-3">
                    <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-file-pdf text-primary"></i>
                        <span className="modal-title">Preview Document</span>
                    </div>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="close-button"
                        aria-label="Close"
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                <div
                    className="modal-body"
                    style={{ height: "calc(100% - 60px)" }}
                >
                    <PDFViewer
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                        }}
                    >
                        <TSRpdf
                            jobOrder={jobOrder}
                            reportDetails={{
                                ...data,
                                tech_id: `${auth.user.firstName} ${auth.user.lastName}`,
                            }}
                        />
                    </PDFViewer>
                </div>
            </Modal>
        </div>
    );
}

// Change Home to TSR
TSR.layout = (page) => <Navbar2>{page}</Navbar2>;

export default TSR;
