import AdminNavBar from "@/Layouts/AdminNavBar";
import Navbar from "../../Layouts/Navbar";
import { Link, useForm } from "@inertiajs/react";
import {
    FaCheck,
    FaHourglassHalf,
    FaTimesCircle,
    FaCheckCircle,
    FaSpinner,
    FaClock,
} from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Home({ jobOrder, totalCounts, filters }) {
    const { get } = useForm();
    const [sortBy, setSortBy] = useState(filters?.sort || "newest");
    const [filterStatus, setFilterStatus] = useState(filters?.status || "all");
    const [searchQuery, setSearchQuery] = useState(filters?.search || "");
    const [filterPriority, setFilterPriority] = useState(
        filters?.priority || "all"
    );
    const [openDropdown, setOpenDropdown] = useState(null);

    // Add debounced search effect
    useEffect(() => {
        const timer = setTimeout(() => {
            get(
                route("admin.home", {
                    search: searchQuery,
                    status: filterStatus,
                    priority: filterPriority,
                    sort: sortBy,
                }),
                {
                    preserveState: true,
                    preserveScroll: false,
                    replace: true,
                }
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, filterStatus, filterPriority, sortBy]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterStatusChange = (status) => {
        setFilterStatus(status);
    };

    const handlePriorityChange = (priority) => {
        setFilterPriority(priority);
    };

    const handleSortChange = (sort) => {
        setSortBy(sort);
    };

    // Filter and sort the job orders
    const filteredAndSortedOrders = jobOrder.data
        .filter((order) => {
            // First apply status filter
            if (filterStatus !== "all" && order.status !== filterStatus) {
                return false;
            }

            // Then apply priority filter
            if (filterPriority !== "all" && order.priority !== filterPriority) {
                return false;
            }

            // Then apply search filter if there's a search query
            if (searchQuery.trim()) {
                const searchLower = searchQuery.toLowerCase().trim();

                // Check if user exists before accessing properties
                if (order.user) {
                    const clientName =
                        `${order.user.firstName} ${order.user.lastName}`.toLowerCase();
                    const email = order.user.email.toLowerCase();
                    const jobId = order.job_id.toString().toLowerCase();

                    // Return true if any field matches the search query
                    return (
                        clientName.includes(searchLower) ||
                        email.includes(searchLower) ||
                        jobId.includes(searchLower)
                    );
                }
                return false;
            }

            return true;
        })
        .sort((a, b) => {
            // Sort by date
            const dateA = new Date(a.date_request);
            const dateB = new Date(b.date_request);
            return sortBy === "newest" ? dateB - dateA : dateA - dateB;
        });

    const totalRequests = jobOrder.data.length;
    const cancelledRequests = jobOrder.data.filter(
        (order) => order.status === "Cancelled"
    ).length; // Count cancelled requests
    const forApprovalRequests = jobOrder.data.filter(
        (order) => order.status === "For Approval"
    ).length; // Count for approval requests
    const approvedRequests = jobOrder.data.filter(
        (order) => order.status === "Approved"
    ).length; // Count approved requests
    const completedRequests = jobOrder.data.filter(
        (order) => order.status === "Completed"
    ).length; // Count completed requests

    const handleStatusChange = async (orderId, newStatus) => {
        // Show confirmation dialog using native browser confirm
        const isConfirmed = confirm(
            `Are you sure you want to change the status to ${newStatus}?`
        );

        if (isConfirmed) {
            try {
                const response = await axios.patch(
                    `/admin/updateJobStatus/${orderId}`,
                    {
                        status: newStatus,
                    }
                );

                // Show success message using native browser alert
                alert("Status updated successfully");

                // Refresh the page to show updated data
                window.location.reload();
            } catch (error) {
                console.error("Error updating status:", error);

                // Show error message using native browser alert
                alert(
                    error.response?.data?.error ||
                        "An error occurred while updating the status."
                );
            }
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "For Approval":
                return <FaClock className="me-1 status-icon text-white" />;
            case "Approved":
                return <FaCheck className="me-1 status-icon text-white" />;
            case "Completed":
                return (
                    <FaCheckCircle className="me-1 status-icon  text-white" />
                );
            case "Cancelled":
                return (
                    <FaTimesCircle className="me-1 status-icon  text-white" />
                );
            default:
                return null;
        }
    };

    // Add click handler for dropdowns
    const handleDropdownClick = (dropdownName) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    // Add click handler to close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".admin-filter-group")) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="">
            <div id="content" className="">
                <div>
                    <div>
                        <h1 className="d-inline">Job Requests | </h1>
                        <h1 className="d-inline fw-light">
                            Manage Job Request
                        </h1>
                        <hr />
                    </div>

                    <div className="bg-black row rounded text-center d-flex justify-content-between">
                        <div className="col bg-light m-4 p-3">
                            <h5>Total Request</h5>
                            <h1>{totalCounts.total}</h1>
                        </div>
                        <div className="col bg-light m-4 p-3">
                            <h5>For Approval</h5>
                            <h1>{totalCounts.forApproval}</h1>
                        </div>
                        <div className="col bg-light m-4 p-3">
                            <h5>Approved</h5>
                            <h1>{totalCounts.approved}</h1>
                        </div>
                        <div className="col bg-light m-4 p-3">
                            <h5>Completed</h5>
                            <h1>{totalCounts.completed}</h1>
                        </div>
                        <div className="col bg-light m-4 p-3">
                            <h5>Cancelled</h5>
                            <h1>{totalCounts.cancelled}</h1>
                        </div>
                    </div>
                    <div className="mt-3">
                        {/* Search and Filter Controls */}
                        <div className="row mb-4">
                            {/* Search Bar */}
                            <div className="col-md-4 mb-3 mb-md-0">
                                <div className="input-group admin-search-container shadow-sm">
                                    <input
                                        type="text"
                                        className="form-control admin-search-input"
                                        placeholder="Search by name or email..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        aria-label="Search"
                                        aria-describedby="search-button"
                                    />
                                    <button
                                        className="btn admin-search-button"
                                        type="button"
                                    >
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Sort and Filter Controls */}
                            <div className="col-md-8">
                                <div className="d-flex gap-2 justify-content-md-end flex-wrap ">
                                    {/* Sort Control */}
                                    <div
                                        className="admin-filter-group mobile-filter-group sort-filter"
                                        data-open={openDropdown === "sort"}
                                        onClick={() =>
                                            handleDropdownClick("sort")
                                        }
                                    >
                                        <span className="admin-filter-label">
                                            <i className="bi bi-sort-down me-2"></i>
                                            Sort:{" "}
                                            {sortBy === "newest"
                                                ? "Newest First"
                                                : "Oldest First"}
                                        </span>
                                        {openDropdown === "sort" && (
                                            <div className="admin-dropdown-menu mobile-dropdown-menu">
                                                <div
                                                    className={`admin-dropdown-item ${
                                                        sortBy === "newest"
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setSortBy("newest")
                                                    }
                                                >
                                                    Newest First
                                                </div>
                                                <div
                                                    className={`admin-dropdown-item ${
                                                        sortBy === "oldest"
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setSortBy("oldest")
                                                    }
                                                >
                                                    Oldest First
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Status Filter Control */}
                                    <div
                                        className="admin-filter-group mobile-filter-group status-filter"
                                        onClick={() =>
                                            handleDropdownClick("status")
                                        }
                                    >
                                        <span className="admin-filter-label">
                                            <i className="bi bi-funnel me-2"></i>
                                            Status:{" "}
                                            {filterStatus === "all"
                                                ? "All Orders"
                                                : filterStatus}
                                        </span>
                                        {openDropdown === "status" && (
                                            <div className="admin-dropdown-menu mobile-dropdown-menu2">
                                                <div
                                                    className={`admin-dropdown-item ${
                                                        filterStatus === "all"
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleFilterStatusChange(
                                                            "all"
                                                        )
                                                    }
                                                >
                                                    All Orders
                                                </div>
                                                <div
                                                    className={`admin-dropdown-item ${
                                                        filterStatus ===
                                                        "For Approval"
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleFilterStatusChange(
                                                            "For Approval"
                                                        )
                                                    }
                                                >
                                                    For Approval
                                                </div>
                                                <div
                                                    className={`admin-dropdown-item ${
                                                        filterStatus ===
                                                        "Approved"
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleFilterStatusChange(
                                                            "Approved"
                                                        )
                                                    }
                                                >
                                                    Approved
                                                </div>
                                                <div
                                                    className={`admin-dropdown-item ${
                                                        filterStatus ===
                                                        "Completed"
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleFilterStatusChange(
                                                            "Completed"
                                                        )
                                                    }
                                                >
                                                    Completed
                                                </div>
                                                <div
                                                    className={`admin-dropdown-item ${
                                                        filterStatus ===
                                                        "Cancelled"
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleFilterStatusChange(
                                                            "Cancelled"
                                                        )
                                                    }
                                                >
                                                    Cancelled
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Priority Filter Control */}
                                    <div
                                        className="admin-filter-group mobile-filter-group priority-filter"
                                        onClick={() =>
                                            handleDropdownClick("priority")
                                        }
                                    >
                                        <span className="admin-filter-label">
                                            <i className="bi bi-funnel me-2"></i>
                                            Priority:{" "}
                                            {filterPriority === "all"
                                                ? "All Priorities"
                                                : filterPriority}
                                        </span>
                                        {openDropdown === "priority" && (
                                            <div className="admin-dropdown-menu">
                                                <div
                                                    className={`admin-dropdown-item ${
                                                        filterPriority === "all"
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handlePriorityChange(
                                                            "all"
                                                        )
                                                    }
                                                >
                                                    All Priorities
                                                </div>
                                                <div
                                                    className={`admin-dropdown-item ${
                                                        filterPriority ===
                                                        "Regular"
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handlePriorityChange(
                                                            "Regular"
                                                        )
                                                    }
                                                >
                                                    Regular
                                                </div>
                                                <div
                                                    className={`admin-dropdown-item ${
                                                        filterPriority ===
                                                        "Urgent"
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handlePriorityChange(
                                                            "Urgent"
                                                        )
                                                    }
                                                >
                                                    Urgent
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Show search results count when searching */}
                        {searchQuery && (
                            <div className="alert alert-info fade-in">
                                Found {filteredAndSortedOrders.length} results
                                for "{searchQuery}"
                            </div>
                        )}

                        {/* Desktop Table View */}
                        <div className="table-responsive d-none d-md-block">
                            <table className="table text-center table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th
                                            className="thead-custom"
                                            scope="col"
                                            style={{ width: "12%" }}
                                        >
                                            Date Received
                                        </th>
                                        <th
                                            className="thead-custom"
                                            scope="col"
                                            style={{ width: "5%" }}
                                        >
                                            Job ID
                                        </th>
                                        <th
                                            className="thead-custom"
                                            scope="col"
                                            style={{ width: "15%" }}
                                        >
                                            Client Name
                                        </th>
                                        <th
                                            className="thead-custom"
                                            scope="col"
                                            style={{ width: "15%" }}
                                        >
                                            Email
                                        </th>
                                        <th
                                            className="thead-custom"
                                            scope="col"
                                            style={{ width: "15%" }}
                                        >
                                            Service
                                        </th>
                                        <th
                                            className="thead-custom"
                                            scope="col"
                                            style={{ width: "17%" }}
                                        >
                                            Status
                                        </th>
                                        <th
                                            className="thead-custom"
                                            scope="col"
                                            style={{ width: "10%" }}
                                        >
                                            Priority
                                        </th>
                                        <th
                                            className="thead-custom"
                                            scope="col"
                                            style={{ width: "13%" }}
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAndSortedOrders.map(
                                        (order, index) => (
                                            <tr
                                                key={index}
                                                className="text-center align-middle"
                                            >
                                                <td scope="row">
                                                    {new Date(
                                                        order.date_request
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td>{order.job_id}</td>
                                                <td>
                                                    {order.user
                                                        ? `${order.user.firstName} ${order.user.lastName}`
                                                        : "N/A"}
                                                </td>
                                                <td>
                                                    {order.user
                                                        ? order.user.email
                                                        : "N/A"}
                                                </td>
                                                <td
                                                    style={{
                                                        maxWidth: "120px",
                                                        overflow: "hidden",
                                                        textOverflow:
                                                            "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {order.service_type}
                                                </td>
                                                <td>
                                                    <div className="position-relative">
                                                        <select
                                                            className={`form-select badge text-center ${
                                                                order.status ===
                                                                "Cancelled"
                                                                    ? "bg-danger"
                                                                    : order.status ===
                                                                      "Approved"
                                                                    ? "bg-success"
                                                                    : order.status ===
                                                                      "Completed"
                                                                    ? "bg-info"
                                                                    : order.status ===
                                                                      "For Approval"
                                                                    ? "bg-warning"
                                                                    : "bg-secondary"
                                                            } px-3 py-2 rounded-pill`}
                                                            value={order.status}
                                                            onChange={(e) =>
                                                                handleStatusChange(
                                                                    order.job_id,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            style={{
                                                                paddingLeft:
                                                                    "2.5rem",
                                                                appearance:
                                                                    "none",
                                                                backgroundImage:
                                                                    "none",
                                                            }}
                                                        >
                                                            <option
                                                                value={
                                                                    order.status
                                                                }
                                                            >
                                                                {order.status}
                                                            </option>
                                                            {[
                                                                "For Approval",
                                                                "Approved",
                                                                "Completed",
                                                                "Cancelled",
                                                            ]
                                                                .filter(
                                                                    (status) =>
                                                                        status !==
                                                                        order.status
                                                                )
                                                                .map(
                                                                    (
                                                                        status
                                                                    ) => (
                                                                        <option
                                                                            key={
                                                                                status
                                                                            }
                                                                            value={
                                                                                status
                                                                            }
                                                                        >
                                                                            {
                                                                                status
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                        </select>
                                                        <span
                                                            className="position-absolute"
                                                            style={{
                                                                left: "15px",
                                                                top: "50%",
                                                                transform:
                                                                    "translateY(-50%)",
                                                                pointerEvents:
                                                                    "none",
                                                                zIndex: 2,
                                                            }}
                                                        >
                                                            {getStatusIcon(
                                                                order.status
                                                            )}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span
                                                        className={`badge ${
                                                            order.priority ===
                                                            "Urgent"
                                                                ? "bg-danger"
                                                                : "bg-success"
                                                        } px-3 py-2 rounded-pill`}
                                                    >
                                                        {order.priority}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Link
                                                        href={`/admin/showJobOrder/${order.job_id}`}
                                                    >
                                                        <button
                                                            className="btn text-white px-4"
                                                            id="btnSee"
                                                            style={{
                                                                background:
                                                                    "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
                                                                transition:
                                                                    "all 0.3s ease",
                                                            }}
                                                            onMouseOver={(e) =>
                                                                (e.target.style.opacity =
                                                                    "0.9")
                                                            }
                                                            onMouseOut={(e) =>
                                                                (e.target.style.opacity =
                                                                    "1")
                                                            }
                                                        >
                                                            See Details
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Table View */}
                        <div className="d-md-none">
                            {filteredAndSortedOrders.map((order, index) => (
                                <div key={index} className="mobile-table-card">
                                    <div className="mobile-table-header">
                                        <div className="mobile-table-row">
                                            <span className="mobile-table-label">
                                                Job ID:
                                            </span>
                                            <span className="mobile-table-value">
                                                {order.job_id}
                                            </span>
                                        </div>
                                        <div className="mobile-table-row">
                                            <span className="mobile-table-label">
                                                Date:
                                            </span>
                                            <span className="mobile-table-value">
                                                {new Date(
                                                    order.date_request
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mobile-table-body">
                                        <div className="mobile-table-row">
                                            <span className="mobile-table-label">
                                                Client:
                                            </span>
                                            <span className="mobile-table-value">
                                                {order.user
                                                    ? `${order.user.firstName} ${order.user.lastName}`
                                                    : "N/A"}
                                            </span>
                                        </div>

                                        <div className="mobile-table-row">
                                            <span className="mobile-table-label">
                                                Email:
                                            </span>
                                            <span className="mobile-table-value">
                                                {order.user
                                                    ? order.user.email
                                                    : "N/A"}
                                            </span>
                                        </div>

                                        <div className="mobile-table-row">
                                            <span className="mobile-table-label">
                                                Service:
                                            </span>
                                            <span className="mobile-table-value">
                                                {order.service_type}
                                            </span>
                                        </div>

                                        <div className="mobile-table-row">
                                            <span className="mobile-table-label">
                                                Status:
                                            </span>
                                            <span className="mobile-table-value">
                                                <div className="position-relative">
                                                    <select
                                                        className={`form-select badge  ${
                                                            order.status ===
                                                            "Cancelled"
                                                                ? "bg-danger"
                                                                : order.status ===
                                                                  "Approved"
                                                                ? "bg-success"
                                                                : order.status ===
                                                                  "Completed"
                                                                ? "bg-info"
                                                                : order.status ===
                                                                  "For Approval"
                                                                ? "bg-warning"
                                                                : "bg-secondary"
                                                        } px-3 py-2 rounded-pill text-center`}
                                                        value={order.status}
                                                        onChange={(e) =>
                                                            handleStatusChange(
                                                                order.job_id,
                                                                e.target.value
                                                            )
                                                        }
                                                        style={{
                                                            appearance: "none",
                                                            backgroundImage:
                                                                "none",
                                                        }}
                                                    >
                                                        <option
                                                            value={order.status}
                                                        >
                                                            {order.status}
                                                        </option>
                                                        {[
                                                            "For Approval",
                                                            "Approved",
                                                            "Completed",
                                                            "Cancelled",
                                                        ]
                                                            .filter(
                                                                (status) =>
                                                                    status !==
                                                                    order.status
                                                            )
                                                            .map((status) => (
                                                                <option
                                                                    key={status}
                                                                    value={
                                                                        status
                                                                    }
                                                                >
                                                                    {status}
                                                                </option>
                                                            ))}
                                                    </select>
                                                    <span
                                                        className="position-absolute"
                                                        style={{
                                                            left: "15px",
                                                            top: "50%",
                                                            transform:
                                                                "translateY(-50%)",
                                                            pointerEvents:
                                                                "none",
                                                            zIndex: 2,
                                                        }}
                                                    >
                                                        {getStatusIcon(
                                                            order.status
                                                        )}
                                                    </span>
                                                </div>
                                            </span>
                                        </div>

                                        <div className="mobile-table-row">
                                            <span className="mobile-table-label">
                                                Priority:
                                            </span>
                                            <span className="mobile-table-value">
                                                <span
                                                    className={`badge ${
                                                        order.priority ===
                                                        "Urgent"
                                                            ? "bg-danger"
                                                            : "bg-success"
                                                    } px-2 py-1 rounded-pill`}
                                                >
                                                    {order.priority}
                                                </span>
                                            </span>
                                        </div>

                                        <div className="mobile-action-buttons">
                                            <Link
                                                href={`/admin/showJobOrder/${order.job_id}`}
                                            >
                                                <button
                                                    className="btn text-white px-4"
                                                    id="btnSee"
                                                    style={{
                                                        background:
                                                            "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
                                                        transition:
                                                            "all 0.3s ease",
                                                    }}
                                                >
                                                    See Details
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {filteredAndSortedOrders.length === 0 && (
                                <div className="alert alert-info text-center">
                                    {searchQuery
                                        ? `No results found for "${searchQuery}"`
                                        : "No job orders found matching your criteria."}
                                </div>
                            )}
                        </div>

                        {/* Pagination links */}
                        <div className="text-center">
                            <nav>
                                <ul className="pagination">
                                    {jobOrder.links.map((link, index) => (
                                        <li
                                            key={index}
                                            className={`page-item ${
                                                link.active ? "active" : ""
                                            }`}
                                        >
                                            {link.url ? (
                                                <Link
                                                    href={`${link.url}&search=${searchQuery}&status=${filterStatus}&priority=${filterPriority}&sort=${sortBy}`}
                                                    className="page-link"
                                                    preserveState
                                                >
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label,
                                                        }}
                                                    />
                                                </Link>
                                            ) : (
                                                <span className="page-link">
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label,
                                                        }}
                                                    />
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Home.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

Home.propTypes = {
    jobOrder: PropTypes.shape({
        data: PropTypes.array.isRequired,
        links: PropTypes.array.isRequired,
    }).isRequired,
    totalCounts: PropTypes.shape({
        total: PropTypes.number.isRequired,
        forApproval: PropTypes.number.isRequired,
        approved: PropTypes.number.isRequired,
        completed: PropTypes.number.isRequired,
        cancelled: PropTypes.number.isRequired,
    }).isRequired,
    filters: PropTypes.shape({
        sort: PropTypes.string,
        status: PropTypes.string,
        priority: PropTypes.string,
        search: PropTypes.string,
    }),
};

export default Home;
