import React from 'react';
import { useSelector } from 'react-redux';

const VideoComment = () => {
  const { recommendedVideoList } = useSelector((state) => state.video);

  return <div />;
};

export default VideoComment;
