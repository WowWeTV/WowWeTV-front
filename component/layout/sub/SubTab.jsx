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
        <Link href="/sub?type=top100">
          <li
            className={classNames({
              [`${styles.selected}`]: type === undefined || type === 'top100',
            })}
          >
            <span className={styles.sub_tab}>TOP100</span>
          </li>
        </Link>
        <Link href="/sub?type=recent">
          <li
            className={classNames({
              [`${styles.selected}`]: type === 'recent',
            })}
          >
            <span className={styles.sub_tab}>지금 뜨는</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default SubTab;
