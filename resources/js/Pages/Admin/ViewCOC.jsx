import AdminNavBar from "@/Layouts/AdminNavBar";
import { Link } from "@inertiajs/react";

function ViewCOC({ cocs, tsr_id }) {
    // console.log(jobOrderId);
    console.log(cocs);
    return (
        <>
            <div>
                <h1 className="d-inline"> Track Certificates of Calibration #{tsr_id} </h1>
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
                                COC ID
                            </th>
                            <th className="thead-custom" scope="col">
                                COC Number
                            </th>
                            <th className="thead-custom" scope="col">
                                Client Name
                            </th>
                            <th className="thead-custom" scope="col">
                                College
                            </th>
                            <th className="thead-custom" scope="col">
                                Lab Location
                            </th>
                            <th className="thead-custom" scope="col">
                                Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cocs && cocs.length > 0 ? (
                            cocs.map((coc) => (
                                <tr key={coc.coc_id}>
                                    <td>{new Date(coc.date_req).toLocaleDateString()}</td>
                                    <td>{coc.coc_id}</td>
                                    <td>{coc.coc_num}</td>
                                    <td>{coc.tech_name}</td>
                                    <td>{coc.college}</td>
                                    <td>{coc.lab_loc}</td>
                                    <td>
                                    <Link href={route('admin.viewCoCDetails', coc.coc_id)}>
                                            <button className="btn btn-primary btn-sm">
                                                <i className="bi bi-file-earmark-text-fill me-2"></i>
                                                Details
                                            </button>
                                    </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No Certificates of Calibration found for this Technical Service Report
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="mt-3">
                    <Link
                        href={`/admin/TSR/details/${tsr_id}`}
                        className="btn btn-secondary w-100 mt-2"
                    >
                        Back to Technical Service Report
                    </Link>
                </div>
            </div>
        </>
    );
}

ViewCOC.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default ViewCOC;