import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Editor from "./Editor";
import Preview from "./Preview";
import Loading from "./Loading";
import Nav from "./Nav";
import Home from "./Home";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="app">
      <Nav/>
       <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/preview" element={<Preview />} />
      <Route path="/editor" element={<Editor/>}/>
    </Routes>
    </div>
  );
}
