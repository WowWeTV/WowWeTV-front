import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/header.module.scss';
import AsideMenu from './AsideMenu';

const Gnb = () => {
    const [aside, setAside] = useState(false);
    const [search, setSearch] = useState(false);
    const onToggleMobile = useCallback(() => {setAside(!aside)}, [aside]);
    const onShow = useCallback(() => setSearch(!search), [search]);

    return (
        <>
            {/* mobile, tablet */}
            <div className={styles.mobileGnbContainer}>
                <div className={styles.mobileGnb}>
                    <div onClick={onToggleMobile}>📂</div>
                    <h1><Link href="/">WowWeTV</Link></h1>
                    <div>
                        {search 
                            ? (
                                <div className={styles.mobileSearch}>
                                    <input type="text" placeholder="동영상, 채널 검색" />
                                    <span>🔍</span>
                                </div>
                            )
                            : <div onClick={onShow}>🔍</div>
                        }
                        <div 
                            className={search ? [styles.darkBg, styles.open].join(" ") : styles.darkBg} 
                            onClick={onShow}>
                        </div>
                    </div>
                </div>
                <AsideMenu aside={aside} onToggleMobile={onToggleMobile}/>
            </div>

            {/* desktop */}
            <div className={styles.gnbContainer}>
                <div className={styles.gnb}>
                    <div className={styles.gnbLeft}>
                        <div>📂</div>
                        <h1><Link href="/">Wow WeTV</Link></h1>
                    </div>
                    <div className={styles.gnbSearchBar}>
                        <input type="text" placeholder="검색어를 입력하세요" />
                        <div>🔍</div>
                    </div>
                    <div className={styles.gnbRight}>
                        <button className={`circle`}>Creator Studio</button>
                        <div>🎥</div>
                        <Link href="/login">
                            <button className={`circle primary`}>로그인</button>
                        </Link>
                    </div>
                </div>
                <AsideMenu />
            </div>
        </>
    );
};

export default Gnb;