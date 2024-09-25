import AdminNavBar from "@/Layouts/AdminNavBar";
import Navbar from "../../Layouts/Navbar";

function Home() {
    return (
        <div className="d-flex">
            <div id="content" className="main-content flex-fill p-3">
                <div>
                    <div>
                        <h1 class="d-inline">Certificate of Calibration | </h1>
                        <h1 class="d-inline fw-light">Create</h1>
                        <hr />
                    </div>
                    <div className="mt-3">
                        <div className="row forms-bg">
                            <div className="col-12 col-md-4 profile-bg d-flex flex-column align-items-center p-3 text-white">
                                <div className="mt-10">
                                    <i className="bi bi-person-fill fs-2 text-primary"></i>
                                </div>
                                <h5 className="mb-4 mt-9 ">
                                    Analytical Balance
                                </h5>

                                <div className="mt-20">
                                    <h5 className="d-inline">Priority: </h5>
                                    <h5 className="d-inline fw-light text-warning">
                                        Regular
                                    </h5>
                                </div>

                                <h6 className="mt-4">Related Documents:</h6>
                                <div className="mt-1 w-100">
                                    <button className="btn btn-light w-100 mb-2">
                                        <i className="bi bi-file-earmark-text-fill me-2"></i>
                                        Technical Service Report
                                    </button>
                                    <button className="btn btn-light w-100">
                                        <i className="bi bi-file-earmark-text-fill me-2"></i>
                                        Job Request
                                    </button>
                                </div>
                            </div>

                            <div className="col-12 col-md-8">
                                <div className="pt-5 pb-5 p-3">
                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Equipment
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="John"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Date Manufacturer
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="John"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Model No.
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="John"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Serial No.
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="John"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Date Received
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="John"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Date Calibrated
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="John"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Recommended Due Date
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="John"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Place of Calibration
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="DAPAT DROPDOWN"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Job Order No.
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="DAPAT DROPDOWN"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Remarks
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value=""
                                            />
                                        </div>
                                    </div>

                                    <div className="row"></div>
                                    <button className="btn btn-dark w-100 text-warning mt-2 mb-4">
                                        Update Profile
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

Home.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default Home;
