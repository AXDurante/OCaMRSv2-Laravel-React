import Navbar2 from "@/Layouts/Navbar2";
import { usePage, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';

function Home({ absolute, firstName, lastName, email, theID }) {
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
        password: '',
        password_confirmation: '',
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
        return data.firstName !== auth.user.firstName ||
               data.lastName !== auth.user.lastName ||
               data.email !== auth.user.email ||
               data.phoneNumber !== auth.user.phoneNumber ||
               (data.password !== '' && data.password_confirmation !== '') ||
               data.photo !== null;
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
        setData('password', newPassword);
        validatePasswords(newPassword, data.password_confirmation);
    };

    const handleConfirmPasswordChange = (e) => {
        const confirmation = e.target.value;
        setData('password_confirmation', confirmation);
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
        post(route('technician.updateProfile'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 5000);
                setShowConfirmModal(false);
            },
            onError: () => {
                setShowConfirmModal(false);
            }
        });
    };

    const handleShowPhoto = () => {
        setShowPhotoModal(true);
    };

    const handleClosePhoto = () => {
        setShowPhotoModal(false);
    };

    const getStorageUrl = (path) => {
        const userType = usePage().props.userType;
        const subfolder = userType === 'Technician' ? 'technicianSignature' : 'clientSignature';
        return `${storageBaseUrl}/${subfolder}/${auth.user.photo}`;
    };

    const photoUrl = auth.user.photo ? getStorageUrl(`photos/${auth.user.photo}`) : null;

    const handleFirstNameChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Only allow letters and spaces
        setData('firstName', value);
    };

    const handleLastNameChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Only allow letters and spaces
        setData('lastName', value);
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10); // Only allow numbers, max 11 digits
        setData('phoneNumber', value);
    };

    return (
        <div className="d-flex">
            <div className="container">
                <h1 className="mb-4">Manage Profiless</h1>
                <div className="card shadow-lg rounded-lg overflow-hidden">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-12">
                                <div className="p-5">
                                    <form onSubmit={handleSubmitClick} encType="multipart/form-data">
                                        <div className="message-container mb-4">
                                            {showSuccess && (
                                                <div className="alert alert-success shadow-lg animate-message" role="alert">
                                                    {flash && flash.message ? flash.message : 'Profile updated successfully'}
                                                </div>
                                            )}
                                            {showNoChanges && (
                                                <div className="alert alert-warning shadow-lg animate-message" role="alert">
                                                    No changes were made to your profile.
                                                </div>
                                            )}
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-bold">First Name</label>
                                                <input
                                                    name="firstName"
                                                    type="text"
                                                    className={`form-control shadow-sm animate-field ${errors.firstName ? 'is-invalid' : ''}`}
                                                    value={data.firstName}
                                                    onChange={handleFirstNameChange}
                                                />
                                                {errors.firstName && (
                                                    <div className="invalid-feedback">
                                                        {errors.firstName}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-bold">Last Name</label>
                                                <input
                                                    name="lastName"
                                                    type="text"
                                                    className={`form-control shadow-sm animate-field ${errors.lastName ? 'is-invalid' : ''}`}
                                                    value={data.lastName}
                                                    onChange={handleLastNameChange}
                                                />
                                                {errors.lastName && (
                                                    <div className="invalid-feedback">
                                                        {errors.lastName}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-bold">Email</label>
                                                <input
                                                    name="email"
                                                    type="email"
                                                    className="form-control shadow-sm animate-field"
                                                    value={data.email}
                                                    onChange={e => setData('email', e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-bold">Contact Number</label>
                                                <input
                                                    name="phoneNumber"
                                                    type="text"
                                                    className={`form-control shadow-sm animate-field ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                                    value={data.phoneNumber}
                                                    onChange={handlePhoneNumberChange}
                                                    maxLength={10}
                                                />
                                                {errors.phoneNumber && (
                                                    <div className="invalid-feedback">
                                                        {errors.phoneNumber}
                                                    </div>
                                                )}
                                                <small className="text-muted">
                                                    Phone number must be exactly 10 digits
                                                </small>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className='d-flex align-items-center'>
                                                    <label className="form-label fw-bold">Password</label>
                                                    <small className='mb-0 ml-2 mx-2 text-danger'>
                                                        (1 uppercase letter, 1 number, and 1 special character required.)
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
                                                        Password must be at least 8 characters.
                                                    </div>
                                                )}
                                                {errors.password && (
                                                    <div className="text-danger mt-1">{errors.password}</div>
                                                )}
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-bold">Confirm Password</label>
                                                <div className="position-relative">
                                                    <input
                                                        name="password_confirmation"
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        className={`form-control shadow-sm animate-field ${!passwordMatch ? 'is-invalid' : ''}`}
                                                        value={data.password_confirmation}
                                                        onChange={handleConfirmPasswordChange}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn position-absolute end-0 top-50 translate-middle-y text-muted"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        style={{ 
                                                            border: 'none', 
                                                            background: 'none',
                                                            padding: '0.375rem 0.75rem',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        {showConfirmPassword ? '👁️' : '👁️'}
                                                    </button>
                                                </div>
                                                <small className="text-muted d-block mt-1">
                                                    Leave password fields empty to keep your current password.
                                                </small>
                                                {!passwordMatch && data.password_confirmation && (
                                                    <div className="text-danger mt-1">
                                                        Passwords do not match.
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 mb-4">
                                                <label className="form-label fw-bold">Signature Photo</label>
                                                <div className="d-flex align-items-center">
                                                    <input
                                                        type="file"
                                                        name="photo"
                                                        className="form-control shadow-sm animate-field me-2"
                                                        onChange={e => setData('photo', e.target.files[0])}
                                                    />
                                                    {photoUrl && (
                                                        <>
                                                            <Button 
                                                                variant="outline-primary" 
                                                                onClick={handleShowPhoto}
                                                                className="me-2"
                                                            >
                                                                View Current Signature Photo
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                                {errors.photo && <small className="text-danger mt-1">{errors.photo}</small>}
                                            </div>
                                        </div>
                                        <button 
                                            type="submit" 
                                            className="btn btn-dark shadow-lg w-100 animate-button custom-button"
                                            disabled={processing}
                                        >
                                            {processing ? 'Updating...' : 'Update Profile'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Photo Modal */}
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

            {/* Add Confirmation Modal */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to update your profile? This action cannot be undone.
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
                        {processing ? 'Updating...' : 'Confirm Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

Home.layout = (page) => {
    const props = page.props;
    return (
        <Navbar2 
            absolute={props.absolute}
            firstName={props.firstName}
            lastName={props.lastName}
            email={props.email}
        >
            {page}
        </Navbar2>
    );
};

export default Home;
