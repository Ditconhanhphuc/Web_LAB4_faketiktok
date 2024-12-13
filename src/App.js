import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';

const videoUrls = [
  {
    url: require("./videos/video1.mp4"),
    profilePic: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/9d429ac49d6d18de6ebd2a3fb1f39269~c5_100x100.jpeg?x-expires=1688479200&x-signature=pjH5pwSS8Sg1dJqbB1GdCLXH6ew%3D',
    username: 'csjackie',
    description: 'Lol nvm #compsci #chatgpt #ai #openai #techtok',
    song: 'Original sound - Famed Flames',
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require("./videos/video2.mp4"),
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eace3ee69abac57c39178451800db9d5~c5_100x100.jpeg?x-expires=1688479200&x-signature=wAkVmwL7lej15%2B16ypSWQOqTP8s%3D',
    username: 'dailydotdev',
    description: 'Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require("./videos/video3.mp4"),
    profilePic: 'https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4e6698b235eadcd5d989a665704daf68~c5_100x100.jpeg?x-expires=1688479200&x-signature=wkwHDKfNuIDqIVHNm29%2FRf40R3w%3D',
    username: 'wojciechtrefon',
    description: '#programming #softwareengineer #vscode #programmerhumor #programmingmemes',
    song: 'help so many people are using my sound - Ezra',
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require("./videos/video4.mp4"),
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg?x-expires=1688486400&x-signature=ssUbbCpZFJj6uj33D%2BgtcqxMvgQ%3D',
    username: 'faruktutkus',
    description: 'Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ',
    song: 'orijinal ses - Computer Science',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const videoRefs = useRef([]);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    setVideos(videoUrls);
    setFilteredVideos(videoUrls); // Initially show all videos
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter') {
      const hashtag = searchQuery.trim().toLowerCase();
      if (hashtag.startsWith('#')) {
        // If the search query starts with a hashtag, search for the hashtag in the description
        const filtered = videos.filter((video) =>
          video.description.toLowerCase().includes(hashtag)
        );
        setFilteredVideos(filtered);
      } else {
        // If it's just a regular search term, fallback to searching within descriptions
        const filtered = videos.filter((video) =>
          video.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredVideos(filtered);
      }
    }
  };

  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.pageY - containerRef.current.offsetTop);
    setScrollTop(containerRef.current.scrollTop);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const y = e.pageY - containerRef.current.offsetTop;
    const walk = (y - startY) * 2; // Scroll speed multiplier
    containerRef.current.scrollTop = scrollTop - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    // Snap to nearest video
    if (containerRef.current) {
      const videoHeight = window.innerHeight;
      const currentScroll = containerRef.current.scrollTop;
      const nearestVideo =
        Math.round(currentScroll / videoHeight) * videoHeight;

      containerRef.current.scrollTo({
        top: nearestVideo,
        behavior: "smooth",
      });
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();

    const videoHeight = window.innerHeight;
    const currentScroll = containerRef.current.scrollTop;
    const direction = e.deltaY > 0 ? 1 : -1;

    const nextPosition =
      direction > 0
        ? Math.ceil(currentScroll / videoHeight) * videoHeight
        : Math.floor(currentScroll / videoHeight) * videoHeight;

    containerRef.current.scrollTo({
      top: nextPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="app">
      <div className="container" ref={containerRef} onWheel={handleWheel}>
        <TopNavbar
          setSearchQuery={setSearchQuery} // Directly update searchQuery in App
          searchQuery={searchQuery}
          handleSearchSubmit={handleSearchSubmit} // Add a submit function for Enter key
        />
        {filteredVideos.map((video, index) => (
          <VideoCard
            key={index}
            username={video.username}
            description={video.description}
            song={video.song}
            likes={video.likes}
            saves={video.saves}
            comments={video.comments}
            shares={video.shares}
            url={video.url}
            profilePic={video.profilePic}
            setVideoRef={handleVideoRef(index)} // Ref for each video
          />
        ))}
        <BottomNavbar />
      </div>
    </div>
  );
}

export default App;
