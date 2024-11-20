import React, { useState } from "react"; // Ensure useState is imported
import Navbar2 from "@/Layouts/Navbar2";
import { PDFViewer } from "@react-pdf/renderer"; // Removed PDFDownloadLink
import Modal from "react-modal";
import COCpdf from "./COCpdf";
import { usePage, useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import {
    FaCheckCircle,
    FaFlag,
    FaEdit,
    FaTimesCircle,
    FaHourglassHalf,
    FaSpinner,
    FaClock,
} from "react-icons/fa"; // Import icons

function ViewCOCDetails({ coc, auth }) {
    const [showPreview, setShowPreview] = useState(false); // Define showPreview state

    // Ensure tsr is accessed correctly
    const tsr = coc.tsr; // Assuming tsr is a property of coc

    const handlePreviewClick = () => {
        setShowPreview(true); // Show the preview when the button is clicked
    };

    const closeModal = () => {
        setShowPreview(false); // Close the modal
    };

    console.log(coc);
    return (
        <div className="container py-4">
            <h2 className="mb-4">
                Certificate of Calibration{" "}
                <span className="text-muted fw-light">| View #{coc.coc_id}</span>
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
                                    COC-{coc.coc_num || "000"}
                                </h3>

                                {/* Status Section */}
                                <div className="mb-4 text-center">
                                    <small className="text-muted d-block mb-1">
                                        Status
                                    </small>
                                    <span
                                        className={`badge ${
                                            tsr.job_order.status === "Cancelled"
                                                ? "bg-danger"
                                                : tsr.job_order.status ===
                                                  "Approved"
                                                ? "bg-success"
                                                : tsr.job_order.status ===
                                                  "Completed"
                                                ? "bg-info"
                                                : tsr.job_order.status ===
                                                  "For Approval"
                                                ? "bg-warning"
                                                : tsr.job_order.status ===
                                                  "Processing"
                                                ? "bg-primary"
                                                : tsr.job_order.status ===
                                                  "Pending"
                                                ? "bg-secondary"
                                                : "bg-secondary"
                                        } px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1`}
                                    >
                                        {tsr.job_order.status ===
                                            "Cancelled" && <FaTimesCircle />}
                                        {tsr.job_order.status ===
                                            "Approved" && <FaCheckCircle />}
                                        {tsr.job_order.status ===
                                            "Completed" && <FaCheckCircle />}
                                        {tsr.job_order.status ===
                                            "For Approval" && (
                                            <FaHourglassHalf />
                                        )}
                                        {tsr.job_order.status ===
                                            "Processing" && (
                                            <FaSpinner className="spinner-icon" />
                                        )}
                                        {tsr.job_order.status === "Pending" && (
                                            <FaClock />
                                        )}
                                        {tsr.job_order.status}
                                    </span>
                                </div>

                                {/* Priority Section */}
                                <div className="mb-4 text-center">
                                    <small className="text-muted d-block mb-1">
                                        Priority
                                    </small>
                                    <span
                                        className={`badge ${
                                            tsr.job_order.priority === "High"
                                                ? "bg-danger"
                                                : tsr.job_order.priority ===
                                                  "Medium"
                                                ? "bg-warning"
                                                : "bg-success"
                                        } px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1`}
                                    >
                                        <FaFlag />
                                        {tsr.job_order.priority}
                                    </span>
                                </div>

                                {/* Technician Info */}
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

                                {/* Created On Date */}
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
                                <div className="mt-4">
                                    <Link href={route('technician.indexCOC', { tsr_id: tsr.tsr_id })}>
                                        <button className="btn btn-light w-100 mb-2">
                                            <i className="bi bi-file-earmark-text-fill me-2"></i>
                                            View Certificates of Calibration
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
                                    {/* Form fields */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Calibration No.
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="coc_num"
                                            value={coc.coc_num} // Retain value
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Equipment
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="equipment"
                                            value={coc.equipment} // Retain value
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Manufacturer
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="manufacturer"
                                            value={coc.manufacturer} // Retain value
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Model No.
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="model"
                                            value={coc.model} // Retain value
                                            disabled
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
                                            value={coc.serial_num} // Retain value
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Procedure and Traceability
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="calibration"
                                            value={coc.calibration} // Retain value
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Standard Used
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="standard"
                                            value={coc.standard} // Retain value
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Calibration Result
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="calibration_res"
                                            value={coc.calibration_res} // Retain value
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Remarks
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="remark"
                                            value={coc.remark} // Retain value
                                            disabled
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="col-12 mt-4 d-flex gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                            onClick={handlePreviewClick}
                                        >
                                            <i className="bi bi-eye me-1"></i>
                                            Preview PDF
                                        </button>
                                        <Link
                                            href={route(
                                                "technician.editCoC",
                                                coc.coc_id
                                            )}
                                        >
                                            <button className="btn btn-primary">
                                                Edit Certificate of Calibration
                                            </button>
                                        </Link>
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
                        <COCpdf
                            tsr={coc.tsr}
                            cocDetails={{
                                ...coc,
                                tech_id: coc.tech_name,
                                tech_photo: coc.tech_photo,
                                admin_signature: coc.admin_photo,
                            }}
                        />
                    </PDFViewer>
                </div>
            </Modal>
        </div>
    );
}

// Change Home to ViewCOCDetails
ViewCOCDetails.layout = (page) => <Navbar2>{page}</Navbar2>;

export default ViewCOCDetails;
