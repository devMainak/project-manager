import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupUserAsync } from "./authSilce";
import countries from "world-countries";
import Select from "react-select";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.auth);

  const countryOptions = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
  }));

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Password do not match!");
      setTimeout(() => setAlert(""), 2000);
      return;
    }

    const newUser = {
      name: fullName,
      email,
      password,
      country: selectedCountry,
    };
    try {
      const resultAction = await dispatch(signupUserAsync(newUser));
      if (signupUserAsync.fulfilled.match(resultAction)) {
        navigate("/user/projects");
      } else {
        setAlert(resultAction.payload.message);
        setTimeout(() => setAlert(""), 2000);
      }
    } catch (error) {
      setAlert("Failed to signup user.");
      setTimeout(() => setAlert(""), 2000);
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
              <p className="fs-2 fw-semibold text-center">Signup</p>
              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control p-2"
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control p-2"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <Select
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    placeholder="Select Country"
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
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control p-2"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-danger w-100 mt-2 mb-3"
                >
                  Create New Account
                </button>
                
                  <p className="text-center fw-semibold">Already have an account? <span><Link className="text-danger" to="/">Log in</Link></span></p>
                
              </form>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-3">
          {status === "loading" && (
            <div class="spinner-border text-warning" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          )}
          {alert && (
            <div className="alert alert-danger my-3" role="alert">
              {alert}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
