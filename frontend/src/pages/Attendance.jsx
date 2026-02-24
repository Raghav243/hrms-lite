import { useEffect, useState } from "react";
import API from "../services/api";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [form, setForm] = useState({
    employee: "",
    date: "",
    status: "Present",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmployees = () => {
    API.get("employees/").then((res) => {
      setEmployees(res.data);
    });
  };

  const fetchAttendance = () => {
    API.get("attendance/").then((res) => {
      setAttendance(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    API.post("attendance/", form)
      .then(() => {
        setForm({
          employee: "",
          date: "",
          status: "Present",
        });
        fetchAttendance();
      })
      .catch((err) => {
        if (err.response?.data) {
          setError(Object.values(err.response.data).flat().join(" "));
        } else {
          setError("Something went wrong.");
        }
      });
  };

  return (
    <div>
      <h2 className="mb-4">Attendance Management</h2>

      {/* Attendance Form */}
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">

              <div className="col-md-3">
                <select
                  className="form-control"
                  name="employee"
                  value={form.employee}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3">
                <select
                  className="form-control"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>

              <div className="col-md-2">
                <button className="btn btn-primary w-100">
                  Mark
                </button>
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

      {/* Attendance Table */}
      <div className="card">
        <div className="card-body">
          {loading ? (
            <p>Loading attendance...</p>
          ) : attendance.length === 0 ? (
            <p>No attendance records found.</p>
          ) : (
          <>
               <div className="mb-3">
            <select
                className="form-control"
                onChange={(e) => {
                const id = e.target.value;
                if (id === "") {
                    API.get("attendance/").then((res) => setAttendance(res.data));
                } else {
                    API.get(`attendance/?employee=${id}`).then((res) =>
                    setAttendance(res.data)
                    );
                }
                }}
            >
                <option value="">Filter by Employee</option>
                {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                    {emp.full_name}
                </option>
                ))}
            </select>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((item) => (
                  <tr key={item.id}>
                    {/* <td>{item.employee}</td> */}
                    <td>{item.employee_name}</td>
                    <td>{item.date}</td>
                    <td>
                      <span
                        className={`badge ${
                          item.status === "Present"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          
          
          </>
         
          )}
        </div>
      </div>
    </div>
  );
}

export default Attendance;