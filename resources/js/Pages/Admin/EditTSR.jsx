import React, { useState } from "react"; // Import useState
import AdminNavBar from "@/Layouts/AdminNavBar";
import Navbar from "../../Layouts/Navbar";
import TSRpdf from "./TSRpdf";
import { PDFViewer } from "@react-pdf/renderer"; // Removed PDFDownloadLink
import Modal from "react-modal"; // Import Modal
import { Link, useForm } from "@inertiajs/react";

function EditTSR({ jobOrder, auth, tsr }) {
    const [showPreview, setShowPreview] = useState(false); // State to control preview visibility
    const [includeSignature, setIncludeSignature] = useState(false); // Add this state

    const handlePreviewClick = () => {
        setShowPreview(true); // Show the preview when the button is clicked
    };

    const closeModal = () => {
        setShowPreview(false); // Close the modal
    };

    // Initialize useForm with existing TSR data
    const { data, setData, put, processing, errors } = useForm({
        tsr_num: tsr.tsr_num || "",
        instrument: tsr.instrument || "",
        model: tsr.model || "",
        serial_num: tsr.serial_num || "",
        problemReported: tsr.problemReported || "",
        diagnosis: tsr.diagnosis || "",
        actionTaken: tsr.actionTaken || "",
        recommendation: tsr.recommendation || "",
        tsr_remarks: tsr.tsr_remarks || "",
        date_request: tsr.date_request || jobOrder.date_request,
        phone: tsr.phone || jobOrder.user.phoneNumber,
        job_id: tsr.job_id || jobOrder.job_id,
        tech_id: tsr.tech_id,
        tech_photo: tsr.tech_photo,
        admin_photo: tsr.admin_photo || null, // Add this field
        admin_name: tsr.admin_name || null,
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

    function onSubmit(e) {
        e.preventDefault();
        put(route("admin.updateTSR", tsr.tsr_id));
    }

    return (
        <div className="d-flex">
            {/* Modal for PDF Preview */}
            <Modal isOpen={showPreview} onRequestClose={closeModal}>
                <h5>Print Preview:</h5>
                <PDFViewer
                    style={{
                        width: "100%",
                        height: "80%",
                        border: "none", // Optional: remove border for a cleaner look
                    }}
                >
                    <TSRpdf
                        jobOrder={jobOrder}
                        reportDetails={{
                            ...data,
                            // Only include admin signature and name if checkbox is checked
                            ...(includeSignature && {
                                admin_signature: auth.photo, // Use the full URL from auth
                                admin_name: `${auth.user.firstName} ${auth.user.lastName}`,
                            }),
                        }}
                    />
                </PDFViewer>
                <button onClick={closeModal}>Close</button> {/* Close button */}
            </Modal>

            <div id="content" className=" flex-fill p-3">
                <div>
                    <div>
                        <h1 className="d-inline">
                            Technical Service Report |{" "}
                        </h1>
                        <h1 className="d-inline fw-light"> Edit </h1>
                        <hr />
                    </div>
                    <div className="mt-3">
                        <div className="row forms-bg">
                            <div className="col-12 col-md-4 profile-bg d-flex flex-column align-items-center p-3 text-white">
                                <div className="mt-10">
                                    <i className="bi bi-person-fill fs-2 text-primary"></i>
                                </div>
                                <h5 className="mb-4 mt-9 ">
                                    Analytical Balance
                                </h5>

                                <div className="mt-20">
                                    <h5 className="d-inline">Priority: </h5>
                                    <h5 className="d-inline fw-light text-warning">
                                        Regular
                                    </h5>
                                </div>

                                {/* <h6 className="mt-4">Related Documents:</h6>
                                <div className="mt-1 w-100">
                                    <button className="btn btn-light w-100 mb-2">
                                        <i className="bi bi-file-earmark-text-fill me-2"></i>
                                        Technical Service Report
                                    </button>
                                    <button className="btn btn-light w-100 mb-2">
                                        <i className="bi bi-file-earmark-text-fill me-2"></i>
                                        Job Request
                                    </button>
                                    <Link
                                        href="">
                                        <button className="btn btn-light w-100 mb-2">
                                            <i className="bi bi-file-earmark-text-fill me-2"></i>
                                            Create Certificate of Calibration
                                        </button>
                                    </Link>
                                </div> */}
                            </div>

                            <div className="col-12 col-md-8">
                                <div className="pt-5 pb-5 p-3">
                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                TSR Number*
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                name="tsr_num"
                                                value={data.tsr_num}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Instrument*
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                name="instrument"
                                                value={data.instrument}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Date Requested
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value={jobOrder.date_request}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Tel No.
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value={
                                                    jobOrder.user.phoneNumber
                                                }
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Model
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                name="model"
                                                value={data.model}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Serial No.
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                name="serial_num"
                                                value={data.serial_num}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Problem Reported
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                name="problemReported"
                                                value={data.problemReported}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Diagnosis/Observation
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                name="diagnosis"
                                                value={data.diagnosis}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Action Taken
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                name="actionTaken"
                                                value={data.actionTaken}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Recommendation
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <select
                                                className="w-100 rounded p-2"
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
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Remarks
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                name="tsr_remarks"
                                                value={data.tsr_remarks}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Place Signature
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="includeSignature"
                                                    checked={includeSignature}
                                                    onChange={
                                                        handleSignatureChange
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="includeSignature"
                                                >
                                                    Include my signature in this
                                                    TSR
                                                </label>
                                            </div>
                                            {includeSignature && (
                                                <div className="mt-2">
                                                    <small className="text-muted">
                                                        Signature file:{" "}
                                                        {auth.user.photo}
                                                    </small>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row"></div>
                                    <div className="row">
                                        <div className="col-12">
                                            <button
                                                type="button"
                                                className="btn btn-primary mb-3"
                                                onClick={handlePreviewClick} // Add click handler
                                            >
                                                Preview PDF
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary ms-3 mb-3"
                                                onClick={onSubmit}
                                            >
                                                Save Document
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Change Home to TSR
EditTSR.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default EditTSR;
