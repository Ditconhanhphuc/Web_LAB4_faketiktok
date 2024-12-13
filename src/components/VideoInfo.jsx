import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './VideoInfo.css';

const VideoDetails = ({ isVisible, videoData, onClose }) => {
  const handleBackClick = () => {
    window.dispatchEvent(new CustomEvent('closeAllVideoDetails'));
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={`details-container ${isVisible ? 'show' : ''}`}>
      <div className="details-header">
        <FontAwesomeIcon 
          icon={faArrowLeft} 
          className="back-icon"
          onClick={handleBackClick}
        />
        <h2>Video Information</h2>
      </div>
      
      <div className="details-content">
        <div className="user-header">
          <img src="/profilePic.JPG" alt="User" className="user-avatar" />
          <h3>@{videoData.username}</h3>
        </div>
        
        <div className="upload-stats">
          <div className="stat-item">
            <FontAwesomeIcon icon={faCalendar} />
            <span>Upload: Today</span>
          </div>
        </div>

        <div className="video-description">
          <p>{videoData.description}</p>
        </div>

        <div className="hashtags-section">
          {videoData.description.match(/#\w+/g)?.map((tag, index) => (
            <span key={index} className="hashtag-item">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;