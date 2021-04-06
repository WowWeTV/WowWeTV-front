import styles from '@/styles/common/common.module.scss';
import classnames from 'classnames';
import Link from 'next/link';
const PageNation = ({ curPage, startPage, rowsPerPage }) => {
  return (
    <div className={styles.paging_wrap}>
      <div className={styles.page_move_pc}>
        <Link href="/">
          <span className={styles.link}> 맨앞 </span>
        </Link>
        <Link href="/">
          <span className={styles.link}> {'<'} 이전</span>
        </Link>
        {[...Array(rowsPerPage)].map((n, index) => {
          return curPage === index ? (
            <Link href="/">
              <span className={styles.link}>
                <strong>{index}</strong>
              </span>
            </Link>
          ) : (
            <Link href="/">
              <span className={styles.link}>{index} </span>
            </Link>
          );
        })}

        <Link href="/">
          <span className={styles.link}>다음 {'>'}</span>
        </Link>
        <Link href="/">
          <span className={classnames(styles.link)}> 맨뒤 </span>
        </Link>
      </div>

      <div className={styles.page_move_mobile}>
        <Link href="/">
          <span className={styles.link}> {'<'} </span>
        </Link>
        {[...Array(rowsPerPage)].map((n, index) => {
          return curPage === index ? (
            <Link href="/">
              <span className={styles.link}>
                <strong>{index}</strong>
              </span>
            </Link>
          ) : (
            <Link href="/">
              <span className={styles.link}>{index} </span>
            </Link>
          );
        })}

        <Link href="/">
          <span className={styles.link}> {'>'}</span>
        </Link>
      </div>
    </div>
  );
};

export default PageNation;
