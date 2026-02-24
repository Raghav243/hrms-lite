import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid px-4">
        <Link className="navbar-brand" to="/">
          HRMS Lite
        </Link>

        <div>
          <Link className="btn btn-outline-light me-2" to="/">
            Dashboard
          </Link>
          <Link className="btn btn-outline-light me-2" to="/employees">
            Employees
          </Link>
          <Link className="btn btn-outline-light" to="/attendance">
            Attendance
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;