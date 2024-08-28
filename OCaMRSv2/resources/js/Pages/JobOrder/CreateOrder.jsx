import Navbar from "../../Layouts/Navbar";

function CreateOrder({ jobOrder }) {
    console.log(jobOrder)
    return (
        <>
            <div className="d-flex"> 
                <div id="content" className="main-content flex-fill p-3">
                    <div>
                        <div>
                            <h1 class="d-inline">Job Request | </h1>
                            <h1 class="d-inline fw-light">Open Request</h1>
                            <hr />
                        </div>
                        <div>
                            <h4>Information</h4>
                            <div className="row forms-bg p-3">

                                <div className="col d-flex flex-column align-items-center p-3">
                                    
                                    <h6 className="d-flex flex-column align-items-start w-100">
                                        Service Requested
                                    </h6>
                                    <select
                                        class="form-select"
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 mb-2">
                                            <option value="" disabled selected> Please select type of service </option>
                                            <option> Option 1 </option>
                                            <option> Option 2 </option>
                                            <option> Option 3 </option>
                                    </select>

                                    <h6 className="d-flex flex-column align-items-start w-100">
                                        Laboratory
                                    </h6>
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 mb-2"
                                    />

                                    <h6 className="d-flex flex-column align-items-start w-100">
                                        College/Faculty/Office
                                    </h6>
                                    <select
                                        class="form-select"
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 mb-2">
                                            <option value="" disabled selected> Select your College/Faculty/Office </option>
                                            <option> Option 1 </option>
                                            <option> Option 2 </option>
                                            <option> Option 3 </option>
                                    </select>
                                </div>

                                <div className="col d-flex flex-column align-items-center p-3">
                                    <h6 className="d-flex flex-column align-items-start w-100">
                                        Instrument Transportation
                                    </h6>
                                    <select
                                        class="form-select"
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 mb-2">
                                            <option value="" disabled selected> Please select type of service </option>
                                            <option> Option 1 </option>
                                            <option> Option 2 </option>
                                            <option> Option 3 </option>
                                    </select>

                                    <h6 className="d-flex flex-column align-items-start w-100">
                                        Laboratory Location
                                    </h6>
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 mb-2"
                                    />

                                    <h6 className="d-flex flex-column align-items-start w-100">
                                        Position
                                    </h6>
                                    <input
                                        type="text"
                                        className="d-flex flex-column align-items-center w-100 mb-2"
                                    />
                                </div>

                                <div className="row">
                                    <h6 className="ms-1"> Remarks </h6>
                                    <textarea className="mx-3" placeholder="Enter remarks"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

CreateOrder.layout = (page) => <Navbar>{page}</Navbar>;

export default CreateOrder;