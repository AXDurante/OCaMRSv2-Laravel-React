export default function NavBar({ children }) {
    return (
        <div className="d-flex" style={{ height: "100vh" }}>
            <nav
                className="sidebar rounded-right bg-dark text-light "
                style={{
                    width: "250px",
                    minWidth: "250px",
                    borderTopRightRadius: "15px",
                    borderBottomRightRadius: "15px",
                }}
            >
                <div className="sidebar-header">
                    <h4 className="text-light position-absolute top-0 start-50 translate-middle mt-5">
                        LESO - ISC
                    </h4>
                </div>
                <ul className="nav flex-column pt-5">
                    <li className="nav-item active">
                        <a className="nav-link text-light" href="#">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="#">
                            Link
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle text-light"
                            href="#"
                            id="sidebarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Dropdown
                        </a>
                        <div
                            className="dropdown-menu"
                            aria-labelledby="sidebarDropdown"
                        >
                            <a className="dropdown-item" href="#">
                                Action
                            </a>
                            <a className="dropdown-item" href="#">
                                Another action
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                                Something else here
                            </a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled text-light" href="#">
                            Disabled
                        </a>
                    </li>
                </ul>
                <form className="form-inline mt-3">
                    <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button
                        className="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                    >
                        Search
                    </button>
                </form>
            </nav>
            <main className="flex-fill p-3">{children}</main>
        </div>
    );
}
