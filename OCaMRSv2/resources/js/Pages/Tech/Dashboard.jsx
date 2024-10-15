import AdminNavBar from "@/Layouts/AdminNavBar";
import Navbar2 from "@/Layouts/Navbar2";

function Dashboard({ technicianJobOrders }) {
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
                            <h1>{technicianJobOrders.length}</h1>
                        </div>
                        {/* Other status cards */}
                    </div>

                    <div className="mt-3">
                        <table className="table text-center table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Date Received</th>
                                    <th>Requested ID</th>
                                    <th>Instrument</th>
                                    <th>Service Requested</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {technicianJobOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td>
                                            {new Date(
                                                order.date_received
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>{order.job_id}</td>
                                        <td>{order.instrument || "N/A"}</td>
                                        <td>
                                            {order.service_requested || "N/A"}
                                        </td>
                                        <td>{order.status}</td>
                                        <td>{order.priority}</td>
                                        <td>
                                            <button className="gradient-blue-button">
                                                See Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <Navbar2>{page}</Navbar2>;

export default Dashboard;
