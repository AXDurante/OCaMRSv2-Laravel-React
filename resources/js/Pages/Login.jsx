import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import LoginButton from "@/Components/LoginButton";
import TextInput from "@/Components/TextInput";
import TextInput2 from "@/Components/TextInput2";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { usePage } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        employeeID: "",
        password: "",
        remember: false,
    });
    const { errorMessage } = usePage().props;
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [customErrorMessage, setCustomErrorMessage] = useState("");

    const submit = (e) => {
        e.preventDefault();

        if (isSubmitting) return; // Prevent double submission

        setIsSubmitting(true);

        post(route("login"), {
            preserveState: true,
            onSuccess: () => {
                reset("password");
                setIsSubmitting(false);
            },
            onError: (errors) => {
                setIsSubmitting(false);
                if (error.response && error.response.data) {
                    // Show the custom error message from the backend
                    setCustomErrorMessage(error.response.data.message);
                } else {
                    setCustomErrorMessage(
                        "An unexpected error occurred. Please try again."
                    );
                }
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    return (
        <div>
            <div class="split left">
                <div class="centered"></div>
                <div class="half login-imageHolder"></div>
            </div>

            <div class="split2 right2"> </div>
            <div class="split3 right">
                {status && (
                    <div className="mb-4 font-medium text-green">{status}</div>
                )}
                <div class="centered2">
                    <form onSubmit={submit}>
                        <div>
                            <h1 className="text-center titleLogin mb-5">
                                Login
                            </h1>
                            {errorMessage && (
                                <div className="error-message">
                                    {errorMessage}
                                </div>
                            )}

                            <InputLabel
                                htmlFor="employeeID"
                                value="Employee ID"
                            />

                            <TextInput2
                                id="employeeID"
                                type="employeeID"
                                name="employeeID"
                                value={data.employeeID}
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("employeeID", e.target.value)
                                }
                                className="form-control w-100"
                            />
                            {errors.employeeID && (
                                <InputError
                                    message={errors.employeeID}
                                    className="mt-2 text-danger"
                                />
                            )}
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <div
                                className="password-input-wrapper"
                                style={{ position: "relative" }}
                            >
                                <TextInput2
                                    id="password"
                                    type={showPassword ? "text" : "password"} // Toggle type
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                {/* Eye Icon to toggle password visibility */}
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
                                        fontSize: "1.5em", // Increased font size for larger icon
                                    }}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {errors.password && (
                                <InputError
                                    message={errors.password}
                                    className="mt-2 text-danger"
                                />
                            )}
                        </div>

                        <div className="checkbox-container mt-3 mb-4">
                            <div className="">
                                <Link
                                    href={route("password.request")}
                                    className="link-login underline text text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Forgot your password?
                                </Link>
                            </div>

                            <div className="">
                                <Link
                                    href={route("register")}
                                    className="link-login rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Don't have an account? Register
                                </Link>
                            </div>
                        </div>

                        <div className="login-btn-padding">
                            <LoginButton classname="w-100">Log in</LoginButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
