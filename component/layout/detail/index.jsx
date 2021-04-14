import React from 'react';
import styles from '@/styles/layout/detail.module.scss';
import VideoInfo from './VideoInfo';
import Recommend from './Recommend';
import VideoComment from './VideoComment';

const DetailLayout = () => {
  return (
    <div className={styles.detail_container}>
      <VideoInfo />
      <Recommend />
      <VideoComment />
    </div>
  );
};

export default DetailLayout;
