import React from "react";
import Navbar2 from "@/Layouts/Navbar2";

function TechnicianDashboard({ technicianJobOrders }) {
    return (
        <div className="d-flex">
            <div id="content" className="flex-fill p-3">
                <h1 className="d-inline">Technician Job Orders</h1>
                <hr />
                <table className="table text-center table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Date Received</th>
                            <th>Requested ID</th>
                            <th>Client Name</th>
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
                                <td>{order.date_received}</td>
                                <td>{order.job_id}</td>
                                <td>{/* Fetch Client Name using job_id */}</td>
                                <td>{order.instrument || "-"}</td>
                                <td>{order.service_requested || "-"}</td>
                                <td>
                                    <select defaultValue={order.status}>
                                        <option value="approve">Approve</option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                        <option value="cancel">Cancel</option>
                                    </select>
                                </td>
                                <td>
                                    <select defaultValue={order.priority}>
                                        <option value="Low">Low</option>
                                        <option value="Mid">Mid</option>
                                        <option value="High">High</option>
                                    </select>
                                </td>
                                <td>
                                    <button className="gradient-blue-button">
                                        Show Index
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

TechnicianDashboard.layout = (page) => <Navbar2>{page}</Navbar2>;

export default TechnicianDashboard;
