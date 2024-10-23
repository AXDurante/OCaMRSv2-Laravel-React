import { useState, useEffect } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextInput2 from "@/Components/TextInput2";
import LoginButton from "@/Components/LoginButton";
import InputLabel from "@/Components/InputLabel";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        identifier: "", // Use identifier instead of email
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setIsSubmitting(false);
        }
    }, [errors]);

    const submit = (e) => {
        e.preventDefault();
        if (isSubmitting) return; // Prevent double submission
        setIsSubmitting(true);

        post(route("password.email"), {
            preserveState: true,
            preserveScroll: true,
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

            <div class="split2 right2"></div>
            <div class="split3 right">
                <div class="centered2">
                    <div class="container">
                        <h1 className="text-center titleLogin mb-5">
                            Forgot Password
                        </h1>
                        <div className="mb-4 text-sm text-gray-600">
                            Forgot your password? No problem. Just let us know
                            your email address or employee ID, and we will email
                            you a password reset link.
                        </div>

                        {status && (
                            <div className="mb-4 font-medium text-sm text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div>
                                <TextInput2
                                    id="identifier"
                                    type="text"
                                    name="identifier" // Change name to identifier
                                    value={data.identifier} // Bind to identifier, not email
                                    autoComplete="identifier"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("identifier", e.target.value)
                                    } // Set identifier data
                                />

                                <InputError
                                    message={errors.identifier} // Change to identifier
                                    className="mt-2 text-danger"
                                />
                            </div>

                            <div className="pt-3 mt-3">
                                <LoginButton classname="w-100">
                                    Email Password Reset Link
                                </LoginButton>

                                <Link
                                    type="button"
                                    className="btn btn mt-4 btn-outline-dark w-100 h-50 goBack"
                                    href={route("loginHome")}
                                    as="button"
                                >
                                    Go Back
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
