import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addView, addLike, removeLike, loadVideo } from '@/lib/action/video';
import classnames from 'classnames';
import moment from 'moment';
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
  const { singleVideo, aVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const { userImg, userName, views, tags, comments } = singleVideo; // 추후 삭제
  const [fixed, setFixed] = useState(false);
  const [pageY, setPageY] = useState(0);
  const [showDesc, setShowDesc] = useState(false);
  const [urlModal, setUrlModal] = useState(false);
  const [videoLike, setVideoLike] = useState(false);

  useEffect(() => {
    dispatch(loadVideo(151)) // 추후 151에서 videoId로 수정 필요
      .then((response) => {
        if (response.payload.success) {
          console.log(response.payload);
        } else {
          console.error(response.payload.message);
        }
      })
      .catch((err) => console.error(err));
    // dispatch(addView(151));
  }, []);
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
  // 에러 수정 후 재확인
  const onAddLike = () => {
    setVideoLike(!videoLike);
    if (videoLike) {
      dispatch(removeLike(151))
        .then((response) => console.log(response.payload))
        .catch((err) => console.error(err));
    } else {
      dispatch(addLike(151))
        .then((response) => console.log(response.payload))
        .catch((err) => console.error(err));
    }
  };
  const onToggleDesc = useCallback(() => {
    setShowDesc(!showDesc);
  }, [showDesc]);
  const onHandleModal = useCallback(() => {
    setUrlModal(!urlModal);
  }, [urlModal]);
  // const onShareUrl = () => {
  //   if (navigator.share) {
  //     navigator
  //       .share({
  //         title: '영상 링크를 복사하시겠습니까?',
  //         url: fileUrl,
  //       })
  //       .then(() => {
  //         console.log('Success sharing');
  //       })
  //       .catch((error) => console.log('Error sharing', error));
  //   }
  // };

  const {
    videoId,
    fileUrl,
    title,
    description,
    thumnailImg,
    createdDate,
    likes,
    userDto,
  } = aVideo;

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
            src={fileUrl}
            poster={thumnailImg}
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
              <h4>{title || '저장된 제목이 없습니다'}</h4>
              <button className={styles.desc_btn} onClick={onToggleDesc}>
                {showDesc ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
            </div>
            <div className={styles.views_date}>
              <span className={styles.views}>
                재생 수 {numeral(views).format(0, 0)}
              </span>
              <span className={styles.date}>
                {moment(createdDate).format('YYYY. M. D.')}
              </span>
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
                  contentText={fileUrl}
                  copyBtn="복 사"
                />
              )}
            </div>
          </div>
          {showDesc && (
            <div className={classnames(styles.mobile_desc, styles.video_desc)}>
              {description || '저장된 설명이 없습니다.'}
            </div>
          )}
          <div className={classnames(styles.desktop_desc, styles.video_desc)}>
            {description || '저장된 설명이 없습니다.'}
          </div>
        </div>
        <div className={styles.user_info}>
          <Link href={`/search?query=${userName}&type=channels`}>
            <>
              <div className={styles.user_img}>
                <img src={userImg} alt={userName} />
              </div>
              <p className={styles.user_name}>{userName}</p>
            </>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
