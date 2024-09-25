import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import LoginButton from "@/Components/LoginButton";
import TextInput2 from "@/Components/TextInput2";
import InputLabel from "@/Components/InputLabel";

export default function AdminLogin() {
    useEffect(() => {
        console.log("Admin Login component mounted");
    }, []);

    const { data, setData, post, processing, errors } = useForm({
        id_number: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/admin/login");
    };

    return (
        <div>
            <div class="split left">
                <div class="centered"></div>
                <div class="half login-imageHolder"></div>
            </div>

            <div class="split2 right2 bg-black"> </div>
            <div class="split3 right ">
                <div class="centered2">
                    <h1 className="text-2xl font-bold mb-4 text-center text-white">
                        Admin Login
                    </h1>
                    <form onSubmit={submit}>
                        <div className="mb-4">
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
                                    {" "}
                                    {/* Bootstrap alert for error */}
                                    {errors.id_number}
                                </div>
                            )}
                            {/* Added visibility for password error */}
                            {errors.password && (
                                <div className="alert alert-danger mt-1">
                                    {" "}
                                    {/* Bootstrap alert for error */}
                                    {errors.password}
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
                            <TextInput2
                                type="password"
                                id="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                            {errors.password && (
                                <div className="alert alert-danger mt-1">
                                    {" "}
                                    {/* Bootstrap alert for error */}
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
    );
}
