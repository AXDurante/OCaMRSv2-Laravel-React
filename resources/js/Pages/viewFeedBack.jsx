import Navbar from "../Layouts/Navbar";

function ViewFeedback({ feedback }) {
    // Function to render stars based on rating
    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <i
                key={index}
                className={`bi bi-star-fill fs-4 ${
                    index < rating ? 'text-warning' : 'text-secondary'
                }`}
            />
        ));
    };

    return (
        <div className="ps-3 pe-3">
            <div>
                <h1 className="d-inline">View Feedback | </h1>
                <h1 className="d-inline fw-light">Your Service Rating</h1>
                <hr />
            </div>
            <div className="mt-3">
                <div className="row forms-bg">
                    <div className="col-12 col-md-4 profile-bg d-flex flex-column align-items-center justify-content-center p-3 text-yellow1">
                        <div className="icon-wrapper mb-4">
                            <i className="bi bi-chat-square-dots fs-1"></i>
                        </div>
                        <h3 className="text-center">Your Feedback</h3>
                    </div>

                    <div className="col-12 col-md-8 p-4 fade-in">
                        <div className="card shadow-lg border-0 feedback-card">
                            <div className="card-body p-4">
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <div className="d-flex align-items-center mb-2">
                                            <label className="form-label fw-bold mb-0 me-3">
                                                Job Order ID:
                                            </label>
                                            <span className="text-muted">#{feedback.job_order_id}</span>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <label className="form-label fw-bold mb-0 me-3">
                                                Submitted on:
                                            </label>
                                            <span className="text-muted">
                                                {new Date(feedback.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-4 hover-scale">
                                    <div className="col-12">
                                        <label className="form-label fw-bold mb-3">
                                            Your Rating
                                        </label>
                                        <div className="star-rating d-flex gap-2">
                                            {renderStars(feedback.rating)}
                                        </div>
                                    </div>
                                </div>

                                <div className="row hover-scale">
                                    <div className="col-12">
                                        <label className="form-label fw-bold mb-3">
                                            Your Comment
                                        </label>
                                        <div className="comment-box">
                                            <p className="mb-0">
                                                {feedback.comment}
                                            </p>
                                        </div>
                                    </div>
                                </div>
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

ViewFeedback.layout = (page) => <Navbar>{page}</Navbar>;

export default ViewFeedback;
