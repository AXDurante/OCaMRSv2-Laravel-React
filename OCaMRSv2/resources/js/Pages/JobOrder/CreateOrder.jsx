import Navbar from "../../Layouts/Navbar";
import CreateInstrument from "./CreateInstrument";
import { useState } from "react";

function CreateOrder({ jobOrder }) {
    const [instruments, setInstruments] = useState([{ id: 0 }]);

    const addInstrument = () => {
        setInstruments([
            ...instruments,
            { id: instruments.length }
        ]);
    };

    const deleteInstrument = (id) => {
        setInstruments(instruments.filter(instrument => instrument.id !== id));
    };

    return (
        <>
            <div className="d-flex">
                <div id="content" className="main-content flex-fill p-3">
                    <div>
                        <div>
                            <h1 className="d-inline">Job Request | </h1>
                            <h1 className="d-inline fw-light">Open Request</h1>
                            <hr />
                        </div>

                        {/* Job Order */}
                        <div className="mt-3">
                            <h4>Information</h4>
                            <div className="row forms-bg p-3">
                                <div className="col d-flex flex-column align-items-center p-3">
                                    <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                        Service Requested
                                    </h6>
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 rounded"
                                    />
                                    <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                        Laboratory
                                    </h6>
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 rounded"
                                    />
                                    <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                        College/ Faculty / Office
                                    </h6>
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 rounded"
                                    />
                                </div>
                                <div className="col d-flex flex-column align-items-center  p-3">
                                    <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                        Instrumentation Transportation
                                    </h6>
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 rounded"
                                    />
                                    <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                        Laboratory Location
                                    </h6>
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 rounded"
                                    />
                                    <h6 className="d-flex flex-column align-items-start  fw-bold mt-2 w-100">
                                        Position
                                    </h6>
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 rounded"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Instruments Section */}
                        <div>
                            {instruments.map((instrument) => (
                                <div key={instrument.id} className="mb-3">
                                    <CreateInstrument 
                                        id={instrument.id}
                                        deleteInstrument={deleteInstrument}
                                    />
                                </div>
                            ))}
                        </div>

                        <div>
                            <button className="jb-btn-submit w-100 mt-3">
                                Submit Job Order
                            </button>
                            <button className="jb-btn-add mt-3 mb-2" onClick={addInstrument}>
                                Add More Instrument
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

CreateOrder.layout = (page) => <Navbar>{page}</Navbar>;

export default CreateOrder;
