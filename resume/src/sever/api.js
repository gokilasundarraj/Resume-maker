const API_URL = "http://localhost:3000";

export const getUsers = () =>
  fetch(`${API_URL}/users`).then(res => res.json());

export const addUser = (data) =>
  fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
