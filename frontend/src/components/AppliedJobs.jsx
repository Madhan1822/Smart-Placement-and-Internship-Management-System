import { useEffect, useState } from "react";
import axios from "axios";

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/applications/applied", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setApplications(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>My Applied Jobs</h2>

      {applications.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Job</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id}>
                <td>{app.jobId?.title}</td>
                <td>{app.jobId?.company}</td>
                <td>{app.eligibilityStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppliedJobs;
