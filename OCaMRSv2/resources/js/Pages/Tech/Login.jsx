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

        post(route("technician.login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div>
            <div class="split left">
                <div class="centered"></div>
                <div class="half login-imageHolder"></div>
            </div>

            <div class="split2 right2 bg-instr-login"> </div>
            <div class="split3 right">
                {status && (
                    <div className="mb-4 font-medium text-green">{status}</div>
                )}
                <div class="centered2">
                    <form onSubmit={submit}>
                        <div>
                            <h1 className="text-center titleLogin mb-5 text-white">
                                Technician Login
                            </h1>
                            <InputLabel
                                htmlFor="employeeID"
                                value="Employee ID"
                                className="block mb-2 text-sm font-medium text-white"
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
                            />

                            <InputError
                                message={errors.employeeID}
                                className="mt-2 text-danger"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                className="block mb-2 text-sm font-medium text-white"
                            />

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
                                    className="bg-gray-800 text-white "
                                >
                                    Forgot your password?
                                </Link>
                            </div>

                            <div className="">
                                <Link
                                    href={route("technician.register")}
                                    className=" bg-gray-800 text-white "
                                >
                                    Don't have an account? Register
                                </Link>
                            </div>
                        </div>

                        <div className="pt-3">
                            <LoginButton classname="w-100">Log in</LoginButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
