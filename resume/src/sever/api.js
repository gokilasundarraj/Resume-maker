const API_URL = "https://resume-maker-cxmh.onrender.com";

export const getProfiles = () =>
  fetch(`${API_URL}/profiles`).then(res => res.json());

export const addProfile = (data) =>
  fetch(`${API_URL}/profiles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
