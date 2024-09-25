import React, { useState } from "react";
import Navbar from "@/Layouts/Navbar";

// Data from the PDF
const instrumentList = [
    {
        id: 1,
        category: "Balances",
        instruments: [
            "Analytical Balances",
            "Top Loading Balances",
            "Moisture Balance",
            "Beam Balance",
            "Bench Scale Balance",
            "Eye Level Physician Scale",
            "Infant Scale",
            "Bath Scale",
            "Spring Balance",
        ],
    },
    {
        id: 2,
        category: "Calipers",
        instruments: [
            "Vernier Caliper",
            "Micrometer",
            "Skinfold Caliper",
            "Mechanical or Digital Calipers",
        ],
    },
    {
        id: 3,
        category: "Ovens and Incubators",
        instruments: [
            "Convection Oven",
            "Incubator Oven",
            "Drying Oven",
            "Water/Oil Bath",
            "Gravity Oven",
            "Mechanical Oven",
        ],
    },
    {
        id: 4,
        category: "Heaters and Stirrers",
        instruments: [
            "Hot Plate",
            "Magnetic Stirrer",
            "Hot Plate w/ Magnetic Stirrer",
            "Orbital Shakers",
            "Heaters",
            "Furnace",
        ],
    },
    {
        id: 5,
        category: "Rotary Evaporator and Accessories",
        instruments: ["Rotary Evaporator", "Vacuum Pump"],
    },
    {
        id: 6,
        category: "Centrifuge",
        instruments: [
            "General Purpose Centrifuge",
            "Babcock Centrifuge",
            "Fixed / Variable Speed Centrifuge",
            "High Capacity / High Speed Centrifuge",
            "Clinical Centrifuge",
            "Micro Centrifuge",
        ],
    },
    {
        id: 7,
        category: "Microscope",
        instruments: ["Compound Microscope"],
    },
];

function ViewInstrument() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    const handleDropdownChange = (e) => {
        const selectedCategoryId = parseInt(e.target.value);
        const category = instrumentList.find(
            (item) => item.id === selectedCategoryId
        );
        setSelectedCategory(category);
    };

    // Function to toggle the form visibility
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="d-flex">
            <div id="content" className="main-content flex-fill p-3">
                <div>
                    <div>
                        <h1 className="d-inline">View Instrument | </h1>
                        <h1 className="d-inline fw-light">
                            Supported Equipments
                        </h1>
                        <hr />
                    </div>

                    {/* Add Instrument Button */}
                    <div className="mt-3">
                        <button
                            className="btn btn-primary"
                            onClick={toggleForm}
                        >
                            + Instrument
                        </button>
                    </div>

                    {/* Dropdown */}
                    <div className="mt-3">
                        <select
                            className="form-select"
                            onChange={handleDropdownChange}
                        >
                            <option value="">Select a category</option>
                            {instrumentList.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Overlay Form */}
                    {showForm && (
                        <div className="overlay">
                            <div className="form-container">
                                <h3>Add New Instrument</h3>
                                <form>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="instrumentName"
                                            className="form-label"
                                        >
                                            Category Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="instrumentName"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="instrumentName"
                                            className="form-label"
                                        >
                                            Instrument Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="instrumentName"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={toggleForm}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Result Counter */}
                    <div className="mt-2 ms-2 me-2">
                        {selectedCategory && (
                            <h6>{`${
                                selectedCategory.instruments.length
                            } result${
                                selectedCategory.instruments.length > 1
                                    ? "s"
                                    : ""
                            } for ${selectedCategory.category}`}</h6>
                        )}
                    </div>

                    {/* Display Selected Instruments */}
                    <div className="mt-4">
                        {selectedCategory && (
                            <div>
                                <h3>{selectedCategory.category}</h3>
                                {selectedCategory.instruments.map(
                                    (instrument, index) => (
                                        <div
                                            className="card mt-4 shadow-sm"
                                            key={index}
                                        >
                                            <div className="card-body d-flex">
                                                <img
                                                    src="https://via.placeholder.com/100"
                                                    alt="Placeholder"
                                                    className="me-3"
                                                    style={{
                                                        width: "100px",
                                                        height: "100px",
                                                        objectFit: "cover",
                                                        borderRadius: "8px",
                                                    }}
                                                />
                                                <div className="flex-grow-1">
                                                    <h4 className="card-title">
                                                        {instrument}
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

ViewInstrument.layout = (page) => <Navbar>{page}</Navbar>;

export default ViewInstrument;
