import React from "react";

const PhoneNumberInput = ({ value, onChange, ...props }) => {
    const handleChange = (e) => {
        onChange(e);
    };

    return (
        <input
            type="tel"
            value={value}
            onChange={handleChange}
            className={"inputText3"}
            {...props}
        />
    );
};

export default PhoneNumberInput;
