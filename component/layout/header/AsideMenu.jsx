import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/header.module.scss';

const AsideMenu = ({ aside, onToggle }) => {
    const [submenu, setSubmenu] = useState(true);
    const onToggleSub = () => {setSubmenu(!submenu);}

    return (
        <div className={styles.aside_space}>
            {/* mobile, tablet */}
            <aside className={styles.mobile_aside_container}>
                <div 
                    className={aside ? [styles.dark_bg, styles.open].join(" ") : styles.darkBg} 
                    onClick={onToggle}>
                </div>
                <div className={aside ? [styles.aside, styles.open].join(" ") : styles.aside}>
                    <div className={styles.top}>
                        <Link href="/login">로그인하세요</Link>
                        <span onClick={onToggle}>X</span>
                    </div>
                    <ul className={styles.aside_menu}>
                        <Link href="/my/recentPlaylist">
                            <li><h2>최근 본 영상</h2></li>
                        </Link>
                        <Link href="/my/likedPlaylist">
                            <li><h2>좋아요한 영상</h2></li>
                        </Link>
                        <Link href="/my/patron">
                            <li><h2>후원하기</h2></li>
                        </Link>
                    </ul>
                </div>        
            </aside>

            {/* desktop */}
            <aside className={aside ? [styles.aside_folded, styles.aside_container].join(" ") : styles.aside_container}>
                <ul className={styles.aside_lnb}>
                    <li>
                        <Link href="/">
                            <>📺<span><h2>홈</h2></span></>
                        </Link>
                    </li>
                    <li>
                        <Link href="/top100Video">
                            <>📺<span><h2>인기영상</h2></span></>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <>📺<span><h2>라이브</h2></span></>
                        </Link>
                    </li>
                    <li div className={styles.aside_sub_container}>
                        <div>
                            <Link href="/my/recentPlaylist">
                                <>👤<span><h2>MY</h2></span></>
                            </Link>
                                <span 
                                    className={submenu ? styles.aside_btn : [styles.toggle, styles.aside_btn].join(" ")} 
                                    onClick={onToggleSub}>
                                    ▼
                                </span>
                            </div>
                        {submenu ?
                            <ul className={styles.aside_sub}>
                                <li>
                                    <Link href="/my/recentPlaylist">
                                        <h3>최근 본 영상</h3>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/my/likedPlaylist">
                                        <h3>좋아요한 영상</h3>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/my/patron">
                                        <h3>후원하기</h3>
                                    </Link>
                                </li>
                            </ul>
                        : null}
                    </li>
                </ul>
            </aside>
        </div>
    );
};

export default AsideMenu;