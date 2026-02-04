import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import RecruiterLayout from "./RecruiterLayout";

const RecruiterProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [editProfile, setEditProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem("token");

  const fetchProfile = useCallback(() => {
    axios.get("http://localhost:5000/api/recruiter/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProfile(res.data));
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const startEditing = () => {
    setEditProfile({ ...profile });
    setIsEditing(true);
  };

  const handleSave = async () => {
    await axios.put(
      "http://localhost:5000/api/recruiter/profile",
      {
        companyName: editProfile.companyName,
        description: editProfile.description
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setIsEditing(false);
    fetchProfile();
    alert("Profile updated");
  };

  if (!profile) return <p>Loading...</p>;

  const data = isEditing ? editProfile : profile;

  return (
    <RecruiterLayout>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Recruiter Profile
      </h2>

      <form className="profile-form">
        <label>Name</label>
        <input value={profile.userId?.name} disabled />

        <label>Email</label>
        <input value={profile.userId?.email} disabled />

        <label>Company Name</label>
        <input
          value={data.companyName || ""}
          disabled={!isEditing}
          onChange={e => setEditProfile({ ...editProfile, companyName: e.target.value })}
        />

        <label>Description</label>
        <textarea
          value={data.description || ""}
          disabled={!isEditing}
          onChange={e => setEditProfile({ ...editProfile, description: e.target.value })}
        />

        {!isEditing ? (
          <button type="button" onClick={startEditing}>Update Profile</button>
        ) : (
          <button type="button" onClick={handleSave}>Save Changes</button>
        )}
      </form>
    </RecruiterLayout>
  );
};

export default RecruiterProfilePage;
