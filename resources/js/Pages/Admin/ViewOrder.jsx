import AdminNavBar from "@/Layouts/AdminNavBar";
import Navbar from "../../Layouts/Navbar";
import { Link } from "@inertiajs/react";

function ViewOrder({ jobOrder }) {
    console.log("Job Order Data:", jobOrder); // Debugging: Check the jobOrder structure

    // Check if jobOrder is defined and has instruments
    const instruments = jobOrder?.int_units || []; // Use int_units instead of instruments
    console.log(instruments);

    // Add console.log to debug feedback data
    console.log("Job Order Status:", jobOrder.status);
    console.log("Feedback Data:", jobOrder.feedback);

    // Add detailed console logs
    console.log("Full Job Order Data:", jobOrder);
    console.log("Job Order ID:", jobOrder.job_id);
    console.log("Feedback Data:", jobOrder.feedback);

    return (
        <div className="job-request-form">
            {/* Header Section */}
            <div className="form-section fade-in">
                <h1 className="text-2xl mb-4">
                    Track Request{" "}
                    <span className="text-black font-light subtitle-span">
                        | Job Order Details
                    </span>
                </h1>
                <hr className="mb-4 border-gray-200" />

                {/* Status and Priority Section */}
                <div className="d-flex align-items-center gap-3 mb-4">
                    <h4>
                        Status:{" "}
                        <b
                            className={
                                jobOrder.status === "Processing"
                                    ? "text-warning"
                                    : jobOrder.status === "Cancelled"
                                    ? "text-danger"
                                    : jobOrder.status === "Completed"
                                    ? "text-success"
                                    : ""
                            }
                        >
                            {jobOrder.status}
                        </b>
                    </h4>
                    <h4>
                        Priority:{" "}
                        <b
                            className={
                                jobOrder.priority === "Regular"
                                    ? "text-"
                                    : jobOrder.priority === "High"
                                    ? "text-high"
                                    : jobOrder.priority === "Medium"
                                    ? "text-medium"
                                    : jobOrder.priority === "Low"
                                    ? "text-low"
                                    : ""
                            }
                        >
                            {jobOrder.priority}
                        </b>
                    </h4>
                    {jobOrder.status === "Completed" && (
                        <>
                            {jobOrder.feedback ? (
                                <Link
                                    href={route(
                                        "admin.feedback.show",
                                        jobOrder.feedback.id
                                    )}
                                    className="btn btn-primary"
                                >
                                    View Feedback
                                </Link>
                            ) : (
                                <span className="text-muted">
                                    (No feedback found - ID: {jobOrder.job_id})
                                </span>
                            )}
                        </>
                    )}
                </div>

                {/* Information Section */}
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
                                Instrumentation Transportation
                            </label>
                            <input
                                type="text"
                                className="form-input disabled-input"
                                value={jobOrder?.trans_type || ""}
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
                                value={jobOrder.remarks}
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
                                <div className="instrument-header">
                                    <h5 className="instrument-title-b">
                                        Instrument {index + 1}
                                    </h5>
                                </div>
                                <div className="row g-3">
                                    <div className="col-12 col-md-6">
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
                                    <div className="col-12 col-md-6">
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
                                    <div className="col-12 col-md-4">
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
                                    <div className="col-12 col-md-4">
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
                                    <div className="col-12 col-md-4">
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

                        <Link
                            href={`/admin/TSR/${jobOrder.job_id}`}
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
