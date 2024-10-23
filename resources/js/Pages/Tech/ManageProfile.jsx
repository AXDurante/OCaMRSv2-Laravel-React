import Navbar2 from "@/Layouts/Navbar2";
import { usePage, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react"; // Add useEffect
import { Modal, Button } from 'react-bootstrap'; // Make sure to install react-bootstrap if not already installed

function Home({ absolute, firstName, lastName, email, theID }) {
    const { auth } = usePage().props;
    const [showSuccess, setShowSuccess] = useState(false);
    const [showNoChanges, setShowNoChanges] = useState(false); // Add this line
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        firstName: auth.user.firstName,
        lastName: auth.user.lastName,
        email: auth.user.email,
        phoneNumber: auth.user.phoneNumber,
        userID: auth.user.id,
        password: '',
        password_confirmation: '',
        photo: null,
        removePhoto: false, // Add this line
    });

    // Modify the hasChanges function
    const hasChanges = () => {
        return data.firstName !== auth.user.firstName ||
               data.lastName !== auth.user.lastName ||
               data.email !== auth.user.email ||
               data.phoneNumber !== auth.user.phoneNumber ||
               (data.password !== '' && data.password_confirmation !== '') ||
               data.photo !== null; // Add this line
    };

    // Modify the submit function
    const submit = (e) => {
        e.preventDefault();
        if (hasChanges()) {
            const formData = new FormData();
            for (let key in data) {
                if (key === 'photo' && data[key] === null) continue;
                formData.append(key, data[key]);
            }
            
            post(route('technician.updateProfile'), formData, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 5000);
                },
            });
        } else {
            setShowNoChanges(true);
            setTimeout(() => setShowNoChanges(false), 5000);
        }
    };

    // Add this effect to hide notifications when data changes
    useEffect(() => {
        setShowSuccess(false);
        setShowNoChanges(false);
    }, [data]);

    const handleShowPhoto = () => {
        setShowPhotoModal(true);
    };

    const handleClosePhoto = () => {
        setShowPhotoModal(false);
    };

    return (
        <div className="d-flex">
            
                <div className="container">
                    <h1 className="mb-4">Manage Profilezzz</h1>
                    <div className="card shadow-lg rounded-lg overflow-hidden">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-12">
                                    <div className="p-5">
                                        <form onSubmit={submit} encType="multipart/form-data">
                                            <div className="message-container mb-4">
                                                {showSuccess && (
                                                    <div className="alert alert-success shadow-lg animate-message" role="alert">
                                                        Your profile has been successfully updated!
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
                                                        className="form-control shadow-sm animate-field"
                                                        value={data.firstName}
                                                        onChange={e => setData('firstName', e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <label className="form-label fw-bold">Last Name</label>
                                                    <input
                                                        name="lastName"
                                                        type="text"
                                                        className="form-control shadow-sm animate-field"
                                                        value={data.lastName}
                                                        onChange={e => setData('lastName', e.target.value)}
                                                    />
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
                                                        className="form-control shadow-sm animate-field"
                                                        value={data.phoneNumber}
                                                        onChange={e => setData('phoneNumber', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div className='d-flex align-items-center'>
                                                        <label className="form-label fw-bold">Password</label>
                                                        <small className='mb-0 ml-2 mx-2 text-danger'>(1 uppercase letter, 1 number, and 1 special character required.)</small>
                                                    </div>
                                                    <input
                                                        name="password"
                                                        type="password"
                                                        className="form-control shadow-sm animate-field"
                                                        value={data.password}
                                                        onChange={e => setData('password', e.target.value)}
                                                    />
                                                    {errors.password && <small className="text-danger mt-1">{errors.password}</small>}
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <label className="form-label fw-bold">Confirm Password</label>
                                                    <input
                                                        name="password_confirmation"
                                                        type="password"
                                                        className="form-control shadow-sm animate-field"
                                                        value={data.password_confirmation}
                                                        onChange={e => setData('password_confirmation', e.target.value)}
                                                    />
                                                    <small className="text-muted">Leave password fields empty to keep your current password.</small>
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
                                                        {auth.user.photo && (
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
                                            >
                                                Update Profile
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
                    {auth.user.photo && (
                        <>
                            <p>Debug: {auth.user.photo_url}</p>
                            <img 
                                src={auth.user.photo_url}
                                alt="Profile Photo" 
                                className="img-fluid"
                                onError={(e) => {
                                    console.error("Image failed to load:", e.target.src);
                                    e.target.onerror = null;
                                    e.target.src = "/path/to/fallback/image.jpg"; // Replace with an actual fallback image path
                                }}
                            />
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePhoto}>
                        Close
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
