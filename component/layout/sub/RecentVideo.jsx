import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import styles from '@/styles/layout/sub.module.scss';
import { AiOutlineHeart, AiOutlinePlayCircle } from 'react-icons/ai';

const RecentVideo = () => {
  const { recentVideoList } = useSelector((state) => state.video);

  return (
    <div className={styles.video_list_container}>
      <div className={classnames(styles.video_list, styles.top_videos)}>
        <div className={styles.top_videos_inner}>
          {recentVideoList.slice(0, 3).map((video) => {
            const {
              id,
              videoUrl,
              userName,
              videoTitle,
              videoLength,
              views,
              likes,
            } = video;
            return (
              <Link href={`/detail/${id}`}>
                <div key={id} className={styles.video}>
                  <div className={styles.video_img}>
                    <img src={videoUrl} alt={videoTitle} />
                    <span>{(videoLength / 3600).toFixed(2)}</span>
                  </div>
                  <div
                    className={classnames(
                      styles.video_info,
                      styles.recent_info,
                    )}
                  >
                    <p>{videoTitle}</p>
                    <Link href={`/search?query=${userName}&type=channels`}>
                      <p>{userName}</p>
                    </Link>
                    <p>
                      <AiOutlinePlayCircle className={styles.icon} />
                      {views}
                      <span>
                        <AiOutlineHeart className={styles.icon} />
                      </span>
                      {likes}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className={styles.video_list}>
        {recentVideoList.slice(3, 50).map((video) => {
          const {
            id,
            videoUrl,
            userName,
            videoTitle,
            videoLength,
            views,
            likes,
          } = video;
          return (
            <Link href={`/detail/${id}`}>
              <div key={id} className={styles.video}>
                <div className={styles.video_img}>
                  <img src={videoUrl} alt={videoTitle} />
                  <span>{(videoLength / 3600).toFixed(2)}</span>
                </div>
                <div
                  className={classnames(styles.video_info, styles.recent_info)}
                >
                  <p>{videoTitle}</p>
                  <Link href={`/search?query=${userName}&type=channels`}>
                    <p>{userName}</p>
                  </Link>
                  <p>
                    <AiOutlinePlayCircle className={styles.icon} />
                    {views}
                    <span>
                      <AiOutlineHeart className={styles.icon} />
                    </span>
                    {likes}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecentVideo;
