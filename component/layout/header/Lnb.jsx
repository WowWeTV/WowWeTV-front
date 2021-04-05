import React from 'react';
import Link from 'next/link';
import styles from '@/styles/header.module.scss';

const Lnb = () => {
    return (
        <>
            {/* mobile, tablet */}
            <nav className={styles.mobile_lnb_container}>
                <ul>
                    <li><h2><Link href="/">홈</Link></h2></li>
                    <li><h2><Link href="/top100Video">인기</Link></h2></li>
                    <li><h2><Link href="/">라이브</Link></h2></li>
                </ul>
            </nav>
        </>
    );
};

export default Lnb;