import AdminNavBar from "@/Layouts/AdminNavBar";
import { useForm, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

function Home({ theUser }) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showNoChanges, setShowNoChanges] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        firstName: theUser.firstName,
        lastName: theUser.lastName,
        email: theUser.email,
        phoneNumber: theUser.phoneNumber,
        userID: theUser.id,
        password: '',
        password_confirmation: '',
    });

    const hasChanges = () => {
        return data.firstName !== theUser.firstName ||
               data.lastName !== theUser.lastName ||
               data.email !== theUser.email ||
               data.phoneNumber !== theUser.phoneNumber ||
               (data.password !== '' && data.password_confirmation !== '');
    };

    const submit = (e) => {
        e.preventDefault();
        if (hasChanges()) {
            post(route('admin.update.tech', { id: data.userID }), {
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

    useEffect(() => {
        setShowSuccess(false);
        setShowNoChanges(false);
    }, [data]);

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