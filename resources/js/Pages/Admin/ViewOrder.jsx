import { useState } from "react";
import { Link } from "@inertiajs/react";
import AdminNavBar from "@/Layouts/AdminNavBar";

function ViewOrder({ jobOrder, flash }) {
    const [showAlert, setShowAlert] = useState(!!flash?.success);

    // Check if jobOrder is defined and has instruments
    const instruments = jobOrder?.int_units || [];

    return (
        <div className="job-request-form">
            <div className="form-section fade-in">
                <h1 className="text-2xl mb-4">
                    Track Request{" "}
                    <span className="text-black font-light subtitle-span">
                        | Job Order Details #{jobOrder.job_id}
                    </span>
                </h1>
                <hr className="mb-4 border-gray-200" />

                <div className="d-flex flex-column gap-3 mb-4">
                    <div className="d-flex align-items-center gap-3">
                        <h4>
                            Status:{" "}
                            <b
                                className={`text-${
                                    jobOrder.status === "Approved"
                                        ? "success"
                                        : jobOrder.status === "For Approval"
                                        ? "warning"
                                        : jobOrder.status === "Completed"
                                        ? "info"
                                        : jobOrder.status === "Cancelled"
                                        ? "danger"
                                        : ""
                                }`}
                            >
                                {jobOrder.status}
                            </b>
                        </h4>
                        <h4>
                            Priority:{" "}
                            <b
                                className={
                                    jobOrder.priority === "Regular"
                                        ? "text-success"
                                        : "text-danger"
                                }
                            >
                                {jobOrder.priority}
                            </b>
                        </h4>
                    </div>

                    {showAlert && flash?.success && (
                        <div
                            className="alert alert-success alert-dismissible fade show"
                            role="alert"
                        >
                            <i className="bi bi-check-circle me-2"></i>
                            {flash.success}
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowAlert(false)}
                                aria-label="Close"
                            ></button>
                        </div>
                    )}
                </div>

                {/* Request Information Section */}
                <div className="system-info-section-b mb-4">
                    <h4 className="section-title-b">
                        <span
                            className="section-number-blue"
                            style={{ backgroundColor: "#0095FF" }}
                        >
                            1
                        </span>
                        Request Information
                    </h4>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label text-muted">
                                Service Requested
                            </label>
                            <input
                                type="text"
                                className="form-input disabled-input"
                                value={jobOrder?.service_type || ""}
                                readOnly
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-muted">
                                Laboratory
                            </label>
                            <input
                                type="text"
                                className="form-input disabled-input"
                                value={jobOrder?.lab || ""}
                                readOnly
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-muted">
                                College/Faculty/Office
                            </label>
                            <input
                                type="text"
                                className="form-input disabled-input"
                                value={jobOrder?.dept_name || ""}
                                readOnly
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-muted">
                                Laboratory Location
                            </label>
                            <input
                                type="text"
                                className="form-input disabled-input"
                                value={jobOrder?.lab_loc || ""}
                                readOnly
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-muted">
                                Position
                            </label>
                            <input
                                type="text"
                                className="form-input disabled-input"
                                value={jobOrder?.pos || ""}
                                readOnly
                            />
                        </div>
                        <div className="col-12">
                            <label className="form-label text-muted">
                                Remarks
                            </label>
                            <textarea
                                className="form-input disabled-input"
                                value={jobOrder?.remarks || ""}
                                readOnly
                                rows="4"
                            />
                        </div>
                    </div>
                </div>

                {/* Instruments Section */}
                <div className="form-section fade-in-delayed">
                    <h4 className="section-title-b">
                        <span
                            className="section-number-blue"
                            style={{ backgroundColor: "#0095FF" }}
                        >
                            2
                        </span>
                        Instruments ({instruments.length})
                    </h4>
                    {instruments.length > 0 ? (
                        instruments.map((instrument, index) => (
                            <div key={index} className="item-card">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label text-muted">
                                            Equipment
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input disabled-input"
                                            value={instrument.instrument}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-muted">
                                            Serial Number/Property Number
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input disabled-input"
                                            value={instrument.instrument_num}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label text-muted">
                                            Model
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input disabled-input"
                                            value={instrument.model}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label text-muted">
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            className="form-input disabled-input"
                                            value={instrument.qty}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label text-muted">
                                            Manufacturer
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input disabled-input"
                                            value={instrument.manufacturer}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">No instruments available.</p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="form-section">
                    <div
                        className="action-buttons-container"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            marginTop: "2rem",
                        }}
                    >
                        <Link
                            href={`/admin/showJobOrder/${jobOrder.job_id}/edit`}
                            className="action-button primary"
                            style={{
                                padding: "12px 24px",
                                borderRadius: "6px",
                                backgroundColor: "#0095FF",
                                color: "white",
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                                fontWeight: "500",
                                transition: "background-color 0.2s ease",
                            }}
                        >
                            <i className="bi bi-pencil-fill me-2"></i>
                            Edit Job Order
                        </Link>

                        {jobOrder.has_feedback ? (
                            <Link
                                href={route(
                                    "admin.feedback.show",
                                    jobOrder.job_id
                                )}
                                className="action-button secondary"
                                style={{
                                    padding: "12px 24px",
                                    borderRadius: "6px",
                                    backgroundColor: "#ffffff",
                                    color: "#0095FF",
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "1px solid #0095FF",
                                    fontWeight: "500",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <i className="bi bi-chat-square-text-fill me-2"></i>
                                View Feedback
                            </Link>
                        ) : null}

                        <Link
                            href={`/admin/TSR/${jobOrder.job_id}`}
                            className="action-button secondary admin"
                            style={{
                                padding: "12px 24px",
                                borderRadius: "6px",
                                backgroundColor: "#ffffff",
                                color: "#0095FF",
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid #0095FF",
                                fontWeight: "500",
                                transition: "all 0.2s ease",
                            }}
                        >
                            <i className="bi bi-file-text-fill me-2"></i>
                            View Technical Service Reports
                        </Link>

                        <Link
                            href="/admin"
                            className="action-button tertiary"
                            style={{
                                padding: "12px 24px",
                                borderRadius: "6px",
                                backgroundColor: "#2d3748",
                                color: "#ffffff",
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                                fontWeight: "500",
                                transition: "background-color 0.2s ease",
                                width: "100%",
                                gap: "8px",
                            }}
                        >
                            <i className="bi bi-arrow-left"></i>
                            Return to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

ViewOrder.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default ViewOrder;
