import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/layout/header.module.scss';

const Lnb = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      {/* mobile, tablet */}
      <nav className={styles.mobile_lnb_container}>
        <ul>
          <li className={pathname === '/' ? styles.menu_active : null}>
            <h2>
              <Link href="/">홈</Link>
            </h2>
          </li>
          <li
            className={pathname === '/top100Video' ? styles.menu_active : null}
          >
            <h2>
              <Link href="/top100Video">인기</Link>
            </h2>
          </li>
          <li className={pathname === '/streaming' ? styles.menu_active : null}>
            <h2>
              <Link href="/streaming">라이브</Link>
            </h2>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Lnb;
