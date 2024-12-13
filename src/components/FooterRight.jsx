import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faCircleCheck,
  faHeart,
  faCommentDots,
  faBookmark,
  faShare,
  faVolumeMute,
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons';
import './FooterRight.css';

function FooterRight({ likes, comments, saves, shares, profilePic, videoUrl }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);
  const [muted, setMuted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleMuteClick = () => {
    setMuted(!muted);
  };

  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => {
      setUserAddIcon(null);
    }, 3000); // Icon reverts after 3 seconds
  };

  const handleLikeClick = () => {
    setLiked(!liked);
  };


  const parseLikesCount = (count) => {
    if (typeof count === 'string' && count.endsWith('K')) {
      return parseFloat(count) * 1000;
    }
    return parseInt(count, 10) || count;
  };

  const formatLikesCount = (count) => {
    if (count >= 10000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count;
  };

  const handleShareClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSaveClick = () => {
    setSaved((prev) => {
      if (!prev) {
        navigator.clipboard
          .writeText(videoUrl)
          .then(() => {
            alert("Video link is copied to clipboard!");
          })
          .catch((err) => {
            console.error("Failed to copy video link:", err);
          });
      }
      return !prev;
    });
  };

  return (
    <div className="footer-right">
      <div className="sidebar-icon mute">
        {/* Mute/Unmute icon */}
        <FontAwesomeIcon
          icon={muted ? faVolumeMute : faVolumeUp}
          style={{ width: '35px', height: '35px', color: 'white' }}
          onClick={handleMuteClick}
        />
      </div>
      <div className="sidebar-icon">
        {/* Displaying the user profile picture */}
        {profilePic ? (
          <img
            src="/profilePic.JPG"
            className="userprofile"
            alt="Profile"
            style={{ width: '45px', height: '45px', color: '#616161', objectFit: 'cover' }}
          />
        ) : null}
        {/* User add/follow icon */}
        <FontAwesomeIcon
          icon={userAddIcon}
          className="useradd"
          style={{ width: '15px', height: '15px', color: '#FF0000' }}
          onClick={handleUserAddClick}
        />
      </div>

      <div className="sidebar-icon">
        {/* Heart icon for liking */}
        <FontAwesomeIcon
          icon={faHeart}
          style={{ width: '35px', height: '35px', color: liked ? '#FF0000' : 'white' }}
          onClick={handleLikeClick}
        />
        {/* Displaying the formatted likes count */}
        <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
      </div>

      <div className="sidebar-icon">
        {/* Comment icon */}
        <FontAwesomeIcon
          icon={faCommentDots}
          style={{ width: '35px', height: '35px', color: 'white' }}
        />
        <p>{comments}</p>
      </div>

      <div className="sidebar-icon">
        {/* Bookmark icon for saving */}
        <FontAwesomeIcon
          icon={faBookmark}
          style={{ width: '35px', height: '35px', color: saved ? '#ffc107' : 'white' }}
          // onClick={() => setSaved(!saved)}
          onClick={handleSaveClick}
        />
        <p>{saved ? saves + 1 : saves}</p>
      </div>

      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faShare}
          style={{ width: '35px', height: '35px', color: 'white' }}
          onClick={handleShareClick}
        />
        <p>{shares}</p>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-popup" onClick={handleClosePopup}>
              ×
            </button>
            <p>Share on:</p>
            <ul className="share-list">
              <li className="share-item">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png"
                  alt="Facebook"
                  className="share-icon"
                />
                Facebook
              </li>
              <li className="share-item">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png"
                  alt="Instagram"
                  className="share-icon"
                />
                Instagram
              </li>
              <li className="share-item">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Threads_%28app%29.svg/2048px-Threads_%28app%29.svg.png"
                  alt="Threads"
                  className="share-icon"
                />
                Threads
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className="sidebar-icon record">
        {/* Record icon */}
        <img
          src="https://static.thenounproject.com/png/934821-200.png"
          alt="Record Icon"
          style={{ width: '35px', height: '35px' }}
        />
      </div>
    </div>
  );
}

export default FooterRight;


