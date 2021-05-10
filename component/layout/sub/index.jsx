import React from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/layout/sub.module.scss';
import SubTab from './SubTab';
import Top100Video from './Top100Video';
import RecentVideo from './RecentVideo';

const SubLayout = () => {
  const router = useRouter();
  const { type } = router.query;

  return (
    <div className={styles.sub_container}>
      <h2 className={styles.sub_title}>인기</h2>
      <SubTab />
      {(type === undefined || type === 'top100') && <Top100Video />}
      {type === 'recent' && <RecentVideo />}
    </div>
  );
};

export default SubLayout;
