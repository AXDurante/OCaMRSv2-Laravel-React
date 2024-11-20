import Navbar2 from "../../Layouts/Navbar2";
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
                                    <td>{coc.coc_num}</td>
                                    <td>{coc.tech_name}</td>
                                    <td>{coc.college}</td>
                                    <td>{coc.lab_loc}</td>
                                    <td>
                                    <Link href={route('technician.viewCoCDetails', coc.coc_id)}>
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
                        href={`/technician/TSR/details/${tsr_id}`}
                        className="btn btn-secondary w-100 mt-2"
                    >
                        Back to Technical Service Report
                    </Link>
                    <Link
                        href={`/technician/COC/${tsr_id}/create`}
                        className="btn btn-warning w-100 mt-2"
                    >
                        Create Certificate of Calibration
                    </Link>
                </div>
            </div>
        </>
    );
}

ViewCOC.layout = (page) => <Navbar2>{page}</Navbar2>;

export default ViewCOC;