import styles from '@/styles/layout/my.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';

const MyTab = () => {
  const router = useRouter();
  const { type } = router.query;

  return (
    <div className={styles.tab_container}>
      <div className={styles.my_textarea}>
        <div className={styles.my_text}>
          <h2>
            <span className={styles.my_span}>MY</span>
          </h2>
        </div>

        <div>
          <ul>
            <li
              className={classNames({
                [`${styles.selected}`]: type === 'recent' || type === undefined,
              })}
            >
              <Link href="/my?type=recent">
                <span className={styles.span_tab}>최근 본</span>
              </Link>
            </li>
            <li
              className={classNames({
                [`${styles.selected}`]: type === 'liked',
              })}
            >
              <Link href="/my?type=liked">
                <span className={styles.span_tab}>좋아요</span>
              </Link>
            </li>
            <li
              className={classNames({
                [`${styles.selected}`]: type === 'patron',
              })}
            >
              {' '}
              <Link href="/my?type=patron">
                <span className={styles.span_tab}>후원하기</span>
              </Link>
            </li>
            <li
              className={classNames({
                [`${styles.selected}`]: type === 'userInfo',
              })}
            >
              {' '}
              <Link href="/my?type=userInfo">
                <span className={styles.span_tab}>회원정보</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyTab;
