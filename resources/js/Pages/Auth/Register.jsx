import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextInput2 from "@/Components/TextInput2";
import LoginButton from "@/Components/LoginButton";
import PhoneNumberInput from "@/Components/PhoneNumberInput";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa"; // Import eye icons

import { Modal } from "react-bootstrap";

import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password_confirmation: "",
        employeeID: "",
        phoneNumber: "",
        college: "",
        labLoc: "",
        position: "",
    });

    const [switchForm, setSwitchForm] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showTerms, setShowTerms] = useState(false); // State to control the modal visibility
    const [acceptTerms, setAcceptTerms] = useState(false);

    const [validationErrors, setValidationErrors] = useState({
        employeeID: "",
        email: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        college: "",
        labLoc: "",
        position: "",
        password: "",
        password_confirmation: "",
    });

    const validateEmployeeID = (value) => {
        if (!value) {
            setValidationErrors((prev) => ({
                ...prev,
                employeeID: "Please enter an ID number.",
            }));
            return false;
        }
        if (value.length !== 10) {
            setValidationErrors((prev) => ({
                ...prev,
                employeeID: "ID Number must be 10 digits.",
            }));
            return false;
        }
        setValidationErrors((prev) => ({ ...prev, employeeID: "" }));
        return true;
    };

    const validateEmail = (value) => {
        if (!value) {
            setValidationErrors((prev) => ({
                ...prev,
                email: "Please enter an email address.",
            }));
            return false;
        }
        if (!value.endsWith("@ust.edu.ph")) {
            setValidationErrors((prev) => ({
                ...prev,
                email: "Email must be a valid UST email (@ust.edu.ph).",
            }));
            return false;
        }
        setValidationErrors((prev) => ({ ...prev, email: "" }));
        return true;
    };

    const validatePhoneNumber = (value) => {
        if (!value) {
            setValidationErrors((prev) => ({
                ...prev,
                phoneNumber: "Please enter a phone number.",
            }));
            return false;
        }
        if (value.length !== 11 || !value.startsWith("09")) {
            setValidationErrors((prev) => ({
                ...prev,
                phoneNumber: "Phone number must be 11 digits starting with 09.",
            }));
            return false;
        }
        setValidationErrors((prev) => ({ ...prev, phoneNumber: "" }));
        return true;
    };

    const validateFirstName = (value) => {
        if (!value) {
            setValidationErrors((prev) => ({
                ...prev,
                firstName: "Please enter your first name.",
            }));
            return false;
        }
        if (/\d/.test(value)) {
            setValidationErrors((prev) => ({
                ...prev,
                firstName: "First name cannot contain numbers.",
            }));
            return false;
        }
        setValidationErrors((prev) => ({ ...prev, firstName: "" }));
        return true;
    };

    const validateLastName = (value) => {
        if (!value) {
            setValidationErrors((prev) => ({
                ...prev,
                lastName: "Please enter your last name.",
            }));
            return false;
        }
        if (/\d/.test(value)) {
            setValidationErrors((prev) => ({
                ...prev,
                lastName: "Last name cannot contain numbers.",
            }));
            return false;
        }
        setValidationErrors((prev) => ({ ...prev, lastName: "" }));
        return true;
    };

    const validateCollege = (value) => {
        if (!value) {
            setValidationErrors((prev) => ({
                ...prev,
                college: "Please select your college.",
            }));
            return false;
        }
        setValidationErrors((prev) => ({ ...prev, college: "" }));
        return true;
    };

    const validateLabLoc = (value) => {
        if (!value) {
            setValidationErrors((prev) => ({
                ...prev,
                labLoc: "Please enter your lab location.",
            }));
            return false;
        }
        setValidationErrors((prev) => ({ ...prev, labLoc: "" }));
        return true;
    };

    const validatePosition = (value) => {
        if (!value) {
            setValidationErrors((prev) => ({
                ...prev,
                position: "Please enter your position.",
            }));
            return false;
        }
        setValidationErrors((prev) => ({ ...prev, position: "" }));
        return true;
    };

    const validatePassword = (value) => {
        if (!value) {
            setValidationErrors((prev) => ({
                ...prev,
                password: "Please enter a password.",
            }));
            return false;
        }
        if (value.length < 8) {
            setValidationErrors((prev) => ({
                ...prev,
                password: "Password must be at least 8 characters.",
            }));
            return false;
        }
        if (!/[A-Z]/.test(value)) {
            setValidationErrors((prev) => ({
                ...prev,
                password:
                    "Password must contain at least one uppercase letter.",
            }));
            return false;
        }
        if (!/[0-9]/.test(value)) {
            setValidationErrors((prev) => ({
                ...prev,
                password: "Password must contain at least one number.",
            }));
            return false;
        }
        if (!/[!@#$%^&*]/.test(value)) {
            setValidationErrors((prev) => ({
                ...prev,
                password:
                    "Password must contain at least one special character.",
            }));
            return false;
        }
        setValidationErrors((prev) => ({ ...prev, password: "" }));
        return true;
    };

    const validateConfirmPassword = (value) => {
        if (!value) {
            setValidationErrors((prev) => ({
                ...prev,
                password_confirmation: "Please confirm your password.",
            }));
            return false;
        }
        if (value !== data.password) {
            setValidationErrors((prev) => ({
                ...prev,
                password_confirmation: "Passwords do not match.",
            }));
            return false;
        }
        setValidationErrors((prev) => ({ ...prev, password_confirmation: "" }));
        return true;
    };

    const nextForm = () => {
        if (switchForm === 1) {
            // Validate all fields in first form
            const isFirstNameValid = validateFirstName(data.firstName);
            const isLastNameValid = validateLastName(data.lastName);
            const isEmailValid = validateEmail(data.email);
            const isPhoneValid = validatePhoneNumber(data.phoneNumber);

            // Only proceed if all validations pass
            if (
                isFirstNameValid &&
                isLastNameValid &&
                isEmailValid &&
                isPhoneValid
            ) {
                setSwitchForm(2);
            }
        } else if (switchForm === 2) {
            // Validate all fields in second form
            const isCollegeValid = validateCollege(data.college);
            const isLabLocValid = validateLabLoc(data.labLoc);
            const isPositionValid = validatePosition(data.position);

            // Only proceed if all validations pass
            if (isCollegeValid && isLabLocValid && isPositionValid) {
                setSwitchForm(3);
            }
        } else if (switchForm === 3) {
            // Validate all fields in third form
            const isIdValid = validateEmployeeID(data.employeeID);
            const isPasswordValid = validatePassword(data.password);
            const isConfirmPasswordValid = validateConfirmPassword(
                data.password_confirmation
            );

            // Only proceed if all validations pass
            if (isIdValid && isPasswordValid && isConfirmPasswordValid) {
                setSubmitted(true);
            }
        }
    };

    const previousForm = () => {
        setSwitchForm(switchForm - 1);
    };

    const submit = (e) => {
        e.preventDefault();
        if (!acceptTerms) {
            setSubmitted(true);
            return;
        }
        if (isSubmitting) return;
        setIsSubmitting(true);
        setSubmitted(true);

        post(route("register"), {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => {
                reset("password", "password_confirmation");
                setIsSubmitting(false);
            },
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            nextForm(); // This will now check all validations before proceeding
        }
    };

    useEffect(() => {
        // Reset isSubmitting when errors occur
        if (Object.keys(errors).length > 0) {
            setIsSubmitting(false);
        }

        // Check for specific error messages
        if (errors.email) {
            setValidationErrors((prev) => ({
                ...prev,
                email: errors.email,
            }));
        }
        if (errors.employeeID) {
            setValidationErrors((prev) => ({
                ...prev,
                employeeID: errors.employeeID,
            }));
        }
    }, [errors]);

    useEffect(() => {
        if (errors.email) {
            setValidationErrors((prev) => ({
                ...prev,
                email: errors.email,
            }));
        }
    }, [errors]);

    return (
        <div>
            <div className="split left">
                <div className="centered"></div>
                <div className="half login-imageHolder"></div>
            </div>

            <div className="split2 right2"></div>
            <div className="split3 right">
                <div className="centered2">
                    <div className="container p-5">
                        <form onSubmit={submit} onKeyDown={handleKeyDown}>
                            <h1 className="text-center titleLogin mb-3">
                                Register
                            </h1>

                            {switchForm === 1 && (
                                <div>
                                    <div>
                                        <InputLabel
                                            htmlFor="firstName"
                                            value="First Name"
                                        />
                                        <TextInput2
                                            id="firstName"
                                            name="firstName"
                                            value={data.firstName}
                                            className={`mt-1 block w-full ${
                                                validationErrors.firstName
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            autoComplete="firstName"
                                            isFocused={true}
                                            onChange={(e) => {
                                                const value =
                                                    e.target.value.replace(
                                                        /[0-9]/g,
                                                        ""
                                                    ); // Remove numbers
                                                setData("firstName", value);
                                                validateFirstName(value);
                                            }}
                                            required
                                        />
                                        <InputError
                                            message={errors.firstName}
                                            className="mt-2 text-danger"
                                        />
                                        {validationErrors.firstName && (
                                            <div className="invalid-feedback d-block">
                                                <i className="fas fa-exclamation-circle me-1"></i>
                                                {validationErrors.firstName}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="lastName"
                                            value="Last Name"
                                        />
                                        <TextInput2
                                            id="lastName"
                                            name="lastName"
                                            value={data.lastName}
                                            className={`mt-1 block w-full ${
                                                validationErrors.lastName
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            onChange={(e) => {
                                                const value =
                                                    e.target.value.replace(
                                                        /[0-9]/g,
                                                        ""
                                                    ); // Remove numbers
                                                setData("lastName", value);
                                                validateLastName(value);
                                            }}
                                            required
                                        />
                                        <InputError
                                            message={errors.lastName}
                                            className="mt-2 text-danger"
                                        />
                                        {validationErrors.lastName && (
                                            <div className="invalid-feedback d-block">
                                                <i className="fas fa-exclamation-circle me-1"></i>
                                                {validationErrors.lastName}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />
                                        <TextInput2
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className={`mt-1 block w-full ${
                                                validationErrors.email
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            autoComplete="username"
                                            onChange={(e) => {
                                                setData(
                                                    "email",
                                                    e.target.value
                                                );
                                                validateEmail(e.target.value);
                                            }}
                                            required
                                        />
                                        <InputError
                                            message={errors.email}
                                            className="mt-2 text-danger"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <div className="d-flex align-items-center">
                                            <InputLabel
                                                htmlFor="phoneNumber"
                                                value="Phone Number"
                                            />
                                            <div
                                                className="ms-2 tooltip-container"
                                                style={{ position: "relative" }}
                                            >
                                                <FaInfoCircle
                                                    className="text-primary"
                                                    style={{ cursor: "help" }}
                                                />
                                                <span className="custom-tooltip">
                                                    Please enter 11 digits
                                                    starting with 09 (Format:
                                                    09XXXXXXXXX)
                                                </span>
                                            </div>
                                        </div>
                                        <TextInput2
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="tel"
                                            value={data.phoneNumber}
                                            className={`mt-1 block w-full ${
                                                validationErrors.phoneNumber
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            onChange={(e) => {
                                                const filteredValue =
                                                    e.target.value.replace(
                                                        /[^0-9]/g,
                                                        ""
                                                    );
                                                setData(
                                                    "phoneNumber",
                                                    filteredValue
                                                );
                                                validatePhoneNumber(
                                                    filteredValue
                                                );
                                            }}
                                            required
                                            maxLength="11"
                                            placeholder="09XXXXXXXXX"
                                        />
                                        <InputError
                                            message={errors.phoneNumber}
                                            className="mt-2 text-danger"
                                        />
                                        {validationErrors.phoneNumber && (
                                            <div className="invalid-feedback d-block">
                                                <i className="fas fa-exclamation-circle me-1"></i>
                                                {validationErrors.phoneNumber}
                                            </div>
                                        )}
                                    </div>

                                    <div className="d-flex justify-content-end my-5 ">
                                        <Link
                                            className="ust-button-primary buttonColor1 ust-button-margin"
                                            href={route("loginHome")}
                                        >
                                            Back
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={nextForm}
                                            className="ust-button-primary buttonColor2 ust-button-margin"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}

                            {switchForm === 2 && (
                                <div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="college"
                                            value="College"
                                        />
                                        <select
                                            id="college"
                                            name="college"
                                            value={data.college}
                                            className={`optionBox w-100 ${
                                                validationErrors.college
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            onChange={(e) => {
                                                setData(
                                                    "college",
                                                    e.target.value
                                                );
                                                validateCollege(e.target.value);
                                            }}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select your department/faculty
                                            </option>
                                            <option value="Engineering">
                                                {" "}
                                                Faculty of Engineering{" "}
                                            </option>
                                            <option value="Education">
                                                {" "}
                                                College of Education{" "}
                                            </option>
                                            <option value="Pharmacy">
                                                {" "}
                                                Faculty of Pharmacy{" "}
                                            </option>
                                            <option value="Biochemistry">
                                                {" "}
                                                Faculty of Biochemistry{" "}
                                            </option>
                                            <option value="Medicine Technology">
                                                {" "}
                                                Faculty of Medicine Technology{" "}
                                            </option>
                                            <option value="Nursing">
                                                {" "}
                                                College of Nursing{" "}
                                            </option>
                                            <option value="Rehabilitation Science">
                                                {" "}
                                                College of Rehabilitation
                                                Science{" "}
                                            </option>
                                            <option value="Biology">
                                                {" "}
                                                College of Biology{" "}
                                            </option>
                                            <option value="Physics">
                                                {" "}
                                                College of Physics{" "}
                                            </option>
                                            <option value="Physiology">
                                                {" "}
                                                Faculty of Physiology{" "}
                                            </option>
                                            <option value="Pharmacology">
                                                {" "}
                                                Faculty of Pharmacology{" "}
                                            </option>
                                            <option value="Graduate School">
                                                {" "}
                                                UST Graduate School{" "}
                                            </option>
                                            <option value="Junior HS">
                                                {" "}
                                                Junior High School{" "}
                                            </option>
                                            <option value="Senior HS">
                                                {" "}
                                                Senior High School{" "}
                                            </option>
                                            <option value="RCNAS">
                                                {" "}
                                                RCNAS{" "}
                                            </option>
                                            <option value="LESO"> LESO </option>
                                            <option value="Others">
                                                {" "}
                                                Others{" "}
                                            </option>
                                        </select>
                                        <InputError
                                            message={errors.college}
                                            className="mt-2 text-danger"
                                        />
                                        {validationErrors.college && (
                                            <div className="invalid-feedback d-block">
                                                <i className="fas fa-exclamation-circle me-1"></i>
                                                {validationErrors.college}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="labLoc"
                                            value="Lab Location"
                                        />
                                        <TextInput2
                                            id="labLoc"
                                            name="labLoc"
                                            value={data.labLoc}
                                            className={`mt-1 block w-full ${
                                                validationErrors.labLoc
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            autoComplete="labLoc"
                                            isFocused={true}
                                            onChange={(e) => {
                                                setData(
                                                    "labLoc",
                                                    e.target.value
                                                );
                                                validateLabLoc(e.target.value);
                                            }}
                                            required
                                        />
                                        <InputError
                                            message={errors.labLoc}
                                            className="mt-2 text-danger"
                                        />
                                        {validationErrors.labLoc && (
                                            <div className="invalid-feedback d-block">
                                                <i className="fas fa-exclamation-circle me-1"></i>
                                                {validationErrors.labLoc}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="position"
                                            value="Position"
                                        />
                                        <TextInput2
                                            id="position"
                                            name="position"
                                            value={data.position}
                                            className={`mt-1 block w-full ${
                                                validationErrors.position
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            autoComplete="labLoc"
                                            isFocused={true}
                                            onChange={(e) => {
                                                setData(
                                                    "position",
                                                    e.target.value
                                                );
                                                validatePosition(
                                                    e.target.value
                                                );
                                            }}
                                            placeholder="Lab Technician"
                                            required
                                        />
                                        <InputError
                                            message={errors.position}
                                            className="mt-2 text-danger"
                                        />
                                        {validationErrors.position && (
                                            <div className="invalid-feedback d-block">
                                                <i className="fas fa-exclamation-circle me-1"></i>
                                                {validationErrors.position}
                                            </div>
                                        )}
                                    </div>

                                    <div className="d-flex justify-content-end my-5 ">
                                        <button
                                            type="button"
                                            onClick={previousForm}
                                            className="ust-button-primary buttonColor1 ust-button-margin"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="button"
                                            onClick={nextForm}
                                            className="ust-button-primary buttonColor2 ust-button-margin"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}

                            {switchForm === 3 && (
                                <div>
                                    <div className="mt-4">
                                        <div className="d-flex align-items-center">
                                            <InputLabel
                                                htmlFor="employeeID"
                                                value="ID Number"
                                            />
                                            <div
                                                className="ms-2 tooltip-container"
                                                style={{ position: "relative" }}
                                            >
                                                <FaInfoCircle
                                                    className="text-primary"
                                                    style={{ cursor: "help" }}
                                                />
                                                <span className="custom-tooltip">
                                                    Please enter 10 digits
                                                </span>
                                            </div>
                                        </div>
                                        <TextInput2
                                            id="employeeID"
                                            name="employeeID"
                                            value={data.employeeID}
                                            className={`mt-1 block w-full ${
                                                validationErrors.employeeID
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            onChange={(e) => {
                                                const filteredValue =
                                                    e.target.value.replace(
                                                        /[^0-9]/g,
                                                        ""
                                                    );
                                                setData(
                                                    "employeeID",
                                                    filteredValue
                                                );
                                                validateEmployeeID(
                                                    filteredValue
                                                );
                                            }}
                                            required
                                        />
                                        <InputError
                                            message={errors.employeeID}
                                            className="mt-2 text-danger"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <div className="d-flex align-items-center">
                                            <InputLabel
                                                htmlFor="password"
                                                value="Password"
                                            />
                                            <div
                                                className="ms-2 tooltip-container"
                                                style={{ position: "relative" }}
                                            >
                                                <FaInfoCircle
                                                    className="text-primary"
                                                    style={{ cursor: "help" }}
                                                />
                                                <span className="custom-tooltip">
                                                    Minimum 8 Characters with 1
                                                    uppercase letter, 1 number
                                                    and 1 special character
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="password-input-wrapper"
                                            style={{ position: "relative" }}
                                        >
                                            <TextInput2
                                                id="password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                name="password"
                                                value={data.password}
                                                className={`mt-1 block w-full ${
                                                    validationErrors.password
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                autoComplete="new-password"
                                                onChange={(e) => {
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    );
                                                    validatePassword(
                                                        e.target.value
                                                    );
                                                }}
                                                onPaste={(e) => {
                                                    e.preventDefault();
                                                    return false;
                                                }}
                                                onCopy={(e) => {
                                                    e.preventDefault();
                                                    return false;
                                                }}
                                                required
                                            />
                                            <span
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                style={{
                                                    position: "absolute",
                                                    right: "10px",
                                                    top: "50%",
                                                    transform:
                                                        "translateY(-50%)",
                                                    cursor: "pointer",
                                                    fontSize: "1.5em",
                                                }}
                                            >
                                                {showPassword ? (
                                                    <FaEyeSlash />
                                                ) : (
                                                    <FaEye />
                                                )}
                                            </span>
                                        </div>
                                        <InputError
                                            message={errors.password}
                                            className="mt-2 text-danger"
                                        />
                                        {validationErrors.password && (
                                            <div className="invalid-feedback d-block">
                                                <i className="fas fa-exclamation-circle me-1"></i>
                                                {validationErrors.password}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="password_confirmation"
                                            value="Confirm Password"
                                        />
                                        <div
                                            className="password-input-wrapper"
                                            style={{ position: "relative" }}
                                        >
                                            <TextInput2
                                                id="password_confirmation"
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                name="password_confirmation"
                                                value={
                                                    data.password_confirmation
                                                }
                                                className={`mt-1 block w-full ${
                                                    validationErrors.password_confirmation
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                autoComplete="new-password"
                                                onChange={(e) => {
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    );
                                                    validateConfirmPassword(
                                                        e.target.value
                                                    );
                                                }}
                                                onPaste={(e) => {
                                                    e.preventDefault();
                                                    return false;
                                                }}
                                                onCopy={(e) => {
                                                    e.preventDefault();
                                                    return false;
                                                }}
                                                required
                                            />
                                            <span
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                                style={{
                                                    position: "absolute",
                                                    right: "10px",
                                                    top: "50%",
                                                    transform:
                                                        "translateY(-50%)",
                                                    cursor: "pointer",
                                                    fontSize: "1.5em",
                                                }}
                                            >
                                                {showConfirmPassword ? (
                                                    <FaEyeSlash />
                                                ) : (
                                                    <FaEye />
                                                )}
                                            </span>
                                        </div>
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                            className="mt-2 text-danger"
                                        />
                                        {validationErrors.password_confirmation && (
                                            <div className="invalid-feedback d-block">
                                                <i className="fas fa-exclamation-circle me-1"></i>
                                                {
                                                    validationErrors.password_confirmation
                                                }
                                            </div>
                                        )}
                                    </div>

                                    {submitted &&
                                        Object.keys(errors).length > 0 && (
                                            <div className="mt-4">
                                                <InputError
                                                    message="Some input fields are incorrect, kindly check the current or previous pages."
                                                    className="text-danger"
                                                />
                                            </div>
                                        )}

                                    {/* Terms and Conditions Checkbox */}
                                    <div className="mt-4">
                                        <div className="d-flex align-items-center position-relative">
                                            <input
                                                type="checkbox"
                                                id="acceptTerms"
                                                checked={acceptTerms}
                                                onChange={(e) =>
                                                    setAcceptTerms(
                                                        e.target.checked
                                                    )
                                                }
                                                className={`me-2 ${
                                                    submitted && !acceptTerms
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                required
                                            />
                                            <label
                                                htmlFor="acceptTerms"
                                                className="mb-0"
                                            >
                                                I accept and agree to the{" "}
                                                <a
                                                    className="text-link"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setShowTerms(true);
                                                    }}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    Terms and Conditions
                                                </a>
                                            </label>
                                        </div>
                                        {submitted && !acceptTerms && (
                                            <div className="mt-2 text-danger small">
                                                <i className="fas fa-exclamation-circle me-1"></i>
                                                Please accept the Terms and
                                                Conditions to proceed
                                            </div>
                                        )}
                                    </div>

                                    {/* Terms and Conditions Modal */}
                                    <Modal
                                        show={showTerms}
                                        onHide={() => setShowTerms(false)}
                                        aria-labelledby="terms-modal-title"
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title
                                                id="terms-modal-title"
                                                className="fs-5 fw-bold"
                                            >
                                                Terms and Conditions
                                            </Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body className="custom-modal-body">
                                            <div className="terms-section px-2">
                                                <h6 className="fw-bold mb-3">
                                                    Terms and Conditions
                                                </h6>
                                                <p className="mb-4">
                                                    These Terms and Conditions
                                                    ("Terms") govern your use of
                                                    the Leso ISC website (the
                                                    "Site") and the services we
                                                    provide through the Site,
                                                    including the repair and
                                                    recalibration of lab
                                                    apparatus. By accessing or
                                                    using the Site, you agree to
                                                    comply with and be bound by
                                                    these Terms. If you do not
                                                    agree to these Terms, do not
                                                    use the Site.
                                                </p>
                                                <h6 className="fw-bold mb-3">
                                                    1. Service Agreement
                                                </h6>
                                                <p className="mb-4">
                                                    Leso ISC offers repair and
                                                    recalibration services for
                                                    lab apparatus (the
                                                    "Services"). By submitting a
                                                    repair order through the
                                                    Site, you agree to engage
                                                    Leso ISC for these services
                                                    and authorize us to proceed
                                                    with the repair or
                                                    recalibration as specified
                                                    in your order.
                                                </p>
                                                <h6 className="fw-bold mb-3">
                                                    2. Repair Orders
                                                </h6>
                                                <p className="mb-4">
                                                    Orders submitted through the
                                                    Site are considered requests
                                                    for repair or recalibration
                                                    services. By submitting an
                                                    order, you are confirming
                                                    that the apparatus being
                                                    sent is intended for service
                                                    at Leso ISC. Leso ISC
                                                    reserves the right to refuse
                                                    service if the item is
                                                    deemed unsuitable for
                                                    repair.
                                                </p>
                                                <h6 className="fw-bold mb-3">
                                                    3. Order Confirmation and
                                                    Cancellation
                                                </h6>
                                                <p className="mb-4">
                                                    Once an order is submitted,
                                                    you will receive an email
                                                    confirmation detailing the
                                                    repair or recalibration
                                                    request. Orders can be
                                                    canceled prior to the
                                                    initiation of services.
                                                    After services have
                                                    commenced, cancellations
                                                    will not be accepted.
                                                </p>
                                                <h6 className="fw-bold mb-3">
                                                    4. Shipping and Delivery
                                                </h6>
                                                <p className="mb-4">
                                                    Customers are responsible
                                                    for shipping the apparatus
                                                    to Leso ISC for repairs.
                                                    Leso ISC will return the
                                                    apparatus to the customer
                                                    once the repair or
                                                    recalibration is completed.
                                                    The customer is responsible
                                                    for any shipping costs
                                                    associated with sending the
                                                    apparatus to Leso ISC and
                                                    receiving it back.
                                                </p>
                                                <h6 className="fw-bold mb-3">
                                                    5. Customer Responsibilities
                                                </h6>
                                                <p className="mb-4">
                                                    You are responsible for
                                                    providing accurate and
                                                    complete information about
                                                    the apparatus being sent for
                                                    repair. Leso ISC is not
                                                    responsible for any damage
                                                    or loss resulting from
                                                    inaccurate or incomplete
                                                    information provided by the
                                                    customer.
                                                </p>
                                                <h6 className="fw-bold mb-3">
                                                    6. Privacy Policy
                                                </h6>
                                                <p className="mb-4">
                                                    Your use of the Site is also
                                                    governed by our Privacy
                                                    Policy, which outlines how
                                                    we collect, use, and protect
                                                    your personal information.
                                                    Please review the Privacy
                                                    Policy before using the
                                                    Site.
                                                </p>
                                                <h6 className="fw-bold mb-3">
                                                    7. Modification of Terms
                                                </h6>
                                                <p className="mb-4">
                                                    Leso ISC reserves the right
                                                    to modify these Terms at any
                                                    time. Changes will be posted
                                                    on this page, and the "Last
                                                    updated" date will be
                                                    revised accordingly.
                                                    Continued use of the Site
                                                    following any changes to
                                                    these Terms constitutes your
                                                    acceptance of those changes.
                                                </p>
                                                <h6 className="fw-bold mb-3">
                                                    8. Contact Us
                                                </h6>
                                                <p className="mb-4">
                                                    For any questions regarding
                                                    these Terms and Conditions,
                                                    please contact us at:
                                                </p>
                                                <p className="mb-4">
                                                    Leso ISC
                                                    <br />
                                                    leso@ust.edu.ph
                                                    <br />
                                                    +63-2-8712-6349
                                                    <br />
                                                    8/F Central Laboratory
                                                    Building,
                                                    <br />
                                                    University of Santo Tomas,
                                                    <br />
                                                    España Boulevard, Sampaloc,
                                                    <br />
                                                    Manila 1015, Philippines
                                                    <br />
                                                    Office Hours: 7:00am to
                                                    5:00pm
                                                </p>
                                            </div>
                                        </Modal.Body>

                                        <Modal.Footer className="border-top">
                                            <button
                                                type="button"
                                                className="btn btn-light px-4"
                                                onClick={() =>
                                                    setShowTerms(false)
                                                }
                                            >
                                                Close
                                            </button>
                                        </Modal.Footer>
                                    </Modal>
                                    <div className="d-flex justify-content-center mt-5 ">
                                        <button
                                            className="ust-register-button buttonColor1 w-100"
                                            onClick={() => previousForm()}
                                        >
                                            Back
                                        </button>
                                    </div>

                                    <div className="d-flex justify-content-center my-4 ">
                                        <button
                                            type="submit"
                                            className="ust-register-button buttonColor2 w-100"
                                            disabled={
                                                processing || isSubmitting
                                            }
                                        >
                                            {isSubmitting
                                                ? "Registering..."
                                                : "Register"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
