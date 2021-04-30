import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classnames from 'classnames';
import styles from '@/styles/layout/header.module.scss';
import {
  AiOutlineMenu,
  AiOutlineNotification,
  AiOutlinePlaySquare,
  AiOutlineSearch,
  AiOutlineVideoCamera,
} from 'react-icons/ai';
import AsideMenu from './AsideMenu';

const Gnb = () => {
  const router = useRouter();
  const { pathname } = router;
  const [fixed, setFixed] = useState(false);
  const [pageY, setPageY] = useState(0);
  const [sideMenu, setSideMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [inputs, setInputs] = useState({
    mobileSearchInput: '',
    searchInput: '',
  });
  const { mobileSearchInput, searchInput } = inputs;

  const handleScroll = useCallback(() => {
    const { pageYOffset } = window;
    if (pathname.includes('/detail')) {
      if (pageYOffset >= 43) {
        setFixed(true);
      } else {
        setFixed(false);
      }
      setPageY(pageYOffset);
    }
  }, [pathname, fixed, pageY]);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageY]);
  const onToggle = useCallback(() => setSideMenu(!sideMenu), [sideMenu]);
  const onShow = useCallback(() => {
    setSearch(!search);
    setInputs({
      mobileSearchInput: '',
      searchInput: '',
    });
  }, [search]);
  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs],
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (mobileSearchInput) {
        router.push(`/search?query=${mobileSearchInput}`);
      }
      if (searchInput) {
        router.push(`/search?query=${searchInput}`);
      }
    },
    [inputs, router],
  );
  const onShowDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <>
      {/* mobile, tablet */}
      <div
        className={
          fixed
            ? classnames(styles.mobile_gnb_container, styles.header_fixed)
            : styles.mobile_gnb_container
        }
      >
        <div className={styles.mobile_gnb}>
          <div onClick={onToggle} className="icon">
            <AiOutlineMenu />
          </div>
          <h1>
            <Link href="/">WowWeTV</Link>
          </h1>
          <div>
            {search ? (
              <form className={styles.mobile_search} onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="동영상, 채널 검색"
                  onChange={onChange}
                  value={mobileSearchInput}
                  name="mobileSearchInput"
                />
                <Link
                  href={
                    mobileSearchInput && `/search?query=${mobileSearchInput}`
                  }
                >
                  <button type="submit">
                    <AiOutlineSearch className="icon" />
                  </button>
                </Link>
              </form>
            ) : (
              <div onClick={onShow} className="icon">
                <AiOutlineSearch />
              </div>
            )}
            <div
              className={
                search ? classnames(styles.dark_bg, styles.open) : styles.darkBg
              }
              onClick={onShow}
            />
          </div>
        </div>
        <AsideMenu sideMenu={sideMenu} onToggle={onToggle} />
      </div>

      {/* desktop */}
      <div className={styles.gnb_container}>
        <div className={styles.gnb}>
          <div className={styles.gnb_left}>
            <div onClick={onToggle} className="icon">
              <AiOutlineMenu />
            </div>
            <h1>
              <Link href="/">WowWeTV</Link>
            </h1>
          </div>
          <form className={styles.gnb_search_bar} onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              onChange={onChange}
              value={searchInput}
              name="searchInput"
            />
            <Link href={searchInput && `/search?query=${searchInput}`}>
              <button type="submit" className="icon search_icon">
                <AiOutlineSearch />
              </button>
            </Link>
          </form>
          <div className={styles.gnb_right}>
            <button className="circle">Creator Studio</button>
            <div
              className={`icon ${styles.upload_icon}`}
              onClick={onShowDropdown}
            >
              <AiOutlineVideoCamera />
            </div>
            {dropdown && (
              <div className={styles.upload_dropdown}>
                <Link href="/uploadVideo">
                  <div>
                    <span>
                      <AiOutlinePlaySquare />
                    </span>
                    <h3>동영상 업로드</h3>
                  </div>
                </Link>
                <Link href="/startStreaming">
                  <div>
                    <span>
                      <AiOutlineNotification />
                    </span>
                    <h3>실시간 스트리밍 시작</h3>
                  </div>
                </Link>
              </div>
            )}
            <Link href="/login">
              <button className="circle primary">로그인</button>
            </Link>
          </div>
        </div>
        <AsideMenu sideMenu={sideMenu} onToggle={onToggle} />
      </div>
    </>
  );
};

export default Gnb;
