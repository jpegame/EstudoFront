import React from 'react';
import YouTube from 'react-youtube';

const MusicPlayer = ({ videoId, playing }) => {
  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      loop: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} playing={playing} />;
};

export default MusicPlayer;
