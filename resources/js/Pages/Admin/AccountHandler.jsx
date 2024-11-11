import React, { useState, useEffect } from "react";
import AdminNavBar from "@/Layouts/AdminNavBar";
import axios from "axios";
import { Link } from "@inertiajs/react";

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idNumber, setIdNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [accountName, setAccountName] = useState("");
    const [accountEmail, setAccountEmail] = useState("");
    const [accountPassword, setAccountPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [technicians, setTechnicians] = useState([]);
    const [users, setUsers] = useState([]);
    const [editingAccountId, setEditingAccountId] = useState(null);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await axios.get("/admin/instrumentation-accounts");
            setTechnicians(response.data.accounts);
            setUsers(response.data.users);
        } catch (error) {
            console.error("Error fetching accounts:", error);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingAccountId(null);
        resetForm();
    };

    const resetForm = () => {
        setIdNumber("");
        setFirstName("");
        setLastName("");
        setAccountName("");
        setAccountEmail("");
        setAccountPassword("");
        setPasswordConfirmation("");
        setPhoneNumber("");
    };

    const handleSubmit = async (e, accountId = null) => {
        e.preventDefault();
        console.log("Form submitted"); // Add this line
        try {
            let response;
            if (accountId) {
                // Updating an existing account
                response = await axios.put(
                    `/admin/instrumentation-accounts/${accountId}`,
                    {
                        firstName: firstName,
                        lastName: lastName,
                        email: accountEmail,
                        employeeID: idNumber,
                        phoneNumber: phoneNumber,
                        // Only include password if it's been changed
                        ...(accountPassword && { password: accountPassword }),
                    }
                );
                console.log("Account updated:", response.data);

                // Update the local state immediately
                setTechnicians((prevAccounts) =>
                    prevAccounts.map((account) =>
                        account.id === accountId
                            ? {
                                  ...account,
                                  firstName: firstName,
                                  lastName: lastName,
                                  email: accountEmail,
                                  employeeID: idNumber,
                                  phoneNumber: phoneNumber,
                              }
                            : account
                    )
                );

                // Close the modal
                setEditingAccountId(null);
            } else {
                console.log("Creating new account"); // Add this line
                if (accountPassword !== passwordConfirmation) {
                    alert("Passwords do not match. Please try again.");
                    return;
                }
                response = await axios.post("/admin/instrumentation-accounts", {
                    firstName: firstName,
                    lastName: lastName,
                    email: accountEmail,
                    password: accountPassword,
                    password_confirmation: passwordConfirmation, // Add this line
                    employeeID: idNumber,
                    phoneNumber: phoneNumber,
                });
                console.log("Account created:", response.data);

                // Add the new account to the local state immediately
                setTechnicians((prevAccounts) => [
                    ...prevAccounts,
                    response.data,
                ]);

                // Close the modal
                closeModal();
            }

            // Reset form fields
            resetForm();

            // Force a re-render of the component
            setTechnicians((prevAccounts) => [...prevAccounts]);
        } catch (error) {
            console.error("Error submitting account:", error);
            // Add more detailed error logging
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Error data:", error.response.data);
                console.error("Error status:", error.response.status);
                console.error("Error headers:", error.response.headers);

                // Display validation errors to the user
                if (error.response.status === 422) {
                    const validationErrors = error.response.data.errors;
                    let errorMessage = "Validation errors:\n";
                    for (const field in validationErrors) {
                        errorMessage += `${field}: ${validationErrors[
                            field
                        ].join(", ")}\n`;
                    }
                    alert(errorMessage);
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error message:", error.message);
            }
            // TODO: Show error message to user
            alert(
                "An error occurred while submitting the form. Please check the console for more details."
            );
        }
    };

    return (
        <div className="">
            <div id="content" className="">
                <div>
                    <div>
                        <h1 className="d-inline">Account Handler | </h1>
                        <h1 className="d-inline fw-light">Modify Accounts</h1>
                        <hr />
                    </div>
                    <div className="mt-3">
                        <h3 className="mt-10 mb-3 fw-bold">
                            Instrumentation Accounts
                        </h3>
                        <div className="row forms-bg p-5 instrumentation-accounts">
                            <div className="col-12">
                                <div className="row justify-content-start flex-wrap">
                                    {technicians.map((account) => (
                                        <div
                                            key={account.id}
                                            className="col-6 col-sm-4 col-md-3 col-lg-2 account-wrapper mb-4"
                                        >
                                            <div className="rounded-circle bg-dark d-flex justify-content-center align-items-center account-icon mx-auto">
                                                <i className="bi bi-person-fill text-primary"></i>
                                            </div>
                                            <h5 className="account-name">
                                                {account.firstName}{" "}
                                                {account.lastName}
                                            </h5>
                                            <p className="account-email">
                                                {account.email}
                                            </p>
                                            <Link
                                                href={route("admin.edit.tech", {
                                                    id: account.id,
                                                })}
                                                className="btn btn-sm btn-primary mt-2"
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    ))}
                                    <div
                                        className="col-6 col-sm-4 col-md-3 col-lg-2 account-wrapper mb-4"
                                        onClick={openModal}
                                    >
                                        <div className="rounded-circle bg-dark d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-plus text-primary"></i>
                                        </div>
                                        <h5 className="account-name">
                                            Add Account
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className="mt-10 mb-3 fw-bold">Clients Accounts</h3>
                        <div className="row forms-bg p-5">
                            <div className="col-12">
                                <div className="row">
                                    {users.map((user) => (
                                        <div
                                            key={user.id}
                                            className="col-6 col-md-2 account-wrapper"
                                        >
                                            <div className="rounded-circle bg-dark d-flex justify-content-center align-items-center account-icon mx-auto">
                                                <i className="bi bi-person-fill text-primary"></i>
                                            </div>
                                            <h5 className="account-name">
                                                {user.name}
                                            </h5>
                                            <p className="account-email">
                                                {user.email}
                                            </p>
                                        </div>
                                    ))}
                                    {/* Add user account button */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div
                        className="modal-content"
                        style={{ maxWidth: "800px", width: "90%" }}
                    >
                        <h2>Create Instrumentation Account</h2>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="row forms-bg">
                                <div className="col-4 profile-bg d-flex flex-column align-items-center justify-content-center p-3 text-white">
                                    <div>
                                        <i className="bi bi-person-fill fs-1"></i>
                                    </div>
                                    <h5>
                                        {`${firstName} ${lastName}` ||
                                            "New Account"}
                                    </h5>
                                    <p>{accountEmail || "email@example.com"}</p>
                                </div>

                                <div className="col-8">
                                    <div className="pt-3 pb-3 p-3">
                                        <div className="row">
                                            <div className="col-6 mb-3">
                                                <label className="form-label fw-bold d-block text-truncate">
                                                    ID Number
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control rounded"
                                                    value={idNumber}
                                                    onChange={(e) =>
                                                        setIdNumber(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="col-6 mb-3">
                                                <label className="form-label fw-bold d-block text-truncate">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control rounded"
                                                    value={firstName}
                                                    onChange={(e) =>
                                                        setFirstName(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 mb-3">
                                                <label className="form-label fw-bold d-block text-truncate">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control rounded"
                                                    value={lastName}
                                                    onChange={(e) =>
                                                        setLastName(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="col-6 mb-3">
                                                <label className="form-label fw-bold d-block text-truncate">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control rounded"
                                                    value={accountEmail}
                                                    onChange={(e) =>
                                                        setAccountEmail(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 mb-3">
                                                <label className="form-label fw-bold d-block text-truncate">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control rounded"
                                                    value={accountPassword}
                                                    onChange={(e) =>
                                                        setAccountPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="col-6 mb-3">
                                                <label className="form-label fw-bold d-block text-truncate">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control rounded"
                                                    value={passwordConfirmation}
                                                    onChange={(e) =>
                                                        setPasswordConfirmation(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 mb-3">
                                                <label className="form-label fw-bold d-block text-truncate">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    className="form-control rounded"
                                                    value={phoneNumber}
                                                    onChange={(e) =>
                                                        setPhoneNumber(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-12">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary me-2"
                                                >
                                                    Create Account
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={closeModal}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

Home.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default Home;
