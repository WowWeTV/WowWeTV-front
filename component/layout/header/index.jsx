import React from 'react';
import styles from '@/styles/main.module.scss';
import Gnb from './Gnb';
import Lnb from './Lnb';

const HeaderLayout = () => {
    return (
        <header className={styles.header}>
            <Gnb />
            <Lnb />
        </header>
    );
};

export default HeaderLayout;