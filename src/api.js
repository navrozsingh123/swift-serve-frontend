// Falling back to localhost keeps requests readable when VITE_API_URL is missing,
// instead of silently building "undefined/api/...".
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const apiUrl = (path) => `${BASE_URL}${path}`;

// The server derives the account from this token, so the client no longer
// sends an email it could simply make up.
export const authHeaders = () => {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
};
