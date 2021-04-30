import { useEffect, useCallback } from 'react';
import styles from '@/styles/layout/search.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { loadSearchVideos } from '@/lib/action/video';
import { loadSearchUser } from '@/lib/action/user';
import PropTypes from 'prop-types';
import { AiOutlineHeart, AiOutlinePlayCircle } from 'react-icons/ai';

const ChannelsList = ({ onClickVideo, onClickChannel }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { searchChannels } = useSelector((state) => state.user);
  const { searchVideoList } = useSelector((state) => state.video);
  const { query } = router.query;
  console.log(searchVideoList[0].videoImg);

  useEffect(() => {
    // dispatch(loadSearchVideos());
    // dispatch(loadSearchUser());
  }, []);
  return (
    <>
      <div className={styles.list_container}>
        <div className={classnames(styles.list_box, styles.margin_top)}>
          <div className={styles.list_header}>
            <h2>
              <strong>채널</strong>
              <em> {searchChannels.length} </em>
            </h2>
            <Link href={`/search?query=${query}&type=channels`}>
              <a className={classnames(styles.link, styles.moreList)}>
                {' '}
                더보기 {'>'}
              </a>
            </Link>
          </div>
          <div className={styles.list_content}>
            {searchChannels.slice(0, 6).map((element) => {
              return (
                <div
                  className={styles.search_content}
                  onClick={() => onClickChannel(element.id)}
                >
                  <img
                    src={element.userImg}
                    alt="userImg"
                    className={styles.user_img}
                  />
                  <Link href="/">{element.userName}</Link>
                  <div>
                    <span>동영상 {element.videoCount}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.list_box}>
          <div className={styles.list_header}>
            <h2>
              <strong>동영상</strong>
              <em> {searchVideoList.length} </em>
            </h2>
            <Link href={`/search?query=${query}&type=videos`}>
              <a className={classnames(styles.link, styles.moreList)}>
                {' '}
                더보기 {'>'}
              </a>
            </Link>
          </div>
          <div className={styles.list_content}>
            {searchVideoList.slice(0, 20).map((element) => {
              return (
                <div className={styles.search_videobox}>
                  <img
                    src={element.videoImg}
                    alt="userImg"
                    onClick={() => onClickVideo(element.id)}
                  />

                  <div className={styles.search_videodetail}>
                    <span
                      className={styles.title}
                      onClick={() => onClickVideo(element.id)}
                    >
                      {element.videoTitle}
                    </span>
                    <Link
                      href={`/user/${element.userId}`}
                      className={styles.video_username}
                    >
                      {element.userName}
                    </Link>

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
      </div>
    </>
  );
};

ChannelsList.prototype = {
  onClickVideo: PropTypes.func.isRequired,
  onClickChannel: PropTypes.func.isRequired,
};
export default ChannelsList;
