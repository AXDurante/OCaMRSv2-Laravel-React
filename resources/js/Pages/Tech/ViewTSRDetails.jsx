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
        <>
            {/* Modal for PDF Preview */}
            <Modal isOpen={showPreview} onRequestClose={closeModal}>
                <h5>Print Preview:</h5>
                <PDFViewer
                    style={{
                        width: "100%",
                        height: "80%",
                        border: "none",
                    }}
                >
                    <TSRpdf 
                        jobOrder={tsr.job_order}
                        reportDetails={tsr} />
                </PDFViewer>
                <button onClick={closeModal}>Close</button>
            </Modal>

            <div id="content" className="flex-fill p-3">
                <div>
                    <div>
                        <h1 className="d-inline">
                            Technical Service Report |{" "}
                        </h1>
                        <h1 className="d-inline fw-light">View Details</h1>
                        <hr />
                    </div>
                    <div className="mt-3">
                        <div className="row forms-bg">
                            <div className="col-12 col-md-4 profile-bg d-flex flex-column align-items-center p-3 text-white">
                                {/* Left sidebar content */}
                                <div className="mt-10">
                                    <i className="bi bi-person-fill fs-2 text-primary"></i>
                                </div>
                                <h5 className="mb-4 mt-9">
                                    {tsr.instrument}
                                </h5>

                                <div className="mt-20">
                                    <h5 className="d-inline">Priority: </h5>
                                    <h5 className="d-inline fw-light text-warning">
                                        Regular
                                    </h5>
                                </div>

                                <h6 className="mt-4">Related Documents:</h6>
                                <div className="mt-1 w-100">
                                    {tsr.coc ? (
                                        <Link href={route('technician.viewCoCDetails', tsr.coc.coc_id)}>
                                            <button className="btn btn-light w-100 mb-2">
                                                <i className="bi bi-file-earmark-text-fill me-2"></i>
                                                View Certificate of Calibration
                                            </button>
                                        </Link>
                                    ) : (
                                        <Link href={route('technician.COC', tsr.tsr_id)}>
                                            <button className="btn btn-light w-100 mb-2">
                                                <i className="bi bi-file-earmark-text-fill me-2"></i>
                                                Create Certificate of Calibration
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div className="col-12 col-md-8">
                                <div className="pt-5 pb-5 p-3">
                                    {/* Form fields */}
                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                TSR Number
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value={tsr.tsr_num}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Instrument
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value={tsr.instrument}
                                                disabled
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
                                                value={tsr.date_request}
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
                                                value={tsr.phone}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    {/* Continue with other fields */}
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
                                                value={tsr.model || 'N/A'}
                                                disabled
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
                                                value={tsr.serial_num}
                                                disabled
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
                                                value={tsr.problemReported}
                                                disabled
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
                                                value={tsr.diagnosis}
                                                disabled
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
                                                value={tsr.actionTaken}
                                                disabled
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
                                            <select className="w-100 rounded p-2"
                                            disabled>
                                                <option>
                                                    For Pull-Out
                                                </option>
                                                <option>
                                                    Forward to Supplier
                                                </option>
                                                <option>
                                                    For Repair
                                                </option>
                                                <option>
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
                                                value={tsr.tsr_remarks}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="row"></div>
                                    <div className="row">
                                        <div className="col-12">
                                            <button
                                                type="button"
                                                className="btn btn-primary mb-3"
                                                onClick={handlePreviewClick}
                                            >
                                                Preview PDF
                                            </button>
                                            <Link
                                                href={route('technician.editTSR', tsr.tsr_id)}>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary ms-3 mb-3"
                                                >
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
            </div>
        </>
    )
}

ViewTSRDetails.layout = (page) => <Navbar2>{page}</Navbar2>;

export default ViewTSRDetails;