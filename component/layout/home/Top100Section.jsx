import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import classnames from 'classnames';
import styles from '@/styles/main.module.scss';
import {
  AiOutlineHeart,
  AiOutlinePlayCircle,
  AiOutlineRight,
} from 'react-icons/ai';

const Top100Section = () => {
  const { top100VideoList } = useSelector((state) => state.video);

  return (
    <section className={styles.top100_container}>
      <div className={styles.section_title}>
        <Link href="/sub?type=top100">
          <h3>TOP100</h3>
        </Link>
        <Link href="/sub?type=top100">
          <button>
            더보기
            <AiOutlineRight className={styles.icon} />
          </button>
        </Link>
      </div>
      <div>
        {top100VideoList.slice(0, 5).map((video, index) => {
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
              <div key={id} className={styles.top100}>
                <div className={styles.top100_ranking}>{index + 1}</div>
                <div
                  className={classnames(styles.top100_img, styles.video_img)}
                >
                  <img src={videoUrl} alt={videoTitle} />
                  <span>{(videoLength / 3600).toFixed(2)}</span>
                </div>
                <div
                  className={classnames(styles.top100_info, styles.video_info)}
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
      <div>
        {top100VideoList.slice(5, 10).map((video, index) => {
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
              <div key={id} className={styles.top100}>
                <div className={styles.top100_ranking}>{index + 6}</div>
                <div
                  className={classnames(styles.top100_img, styles.video_img)}
                >
                  <img src={videoUrl} alt={`${videoTitle}`} />
                  <span>{(videoLength / 3600).toFixed(2)}</span>
                </div>
                <div
                  className={classnames(styles.top100_info, styles.video_info)}
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
    </section>
  );
};

export default Top100Section;
