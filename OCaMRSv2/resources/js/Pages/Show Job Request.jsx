import Navbar from "../Layouts/Navbar";

function Home() {
    return (
        <div className="d-flex">
            <div id="content" className="main-content flex-fill p-3">
                <div>
                    <div>
                        <h1 class="d-inline">Analytical Balance | </h1>
                        <h1 class="d-inline fw-light">2369420</h1>
                        <hr />
                    </div>
                    <div className="mt-3">
                        <div className="row forms-bg">
                            <div className="col-12 col-md-3 d-flex flex-column align-items-center p-4 bg-dark text-white">
                                <div className="circle d-flex justify-content-center align-items-center mt-5">
                                    {/* Icon can be added here */}
                                    <img
                                        src="/path/to/your/icon.png"
                                        alt="Analytical Balance Icon"
                                        className="img-fluid"
                                    />
                                </div>
                                <h3 className="mt-4 mb-5">
                                    Analytical Balance
                                </h3>

                                <div className="d-flex align-items-center mt-20 mb-3">
                                    <h5 className="mb-0">Priority:</h5>
                                    <h5 className="mb-0 ms-2 text-success">
                                        Main
                                    </h5>
                                </div>

                                <button className="btn btn-green mb-2 w-65">
                                    Set as Priority Request
                                </button>
                                <button className="btn btn-danger w-100 mt-10">
                                    Delete Request
                                </button>
                            </div>
                            <div className="col-12 col-md-9">
                                <div className="pt-5 pb-5 p-3">
                                    <div className="row">
                                        <div className="col-12 col-sm-2 mb-3">
                                            <label className="form-label fw-bold d-block ">
                                                Tracking ID
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-6 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-2 mb-3">
                                            <label className="form-label fw-bold d-block ">
                                                Date Requested
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-6 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-2 mb-3">
                                            <label className="form-label fw-bold d-block ">
                                                Client Name
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-6 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-2 mb-3">
                                            <label className="form-label fw-bold d-block ">
                                                Instrument
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-6 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-2 mb-3">
                                            <label className="form-label fw-bold d-block ">
                                                Service Requested
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-6 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-2 mb-3">
                                            <label className="form-label fw-bold d-block ">
                                                Status
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-6 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-2 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Stage
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-6 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-2 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Action
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-6 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="d-flex align-items-center mt-3 mb-2">
                                            <h4 className="mb-0">
                                                Technician:
                                            </h4>
                                            <h4 className="mb-0 ms-2">N/A</h4>
                                        </div>
                                        <h5 className="mt-3 mb-2">
                                            Related Documents:{" "}
                                        </h5>
                                        <button className="btn btn-white fw-bold">
                                            Certificate of Calibration
                                        </button>
                                        <button className="btn  btn-white fw-bold">
                                            Technical Service Report
                                        </button>
                                    </div>

                                    <button className="btn btn-yellow w-100 mt-5 mb-4 fw-bold">
                                        Download Softcopy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Home.layout = (page) => <Navbar>{page}</Navbar>;

export default Home;
