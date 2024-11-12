import React, { useState } from "react"; // Ensure useState is imported
import AdminNavBar from "@/Layouts/AdminNavBar";
import { PDFViewer } from "@react-pdf/renderer"; // Removed PDFDownloadLink
import Modal from "react-modal";
import COCpdf from "./COCpdf";
import { usePage, useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

function ViewCOCDetails({ coc, auth }) {
    const [showPreview, setShowPreview] = useState(false); // Define showPreview state

    const handlePreviewClick = () => {
        setShowPreview(true); // Show the preview when the button is clicked
    };

    const closeModal = () => {
        setShowPreview(false); // Close the modal
    };

    return (
        <div className="d-flex">
            <div id="content" className=" flex-fill p-3">
                <div>
                    <div>
                        <h1 class="d-inline">Certificate of Calibration | </h1>
                        <h1 class="d-inline fw-light">View</h1>
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

                                <h6 className="mt-4">Related Documents:</h6>
                                <div className="mt-1 w-100">
                                    <Link href={route('admin.viewTSRDetails', coc.tsr_id)}>
                                        <button className="btn btn-light w-100 mb-2">
                                            <i className="bi bi-file-earmark-text-fill me-2"></i>
                                            Technical Service Report
                                        </button>
                                    </Link>
                                    {/* <button className="btn btn-light w-100">
                                        <i className="bi bi-file-earmark-text-fill me-2"></i>
                                        Job Request
                                    </button> */}
                                </div>
                            </div>

                            <div className="col-12 col-md-8">
                                <div className="pt-5 pb-5 p-3">
                                <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Calibration No.
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                name="coc_num"
                                                value={coc.coc_num}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Equipment
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                name="equipment"
                                                value={coc.equipment}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Manufacturer
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                name="manufacturer"
                                                value={coc.manufacturer}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Model No.
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                name="model"
                                                value={coc.model}
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
                                                name="serial_num"
                                                value={coc.serial_num}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Procedure and Traceability
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                name="calibration"
                                                value={coc.calibration}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Standard Used
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                name="standard"
                                                value={coc.standard}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Calibration Result
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                name="calibration_res"
                                                value={coc.calibration_res}
                                                disabled
                                            />
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
                                                name="remark"
                                                value={coc.remark}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="row"></div>
                                    <Modal
                                        isOpen={showPreview}
                                        onRequestClose={closeModal}
                                    >
                                        <h5>Print Preview:</h5>
                                        <PDFViewer
                                            style={{
                                                width: "100%",
                                                height: "80%",
                                                border: "none", // Optional: remove border for a cleaner look
                                            }}
                                        >
                                            <COCpdf 
                                                cocDetails={{
                                                    ...coc,
                                                    department: coc.dept_name,
                                                    labLocation: coc.lab_loc,
                                                    dateRequested: coc.date_request,
                                                    dueDate: coc.date_due,
                                                    tech_id: coc.tech_name,
                                                    tech_photo: coc.tech_photo, // This is now the full URL
                                                    tech_signature: coc.tech_photo, // This is now the full URL
                                                    admin_photo: coc.admin_signature // This is now the full URL
                                                }}
                                            />
                                        </PDFViewer>
                                        <button onClick={closeModal}>
                                            Close
                                        </button>{" "}
                                        {/* Close button */}
                                    </Modal>

                                    <div
                                        id="content"
                                        className="main-content flex-fill p-3"
                                    >
                                        <div className="mt-3">
                                            {/* Form fields for COC */}
                                            <button
                                                className="btn btn-primary mb-3"
                                                onClick={handlePreviewClick} // Add click handler
                                            >
                                                Preview PDF
                                            </button>
                                            <Link href={route('admin.editCoC', coc.coc_id)}>
                                                <button className="btn btn-primary mb-3 ms-2">
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
            </div>
        </div>
    );
}

ViewCOCDetails.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default ViewCOCDetails;
