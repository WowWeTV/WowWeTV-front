import { useCallback } from 'react';
import styles from '@/styles/layout/channel.module.scss';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import InfoMain from './infoMain';
import InfoVideos from './infoVideos';

const InfoContent = () => {
  const router = useRouter();
  const { type } = router.query;

  const onClickVideo = useCallback((videoId) => {
    console.log(videoId);
    router.replace(`/detail/${videoId}`);
  }, []);

  return (
    <div className={styles.inf_content}>
      {type === undefined && <InfoMain onClickVideo={onClickVideo} />}
      {type === 'videos' && <InfoVideos onClickVideo={onClickVideo} />}
    </div>
  );
};

export default InfoContent;
