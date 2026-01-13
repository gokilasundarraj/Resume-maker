import React, { useState, useEffect } from "react";
import axios from "axios";
import profileimg from "./img/profile.png";
import { useNavigate } from "react-router-dom";

export default function Editor() {
  useEffect(() => {
    const sections = document.querySelectorAll(".sec");

    const handleScroll = () => {
      const trigger = window.innerHeight * 0.8;

      sections.forEach((sec) => {
        const top = sec.getBoundingClientRect().top;
        const bottom = sec.getBoundingClientRect().bottom;

        if (top < trigger && bottom > 0) {
          sec.classList.add("active");
        } else {
          sec.classList.remove("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  const [data, setData] = useState({
    profile: {
      image: "",
      gender: "",
      name: "",
      email: "",
      website: "",
      dob: "",
      phone: "",
      address: "",
    },
    hobbies: [],
    objectives: [],
    education: [],
    skills: [],
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      profile: { ...data.profile, [name]: value },
    });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setData({
          ...data,
          profile: { ...data.profile, image: reader.result },
        });
      reader.readAsDataURL(file);
    }
  };

  const [hobbyInput, setHobbyInput] = useState("");
  const addHobby = () => {
    if (!hobbyInput.trim()) return;
    setData({ ...data, hobbies: [...data.hobbies, hobbyInput] });
    setHobbyInput("");
  };

  const [edu, setEdu] = useState({ from: "", to: "", major: "", school: "" });
  const addEducation = () => {
    if (!edu.major || !edu.school) return;
    setData({ ...data, education: [...data.education, edu] });
    setEdu({ from: "", to: "", major: "", school: "" });
  };

  const [skillInput, setSkillInput] = useState("");
  const addSkill = () => {
    if (!skillInput.trim()) return;
    setData({ ...data, skills: [...data.skills, skillInput] });
    setSkillInput("");
  };

  const [objective, setObjective] = useState("");

  const sampleObjectives = [
    "In the next year, I aim to complete an online certification in data analytics to enhance my skills and make meaningful contributions to my current role.",
    "Over the next three years, I plan to take on leadership responsibilities within my team, acquiring skills in team management and project leadership.",
    "In the next five years, I aspire to launch my own small business, leveraging my expertise in digital marketing to create a successful venture.",
    "Over the next two years, I aim to transition from software development to machine learning, acquiring relevant skills through specialized courses and projects.",
    "In the next decade, I strive to work in at least three different countries, gaining diverse cultural experiences and expanding my professional network on a global scale.",
  ];

  const handleAddClick = (text) => {
    setObjective(text);
  };

  const handleSave = async () => {

    const requiredFields = ["name", "email", "dob", "phone", "address"];
  const emptyFields = requiredFields.filter(
    (field) => !data.profile[field]?.trim()
  );

  if (emptyFields.length > 0) {
    alert("Please fill all required personal details before saving!");
    return;
  }
  
    try {
      const updatedData = {
        ...data,
        objectives: objective ? [objective, ...data.objectives] : data.objectives,
      };

      await axios.post("https://resume-maker-cxmh.onrender.com/profiles", updatedData);

      alert("Resume saved successfully!");
      navigate("/preview");
    } catch (err) {
      console.log(err);
      alert("Error saving data");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.get("https://resume-maker-cxmh.onrender.com/profiles");

      for (let item of res.data) {
        await axios.delete(`https://resume-maker-cxmh.onrender.com/profiles/${item.id}`);
      }

      setData({
        profile: {
          image: "",
          gender: "",
          name: "",
          email: "",
          website: "",
          dob: "",
          phone: "",
          address: "",
        },
        hobbies: [],
        objectives: [],
        education: [],
        skills: [],
      });

      alert("All data deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete from API");
    }
  };

  return (
    <div className="editor-page sec">
      <section className="section">
        <h2 className="sec">Personal Details</h2>
        <div className="proimg">
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFile}
          />
          {data.profile.image ? (
            <img src={data.profile.image} alt="Preview" />
          ) : (
            <img src={profileimg} alt="Preview" />
          )}
          <button
            type="button"
            className="upload"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <i className="fa-solid fa-cloud-arrow-up"></i> Upload Image
          </button>
        </div>

        <select
          name="gender"
          value={data.profile.gender}
          onChange={handleProfileChange}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          name="name"
          placeholder="Name"
          value={data.profile.name}
          onChange={handleProfileChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={data.profile.email}
          onChange={handleProfileChange}
        />
        <input
          name="website"
          placeholder="Website"
          value={data.profile.website}
          onChange={handleProfileChange}
        />
        <input
          type="date"
          name="dob"
          value={data.profile.dob}
          onChange={handleProfileChange}
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={data.profile.phone}
          onChange={handleProfileChange}
        />
        <textarea
          name="address"
          placeholder="Address"
          value={data.profile.address}
          onChange={handleProfileChange}
        />
      </section>

      <section className="section">
        <h2>Hobbies</h2>
        <input
          value={hobbyInput}
          onChange={(e) => setHobbyInput(e.target.value)}
          placeholder="Enter hobby"
        />
        <button onClick={addHobby} className="add-btn">
          <i className="fa-solid fa-plus"></i> Add
        </button>
        <ul>
          {data.hobbies.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>Objective</h2>

        <textarea
          rows="3"
          placeholder="Enter your career objective"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          style={{
            width: "80%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        />
        <div className="full">
          {sampleObjectives.map((text, index) => (
            <div key={index} className="para">
              <button
                className="plus"
                onClick={() => handleAddClick(text)}
                onMouseOver={(e) => (e.target.style.color = "green")}
                onMouseOut={(e) => (e.target.style.color = "black")}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
              <p style={{ width: "70%", margin: 0, fontSize: "15px" }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Education</h2>
        <input
          type="date"
          name="from"
          value={edu.from}
          onChange={(e) => setEdu({ ...edu, from: e.target.value })}
        />
        <input
          type="date"
          name="to"
          value={edu.to}
          onChange={(e) => setEdu({ ...edu, to: e.target.value })}
        />
        <input
          name="major"
          placeholder="Major/Course"
          value={edu.major}
          onChange={(e) => setEdu({ ...edu, major: e.target.value })}
        />
        <input
          name="school"
          placeholder="School/College"
          value={edu.school}
          onChange={(e) => setEdu({ ...edu, school: e.target.value })}
        />
        <button onClick={addEducation} className="add-btn">
          <i className="fa-solid fa-plus"></i>Add
        </button>
        <ul>
          {data.education.map((e, i) => (
            <li key={i}>
              {e.school} ({e.major}) - {e.from} to {e.to}
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>Skills</h2>
        <input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Enter skill"
        />
        <button onClick={addSkill} className="add-btn">
          <i className="fa-solid fa-plus"></i> Add
        </button>
        <ul>
          {data.skills.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>

      <div className="btns">
        <button className="save" onClick={handleSave}>
          Save
        </button>
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}