import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import StudentLayout from "./StudentLayout";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editProfile, setEditProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem("token");

  const fetchProfile = useCallback(() => {
    axios
      .get("http://localhost:5000/api/student/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setProfile(res.data))
      .catch(err => console.log(err));
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "skills") {
      setEditProfile({ ...editProfile, skills: value.split(",").map(s => s.trim()) });
    } else {
      setEditProfile({ ...editProfile, [name]: value });
    }
  };

  const startEditing = () => {
    setEditProfile({ ...profile });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setEditProfile({ ...profile });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("age", editProfile.age || "");
      formData.append("personalEmail", editProfile.personalEmail || "");
      formData.append("skills", editProfile.skills?.join(",") || "");
      formData.append("education", editProfile.education || "");
      formData.append("currentOccupation", editProfile.currentOccupation || "");

      if (editProfile.resume instanceof File) {
        formData.append("resume", editProfile.resume);
      }

      await axios.put("http://localhost:5000/api/student/profile", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setIsEditing(false);
      setEditProfile(null);
      fetchProfile();
      alert("Profile updated successfully");
    } catch (err) {
      alert("Error updating profile");
    }
  };

  if (!profile) return <p>Loading...</p>;

  const data = isEditing ? editProfile : profile;

  return (
    <StudentLayout>
      <h1>Student Profile</h1>

      <form className="profile-form">
        <label>Name:</label>
        <input type="text" value={profile.userId?.name || ""} disabled />

        <label>Age:</label>
        <input type="number" name="age" value={data.age || ""} onChange={handleChange} disabled={!isEditing} />

        <label>Personal Email:</label>
        <input type="email" name="personalEmail" value={data.personalEmail || ""} onChange={handleChange} disabled={!isEditing} />

        <label>Resume (PDF):</label>
        <input type="file" accept=".pdf" disabled={!isEditing} onChange={(e) => setEditProfile({ ...editProfile, resume: e.target.files[0] })} />

        {profile.resume && (
          <a href={`http://localhost:5000/${profile.resume}`} target="_blank" rel="noopener noreferrer">View Resume</a>
        )}

        <label>Skills (comma separated):</label>
        <input type="text" name="skills" value={(data.skills || []).join(",")} onChange={handleChange} disabled={!isEditing} />

        <label>Education:</label>
        <input type="text" name="education" value={data.education || ""} onChange={handleChange} disabled={!isEditing} />

        <label>Current Occupation:</label>
        <select name="currentOccupation" value={data.currentOccupation || "student"} onChange={handleChange} disabled={!isEditing}>
          <option value="student">Student</option>
          <option value="working">Working</option>
        </select>

        {!isEditing ? (
          <button type="button" onClick={startEditing}>Update Bio</button>
        ) : (
          <>
            <button type="button" onClick={handleSave}>Save Changes</button>
            <button type="button" onClick={cancelEditing}>Cancel</button>
          </>
        )}
      </form>
    </StudentLayout>
  );
};

export default Profile;
