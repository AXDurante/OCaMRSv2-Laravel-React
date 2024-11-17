import Navbar2 from "../../Layouts/Navbar2";
import { Link } from "@inertiajs/react";
import { useState } from 'react';

function ViewOrder({ jobOrder, flash }) {
    const [showAlert, setShowAlert] = useState(!!flash?.success);

    console.log("Job Order Data:", jobOrder); // Debugging: Check the jobOrder structure

    // Check if jobOrder is defined and has instruments
    const instruments = jobOrder?.int_units || []; // Use int_units instead of instruments
    console.log(instruments);

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
                            <span className={`text-${jobOrder.status === "Approved" ? "success" : 
                                              jobOrder.status === "For Approval" ? "warning" :
                                              jobOrder.status === "Completed" ? "info" : 
                                              jobOrder.status === "Cancelled" ? "danger" : ""}`}>
                                {jobOrder.status}
                            </span>
                        </h4>
                        <h4>
                            Priority:{" "}
                            <span className={jobOrder.priority === "Regular" ? "text-success" : "text-danger"}>
                                {jobOrder.priority}
                            </span>
                        </h4>
                    </div>

                    {showAlert && flash?.success && (
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
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
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-muted">
                                College/ Faculty / Office
                            </label>
                            <input
                                type="text"
                                className="form-input disabled-input"
                                value={jobOrder?.dept_name || ""}
                                readOnly
                                disabled
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
                                Laboratory Location
                            </label>
                            <input
                                type="text"
                                className="form-input disabled-input"
                                value={jobOrder?.lab_loc || ""}
                                readOnly
                                disabled
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
                                disabled
                            />
                        </div>
                        <div className="col-12">
                            <label className="form-label text-muted">
                                Remarks
                            </label>
                            <textarea
                                className="form-input disabled-input"
                                value={jobOrder.remarks}
                                onChange={(e) =>
                                    setData("remarks", e.target.value)
                                }
                                readOnly
                                disabled
                            />
                        </div>
                    </div>
                </div>

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
                                            Instrument
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
                                            Model
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input disabled-input"
                                            value={instrument.model}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-md-6">
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
                                    <div className="col-md-6">
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
                                    <div className="col-md-6">
                                        <label className="form-label text-muted">
                                            Serial Number/Property Number
                                        </label>
                                        <input
                                            type="number"
                                            className="form-input disabled-input"
                                            value={instrument.instrument_num}
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
                            href={`/technician/showJobOrder/${jobOrder.job_id}/edit`}
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
                            href={`/technician/TSR/${jobOrder.job_id}`}
                            className="action-button secondary"
                            style={{
                                padding: "12px 24px",
                                borderRadius: "6px",
                                backgroundColor: "#6C757D",
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
                            <i className="bi bi-file-earmark-text-fill me-2"></i>
                            View Technical Service Reports
                        </Link>

                        <a
                            href="/admin"
                            className="action-button tertiary"
                            style={{
                                padding: "12px 24px",
                                borderRadius: "6px",
                                backgroundColor: "#343A40",
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
                            <i className="bi bi-arrow-left-circle-fill me-2"></i>
                            Return
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

ViewOrder.layout = (page) => <Navbar2>{page}</Navbar2>;

export default ViewOrder;
