import { useForm } from "@inertiajs/react";
import Navbar from "../../Layouts/Navbar";
import { useState } from "react";

function CreateOrder({ jobOrder, lastID, employeeID }) {
    const { data, setData, post, errors, processing } = useForm({
        // For Job Order
        service_type: "",
        trans_type: "",
        dept_name: "",
        lab: "",
        lab_loc: "",
        pos: "",
        employeeID: employeeID, // Add employeeID here

        // For Instrument Units
        instruments: [
            {
                instrument: "",
                qty: "",
                model: "",
                serial_num: "",
                manufacturer: "",
                property_num: "",
            },
        ],
    });

    const addInstrument = () => {
        setData('instruments', [
            ...data.instruments,
            {
                instrument: "",
                qty: "",
                model: "",
                serial_num: "",
                manufacturer: "",
                property_num: "",
            },
        ]);
    };

    const removeInstrument = (index) => {
        const updatedInstruments = data.instruments.filter((_, i) => i !== index);
        setData('instruments', updatedInstruments);
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedInstruments = data.instruments.map((inst, i) =>
            i === index ? { ...inst, [name]: value } : inst
        );
        setData('instruments', updatedInstruments);
    };

    function onSubmit(e) {
        e.preventDefault();
        post('/jobOrder');
    }

    return (
        <>
            <div className="d-flex">
                <div id="content" className="main-content flex-fill p-3">
                    <div>
                        <div>
                            <h1 class="d-inline">Job Request | </h1>
                            <h1 class="d-inline fw-light">Open Request</h1>
                            <hr />
                        </div>
                        <div className="mt3">
                            <h4>Information</h4>
                            <div className="row forms-bg p-3">
                                <div className="col d-flex flex-column align-items-center p-3">
                                    <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                        Service Requested
                                    </h6>
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 rounded"
                                        value={data.service_type}
                                        onChange={(e) => setData('service_type', e.target.value)}
                                    />
                                    <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                        Laboratory
                                    </h6>
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 rounded"
                                        value={data.lab}
                                        onChange={(e) => setData('lab', e.target.value)}
                                    />
                                    <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                        College/ Faculty / Office
                                    </h6>
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 rounded"
                                        value={data.dept_name}
                                        onChange={(e) => setData('dept_name', e.target.value)}
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
                                    />
                                    <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                        Laboratory Location
                                    </h6>
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 rounded"
                                        value={data.lab_loc}
                                        onChange={(e) => setData('lab_loc', e.target.value)}
                                    />
                                    <h6 className="d-flex flex-column align-items-start  fw-bold mt-2 w-100">
                                        Position
                                    </h6>
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 rounded"
                                        value={data.pos}
                                        onChange={(e) => setData('pos', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        {data.instruments.map((instrument, index) => (
                            <div key={index} className="">
                                <h4 className="mt-4">Item No. {index + 1}</h4>
                                <div className="row forms-bg p-3">
                                    <div className="col-12 col-md-5 d-flex flex-column p-3">
                                        <h6 className="w-100 fw-bold text-start">Instrument</h6>
                                        <input
                                            type="text"
                                            className="w-100 mb-2 rounded"
                                            name="instrument"
                                            value={instrument.instrument}
                                            onChange={(e) => handleInputChange(index, e)}
                                        />
                                        <h6 className="w-100 fw-bold text-start">Model</h6>
                                        <input
                                            type="text"
                                            className="w-100 mb-2 rounded"
                                            name="model"
                                            value={instrument.model}
                                            onChange={(e) => handleInputChange(index, e)}
                                        />
                                        <h6 className="w-100 fw-bold text-start">Image Attachment</h6>
                                        <button className="btn btn-secondary w-50">+ Insert Image</button>
                                    </div>

                                    <div className="col-12 col-md-3 d-flex flex-column p-3">
                                        <h6 className="w-100 fw-bold text-start">Quantity</h6>
                                        <input
                                            type="text"
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
                                        />
                                    </div>

                                    <div className="col-12 col-md-4 d-flex flex-column p-3">
                                        <h6 className="w-100 fw-bold text-start">Instrument Serial No</h6>
                                        <input
                                            type="text"
                                            className="w-100 fw-bold mb-2 rounded"
                                            name="serial_num"
                                            value={instrument.serial_num}
                                            onChange={(e) => handleInputChange(index, e)}
                                        />
                                        <h6 className="w-100 fw-bold text-start">Property</h6>
                                        <input
                                            type="text"
                                            className="w-100 mb-2 rounded"
                                            name="property_num"
                                            value={instrument.property_num}
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
                        <button onClick={onSubmit}>
                            Submit
                        </button>
                        <button className="jb-btn-submit w-100 mt-3">Submit Job Order</button>
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
