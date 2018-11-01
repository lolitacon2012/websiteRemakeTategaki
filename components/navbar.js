import Link from "next/link";

const Navbar = ({ isBottom }) => (
    <div>
        <div
            className={
                "navbar navbar-expand navbar-dark bg-dark mb-4" +
                (isBottom ? " navbar-bottom" : "")
            }
        >
            <div className="container">
                <a className="navbar-brand" href="#">
                    Kannagi Peekumii
                </a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link href="/">
                                <a className="nav-link">Home</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/about">
                                <a className="nav-link">About</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <style jsx>{`
            .navbar-bottom {
                margin: 0 !important;
            }
        `}</style>
    </div>
);

export default Navbar;
