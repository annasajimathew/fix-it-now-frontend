import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ProfileManagement() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: user.name,
    location: user.location || "",
    experience: user.experience || "",
    education: user.education || "",
    languages: user.languages?.join(",") || ""
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.put(
        "http://localhost:5000/api/worker/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Name"
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Location"
        />

        <input
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Experience (years)"
        />

        <input
          name="languages"
          value={formData.languages}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Languages (comma separated)"
        />

        <input
          name="education"
          value={formData.education}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Education"
        />

        <button className="bg-emerald-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}

export default ProfileManagement;
