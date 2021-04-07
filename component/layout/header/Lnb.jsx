import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import styles from '@/styles/layout/header.module.scss';

const Lnb = () => {
  const router = useRouter();
  const { pathname } = router;
  const [fixed, setFixed] = useState(false);
  const [pageY, setPageY] = useState(0);

  const handleScroll = useCallback(() => {
    const { pageYOffset } = window;
    pageYOffset >= '43' ? setFixed(true) : setFixed(false);
    setPageY(pageYOffset);
  }, [fixed, pageY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageY]);

  return (
    <>
      {/* mobile, tablet */}
      <nav
        className={
          fixed
            ? classnames(styles.mobile_lnb_container, styles.header_fixed)
            : styles.mobile_lnb_container
        }
      >
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
