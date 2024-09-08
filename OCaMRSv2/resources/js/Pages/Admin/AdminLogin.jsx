import React, { useEffect } from "react";
import TextInput2 from "@/Components/TextInput2";
import LoginButton from "@/Components/LoginButton";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";

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
        <div className="">
            <div>
                <div class="split left">
                    <div class="centered"></div>
                    <div class="half login-imageHolder"></div>
                </div>

                <div class="split2 right2 bg-admin-login"> </div>
                <div class="split3 right">
                    <div class="centered2">
                        <h2 className="text-2xl  text-center text-white titleLogin mb-5 ">
                            <i class="bi bi-person-fill"></i> Admin Login
                        </h2>
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
                                    <div className="text-red-500 text-sm mt-1">
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
                                <TextInput2
                                    type="password"
                                    id="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border rounded-md "
                                    required
                                />
                                {errors.password && (
                                    <div className="text-red-500 text-sm mt-1">
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
