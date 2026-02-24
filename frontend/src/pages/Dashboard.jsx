import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("dashboard/")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5>Total Employees</h5>
              <h3>{data.total_employees}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5>Present</h5>
              <h3>{data.present_count}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5>Absent</h5>
              <h3>{data.absent_count}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;