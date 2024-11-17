import React, { useState } from "react"; // Import useState
import Navbar2 from "@/Layouts/Navbar2";
import { PDFViewer } from "@react-pdf/renderer"; // Removed PDFDownloadLink
import Modal from "react-modal"; // Import Modal
import { useForm } from "@inertiajs/react";
import COCpdf from "./COCpdf";
import { FaCheckCircle, FaFlag } from "react-icons/fa"; // Import icons

function COC({ tsr, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        coc_num: "",
        college: tsr.job_order.dept_name,
        lab_loc: tsr.job_order.lab_loc,
        equipment: "",
        model: "",
        serial_num: "",
        calibration: "",
        calibration_res: "",
        remark: "",
        tsr_num: tsr.tsr_num,
        tsr_id: tsr.tsr_id,
        manufacturer: "",
        standard: "",
        date_req: tsr.job_order.date_request,
        date_cal: tsr.job_order.date_request,
        date_due: tsr.job_order.date_due,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("technician.storeCoC"));
    };

    const [showPreview, setShowPreview] = useState(false); // Define showPreview state

    const handlePreviewClick = () => {
        setShowPreview(true); // Show the preview when the button is clicked
    };

    const closeModal = () => {
        setShowPreview(false); // Close the modal
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">
                Certificate of Calibration{" "}
                <span className="text-muted fw-light">| Create</span>
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
                                    COC-{data.coc_num || "000"}
                                </h3>

                                {/* Status Section */}
                                <div className="mb-4 text-center">
                                    <small className="text-muted d-block mb-1">
                                        Status
                                    </small>
                                    <span
                                        className={`badge bg-success px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1`}
                                    >
                                        <FaCheckCircle />
                                        Completed
                                    </span>
                                </div>

                                {/* Priority Section */}
                                <div className="mb-4 text-center">
                                    <small className="text-muted d-block mb-1">
                                        Priority
                                    </small>
                                    <span
                                        className={`badge bg-warning px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1`}
                                    >
                                        <FaFlag />
                                        Medium
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
                            </div>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="col-12 col-md-9">
                        <div className="card shadow-sm h-100 rounded-0 rounded-end rounded-top-md-end rounded-bottom-md-end mt-3 mt-md-0">
                            <div className="card-body">
                                <form onSubmit={onSubmit}>
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
                                                value={data.coc_num} // Retain value
                                                onChange={handleInputChange}
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
                                                value={data.equipment} // Retain value
                                                onChange={handleInputChange}
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
                                                value={data.manufacturer} // Retain value
                                                onChange={handleInputChange}
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
                                                value={data.model} // Retain value
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
                                                value={data.serial_num} // Retain value
                                                onChange={handleInputChange}
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
                                                value={data.calibration} // Retain value
                                                onChange={handleInputChange}
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
                                                value={data.standard} // Retain value
                                                onChange={handleInputChange}
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
                                                value={data.calibration_res} // Retain value
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label fw-bold">
                                                Remarks
                                            </label>
                                            <textarea
                                                className="form-control"
                                                name="remark"
                                                value={data.remark} // Retain value
                                                onChange={handleInputChange}
                                                rows="2"
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
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                <i className="bi bi-save me-1"></i>
                                                Save Document
                                            </button>
                                        </div>
                                    </div>
                                </form>
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
                            tsr={tsr}
                            cocDetails={{
                                ...data,
                                tech_id: `${auth.user.firstName} ${auth.user.lastName}`,
                                tech_photo: auth.photo,
                                tech_signature: auth.photo,
                            }}
                        />
                    </PDFViewer>
                </div>
            </Modal>
        </div>
    );
}

// Change Home to COC
COC.layout = (page) => <Navbar2>{page}</Navbar2>;

export default COC;
