import React from 'react';
import styles from '@/styles/main.module.scss';

const AsideMenu = () => {
    return (
        <>
            {/* mobile, tablet */}
            <aside className={styles.mobileAsideContainer}>
                <div className={styles.bg}></div>
                <div className={styles.aside}>
                    <div className={styles.top}>
                        로그인하세요
                        <div>X</div>
                    </div>
                    <ul>
                        <li>최근에 본 동영상</li>
                        <li>좋아요한 동영상</li>
                        <li>후원하기</li>
                    </ul>
                </div>        
            </aside>  

            {/* desktop */}
            <aside className={styles.asideContainer}>
                <ul>
                    <li>
                        <span>📺</span>
                        <span>홈</span>
                    </li>
                    <li>
                        <span>📺</span>
                        <span>인기영상</span>
                    </li>
                    <li>
                        <span>📺</span>
                        <span>라이브</span>
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default AsideMenu;