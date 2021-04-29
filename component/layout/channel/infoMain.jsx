import styles from '@/styles/layout/channel.module.scss';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classnames from 'classnames';
import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { AiOutlineHeart, AiOutlinePlayCircle } from 'react-icons/ai';

const InfoMain = ({ onClickVideo }) => {
  const router = useRouter();
  const { userId, type } = router.query;
  const { userVideoList } = useSelector((state) => state.video);

  return (
    <>
      <div className={styles.list_box}>
        <div className={styles.list_more}>
          <h3 className={styles.h3_font}>
            {' '}
            {userVideoList[0].userName} 님의 영상
          </h3>

          <div className={styles.pc_btn}>
            <Link href={`/user/${userId}?type=videos`}>
              <button style={{ float: 'right' }}>
                {' '}
                {userVideoList.length}개의 동영상 더보기 {'>'}
              </button>
            </Link>
          </div>
          <div className={styles.mobile_btn}>
            <Link href={`/user/${userId}?type=videos`}>
              <button className={styles.list_more_btn}>{'>'}</button>
            </Link>
          </div>
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

InfoMain.prototype = {
  onClickVideo: PropTypes.func.isRequired,
};

export default InfoMain;
