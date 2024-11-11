import AdminNavBar from "@/Layouts/AdminNavBar";
import Navbar from "../../Layouts/Navbar";
import { Link } from "@inertiajs/react";

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
                        <h1 className="d-inline fw-light">Manage Job Request</h1>
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
                                    <th class="thead-custom" scope="col">
                                        Service Requested
                                    </th>
                                    <th class="thead-custom" scope="col">
                                        Status
                                    </th>
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
                                        <td>{order.service_type}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <Link
                                                href={`/admin/showJobOrder/${order.job_id}`}
                                            >
                                                <button
                                                    className="btn btn-primary"
                                                    id="btnSee"
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

Home.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default Home;
