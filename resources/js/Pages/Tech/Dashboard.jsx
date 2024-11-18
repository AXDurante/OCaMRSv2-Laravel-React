import AdminNavBar from "@/Layouts/AdminNavBar";
import Navbar2 from "@/Layouts/Navbar2";
import { Link, useForm } from "@inertiajs/react";
import {
    FaCheck,
    FaHourglassHalf,
    FaTimesCircle,
    FaCheckCircle,
    FaSpinner,
    FaClock,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Dashboard({ jobOrder, totalCounts, filters }) {
    // Initialize filters with default values to prevent undefined errors
    const initialFilters = {
        sort: filters?.sort || "newest",
        status: filters?.status || "all",
        priority: filters?.priority || "all",
        search: filters?.search || "",
    };

    const { get } = useForm();
    const [sortBy, setSortBy] = useState(initialFilters.sort);
    const [filterStatus, setFilterStatus] = useState(initialFilters.status);
    const [searchQuery, setSearchQuery] = useState(initialFilters.search);
    const [filterPriority, setFilterPriority] = useState(
        initialFilters.priority
    );
    const [openDropdown, setOpenDropdown] = useState(null);

    // Debounced search effect
    useEffect(() => {
        const timer = setTimeout(() => {
            get(
                route("technician.dashboard", {
                    search: searchQuery,
                    status: filterStatus,
                    priority: filterPriority,
                    sort: sortBy,
                }),
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, filterStatus, filterPriority, sortBy]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleStatusChange = (status) => {
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
        <div className="content">
            <div id="content" className="flex-fill p-3">
                <div>
                    <div>
                        <h1 className="d-inline">Job Requests | </h1>
                        <h1 className="d-inline fw-light">
                            Manage Job Request
                        </h1>
                        <hr />
                    </div>

                    <div className="bg-dark row rounded text-center justify-content-between">
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
                                        onChange={handleSearchChange}
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
                                <div className="d-flex gap-2 justify-content-md-end flex-wrap">
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
                                                ? "All"
                                                : filterStatus}
                                        </span>
                                        {openDropdown === "status" && (
                                            <div className="admin-dropdown-menu mobile-dropdown-menu">
                                                <div
                                                    className={`admin-dropdown-item ${
                                                        filterStatus === "all"
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setFilterStatus("all")
                                                    }
                                                >
                                                    All
                                                </div>
                                                {[
                                                    "For Approval",
                                                    "Approved",
                                                    "Processing",
                                                    "Completed",
                                                    "Cancelled",
                                                ].map((status) => (
                                                    <div
                                                        key={status}
                                                        className={`admin-dropdown-item ${
                                                            filterStatus ===
                                                            status
                                                                ? "active"
                                                                : ""
                                                        }`}
                                                        onClick={() =>
                                                            setFilterStatus(
                                                                status
                                                            )
                                                        }
                                                    >
                                                        {status}
                                                    </div>
                                                ))}
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
                                            <i className="bi bi-flag me-2"></i>
                                            Priority:{" "}
                                            {filterPriority === "all"
                                                ? "All"
                                                : filterPriority}
                                        </span>
                                        {openDropdown === "priority" && (
                                            <div className="admin-dropdown-menu mobile-dropdown-menu">
                                                <div
                                                    className={`admin-dropdown-item ${
                                                        filterPriority === "all"
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setFilterPriority("all")
                                                    }
                                                >
                                                    All
                                                </div>
                                                {["Urgent", "Regular"].map(
                                                    (priority) => (
                                                        <div
                                                            key={priority}
                                                            className={`admin-dropdown-item ${
                                                                filterPriority ===
                                                                priority
                                                                    ? "active"
                                                                    : ""
                                                            }`}
                                                            onClick={() =>
                                                                setFilterPriority(
                                                                    priority
                                                                )
                                                            }
                                                        >
                                                            {priority}
                                                        </div>
                                                    )
                                                )}
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

                        {/* Rest of your existing table code, but using filteredAndSortedOrders instead of jobOrder.data */}
                        {/* Desktop Table View */}
                        <div className="table-responsive d-none d-md-block">
                            <table className="table text-center table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th
                                            className="thead-custom"
                                            scope="col"
                                        >
                                            Date Received
                                        </th>
                                        <th
                                            className="thead-custom"
                                            scope="col"
                                        >
                                            Job ID
                                        </th>
                                        <th
                                            className="thead-custom"
                                            scope="col"
                                        >
                                            Client Name
                                        </th>
                                        <th
                                            className="thead-custom"
                                            scope="col"
                                        >
                                            Email
                                        </th>
                                        <th
                                            className="thead-custom"
                                            scope="col"
                                        >
                                            Service
                                        </th>
                                        <th
                                            className="thead-custom"
                                            scope="col"
                                        >
                                            Status
                                        </th>
                                        <th
                                            className="thead-custom"
                                            scope="col"
                                        >
                                            Priority
                                        </th>
                                        <th
                                            className="thead-custom"
                                            scope="col"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAndSortedOrders.map(
                                        (order, index) => (
                                            <tr key={index}>
                                                <td>
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
                                                    <span
                                                        className={`badge ${
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
                                                                : order.status ===
                                                                  "Processing"
                                                                ? "bg-primary"
                                                                : order.status ===
                                                                  "Pending"
                                                                ? "bg-secondary"
                                                                : "bg-secondary"
                                                        } px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1`}
                                                    >
                                                        {order.status ===
                                                            "Cancelled" && (
                                                            <FaTimesCircle />
                                                        )}
                                                        {order.status ===
                                                            "Approved" && (
                                                            <FaCheck />
                                                        )}
                                                        {order.status ===
                                                            "Completed" && (
                                                            <FaCheckCircle />
                                                        )}
                                                        {order.status ===
                                                            "For Approval" && (
                                                            <FaHourglassHalf />
                                                        )}
                                                        {order.status ===
                                                            "Processing" && (
                                                            <FaSpinner className="spinner-icon" />
                                                        )}
                                                        {order.status ===
                                                            "Pending" && (
                                                            <FaClock />
                                                        )}
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span
                                                        className={`badge ${
                                                            order.priority ===
                                                            "High"
                                                                ? "bg-danger"
                                                                : order.priority ===
                                                                  "Medium"
                                                                ? "bg-warning"
                                                                : "bg-success"
                                                        } px-3 py-2 rounded-pill`}
                                                    >
                                                        {order.priority}
                                                    </span>
                                                </td>
                                                <td>
                                                    {order.status ===
                                                    "For Approval" ? (
                                                        <button
                                                            className="gradient-gray-button"
                                                            id="btnSee"
                                                            disabled
                                                        >
                                                            See Details
                                                        </button>
                                                    ) : (
                                                        <Link
                                                            href={`/technician/showJobOrder/${order.job_id}`}
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
                                                                onMouseOver={(
                                                                    e
                                                                ) =>
                                                                    (e.target.style.opacity =
                                                                        "0.9")
                                                                }
                                                                onMouseOut={(
                                                                    e
                                                                ) =>
                                                                    (e.target.style.opacity =
                                                                        "1")
                                                                }
                                                            >
                                                                See Details
                                                            </button>
                                                        </Link>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile View */}
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
                                                <span
                                                    className={`badge ${
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
                                                            : order.status ===
                                                              "Processing"
                                                            ? "bg-primary"
                                                            : "bg-secondary"
                                                    } px-2 py-1 rounded-pill d-inline-flex align-items-center gap-1`}
                                                >
                                                    {order.status ===
                                                        "Cancelled" && (
                                                        <FaTimesCircle />
                                                    )}
                                                    {order.status ===
                                                        "Approved" && (
                                                        <FaCheck />
                                                    )}
                                                    {order.status ===
                                                        "Completed" && (
                                                        <FaCheckCircle />
                                                    )}
                                                    {order.status ===
                                                        "For Approval" && (
                                                        <FaHourglassHalf />
                                                    )}
                                                    {order.status ===
                                                        "Processing" && (
                                                        <FaSpinner className="spinner-icon" />
                                                    )}
                                                    {order.status ===
                                                        "Pending" && (
                                                        <FaClock />
                                                    )}
                                                    {order.status}
                                                </span>
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
                                                        "High"
                                                            ? "bg-danger"
                                                            : order.priority ===
                                                              "Medium"
                                                            ? "bg-warning"
                                                            : "bg-success"
                                                    } px-2 py-1 rounded-pill`}
                                                >
                                                    {order.priority}
                                                </span>
                                            </span>
                                        </div>

                                        <div className="mobile-action-buttons">
                                            {order.status === "For Approval" ? (
                                                <button
                                                    className="gradient-gray-button"
                                                    disabled
                                                >
                                                    See Details
                                                </button>
                                            ) : (
                                                <Link
                                                    href={`/technician/showJobOrder/${order.job_id}`}
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
                                            )}
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

                        {/* Pagination */}
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
                                                    href={link.url}
                                                    className="page-link"
                                                    preserveScroll
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

Dashboard.layout = (page) => <Navbar2>{page}</Navbar2>;

Dashboard.propTypes = {
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

export default Dashboard;
