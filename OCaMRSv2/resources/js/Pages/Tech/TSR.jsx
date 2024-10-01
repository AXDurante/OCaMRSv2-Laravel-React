import AdminNavBar from "@/Layouts/AdminNavBar";
import Navbar from "../../Layouts/Navbar";
import jsPDF from "jspdf"; // Import jsPDF
import { useState } from "react"; // Import useState for managing state

function Home() {
    const [pdfData, setPdfData] = useState(null); // State to hold PDF data
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const handlePreviewPDF = () => {
        const doc = new jsPDF();

        // Center Title
        const pageWidth = doc.internal.pageSize.getWidth();
        doc.setFont("Georgia", "normal"); // Set font to Times New Roman for the title
        const title1 = "U N I V E R S I T Y  O F  S A N T O  T O M A S";
        doc.text(title1, pageWidth / 2, 15, { align: "center" });

        // Reset to default font for the next title
        doc.setFont("Cambria Math", "normal");
        const title2 = "LABORATORY EQUIPMENT AND SUPPLIES OFFICE";
        doc.setFontSize(10); // Change font size for this title
        doc.text(title2, pageWidth / 2, 19, { align: "center" });

        doc.setFont("Sans", "normal");
        const title3 = "LABORATORY EQUIPMENT AND SUPPLIES OFFICE";
        doc.setFontSize(10); // Change font size for this title
        doc.text(title3, pageWidth / 2, 30, { align: "center" });

        doc.setFont("Arial", "normal");
        const title4 = " TECHNICAL SERVICE REPORT";
        doc.setFontSize(10); // Change font size for this title
        doc.text(title4, pageWidth / 2, 40, { align: "center" });

        // Footer
        doc.text("UST-S022-00-FO34 rev01 05/02/23", 14, 300);

        // Save the PDF data to state for preview
        const pdfOutput = doc.output("datauristring");
        setPdfData(pdfOutput);
        setShowModal(true); // Show the modal
    };

    const handleCloseModal = () => setShowModal(false); // Function to close the modal

    return (
        <div className="d-flex">
            <div id="content" className="main-content flex-fill p-3">
                <div>
                    <div>
                        <h1 className="d-inline">
                            Technical Service Report |{" "}
                        </h1>
                        <h1 className="d-inline fw-light">Create</h1>
                        <hr />
                    </div>
                    <div className="mt-3">
                        <div className="row forms-bg">
                            <div className="col-12 col-md-4 profile-bg d-flex flex-column align-items-center p-3 text-white">
                                <div className="mt-10">
                                    <i className="bi bi-person-fill fs-2 text-primary"></i>
                                </div>
                                <h5 className="mb-4 mt-9 ">
                                    Analytical Balance
                                </h5>

                                <div className="mt-20">
                                    <h5 className="d-inline">Priority: </h5>
                                    <h5 className="d-inline fw-light text-warning">
                                        Regular
                                    </h5>
                                </div>

                                <h6 className="mt-4">Related Documents:</h6>
                                <div className="mt-1 w-100">
                                    <button className="btn btn-light w-100 mb-2">
                                        <i className="bi bi-file-earmark-text-fill me-2"></i>
                                        Technical Service Report
                                    </button>
                                    <button className="btn btn-light w-100">
                                        <i className="bi bi-file-earmark-text-fill me-2"></i>
                                        Job Request
                                    </button>
                                </div>
                            </div>

                            <div className="col-12 col-md-8">
                                <div className="pt-5 pb-5 p-3">
                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Instrument
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="John"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Date Requested
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="John"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Tel No.
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="John"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Model
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="John"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Problem Reported
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="John"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Diagnosis/Observation
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="John"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Action Taken
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="John"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Recommendation
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value="DAPAT DROPDOWN"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-3 mb-3">
                                            <label className="form-label fw-bold d-block text-truncate">
                                                Remarks
                                            </label>
                                        </div>
                                        <div className="col-12 col-sm-9 mb-3">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                value=""
                                            />
                                        </div>
                                    </div>

                                    <div className="row"></div>
                                    <button
                                        className="btn btn-dark w-100 text-warning mt-2 mb-4"
                                        onClick={handlePreviewPDF} // Button to preview PDF
                                    >
                                        Preview PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <div
                    className="modal"
                    style={{
                        display: "block",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                >
                    <div
                        className="modal-content"
                        style={{
                            width: "80%",
                            height: "80%",
                            margin: "auto",
                        }}
                    >
                        <span
                            onClick={handleCloseModal}
                            style={{ cursor: "pointer" }}
                        >
                            &times;
                        </span>
                        <iframe
                            width="100%"
                            height="100%"
                            src={pdfData}
                        ></iframe>
                        <button onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

Home.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default Home;
