import { useEffect, useState } from "react";
import axios from "axios";

const RecruiterApplicants = ({ jobId }) => {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");

  const fetchApplicants = () => {
    axios
      .get(
        `http://localhost:5000/api/recruiter/job/${jobId}/applicants`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(res => setApplications(res.data));
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const updateStatus = async (id, status) => {
    await axios.put(
      `https://smart-placement-and-internship.onrender.com/api/applications/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchApplicants(); // refresh list
  };

  return (
    <div>
      <h3>Applicants</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {applications.map(app => (
            <tr key={app._id}>
              <td>{app.studentId.name}</td>
              <td>{app.studentId.email}</td>
              <td>{app.status}</td>
              <td>
                {app.status === "APPLIED" && (
                  <>
                    <button onClick={() => updateStatus(app._id, "ACCEPTED")}>
                      Accept
                    </button>
                    <button onClick={() => updateStatus(app._id, "REJECTED")}>
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecruiterApplicants;
