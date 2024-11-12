import Navbar from "../Layouts/Navbar";
import { usePage, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function Home({ absolute, firstName, lastName, email, theID, imageRequirements }) {
    const { auth, flash, storageBaseUrl } = usePage().props;
    const [showSuccess, setShowSuccess] = useState(false);
    const [showNoChanges, setShowNoChanges] = useState(false);
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [passwordLength, setPasswordLength] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        firstName: auth.user.firstName,
        lastName: auth.user.lastName,
        email: auth.user.email,
        phoneNumber: auth.user.phoneNumber,
        userID: auth.user.id,
        password: "",
        password_confirmation: "",
        photo: null,
        removePhoto: false,
    });

    useEffect(() => {
        if (flash && flash.message) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
        }
    }, [flash]);

    const hasChanges = () => {
        return (
            data.firstName !== auth.user.firstName ||
            data.lastName !== auth.user.lastName ||
            data.email !== auth.user.email ||
            data.phoneNumber !== auth.user.phoneNumber ||
            (data.password !== "" && data.password_confirmation !== "") ||
            data.photo !== null
        );
    };

    const validatePasswords = (password, confirmation) => {
        if (password || confirmation) {
            setPasswordMatch(password === confirmation);
            setPasswordLength(password.length >= 8);
        } else {
            setPasswordMatch(true);
            setPasswordLength(true);
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setData("password", newPassword);
        validatePasswords(newPassword, data.password_confirmation);
    };

    const handleConfirmPasswordChange = (e) => {
        const confirmation = e.target.value;
        setData("password_confirmation", confirmation);
        validatePasswords(data.password, confirmation);
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();

        if (!hasChanges()) {
            setShowNoChanges(true);
            setTimeout(() => setShowNoChanges(false), 5000);
            return;
        }

        setShowConfirmModal(true);
    };

    const confirmSubmit = () => {
        post(route("updateProfile"), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 5000);
                setShowConfirmModal(false);
            },
            onError: () => {
                setShowConfirmModal(false);
            },
        });
    };

    const handleShowPhoto = () => {
        setShowPhotoModal(true);
    };

    const handleClosePhoto = () => {
        setShowPhotoModal(false);
    };

    const getStorageUrl = () => {
        return `${storageBaseUrl}/clientSignature/${auth.user.photo}`;
    };

    const photoUrl = auth.user.photo ? getStorageUrl() : null;

    return (
        <div className="d-flex">
            <div id="content" className="flex-fill p-3">
                <div>
                    <h1 className="d-inline">Manage Profile | </h1>
                    <h1 className="d-inline fw-light">Edit your profile</h1>
                    <hr />
                </div>
                <div className="card shadow-lg rounded-lg overflow-hidden">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-12">
                                <div className="p-5">
                                    <form onSubmit={handleSubmitClick}>
                                        <div className="message-container mb-4">
                                            {showSuccess && (
                                                <div
                                                    className="alert alert-success shadow-lg animate-message"
                                                    role="alert"
                                                >
                                                    Your profile has been
                                                    successfully updated!
                                                </div>
                                            )}
                                            {showNoChanges && (
                                                <div
                                                    className="alert alert-warning shadow-lg animate-message"
                                                    role="alert"
                                                >
                                                    No changes were made to your
                                                    profile.
                                                </div>
                                            )}
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-bold">
                                                    First Name
                                                </label>
                                                <input
                                                    name="firstName"
                                                    type="text"
                                                    className="form-control shadow-sm animate-field"
                                                    value={data.firstName}
                                                    onChange={(e) =>
                                                        setData(
                                                            "firstName",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-bold">
                                                    Last Name
                                                </label>
                                                <input
                                                    name="lastName"
                                                    type="text"
                                                    className="form-control shadow-sm animate-field"
                                                    value={data.lastName}
                                                    onChange={(e) =>
                                                        setData(
                                                            "lastName",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-bold">
                                                    Email
                                                </label>
                                                <input
                                                    name="email"
                                                    type="email"
                                                    className="form-control shadow-sm animate-field"
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-bold">
                                                    Contact Number
                                                </label>
                                                <input
                                                    name="phoneNumber"
                                                    type="text"
                                                    className="form-control shadow-sm animate-field"
                                                    value={data.phoneNumber}
                                                    onChange={(e) =>
                                                        setData(
                                                            "phoneNumber",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 mb-4">
                                                <label className="form-label fw-bold">Signature Photo</label>
                                                <div className="mb-2">
                                                    <small className="text-muted">
                                                        {imageRequirements?.message || 'Please upload a PNG file for your signature. This ensures optimal quality and transparency.'}
                                                    </small>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <input
                                                        type="file"
                                                        name="photo"
                                                        accept=".png"
                                                        className="form-control shadow-sm animate-field me-2"
                                                        onChange={e => setData('photo', e.target.files[0])}
                                                    />
                                                    {photoUrl && (
                                                        <Button 
                                                            variant="outline-primary" 
                                                            onClick={handleShowPhoto}
                                                            className="me-2"
                                                        >
                                                            View Current Signature Photo
                                                        </Button>
                                                    )}
                                                </div>
                                                {errors.photo && <div className="text-danger mt-1">{errors.photo}</div>}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="d-flex align-items-center">
                                                    <label className="form-label fw-bold">
                                                        Password
                                                    </label>
                                                    <small className="mb-0 ml-2 mx-2 text-danger">
                                                        (1 uppercase letter, 1
                                                        number, and 1 special
                                                        character required.)
                                                    </small>
                                                </div>
                                                <div className="position-relative">
                                                    <input
                                                        name="password"
                                                        type={showPassword ? "text" : "password"}
                                                        className={`form-control shadow-sm animate-field ${!passwordMatch || !passwordLength ? 'is-invalid' : ''}`}
                                                        value={data.password}
                                                        onChange={handlePasswordChange}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn position-absolute end-0 top-50 translate-middle-y text-muted"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        style={{ 
                                                            border: 'none', 
                                                            background: 'none',
                                                            padding: '0.375rem 0.75rem',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        {showPassword ? '👁️' : '👁️'}
                                                    </button>
                                                </div>
                                                {!passwordLength && data.password && (
                                                    <div className="text-danger mt-1">
                                                        Password must be at
                                                        least 8 characters.
                                                    </div>
                                                )}
                                            {errors.password && (
                                                <div className="text-danger mt-1">
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <label className="form-label fw-bold">
                                                Confirm Password
                                            </label>
                                            <div className="position-relative">
                                                <input
                                                    name="password_confirmation"
                                                    type={
                                                        showConfirmPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    className={`form-control shadow-sm animate-field ${
                                                        !passwordMatch
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    value={
                                                        data.password_confirmation
                                                    }
                                                    onChange={
                                                        handleConfirmPasswordChange
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    className="btn position-absolute end-0 top-50 translate-middle-y text-muted"
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            !showConfirmPassword
                                                        )
                                                    }
                                                    style={{
                                                        border: "none",
                                                        background: "none",
                                                        padding:
                                                            "0.375rem 0.75rem",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    {showConfirmPassword
                                                        ? "👁️"
                                                        : "👁️"}
                                                </button>
                                            </div>
                                            <small className="text-muted d-block mt-1">
                                                Leave password fields empty to
                                                keep your current password.
                                            </small>
                                            {!passwordMatch &&
                                                data.password_confirmation && (
                                                    <div className="text-danger mt-1">
                                                        Passwords do not match.
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-dark shadow-lg w-100 animate-button custom-button"
                                    >
                                        Update Profile
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showPhotoModal} onHide={handleClosePhoto}>
                <Modal.Header closeButton>
                    <Modal.Title>Current Signature</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {photoUrl && (
                        <img
                            src={photoUrl}
                            alt="Profile Photo"
                            className="img-fluid"
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePhoto}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to update your profile? This action
                    cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowConfirmModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={confirmSubmit}
                        disabled={processing}
                    >
                        {processing ? "Updating..." : "Confirm Update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </div>
    );
}

Home.layout = (page) => {
    const props = page.props;
    return (
        <Navbar
            absolute={props.absolute}
            firstName={props.firstName}
            lastName={props.lastName}
            email={props.email}
        >
            {page}
        </Navbar>
    );
};

export default Home;
