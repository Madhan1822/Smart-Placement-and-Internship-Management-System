import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/student/Dashboard";
import Profile from "./pages/student/Profile";
import AppliedJobsPage from "./pages/student/AppliedJobs";
import Learning from "./pages/student/Learning";

import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import PostJobPage from "./pages/recruiter/PostJobPage";
import ViewApplicantsPage from "./pages/recruiter/ViewApplicantsPage";
import RecruiterProfilePage from "./pages/recruiter/RecruiterProfilePage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import CreateLearningTopic from "./pages/admin/CreateLearningTopic";
import UpdateLearningTopic from "./pages/admin/UpdateLearningTopic";
import UpdateLearningList from "./pages/admin/UpdateLearningList";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Jobs from "./components/Jobs";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* HOME */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            }
          />

          {/* STUDENT */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute role="student">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/profile"
            element={
              <ProtectedRoute role="student">
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/applied-jobs"
            element={
              <ProtectedRoute role="student">
                <AppliedJobsPage />
              </ProtectedRoute>
            }
          />

          {/* RECRUITER */}
          <Route
            path="/recruiter/dashboard"
            element={
              <ProtectedRoute role="recruiter">
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recruiter/post-job"
            element={
              <ProtectedRoute role="recruiter">
                <PostJobPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recruiter/view-applicants"
            element={
              <ProtectedRoute role="recruiter">
                <ViewApplicantsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recruiter/profile"
            element={
              <ProtectedRoute role="recruiter">
                <RecruiterProfilePage />
              </ProtectedRoute>
            }
          />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Navigate to="/admin/dashboard" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute role="admin">
                <ManageUsers />
              </ProtectedRoute>
            }
          />

          {/* 🔥 ADMIN – POST LEARNING */}
          <Route
            path="/admin/learning"
            element={
              <ProtectedRoute role="admin">
                <CreateLearningTopic />
              </ProtectedRoute>
            }
          />

          {/* 📚 LEARNING (STUDENTS + ADMIN) */}
          <Route
            path="/learning"
            element={
              <ProtectedRoute>
                <Learning />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/update-learning/:id"
            element={
              <ProtectedRoute role="admin">
                <UpdateLearningTopic />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/update-learning"
            element={
              <ProtectedRoute role="admin">
                <UpdateLearningList />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
