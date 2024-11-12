import AdminNavBar from "@/Layouts/AdminNavBar";
import { Link } from "@inertiajs/react";

function ViewTSR({tsrs, jobOrderId}) {
    console.log(jobOrderId);
    console.log(tsrs);
    return (
        <>
            <div>
                <h1 className="d-inline"> Track Technical Service Request </h1>
                <hr />
            </div>
            <div className="mt-3">
                <table className="table text-center table-bordered table-striped">
                    <thead>
                        <tr>
                            <th className="thead-custom" scope="col">
                                Date Received
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
                                    <td>{new Date(tsr.date_request).toLocaleDateString()}</td>
                                    <td>{tsr.tsr_num}</td>
                                    <td>{tsr.instrument}</td>
                                    <td>{tsr.model || 'N/A'}</td>
                                    <td>{tsr.serial_num || 'N/A'}</td>
                                    <td>
                                        <Link
                                            href={route('admin.viewTSRDetails', tsr.tsr_id)}
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
                                    No Technical Service Reports found for this Job Order
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <Link
                    href={route('admin.showJobOrder', jobOrderId)}
                    className="btn btn-secondary mt-3"
                >
                    Back to Job Order
                </Link>
                {/* <Link
                    href={`/technician/TSR/${jobOrderId}/create`}
                    className="btn btn-warning w-100 mt-2"
                >
                    Create Technical Service Report
                </Link> */}
            </div>
        </>
    );
}

ViewTSR.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default ViewTSR;