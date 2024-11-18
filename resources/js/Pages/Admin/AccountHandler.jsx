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
    const [error, setError] = useState(null);
    const [idNumberError, setIdNumberError] = useState(null);
    const [phoneNumberError, setPhoneNumberError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [firstNameError, setFirstNameError] = useState(null);
    const [lastNameError, setLastNameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);

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
        setError(null);
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

        // Validate all fields
        const isIdValid = validateIdNumber(idNumber);
        const isPhoneValid = validatePhoneNumber(phoneNumber);
        const isEmailValid = validateEmail(accountEmail);
        const isFirstNameValid = validateFirstName(firstName);
        const isLastNameValid = validateLastName(lastName);
        const isPasswordValid = validatePassword(accountPassword);
        const isConfirmPasswordValid =
            validateConfirmPassword(passwordConfirmation);

        // If any validation fails, stop form submission
        if (
            !isIdValid ||
            !isPhoneValid ||
            !isEmailValid ||
            !isFirstNameValid ||
            !isLastNameValid ||
            !isPasswordValid ||
            !isConfirmPasswordValid
        ) {
            return;
        }

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

    const validateIdNumber = (value) => {
        if (value.length !== 10) {
            setIdNumberError("ID Number must be exactly 10 digits");
            return false;
        }
        setIdNumberError(null);
        return true;
    };

    const validatePhoneNumber = (value) => {
        if (!value.startsWith("09") || value.length !== 11) {
            setPhoneNumberError(
                "Phone Number must start with '09' and be exactly 11 digits"
            );
            return false;
        }
        setPhoneNumberError(null);
        return true;
    };

    const validateEmail = (value) => {
        if (!value.endsWith("@ust.edu.ph")) {
            setEmailError("Email must be a UST email address (@ust.edu.ph)");
            return false;
        }
        setEmailError(null);
        return true;
    };

    const validateFirstName = (value) => {
        if (!value) {
            setFirstNameError("First Name is required");
            return false;
        }
        if (!/^[A-Za-z\s]+$/.test(value)) {
            setFirstNameError("First Name should only contain letters");
            return false;
        }
        setFirstNameError(null);
        return true;
    };

    const validateLastName = (value) => {
        if (!value) {
            setLastNameError("Last Name is required");
            return false;
        }
        if (!/^[A-Za-z\s]+$/.test(value)) {
            setLastNameError("Last Name should only contain letters");
            return false;
        }
        setLastNameError(null);
        return true;
    };

    const validatePassword = (value) => {
        if (!value) {
            setPasswordError("Password is required");
            return false;
        }
        if (value.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return false;
        }
        if (!/\d/.test(value)) {
            setPasswordError("Password must contain at least one number");
            return false;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            setPasswordError(
                "Password must contain at least one special character"
            );
            return false;
        }
        setPasswordError(null);
        return true;
    };

    const validateConfirmPassword = (value) => {
        if (!value) {
            setConfirmPasswordError("Please confirm your password");
            return false;
        }
        if (value !== accountPassword) {
            setConfirmPasswordError("Passwords do not match");
            return false;
        }
        setConfirmPasswordError(null);
        return true;
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
                                                    className={`form-control rounded ${
                                                        idNumberError
                                                            ? "border-danger"
                                                            : ""
                                                    }`}
                                                    value={idNumber}
                                                    onChange={(e) => {
                                                        const value =
                                                            e.target.value
                                                                .replace(
                                                                    /\D/g,
                                                                    ""
                                                                )
                                                                .slice(0, 10);
                                                        setIdNumber(value);
                                                        validateIdNumber(value);
                                                    }}
                                                    placeholder="2020123456"
                                                    required
                                                />
                                                {idNumberError && (
                                                    <div className="alert-ah">
                                                        <div className="alert-ah__title">
                                                            Invalid Input
                                                        </div>
                                                        <div className="alert-ah__message">
                                                            {idNumberError}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-6 mb-3">
                                                <label className="form-label fw-bold d-block text-truncate">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control rounded ${
                                                        firstNameError
                                                            ? "border-danger"
                                                            : ""
                                                    }`}
                                                    value={firstName}
                                                    onChange={(e) => {
                                                        const value =
                                                            e.target.value.replace(
                                                                /[^A-Za-z\s]/g,
                                                                ""
                                                            ); // Only allow letters and spaces
                                                        setFirstName(value);
                                                        validateFirstName(
                                                            value
                                                        );
                                                    }}
                                                    placeholder="Juan"
                                                    required
                                                />
                                                {firstNameError && (
                                                    <div className="alert-ah">
                                                        <div className="alert-ah__title">
                                                            Invalid Input
                                                        </div>
                                                        <div className="alert-ah__message">
                                                            {firstNameError}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 mb-3">
                                                <label className="form-label fw-bold d-block text-truncate">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control rounded ${
                                                        lastNameError
                                                            ? "border-danger"
                                                            : ""
                                                    }`}
                                                    value={lastName}
                                                    onChange={(e) => {
                                                        const value =
                                                            e.target.value.replace(
                                                                /[^A-Za-z\s]/g,
                                                                ""
                                                            ); // Only allow letters and spaces
                                                        setLastName(value);
                                                        validateLastName(value);
                                                    }}
                                                    placeholder="Dela Cruz"
                                                    required
                                                />
                                                {lastNameError && (
                                                    <div className="alert-ah">
                                                        <div className="alert-ah__title">
                                                            Invalid Input
                                                        </div>
                                                        <div className="alert-ah__message">
                                                            {lastNameError}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-6 mb-3">
                                                <label className="form-label fw-bold d-block text-truncate">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className={`form-control rounded ${
                                                        emailError
                                                            ? "border-danger"
                                                            : ""
                                                    }`}
                                                    value={accountEmail}
                                                    onChange={(e) => {
                                                        const value =
                                                            e.target.value;
                                                        setAccountEmail(value);
                                                        validateEmail(value);
                                                    }}
                                                    placeholder="juan.delacruz@ust.edu.ph"
                                                    required
                                                />
                                                {emailError && (
                                                    <div className="alert-ah">
                                                        <div className="alert-ah__title">
                                                            Invalid Input
                                                        </div>
                                                        <div className="alert-ah__message">
                                                            {emailError}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 mb-3">
                                                <label className="form-label fw-bold d-block text-truncate">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className={`form-control rounded ${
                                                        passwordError
                                                            ? "border-danger"
                                                            : ""
                                                    }`}
                                                    value={accountPassword}
                                                    onChange={(e) => {
                                                        const value =
                                                            e.target.value;
                                                        setAccountPassword(
                                                            value
                                                        );
                                                        validatePassword(value);
                                                    }}
                                                    required
                                                />
                                                {passwordError && (
                                                    <div className="alert-ah">
                                                        <div className="alert-ah__title">
                                                            Invalid Input
                                                        </div>
                                                        <div className="alert-ah__message">
                                                            {passwordError}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-6 mb-3">
                                                <label className="form-label fw-bold d-block text-truncate">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className={`form-control rounded ${
                                                        confirmPasswordError
                                                            ? "border-danger"
                                                            : ""
                                                    }`}
                                                    value={passwordConfirmation}
                                                    onChange={(e) => {
                                                        const value =
                                                            e.target.value;
                                                        setPasswordConfirmation(
                                                            value
                                                        );
                                                        validateConfirmPassword(
                                                            value
                                                        );
                                                    }}
                                                    required
                                                />
                                                {confirmPasswordError && (
                                                    <div className="alert-ah">
                                                        <div className="alert-ah__title">
                                                            Invalid Input
                                                        </div>
                                                        <div className="alert-ah__message">
                                                            {
                                                                confirmPasswordError
                                                            }
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 mb-3">
                                                <label className="form-label fw-bold d-block text-truncate">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    className={`form-control rounded ${
                                                        phoneNumberError
                                                            ? "border-danger"
                                                            : ""
                                                    }`}
                                                    value={phoneNumber}
                                                    onChange={(e) => {
                                                        const value =
                                                            e.target.value
                                                                .replace(
                                                                    /\D/g,
                                                                    ""
                                                                )
                                                                .slice(0, 11);
                                                        setPhoneNumber(value);
                                                        validatePhoneNumber(
                                                            value
                                                        );
                                                    }}
                                                    placeholder="09123456789"
                                                    required
                                                />
                                                {phoneNumberError && (
                                                    <div className="alert-ah">
                                                        <div className="alert-ah__title">
                                                            Invalid Input
                                                        </div>
                                                        <div className="alert-ah__message">
                                                            {phoneNumberError}
                                                        </div>
                                                    </div>
                                                )}
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

            {error && (
                <div
                    className="alert-ah d-flex flex-column align-items-start p-3 mb-3"
                    role="alert"
                >
                    <div className="alert-ah__title">{error.title}</div>
                    <div className="alert-ah__message">{error.message}</div>
                </div>
            )}
        </div>
    );
}

Home.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default Home;
