import { Link } from "@inertiajs/react";
import Navbar from "../../Layouts/Navbar";
import JobOrder from "./CreateOrder";

function TrackOrder({ jobOrder, firstName, lastName, email }) {
    console.log("Job Order props:", { jobOrder, firstName, lastName, email });

    return (
        <div className="d-flex">
            {/* Search Button */}
            <div id="content" className="main-content flex-fill p-3">
                <div>
                    <div>
                        <h1 className="d-inline">Track Request | </h1>
                        <h1 className="d-inline fw-light">
                            Track Job Order Request
                        </h1>
                        <hr />
                    </div>

                    <div className="search-bar mt-3">
                        <div className="input-group shadow-sm">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                aria-label="Search"
                                aria-describedby="search-button"
                            />
                            <button
                                className="btn btn-primary"
                                type="button"
                                id="search-button"
                            >
                                Search
                            </button>
                        </div>

                        <div className="container"></div>
                    </div>

                    {/* Card */}
                    {jobOrder.map((jobOrder) => (
                        <div
                            className="card mt-4 shadow-sm"
                            id="cardTrackReq"
                            key={jobOrder.job_id}
                        >
                            <div className="card-body">
                                <div className="row align-items-center">
                                    {/* Image */}
                                    <div className="col-auto">
                                        <img
                                            src="https://via.placeholder.com/100"
                                            alt="Placeholder"
                                            className="me-3"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                            }}
                                        />
                                    </div>

                                    {/* Text content */}
                                    <div className="col">
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="flex-grow-1">
                                                    <p className="text-muted">
                                                        ID: {jobOrder.job_id}
                                                    </p>
                                                    <h5 className="card-title">
                                                        Instrument Title:
                                                    </h5>

                                                    <h6 className="card-subtitle mt-3">
                                                        Status
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="align-self-center ">
                                                    <p>
                                                        Date Created:{" "}
                                                        {jobOrder.date_request}
                                                    </p>
                                                    <p>Due Date: </p>
                                                </div>
                                                <div className="d-flex justify-content-end">
                                                    <Link href={`feedback`}>
                                                        <button
                                                            className="btn btn-secondary me-2"
                                                            id="btnFeed"
                                                        >
                                                            Give Feedback
                                                        </button>
                                                    </Link>
                                                    <Link
                                                        href={`jobOrder/${jobOrder.job_id}`}
                                                    >
                                                        <button
                                                            className="btn btn-primary"
                                                            id="btnSee"
                                                        >
                                                            See Details
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

TrackOrder.layout = (page) => {
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
export default TrackOrder;
