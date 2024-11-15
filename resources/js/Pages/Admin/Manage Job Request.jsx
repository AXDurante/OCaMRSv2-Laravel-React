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
import axios from "axios";

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

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.patch(`/admin/updateJobStatus/${orderId}`, {
                status: newStatus,
            });
            // Optionally refresh the data or update local state
            window.location.reload();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "For Approval":
                return <FaClock className="me-1 status-icon text-white" />;
            case "Approved":
                return <FaCheck className="me-1 status-icon text-white" />;
            case "Processing":
                return (
                    <FaSpinner className="me-1 status-icon spinning text-white" />
                );
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
                                                {order.user ? `${order.user.firstName} ${order.user.lastName}` : 'N/A'}
                                            </td>
                                            <td>{order.user ? order.user.email : 'N/A'}</td>
                                            <td
                                                style={{
                                                    maxWidth: "120px",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
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
                                                                : order.status ===
                                                                  "Processing"
                                                                ? "bg-primary"
                                                                : "bg-secondary"
                                                        } px-3 py-2 rounded-pill`}
                                                        value={order.status}
                                                        onChange={(e) =>
                                                            handleStatusChange(
                                                                order.job_id,
                                                                e.target.value
                                                            )
                                                        }
                                                        style={{
                                                            paddingLeft:
                                                                "2.5rem",
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
                                                            "Processing",
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
                                                {order.user ? `${order.user.firstName} ${order.user.lastName}` : 'N/A'}
                                            </span>
                                        </div>

                                        <div className="mobile-table-row">
                                            <span className="mobile-table-label">
                                                Email:
                                            </span>
                                            <span className="mobile-table-value">
                                                {order.user ? order.user.email : 'N/A'}
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
                                                                : order.status ===
                                                                  "Processing"
                                                                ? "bg-primary"
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
                                                            "Processing",
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
