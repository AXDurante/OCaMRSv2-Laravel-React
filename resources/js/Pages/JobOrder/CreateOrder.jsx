import { useForm } from "@inertiajs/react";
import Navbar from "../../Layouts/Navbar";
import { useState } from "react";

function CreateOrder({
    jobOrder,
    lastID,
    employeeID,
    college,
    labLoc,
    equipment,
    position
}) {
    const equipmentName = equipment?.map((item) => item.equip_name) || [];
    const [remarksError, setRemarksError] = useState("");
    const [errors, setErrors] = useState({}); // State for all errors
    const [instrumentCount, setInstrumentCount] = useState(1); // Start with 1 instrument
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data, setData, post, processing } = useForm({
        // For Job Order
        service_type: "",
        trans_type: "None",
        dept_name: college,
        lab: labLoc,
        lab_loc: labLoc,
        pos: position,
        employeeID: employeeID,
        remarks: "",
        status: "For Approval",
        priority: "Regular",

        // For Instrument Units
        instruments: [
            {
                instrument: "",
                qty: 0,
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
                qty: 0,
                model: "N/A",
                instrument_num: "",
                manufacturer: "N/A",
            },
        ]);
        setInstrumentCount(prev => prev + 1);
    };

    const removeInstrument = (index) => {
        // Prevent removing if only one instrument remains
        if (data.instruments.length <= 1) {
            alert("You must have at least one instrument.");
            return;
        }

        // Confirm deletion with user
        if (window.confirm(`Are you sure you want to delete Instrument ${index + 1}?`)) {
            const updatedInstruments = data.instruments.filter(
                (_, i) => i !== index
            );
            setData("instruments", updatedInstruments);
        }
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedInstruments = data.instruments.map((inst, i) => {
            if (i === index) {
                // Clear "N/A" when user starts typing
                if ((name === 'model' || name === 'manufacturer') && inst[name] === "N/A") {
                    return { ...inst, [name]: "" };
                }
                return { ...inst, [name]: value };
            }
            return inst;
        });
        setData("instruments", updatedInstruments);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        
        // Prevent double submission
        if (isSubmitting || processing) return;
        
        // Clear all previous errors first
        setErrors({});
        setRemarksError("");
        
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
        if (!data.service_type) {
            validationErrors.service_type = "Please select a service type.";
            hasErrors = true;
        }

        if (!data.trans_type) {
            validationErrors.trans_type = "Please input a transportation method, or None.";
            hasErrors = true;
        }

        // Remarks validation
        if (!data.remarks.trim()) {
            setRemarksError("Remarks field is required.");
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
            if (!instrument.qty || instrument.qty <= 0 || /^0+\d+$/.test(instrument.qty.toString())) {
                validationErrors[`quantity_${index}`] = "Quantity cannot be 0 or empty";
                hasErrors = true;
            }
        });

        // If there are validation errors, set them and return
        if (hasErrors) {
            setErrors(validationErrors);
            return;
        }

        // Ensure model and manufacturer are "N/A" if empty before submission
        const processedInstruments = data.instruments.map(instrument => ({
            ...instrument,
            model: instrument.model.trim() || "N/A",
            manufacturer: instrument.manufacturer.trim() || "N/A"
        }));

        setData("instruments", processedInstruments);

        // If we get here, all validation passed
        try {
            setIsSubmitting(true);

            await post(route('jobOrder.store'), {
                onSuccess: () => {
                    // Handle successful submission
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
    };

    return (
        <div className="job-request-form">
            <div className="form-section fade-in">
                <h1 className="text-2xl mb-4">
                    Job Request <span className="text-black font-light subtitle-span">| Open Request #{lastID}</span>
                </h1>
                <hr className="mb-4 border-gray-200" />

                {/* System Information Section */}
                <div className="system-info-section mb-4">
                    <h4 className="section-title">
                        <span className="section-number">1</span>
                        Your Information
                    </h4>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label text-muted">Laboratory</label>
                            <input
                                type="text"
                                className="form-input disabled-input"
                                value={data.lab}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-muted">Laboratory Location</label>
                            <input
                                type="text"
                                className="form-input disabled-input"
                                value={data.lab_loc}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-muted">College/Faculty/Office</label>
                            <input
                                type="text"
                                className="form-input disabled-input"
                                value={data.dept_name}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-muted">Position</label>
                            <input
                                type="text"
                                className="form-input disabled-input"
                                value={data.pos}
                                disabled
                            />
                        </div>
                    </div>
                </div>

                {/* Request Information Section */}
                <div className="request-info-section">
                    <h4 className="section-title">
                        <span className="section-number">2</span>
                        Request Details
                    </h4>
                    <div className="row g-3">
                        {/* Service Type */}
                        <div className="col-12 col-md-6">
                            <label className="form-label required-field">Service Requested</label>
                            <select 
                                className={`form-input ${errors.service_type ? 'input-error' : ''}`}
                                value={data.service_type}
                                onChange={(e) => setData("service_type", e.target.value)}
                            >
                                <option value="">Select Service Type</option>
                                <option value="Repair">Repair</option>
                                <option value="Calibration">Calibration</option>
                            </select>
                            {errors.service_type && (
                                <div className="error-message">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {errors.service_type}
                                </div>
                            )}
                        </div>

                        {/* Transportation */}
                        <div className="col-12 col-md-6">
                            <label className="form-label">Transportation</label>
                            <input
                                type="text"
                                className={`form-input ${errors.trans_type ? 'input-error' : ''}`}
                                value={data.trans_type}
                                onChange={(e) => setData("trans_type", e.target.value)}
                                placeholder="Please indicate if there is any, or type None if otherwise"
                            />
                            {errors.trans_type && (
                                <div className="error-message">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {errors.trans_type}
                                </div>  
                            )}
                        </div>

                        {/* Remarks */}
                        <div className="col-12">
                            <label className="form-label required-field">Remarks</label>
                            <textarea
                                className={`form-input ${remarksError ? 'input-error' : ''}`}
                                value={data.remarks}
                                onChange={(e) => setData("remarks", e.target.value)}
                                placeholder="Please provide details about your request"
                                rows="4"
                            />
                            {remarksError && (
                                <div className="error-message">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {remarksError}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Instruments Section */}
            <div className="form-section fade-in-delayed">
                <div className="section-header d-flex justify-content-between align-items-center mb-3">
                    <h3>Instruments ({instrumentCount})</h3>
                </div>
                {data.instruments.map((instrument, index) => (
                    <div key={index} className="item-card">
                        <div className="instrument-header">
                            <h5 className="instrument-title">Instrument {index + 1}</h5>
                        </div>
                        <div className="row g-3">
                            {/* Equipment Selection */}
                            <div className="col-12 col-md-6">
                                <label className="form-label required-field">Equipment</label>
                                <select
                                    className={`form-input ${errors[`instrument_${index}`] ? 'input-error' : ''}`}
                                    name="instrument"
                                    value={instrument.instrument}
                                    onChange={(e) => handleInputChange(index, e)}
                                >
                                    <option value="">Select Equipment</option>
                                    {equipmentName.map((name, i) => (
                                        <option key={i} value={name}>{name}</option>
                                    ))}
                                </select>
                                {errors[`instrument_${index}`] && (
                                <div className="error-message">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {errors[`instrument_${index}`]}
                                    </div>
                                )}
                            </div>

                            {/* Serial Number */}
                            <div className="col-12 col-md-6">
                                <label className="form-label required-field">Serial Number/Property Number</label>
                                <input
                                    type="text"
                                    className={`form-input ${errors[`serialNumber_${index}`] ? 'input-error' : ''}`}
                                    name="instrument_num"
                                    value={instrument.instrument_num}
                                    onChange={(e) => handleInputChange(index, e)}
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
                                <label className="form-label">Model</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="model"
                                    value={instrument.model === "N/A" ? "" : instrument.model}
                                    onChange={(e) => handleInputChange(index, e)}
                                    onBlur={(e) => {
                                        if (!e.target.value.trim()) {
                                            handleInputChange(index, { target: { name: 'model', value: 'N/A' } });
                                        }
                                    }}
                                    placeholder="N/A"
                                />
                            </div>

                            {/* Manufacturer */}
                            <div className="col-12 col-md-4">
                                <label className="form-label">Manufacturer</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="manufacturer"
                                    value={instrument.manufacturer === "N/A" ? "" : instrument.manufacturer}
                                    onChange={(e) => handleInputChange(index, e)}
                                    onBlur={(e) => {
                                        if (!e.target.value.trim()) {
                                            handleInputChange(index, { target: { name: 'manufacturer', value: 'N/A' } });
                                        }
                                    }}
                                    placeholder="N/A"
                                />
                            </div>

                            {/* Quantity */}
                            <div className="col-12 col-md-4">
                                <label className="form-label required-field">Quantity</label>
                                <input
                                    type="number"
                                    className={`form-input ${errors[`quantity_${index}`] ? 'input-error' : ''}`}
                                    name="qty"
                                    value={instrument.qty}
                                    onChange={(e) => handleInputChange(index, e)}
                                    min="0"
                                />
                                {errors[`quantity_${index}`] && (
                                <div className="error-message">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {errors[`quantity_${index}`]}
                                    </div>
                                )}
                            </div>

                            {/* Delete Button */}
                            <div className="col-12 text-end">
                                <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() => removeInstrument(index)}
                                >
                                    <i className="bi bi-trash me-2"></i>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    className="add-item-button"
                    onClick={addInstrument}
                >
                    <i className="bi bi-plus-lg me-2"></i>
                    Add More Instrument ({instrumentCount})
                </button>
            </div>

            <div className="form-section">
                <button
                    type="submit"
                    className="submit-job-order-button"
                    onClick={onSubmit}
                    disabled={processing || isSubmitting}
                >
                    {(processing || isSubmitting) ? (
                        <span className="loading"></span>
                    ) : (
                        <>
                            <i className="bi bi-send-fill"></i>
                            <span>Submit Job Order</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

CreateOrder.layout = (page) => {
    const props = page.props;
    return (
        <Navbar
            absolute={props.absolute}
            firstName={props.firstName}
            lastName={props.lastName}
            email={props.email}
        >
            {page}
        </Navbar>
    );
};

export default CreateOrder;
