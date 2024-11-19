import AdminNavBar from "@/Layouts/AdminNavBar";
import { useForm, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

const styles = {
    alertAh: {
        backgroundColor: '#fff',
        border: '1px solid #dc3545',
        borderRadius: '4px',
        padding: '10px',
        marginTop: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    alertTitle: {
        color: '#dc3545',
        fontWeight: 'bold',
        marginBottom: '5px'
    },
    alertMessage: {
        color: '#dc3545'
    }
};

function Home({ theUser }) {
    console.log('Initial Props - theUser:', theUser);

    const [showSuccess, setShowSuccess] = useState(false);
    const [showNoChanges, setShowNoChanges] = useState(false);
    const { data, setData, post, processing, errors, setError } = useForm({
        firstName: theUser.firstName,
        lastName: theUser.lastName,
        email: theUser.email,
        phoneNumber: theUser.phoneNumber,
        userID: theUser.id,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        console.log('Form Data Updated:', data);
        console.log('Current Errors:', errors);
    }, [data, errors]);

    const hasChanges = () => {
        const changes = data.firstName !== theUser.firstName ||
               data.lastName !== theUser.lastName ||
               data.email !== theUser.email ||
               data.phoneNumber !== theUser.phoneNumber ||
               (data.password !== '' && data.password_confirmation !== '');
        
        console.log('Changes Detected:', {
            firstNameChanged: data.firstName !== theUser.firstName,
            lastNameChanged: data.lastName !== theUser.lastName,
            emailChanged: data.email !== theUser.email,
            phoneChanged: data.phoneNumber !== theUser.phoneNumber,
            passwordChanged: (data.password !== '' && data.password_confirmation !== ''),
            hasChanges: changes
        });
        
        return changes;
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate first name
        if (!data.firstName) {
            newErrors.firstName = 'First name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(data.firstName)) {
            newErrors.firstName = 'First name must only contain letters';
        }

        // Validate last name
        if (!data.lastName) {
            newErrors.lastName = 'Last name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(data.lastName)) {
            newErrors.lastName = 'Last name must only contain letters';
        }

        // Validate email
        if (!data.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Validate phone number
        if (!data.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (data.phoneNumber.length !== 11) {
            newErrors.phoneNumber = 'Phone number must be exactly 11 digits';
        } else if (!/^[0-9]+$/.test(data.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must only contain numbers';
        }

        // Validate password and confirmation if either is provided
        if (data.password || data.password_confirmation) {
            if (data.password.length < 8) {
                newErrors.password = 'Password must be at least 8 characters';
            } else if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])/.test(data.password)) {
                newErrors.password = 'Password must contain at least one uppercase letter, one number, and one special character';
            }

            if (data.password !== data.password_confirmation) {
                newErrors.password_confirmation = 'Passwords do not match';
            }
        }

        return newErrors;
    };

    const submit = (e) => {
        e.preventDefault();
        console.log('Submit Triggered');
        
        // Perform client-side validation
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            console.error('Validation Errors:', validationErrors);
            // Update each field's error individually
            Object.keys(validationErrors).forEach(field => {
                setError(field, validationErrors[field]);
            });
            return;
        }
        
        if (hasChanges()) {
            post(route('admin.update.tech', { id: data.userID }), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (response) => {
                    console.log('Success Response:', response);
                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 5000);
                },
                onError: (errors) => {
                    console.error('Submission Errors:', errors);
                    // Handle server-side validation errors
                    Object.keys(errors).forEach(field => {
                        setError(field, errors[field]);
                    });
                },
                onFinish: () => {
                    console.log('Request Finished');
                }
            });
        } else {
            setShowNoChanges(true);
            setTimeout(() => setShowNoChanges(false), 5000);
        }
    };

    useEffect(() => {
        console.log('Message States:', { showSuccess, showNoChanges });
    }, [showSuccess, showNoChanges]);

    const handleFirstNameChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        console.log('First Name Change:', { original: e.target.value, filtered: value });
        setData('firstName', value);
    };

    const handleLastNameChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        console.log('Last Name Change:', { original: e.target.value, filtered: value });
        setData('lastName', value);
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
        console.log('Phone Number Change:', { original: e.target.value, filtered: value });
        setData('phoneNumber', value);
    };

    return (
        <div className="d-flex">
            <div id="content" className="flex-fill p-3">
                <div className="container">
                    {/* Aesthetic header */}
                    <div className="card shadow-lg rounded-lg overflow-hidden mb-4 bg-primary text-white">
                        <div className="card-body p-4">
                            <h1 className="display-4 mb-0">
                                Updating Profile: {theUser.firstName} {theUser.lastName}
                            </h1>
                            <p className="lead mt-2 mb-0">Technician ID: {theUser.id}</p>
                        </div>
                    </div>

                    <div className="card shadow-lg rounded-lg overflow-hidden mb-4">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-12">
                                    <div className="p-5">
                                        <form onSubmit={submit}>
                                            <div className="message-container mb-4">
                                                {showSuccess && (
                                                    <div className="alert alert-success shadow-lg animate-message" role="alert">
                                                        Profile has been successfully updated!
                                                    </div>
                                                )}
                                                {showNoChanges && (
                                                    <div className="alert alert-warning shadow-lg animate-message" role="alert">
                                                        No changes were made to the profile.
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
                                                        <div className="invalid-feedback d-block">
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
                                                        <div className="invalid-feedback d-block">
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
                                                        className={`form-control shadow-sm animate-field ${errors.email ? 'is-invalid' : ''}`}
                                                        value={data.email}
                                                        onChange={e => setData('email', e.target.value)}
                                                    />
                                                    {errors.email && (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.email}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <label className="form-label fw-bold">Phone Number</label>
                                                    <input
                                                        name="phoneNumber"
                                                        type="text"
                                                        className={`form-control shadow-sm animate-field ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                                        value={data.phoneNumber}
                                                        onChange={handlePhoneNumberChange}
                                                        maxLength={11}
                                                    />
                                                    {errors.phoneNumber && (
                                                        <div style={styles.alertAh}>
                                                            <div style={styles.alertTitle}>Invalid Input</div>
                                                            <div style={styles.alertMessage}>{errors.phoneNumber}</div>
                                                        </div>
                                                    )}
                                                    <small className="text-muted">
                                                        Phone number must be exactly 11 digits (e.g., 09123456789)
                                                    </small>
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
                                                        className={`form-control shadow-sm animate-field ${errors.password ? 'is-invalid' : ''}`}
                                                        value={data.password}
                                                        onChange={e => setData('password', e.target.value)}
                                                    />
                                                    {errors.password && (
                                                        <div style={styles.alertAh}>
                                                            <div style={styles.alertTitle}>Invalid Input</div>
                                                            <div style={styles.alertMessage}>{errors.password}</div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <label className="form-label fw-bold">Confirm Password</label>
                                                    <input
                                                        name="password_confirmation"
                                                        type="password"
                                                        className={`form-control shadow-sm animate-field ${errors.password_confirmation ? 'is-invalid' : ''}`}
                                                        value={data.password_confirmation}
                                                        onChange={e => setData('password_confirmation', e.target.value)}
                                                    />
                                                    {errors.password_confirmation && (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.password_confirmation}
                                                        </div>
                                                    )}
                                                    <small className="text-muted">Leave password fields empty to keep the current password.</small>
                                                </div>
                                            </div>
                                            <button 
                                                type="submit" 
                                                className="btn btn-dark shadow-lg w-100 animate-button custom-button mb-3"
                                            >
                                                Update Profile
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Back button outside the form */}
                    <Link
                        href="/admin/account-handler"
                        className="btn btn-outline-secondary w-100 animate-button"
                    >
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Account Handler
                    </Link>
                </div>
            </div>
        </div>
    );
}

Home.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default Home;