import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Navbar from "../Layouts/Navbar";

function Feedback({ jobOrderId, jobOrder }) {
    const { data, setData, post, processing, errors } = useForm({
        rating: 0,
        comment: "",
        job_order_id: jobOrderId,
    });

    const [hoveredRating, setHoveredRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("feedback.store"));
    };

    const renderStars = () => {
        return [...Array(5)].map((_, index) => (
            <i
                key={index}
                className={`bi bi-star-fill fs-4 ${
                    index < (hoveredRating || data.rating)
                        ? "text-warning"
                        : "text-secondary"
                } hover-scale`}
                onMouseEnter={() => setHoveredRating(index + 1)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setData("rating", index + 1)}
                style={{ cursor: "pointer" }}
            />
        ));
    };

    return (
        <div className="ps-3 pe-3">
            <div>
                <h1 className="d-inline">Give Feedback | </h1>
                <h1 className="d-inline fw-light">Rate Our Service</h1>
                <hr />
            </div>

            <div className="mt-3">
                <div className="row forms-bg">
                    <div className="col-12 col-md-4 profile-bg d-flex flex-column align-items-center justify-content-center p-3 text-yellow1">
                        <div className="icon-wrapper mb-4">
                            <i className="bi bi-chat-square-heart fs-1"></i>
                        </div>
                        <h3 className="text-center">Your Opinion Matters</h3>
                    </div>

                    <div className="col-12 col-md-8 p-4 fade-in">
                        <div className="card shadow-lg border-0 feedback-card">
                            <div className="card-body p-4">
                                {/* Job Order Details Section */}
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <div className="d-flex align-items-center mb-2">
                                            <label className="form-label fw-bold mb-0 me-3">
                                                Job Order ID:
                                            </label>
                                            <span className="text-muted">
                                                #{jobOrderId}
                                            </span>
                                        </div>
                                        <div className="d-flex align-items-center mb-2">
                                            <label className="form-label fw-bold mb-0 me-3">
                                                Service Type:
                                            </label>
                                            <span className="text-muted">
                                                {jobOrder?.service_type}
                                            </span>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <label className="form-label fw-bold mb-0 me-3">
                                                Date Requested:
                                            </label>
                                            <span className="text-muted">
                                                {new Date(
                                                    jobOrder?.date_request
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-4 hover-scale">
                                        <div className="col-12">
                                            <label className="form-label fw-bold mb-3">
                                                Rate our service{" "}
                                                <span
                                                    style={{ color: "#dc3545" }}
                                                >
                                                    *
                                                </span>
                                            </label>
                                            <div className="star-rating d-flex gap-2">
                                                {renderStars()}
                                            </div>
                                            {errors.rating && (
                                                <div className="text-danger mt-1">
                                                    {errors.rating}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row hover-scale">
                                        <div className="col-12">
                                            <label className="form-label fw-bold mb-3">
                                                Share your experience{" "}
                                                <span
                                                    style={{ color: "#dc3545" }}
                                                >
                                                    *
                                                </span>
                                            </label>
                                            <div className="comment-box">
                                                <textarea
                                                    className="form-control border-0 bg-transparent"
                                                    rows="4"
                                                    value={data.comment}
                                                    onChange={(e) =>
                                                        setData(
                                                            "comment",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Tell us what you think..."
                                                ></textarea>
                                            </div>
                                            {errors.comment && (
                                                <div className="text-danger mt-1">
                                                    {errors.comment}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-12">
                                            <button
                                                type="submit"
                                                className="btn btn-warning w-100 animate-button"
                                                disabled={processing}
                                            >
                                                Submit Feedback
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fade-in-delayed">
                    <a
                        href="/jobOrder"
                        className="btn btn-dark w-100 text-warning mt-5 mb-4 return-button"
                    >
                        Return to Track Request List
                    </a>
                </div>
            </div>
        </div>
    );
}

Feedback.layout = (page) => <Navbar>{page}</Navbar>;

export default Feedback;
