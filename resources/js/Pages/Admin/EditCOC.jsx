import React, { useState } from "react";
import AdminNavBar from "@/Layouts/AdminNavBar";
import { PDFViewer } from "@react-pdf/renderer";
import Modal from "react-modal";
import COCpdf from "./COCpdf";
import { usePage, useForm } from "@inertiajs/react";

function EditCOC({ tsr, auth, coc }) {
    const { data, setData, put, processing, errors } = useForm({
        coc_num: coc.coc_num || '',
        college: coc.college || tsr.job_order.dept_name,
        lab_loc: coc.lab_loc || tsr.job_order.lab_loc,
        equipment: coc.equipment || '',
        model: coc.model || '',
        serial_num: coc.serial_num || '',
        calibration: coc.calibration || '',
        calibration_res: coc.calibration_res || '',
        remark: coc.remark || '',
        tsr_num: coc.tsr_num || tsr.tsr_num,
        tsr_id: coc.tsr_id || tsr.tsr_id,
        manufacturer: coc.manufacturer || '',
        standard: coc.standard || '',
        date_req: coc.date_req || tsr.job_order.date_request,
        date_cal: coc.date_cal || tsr.job_order.date_request,
        date_due: coc.date_due || tsr.job_order.date_due,
        tech_photo: coc.tech_photo_url,
        tech_name: coc.tech_name,
        admin_name: coc.admin_name,
        admin_photo: auth.photo,
    });

    console.log(data.tech_name);
    console.log(data.admin_photo);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    function onSubmit(e) {
        e.preventDefault();
        put(route('admin.update-coc', coc.coc_id));
    };

    const [showPreview, setShowPreview] = useState(false);
    const [includeSignature, setIncludeSignature] = useState(false); // Add this state

    // Handle checkbox change
    const handleSignatureChange = (e) => {
        const isChecked = e.target.checked;
        setIncludeSignature(isChecked);
        setData({
            ...data,
            admin_photo: isChecked ? auth.user.photo : null,
            admin_name: isChecked ? `${auth.user.firstName} ${auth.user.lastName}` : null,
        });
    };

    const handlePreviewClick = () => {
        setShowPreview(true);
    };

    const closeModal = () => {
        setShowPreview(false);
    };

    return (
        <div className="d-flex">
            <div id="content" className=" flex-fill p-3">
                <div>
                    <div>
                        <h1 class="d-inline">Certificate of Calibration | </h1>
                        <h1 class="d-inline fw-light">Edit</h1>
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
                                    <button className="btn btn-light w-100 mb-2">
                                        <i className="bi bi-file-earmark-text-fill me-2"></i>
                                        Technical Service Report
                                    </button>
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
                                                value={data.coc_num}
                                                onChange={handleInputChange}
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
                                                value={data.equipment}
                                                onChange={handleInputChange}
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
                                                value={data.manufacturer}
                                                onChange={handleInputChange}
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
                                                Procedure and Traceability
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                name="calibration"
                                                value={data.calibration}
                                                onChange={handleInputChange}
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
                                                value={data.standard}
                                                onChange={handleInputChange}
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
                                                value={data.calibration_res}
                                                onChange={handleInputChange}
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
                                                value={data.remark}
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
                                                    onChange={handleSignatureChange}
                                                />
                                                <label className="form-check-label" htmlFor="includeSignature">
                                                    Include my signature in this TSR
                                                </label>
                                            </div>
                                            {includeSignature && (
                                                <div className="mt-2">
                                                    <small className="text-muted">
                                                        Signature file: {auth.user.photo}
                                                    </small>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row"></div>
                                    <button 
                                        className="btn btn-dark w-100 text-warning mt-2 mb-4"
                                        onClick={onSubmit}>
                                        Edit Certificate of Calibration
                                    </button>
                                    <Modal
                                        isOpen={showPreview}
                                        onRequestClose={closeModal}
                                    >
                                        <h5>Print Preview:</h5>
                                        <PDFViewer
                                            style={{
                                                width: "100%",
                                                height: "80%",
                                                border: "none",
                                            }}
                                        >
                                            <COCpdf 
                                                tsr={tsr}
                                                cocDetails={{
                                                    ...data,
                                                    tech_photo: coc.tech_photo_url,
                                                    tech_name: coc.tech_name,
                                                    admin_photo: includeSignature ? auth.photo : null,
                                                    admin_name: includeSignature ? `${auth.user.firstName} ${auth.user.lastName}` : null,
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

EditCOC.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default EditCOC;