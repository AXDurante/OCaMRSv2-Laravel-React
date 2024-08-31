import Navbar from "../Layouts/Navbar";
import { useState } from "react";
function Feedback() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    return (
        <div className="d-flex">
            <div id="content" className="main-content flex-fill p-3">
                <div>
                    <div>
                        <h1 className="d-inline">Give us a Feedback | </h1>
                        <h1 className="d-inline fw-light">Rate our Services</h1>
                        <hr />
                    </div>
                    <div className="mt-3">
                        <div className="row forms-bg">
                            <div className="col-12 col-md-4 profile-bg d-flex flex-column align-items-center justify-content-center p-3 text-yellow1">
                                <div className="icon-wrapper mb-4">
                                    <i className="bi bi-chat-square-dots fs-1 "></i>
                                </div>
                                <h3 className="text-center">
                                    Give us a Feedback!
                                </h3>
                            </div>

                            <div className="col-12 col-md-8">
                                <div className="pt-5 pb-5 p-3">
                                    <div className="row">
                                        <div className="form-group d-flex align-items-start mb-3">
                                            <label className="form-label fw-bold mb-0 me-3 w-25">
                                                Provide a Rating
                                            </label>
                                            {/* Rating stars */}
                                            <div className="star-rating mb-3">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        key={star}
                                                        className={`star ${
                                                            hover >= star ||
                                                            rating >= star
                                                                ? "filled"
                                                                : ""
                                                        }`}
                                                        onMouseEnter={() =>
                                                            setHover(star)
                                                        }
                                                        onMouseLeave={() =>
                                                            setHover(null)
                                                        }
                                                        onClick={() =>
                                                            setRating(star)
                                                        }
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group d-flex align-items-start mb-3">
                                            <label className="form-label fw-bold mb-0 me-3 w-25">
                                                Comment
                                            </label>
                                            <textarea
                                                class="form-control"
                                                id="exampleFormControlTextarea1"
                                                rows="5"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-dark w-50 text-warning mt-2 mb-4">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a
                            href="/jobOrder"
                            className="btn btn-dark w-100 text-warning mt-5 mb-4"
                        >
                            Return to Track Request List
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

Feedback.layout = (page) => <Navbar>{page}</Navbar>;

export default Feedback;
