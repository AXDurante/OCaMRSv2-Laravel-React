import AdminNavBar from "@/Layouts/AdminNavBar";
import Navbar from "../../Layouts/Navbar";

function Home() {
    return (
        <div className="">
            <div id="content" className="">
                <div>
                    <div>
                        <h1 class="d-inline">Job Requests | </h1>
                        <h1 class="d-inline fw-light">Manage Job Request</h1>
                        <hr />
                    </div>

                    <div className="bg-black row rounded text-center d-flex justify-content-between">
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
                                        Requested ID
                                    </th>
                                    <th class="thead-custom" scope="col">
                                        Client Name
                                    </th>
                                    <th class="thead-custom" scope="col">
                                        Instrument
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
                                    <th class="thead-custom" scope="col">
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
                                        <button className="btn btn-yellow">
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
                                        <button className="btn btn-yellow">
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
                                        <button className="btn btn-yellow">
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
                                        <button className="btn btn-yellow">
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

Home.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default Home;
