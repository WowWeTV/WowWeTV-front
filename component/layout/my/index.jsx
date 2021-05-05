import { useRouter } from 'next/router';
import styles from '@/styles/layout/my.module.scss';
import MyTab from './MyTab';
import RecentVideo from './RecentVideo';
import LikedVideo from './LikedVideo';
import Patron from './Patron';
import UserInfo from './UserInfo';

const MyLayout = () => {
  const router = useRouter();
  const { type } = router.query;

  return (
    <>
      <div className={styles.my_wrap}>
        <MyTab />
        {(type === undefined || type === 'recent') && (
          <>
            <RecentVideo />
          </>
        )}
        {type === 'liked' && (
          <>
            <LikedVideo />
          </>
        )}
        {type === 'patron' && (
          <>
            <Patron />
          </>
        )}
        {type === 'userInfo' && (
          <>
            <UserInfo />
          </>
        )}
      </div>
    </>
  );
};

export default MyLayout;
