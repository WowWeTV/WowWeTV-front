import React from 'react';
import styles from '@/styles/layout/detail.module.scss';
import VideoPlayer from './VideoPlayer';
import VideoInfo from './VideoInfo';
import Recommend from './Recommend';
import VideoComment from './VideoComment';

const DetailLayout = () => {
  return (
    <div className={styles.detail_container}>
      <VideoPlayer />
      <VideoInfo />
      <Recommend />
      <VideoComment />
    </div>
  );
};

export default DetailLayout;
