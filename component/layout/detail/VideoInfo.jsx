import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import numeral from 'numeral';
import styles from '@/styles/layout/detail.module.scss';
import Modal from '../../common/Modal';
import {
  AiOutlineDown,
  AiOutlineHeart,
  AiOutlineLink,
  AiOutlineMessage,
  AiOutlineUp,
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
  const [descText, setDescText] = useState(false);
  const [urlModal, setUrlModal] = useState(false);
  // const [videoLike, setVideoLike] = useState(likes);

  const onToggleDesc = useCallback(() => {
    setDescText(!descText);
  }, [descText]);
  const onHandleModal = useCallback(() => {
    setUrlModal(!urlModal);
  }, [urlModal]);

  return (
    <div className={styles.video_container}>
      <div className={styles.video_top}>
        <Link href={`/search?query=${userName}&type=channels`}>
          <div className={styles.title}>
            <div className={styles.user_img}>
              <img src={userImg} alt={userName} />
            </div>
            <p className={styles.user_name}>{userName}</p>
          </div>
        </Link>
        <div className={styles.player}>
          <img src={videoUrl} alt="video" />
        </div>
      </div>
      <div className={styles.info_container}>
        <div className={styles.video_info}>
          <div className={styles.tags_list}>
            <ul>
              {tags.map((tag) => (
                <li key={tag}>
                  <Link href={`/search?query=${tag}`}>{`#${tag}`}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.video_summary}>
            <div className={styles.title}>
              <h4>{videoTitle}</h4>
              <button onClick={onToggleDesc}>
                {descText ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
            </div>
            <div className={styles.views_date}>
              <span className={styles.views}>
                재생 수 {numeral(views).format(0, 0)}
              </span>
              <span
                className={styles.date}
              >{`${createDate.toLocaleString().substr(0, 12)}`}</span>
            </div>
            <div className={styles.likes_comments}>
              <span className={styles.likes}>
                <AiOutlineHeart className={styles.icon} />
                {likes}
              </span>
              <span className={styles.comments}>
                <a href="#comment">
                  <AiOutlineMessage className={styles.icon} />
                  {comments.length}
                </a>
              </span>
              <span className={styles.link} onClick={onHandleModal}>
                <AiOutlineLink />
              </span>
              {urlModal && (
                <Modal
                  onHandleModal={onHandleModal}
                  header="공유"
                  contentHeader="영상 링크를 복사하시겠습니까?"
                  contentText={videoUrl}
                  copyBtn="복 사"
                />
              )}
            </div>
          </div>
          {descText && <div className={styles.video_desc}>{videoDesc}</div>}
        </div>
        <Link href={`/search?query=${userName}&type=channels`}>
          <div className={styles.user_info}>
            <div className={styles.user_img}>
              <img src={userImg} alt={userName} />
            </div>
            <p className={styles.user_name}>{userName}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VideoInfo;
