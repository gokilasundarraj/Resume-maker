import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();

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

  return (
    <div className="home-container sec">
      <button className="add-btn" onClick={() => navigate("/editor")}>
        <FaPlusCircle size={60} className="plus" />
      </button>
      <p>Create your professional resume in seconds..!</p>
    </div>
  );
}

export default Home;