import React, { useState, useEffect } from 'react';
    import { useParams } from 'react-router-dom';
    import './Watch.css';

    function Watch() {
      const { videoId } = useParams();
      const [video, setVideo] = useState(null);

      useEffect(() => {
        // In a real application, you would fetch video details from a backend API
        // For this example, we'll use some hardcoded data
        const sampleVideos = [
          { id: '1', title: 'Sample Video 1', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'This is a sample video description.', creator: 'Creator 1' },
          { id: '2', title: 'Sample Video 2', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'This is another sample video description.', creator: 'Creator 2' },
          { id: '3', title: 'Sample Video 3', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Yet another sample video description.', creator: 'Creator 3' },
        ];
        const foundVideo = sampleVideos.find(v => v.id === videoId);
        setVideo(foundVideo);
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
