export default function CreateInstrument ({ id, deleteInstrument }) {
    return (
        <>
            <div>
                <div className="">
                    <h4 className="mt-4">Item No.1</h4>
                        <div className="row forms-bg p-3">
                            <div className="row forms-bg p-3">
                                <div className="col-12 col-md-5 d-flex flex-column p-3">
                                    <h6 className="w-100 fw-bold text-start">
                                            Instrument
                                    </h6>
                                    <input
                                        type="text"
                                        className="w-100 mb-2 rounded"
                                    />
                                    <h6 className="w-100 fw-bold text-start">
                                        Model
                                    </h6>
                                    <input
                                        type="text"
                                        className="w-100 mb-2 rounded"
                                    />
                                    <h6 className="w-100 fw-bold text-start">
                                        Image Attachment
                                    </h6>
                                    <button className="btn btn-secondary w-50">
                                        + Insert Image
                                    </button>
                                    </div>

                                    <div className="col-12 col-md-3 d-flex flex-column p-3">
                                        <h6 className="w-100 fw-bold text-start">
                                            Quantity
                                        </h6>
                                        <input
                                            type="text"
                                            className="w-50 mb-2 justify-content-start rounded"
                                        />
                                        <h6 className="w-100 fw-bold text-start">
                                            Manufacturer
                                        </h6>
                                        <input
                                            type="text"
                                            className="w-100 mb-2 rounded"
                                        />
                                    </div>

                                    <div className="col-12 col-md-4 d-flex flex-column p-3">
                                        <h6 className="w-100 fw-bold text-start ">
                                            Instrument Serial No
                                        </h6>
                                        <input
                                            type="text"
                                            className="w-100 fw-bold mb-2 rounded"
                                        />
                                        <h6 className="w-100 fw-bold text-start">
                                            Property
                                        </h6>
                                        <input
                                            type="text"
                                            className="w-100 mb-2 rounded"
                                        />
                                    </div>

                                    <div className="col-12 d-flex flex-row-reverse">
                                        <button className="btn btn-danger"
                                                onClick={() => deleteInstrument(id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <hr />
            </div>
        </>
    )
}