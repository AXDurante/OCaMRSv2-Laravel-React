import React, { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import Navbar from "../../Layouts/Navbar";

function TrackOrder({
    jobOrder,
    firstName,
    lastName,
    email,
    currentSort,
    flash,
}) {
    const [sortBy, setSortBy] = useState(currentSort || "newest");
    const { get } = useForm();
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (flash.success) {
            setSuccessMessage(flash.success);
        } else {
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [flash]);

    useEffect(() => {
        get(route("jobOrder.index", { sortBy }), {
            preserveState: true,
            preserveScroll: true,
        });
    }, [sortBy]);

    console.log("Job Order props:", { jobOrder, firstName, lastName, email });

    return (
        <div className="">
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
                </div>

                <div className="d-flex align-items-center mt-3">
                    <span className="me-2">Sort by:</span>
                    <select
                        className="form-select w-auto"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
                {successMessage && (
                    <div
                        role="alert"
                        className="mt-2 alert alert-success w-100"
                    >
                        <h6 className="text-base font-semibold">
                            {successMessage}
                        </h6>
                    </div>
                )}

                {jobOrder.map((jobOrder) => (
                    <div
                        className="card mt-4 shadow-sm"
                        id="cardTrackReq"
                        key={jobOrder.job_id}
                    >
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <img
                                        src="images/Repair.png"
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
                                                    Status: {jobOrder.status}
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="align-self-center ">
                                                <p>
                                                    Date Created:{" "}
                                                    {jobOrder.date_request}
                                                </p>
                                                <p>
                                                    Due Date:{" "}
                                                    {jobOrder.date_due}{" "}
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                {jobOrder.status ===
                                                    "Completed" && (
                                                    <Link href={`feedback`}>
                                                        <button
                                                            className="btn btn-secondary me-2"
                                                            id="btnFeed"
                                                        >
                                                            Give Feedback
                                                        </button>
                                                    </Link>
                                                )}
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
