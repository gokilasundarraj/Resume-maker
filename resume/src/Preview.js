import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Preview() {
  const [profile, setProfile] = useState(null);
  const resumeRef = useRef();

  // Scroll animation effect
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

  // Fetch profile data
  useEffect(() => {
    axios
      .get("https://resume-maker-cxmh.onrender.com/profiles")
      .then((res) => {
        console.log("Fetched data:", res.data);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setProfile(res.data[res.data.length - 1]);
        }
      })
      .catch((err) => console.error("API ERROR:", err));
  }, []);

  // Download PDF
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

  if (!profile || !profile.profile) {
    return <p style={{ textAlign: "center", padding: "20px" }}>Loading resume...</p>;
  }

  const { image, name, gender, email, phone, website, address } = profile.profile;

  return (
    <div className="preview-wrapper" style={{ textAlign: "center", padding: "20px" }}>
      <button onClick={handleDownloadPDF} style={{ marginBottom: "20px" }}>
        Download Resume (PDF)
      </button>

      <div ref={resumeRef} className="full" style={{ maxWidth: "800px", margin: "0 auto" }}>
        {image && (
          <img
            src={image}
            alt="Profile"
            style={{ width: "100px", borderRadius: "50%", marginBottom: "10px" }}
          />
        )}
        <h2>{name}</h2>
        <h4>{gender}</h4>
        <p><i className="fa-solid fa-envelope"></i> {email}</p>
        <p><i className="fa-solid fa-phone"></i> {phone}</p>
        <p><i className="fa-solid fa-link"></i> {website}</p>
        <p><i className="fa-solid fa-house"></i> {address}</p>

        <hr />
        <h3>Objective</h3>
        {profile.objectives?.length > 0 ? (
          profile.objectives.map((o, i) => <p key={i}>{o}</p>)
        ) : (
          <p>No objectives added.</p>
        )}

        <h3>Education</h3>
        {profile.education?.length > 0 ? (
          profile.education.map((e, i) => (
            <p key={i}>
              {e.school} ({e.major}) - {e.from} to {e.to}
            </p>
          ))
        ) : (
          <p>No education details.</p>
        )}

        <h3>Skills</h3>
        {profile.skills?.length > 0 ? (
          <ul>{profile.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
        ) : (
          <p>No skills listed.</p>
        )}

        <h3>Hobbies</h3>
        {profile.hobbies?.length > 0 ? (
          <ul>{profile.hobbies.map((h, i) => <li key={i}>{h}</li>)}</ul>
        ) : (
          <p>No hobbies added.</p>
        )}
      </div>
    </div>
  );
}
