import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { DataContext } from "./../store/GlobalStore";
import Cookie from "js-cookie";

export default function Navbar() {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const router = useRouter();
  const isActive = (r) => {
    if (r === router.pathname) {
      return " active";
    } else {
      return "";
    }
  };

  const logOut = () => {
    Cookie.remove("refreshToken", {
      path: "api/auth/accessToken",
    });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "Logged Out" } });
  };

  const afterLogin = (auth) => {
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          id="navbarDropdownMenuLink"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          aria-hidden="true"
        >
          {/* <i className="fas fa-user" aria-hidden="true"></i> */}
          <img
            src={auth?.user.avatar}
            alt="avatar"
            style={{
              borderRadius: "50%",
              wigth: "30px",
              height: "30px",
              transform: "translateY(-3px)",
              marginRight: "3px",
              objectFit: "covers",
            }}
          />
          &nbsp;
          {auth?.user?.name}
        </a>
        <ul
          className="dropdown-menu bg-light px-2"
          style={{ border: "none", left: "-50px" }}
        >
          <li>
            <Link href="/cart" passHref>
              <a
                className={"nav-link"}
                aria-current="page"
                aria-hidden="true"
                style={{ fontSize: "0.9rem" }}
              >
                <i className="fas fa-cart-plus" aria-hidden="true"></i> Profile
              </a>
            </Link>
          </li>
          <hr className="bg-dark text-primary m-1 w-100" />
          <li style={{ cursor: "pointer" }} onClick={logOut}>
            <a
              className={"nav-link"}
              aria-current="page"
              aria-hidden="true"
              style={{ fontSize: "0.9rem" }}
            >
              <i className="fas fa-cart-plus" aria-hidden="true"></i> Log Out
            </a>
          </li>
        </ul>
      </li>
    );
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">
              <i className="fas fa-home" aria-hidden="true"></i> Zirea Creation
            </a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="/cart" passHref>
                  <a className={"nav-link" + isActive("/cart")}>
                    <i className="fas fa-cart-plus" aria-hidden="true"></i>
                    &nbsp;Cart
                  </a>
                </Link>
              </li>
              {Object.keys(auth).length === 0 ? (
                <li className="nav-item">
                  <Link href="/signin" passHref>
                    <a className={"nav-link" + isActive("/signin")}>
                      <i className="fas fa-user" aria-hidden="true"></i> Sign In
                    </a>
                  </Link>
                </li>
              ) : (
                afterLogin(auth)
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
