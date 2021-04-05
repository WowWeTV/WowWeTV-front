import styles from '@/styles/search.module.scss';
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
      <div className={styles.listContainer}>
        <div className={classnames(styles.listBox, styles.margin_top)}>
          <div className={styles.listHeader}>
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
          <div className={styles.listContent}>
            {searchChannels.slice(0, 6).map((element) => {
              return (
                <div className={styles.searchContent}>
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

        <div className={styles.listBox}>
          <div className={styles.listHeader}>
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
          <div className={styles.listContent}>
            {searchVideoList.slice(0, 20).map((element) => {
              return (
                <div className={styles.searchVideoBox}>
                  <img src={element.videoUrl} alt="userImg" />
                  <div className={styles.searchVideoDetail}>
                    <span className={styles.title}>{element.videoTitle}</span>

                    <Link href="/" className={styles.videoUserName}>
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
