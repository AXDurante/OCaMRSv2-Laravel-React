import React, { useState } from "react"; // Import useState
import AdminNavBar from "@/Layouts/AdminNavBar";
import Navbar from "../../Layouts/Navbar";
import TSRpdf from "./TSRpdf";
import { PDFViewer } from "@react-pdf/renderer"; // Removed PDFDownloadLink
import Modal from "react-modal"; // Import Modal
import { Link, useForm } from "@inertiajs/react";
import {
    FaCheckCircle,
    FaTimesCircle,
    FaHourglassHalf,
    FaSpinner,
    FaClock,
    FaFlag,
    FaCheck,
} from "react-icons/fa";

function EditTSR({ jobOrder, auth, tsr }) {
    const [showPreview, setShowPreview] = useState(false); // State to control preview visibility
    const [includeSignature, setIncludeSignature] = useState(false); // Add this state
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePreviewClick = () => {
        setShowPreview(true); // Show the preview when the button is clicked
    };

    const closeModal = () => {
        setShowPreview(false); // Close the modal
    };

    // Initialize useForm with existing TSR data
    const { data, setData, put, processing } = useForm({
        tsr_num: tsr.tsr_num || '',
        instrument: tsr.instrument || '',
        model: tsr.model || '',
        serial_num: tsr.serial_num || '',
        problemReported: tsr.problemReported || '',
        diagnosis: tsr.diagnosis || '',
        actionTaken: tsr.actionTaken || '',
        recommendation: tsr.recommendation || '',
        tsr_remarks: tsr.tsr_remarks || '',
        date_request: tsr.date_request || jobOrder.date_request,
        phone: tsr.phone || jobOrder.user.phoneNumber,
        job_id: tsr.job_id || jobOrder.job_id,
        tech_id: tsr.tech_id,
        tech_photo: tsr.tech_photo,
        admin_photo: tsr.admin_photo || "", // Add this field
        admin_name: tsr.admin_name || "",
    });

    // Update the input fields to use setData instead of separate state variables
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    // Handle checkbox change
    const handleSignatureChange = (e) => {
        const isChecked = e.target.checked;
        setIncludeSignature(isChecked);
        setData({
            ...data,
            admin_photo: isChecked ? auth.user.photo : null,
            admin_name: isChecked
                ? `${auth.user.firstName} ${auth.user.lastName}`
                : null,
        });
    };

    async function onSubmit(e) {
        e.preventDefault();

        if (isSubmitting || processing) return;
        
        // Clear all previous errors first
        setErrors({});
        setIsSubmitting(true);

        let validationErrors = {};
        let hasErrors = false;

        if (!data.tsr_num) {
            validationErrors.tsr_num = "Please enter a TSR number.";
            hasErrors = true;
        }

        if (!data.problemReported) {
            validationErrors.problemReported = "Please enter input, or type `N/A`.";
            hasErrors = true;
        }

        if (!data.diagnosis) {
            validationErrors.diagnosis = "Please enter input, or type `N/A`.";
            hasErrors = true;
        }

        if (!data.actionTaken) {
            validationErrors.actionTaken = "Please enter input, or type `N/A`.";
            hasErrors = true;
        }

        if (!data.recommendation) {
            validationErrors.recommendation = "Please select from the dropdown.";
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(validationErrors);
            setIsSubmitting(false); // Reset submitting state if validation fails
            return;
        }

        try {
            setIsSubmitting(true);
            await put(route('admin.updateTSR', tsr.tsr_id), {               
                    onSuccess: () => {
                    setIsSubmitting(false);
                },
                onError: (errors) => {
                    setErrors(errors);
                    setIsSubmitting(false);
                },
            });
        } catch (error) {
            console.error('Submission error:', error);
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4">
                Technical Service Report{" "}
                <span className="text-muted fw-light">| Edit #{tsr.tsr_id}</span>
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

                                {/* Status Section */}
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

                                {/* Priority Section */}
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

                                {/* Technician Info */}
                                <div className="mt-2 text-center">
                                    <small className="text-muted d-block mb-1">
                                        Technician
                                    </small>
                                    <div className="d-flex align-items-center gap-2">
                                        <i className="bi bi-person-circle"></i>
                                        <span>{data.tech_id}</span>
                                    </div>
                                </div>

                                {/* Date Info */}
                                <div className="mt-4 text-center">
                                    <small className="text-muted d-block mb-1">
                                        Created On
                                    </small>
                                    <div className="d-flex align-items-center gap-2">
                                        <i className="bi bi-calendar3"></i>
                                        <span>{data.date_request}</span>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <Link
                                        href={route("admin.viewTSRDetails", tsr.tsr_id)}
                                    >
                                        <button className="btn btn-light w-100 mb-2">
                                                <i className="bi bi-file-earmark-text-fill me-2"></i>
                                            Return to Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="col-12 col-md-9">
                        <div className="card shadow-sm h-100 rounded-0 rounded-end rounded-top-md-end rounded-bottom-md-end mt-3 mt-md-0">
                            <div className="card-body">
                                <div className="row g-3">
                                <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            TSR Number*
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.tsr_num ? 'input-error' : ''}`}
                                            name="tsr_num"
                                            value={data.tsr_num}
                                            onChange={handleInputChange}
                                            placeholder="Enter TSR Number"
                                        />
                                        {errors.tsr_num && (
                                            <div className="error-message">
                                                <i className="bi bi-exclamation-circle me-2"></i>
                                                {errors.tsr_num}
                                            </div>
                                        )}
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
                                            Instrument
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
                                            Problem Reported*
                                        </label>
                                        <textarea
                                            className={`form-control ${errors.problemReported ? 'input-error' : ''}`}
                                            name="problemReported"
                                            value={data.problemReported}
                                            onChange={handleInputChange}
                                            rows="2"
                                            placeholder="Enter Problem Reported or type N/A"
                                        />
                                        {errors.problemReported && (
                                            <div className="error-message">
                                                <i className="bi bi-exclamation-circle me-2"></i>
                                                {errors.problemReported}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-bold">
                                            Diagnosis/Observation*
                                        </label>
                                        <textarea
                                            className={`form-control ${errors.diagnosis ? 'input-error' : ''}`}
                                            name="diagnosis"
                                            value={data.diagnosis}
                                            onChange={handleInputChange}
                                            rows="2"
                                            placeholder="Enter Diagnosis/Observation or type N/A"
                                        />
                                        {errors.diagnosis && (
                                            <div className="error-message">
                                                <i className="bi bi-exclamation-circle me-2"></i>
                                                {errors.diagnosis}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-bold">
                                            Action Taken*
                                        </label>
                                        <textarea
                                            className={`form-control ${errors.actionTaken ? 'input-error' : ''}`}
                                            name="actionTaken"
                                            value={data.actionTaken}
                                            onChange={handleInputChange}
                                            rows="2"
                                            placeholder="Enter Action Taken or type N/A"
                                        />
                                        {errors.actionTaken && (
                                            <div className="error-message">
                                                <i className="bi bi-exclamation-circle me-2"></i>
                                                {errors.actionTaken}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Recommendation*
                                        </label>
                                        <div>
                                            <select
                                                className={`form-input ${errors.recommendation ? 'input-error' : ''}`}
                                                name="recommendation"
                                                value={data.recommendation}
                                                onChange={handleInputChange}
                                            >
                                                <option value="" disabled>
                                                    Please Select an Option
                                                </option>
                                                <option value="None">
                                                    None
                                                </option>
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
                                            {errors.recommendation && (
                                            <div className="error-message">
                                                <i className="bi bi-exclamation-circle me-2"></i>
                                                {errors.recommendation}
                                            </div>
                                        )}
                                        </div>
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
                                            className="btn btn-primary me-2"
                                            onClick={onSubmit}
                                        >
                                            <i className="bi bi-save me-1"></i>
                                            Save Changes
                                        </button>
                                        <input
                                             type="checkbox"
                                            className="custom-checkbox"
                                            id="includeSignature"
                                            checked={includeSignature}
                                            onChange={handleSignatureChange}
                                        />
                                        <label
                                            className="custom-checkbox-label text-muted ms-2"
                                            htmlFor="includeSignature"
                                        >
                                            Include my signature in this TSR
                                        </label>     
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
                        overflow: "hidden",
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
                                tech_id: data.tech_id,
                                ...(includeSignature && {
                                    admin_signature: `/storage/photos/adminSignature/${auth.user.photo}`,
                                    admin_name: `${auth.user.firstName} ${auth.user.lastName}`,
                                }),
                            }}
                        />
                    </PDFViewer>
                </div>
            </Modal>
        </div>
    );
}

// Change Home to TSR
EditTSR.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default EditTSR;
