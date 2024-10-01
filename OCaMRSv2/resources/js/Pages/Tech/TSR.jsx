import AdminNavBar from "@/Layouts/AdminNavBar";
import Navbar from "../../Layouts/Navbar";
import jsPDF from "jspdf"; // Import jsPDF
import { useState } from "react"; // Import useState for managing state

function Home() {
    const [pdfData, setPdfData] = useState(null); // State to hold PDF data
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const handlePreviewPDF = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(16);
        doc.text("UNIVERSITY OF SANTO TOMAS", 14, 20);
        doc.text("LABORATORY EQUIPMENT AND SUPPLIES OFFICE", 14, 25);
        doc.text("INSTRUMENTATION SERVICE CENTER", 14, 30);
        doc.text("TECHNICAL SERVICE REPORT", 14, 35);
        doc.text("TSR No. (To be filled by LESO)", 14, 40);
        doc.text("Date: __________", 14, 45);
        doc.text("Tel No.: __________", 14, 50);
        doc.text("MODEL: __________", 14, 55);

        // Fields
        doc.text("LABORATORY: __________________________", 14, 65);
        doc.text("LAB LOCATION: ________________________", 14, 70);
        doc.text("INSTRUMENT: __________________________", 14, 75);
        doc.text("SERIAL NO.: ___________________________", 14, 80);

        // Problem Reported
        doc.text("PROBLEM REPORTED", 14, 90);
        doc.line(14, 92, 190, 92); // Line for input

        // Diagnosis/Observation
        doc.text("DIAGNOSIS/OBSERVATION", 14, 110);
        doc.line(14, 112, 190, 112); // Line for input

        // Action Taken
        doc.text("ACTION TAKEN", 14, 130);
        doc.line(14, 132, 190, 132); // Line for input

        // Recommendation
        doc.text("RECOMMENDATION", 14, 150);
        doc.text("For Pull-out", 14, 155);
        doc.text("Forward to Supplier (External Calibration)", 14, 160);
        doc.text("For Repair", 14, 165);
        doc.text("Beyond Repair", 14, 170);

        // Remarks
        doc.text("REMARKS:", 14, 190);
        doc.line(14, 192, 190, 192); // Line for input

        // Service Performed By
        doc.text("SERVICE PERFORMED BY:", 14, 210);
        doc.line(14, 212, 190, 212); // Line for input
        doc.text("Noted by:", 14, 220);
        doc.line(14, 222, 190, 222); // Line for input

        // Service Acknowledgement
        doc.text("SERVICE ACKNOWLEDGEMENT:", 14, 240);
        doc.text(
            "This is to acknowledge that the above service has been performed and completed in our laboratory/office.",
            14,
            245
        );

        // Requested By
        doc.text("REQUESTED BY:", 14, 270);
        doc.line(14, 272, 190, 272); // Line for input
        doc.text("POSITION:", 14, 280);
        doc.line(14, 282, 190, 282); // Line for input

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
