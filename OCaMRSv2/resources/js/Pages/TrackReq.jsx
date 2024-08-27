import Navbar from "../Layouts/Navbar";

function TrackReq() {
    return (
        <div className="d-flex">
            <div id="content" className="main-content flex-fill p-3">
                <div>
                    <div>
                        <h1 className="d-inline">Track Request | </h1>
                        <h1 className="d-inline fw-light">Open Request</h1>
                        <hr />
                    </div>

                    <div className="search-bar mt-3">
                        <div className="input-group shadow-sm">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                aria-label="Search"
                                aria-describedby="search-button"
                            />
                            <button
                                className="btn btn-primary"
                                type="button"
                                id="search-button"
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Card */}
                    <div className="card mt-4 shadow-sm" id="cardTrackReq">
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
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text">
                                    This is an example of a card that is as wide
                                    as the search bar, with an image on the left
                                    side.
                                </p>
                                <div className="d-flex justify-content-end mt-4">
                                    <button
                                        className="btn btn-secondary me-2"
                                        id="btnFeed"
                                    >
                                        Give Feedback
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        id="btnSee"
                                    >
                                        See Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-4 shadow-sm" id="cardTrackReq">
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
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text">
                                    This is an example of a card that is as wide
                                    as the search bar, with an image on the left
                                    side.
                                </p>
                                <div className="d-flex justify-content-end mt-4">
                                    <button
                                        className="btn btn-secondary me-2"
                                        id="btnFeed"
                                    >
                                        Give Feedback
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        id="btnSee"
                                    >
                                        See Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

TrackReq.layout = (page) => <Navbar>{page}</Navbar>;

export default TrackReq;
