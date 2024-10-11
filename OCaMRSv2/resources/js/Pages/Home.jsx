import Navbar from "../Layouts/Navbar";

function Home({ absolute, firstName, lastName, email }) {
    console.log("Home props:", { absolute, firstName, lastName, email });
    return (
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
                </div>

                <div>
                    <div className="">
                        <h4 className="mt-4">Item No.1</h4>
                        <div className="row forms-bg p-3">
                            <div className="row forms-bg p-3">
                                <div className="col-12 col-md-5 d-flex flex-column p-3">
                                    <h6 className="w-100 fw-bold text-start">
                                        Instrument
                                    </h6>
                                    <input
                                        type="text"
                                        className="w-100 mb-2 rounded"
                                    />
                                    <h6 className="w-100 fw-bold text-start">
                                        Model
                                    </h6>
                                    <input
                                        type="text"
                                        className="w-100 mb-2 rounded"
                                    />
                                    <h6 className="w-100 fw-bold text-start">
                                        Image Attachment
                                    </h6>
                                    <button className="btn btn-secondary w-50">
                                        + Insert Image
                                    </button>
                                </div>

                                <div className="col-12 col-md-3 d-flex flex-column p-3">
                                    <h6 className="w-100 fw-bold text-start">
                                        Quantity
                                    </h6>
                                    <input
                                        type="text"
                                        className="w-50 mb-2 justify-content-start rounded"
                                    />
                                    <h6 className="w-100 fw-bold text-start">
                                        Manufacturer
                                    </h6>
                                    <input
                                        type="text"
                                        className="w-100 mb-2 rounded"
                                    />
                                </div>

                                <div className="col-12 col-md-4 d-flex flex-column p-3">
                                    <h6 className="w-100 fw-bold text-start ">
                                        Instrument Serial No
                                    </h6>
                                    <input
                                        type="text"
                                        className="w-100 fw-bold mb-2 rounded"
                                    />
                                    <h6 className="w-100 fw-bold text-start">
                                        Property
                                    </h6>
                                    <input
                                        type="text"
                                        className="w-100 mb-2 rounded"
                                    />
                                </div>

                                <div className="col-12 d-flex flex-row-reverse">
                                    <button className="btn btn-danger">
                                        delete
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button className="jb-btn-add mt-3 mb-2">
                            Add More Instrument
                        </button>
                    </div>
                    <hr />
                    <button className="jb-btn-submit w-100 mt-3">
                        Submit Job Order
                    </button>
                </div>
            </div>
        </div>
    );
}

Home.layout = (page) => {
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

export default Home;
