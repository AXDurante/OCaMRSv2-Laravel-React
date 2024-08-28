import Navbar from "../Layouts/Navbar";

// Job Order Forms
function Home() {
    return (
        <div className="d-flex">
            <div id="content" className="main-content flex-fill p-3">
                <div>
                    <div>
                        <h1 class="d-inline">Job Request | </h1>
                        <h1 class="d-inline fw-light">Open Request</h1>
                        <hr />
                    </div>
                    <div>
                        <h4>Information</h4>
                        <div className="row forms-bg p-3">
                            <div className="col d-flex flex-column align-items-center p-3">
                                <h6 className="d-flex flex-column align-items-start w-100">
                                    Info
                                </h6>
                                <input
                                    type="text"
                                    className="d-flex flex-column align-items-center w-100"
                                />
                                <h6 className="d-flex flex-column align-items-start w-100">
                                    Info
                                </h6>
                                <input
                                    type="text"
                                    className="d-flex flex-column align-items-center w-100"
                                />
                                <h6 className="d-flex flex-column align-items-start w-100">
                                    Info
                                </h6>
                                <input
                                    type="text"
                                    className="d-flex flex-column align-items-center w-100"
                                />
                            </div>
                            <div className="col d-flex flex-column align-items-center p-3">
                                <h6 className="d-flex flex-column align-items-start w-100">
                                    Info
                                </h6>
                                <input
                                    type="text"
                                    className="d-flex flex-column align-items-center w-100"
                                />
                                <h6 className="d-flex flex-column align-items-start w-100">
                                    Info
                                </h6>
                                <input
                                    type="text"
                                    className="d-flex flex-column align-items-center w-100"
                                />
                                <h6 className="d-flex flex-column align-items-start w-100">
                                    Info
                                </h6>
                                <input
                                    type="text"
                                    className="d-flex flex-column align-items-center w-100"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <h4>Information</h4>
                        <div className="row forms-bg p-3">
                            <div className="row forms-bg p-3">
                                <div className="col custom-col-50 d-flex flex-column align-items-center p-3">
                                    <h6 className="w-100 text-start">Info</h6>
                                    <input type="text" className="w-100 mb-2" />
                                    <h6 className="w-100 text-start">Info</h6>
                                    <input type="text" className="w-100 mb-2" />
                                    <h6 className="w-100 text-start">Info</h6>
                                    <input type="text" className="w-100 mb-2" />
                                </div>
                                <div className="col custom-col-25 d-flex flex-column align-items-center p-3">
                                    <h6 className="w-100 text-start">Info</h6>
                                    <input type="text" className="w-100 mb-2" />
                                    <h6 className="w-100 text-start">Info</h6>
                                    <input type="text" className="w-100 mb-2" />
                                    <h6 className="w-100 text-start">Info</h6>
                                    <input type="text" className="w-100 mb-2" />
                                </div>
                                <div className="col custom-col-25 d-flex flex-column align-items-center p-3">
                                    <h6 className="w-100 text-start">Info</h6>
                                    <input type="text" className="w-100 mb-2" />
                                    <h6 className="w-100 text-start">Info</h6>
                                    <input type="text" className="w-100 mb-2" />
                                    <h6 className="w-100 text-start">Info</h6>
                                    <input type="text" className="w-100 mb-2" />
                                </div>
                                <div className="d-flex flex-row-reverse">
                                    <button className="btn btn-danger align-items-end">
                                        delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <button className="jb-btn-submit  w-100 mt-3">Submit</button>
            </div>
        </div>
    );
}

Home.layout = (page) => <Navbar>{page}</Navbar>;

export default Home;