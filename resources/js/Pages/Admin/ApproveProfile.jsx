import Navbar from "../../Layouts/Navbar";

function Home() {
    return (
        <div className="d-flex">
            <div id="content" className="main-content flex-fill p-3">
                <div>
                    <div>
                        <h1 class="d-inline">Account Handler | </h1>
                        <h1 class="d-inline fw-light">Approve Client</h1>
                        <hr />
                    </div>
                    <div className="mt-3">
                        <div className="row forms-bg">
                            <div className="col-12 col-md-4 profile-bg d-flex flex-column align-items-center justify-content-center p-3 text-white">
                                <div>
                                    <i className="bi bi-person-fill fs-1"></i>
                                </div>
                                <h5>John Doe</h5>
                                <p>johndoe@gmail.com</p>
                            </div>

                            <div className="col-12 col-md-8">
                                <div className="pt-5 pb-5 p-3">
                                    <div className="row">
                                        <div className="col-12 col-sm-6 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="John"
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="Doe"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-6 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control rounded"
                                                value="johndoe@gmail.com"
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Contact Number
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="09123456789"
                                            />
                                        </div>
                                    </div>
                                    <button className="btn btn-dark w-100 text-warning mt-2 mb-4">
                                        Approve Profile
                                    </button>
                                    <button className="btn btn-dark w-100 text-warning mt-2 mb-4">
                                        Remove Profile
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
