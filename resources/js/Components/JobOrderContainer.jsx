import React, { useState } from "react";
import CreateOrder from "../Pages/JobOrder/CreateOrder";
import TrackOrder from "../Pages/JobOrder/TrackOrder";

function JobOrderContainer() {
    const [successMessage, setSuccessMessage] = useState("");

    return (
        <>
            <CreateOrder setSuccessMessage={setSuccessMessage} />
            <TrackOrder successMessage={successMessage} />
        </>
    );
}

export default JobOrderContainer;
