import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import LoginButton from '@/Components/LoginButton';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <div className='centered'>
            <h1 className="mb-4">Email Verification</h1>

            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                link we just emailed to you? If you didn't receive the email, we will gladly send you another.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between mb-4">
                    <LoginButton disabled={processing}>Resend Verification Email</LoginButton>

                  
                </div>
                <div>
                    <button type="button" className="btn btn btn-outline-dark w-100 h-50"  href={route('logout') }
                            method="post"
                            as="button">
                        Log Out
                    </button>
                    {
                        /*

                        
                        */
                    }
                   
                </div>
            </form>
        </div>
    );
}
