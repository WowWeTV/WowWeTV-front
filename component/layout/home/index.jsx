import React from 'react';
import styles from '@/styles/main.module.scss';
import Carousel from './Carousel';

const HomeLayout = () => {
  return (
    <main className={styles.main}>
      <Carousel />
    </main>
  );
};

export default HomeLayout;
