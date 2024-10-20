import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import LoginButton from "@/Components/LoginButton";
import TextInput2 from "@/Components/TextInput2";
import InputLabel from "@/Components/InputLabel";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminLogin() {
    useEffect(() => {
        console.log("Admin Login component mounted");
    }, []);

    const { data, setData, post, processing, errors } = useForm({
        id_number: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post("/admin/login");
    };

    return (
        <div>
            <div className="split left">
                <div className="centered"></div>
                <div className="half login-imageHolder"></div>
            </div>

            <div className="split2 right2 bg-black"> </div>
            <div className="split3 right ">
                <div className="centered2">
                    <div className="container p-5">
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <h1 className="text-2xl font-bold mb-4 text-center text-white">
                                    Admin Login
                                </h1>
                                <InputLabel
                                    htmlFor="id_number"
                                    className="block mb-2 text-sm font-medium text-white"
                                >
                                    ID Number
                                </InputLabel>
                                <TextInput2
                                    type="text"
                                    id="id_number"
                                    value={data.id_number}
                                    onChange={(e) =>
                                        setData("id_number", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                                {errors.id_number && (
                                    <div className="alert alert-danger mt-1">
                                        {errors.id_number}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <InputLabel
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-white"
                                >
                                    Password
                                </InputLabel>
                                <div
                                    className="password-input-wrapper"
                                    style={{ position: "relative" }}
                                >
                                    <TextInput2
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        id="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded-md"
                                        required
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
                                {errors.password && (
                                    <div className="alert alert-danger mt-1">
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                            <LoginButton
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                disabled={processing}
                            >
                                {processing ? "Logging in..." : "Login"}
                            </LoginButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
