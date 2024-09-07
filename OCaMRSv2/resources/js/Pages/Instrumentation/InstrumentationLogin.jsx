import React from "react";
import { useForm } from "@inertiajs/react";

export default function InstrumentationLogin() {
    const { data, setData, post, processing, errors } = useForm({
        id_number: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("instrumentation.login.submit"));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">
                    Instrumentation Login
                </h2>
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label
                            htmlFor="id_number"
                            className="block mb-2 text-sm font-medium text-gray-600"
                        >
                            ID Number
                        </label>
                        <input
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
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
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
                            <div className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        disabled={processing}
                    >
                        {processing ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
