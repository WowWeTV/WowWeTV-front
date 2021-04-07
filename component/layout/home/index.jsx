import React from 'react';
import styles from '@/styles/main.module.scss';
import RecentSection from './RecentSection';
import Top100Section from './Top100Section';

const HomeLayout = () => {
  return (
    <main className={styles.main}>
      <RecentSection />
      <Top100Section />
    </main>
  );
};

export default HomeLayout;
