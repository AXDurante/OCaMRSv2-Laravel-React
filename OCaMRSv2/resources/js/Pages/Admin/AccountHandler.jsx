import React, { useState, useEffect } from "react";
import AdminNavBar from "@/Layouts/AdminNavBar";
import axios from "axios";

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [accountName, setAccountName] = useState("");
    const [accountEmail, setAccountEmail] = useState("");
    const [accountPassword, setAccountPassword] = useState("");
    const [accountDepartment, setAccountDepartment] = useState("");
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await axios.get("/admin/instrumentation-accounts");
            setAccounts(response.data);
        } catch (error) {
            console.error("Error fetching accounts:", error);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "/admin/instrumentation-accounts",
                {
                    name: accountName,
                    email: accountEmail,
                    password: accountPassword,
                    department: accountDepartment,
                }
            );
            console.log("Account created:", response.data);
            closeModal();
            fetchAccounts(); // Refresh the list of accounts
            // Reset form fields
            setAccountName("");
            setAccountEmail("");
            setAccountPassword("");
            setAccountDepartment("");
        } catch (error) {
            console.error("Error creating account:", error);
            // TODO: Handle error (e.g., show error message to user)
        }
    };

    return (
        <div className="d-flex">
            <div id="content" className="main-content flex-fill p-3">
                <div>
                    <div>
                        <h1 className="d-inline">Account Handler | </h1>
                        <h1 className="d-inline fw-light">Lorem Ipsum</h1>
                        <hr />
                    </div>
                    <div className="mt-3">
                        <h3 className="mt-10 mb-3 fw-bold">
                            Instrumentation Accounts
                        </h3>
                        <div className="row forms-bg p-5 instrumentation-accounts">
                            <div className="col-12">
                                <div className="row">
                                    {accounts.map((account) => (
                                        <div
                                            key={account.id}
                                            className="col-6 col-md-3 account-wrapper"
                                        >
                                            <div className="rounded-circle bg-dark d-flex justify-content-center align-items-center account-icon mx-auto">
                                                <i className="bi bi-person-fill text-primary"></i>
                                            </div>
                                            <h5 className="account-name">
                                                {account.name}
                                            </h5>
                                        </div>
                                    ))}
                                    <div
                                        className="col-6 col-md-3 account-wrapper"
                                        onClick={openModal}
                                    >
                                        <div className="rounded-circle bg-dark d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-plus text-primary"></i>
                                        </div>
                                        <h5 className="account-name">
                                            add account
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3 className="mt-10 mb-3 fw-bold">Clients Accounts</h3>
                        <div className="row forms-bg p-5">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-6 col-md-2 account-wrapper">
                                        <div className="rounded-circle bg-dark d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-person-fill text-primary"></i>
                                        </div>
                                        <h5 className="account-name">
                                            Nino Anasco
                                        </h5>
                                    </div>

                                    <div className="col-6 col-md-2 account-wrapper">
                                        <div className="rounded-circle bg-dark d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-person-fill text-primary"></i>
                                        </div>
                                        <h5 className="account-name">
                                            Add Account
                                        </h5>
                                    </div>

                                    <div className="col-6 col-md-2 account-wrapper">
                                        <div className="rounded-circle bg-dark d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-person-fill text-primary"></i>
                                        </div>
                                        <h5 className="account-name">
                                            John Doe
                                        </h5>
                                    </div>

                                    <div className="col-6 col-md-2 account-wrapper">
                                        <div className="rounded-circle bg-dark d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-person-fill text-primary"></i>
                                        </div>
                                        <h5 className="account-name">
                                            John Doe
                                        </h5>
                                    </div>

                                    <div className="col-6 col-md-2 account-wrapper">
                                        <div className="rounded-circle bg-dark d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-person-fill text-primary"></i>
                                        </div>
                                        <h5 className="account-name">
                                            John Doe
                                        </h5>
                                    </div>

                                    <div className="col-6 col-md-2 account-wrapper">
                                        <div className="rounded-circle bg-dark d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-person-fill text-primary"></i>
                                        </div>
                                        <h5 className="account-name">
                                            John Doe
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-6 col-md-2 account-wrapper">
                                        <div className="rounded-circle bg-dark d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-person-fill text-primary"></i>
                                        </div>
                                        <h5 className="account-name">
                                            Nino Anasco
                                        </h5>
                                    </div>

                                    <div className="col-6 col-md-2 account-wrapper">
                                        <div className="rounded-circle bg-dark d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-person-fill text-primary"></i>
                                        </div>
                                        <h5 className="account-name">
                                            Add Account
                                        </h5>
                                    </div>

                                    <div className="col-6 col-md-2 account-wrapper">
                                        <div className="rounded-circle bg-dark d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-person-fill text-primary"></i>
                                        </div>
                                        <h5 className="account-name">
                                            John Doe
                                        </h5>
                                    </div>

                                    <div className="col-6 col-md-2 account-wrapper">
                                        <div className="rounded-circle bg-dark d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-person-fill text-primary"></i>
                                        </div>
                                        <h5 className="account-name">
                                            John Doe
                                        </h5>
                                    </div>

                                    <div className="col-6 col-md-2 account-wrapper">
                                        <div className="rounded-circle bg-dark d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-person-fill text-primary"></i>
                                        </div>
                                        <h5 className="account-name">
                                            John Doe
                                        </h5>
                                    </div>

                                    <div className="col-6 col-md-2 account-wrapper">
                                        <div className="rounded-circle bg-dark d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-person-fill text-primary"></i>
                                        </div>
                                        <h5 className="account-name">
                                            John Doe
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 mb-3 ">
                            <h3 className="d-inline fw-bold">
                                Clients Accounts
                            </h3>
                            <h3 className="d-inline fw-light">
                                (For Approval)
                            </h3>
                        </div>

                        <div className="row forms-bg p-5">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-6 col-md-2 account-wrapper">
                                        <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-person-fill text-dark"></i>
                                        </div>
                                        <h5 className="account-name">
                                            Nino Anasco
                                        </h5>
                                    </div>

                                    <div className="col-6 col-md-2 account-wrapper">
                                        <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-person-fill text-dark"></i>
                                        </div>
                                        <h5 className="account-name">
                                            Add Account
                                        </h5>
                                    </div>

                                    <div className="col-6 col-md-2 account-wrapper">
                                        <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-person-fill text-dark"></i>
                                        </div>
                                        <h5 className="account-name">
                                            John Doe
                                        </h5>
                                    </div>

                                    <div className="col-6 col-md-2 account-wrapper">
                                        <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-person-fill text-dark"></i>
                                        </div>
                                        <h5 className="account-name">
                                            John Doe
                                        </h5>
                                    </div>

                                    <div className="col-6 col-md-2 account-wrapper">
                                        <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-person-fill text-dark"></i>
                                        </div>
                                        <h5 className="account-name">
                                            John Doe
                                        </h5>
                                    </div>

                                    <div className="col-6 col-md-2 account-wrapper">
                                        <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center account-icon mx-auto">
                                            <i className="bi bi-person-fill text-dark"></i>
                                        </div>
                                        <h5 className="account-name">
                                            John Doe
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Create Instrumentation Account</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="accountName">Name</label>
                                <input
                                    type="text"
                                    id="accountName"
                                    className="form-control"
                                    value={accountName}
                                    onChange={(e) =>
                                        setAccountName(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="accountEmail">Email</label>
                                <input
                                    type="email"
                                    id="accountEmail"
                                    className="form-control"
                                    value={accountEmail}
                                    onChange={(e) =>
                                        setAccountEmail(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="accountPassword">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="accountPassword"
                                    className="form-control"
                                    value={accountPassword}
                                    onChange={(e) =>
                                        setAccountPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="accountDepartment">
                                    Department
                                </label>
                                <input
                                    type="text"
                                    id="accountDepartment"
                                    className="form-control"
                                    value={accountDepartment}
                                    onChange={(e) =>
                                        setAccountDepartment(e.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary me-2"
                                >
                                    Create Account
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

Home.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;

export default Home;
