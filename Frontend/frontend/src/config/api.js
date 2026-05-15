const FALLBACK_BASE_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:5000"
		: "https://college-docs-t9ye.vercel.app";

const RAW_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || FALLBACK_BASE_URL;

export const API_BASE_URL = RAW_API_BASE_URL.replace(/\/$/, "");

export const apiUrl = (path) => `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
