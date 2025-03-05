import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import './Home.css';

    function Home() {
      const [videos, setVideos] = useState([]);

      useEffect(() => {
        // In a real application, you would fetch videos from a backend API
        // For this example, we'll use some hardcoded data
        const sampleVideos = [
          { id: '1', title: 'Sample Video 1', thumbnailUrl: 'https://via.placeholder.com/150', creator: 'Creator 1' },
          { id: '2', title: 'Sample Video 2', thumbnailUrl: 'https://via.placeholder.com/150', creator: 'Creator 2' },
          { id: '3', title: 'Sample Video 3', thumbnailUrl: 'https://via.placeholder.com/150', creator: 'Creator 3' },
        ];
        setVideos(sampleVideos);
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
