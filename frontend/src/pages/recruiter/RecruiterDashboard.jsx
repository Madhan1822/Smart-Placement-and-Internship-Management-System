import RecruiterLayout from "./RecruiterLayout";

const RecruiterDashboard = () => {
  return (
    <RecruiterLayout>
      <div className="student-job-card">
        <h2>Welcome Recruiter 👋</h2>
        <p style={{ marginTop: "10px", lineHeight: "1.6" }}>
          Manage your job postings, view applicants, and update your company
          profile from here. Use the sidebar to navigate between features.
        </p>
      </div>
    </RecruiterLayout>
  );
};

export default RecruiterDashboard;
