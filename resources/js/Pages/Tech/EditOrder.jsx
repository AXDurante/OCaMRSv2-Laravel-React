import { useForm } from "@inertiajs/react";
import Navbar2 from "@/Layouts/Navbar2";

function EditOrder({ jobOrder, equipment, college, labLoc, employeeID }) {
    const equipmentName = equipment?.map((item) => item.equip_name) || [];

    const { data, setData, put, errors, processing } = useForm({
        service_type: jobOrder.service_type || "",
        trans_type: jobOrder.trans_type || "None",
        dept_name: college,
        lab: labLoc,
        lab_loc: labLoc,
        pos: "Laboratory Technician",
        employeeID: employeeID,
        remarks: jobOrder.remarks || "",
        status: jobOrder.status || "Pending",
        priority: jobOrder.priority || "Regular",

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
                qty: "",
                model: "N/A",
                instrument_num: "",
                manufacturer: "N/A",
            },
        ]);
    };

    const removeInstrument = (index) => {
        const updatedInstruments = data.instruments.filter(
            (_, i) => i !== index
        );
        setData("instruments", updatedInstruments);
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedInstruments = data.instruments.map((inst, i) =>
            i === index ? { ...inst, [name]: value } : inst
        );
        setData("instruments", updatedInstruments);
    };

    function onSubmit(e) {
        e.preventDefault();
        put(route("technician.updateJobOrder", jobOrder.job_id));
    }

    return (
        <div className="job-request-form">
            {/* Header Section */}
            <div className="form-section fade-in">
                <h1 className="text-2xl mb-4">
                    Job Request{" "}
                    <span className="text-black font-light subtitle-span">
                        | Update Request
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
                                <option value="For Approval">
                                    For Approval
                                </option>
                                <option value="Approved">Approved</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </h4>
                    <h4>
                        Priority:{" "}
                        <div className="dropdown d-inline-block">
                            <select
                                className="btn btn-light dropdown-toggle"
                                value={data.priority}
                                onChange={(e) =>
                                    setData("priority", e.target.value)
                                }
                            >
                                <option value="Regular">Regular</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
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
                                className="form-control"
                                value={data.trans_type}
                                onChange={(e) =>
                                    setData("trans_type", e.target.value)
                                }
                                placeholder="Please indicate if there is any, or type None if otherwise"
                            />
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
                                            <option value="">
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
                                        className="form-control"
                                        name="instrument_num"
                                        value={instrument.instrument_num}
                                        onChange={(e) =>
                                            handleInputChange(index, e)
                                        }
                                    />
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
                                        className="form-control"
                                        name="qty"
                                        value={instrument.qty}
                                        onChange={(e) =>
                                            handleInputChange(index, e)
                                        }
                                    />
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
