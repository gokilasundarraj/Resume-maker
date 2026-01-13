import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Preview() {
  const [profile, setProfile] = useState(null);
  const resumeRef = useRef();

  useEffect(() => {
    const sections = document.querySelectorAll(".sec");

    const handleScroll = () => {
      const trigger = window.innerHeight * 0.8;

      sections.forEach((sec) => {
        const { top, bottom } = sec.getBoundingClientRect();
        if (top < trigger && bottom > 0) {
          sec.classList.add("active");
        } else {
          sec.classList.remove("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch profile data from backend
  useEffect(() => {
    axios
      .get("https://resume-maker-cxmh.onrender.com/profiles")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setProfile(res.data[res.data.length - 1]); // latest profile
        }
      })
      .catch((err) => console.error("API ERROR:", err));
  }, []);

  // PDF download
  const handleDownloadPDF = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${profile?.profile?.name || "My"}_Resume.pdf`);
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="preview-wrapper sec" style={{ textAlign: "center" }}>
      <button onClick={handleDownloadPDF}>Download Resume (PDF)</button>

      <div ref={resumeRef} className="full">
        {profile.profile?.image && (
          <img
            src={profile.profile.image}
            alt="Profile"
            style={{
              width: "100px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
          />
        )}
        <h2>{profile.profile?.name}</h2>
        <h4>{profile.profile?.gender}</h4>
        <p>
          <i className="fa-solid fa-envelope"></i> {profile.profile?.email}
        </p>
        <p>
          <i className="fa-solid fa-phone"></i> {profile.profile?.phone}
        </p>
        <p>
          <i className="fa-solid fa-link"></i> {profile.profile?.website}
        </p>
        <p>
          <i className="fa-solid fa-house"></i> {profile.profile?.address}
        </p>

        <hr />
        <h3>Objective</h3>
        {profile.objectives?.map((o, i) => (
          <p key={i}>{o}</p>
        ))}

        <h3>Education</h3>
        {profile.education?.map((e, i) => (
          <p key={i}>
            {e.school} ({e.major}) - {e.from} to {e.to}
          </p>
        ))}

        <h3>Skills</h3>
        <ul>
          {profile.skills?.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <h3>Hobbies</h3>
        <ul>
          {profile.hobbies?.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
