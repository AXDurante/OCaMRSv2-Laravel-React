import Navbar2 from "../../Layouts/Navbar2";
import TSRpdf from "./TSRpdf";
import { PDFViewer } from "@react-pdf/renderer";
import Modal from "react-modal";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";

function ViewTSRDetails({ tsr }) {
    const [showPreview, setShowPreview] = useState(false);

    const handlePreviewClick = () => {
        setShowPreview(true);
    };

    const closeModal = () => {
        setShowPreview(false);
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">
                Technical Service Report{" "}
                <span className="text-muted fw-light">| View Details #{tsr.tsr_id}</span>
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
                                <h3 className="mb-3">TSR-{tsr.tsr_num}</h3>

                                {/* Status Section */}
                                <div className="mb-4 text-center">
                                    <small className="text-muted d-block mb-1">
                                        Status
                                    </small>
                                    <span className="badge bg-success px-3 py-2 rounded-pill">
                                        {tsr.job_order.status}
                                    </span>
                                </div>

                                {/* Priority Section */}
                                <div className="mb-4 text-center">
                                    <small className="text-muted d-block mb-1">
                                        Priority
                                    </small>
                                    <span className="badge bg-warning px-3 py-2 rounded-pill">
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
                                        <span>{tsr.tech_id}</span>
                                    </div>
                                </div>

                                {/* Date Info */}
                                <div className="mt-4 text-center">
                                    <small className="text-muted d-block mb-1">
                                        Created On
                                    </small>
                                    <div className="d-flex align-items-center gap-2">
                                        <i className="bi bi-calendar3"></i>
                                        <span>{tsr.date_request}</span>
                                    </div>
                                </div>

                                <div className="mt-4">
                                        <Link
                                            href={route(
                                                "technician.COC",
                                                tsr.tsr_id
                                            )}
                                        >
                                            <button className="btn btn-light w-100 mb-2">
                                                <i className="bi bi-file-earmark-text-fill me-2"></i>
                                                Create Certificate of
                                                Calibration
                                            </button>
                                        </Link>
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

                    {/* Main Content */}
                    <div className="col-12 col-md-9">
                        <div className="card shadow-sm h-100 rounded-0 rounded-end rounded-top-md-end rounded-bottom-md-end mt-3 mt-md-0">
                            <div className="card-body">
                                <div className="row g-3">
                                    {/* First Row */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            TSR Number*
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={tsr.tsr_num}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Date Requested
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control bg-light"
                                            value={tsr.date_request}
                                            disabled
                                        />
                                    </div>

                                    {/* Second Row */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Instrument*
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={tsr.instrument}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Tel No.
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control bg-light"
                                            value={tsr.phone}
                                            disabled
                                        />
                                    </div>

                                    {/* Third Row */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Model
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={tsr.model}
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
                                            value={tsr.serial_num}
                                            disabled
                                        />
                                    </div>

                                    {/* Fourth Row */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold">
                                            Problem Reported
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            value={tsr.problemReported}
                                            disabled
                                        />
                                    </div>

                                    {/* Fifth Row */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold">
                                            Diagnosis/Observation
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            value={tsr.diagnosis}
                                            disabled
                                        />
                                    </div>

                                    {/* Sixth Row */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold">
                                            Action Taken
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            value={tsr.actionTaken}
                                            disabled
                                        />
                                    </div>

                                    {/* Seventh Row */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Recommendation
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={tsr.recommendation}
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
                                            value={tsr.tsr_remarks}
                                            disabled
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="col-12 mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary me-2"
                                            onClick={handlePreviewClick}
                                        >
                                            <i className="bi bi-file-pdf me-1"></i>
                                            Preview PDF
                                        </button>
                                        <Link
                                            href={route(
                                                "technician.editTSR",
                                                tsr.tsr_id
                                            )}
                                        >
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                            >
                                                <i className="bi bi-pencil me-1"></i>
                                                Edit Document
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PDF Preview Modal - using the same styling as TSR */}
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
                {/* Modal content similar to TSR */}
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
                            jobOrder={tsr.job_order}
                            reportDetails={{
                                ...tsr,
                                tech_photo: tsr.tech_photo,
                                ...(tsr.admin_signature && {
                                    admin_signature: tsr.admin_photo,
                                    admin_name: tsr.admin_name,
                                }),
                            }}
                        />
                    </PDFViewer>
                </div>
            </Modal>
        </div>
    );
}

ViewTSRDetails.layout = (page) => <Navbar2>{page}</Navbar2>;

export default ViewTSRDetails;
