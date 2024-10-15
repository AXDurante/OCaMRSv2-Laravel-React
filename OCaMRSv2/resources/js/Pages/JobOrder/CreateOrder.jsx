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
}) {
    const equipmentName = equipment?.map((item) => item.equip_name) || [];

    const { data, setData, post, errors, processing } = useForm({
        // For Job Order
        service_type: "",
        trans_type: 'None',
        dept_name: college,
        lab: labLoc,
        lab_loc: labLoc,
        pos: "Laboratory Technician",
        employeeID: employeeID,
        remarks: "",
        status: "Pending",

        // For Instrument Units
        instruments: [
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
        post("/jobOrder");
    }

    return (
        <>
            <div className="d-flex">
                <div id="content" className=" flex-fill p-3">
                    <div>
                        <div>
                            <h1 class="d-inline">Job Request | </h1>
                            <h1 class="d-inline fw-light">Open Request</h1>
                            <hr />
                        </div>
                        <div className="mt3">
                            <h4>Information</h4> <p> Please fill in important* fields</p>
                            <div className="row forms-bg p-3">
                                <div className="col d-flex flex-column align-items-center p-3">
                                    <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                        Service Requested*
                                    </h6>
                                    <select
                                        className="d-flex flex-column align-items-center w-100 rounded"
                                        value={data.service_type}
                                        onChange={(e) => setData('service_type', e.target.value)}>
                                            <option value="" disabled> Select an Option </option>
                                            <option value="Repair"> Repair </option>
                                            <option value="Calibration/Maintenance"> Calibration/Maintenance </option>
                                    </select>
                                    <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                        Laboratory
                                    </h6>
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 rounded"
                                        value={data.lab}
                                        onChange={(e) =>
                                            setData("lab", e.target.value)
                                        }
                                        readOnly
                                    />
                                    <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                        College/ Faculty / Office
                                    </h6>
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 rounded"
                                        value={data.dept_name}
                                        onChange={(e) =>
                                            setData("dept_name", e.target.value)
                                        }
                                        readOnly
                                    />
                                </div>
                                <div className="col d-flex flex-column align-items-center  p-3">
                                    <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                        Instrumentation Transportation
                                    </h6>   
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 rounded"
                                        value={data.trans_type}
                                        onChange={(e) => setData('trans_type', e.target.value)}
                                        placeholder="Please indicate if there is any, or type None if otherwise"
                                    />
                                    <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                        Laboratory Location
                                    </h6>
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 rounded"
                                        value={data.lab_loc}
                                        onChange={(e) =>
                                            setData("lab_loc", e.target.value)
                                        }
                                        readOnly
                                    />
                                    <h6 className="d-flex flex-column align-items-start  fw-bold mt-2 w-100">
                                        Position
                                    </h6>
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 rounded"
                                        value={data.pos}
                                        onChange={(e) =>
                                            setData("pos", e.target.value)
                                        }
                                        readOnly
                                    />
                                </div>
                                <h6 className="w-100 fw-bold text-start"> Remarks </h6>
                                <textarea
                                    value={data.remarks}
                                    onChange={(e) => setData('remarks', e.target.value)}
                                />  
                            </div>
                        </div>
                    </div>

                    <div>
                        {data.instruments.map((instrument, index) => (
                            <div key={index} className="">
                                <h4 className="mt-4">Item No. {index + 1}</h4>
                                <div className="row forms-bg p-3">
                                    <div className="col-12 col-md-5 d-flex flex-column p-3">
                                        <h6 className="w-100 fw-bold text-start">Equipment*</h6>
                                        <select
                                            className="w-100 mb-2 rounded form-control"
                                            name="instrument"
                                            value={instrument.instrument}
                                            onChange={(e) => handleInputChange(index, e)}
                                        >
                                            <option value="">Select an equipment</option>
                                            {equipmentName.map((name, i) => (
                                                <option key={i} value={name}>
                                                    {name}
                                                </option>
                                            ))}
                                        </select>
                                        <h6 className="w-100 fw-bold text-start">Model</h6>
                                        <input
                                            type="text"
                                            className="w-100 mb-2 rounded"
                                            name="model"
                                            value={instrument.model}
                                            onChange={(e) => handleInputChange(index, e)}
                                            placeholder="Please indicate if there is any, or type N/A if otherwise"
                                        />
                                    </div>

                                    <div className="col-12 col-md-3 d-flex flex-column p-3">
                                        <h6 className="w-100 fw-bold text-start">Quantity*</h6>
                                        <input
                                            type="number"
                                            className="w-50 mb-2 justify-content-start rounded"
                                            name="qty"
                                            value={instrument.qty}
                                            onChange={(e) => handleInputChange(index, e)}
                                        />
                                        <h6 className="w-100 fw-bold text-start">Manufacturer</h6>
                                        <input
                                            type="text"
                                            className="w-100 mb-2 rounded"
                                            name="manufacturer"
                                            value={instrument.manufacturer}
                                            onChange={(e) => handleInputChange(index, e)}
                                            placeholder="Please indicate if there is any, or type N/A if otherwise"
                                        />
                                    </div>

                                    <div className="col-12 col-md-4 d-flex flex-column p-3">
                                        <h6 className="w-100 fw-bold text-start"> Serial Number/Property Number* </h6>
                                        <input
                                            type="number"
                                            className="w-100 mb-2 rounded"
                                            name="instrument_num"
                                            value={instrument.instrument_num}
                                            onChange={(e) => handleInputChange(index, e)}
                                        />
                                    </div>
                                    <div className="col-12 d-flex flex-row-reverse">
                                        <button className="btn btn-danger" onClick={() => removeInstrument(index)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button className="jb-btn-add mt-3 mb-2" onClick={addInstrument}>
                            Add More Instrument
                        </button>
                        <hr />
                        <button className="jb-btn-submit w-100 mt-3"
                                onClick={onSubmit}> Submit Job Order</button>
                    </div>
                </div>
            </div>
        </>
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
