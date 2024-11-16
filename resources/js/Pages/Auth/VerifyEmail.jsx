import { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import LoginButton from "@/Components/LoginButton";
import axios from "axios";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});
    const [isVerified, setIsVerified] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    useEffect(() => {
        const checkVerification = async () => {
            try {
                const response = await axios.get(
                    route("verification.check.status")
                );
                if (response.data.verified) {
                    setIsVerified(true);
                    setRedirectUrl(response.data.redirect);
                    setTimeout(() => {
                        window.location.href = response.data.redirect;
                    }, 2000);
                }
            } catch (error) {
                console.error("Error checking verification status:", error);
            }
        };

        // Check immediately on mount
        checkVerification();

        // Poll every 3 seconds
        const interval = setInterval(checkVerification, 3000);

        return () => clearInterval(interval);
    }, []);

    if (isVerified) {
        return (
            <div className="centered">
                <h1 className="mb-4">Email Verified Successfully!</h1>
                <p>Redirecting you to the dashboard...</p>
            </div>
        );
    }

    return (
        <div className="centered">
            <h1 className="mb-4">Email Verification</h1>
            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn't receive the email, we will gladly send you
                another.
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    A new verification link has been sent to your email address.
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
                        Log Out
                    </Link>
                </div>
            </form>
        </div>
    );
}
