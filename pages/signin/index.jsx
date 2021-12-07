import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import Cookie from "js-cookie";
import { postData } from "../../utils/fetchData";
import { DataContext } from "./../../store/GlobalStore";
import { useRouter } from "next/router";

export default function SignInPage() {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userData;
  const handleUserForm = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const login = async (e) => {
    e.preventDefault();

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/login", userData);

    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    setUserData({
      email: "",
      password: "",
    });
    dispatch({ type: "NOTIFY", payload: { success: res.msg } });

    dispatch({
      type: "AUTH",
      payload: {
        token: res.access_token,
        user: res.user,
      },
    });

    Cookie.set("refreshToken", res.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    });
    localStorage.setItem("firstLogin", true);
  };
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);

  return (
    <>
      <Head>
        <title>Sign In Page</title>
      </Head>
      <div className="px-2">
        <form
          className="mx-auto my-4"
          style={{ maxWidth: "600px" }}
          onSubmit={login}
        >
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              name="email"
              onChange={handleUserForm}
            />
            <small className="form-text text-muted">
              User credentials are safe
            </small>
          </div>
          <div className="form-group mt-2">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              name="password"
              onChange={handleUserForm}
            />
          </div>
          <div className="form-group form-check mt-2">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label">Check me out</label>
          </div>
          <button type="submit" className="btn btn-dark mt-2 w-100">
            Login
          </button>
          <p style={{ opacity: "0.8", marginTop: "2px" }}>
            Not have an account?
            <Link href="/register">
              <a style={{ color: "crimson", opacity: "1" }}> Register Here</a>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
