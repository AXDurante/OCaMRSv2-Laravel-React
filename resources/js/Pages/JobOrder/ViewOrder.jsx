import Navbar from "../../Layouts/Navbar";

function ViewOrder({ jobOrder = {} }) {
    const instruments = jobOrder.int_units || jobOrder.instruments || [];

    if (!jobOrder || Object.keys(jobOrder).length === 0) {
        return (
            <div className="view-order-form">
                <div className="view-section fade-in">
                    <div className="alert alert-warning">
                        No job order data available.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="view-order-form">
            <div className="view-section fade-in">
                <h1 className="text-2xl mb-4">
                    Job Request <span className="text-black font-light subtitle-span">| Request Details</span>
                </h1>
                <hr className="mb-4 border-gray-200" />

                {/* System Information Section */}
                <div className="system-info-section mb-4">
                    <h4 className="section-title">
                        <span className="section-number">1</span>
                        System Information
                    </h4>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="view-label">Laboratory</label>
                            <div className="view-input">{jobOrder.lab || 'N/A'}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="view-label">Laboratory Location</label>
                            <div className="view-input">{jobOrder.lab_loc || 'N/A'}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="view-label">College/Faculty/Office</label>
                            <div className="view-input">{jobOrder.dept_name || 'N/A'}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="view-label">Position</label>
                            <div className="view-input">{jobOrder.pos || 'N/A'}</div>
                        </div>
                    </div>
                </div>

                {/* Request Details Section */}
                <div className="request-info-section">
                    <h4 className="section-title">
                        <span className="section-number">2</span>
                        Request Details
                    </h4>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="view-label">Service Type</label>
                            <div className="view-input">{jobOrder.service_type || 'N/A'}</div>
                        </div>
                        <div className="col-12">
                            <label className="view-label">Remarks</label>
                            <div className="view-input" style={{ minHeight: '100px' }}>
                                {jobOrder.remarks || 'No remarks provided'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Instruments Section */}
            <div className="view-section fade-in-delayed">
                <div className="section-header d-flex justify-content-between align-items-center mb-3">
                    <h3>Instruments</h3>
                </div>
                {instruments && instruments.length > 0 ? (
                    instruments.map((instrument, index) => (
                        <div key={instrument.id || index} className="view-instrument-card">
                            <div className="instrument-header">
                                <h5 className="instrument-title">Instrument {index + 1}</h5>
                            </div>
                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <label className="view-label">Equipment</label>
                                    <div className="view-input">{instrument.instrument || 'N/A'}</div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="view-label">Serial Number/Property Number</label>
                                    <div className="view-input">{instrument.instrument_num || 'N/A'}</div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <label className="view-label">Model</label>
                                    <div className="view-input">{instrument.model || 'N/A'}</div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <label className="view-label">Manufacturer</label>
                                    <div className="view-input">{instrument.manufacturer || 'N/A'}</div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <label className="view-label">Quantity</label>
                                    <div className="view-input">{instrument.qty || 'N/A'}</div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info">No instruments found.</div>
                )}
            </div>
        </div>
    );
}

ViewOrder.layout = (page) => <Navbar>{page}</Navbar>;

export default ViewOrder;
