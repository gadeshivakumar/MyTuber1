import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Watch.css';

function Watch() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/videos/${videoId}`)
      .then(response => setVideo(response.data))
      .catch(error => console.error('Error fetching video:', error));
  }, [videoId]);

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div className="watch-container">
      <h1>{video.title}</h1>
      <div className="video-player">
        <iframe
          width="800"
          height="450"
          src={video.videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="video-details">
        <p>{video.description}</p>
        <p>By {video.creator}</p>
      </div>
    </div>
  );
}

export default Watch;
