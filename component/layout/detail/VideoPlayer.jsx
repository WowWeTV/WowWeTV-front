import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styles from '@/styles/layout/detail.module.scss';

const VideoPlayer = () => {
  const router = useRouter();
  const { singleVideo } = useSelector((state) => state.video);
  const {
    id,
    videoTitle,
    userName,
    videoUrl,
    videoLength,
    videoDesc,
    views,
    like,
    tag,
  } = singleVideo;

  return (
    <div className={styles.player}>
      <img src={videoUrl} alt="" />
    </div>
  );
};

export default VideoPlayer;
