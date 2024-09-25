import React, { useState, useEffect } from "react";
import Navbar from "@/Layouts/Navbar";
import axios from "axios";

function ViewInstrument() {
    const [equipmentList, setEquipmentList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Fetch data from the database
    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await axios.get("/equipments");
                setEquipmentList(response.data); // Populate the equipmentList state
            } catch (error) {
                console.error("Error fetching equipment:", error);
            }
        };

        fetchEquipment();
    }, []);

    const handleDropdownChange = (e) => {
        const selectedCategoryId = e.target.value;
        const category = equipmentList.find(
            (item) => item.category === selectedCategoryId
        );
        setSelectedCategory(category);
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

                    {/* Dropdown */}
                    <div className="mt-3">
                        <select
                            className="form-select"
                            onChange={handleDropdownChange}
                            value={
                                selectedCategory
                                    ? selectedCategory.category
                                    : ""
                            }
                        >
                            <option value="">Select a category</option>
                            {equipmentList.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.category}
                                >
                                    {category.category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Display Selected Instruments */}
                    <div className="mt-4">
                        {selectedCategory && (
                            <div>
                                <h3>{selectedCategory.category}</h3>
                                {JSON.parse(selectedCategory.instruments).map(
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
