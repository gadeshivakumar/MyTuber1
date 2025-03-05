import React from 'react';
    import './Upload.css';

    function Upload() {
      return (
        <div className="upload-container">
          <h2>Upload Video</h2>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name="title" required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" rows="4"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="video">Video File:</label>
              <input type="file" id="video" name="video" accept="video/*" required />
            </div>
            <div className="form-group">
              <label htmlFor="thumbnail">Thumbnail:</label>
              <input type="file" id="thumbnail" name="thumbnail" accept="image/*" required />
            </div>
            <button type="submit">Upload</button>
          </form>
        </div>
      );
    }

    export default Upload;
