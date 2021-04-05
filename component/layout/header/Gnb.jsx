import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";
import styles from "@/styles/header.module.scss";
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import AsideMenu from "./AsideMenu";

const Gnb = () => {
  const router = useRouter();
  const [aside, setAside] = useState(false);
  const [search, setSearch] = useState(false);
  const [inputs, setInputs] = useState({
    mobileSearchInput: "",
    searchInput: "",
  });
  const { mobileSearchInput, searchInput } = inputs;

  const onToggle = useCallback(() => setAside(!aside), [aside]);
  const onShow = useCallback(() => {
    setSearch(!search),
      setInputs({
        mobileSearchInput: "",
        searchInput: "",
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
      mobileSearchInput.length > 1
        ? router.push(`/search?query=${mobileSearchInput}`)
        : null;
      searchInput.length > 1
        ? router.push(`/search?query=${searchInput}`)
        : null;
    },
    [inputs, router],
  );

  return (
    <>
      {/* mobile, tablet */}
      <div className={styles.mobile_gnb_container}>
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
                <button type="submit">
                  <Link
                    href={
                      mobileSearchInput && `/search?query=${mobileSearchInput}`
                    }
                  >
                    <AiOutlineSearch className="icon" />
                  </Link>
                </button>
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
            ></div>
          </div>
        </div>
        <AsideMenu aside={aside} onToggle={onToggle} />
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
            <button type="submit" className="icon search_icon">
              <Link href={searchInput && `/search?query=${searchInput}`}>
                <AiOutlineSearch />
              </Link>
            </button>
          </form>
          <div className={styles.gnb_right}>
            <button className="circle">Creator Studio</button>
            <div className={`icon ${styles.upload_icon}`}>
              <AiOutlineVideoCamera />
            </div>
            <Link href="/login">
              <button className="circle primary">로그인</button>
            </Link>
          </div>
        </div>
        <AsideMenu aside={aside} onToggle={onToggle} />
      </div>
    </>
  );
};

export default Gnb;
