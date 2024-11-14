import AdminNavBar from "@/Layouts/AdminNavBar";
import Navbar from "../../Layouts/Navbar";
import { Link } from "@inertiajs/react";
import {
    FaCheck,
    FaHourglassHalf,
    FaTimesCircle,
    FaCheckCircle,
    FaSpinner,
    FaClock,
} from "react-icons/fa";

function Home({ jobOrder }) {
    console.log(jobOrder);
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
                            <h1>{totalRequests}</h1>
                        </div>
                        <div className="col bg-light m-4 p-3">
                            <h5>For Approval</h5>
                            <h1>{forApprovalRequests}</h1>
                        </div>
                        <div className="col bg-light m-4 p-3">
                            <h5>Approved</h5>
                            <h1>{approvedRequests}</h1>
                        </div>
                        <div className="col bg-light m-4 p-3">
                            <h5>Completed</h5>
                            <h1>{completedRequests}</h1>
                        </div>
                        <div className="col bg-light m-4 p-3">
                            <h5>Cancelled</h5>
                            <h1>{cancelledRequests}</h1>
                        </div>
                    </div>
                    <div className="mt-3">
                        {/* Desktop Table View */}
                        <div className="table-responsive d-none d-md-block">
                            <table className="table text-center table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th class="thead-custom" scope="col">
                                            Date Received
                                        </th>
                                        <th class="thead-custom" scope="col">
                                            Job ID
                                        </th>
                                        <th class="thead-custom" scope="col">
                                            Client Name
                                        </th>
                                        <th class="thead-custom" scope="col">
                                            Email
                                        </th>
                                        <th class="thead-custom" scope="col">
                                            Service Requested
                                        </th>
                                        <th class="thead-custom" scope="col">
                                            Status
                                        </th>
                                        <th class="thead-custom" scope="col">
                                            Priority
                                        </th>
                                        {/* To Ask 
                                        <th class="thead-custom" scope="col">
                                            Priority
                                        </th> */}
                                        <th class="thead-custom" scope="col">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobOrder.data.map((order, index) => (
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
                                                {order.user.firstName}{" "}
                                                {order.user.lastName}{" "}
                                            </td>
                                            <td>{order.user.email} </td>
                                            <td>{order.service_type}</td>{" "}
                                            {/* Service Request */}
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
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Table View */}
                        <div className="d-md-none">
                            {jobOrder.data.map((order, index) => (
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
                                                {order.user.firstName}{" "}
                                                {order.user.lastName}
                                            </span>
                                        </div>

                                        <div className="mobile-table-row">
                                            <span className="mobile-table-label">
                                                Email:
                                            </span>
                                            <span className="mobile-table-value">
                                                {order.user.email}
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
                        </div>

                        {/* Pagination links */}
                        <div className="text-center">
                            {jobOrder.links.map((link) => (
                                <Link
                                    className={`px-3 ${
                                        link.active
                                            ? "text-secondary"
                                            : " text-dark "
                                    }`}
                                    key={link.label}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Home.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default Home;
