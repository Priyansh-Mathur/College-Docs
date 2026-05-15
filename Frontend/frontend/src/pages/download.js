import React, { useState } from "react";
import NavbarPrivate from "../components/NavbarProtect";
import { apiUrl } from "../config/api";

const Download = () => {
  const [fileId, setFileId] = useState("");

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!fileId.trim()) return alert("Please enter a valid file ID");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(apiUrl(`/api/download/${fileId}`), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document"; // name will be overridden by backend header
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("❌ Could not download file: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <NavbarPrivate />
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-3xl font-bold text-green-400 mb-6">
          Download Document by File ID
        </h1>
        <form onSubmit={handleDownload} className="flex flex-col items-center space-y-4">
          <input
            type="text"
            value={fileId}
            onChange={(e) => setFileId(e.target.value)}
            placeholder="Enter File ID (e.g. 6739a8d8b0f4f7b9ad3c1234)"
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 w-96"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold transition"
          >
            Download
          </button>
        </form>
      </div>
    </div>
  );
};

export default Download;
