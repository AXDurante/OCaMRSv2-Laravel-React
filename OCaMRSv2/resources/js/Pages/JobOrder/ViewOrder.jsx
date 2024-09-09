import Navbar from "../../Layouts/Navbar";

function ViewOrder({ jobOrder }) {
    return (
        <div className="d-flex">
            <div id="content" className="main-content flex-fill p-3">
                <div>
                    <h1 className="d-inline">Track Request | </h1>
                    <h1 className="d-inline fw-light">
                        {" "}
                        Job Order Request Details
                    </h1>
                    <hr />
                </div>
                <div className="mt-3">
                    <div className="row forms-bg">
                        <div className="col-12 col-md-4 p-5 profile-bg d-flex flex-column align-items-left justify-content-center p-3 text-white">
                            <h4 className="form-label fw-bold d-block text-truncate">
                                Instruments
                            </h4>
                            <label className="form-label fw-light d-block text-truncate">
                                Instrument #1
                            </label>
                            <input
                                type="text"
                                className="form-control rounded mb-3"
                                value={jobOrder.job_id}
                                readOnly
                            />
                            <label className="form-label fw-light d-block text-truncate">
                                Instrument #2
                            </label>
                            <input
                                type="text"
                                className="form-control rounded mb-3"
                                value={jobOrder.job_id}
                                readOnly
                            />
                            <label className="form-label fw-light d-block text-truncate">
                                Instrument #3
                            </label>
                            <input
                                type="text"
                                className="form-control rounded mb-3"
                                value={jobOrder.job_id}
                                readOnly
                            />
                            <label className="form-label fw-light d-block text-truncate">
                                Instrument #4
                            </label>
                            <input
                                type="text"
                                className="form-control rounded mb-3"
                                value={jobOrder.job_id}
                                readOnly
                            />
                            <label className="form-label fw-light d-block text-truncate">
                                Instrument #5
                            </label>
                            <input
                                type="text"
                                className="form-control rounded mb-3"
                                value={jobOrder.job_id}
                                readOnly
                            />
                        </div>
                        {/* Second content */}
                        <div className="col-12 col-md-8">
                            <div className="pt-5 pb-5 p-3">
                                <div className="form-group d-flex align-items-center mb-3">
                                    <label className="form-label fw-bold mb-0 me-3 w-25">
                                        Job ID
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control rounded w-75"
                                        value={jobOrder.job_id}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center mb-3">
                                    <label className="form-label fw-bold mb-0 me-3 w-25">
                                        Service Type
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control rounded w-75"
                                        value={jobOrder.service_type}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center mb-3">
                                    <label className="form-label fw-bold mb-0 me-3 w-25">
                                        Transaction Type
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control rounded w-75"
                                        value={jobOrder.trans_type}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center mb-3">
                                    <label className="form-label fw-bold mb-0 me-3 w-25">
                                        Department Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control rounded w-75"
                                        value={jobOrder.dept_name}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center mb-3">
                                    <label className="form-label fw-bold mb-0 me-3 w-25">
                                        Lab
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control rounded w-75"
                                        value={jobOrder.lab}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center mb-3">
                                    <label className="form-label fw-bold mb-0 me-3 w-25">
                                        Lab Location
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control rounded w-75"
                                        value={jobOrder.lab_loc}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center mb-3">
                                    <label className="form-label fw-bold mb-0 me-3 w-25">
                                        Position
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control rounded w-75"
                                        value={jobOrder.pos}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center mb-3">
                                    <label className="form-label fw-bold mb-0 me-3 w-25">
                                        Date Requested
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control rounded w-75"
                                        value={jobOrder.date_request}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Return Button */}
                        <a
                            href="/jobOrder"
                            className="btn btn-dark w-100 text-warning mt-2 mb-4"
                        >
                            Return
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

ViewOrder.layout = (page) => <Navbar>{page}</Navbar>;

export default ViewOrder;
