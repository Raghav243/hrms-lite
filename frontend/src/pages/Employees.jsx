import { useEffect, useState } from "react";
import API from "../services/api";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmployees = () => {
    API.get("employees/")
      .then((res) => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    API.post("employees/", form)
      .then(() => {
        setForm({
          employee_id: "",
          full_name: "",
          email: "",
          department: "",
        });
        fetchEmployees();
      })
      .catch((err) => {
        if (err.response?.data) {
          setError(Object.values(err.response.data).flat().join(" "));
        } else {
          setError("Something went wrong.");
        }
      });
  };

  const handleDelete = (id) => {
    API.delete(`employees/${id}/`).then(() => {
      fetchEmployees();
    });
  };

  return (
    <div>
      <h2 className="mb-4">Employee Management</h2>

      {/* Form */}
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Employee ID"
                  name="employee_id"
                  value={form.employee_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Department"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-1">
                <button className="btn btn-primary w-100">Add</button>
              </div>
            </div>
          </form>

          {error && (
            <div className="alert alert-danger mt-3">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-body">
          {loading ? (
            <p>Loading employees...</p>
          ) : employees.length === 0 ? (
            <p>No employees found.</p>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.employee_id}</td>
                    <td>{emp.full_name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(emp.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Employees;