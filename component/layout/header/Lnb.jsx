import React from 'react';
import styles from '@/styles/main.module.scss';

const Lnb = () => {
    return (
        <>
            {/* mobile, tablet */}
            <div className={styles.mobileLnbContainer}>
                <ul>
                    <li><h2>홈</h2></li>
                    <li><h2>인기</h2></li>
                    <li><h2>라이브</h2></li>
                </ul>
            </div>
        </>
    );
};

export default Lnb;