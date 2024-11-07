import Navbar2 from "../../Layouts/Navbar2";
import { Link } from "@inertiajs/react";

function ViewOrder({ jobOrder }) {
    console.log("Job Order Data:", jobOrder); // Debugging: Check the jobOrder structure

    // Check if jobOrder is defined and has instruments
    const instruments = jobOrder?.int_units || []; // Use int_units instead of instruments
    console.log(instruments);
    return (
        <div className="d-flex">
            <div id="content" className="flex-fill p-3">
                <div>
                    <h1 className="d-inline">Track Request | </h1>
                    <h1 className="d-inline fw-light">
                        Job Order Request Details
                    </h1>
                    <h4>
                        {" "}
                        Status:{" "}
                        <b
                            className={
                                jobOrder.status === "Processing"
                                    ? "text-warning"
                                    : jobOrder.status === "Cancelled"
                                    ? "text-danger"
                                    : jobOrder.status === "Completed" // Added condition for Completed
                                    ? "text-success" // Green text for Completed
                                    : ""
                            }
                        >
                            {" "}
                            {jobOrder.status}{" "}
                        </b>
                    </h4>
                    <hr />
                </div>
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
                                value={jobOrder?.service_type || ""}
                                readOnly
                            />
                            <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                Laboratory
                            </h6>
                            <input
                                type="text"
                                className="d-flex flex-column align-items-center w-100 rounded"
                                value={jobOrder?.lab || ""}
                                readOnly
                                disabled
                            />
                            <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                College/ Faculty / Office
                            </h6>
                            <input
                                type="text"
                                className="d-flex flex-column align-items-center w-100 rounded"
                                value={jobOrder?.dept_name || ""}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="col d-flex flex-column align-items-center p-3">
                            <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                Instrumentation Transportation
                            </h6>
                            <input
                                type="text"
                                className="d-flex flex-column align-items-center w-100 rounded"
                                value={jobOrder?.trans_type || ""}
                                readOnly
                            />
                            <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                Laboratory Location
                            </h6>
                            <input
                                type="text"
                                className="d-flex flex-column align-items-center w-100 rounded"
                                value={jobOrder?.lab_loc || ""}
                                readOnly
                                disabled
                            />
                            <h6 className="d-flex flex-column align-items-start fw-bold mt-2 w-100">
                                Position
                            </h6>
                            <input
                                type="text"
                                className="d-flex flex-column align-items-center w-100 rounded"
                                value={jobOrder?.pos || ""}
                                readOnly
                                disabled
                            />
                        </div>
                        <h6 className="w-100 fw-bold text-start"> Remarks </h6>
                        <textarea
                            value={jobOrder.remarks}
                            onChange={(e) => setData("remarks", e.target.value)}
                            readOnly
                            disabled
                        />
                    </div>
                </div>

                <div>
                    <h4 className="mt-4">Instruments</h4>
                    {instruments.length > 0 ? (
                        instruments.map((instrument, index) => (
                            <div key={index} className="">
                                <h4 className="mt-4">Item No. {index + 1}</h4>
                                <div className="row forms-bg p-3">
                                    <div className="col-12 col-md-5 d-flex flex-column p-3">
                                        <h6 className="w-100 fw-bold text-start">
                                            Instrument
                                        </h6>
                                        <input
                                            type="text"
                                            className="w-100 mb-2 rounded"
                                            value={instrument.instrument}
                                            readOnly
                                        />
                                        <h6 className="w-100 fw-bold text-start">
                                            Model
                                        </h6>
                                        <input
                                            type="text"
                                            className="w-100 mb-2 rounded"
                                            value={instrument.model}
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-12 col-md-3 d-flex flex-column p-3">
                                        <h6 className="w-100 fw-bold text-start">
                                            Quantity
                                        </h6>
                                        <input
                                            type="number"
                                            className="w-50 mb-2 justify-content-start rounded"
                                            value={instrument.qty}
                                            readOnly
                                        />
                                        <h6 className="w-100 fw-bold text-start">
                                            Manufacturer
                                        </h6>
                                        <input
                                            type="text"
                                            className="w-100 mb-2 rounded"
                                            value={instrument.manufacturer}
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-12 col-md-4 d-flex flex-column p-3">
                                        <h6 className="w-100 fw-bold text-start">
                                            Serial Number/Property Number
                                        </h6>
                                        <input
                                            type="number"
                                            className="w-100 mb-2 rounded"
                                            value={instrument.instrument_num}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No instruments available.</p>
                    )}
                </div>
                <Link
                    href={`/technician/showJobOrder/${jobOrder.job_id}/edit`}
                    className="btn btn-success w-100"
                >
                    Edit
                </Link>

                <Link
                    href={`/technician/TSR/${jobOrder.job_id}/create`}
                    className="btn btn-warning w-100 mt-2"
                >
                    Create Technical Service Report
                </Link>

                <Link
                    href={`/technician/TSR/${jobOrder.job_id}`}
                    className="btn btn-info w-100 mt-2"
                >
                    View Technical Service Reports
                </Link>

                {/* Return Button */}
                <a
                    href="/admin"
                    className="btn btn-dark w-100 text-warning mt-2 mb-4"
                >
                    Return
                </a>
            </div>
        </div>
    );
}

ViewOrder.layout = (page) => <Navbar2>{page}</Navbar2>;

export default ViewOrder;
