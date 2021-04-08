import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import styles from '@/styles/layout/header.module.scss';
import PropTypes from 'prop-types';

import {
  AiFillHome,
  AiOutlineClose,
  AiOutlineComment,
  AiOutlineDown,
  AiOutlineStar,
  AiOutlineUp,
  AiOutlineUser,
} from 'react-icons/ai';
import { useRouter } from 'next/router';

const AsideMenu = ({ sideMenu, onToggle }) => {
  const router = useRouter();
  const { pathname } = router;
  const [submenu, setSubmenu] = useState(true);
  const onToggleSub = useCallback(() => {
    setSubmenu(!submenu);
  }, [submenu]);

  return (
    <>
      {/* mobile, tablet */}
      <aside className={styles.mobile_aside_container}>
        <div
          className={
            sideMenu ? classnames(styles.dark_bg, styles.open) : styles.darkBg
          }
          onClick={onToggle}
        />
        <div
          className={
            sideMenu ? classnames(styles.sideMenu, styles.open) : styles.aside
          }
        >
          <div className={styles.mobile_aside_top}>
            <Link href="/login">로그인하세요</Link>
            <span onClick={onToggle} className="icon">
              <AiOutlineClose />
            </span>
          </div>
          <ul className={styles.aside_menu}>
            <Link href="/my/recentPlaylist">
              <li>
                <h2>최근 본 영상</h2>
              </li>
            </Link>
            <Link href="/my/likedPlaylist">
              <li>
                <h2>좋아요한 영상</h2>
              </li>
            </Link>
            <Link href="/my/patron">
              <li>
                <h2>후원하기</h2>
              </li>
            </Link>
          </ul>
        </div>
      </aside>

      {/* desktop */}
      <aside
        className={
          sideMenu
            ? classnames(styles.aside_folded, styles.aside_container)
            : styles.aside_container
        }
      >
        <ul className={styles.aside_lnb}>
          <li className={pathname === '/' ? styles.menu_active : null}>
            <Link href="/">
              <>
                <div className={`icon ${styles.icon}`}>
                  <AiFillHome />
                </div>
                <h2>홈</h2>
              </>
            </Link>
          </li>
          <li
            className={pathname === '/top100Video' ? styles.menu_active : null}
          >
            <Link href="/top100Video">
              <>
                <div className={`icon ${styles.icon}`}>
                  <AiOutlineStar />
                </div>
                <h2>인기영상</h2>
              </>
            </Link>
          </li>
          <li className={pathname === '/streaming' ? styles.menu_active : null}>
            <Link href="/streaming">
              <>
                <div className={`icon ${styles.icon}`}>
                  <AiOutlineComment />
                </div>
                <h2>라이브</h2>
              </>
            </Link>
          </li>
          <li
            className={
              pathname.includes('my')
                ? classnames(styles.menu_active, styles.aside_sub_container)
                : styles.aside_sub_container
            }
          >
            <div className={styles.aside_sub_title}>
              <Link href="/my/recentPlaylist">
                <>
                  <div className={`icon ${styles.icon}`}>
                    <AiOutlineUser />
                  </div>
                  <h2>MY</h2>
                </>
              </Link>
              <div className={styles.aside_btn} onClick={onToggleSub}>
                {submenu ? <AiOutlineDown /> : <AiOutlineUp />}
              </div>
            </div>
            {submenu ? (
              <ul className={styles.aside_sub}>
                <li
                  className={
                    pathname === '/my/recentPlaylist'
                      ? styles.submenu_active
                      : null
                  }
                >
                  <Link href="/my/recentPlaylist">
                    <h3>최근 본 영상</h3>
                  </Link>
                </li>
                <li
                  className={
                    pathname === '/my/likedPlaylist'
                      ? styles.submenu_active
                      : null
                  }
                >
                  <Link href="/my/likedPlaylist">
                    <h3>좋아요한 영상</h3>
                  </Link>
                </li>
                <li
                  className={
                    pathname === '/my/patron' ? styles.submenu_active : null
                  }
                >
                  <Link href="/my/patron">
                    <h3>후원하기</h3>
                  </Link>
                </li>
              </ul>
            ) : null}
          </li>
        </ul>
      </aside>
    </>
  );
};

AsideMenu.propTypes = {
  sideMenu: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
export default AsideMenu;
