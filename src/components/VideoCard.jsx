import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import VideoInfo from './VideoInfo';
import './VideoCard.css';

const VideoCard = (props) => {
  const {
    url,
    username,
    description,
    song,
    likes,
    shares,
    comments,
    saves,
    profilePic,
    setVideoRef,
    autoplay,
    onNextVideo,
    onPreviousVideo,
  } = props;

  const [hasInteracted, setHasInteracted] = useState(false);
  const videoRef = useRef(null);
  const [showInfo, setShowInfo] = useState(false);

  // useEffect(() => {
  //   if (autoplay) {
  //     videoRef.current.play();
  //   }
  // }, [autoplay]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      if (autoplay) {
        videoRef.current.play().catch(error => {
          console.log("Playback failed:", error);
        });
      }
    }
  }, [autoplay, hasInteracted]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' && !showInfo) {
        setShowInfo(true);
      } else if (e.key === 'ArrowLeft' && showInfo) {
        setShowInfo(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showInfo]);

  const onVideoPress = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };
  const handleCloseInfo = () => {
    setShowInfo(false);
  };

  // // Scroll event handler
  // const handleScroll = (e) => {
  //   const deltaY = e.deltaY;

  //   if (deltaY > 0) {
  //     // Scroll down -> Next video
  //     onNextVideo();
  //   } else if (deltaY < 0) {
  //     // Scroll up -> Previous video
  //     onPreviousVideo();
  //   }
  // };

  // useEffect(() => {
  //   const container = videoRef.current?.parentElement;

  //   if (container) {
  //     container.addEventListener('wheel', handleScroll);

  //     return () => {
  //       container.removeEventListener('wheel', handleScroll);
  //     };
  //   }
  // }, []);

  return (
    <div className="video">
      <video
        className="player"
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        src={url}
      />
      <div className="bottom-controls">
        <div className="footer-left">
          <FooterLeft username={username} description={description} song={song} />
        </div>
        <div className="footer-right">
          <FooterRight
            likes={likes}
            comments={comments}
            saves={saves}
            shares={shares}
            profilePic={profilePic}
            videoUrl={url}
          />
        </div>
      </div>
      <VideoInfo
        isVisible={showInfo}
        videoData={{
          username,
          description,
          likes,
          comments,
          shares,
          profilePic
        }}
        onClose={handleCloseInfo}
      />
    </div>
  );
};

export default VideoCard;
