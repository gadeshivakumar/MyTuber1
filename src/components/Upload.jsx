import React, { useState } from "react";
import axios from "axios";
import "./Upload.css";

function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!video || !thumbnail) {
      alert("Please select both a video and a thumbnail!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", video);  // ✅ Ensure 'file' matches backend expectation
    formData.append("thumbnail", thumbnail);

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8081/api/videos/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Video uploaded successfully!");
      console.log("Upload Response:", response.data);

      // Clear form after successful upload
      setTitle("");
      setDescription("");
      setVideo(null);
      setThumbnail(null);
      document.getElementById("video").value = "";
      document.getElementById("thumbnail").value = "";

    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert(`Failed to upload video: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input 
            type="text" 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="video">Video File:</label>
          <input 
            type="file" 
            id="video" 
            accept="video/*" 
            onChange={(e) => setVideo(e.target.files[0])} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail:</label>
          <input 
            type="file" 
            id="thumbnail" 
            accept="image/*" 
            onChange={(e) => setThumbnail(e.target.files[0])} 
            required 
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default Upload;
