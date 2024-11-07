import React, { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import Navbar from "../../Layouts/Navbar";

function TrackOrder({ jobOrder, firstName, lastName, email, currentSort, currentFilter }) {
    const [sortBy, setSortBy] = useState(currentSort || "newest");
    const [filterStatus, setFilterStatus] = useState(currentFilter || "all");
    const { get } = useForm();

    useEffect(() => {
        if (currentSort !== sortBy || currentFilter !== filterStatus) {
            get(route("jobOrder.index", { 
                sort: sortBy,
                filter: filterStatus 
            }), {
                preserveState: true,
                preserveScroll: true,
            });
        }
    }, [sortBy, filterStatus]);

    // Filter job orders based on status
    const filteredJobOrders = filterStatus === "all" 
        ? jobOrder 
        : jobOrder.filter(order => order.status.toLowerCase() === filterStatus.toLowerCase());

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

                <div className="d-flex align-items-center gap-3 mt-4">
                    <div className="filter-group">
                        <div className="filter-label">Sort by</div>
                        <select
                            className="filter-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <div className="filter-label">Filter</div>
                        <select
                            className="filter-select"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Orders</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                {filteredJobOrders.map((jobOrder) => {
                    console.log('Job Order feedback status:', {
                        id: jobOrder.job_id,
                        has_feedback: jobOrder.has_feedback,
                        feedback_id: jobOrder.feedback_id
                    });

                    return (
                        <div
                            className="card mt-4 order-card fade-in hover-lift"
                            id="cardTrackReq"
                            key={jobOrder.job_id}
                        >
                            <div className="card-body p-4">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <div className="service-icon-wrapper">
                                            <img
                                                src="images/Repair.png"
                                                alt="Service"
                                                className="service-icon"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="col">
                                        <div className="order-details">
                                            <h5 className="order-title mb-3">
                                                Service Request #{jobOrder.job_id}
                                                <span className={`status-badge status-${jobOrder.status.toLowerCase()}`}>
                                                    {jobOrder.status}
                                                </span>
                                            </h5>
                                            
                                            <div className="order-info">
                                                <div className="info-item">
                                                    <i className="bi bi-calendar3 me-2"></i>
                                                    <span>Created: {jobOrder.date_request}</span>
                                                </div>
                                                <div className="info-item">
                                                    <i className="bi bi-clock-history me-2"></i>
                                                    <span>Due: {jobOrder.date_due}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="action-buttons mt-3">
                                            {jobOrder.status === "Completed" && (
                                                <>
                                                    {Boolean(jobOrder.has_feedback) ? (
                                                        <Link 
                                                            href={`/feedback/${jobOrder.feedback_id}`}
                                                            className="me-2"
                                                        >
                                                            <button className="btn btn-view-feedback">
                                                                <i className="bi bi-star-fill me-2"></i>
                                                                View Feedback
                                                            </button>
                                                        </Link>
                                                    ) : (
                                                        <Link 
                                                            href={route('feedback.create', { jobOrderId: jobOrder.job_id })}
                                                            className="me-2"
                                                        >
                                                            <button className="btn btn-give-feedback">
                                                                <i className="bi bi-star me-2"></i>
                                                                Give Feedback
                                                            </button>
                                                        </Link>
                                                    )}
                                                </>
                                            )}
                                            <Link href={`jobOrder/${jobOrder.job_id}`}>
                                                <button className="btn btn-details">
                                                    <i className="bi bi-arrow-right-circle me-2"></i>
                                                    See Details
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {filteredJobOrders.length === 0 && (
                    <div className="alert alert-info mt-4 fade-in">
                        No job orders found for the selected status.
                    </div>
                )}
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
