import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextInput2 from "@/Components/TextInput2";
import LoginButton from "@/Components/LoginButton";
import PhoneNumberInput from "@/Components/PhoneNumberInput";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import Modal from "@/Components/Modal"; // Import your modal component

import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

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
    });

    const [switchForm, setSwitchForm] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showTerms, setShowTerms] = useState(false); // State to control the modal visibility

    const nextForm = () => {
        if (switchForm === 3) {
            // Show errors if any fields are invalid
            setSubmitted(true);
        }
        setSwitchForm(switchForm + 1);
    };

    const previousForm = () => {
        setSwitchForm(switchForm - 1);
    };

    const submit = (e) => {
        e.preventDefault();
        if (isSubmitting) return; // Prevent double submission
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

    useEffect(() => {
        // Reset isSubmitting when errors occur
        if (Object.keys(errors).length > 0) {
            setIsSubmitting(false);
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
                    <form onSubmit={submit}>
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
                                        className="mt-1 block w-full"
                                        autoComplete="firstName"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("firstName", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.firstName}
                                        className="mt-2 text-danger"
                                    />
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
                                        className="mt-1 block w-full"
                                        autoComplete="lastName"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("lastName", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.lastName}
                                        className="mt-2 text-danger"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput2
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2 text-danger"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="phoneNumber"
                                        value="Phone Number"
                                    />
                                    <PhoneNumberInput
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="tel"
                                        value={data.phoneNumber}
                                        autoComplete="tel"
                                        isFocused={true}
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
                                        }}
                                        required
                                        pattern="[0-9]{10}"
                                    />
                                    <InputError
                                        message={errors.phoneNumber}
                                        className="mt-2 text-danger"
                                    />
                                </div>

                                <div className="d-flex justify-content-end my-5 ">
                                    <Link
                                        className="theButton2 buttonColor1 theButtonMG"
                                        href={route("loginHome")}
                                    >
                                        Back
                                    </Link>
                                    <button
                                        onClick={() => nextForm()}
                                        className="theButton2 buttonColor2 theButtonMG"
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
                                        className="optionBox w-100"
                                        onChange={(e) =>
                                            setData("college", e.target.value)
                                        }
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
                                            College of Rehabilitation Science{" "}
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
                                        <option value="RCNAS"> RCNAS </option>
                                        <option value="LESO"> LESO </option>
                                    </select>
                                    <InputError
                                        message={errors.college}
                                        className="mt-2 text-danger"
                                    />
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
                                        className="mt-1 block w-full"
                                        autoComplete="labLoc"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("labLoc", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.labLoc}
                                        className="mt-2 text-danger"
                                    />
                                </div>

                                <div className="d-flex justify-content-end my-5 ">
                                    <button
                                        className="theButton2 buttonColor1 "
                                        onClick={() => previousForm()}
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={() => nextForm()}
                                        className="theButton2 buttonColor2 theButtonMG"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {switchForm === 3 && (
                            <div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="employeeID"
                                        value="ID Number"
                                    />
                                    <TextInput2
                                        id="employeeID"
                                        name="employeeID"
                                        value={data.employeeID}
                                        className="mt-1 block w-full"
                                        autoComplete="employeeID"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData(
                                                "employeeID",
                                                e.target.value
                                            )
                                        }
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
                                        <small className="mb-0 ml-2 mx-2 text-danger">
                                            {" "}
                                            (1 uppercase letter, 1 number, and 1
                                            special character required.)
                                        </small>
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
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <span
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            style={{
                                                position: "absolute",
                                                right: "10px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
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
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
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
                                                transform: "translateY(-50%)",
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
                                        message={errors.password_confirmation}
                                        className="mt-2 text-danger"
                                    />
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
                                {/* Terms and Conditions Link */}
                                <div className="text-center mt-3">
                                    <button
                                        className="text-link"
                                        onClick={() => setShowTerms(true)}
                                    >
                                        Terms and Conditions
                                    </button>
                                </div>
                                {/* Terms and Conditions Modal */}
                                {showTerms && (
                                    <div
                                        className="modal-backdrop"
                                        style={{
                                            position: "fixed",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.5)", // Black opacity
                                            zIndex: 1040, // Ensure it's above other content
                                        }}
                                        onClick={() => setShowTerms(false)} // Close modal on backdrop click
                                    />
                                )}
                                <Modal
                                    show={showTerms}
                                    onClose={() => setShowTerms(false)}
                                    className="modal fade show"
                                    style={{
                                        display: showTerms ? "block" : "none",
                                        zIndex: 1050, // Ensure modal is above backdrop
                                    }}
                                >
                                    <div className="modal-dialog modal-dialog-centered modal-lg">
                                        {" "}
                                        {/* Centered modal */}
                                        <div className="modal-content ">
                                            <div className="modal-header">
                                                <h5 className="modal-title">
                                                    Terms and Conditions
                                                </h5>
                                            </div>
                                            <div className="modal-body">
                                                <h6>1. Introduction</h6>
                                                <p>
                                                    Welcome to the LESO
                                                    Ticketing System (hereafter
                                                    referred to as "the
                                                    System"). By accessing or
                                                    using the System to request
                                                    repair services, you agree
                                                    to comply with and be bound
                                                    by these Terms and
                                                    Conditions. Please read them
                                                    carefully before submitting
                                                    any repair requests. If you
                                                    do not agree to these terms,
                                                    you must refrain from using
                                                    the System.
                                                </p>

                                                <h6>2. Eligibility</h6>
                                                <p>
                                                    To submit a repair request
                                                    through the LESO Ticketing
                                                    System, you must be an
                                                    authorized user, typically
                                                    representing a department,
                                                    agency, or entity with the
                                                    appropriate clearance. The
                                                    System is intended for the
                                                    repair and maintenance of
                                                    equipment and assets under
                                                    the purview of LESO.
                                                </p>

                                                <h6>
                                                    3. Repair Request Submission
                                                </h6>
                                                <p>
                                                    <strong>
                                                        Request Details:
                                                    </strong>{" "}
                                                    All repair requests must
                                                    include accurate information
                                                    regarding the equipment or
                                                    asset needing repair,
                                                    including but not limited
                                                    to: item description, serial
                                                    number, malfunction details,
                                                    and any prior maintenance
                                                    history.
                                                </p>
                                                <p>
                                                    <strong>
                                                        Request Confirmation:
                                                    </strong>{" "}
                                                    Upon submitting a request,
                                                    you will receive an
                                                    acknowledgment receipt. This
                                                    confirmation does not imply
                                                    approval or completion of
                                                    the request.
                                                </p>
                                                <p>
                                                    <strong>
                                                        Approval Process:
                                                    </strong>{" "}
                                                    Repair requests are subject
                                                    to approval based on
                                                    priority, available
                                                    resources, and the nature of
                                                    the issue. LESO reserves the
                                                    right to prioritize requests
                                                    as deemed necessary.
                                                </p>

                                                <h6>4. Service Scope</h6>
                                                <p>
                                                    <strong>
                                                        Covered Repairs:
                                                    </strong>{" "}
                                                    The System is intended to
                                                    manage repairs related to
                                                    equipment or assets under
                                                    LESO’s responsibility. It
                                                    does not cover damages or
                                                    repairs for personal
                                                    property or items outside
                                                    the scope of LESO’s
                                                    jurisdiction.
                                                </p>
                                                <p>
                                                    <strong>Exclusions:</strong>{" "}
                                                    LESO is not liable for
                                                    repairs caused by user
                                                    negligence, accidents, or
                                                    incidents outside the
                                                    system’s intended scope.
                                                    Additional costs may apply
                                                    for repairs not covered by
                                                    the initial request.
                                                </p>

                                                <h6>5. Repair Timeline</h6>
                                                <p>
                                                    <strong>
                                                        Estimated Completion:
                                                    </strong>{" "}
                                                    LESO will provide an
                                                    estimated timeline for
                                                    repair completion based on
                                                    resource availability and
                                                    repair complexity. This
                                                    timeline may be adjusted as
                                                    necessary.
                                                </p>
                                                <p>
                                                    <strong>Delays:</strong>{" "}
                                                    LESO is not responsible for
                                                    delays caused by unforeseen
                                                    circumstances, including but
                                                    not limited to supply chain
                                                    disruptions, parts
                                                    availability, or other
                                                    external factors.
                                                </p>

                                                <h6>
                                                    6. User Responsibilities
                                                </h6>
                                                <p>
                                                    <strong>
                                                        Accurate Information:
                                                    </strong>{" "}
                                                    You are responsible for
                                                    providing accurate and
                                                    complete information
                                                    regarding the repair
                                                    request. LESO will not be
                                                    responsible for delays or
                                                    failures due to incomplete
                                                    or inaccurate details.
                                                </p>
                                                <p>
                                                    <strong>
                                                        Access to Equipment:
                                                    </strong>{" "}
                                                    You are required to grant
                                                    appropriate access to the
                                                    equipment or asset needing
                                                    repair. If access is
                                                    restricted or denied, repair
                                                    requests may be delayed or
                                                    canceled.
                                                </p>

                                                <h6>
                                                    7. Privacy and Data
                                                    Protection
                                                </h6>
                                                <p>
                                                    <strong>User Data:</strong>{" "}
                                                    By submitting a repair
                                                    request, you agree to the
                                                    collection and use of your
                                                    data for the purpose of
                                                    processing repair requests.
                                                    This data will be handled
                                                    according to applicable
                                                    privacy laws and LESO’s
                                                    privacy policy.
                                                </p>
                                                <p>
                                                    <strong>
                                                        Confidentiality:
                                                    </strong>{" "}
                                                    Any sensitive or proprietary
                                                    information shared during
                                                    the repair process will be
                                                    treated with confidentiality
                                                    and used solely for the
                                                    purposes of the repair.
                                                </p>

                                                <h6>8. Payment and Charges</h6>
                                                <p>
                                                    <strong>
                                                        Repair Costs:
                                                    </strong>{" "}
                                                    Depending on the nature of
                                                    the repair, there may be
                                                    charges associated with the
                                                    service. LESO will provide a
                                                    breakdown of any costs prior
                                                    to initiating repairs.
                                                </p>
                                                <p>
                                                    Welcome to the LESO
                                                    Ticketing System (hereafter
                                                    referred to as "the
                                                    System"). By accessing or
                                                    using the System to request
                                                    repair services, you agree
                                                    to comply with and be bound
                                                    by these Terms and
                                                    Conditions. Please read them
                                                    carefully before submitting
                                                    any repair requests. If you
                                                    do not agree to these terms,
                                                    you must refrain from using
                                                    the System.
                                                </p>

                                                <h6>2. Eligibility</h6>
                                                <p>
                                                    To submit a repair request
                                                    through the LESO Ticketing
                                                    System, you must be an
                                                    authorized user, typically
                                                    representing a department,
                                                    agency, or entity with the
                                                    appropriate clearance. The
                                                    System is intended for the
                                                    repair and maintenance of
                                                    equipment and assets under
                                                    the purview of LESO.
                                                </p>

                                                <h6>
                                                    3. Repair Request Submission
                                                </h6>
                                                <p>
                                                    <strong>
                                                        Request Details:
                                                    </strong>{" "}
                                                    All repair requests must
                                                    include accurate information
                                                    regarding the equipment or
                                                    asset needing repair,
                                                    including but not limited
                                                    to: item description, serial
                                                    number, malfunction details,
                                                    and any prior maintenance
                                                    history.
                                                </p>
                                                <p>
                                                    <strong>
                                                        Request Confirmation:
                                                    </strong>{" "}
                                                    Upon submitting a request,
                                                    you will receive an
                                                    acknowledgment receipt. This
                                                    confirmation does not imply
                                                    approval or completion of
                                                    the request.
                                                </p>
                                                <p>
                                                    <strong>
                                                        Approval Process:
                                                    </strong>{" "}
                                                    Repair requests are subject
                                                    to approval based on
                                                    priority, available
                                                    resources, and the nature of
                                                    the issue. LESO reserves the
                                                    right to prioritize requests
                                                    as deemed necessary.
                                                </p>

                                                <h6>4. Service Scope</h6>
                                                <p>
                                                    <strong>
                                                        Covered Repairs:
                                                    </strong>{" "}
                                                    The System is intended to
                                                    manage repairs related to
                                                    equipment or assets under
                                                    LESO’s responsibility. It
                                                    does not cover damages or
                                                    repairs for personal
                                                    property or items outside
                                                    the scope of LESO’s
                                                    jurisdiction.
                                                </p>
                                                <p>
                                                    <strong>Exclusions:</strong>{" "}
                                                    LESO is not liable for
                                                    repairs caused by user
                                                    negligence, accidents, or
                                                    incidents outside the
                                                    system’s intended scope.
                                                    Additional costs may apply
                                                    for repairs not covered by
                                                    the initial request.
                                                </p>

                                                <h6>5. Repair Timeline</h6>
                                                <p>
                                                    <strong>
                                                        Estimated Completion:
                                                    </strong>{" "}
                                                    LESO will provide an
                                                    estimated timeline for
                                                    repair completion based on
                                                    resource availability and
                                                    repair complexity. This
                                                    timeline may be adjusted as
                                                    necessary.
                                                </p>
                                                <p>
                                                    <strong>Delays:</strong>{" "}
                                                    LESO is not responsible for
                                                    delays caused by unforeseen
                                                    circumstances, including but
                                                    not limited to supply chain
                                                    disruptions, parts
                                                    availability, or other
                                                    external factors.
                                                </p>

                                                <h6>
                                                    6. User Responsibilities
                                                </h6>
                                                <p>
                                                    <strong>
                                                        Accurate Information:
                                                    </strong>{" "}
                                                    You are responsible for
                                                    providing accurate and
                                                    complete information
                                                    regarding the repair
                                                    request. LESO will not be
                                                    responsible for delays or
                                                    failures due to incomplete
                                                    or inaccurate details.
                                                </p>
                                                <p>
                                                    <strong>
                                                        Access to Equipment:
                                                    </strong>{" "}
                                                    You are required to grant
                                                    appropriate access to the
                                                    equipment or asset needing
                                                    repair. If access is
                                                    restricted or denied, repair
                                                    requests may be delayed or
                                                    canceled.
                                                </p>

                                                <h6>
                                                    7. Privacy and Data
                                                    Protection
                                                </h6>
                                                <p>
                                                    <strong>User Data:</strong>{" "}
                                                    By submitting a repair
                                                    request, you agree to the
                                                    collection and use of your
                                                    data for the purpose of
                                                    processing repair requests.
                                                    This data will be handled
                                                    according to applicable
                                                    privacy laws and LESO’s
                                                    privacy policy.
                                                </p>
                                                <p>
                                                    <strong>
                                                        Confidentiality:
                                                    </strong>{" "}
                                                    Any sensitive or proprietary
                                                    information shared during
                                                    the repair process will be
                                                    treated with confidentiality
                                                    and used solely for the
                                                    purposes of the repair.
                                                </p>

                                                <h6>8. Payment and Charges</h6>
                                                <p>
                                                    <strong>
                                                        Repair Costs:
                                                    </strong>{" "}
                                                    Depending on the nature of
                                                    the repair, there may be
                                                    charges associated with the
                                                    service. LESO will provide a
                                                    breakdown of any costs prior
                                                    to initiating repairs.
                                                </p>
                                                <p>
                                                    <strong>Invoicing:</strong>{" "}
                                                    If applicable, LESO will
                                                    provide invoices for repair
                                                    services. Payments should be
                                                    made in accordance with the
                                                    terms outlined in the
                                                    invoice.
                                                </p>

                                                <h6>
                                                    9. Limitation of Liability
                                                </h6>
                                                <p>
                                                    LESO will not be liable for
                                                    any indirect, incidental, or
                                                    consequential damages
                                                    arising from the repair
                                                    process, including but not
                                                    limited to loss of data,
                                                    downtime, or business
                                                    interruption. The maximum
                                                    liability of LESO in
                                                    connection with any repair
                                                    service shall not exceed the
                                                    total amount paid for the
                                                    repair.
                                                </p>

                                                <h6>
                                                    10. Modifications to Terms
                                                </h6>
                                                <p>
                                                    LESO reserves the right to
                                                    modify or update these Terms
                                                    and Conditions at any time.
                                                    Any changes will be posted
                                                    on this page with an updated
                                                    revision date. It is your
                                                    responsibility to review
                                                    these Terms periodically to
                                                    stay informed about changes.
                                                </p>

                                                <h6>
                                                    11. Termination of Service
                                                </h6>
                                                <p>
                                                    LESO reserves the right to
                                                    suspend or terminate access
                                                    to the ticketing system if
                                                    it determines that a user
                                                    has violated any of the
                                                    Terms and Conditions or is
                                                    misusing the System.
                                                </p>

                                                <h6>12. Governing Law</h6>
                                                <p>
                                                    These Terms and Conditions
                                                    shall be governed by and
                                                    construed in accordance with
                                                    the laws of [Your
                                                    Country/Region]. Any
                                                    disputes arising from or
                                                    related to these Terms will
                                                    be subject to the exclusive
                                                    jurisdiction of the courts
                                                    in [Your Location].
                                                </p>

                                                <h6>13. Contact Information</h6>
                                                <p>
                                                    For any inquiries or
                                                    concerns regarding the LESO
                                                    Ticketing System for
                                                    Repairs, please contact:
                                                </p>
                                                <p>Email: [support@leso.org]</p>
                                                <p>
                                                    Phone: [Your Contact Number]
                                                </p>
                                                <p>
                                                    Address: [Your
                                                    Organization's Address]
                                                </p>
                                            </div>
                                            <div className="modal-footer">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() =>
                                                        setShowTerms(false)
                                                    }
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                                <div className="d-flex justify-content-center mt-5 ">
                                    <button
                                        className="theButton2 buttonColor1 w-100"
                                        onClick={() => previousForm()}
                                    >
                                        Back
                                    </button>
                                </div>
                                <div className="d-flex justify-content-center my-4 ">
                                    <LoginButton
                                        className="theButton2 buttonColor2 w-100"
                                        processing={processing || isSubmitting}
                                        disabled={processing || isSubmitting}
                                    >
                                        {isSubmitting
                                            ? "Registering..."
                                            : "Register"}
                                    </LoginButton>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
