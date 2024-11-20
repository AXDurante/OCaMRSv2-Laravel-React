import { useForm } from "@inertiajs/react";
import Navbar2 from "@/Layouts/Navbar2";
import { useState } from "react";

function EditOrder({ jobOrder, equipment, college, labLoc, employeeID }) {
    const [errors, setErrors] = useState({}); // State for all errors
    const [isSubmitting, setIsSubmitting] = useState(false);


    const equipmentName = equipment?.map((item) => item.equip_name) || [];

    const { data, setData, put, processing } = useForm({
        service_type: jobOrder.service_type || "",
        trans_type: jobOrder.trans_type || "None",
        dept_name: college,
        lab: labLoc,
        lab_loc: labLoc,
        pos: "Laboratory Technician",
        employeeID: employeeID,
        remarks: jobOrder.remarks || "",
        status: jobOrder.status || "Pending",

        instruments: jobOrder.int_units.map((unit) => ({
            instrument: unit.instrument || "",
            qty: unit.qty || 1,
            model: unit.model || "N/A",
            instrument_num: unit.instrument_num || "",
            manufacturer: unit.manufacturer || "N/A",
        })) || [
            {
                instrument: "",
                qty: 1,
                model: "N/A",
                instrument_num: "",
                manufacturer: "N/A",
            },
        ],
    });

    const addInstrument = () => {
        setData("instruments", [
            ...data.instruments,
            {
                instrument: "",
                qty: 1,
                model: "N/A",
                instrument_num: "",
                manufacturer: "N/A",
            },
        ]);
    };

    const removeInstrument = (index) => {
        if (data.instruments.length <= 1) {
            alert("You must have at least one instrument.");
            return;
        }

        if (window.confirm(`Are you sure you want to delete Instrument ${index + 1}?`)) {
            const updatedInstruments = data.instruments.filter(
                (_, i) => i !== index
            );
            setData("instruments", updatedInstruments);
        }
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedInstruments = data.instruments.map((inst, i) =>
            i === index ? { ...inst, [name]: value } : inst
        );
        setData("instruments", updatedInstruments);
    };

    const validateForm = () => {
        if (!data.service_type) {
            alert("Please select a Service Type");
            return false;
        }

        if (!data.instruments.length) {
            alert("Please add at least one instrument");
            return false;
        }

        for (let i = 0; i < data.instruments.length; i++) {
            const inst = data.instruments[i];
            if (!inst.instrument) {
                alert(`Please select an equipment for Instrument ${i + 1}`);
                return false;
            }
            if (!inst.instrument_num) {
                alert(`Please enter a Serial Number for Instrument ${i + 1}`);
                return false;
            }
            if (!inst.qty || inst.qty < 1) {
                alert(`Please enter a valid quantity for Instrument ${i + 1}`);
                return false;
            }
        }

        return true;
    };

    async function onSubmit(e) {
        e.preventDefault();
        
        // Prevent double submission
        if (isSubmitting || processing) return;
        
        // Clear all previous errors first
        setErrors({});
        
        // Validate all fields first
        let validationErrors = {};
        let hasErrors = false;

        // Check for instruments
        if (data.instruments.length === 0) {
            validationErrors.instruments = "At least one instrument is required.";
            alert("Please add at least one instrument before submitting.");
            hasErrors = true;
        }

        // Service type validation
        if (!data.trans_type.trim()) {
            validationErrors.trans_type = "Please input transportation method, or type None.";
            hasErrors = true;
        }

        // Instrument validation
        data.instruments.forEach((instrument, index) => {
            if (!instrument.instrument) {
                validationErrors[`instrument_${index}`] = "Please select an equipment.";
                hasErrors = true;
            }
            if (!instrument.instrument_num) {
                validationErrors[`serialNumber_${index}`] = "Serial Number is required.";
                hasErrors = true;
            }
            if (!instrument.qty || instrument.qty < 1) {
                validationErrors[`quantity_${index}`] = "Quantity must be at least 1.";
                hasErrors = true;
            }
        });

        // If there are validation errors, set them and return
        if (hasErrors) {
            setErrors(validationErrors);
            return;
        }

        // If we get here, all validation passed
        try {
            setIsSubmitting(true);
            await put(route("technician.updateJobOrder", jobOrder.job_id), {
                onSuccess: () => {
                    setIsSubmitting(false);
                },
                onError: (errors) => {
                    setErrors(errors);
                    setIsSubmitting(false);
                },
            });
        } catch (error) {
            console.error('Submission error:', error);
            setIsSubmitting(false);
        }
    }

    return (
        <div className="job-request-form">
            {/* Header Section */}
            <div className="form-section fade-in">
                <h1 className="text-2xl mb-4">
                    Job Request{" "}
                    <span className="text-black font-light subtitle-span">
                        | Update Request #{jobOrder.job_id}
                    </span>
                </h1>
                <hr className="mb-4 border-gray-200" />

                {/* Status and Priority Section - Updated styling */}
                <div className="d-flex align-items-center gap-3 mb-4">
                    <h4>
                        Status:{" "}
                        <div className="dropdown d-inline-block">
                            <select
                                className="btn btn-light dropdown-toggle"
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                            >
                                <option value="Approved">Approved</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </h4>
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
                        {/* Service Type */}
                        <div className="col-md-6">
                            <label className="form-label text-muted">
                                Service Requested*
                            </label>
                            <select
                                className="form-select"
                                value={data.service_type}
                                onChange={(e) =>
                                    setData("service_type", e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Select an Option
                                </option>
                                <option value="Repair">Repair</option>
                                <option value="Calibration/Maintenance">
                                    Calibration/Maintenance
                                </option>
                            </select>
                        </div>

                        {/* Transportation */}
                        <div className="col-md-6">
                            <label className="form-label text-muted">
                                Instrumentation Transportation
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.trans_type ? 'input-error' : ''}`}
                                value={data.trans_type}
                                onChange={(e) =>
                                    setData("trans_type", e.target.value)
                                }
                                placeholder="Please indicate if there is any, or type None if otherwise"
                            />
                            {errors.trans_type && (
                                <div className="error-message">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {errors.trans_type}
                                </div>
                            )}
                        </div>

                        {/* Laboratory */}
                        <div className="col-md-6">
                            <label className="form-label text-muted">
                                Laboratory
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={data.lab}
                                onChange={(e) => setData("lab", e.target.value)}
                                readOnly
                            />
                        </div>

                        {/* Laboratory Location */}
                        <div className="col-md-6">
                            <label className="form-label text-muted">
                                Laboratory Location
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={data.lab_loc}
                                onChange={(e) =>
                                    setData("lab_loc", e.target.value)
                                }
                                readOnly
                            />
                        </div>

                        {/* College/Faculty/Office */}
                        <div className="col-md-6">
                            <label className="form-label text-muted">
                                College/Faculty/Office
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={data.dept_name}
                                onChange={(e) =>
                                    setData("dept_name", e.target.value)
                                }
                                readOnly
                            />
                        </div>

                        {/* Position */}
                        <div className="col-md-6">
                            <label className="form-label text-muted">
                                Position
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={data.pos}
                                onChange={(e) => setData("pos", e.target.value)}
                                readOnly
                            />
                        </div>

                        {/* Remarks */}
                        <div className="col-12">
                            <label className="form-label text-muted">
                                Remarks
                            </label>
                            <textarea
                                className="form-control"
                                value={data.remarks}
                                onChange={(e) =>
                                    setData("remarks", e.target.value)
                                }
                                rows="4"
                                readOnly
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
                        Instruments ({data.instruments.length})
                    </h4>

                    {data.instruments.map((instrument, index) => (
                        <div key={index} className="item-card mb-4">
                            <div className="instrument-header d-flex justify-content-between align-items-center">
                                <h5 className="instrument-title-b">
                                    Instrument {index + 1}
                                </h5>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeInstrument(index)}
                                >
                                    <i className="bi bi-trash me-1"></i>
                                    Delete
                                </button>
                            </div>
                            <div className="row g-3">
                                {/* Equipment */}
                                <div className="col-12 col-md-6">
                                    <label className="form-label text-muted">
                                        Equipment*
                                    </label>
                                    <div className="dropdown">
                                        <select
                                            className="btn btn-light dropdown-toggle w-100"
                                            name="instrument"
                                            value={instrument.instrument}
                                            onChange={(e) =>
                                                handleInputChange(index, e)
                                            }
                                        >
                                            <option value=""
                                            disabled>
                                                Select an equipment
                                            </option>
                                            {equipmentName.map((name, i) => (
                                                <option key={i} value={name}>
                                                    {name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Serial Number */}
                                <div className="col-12 col-md-6">
                                    <label className="form-label text-muted">
                                        Serial Number/Property Number*
                                    </label>
                                    <input
                                        type="number"
                                        className={`form-control ${errors[`serialNumber_${index}`] ? 'input-error' : ''}`}
                                        name="instrument_num"
                                        value={instrument.instrument_num}
                                        onChange={(e) =>
                                            handleInputChange(index, e)
                                        }
                                        placeholder="Enter serial number or property number"
                                    />
                                    {errors[`serialNumber_${index}`] && (
                                        <div className="error-message">
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            {errors[`serialNumber_${index}`]}
                                        </div>
                                    )}
                                </div>

                                {/* Model */}
                                <div className="col-12 col-md-4">
                                    <label className="form-label text-muted">
                                        Model
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="model"
                                        value={instrument.model}
                                        onChange={(e) =>
                                            handleInputChange(index, e)
                                        }
                                        placeholder="Please indicate if there is any, or type N/A if otherwise"
                                    />
                                </div>

                                {/* Manufacturer */}
                                <div className="col-12 col-md-4">
                                    <label className="form-label text-muted">
                                        Manufacturer
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="manufacturer"
                                        value={instrument.manufacturer}
                                        onChange={(e) =>
                                            handleInputChange(index, e)
                                        }
                                        placeholder="Please indicate if there is any, or type N/A if otherwise"
                                    />
                                </div>

                                {/* Quantity */}
                                <div className="col-12 col-md-4">
                                    <label className="form-label text-muted">
                                        Quantity*
                                    </label>
                                    <input
                                        type="number"
                                        className={`form-control ${errors[`quantity_${index}`] ? 'input-error' : ''}`}
                                        name="qty"
                                        value={instrument.qty}
                                        onChange={(e) =>
                                            handleInputChange(index, e)
                                        }
                                        min="1"
                                    />
                                    {errors[`quantity_${index}`] && (
                                        <div className="error-message">
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            {errors[`quantity_${index}`]}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Action Buttons */}
                    <button
                        className="btn btn-outline-primary w-100 mb-4"
                        onClick={addInstrument}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Add More Instrument
                    </button>

                    <button
                        className="btn btn-primary w-100"
                        onClick={onSubmit}
                        disabled={processing}
                    >
                        <i className="bi bi-check-circle me-2"></i>
                        Update Job Order
                    </button>
                </div>
            </div>
        </div>
    );
}

EditOrder.layout = (page) => <Navbar2>{page}</Navbar2>;

export default EditOrder;
