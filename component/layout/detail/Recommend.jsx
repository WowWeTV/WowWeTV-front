import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import styles from '@/styles/layout/detail.module.scss';
import {
  AiOutlineHeart,
  AiOutlineMore,
  AiOutlinePlayCircle,
} from 'react-icons/ai';

const Recommend = () => {
  const { recommendedVideoList } = useSelector((state) => state.video);

  return (
    <div className={styles.recommend_container}>
      <div className={styles.title}>
        <h4>추천 동영상</h4>
      </div>
      <div className={styles.recommend_list}>
        <ul>
          {recommendedVideoList.map((video) => {
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
              <div key={id} className={styles.recommend}>
                <div
                  className={classnames(styles.recommend_img, styles.video_img)}
                >
                  <img src={videoUrl} alt={videoTitle} />
                  <span>{(videoLength / 3600).toFixed(2)}</span>
                </div>
                <div
                  className={classnames(
                    styles.recommend_info,
                    styles.video_info,
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
                <div className={styles.more}>
                  <AiOutlineMore />
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Recommend;
