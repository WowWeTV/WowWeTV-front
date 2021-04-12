import styles from '@/styles/layout/search.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';

const SerachTab = () => {
  const router = useRouter();
  const { query, type } = router.query;

  return (
    <div className={styles.searchtab_container}>
      <div className={styles.search_textarea}>
        <div className={styles.search_text}>
          <h2>
            {' '}
            <span className={classNames(styles.search_span, styles.point)}>
              {' '}
              {query}{' '}
            </span>
            <span className={styles.search_span}> 검색결과 </span>
          </h2>
        </div>

        <div className={styles.search_menu}>
          <ul>
            <li
              className={classNames({
                [`${styles.selected}`]: type === undefined,
              })}
            >
              <Link href={`/search?query=${query}`}>
                <span className={styles.spantab}> 전체</span>
              </Link>
            </li>
            <li
              className={classNames({
                [`${styles.selected}`]: type === 'videos',
              })}
            >
              <Link href={`/search?query=${query}&type=videos`}>
                <span className={styles.span_tab}>동영상</span>
              </Link>
            </li>
            <li
              className={classNames({
                [`${styles.selected}`]: type === 'channels',
              })}
            >
              {' '}
              <Link href={`/search?query=${query}&type=channels`}>
                <span className={styles.span_tab}>채널</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SerachTab;
