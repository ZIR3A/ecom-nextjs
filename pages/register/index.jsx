import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import valid from "../../utils/valid";
import { DataContext } from "../../store/GlobalStore";
import { postData } from "../../utils/fetchData";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    cf_password: "",
  });

  const { name, email, password, cf_password } = userData;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const handleUserForm = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const register = async (e) => {
    e.preventDefault();
    const errMsg = valid(name, email, password, cf_password);
    if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/register", userData);

    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);

  return (
    <>
      <Head>
        <title>Register Page</title>
      </Head>

      <div className="px-2">
        <form
          className="mx-auto my-4"
          style={{ maxWidth: "600px" }}
          onSubmit={register}
        >
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={handleUserForm}
              value={name}
            />
          </div>
          <div className="form-group mt-2">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={handleUserForm}
              value={email}
            />
            <small id="emailHelp" className="form-text text-muted">
              User credentials are safe.
            </small>
          </div>
          <div className="form-group mt-2">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleUserForm}
              value={password}
            />
          </div>
          <div className="form-group mt-2">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="cf_password"
              onChange={handleUserForm}
              value={cf_password}
            />
          </div>
          <div className="form-group form-check mt-2">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label">Check me out</label>
          </div>
          <button type="submit" className="btn btn-dark mt-2 w-100">
            Register
          </button>
          <p style={{ opacity: "0.8", marginTop: "2px" }}>
            Already have an account?
            <Link href="/signin">
              <a style={{ color: "crimson", opacity: "1" }}> Login Now</a>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
