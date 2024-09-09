import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import LoginButton from "@/Components/LoginButton";
import TextInput from "@/Components/TextInput";
import TextInput2 from "@/Components/TextInput2";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        employeeID: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('technician.login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div>
            <div class="split left">
                <div class="centered"></div>
                <div class="half login-imageHolder"></div>
            </div>

            <div class="split2 right2">  </div>
            <div class="split3 right">
            {status && <div className="mb-4 font-medium text-green">{status}</div>}
                <div class="centered2">
                    <form onSubmit={submit}>
                        <div>
                            <h1 className="text-center titleLogin mb-5">Technician Login</h1>
                            <InputLabel htmlFor="employeeID" value="Employee ID" />

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
                            />

                            <InputError
                                message={errors.employeeID}
                                className="mt-2 text-danger"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput2
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2 text-danger"
                            />
                        </div>

                
                            
                        <div className="checkbox-container mt-3 mb-4">
                            <div className="">
                                {/*
                                    <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData("remember", e.target.checked)}
                                />
                                <span className="remember-me-text">Remember me</span>
                                */}

                                <Link
                                    href={route("technician.password.request")}
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Forgot your password?
                                </Link>
                                
                            </div>

                            <div className="">
                            <Link
                                    href={route("technician.register")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Don't have an account? Register
                                </Link>
                          
                            </div>
                           
                           
                        </div>

                        
                            
                               
                            <div className="pt-3">
                                <LoginButton classname="w-100">
                                    Log in
                            </LoginButton>    
                            </div>
                           
                                
                           
                          
                       
                    </form>
                </div>
            </div>
        </div>
    );
}