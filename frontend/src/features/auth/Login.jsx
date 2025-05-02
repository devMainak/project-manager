import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAsync } from "./authSilce";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = { email, password };
    try {
      const resultAction = await dispatch(loginUserAsync(credentials));
      if (loginUserAsync.fulfilled.match(resultAction)) {
        navigate("/user/projects");
      } else if (loginUserAsync.rejected.match(resultAction)) {
        const errorMessage = resultAction.payload?.error || "Login failed";
        setAlert(errorMessage);
        setTimeout(() => setAlert(""), 3000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setAlert("Login failed");
      setTimeout(() => setAlert(""), 3000);
    }
  };

  return (
    <div>
      <div style={{ marginTop: "10rem" }}>
        <h4 className="display-4 fw-bold text-center text-danger pb-3">
          Gotask 📝
        </h4>
        <div>
          <div
            className="card px-5 py-4 bg-danger-subtle"
            style={{ width: "30rem", maxHeight: "600px" }}
          >
            <div className="card-body">
              <p className="fs-2 fw-semibold text-center">Sign in</p>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control p-2"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control p-2"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-danger fw-semibold w-100 mt-2 mb-3"
                >
                  Login
                </button>

                <p className="text-center fw-semibold">
                  Don't have an account?{" "}
                  <span>
                    <Link className="text-danger" to="/signup">
                      Sign Up
                    </Link>
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          {status === "loading" && (
            <div
              className="spinner-border text-danger text-center my-3"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {alert && (
            <div className="alert alert-danger mt-3 fw-semibold" role="alert">
              {alert}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
