import React, { useState, useEffect } from "react";
import AdminNavBar from "@/Layouts/AdminNavBar";
import axios from "axios";

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idNumber, setIdNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [accountName, setAccountName] = useState("");
    const [accountEmail, setAccountEmail] = useState("");
    const [accountPassword, setAccountPassword] = useState("");
    const [accountDepartment, setAccountDepartment] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [editingAccountId, setEditingAccountId] = useState(null);

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
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingAccountId(null);
        resetForm();
    };

    const resetForm = () => {
        setIdNumber("");
        setFullName("");
        setAccountName("");
        setAccountEmail("");
        setAccountPassword("");
        setAccountDepartment("");
    };

    const openEditModal = (account) => {
        setEditingAccountId(account.id);
        setIdNumber(account.id_number);
        setFullName(account.full_name);
        setAccountEmail(account.email);
    };

    const handleSubmit = async (e, accountId = null) => {
        e.preventDefault();
        try {
            let response;
            if (accountId) {
                // Updating an existing account
                response = await axios.put(
                    `/admin/instrumentation-accounts/${accountId}`,
                    {
                        id_number: idNumber,
                        full_name: fullName,
                        email: accountEmail,
                    }
                );
                console.log("Account updated:", response.data);

                // Update the local state immediately
                setAccounts((prevAccounts) =>
                    prevAccounts.map((account) =>
                        account.id === accountId
                            ? {
                                  ...account,
                                  id_number: idNumber,
                                  full_name: fullName,
                                  email: accountEmail,
                              }
                            : account
                    )
                );

                // Close the modal
                setEditingAccountId(null);
            } else {
                // Creating a new account
                response = await axios.post("/admin/instrumentation-accounts", {
                    id_number: idNumber,
                    full_name: fullName,
                    name: accountName,
                    email: accountEmail,
                    password: accountPassword,
                    department: accountDepartment,
                });
                console.log("Account created:", response.data);

                // Add the new account to the local state immediately
                setAccounts((prevAccounts) => [...prevAccounts, response.data]);

                // Close the modal
                closeModal();
            }

            // Reset form fields
            resetForm();

            // Force a re-render of the component
            setAccounts((prevAccounts) => [...prevAccounts]);
        } catch (error) {
            console.error("Error submitting account:", error);
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
                                                {account.full_name}
                                            </h5>
                                            <p className="account-email">
                                                {account.email}
                                            </p>
                                            <button
                                                className="btn btn-sm btn-primary mt-2"
                                                onClick={() =>
                                                    openEditModal(account)
                                                }
                                            >
                                                Edit
                                            </button>
                                            {editingAccountId ===
                                                account.id && (
                                                <div className="modal-overlay">
                                                    <div
                                                        className="modal-content"
                                                        style={{
                                                            maxWidth: "800px",
                                                            width: "90%",
                                                        }}
                                                    >
                                                        <h2>
                                                            Edit Instrumentation
                                                            Account
                                                        </h2>
                                                        <form
                                                            onSubmit={(e) =>
                                                                handleSubmit(
                                                                    e,
                                                                    account.id
                                                                )
                                                            }
                                                        >
                                                            <div className="row forms-bg">
                                                                <div className="col-4 profile-bg d-flex flex-column align-items-center justify-content-center p-3 text-white">
                                                                    <div>
                                                                        <i className="bi bi-person-fill fs-1"></i>
                                                                    </div>
                                                                    <h5>
                                                                        {fullName ||
                                                                            account.full_name}
                                                                    </h5>
                                                                    <p>
                                                                        {accountEmail ||
                                                                            account.email}
                                                                    </p>
                                                                </div>

                                                                <div className="col-8">
                                                                    <div className="pt-3 pb-3 p-3">
                                                                        <div className="row">
                                                                            <div className="col-6 mb-3">
                                                                                <label className="form-label fw-bold d-block text-truncate">
                                                                                    ID
                                                                                    Number
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control rounded"
                                                                                    value={
                                                                                        idNumber
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        setIdNumber(
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                    required
                                                                                />
                                                                            </div>
                                                                            <div className="col-6 mb-3">
                                                                                <label className="form-label fw-bold d-block text-truncate">
                                                                                    Full
                                                                                    Name
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control rounded"
                                                                                    value={
                                                                                        fullName
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        setFullName(
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                    required
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-12 mb-3">
                                                                                <label className="form-label fw-bold d-block text-truncate">
                                                                                    Email
                                                                                </label>
                                                                                <input
                                                                                    type="email"
                                                                                    className="form-control rounded"
                                                                                    value={
                                                                                        accountEmail
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        setAccountEmail(
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                    required
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mt-3">
                                                                            <div className="col-12">
                                                                                <button
                                                                                    type="submit"
                                                                                    className="btn btn-primary me-2"
                                                                                >
                                                                                    Update
                                                                                    Account
                                                                                </button>
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-secondary"
                                                                                    onClick={() =>
                                                                                        setEditingAccountId(
                                                                                            null
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    Cancel
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            )}
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
                    <div
                        className="modal-content"
                        style={{ maxWidth: "800px", width: "90%" }}
                    >
                        <h2>Create Instrumentation Account</h2>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="row forms-bg">
                                <div className="col-4 profile-bg d-flex flex-column align-items-center justify-content-center p-3 text-white">
                                    <div>
                                        <i className="bi bi-person-fill fs-1"></i>
                                    </div>
                                    <h5>{fullName || "New Account"}</h5>
                                    <p>{accountEmail || "email@example.com"}</p>
                                </div>

                                <div className="col-8">
                                    <div className="pt-3 pb-3 p-3">
                                        <div className="row">
                                            <div className="col-6 mb-3">
                                                <label className="form-label fw-bold d-block text-truncate">
                                                    ID Number
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control rounded"
                                                    value={idNumber}
                                                    onChange={(e) =>
                                                        setIdNumber(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="col-6 mb-3">
                                                <label className="form-label fw-bold d-block text-truncate">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control rounded"
                                                    value={fullName}
                                                    onChange={(e) =>
                                                        setFullName(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 mb-3">
                                                <label className="form-label fw-bold d-block text-truncate">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control rounded"
                                                    value={accountEmail}
                                                    onChange={(e) =>
                                                        setAccountEmail(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="col-6 mb-3">
                                                <label className="form-label fw-bold d-block text-truncate">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control rounded"
                                                    value={accountPassword}
                                                    onChange={(e) =>
                                                        setAccountPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold d-block text-truncate">
                                                    Department
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control rounded"
                                                    value={accountDepartment}
                                                    onChange={(e) =>
                                                        setAccountDepartment(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-12">
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
                                        </div>
                                    </div>
                                </div>
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
