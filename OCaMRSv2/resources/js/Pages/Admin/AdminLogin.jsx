import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function Login() {
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
                {/* Rest of your form */}
            </div>
        </div>
    );
}
