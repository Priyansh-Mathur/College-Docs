const RAW_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://college-docs.vercel.app/";

export const API_BASE_URL = RAW_API_BASE_URL.replace(/\/$/, "");

export const apiUrl = (path) => `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
