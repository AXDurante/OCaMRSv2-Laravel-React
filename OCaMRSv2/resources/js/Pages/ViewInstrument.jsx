import React, { useState } from "react";
import Navbar from "@/Layouts/Navbar";

function ViewInstrument({ equipment }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredEquipments, setFilteredEquipments] = useState([]);

    // Handle category selection and filter equipment based on the selected category
    const handleDropdownChange = (e) => {
        const selectedCategoryId = e.target.value;
        setSelectedCategory(selectedCategoryId);

        // Filter the equipment based on the selected category
        const filtered = equipment.filter(
            (item) => item.equip_category === selectedCategoryId
        );
        setFilteredEquipments(filtered);
    };

    return (
        <div className="d-flex">
            <div id="content" className=" flex-fill p-3">
                <div>
                    <div>
                        <h1 className="d-inline">View Instrument | </h1>
                        <h1 className="d-inline fw-light">
                            Supported Equipments
                        </h1>
                        <hr />
                    </div>

                    {/* Dropdown to select category */}
                    <div className="mt-3">
                        <select
                            className="form-select"
                            onChange={handleDropdownChange}
                            value={selectedCategory || ""}
                        >
                            <option value="">Select a category</option>
                            {/* Get unique categories from the equipment prop */}
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

ViewInstrument.layout = (page) => <Navbar>{page}</Navbar>;

export default ViewInstrument;
