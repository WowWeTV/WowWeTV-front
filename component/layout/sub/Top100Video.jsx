import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import styles from '@/styles/layout/sub.module.scss';
import { AiOutlineHeart, AiOutlinePlayCircle } from 'react-icons/ai';

const Top100Video = () => {
  const { top100VideoList } = useSelector((state) => state.video);

  return (
    <div className={styles.video_list_container}>
      <div className={classnames(styles.video_list, styles.top_videos)}>
        <div className={styles.top_videos_inner}>
          {top100VideoList.slice(0, 3).map((video, index) => {
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
                  <div className={styles.mobile_video_ranking}>{index + 1}</div>
                  <div className={styles.video_img}>
                    <img src={videoUrl} alt={videoTitle} />
                    <span>{(videoLength / 3600).toFixed(2)}</span>
                  </div>
                  <div className={styles.video_ranking}>{index + 1}</div>
                  <div className={styles.video_info}>
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
        {top100VideoList.slice(3, 100).map((video, index) => {
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
                <div className={styles.mobile_video_ranking}>{index + 4}</div>
                <div className={styles.video_img}>
                  <img src={videoUrl} alt={videoTitle} />
                  <span>{(videoLength / 3600).toFixed(2)}</span>
                </div>
                <div className={styles.video_ranking}>{index + 4}</div>
                <div className={styles.video_info}>
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

export default Top100Video;
