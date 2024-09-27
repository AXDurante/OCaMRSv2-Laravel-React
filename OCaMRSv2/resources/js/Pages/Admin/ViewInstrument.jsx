import React, { useState } from "react";
import AdminNavBar from "@/Layouts/AdminNavBar";
import { useForm } from "@inertiajs/react";

function ViewInstrument({ equipment = [] }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredEquipments, setFilteredEquipments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Initialize useForm
    const { data, setData, post, processing, errors } = useForm({
        equip_category: "",
        equip_name: "",
    });

    // Handle category selection and filter equipment based on the selected category
    const handleDropdownChange = (e) => {
        const selectedCategoryId = e.target.value;
        setSelectedCategory(selectedCategoryId);
        const filtered = equipment.filter(
            (item) => item.equip_category === selectedCategoryId
        );
        setFilteredEquipments(filtered);
    };

    const handleShowForm = () => {
        setShowForm(true);
        setSuccessMessage(""); // Reset success message when showing the form
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    // Submit function
    const handleSubmit = (e) => {
        e.preventDefault();
        post("/equipment", data, {
            onSuccess: () => {
                setShowForm(false); // Close the form
                setSuccessMessage("Equipment added successfully!"); // Set success message
            },
            onError: () => {
                // Handle error if needed
            },
        });
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

                    <button className="buttonAddTool" onClick={handleShowForm}>
                        <span>
                            <i className="bi bi-plus-circle-dotted me-2"></i>
                        </span>
                        <span className="instrument-text">Instrument</span>
                    </button>

                    {/* Success Alert */}
                    {successMessage && (
                        <div
                            role="alert"
                            className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105 mt-3"
                        >
                            <svg
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="h-5 w-5 flex-shrink-0 mr-2 text-green-600"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                ></path>
                            </svg>
                            <p className="text-xs font-semibold">
                                {successMessage}
                            </p>
                        </div>
                    )}

                    {/* Overlay Pop-up form */}
                    <div className={`overlay ${showForm ? "show" : ""}`}>
                        <div className="popup-form">
                            <div className="form-content">
                                <h2>Add Instrument</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="categoryName"
                                            className="form-label"
                                        >
                                            Name of Category
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="categoryName"
                                            placeholder="Enter category"
                                            value={data.equip_category}
                                            onChange={(e) =>
                                                setData(
                                                    "equip_category",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.equip_category && (
                                            <div className="text-danger">
                                                {errors.equip_category}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="instrumentName"
                                            className="form-label"
                                        >
                                            Name of Instrument
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="instrumentName"
                                            placeholder="Enter instrument"
                                            value={data.equip_name}
                                            onChange={(e) =>
                                                setData(
                                                    "equip_name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.equip_name && (
                                            <div className="text-danger">
                                                {errors.equip_name}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={processing}
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary ms-2"
                                        onClick={handleCloseForm}
                                    >
                                        Cancel
                                    </button>
                                </form>
                                {/* Success message display */}
                                {successMessage && (
                                    <div className="alert alert-success mt-3">
                                        {successMessage}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Dropdown to select category */}
                    <div className="mt-3">
                        <select
                            className="form-select"
                            onChange={handleDropdownChange}
                            value={selectedCategory || ""}
                        >
                            <option value="">Select a category</option>
                            {[
                                ...new Set(
                                    equipment.map((item) => item.equip_category)
                                ),
                            ].map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Display filtered equipments */}
                    <div className="mt-4">
                        {filteredEquipments.length > 0 ? (
                            <div>
                                <h3>
                                    Equipments in Category: {selectedCategory}
                                </h3>
                                {filteredEquipments.map((item, index) => (
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
                                                    {item.equip_name}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            selectedCategory && (
                                <p>No equipment found for this category.</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

ViewInstrument.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default ViewInstrument;
