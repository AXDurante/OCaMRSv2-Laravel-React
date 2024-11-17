import React, { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import Navbar from "../../Layouts/Navbar";

function TrackOrder({
    jobOrder,
    firstName,
    lastName,
    email,
    currentSort,
    currentFilter,
    flash = {},
}) {
    const [sortBy, setSortBy] = useState(currentSort || "newest");
    const [filterStatus, setFilterStatus] = useState(currentFilter || "all");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { get } = useForm();
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (flash?.success) {
            setSuccessMessage(flash.success);
            
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [flash]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            get(
                route("jobOrder.index", {
                    sort: sortBy,
                    filter: filterStatus,
                    search: searchQuery,
                    page: currentPage,
                }),
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            );
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [sortBy, filterStatus, searchQuery, currentPage]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    console.log("Job Order props:", { jobOrder, firstName, lastName, email });

    const handlePageClick = (url) => {
        const pageMatch = url.match(/page=(\d+)/);
        if (pageMatch) {
            setCurrentPage(parseInt(pageMatch[1]));
        }
    };

    return (
        <div className="">
            <div id="content" className="flex-fill p-3">
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
                            placeholder="Search by ID, service type, department..."
                            aria-label="Search"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
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
                            <option value="For Approval">For Approval</option>
                            <option value="Approved">Approved</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
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

                {jobOrder.data.map((order) => (
                    <div
                        className="card mt-4 order-card fade-in hover-lift"
                        id="cardTrackReq"
                        key={order.job_id}
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
                                            Service Request #{order.job_id}
                                            <span
                                                className={`status-badge status-${order.status.toLowerCase().replace(' ', '-')}`}
                                            >
                                                {order.status}
                                            </span>
                                        </h5>

                                        <div className="order-info">
                                            <div className="info-item">
                                                <i className="bi bi-calendar3 me-2"></i>
                                                <span>Created: {order.date_request}</span>
                                            </div>
                                            <div className="info-item">
                                                <i className="bi bi-clock-history me-2"></i>
                                                <span>Due: {order.date_due}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="action-buttons mt-3">
                                        {order.status === "Completed" && (
                                            <>
                                                {Boolean(order.has_feedback) ? (
                                                    <Link
                                                        href={`/feedback/${order.feedback_id}`}
                                                        className="me-2"
                                                    >
                                                        <button className="btn btn-view-feedback">
                                                            <i className="bi bi-star-fill me-2"></i>
                                                            View Feedback
                                                        </button>
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        href={route("feedback.create", {
                                                            jobOrderId: order.job_id,
                                                        })}
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
                                        <Link href={`jobOrder/${order.job_id}`}>
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
                ))}

                {jobOrder.data.length === 0 && (
                    <div className="alert alert-info mt-4 fade-in">
                        No job orders found for the selected status.
                    </div>
                )}

                {/* Pagination links */}
                <div className="pagination-container mt-5 mb-4">
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                            {jobOrder.links.map((link, index) => {
                                if (link.label.includes("...")) {
                                    return (
                                        <li key={index} className="page-item disabled">
                                            <span className="page-link">...</span>
                                        </li>
                                    );
                                }

                                return (
                                    <li 
                                        key={index} 
                                        className={`page-item ${link.active ? 'active' : ''} ${
                                            link.url === null ? 'disabled' : ''
                                        }`}
                                    >
                                        <Link
                                            className="page-link"
                                            href={link.url || '#'}
                                            preserveScroll
                                            preserveState
                                            onClick={(e) => {
                                                if (link.url) {
                                                    e.preventDefault();
                                                    handlePageClick(link.url);
                                                }
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
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
