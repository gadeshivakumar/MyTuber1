import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/api/videos') // Fetch from backend
      .then(response => setVideos(response.data))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div className="home-container">
      <h1>Home</h1>
      <div className="video-grid">
        {videos.map(video => (
          <div key={video.id} className="video-card">
            <Link to={`/watch/${video.id}`}>
              <img src={video.thumbnailUrl} alt={video.title} className="video-thumbnail" />
              <h3>{video.title}</h3>
              <p>By {video.creator}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
