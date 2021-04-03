import React from 'react';
import Link from 'next/link';
import styles from '@/styles/header.module.scss';

const Lnb = () => {
    return (
        <>
            {/* mobile, tablet */}
            <div className={styles.mobileLnbContainer}>
                <ul>
                    <li><h2><Link href="/">홈</Link></h2></li>
                    <li><h2><Link href="/top100Video">인기</Link></h2></li>
                    <li><h2><Link href="/">라이브</Link></h2></li>
                </ul>
            </div>
        </>
    );
};

export default Lnb;