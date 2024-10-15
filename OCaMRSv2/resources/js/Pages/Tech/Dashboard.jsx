import AdminNavBar from "@/Layouts/AdminNavBar";
import Navbar2 from "@/Layouts/Navbar2";

function Dashboard() {
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
                        <table className="table text-center table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th className="thead-custom" scope="col">
                                        Date Received
                                    </th>
                                    <th className="thead-custom" scope="col">
                                        Requested ID
                                    </th>
                                    <th className="thead-custom" scope="col">
                                        Client Name
                                    </th>
                                    <th className="thead-custom" scope="col">
                                        Instrument
                                    </th>
                                    <th className="thead-custom" scope="col">
                                        Service Requested
                                    </th>
                                    <th className="thead-custom" scope="col">
                                        Status
                                    </th>
                                    <th className="thead-custom" scope="col">
                                        Priority
                                    </th>
                                    <th className="thead-custom" scope="col">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center align-middle">
                                    <td scope="row">8/30/2024</td>
                                    <td>1243314534</td>
                                    <td>John Doe</td>
                                    <td>Microscope</td>
                                    <td>Recallibration</td>
                                    <td>Pending</td>
                                    <td>Main</td>
                                    <td>
                                        <button className="gradient-blue-button">
                                            See Details
                                        </button>
                                    </td>
                                </tr>
                                <tr className="text-center align-middle">
                                    <td scope="row">8/30/2024</td>
                                    <td>1243314534</td>
                                    <td>John Doe</td>
                                    <td>Microscope</td>
                                    <td>Recallibration</td>
                                    <td>Pending</td>
                                    <td>Main</td>
                                    <td>
                                        <button className="gradient-blue-button">
                                            See Details
                                        </button>
                                    </td>
                                </tr>
                                <tr className="text-center align-middle">
                                    <td scope="row">8/30/2024</td>
                                    <td>1243314534</td>
                                    <td>John Doe</td>
                                    <td>Microscope</td>
                                    <td>Recallibration</td>
                                    <td>Pending</td>
                                    <td>Main</td>
                                    <td>
                                        <button className="gradient-blue-button">
                                            See Details
                                        </button>
                                    </td>
                                </tr>
                                <tr className="text-center align-middle">
                                    <td scope="row">8/30/2024</td>
                                    <td>1243314534</td>
                                    <td>John Doe</td>
                                    <td>Microscope</td>
                                    <td>Recallibration</td>
                                    <td>Pending</td>
                                    <td>Main</td>
                                    <td>
                                        <button className="gradient-blue-button">
                                            See Details
                                        </button>
                                    </td>
                                </tr>
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
