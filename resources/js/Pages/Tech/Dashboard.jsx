import AdminNavBar from "@/Layouts/AdminNavBar";
import Navbar2 from "@/Layouts/Navbar2";
import { Link } from "@inertiajs/react";
import {
    FaCheck,
    FaHourglassHalf,
    FaTimesCircle,
    FaCheckCircle,
    FaSpinner,
    FaClock,
} from "react-icons/fa";

function Dashboard({ jobOrder }) {
    console.log(jobOrder);
    return (
        <div className="d-flex">
            <div id="content" className=" flex-fill p-3">
                <div>
                    <div>
                        <h1 className="d-inline">Job Requests | </h1>
                        <h1 className="d-inline fw-light">
                            Manage Job Request
                        </h1>
                        <hr />
                    </div>

                    <div className="bg-dark row rounded text-center d-flex justify-content-between">
                        <div className="col bg-light m-4 p-3">
                            <h5>Total Request</h5>
                            <h1>1</h1>
                        </div>
                        <div className="col bg-light m-4 p-3">
                            <h5>For Approval</h5>
                            <h1>1</h1>
                        </div>
                        <div className="col bg-light m-4 p-3">
                            <h5>Approved</h5>
                            <h1>1</h1>
                        </div>
                        <div className="col bg-light m-4 p-3">
                            <h5>Completed</h5>
                            <h1>1</h1>
                        </div>
                        <div className="col bg-light m-4 p-3">
                            <h5>Cancelled</h5>
                            <h1>1</h1>
                        </div>
                    </div>
                    <div className="mt-3">
                        <table class="table text-center table-bordered table-striped">
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
                                    {/* <th class="thead-custom" scope="col">
                                        Instrument
                                    </th> */}
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
                                        </td>{" "}
                                        {/* Date Received */}
                                        <td>{order.job_id}</td> {/* Job ID */}
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
                                                    order.status === "Cancelled"
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
                                                    "Approved" && <FaCheck />}
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
                                                {order.status === "Pending" && (
                                                    <FaClock />
                                                )}
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    order.priority === "High"
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

Dashboard.layout = (page) => <Navbar2>{page}</Navbar2>;

export default Dashboard;
