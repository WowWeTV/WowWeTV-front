import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/header.module.scss';
import AsideMenu from './AsideMenu';

const Gnb = () => {
    const [aside, setAside] = useState(false);
    const [search, setSearch] = useState(false);
    const onToggle = useCallback(() => {setAside(!aside)}, [aside]);
    const onShow = useCallback(() => setSearch(!search), [search]);

    return (
        <>
            {/* mobile, tablet */}
            <div className={styles.mobile_gnb_container}>
                <div className={styles.mobile_gnb}>
                    <div onClick={onToggle}>📂</div>
                    <h1><Link href="/">WowWeTV</Link></h1>
                    <div>
                        {search 
                            ? (
                                <div className={styles.mobile_search}>
                                    <input type="text" placeholder="동영상, 채널 검색" />
                                    <span>🔍</span>
                                </div>
                            )
                            : <div onClick={onShow}>🔍</div>
                        }
                        <div 
                            className={search ? [styles.dark_bg, styles.open].join(" ") : styles.darkBg} 
                            onClick={onShow}>
                        </div>
                    </div>
                </div>
                <AsideMenu aside={aside} onToggle={onToggle}/>
            </div>

            {/* desktop */}
            <div className={styles.gnb_container}>
                <div className={styles.gnb}>
                    <div className={styles.gnb_left}>
                        <div onClick={onToggle}>📂</div>
                        <h1><Link href="/">Wow WeTV</Link></h1>
                    </div>
                    <div className={styles.gnb_search_bar}>
                        <input type="text" placeholder="검색어를 입력하세요" />
                        <div>🔍</div>
                    </div>
                    <div className={styles.gnb_right}>
                        <button className={`circle`}>Creator Studio</button>
                        <div>🎥</div>
                        <Link href="/login">
                            <button className={`circle primary`}>로그인</button>
                        </Link>
                    </div>
                </div>
                <AsideMenu aside={aside} onToggle={onToggle} />
            </div>
        </>
    );
};

export default Gnb;