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
        <Link href="/top100Video">
          <h3>TOP100</h3>
        </Link>
        <Link href="/top100Video">
          <button>
            더보기
            <AiOutlineRight className={styles.icon} />
          </button>
        </Link>
      </div>
      <div>
        {top100VideoList.slice(0, 5).map((element, index) => {
          return (
            <div key={element.id} className={styles.top100}>
              <div className={styles.top100_ranking}>{index + 1}</div>
              <div className={classnames(styles.top100_img, styles.video_img)}>
                <img src={element.videoUrl} alt={element.videoTitle} />
                <span>{(element.videoLength / 3600).toFixed(2)}</span>
              </div>
              <div
                className={classnames(styles.top100_info, styles.video_info)}
              >
                <p>{element.videoTitle}</p>
                <Link href={`/search?query=${element.userName}&type=channels`}>
                  <p>{element.userName}</p>
                </Link>
                <p>
                  <AiOutlinePlayCircle className={styles.icon} />
                  {element.views}
                  <span>
                    <AiOutlineHeart className={styles.icon} />
                  </span>
                  {element.like}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {top100VideoList.slice(5, 10).map((element, index) => {
          return (
            <div key={element.id} className={styles.top100}>
              <div className={styles.top100_ranking}>{index + 6}</div>
              <div className={classnames(styles.top100_img, styles.video_img)}>
                <img src={element.videoUrl} alt={`${element.videoTitle}`} />
                <span>{(element.videoLength / 3600).toFixed(2)}</span>
              </div>
              <div
                className={classnames(styles.top100_info, styles.video_info)}
              >
                <p>{element.videoTitle}</p>
                <Link href={`/search?query=${element.userName}&type=channels`}>
                  <p>{element.userName}</p>
                </Link>
                <p>
                  <AiOutlinePlayCircle className={styles.icon} />
                  {element.views}
                  <span>
                    <AiOutlineHeart className={styles.icon} />
                  </span>
                  {element.like}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Top100Section;
