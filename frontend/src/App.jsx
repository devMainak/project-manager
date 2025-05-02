import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, Link } from "react-router-dom";
import { logout } from "./features/auth/authSilce";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="container">
      <header className="py-2">
        <div className="d-flex justify-content-between">
          <Link to="projects" style={{ textDecoration: "none" }}>
            <h5 className="display-5 fw-semibold text-danger">Gotask 📝</h5>
          </Link>
          <div className="align-self-center">
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <hr />
      </header>
      <main className="container py-2">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
