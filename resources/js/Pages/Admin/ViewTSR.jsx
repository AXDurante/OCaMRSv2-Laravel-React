import AdminNavBar from "@/Layouts/AdminNavBar";
import { Link } from "@inertiajs/react";

function ViewTSR({ tsrs, jobOrderId }) {
    console.log(jobOrderId);
    console.log(tsrs);
    return (
        <div className="content">
            <div>
                <h1 className="d-inline"> Track Technical Service Request #{jobOrderId}</h1>
                <hr />
            </div>

            {/* Desktop Table View */}
            <div className="table-responsive d-none d-md-block mt-3">
                <table className="table text-center table-bordered table-striped">
                    <thead>
                        <tr>
                            <th className="thead-custom" scope="col">
                                Date Received
                            </th>
                            <th className="thead-custom" scope="col">
                                TSR ID
                            </th>
                            <th className="thead-custom" scope="col">
                                TSR Number
                            </th>
                            <th className="thead-custom" scope="col">
                                Instrument
                            </th>
                            <th className="thead-custom" scope="col">
                                Model
                            </th>
                            <th className="thead-custom" scope="col">
                                Serial Number
                            </th>
                            <th className="thead-custom" scope="col">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tsrs && tsrs.length > 0 ? (
                            tsrs.map((tsr) => (
                                <tr key={tsr.tsr_id}>
                                    <td>
                                        {new Date(
                                            tsr.date_request
                                        ).toLocaleDateString()}
                                    </td>
                                    <td>{tsr.tsr_id}</td>
                                    <td>{tsr.tsr_num}</td>
                                    <td>{tsr.instrument}</td>
                                    <td>{tsr.model || "N/A"}</td>
                                    <td>{tsr.serial_num || "N/A"}</td>
                                    <td>
                                        <Link
                                            href={route(
                                                "admin.viewTSRDetails",
                                                tsr.tsr_id
                                            )}
                                            className="btn btn-primary btn-sm"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No Technical Service Reports found for this
                                    Job Order
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="d-md-none">
                {tsrs && tsrs.length > 0 ? (
                    tsrs.map((tsr) => (
                        <div key={tsr.tsr_id} className="card mb-3 shadow-sm">
                            <div className="card-body">
                                <div className="mb-2">
                                    <small className="text-muted">
                                        Date Received:
                                    </small>
                                    <div>
                                        {new Date(
                                            tsr.date_request
                                        ).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <small className="text-muted">
                                        TSR Number:
                                    </small>
                                    <div>{tsr.tsr_num}</div>
                                </div>

                                <div className="mb-2">
                                    <small className="text-muted">
                                        Instrument:
                                    </small>
                                    <div>{tsr.instrument}</div>
                                </div>

                                <div className="mb-2">
                                    <small className="text-muted">Model:</small>
                                    <div>{tsr.model || "N/A"}</div>
                                </div>

                                <div className="mb-3">
                                    <small className="text-muted">
                                        Serial Number:
                                    </small>
                                    <div>{tsr.serial_num || "N/A"}</div>
                                </div>

                                <Link
                                    href={route(
                                        "admin.viewTSRDetails",
                                        tsr.tsr_id
                                    )}
                                    className="btn btn-primary w-100"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info text-center">
                        No Technical Service Reports found for this Job Order
                    </div>
                )}
            </div>

            <div className="mt-3">
                <Link
                    href={route("admin.showJobOrder", jobOrderId)}
                    className="btn btn-secondary w-100 mt-2"
                >
                    Back to Job Order
                </Link>
            </div>
        </div>
    );
}

ViewTSR.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default ViewTSR;
