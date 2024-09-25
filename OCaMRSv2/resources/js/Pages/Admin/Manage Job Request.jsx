import AdminNavBar from "@/Layouts/AdminNavBar";
import Navbar from "../../Layouts/Navbar";

function Home({ jobOrder }) {
    console.log(jobOrder);
    return (
        <div className="d-flex">
            <div id="content" className="main-content flex-fill p-3">
                <div>
                    <div>
                        <h1 class="d-inline">Job Requests | </h1>
                        <h1 class="d-inline fw-light">Manage Job Request</h1>
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
                                        Client ID
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
                            {jobOrder.map((order, index) => (
                                    <tr key={index} className="text-center align-middle">
                                        <td scope="row">{new Date(order.date_request).toLocaleDateString()}</td> {/* Date Received */}
                                        <td>{order.job_id}</td> {/* Job ID */}
                                        <td>{order.employeeID} </td>
                                        <td>{order.service_type}</td> {/* Service Request */}
                                        <td>{order.status}</td> {/* Status */}
                                        <td>
                                            <button className="btn btn-yellow">See Details</button>
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

Home.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default Home;
