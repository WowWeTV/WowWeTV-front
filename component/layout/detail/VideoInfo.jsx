import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import numeral from 'numeral';
import styles from '@/styles/layout/detail.module.scss';
import {
  AiOutlineDown,
  AiOutlineHeart,
  AiOutlineLink,
  AiOutlineMessage,
} from 'react-icons/ai';

const VideoInfo = () => {
  const { singleVideo } = useSelector((state) => state.video);
  const {
    id,
    videoTitle,
    userImg,
    userName,
    videoUrl,
    videoLength,
    videoDesc,
    views,
    likes,
    tags,
    createDate,
    comments,
  } = singleVideo;

  return (
    <div className={styles.info_container}>
      <div className={styles.video_info}>
        <div className={styles.tags_list}>
          <ul>
            {tags.map((tag) => (
              <li key={tag}>
                <Link href="">{`#${tag}`}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.video_summary}>
          <div className={styles.title}>
            <h4>{videoTitle}</h4>
            <button>
              <AiOutlineDown />
            </button>
          </div>
          <div className={styles.views_date}>
            <span className={styles.views}>
              재생 수 {numeral(views).format(0, 0)}
            </span>
            <span
              className={styles.date}
            >{`${createDate.toLocaleString()}`}</span>
          </div>
          <div className={styles.likes_comments}>
            <span className={styles.likes}>
              <AiOutlineHeart className={styles.icon} />
              {likes}
            </span>
            <span className={styles.comments}>
              <AiOutlineMessage className={styles.icon} />
              {comments}
            </span>
            <span className={styles.link}>
              <AiOutlineLink />
            </span>
          </div>
        </div>
        <div className={styles.video_desc}>{videoDesc}</div>
      </div>
      <Link href="/">
        <div className={styles.user_info}>
          <div className={styles.user_img}>
            <img src={userImg} alt={userName} />
          </div>
          <p className={styles.user_name}>{userName}</p>
        </div>
      </Link>
    </div>
  );
};

export default VideoInfo;
