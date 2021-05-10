import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';
import styles from '@/styles/layout/sub.module.scss';

const SubTab = () => {
  const router = useRouter();
  const { type } = router.query;

  return (
    <div className={styles.sub_tabs}>
      <ul>
        <li
          className={classNames({
            [`${styles.selected}`]: type === undefined || type === 'top100',
          })}
        >
          <Link href="/sub?type=top100">
            <span className={styles.sub_tab}>TOP100</span>
          </Link>
        </li>
        <li
          className={classNames({
            [`${styles.selected}`]: type === 'recent',
          })}
        >
          <Link href="/sub?type=recent">
            <span className={styles.sub_tab}>지금 뜨는</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SubTab;
