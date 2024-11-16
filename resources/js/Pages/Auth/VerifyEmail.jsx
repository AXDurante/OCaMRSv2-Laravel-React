import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import LoginButton from "@/Components/LoginButton";
import axios from "axios";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});
    const [isVerified, setIsVerified] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("technician.verification.send"));
    };

    useEffect(() => {
        const checkVerification = () => {
            axios
                .get(route("verification.check"))
                .then((response) => {
                    if (response.data.verified) {
                        setIsVerified(true);
                        attemptToCloseOrRedirect();
                    }
                })
                .catch((error) => {
                    console.error("Error checking verification status:", error);
                });
        };

        const interval = setInterval(checkVerification, 5000);

        checkVerification(); // Check immediately on mount

        return () => clearInterval(interval);
    }, []);

    const attemptToCloseOrRedirect = () => {
        // Attempt to close the window
        window.close();

        // If the window didn't close (which is likely), redirect after a short delay
        setTimeout(() => {
            if (!window.closed) {
                window.location.href = route("dashboard");
            }
        }, 300);
    };

    if (isVerified) {
        return (
            <div className="centered">
                <h1 className="mb-4">Email Verified</h1>
                <p>
                    Your email has been verified. This page will close or
                    redirect shortly.
                </p>
            </div>
        );
    }

    return (
        <div className="centered">
            <h1 className="mb-4">Client Email Verification</h1>

            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn't receive the email, we will gladly send you
                another.
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between mb-4">
                    <LoginButton disabled={processing}>
                        Resend Verification Email
                    </LoginButton>
                </div>
                <div>
                    <Link
                        type="button"
                        className="btn btn btn-outline-dark w-100 h-50"
                        href={route("logout")}
                        method="post"
                        as="button"
                    >
                        Go Back
                    </Link>
                </div>
            </form>
        </div>
    );
}
