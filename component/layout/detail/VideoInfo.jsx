import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addView, addLike, removeLike } from '@/lib/action/video';
import classnames from 'classnames';
import numeral from 'numeral';
import { ReactVideo } from 'reactjs-media';
import styles from '@/styles/layout/detail.module.scss';
import Modal from '@/component/common/Modal';
import {
  AiFillHeart,
  AiOutlineDown,
  AiOutlineHeart,
  AiOutlineLink,
  AiOutlineMessage,
  AiOutlineUp,
} from 'react-icons/ai';

const VideoInfo = () => {
  const { singleVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
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
  const [fixed, setFixed] = useState(false);
  const [pageY, setPageY] = useState(0);
  const [descText, setDescText] = useState(false);
  const [urlModal, setUrlModal] = useState(false);
  const [videoLike, setVideoLike] = useState(false);

  // 영상 조회 수 증가
  useEffect(() => {
    // dispatch(addView());
  }, []);
  // 스크롤 이벤트
  const handleScroll = useCallback(() => {
    const { pageYOffset } = window;
    if (pageYOffset >= 42) {
      setFixed(true);
    } else {
      setFixed(false);
    }
    setPageY(pageYOffset);
  }, [fixed, pageY]);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageY]);
  // 좋아요 클릭
  const onAddLike = () => {
    setVideoLike(!videoLike);
    if (videoLike) {
      dispatch(removeLike());
    } else {
      dispatch(addLike());
    }
  };
  // 영상 설명
  const onToggleDesc = useCallback(() => {
    setDescText(!descText);
  }, [descText]);
  // 영상 링크 모달
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
        <div
          className={
            fixed
              ? classnames(styles.player, styles.player_fixed)
              : styles.player
          }
        >
          <ReactVideo
            className={styles.video}
            src="/videos/sample.mp4"
            poster="/images/sample.jpg"
            primaryColor="#4c6ef5"
            autoPlay
          />
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
              <button className={styles.desc_btn} onClick={onToggleDesc}>
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
              <span className={styles.likes} onClick={onAddLike}>
                {videoLike ? (
                  <AiFillHeart
                    className={classnames(styles.clicked_likes, styles.icon)}
                  />
                ) : (
                  <AiOutlineHeart className={styles.icon} />
                )}
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
          {descText && (
            <div className={classnames(styles.mobile_desc, styles.video_desc)}>
              {videoDesc}
            </div>
          )}
          <div className={classnames(styles.desktop_desc, styles.video_desc)}>
            {videoDesc}
          </div>
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
