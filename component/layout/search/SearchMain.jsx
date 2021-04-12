import styles from '@/styles/layout/search.module.scss';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames';

const ChannelsList = () => {
  const router = useRouter();

  const { searchChannels } = useSelector((state) => state.user);
  const { searchVideoList } = useSelector((state) => state.video);
  const { query } = router.query;

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
                <div className={styles.search_content}>
                  <img src={element.userImg} alt="userImg" />
                  <br />
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
                  <img src={element.videoUrl} alt="userImg" />
                  <div className={styles.search_videodetail}>
                    <span className={styles.title}>{element.videoTitle}</span>

                    <Link href="/" className={styles.video_username}>
                      {element.userName}
                    </Link>
                    <div>
                      <span>👁️ {element.views}</span>
                      <span> 💙 {element.like}</span>
                      {/* <span>{element.videoLength}</span> */}
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

export default ChannelsList;
