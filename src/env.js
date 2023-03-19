const isSecure = window.location.protocol === "https:";

const API_BASE_URL = isSecure ? "https://driving-school-backend.vercel.app/api/" : "http://localhost:8080/api/";

module.exports = {
  API_BASE_URL: API_BASE_URL,
};
