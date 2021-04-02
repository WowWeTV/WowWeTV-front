import React, { useState } from 'react';
import styles from '@/styles/main.module.scss';
import AsideMenu from './AsideMenu';

const Gnb = () => {
    return (
        <>
            {/* mobile, tablet */}
            <div className={styles.mobileGnbContainer}>
                <div className={styles.mobileGnb}>
                    <div>📂</div>
                    <h1>Wow WeTV</h1>
                    <div>🔍</div>
                </div>
                {/* <AsideMenu /> */}
            </div>

            {/* desktop */}
            <div className={styles.gnbContainer}>
                <div className={styles.gnb}>
                    <div className={styles.gnbLeft}>
                        <div>📂</div>
                        <h1>Wow WeTV</h1>
                    </div>
                    <div className={styles.gnbSearchBar}>
                        <input type="text" placeholder="검색어를 입력하세요" />
                        <div><a href="">🔍</a></div>
                    </div>
                    <div className={styles.gnbRight}>
                        <button className={`circle`}>Creator Studio</button>
                        <div>🎥</div>
                        <button className={`circle primary`}>로그인</button>
                    </div>
                </div>
                <AsideMenu />
            </div>
        </>
    );
};

export default Gnb;