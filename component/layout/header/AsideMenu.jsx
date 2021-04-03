import React from 'react';
import Link from 'next/link';
import styles from '@/styles/header.module.scss';

const AsideMenu = ({ aside, onToggleMobile }) => {
    return (
        <div className={styles.asideSpace}>
            {/* mobile, tablet */}
            <aside className={styles.mobileAsideContainer}>
                <div 
                    className={aside ? [styles.darkBg, styles.open].join(" ") : styles.darkBg} 
                    onClick={onToggleMobile}>
                </div>
                <div className={aside ? [styles.aside, styles.open].join(" ") : styles.aside}>
                    <div className={styles.top}>
                        <Link href="/login">로그인하세요</Link>
                        <span onClick={onToggleMobile}>X</span>
                    </div>
                    <ul className={styles.asideMenu}>
                        <li>최근에 본 동영상</li>
                        <li>좋아요한 동영상</li>
                        <li>후원하기</li>
                    </ul>
                </div>        
            </aside>

            {/* desktop */}
            <aside className={styles.asideContainer}>
                <ul>
                    <Link href="/">
                        <li>
                            <span>📺</span>
                            <span><h2>홈</h2></span>
                        </li>
                    </Link>
                    <Link href="/top100Video">
                        <li>
                            <span>📺</span>
                            <span><h2>인기영상</h2></span>
                        </li>
                    </Link>
                    <Link href="/">
                        <li>
                            <span>📺</span>
                            <span><h2>라이브</h2></span>
                        </li>
                    </Link>
                </ul>
            </aside>
        </div>
    );
};

export default AsideMenu;