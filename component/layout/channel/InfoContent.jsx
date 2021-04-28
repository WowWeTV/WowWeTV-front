import styles from '@/styles/layout/channel.module.scss';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import InfoMain from './infoMain';
import InfoVideos from './infoVideos';

const InfoContent = () => {
  const router = useRouter();
  const { userId, type } = router.query;
  const { userVideoList } = useSelector((state) => state.video);
  return (
    <div className={styles.inf_content}>
      {type === undefined && <InfoMain />}
      {type === 'videos' && <InfoVideos />}
    </div>
  );
};

export default InfoContent;
