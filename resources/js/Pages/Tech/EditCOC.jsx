import React, { useState } from "react";
import Navbar2 from "@/Layouts/Navbar2";
import { PDFViewer } from "@react-pdf/renderer";
import Modal from "react-modal";
import COCpdf from "./COCpdf";
import { usePage, useForm } from "@inertiajs/react";
import {
    FaEdit,
    FaFlag,
    FaCheckCircle,
    FaTimesCircle,
    FaHourglassHalf,
    FaSpinner,
    FaClock,
} from "react-icons/fa";

function EditCOC({ tsr, auth, coc }) {
    const { data, setData, put, processing, errors } = useForm({
        coc_num: coc.coc_num || "",
        college: coc.college || tsr.job_order.dept_name,
        lab_loc: coc.lab_loc || tsr.job_order.lab_loc,
        equipment: coc.equipment || "",
        model: coc.model || "",
        serial_num: coc.serial_num || "",
        calibration: coc.calibration || "",
        calibration_res: coc.calibration_res || "",
        remark: coc.remark || "",
        tsr_num: coc.tsr_num || tsr.tsr_num,
        tsr_id: coc.tsr_id || tsr.tsr_id,
        manufacturer: coc.manufacturer || "",
        standard: coc.standard || "",
        date_req: coc.date_req || tsr.job_order.date_request,
        date_cal: coc.date_cal || tsr.job_order.date_request,
        date_due: coc.date_due || tsr.job_order.date_due,
        tech_name: coc.tech_name || "",
        tech_photo: coc.tech_photo_url || "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    function onSubmit(e) {
        e.preventDefault();
        put(route("technician.update-coc", coc.coc_id));
    }

    const [showPreview, setShowPreview] = useState(false);

    const handlePreviewClick = () => {
        setShowPreview(true);
    };

    const closeModal = () => {
        setShowPreview(false);
    };

    console.log(coc);
    return (
        <div className="container py-4">
            <h2 className="mb-4">
                Certificate of Calibration{" "}
                <span className="text-muted fw-light">| Edit #{coc.coc_id}</span>
            </h2>

            <div className="card-container">
                <div className="row g-0">
                    {/* Left Sidebar - matches ViewCOCDetails style */}
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
                                    <small className="text-white d-block mb-1">
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
                                    <small className="text-white d-block mb-1">
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
                            </div>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="col-12 col-md-9">
                        <div className="card shadow-sm h-100 rounded-0 rounded-end rounded-top-md-end rounded-bottom-md-end mt-3 mt-md-0">
                            <div className="card-body">
                                <form onSubmit={onSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">
                                                Calibration No.
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${
                                                    errors.coc_num
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                name="coc_num"
                                                value={data.coc_num}
                                                onChange={handleInputChange}
                                            />
                                            {errors.coc_num && (
                                                <div className="invalid-feedback">
                                                    {errors.coc_num}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">
                                                Equipment
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${
                                                    errors.equipment
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                name="equipment"
                                                value={data.equipment}
                                                onChange={handleInputChange}
                                            />
                                            {errors.equipment && (
                                                <div className="invalid-feedback">
                                                    {errors.equipment}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">
                                                Manufacturer
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${
                                                    errors.manufacturer
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                name="manufacturer"
                                                value={data.manufacturer}
                                                onChange={handleInputChange}
                                            />
                                            {errors.manufacturer && (
                                                <div className="invalid-feedback">
                                                    {errors.manufacturer}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">
                                                Model No.
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${
                                                    errors.model
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                name="model"
                                                value={data.model}
                                                onChange={handleInputChange}
                                            />
                                            {errors.model && (
                                                <div className="invalid-feedback">
                                                    {errors.model}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">
                                                Serial No.
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${
                                                    errors.serial_num
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                name="serial_num"
                                                value={data.serial_num}
                                                onChange={handleInputChange}
                                            />
                                            {errors.serial_num && (
                                                <div className="invalid-feedback">
                                                    {errors.serial_num}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">
                                                Procedure and Traceability
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${
                                                    errors.calibration
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                name="calibration"
                                                value={data.calibration}
                                                onChange={handleInputChange}
                                            />
                                            {errors.calibration && (
                                                <div className="invalid-feedback">
                                                    {errors.calibration}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">
                                                Standard Used
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${
                                                    errors.standard
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                name="standard"
                                                value={data.standard}
                                                onChange={handleInputChange}
                                            />
                                            {errors.standard && (
                                                <div className="invalid-feedback">
                                                    {errors.standard}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">
                                                Calibration Result
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${
                                                    errors.calibration_res
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                name="calibration_res"
                                                value={data.calibration_res}
                                                onChange={handleInputChange}
                                            />
                                            {errors.calibration_res && (
                                                <div className="invalid-feedback">
                                                    {errors.calibration_res}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">
                                                Remarks
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${
                                                    errors.remark
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                name="remark"
                                                value={data.remark}
                                                onChange={handleInputChange}
                                            />
                                            {errors.remark && (
                                                <div className="invalid-feedback">
                                                    {errors.remark}
                                                </div>
                                            )}
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
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={processing}
                                            >
                                                <i className="bi bi-save me-1"></i>
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal component remains the same */}
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
                                tech_id: `${auth.user.firstName} ${auth.user.lastName}`,
                                tech_photo: auth.photo,
                                tech_signature: auth.photo,
                                admin_signature: coc.admin_photo,
                            }}
                        />
                    </PDFViewer>
                </div>
            </Modal>
        </div>
    );
}

EditCOC.layout = (page) => <Navbar2>{page}</Navbar2>;

export default EditCOC;
