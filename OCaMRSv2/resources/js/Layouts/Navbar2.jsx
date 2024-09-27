import { Link, usePage } from "@inertiajs/react";

export default function NavBar({
    children,
    absolute,
    firstName,
    lastName,
    email,
}) {
    const { auth } = usePage().props;
    console.log("Navbar props:", { absolute, firstName, lastName, email });
    return (
        <div className="wholepage d-flex" style={{ height: "100vh" }}>
            <div
                className="sidebar2"
                style={{
                    width: "250px",
                    minWidth: "250px",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "15px",
                }}
            >
                <div className="mt-4 d-flex flex-column align-items-center">
                    <h4 className="text-black pt-4" id="textHeader">
                        LESO - ISC
                    </h4>
                    <div
                        className="rounded-circle bg-dark d-flex justify-content-center align-items-center mt-4 shadow"
                        style={{
                            width: "100px",
                            height: "100px",
                            color: "white",
                        }}
                    >
                        <i
                            className="bi bi-person-fill"
                            style={{
                                fontSize: "50px",
                            }}
                        ></i>
                    </div>
                    <p className="mt-2">
                        Welcome, {auth.user.firstName} {auth.user.lastName}
                    </p>
                </div>
            </div>

            <nav
                className="sidebar rounded-right text-light"
                style={{
                    width: "250px",
                    minWidth: "250px",

                    borderBottomRightRadius: "15px",
                }}
            >
                <div className="sidebar-user ">
                    <h4 className="user-interface">Technician&nbsp;</h4>
                    <h4 className="user-interface2"> Interface</h4>
                </div>
                <ul className="nav flex-column pt-4 theNav">
                    <li className="nav-item">
                        <Link href="/jobOrder/create">
                            <a className="nav-link">
                                <i className="bi bi-file-earmark-text me-2"></i>
                                Open Request
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/jobOrder">
                            <a className="nav-link">
                                <i className="bi bi-search me-2"></i>Track
                                Request
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            href={route("manageProfile")}
                            className="nav-link"
                        >
                            <i className="bi bi-person-fill me-2"></i>Manage
                            Profile
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/viewInstrument">
                            <a className="nav-link">
                                <i className="bi bi-list me-2"></i>Instrument
                                List
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi bi-bell-fill me-2 "></i>
                            Notification
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi bi-arrow-left me-2 icon-bold"></i>
                            Go Back
                        </a>
                    </li>
                    <div className="logout">
                        <li className="nav-item-logout">
                            <Link
                                href={route("technician.logout")}
                                method="post"
                                as="button"
                                className="logout-btn"
                            >
                                Log Out
                            </Link>
                        </li>
                    </div>
                </ul>
            </nav>
            <main className="flex-fill p-3">{children}</main>
        </div>
    );
}
