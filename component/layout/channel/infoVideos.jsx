import React, { useState } from 'react';
import styles from '@/styles/layout/channel.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { loadMoreUserVideo } from '@/lib/action/video';
import {
  AiOutlineHeart,
  AiOutlinePlayCircle,
  AiOutlineCheck,
} from 'react-icons/ai';

import Moment from 'react-moment';
import PropTypes from 'prop-types';

const InfoVideos = ({ onClickVideo }) => {
  const router = useRouter();
  const { userId, type } = router.query;
  const { userVideoList } = useSelector((state) => state.video);

  const dispatch = useDispatch();

  const [sortType, setsortType] = useState('recent');

  const onClickSort = (e) => {
    const selectedSort = e.target.getAttribute('data-sort');
    setsortType(selectedSort);

    // dispatch(loadMoreUserVideo({ sort: selectedSort ,offset,limit}));
  };
  return (
    <>
      <div className={styles.list_box}>
        <div className={styles.sort_menu}>
          <ul>
            <li
              data-sort="recent"
              onClick={onClickSort}
              className={classNames({
                [`${styles.selected}`]: sortType === 'recent',
              })}
            >
              <AiOutlineCheck /> 최신
            </li>
            <li
              data-sort="views"
              onClick={onClickSort}
              className={classNames({
                [`${styles.selected}`]: sortType === 'views',
              })}
            >
              <AiOutlineCheck /> 재생수
            </li>
            <li
              data-sort="like"
              onClick={onClickSort}
              className={classNames({
                [`${styles.selected}`]: sortType === 'like',
              })}
            >
              <AiOutlineCheck /> 좋아요
            </li>
          </ul>
        </div>
        <div className={styles.list_content}>
          {userVideoList.slice(0, 20).map((element) => {
            return (
              <div
                className={styles.search_videobox}
                onClick={() => onClickVideo(element.id)}
              >
                <div className={styles.video_img_box}>
                  <img src={element.vidoeImg} alt="userImg" />
                  <span className={styles.img_len}>
                    {(element.videoLength / 3600).toFixed(2)}
                  </span>
                </div>

                <div className={styles.search_videodetail}>
                  <span className={styles.title}>{element.videoTitle}</span>

                  <div className={styles.video_views}>
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
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
InfoVideos.prototype = {
  onClickVideo: PropTypes.func.isRequired,
};

export default InfoVideos;
