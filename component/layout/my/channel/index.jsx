import { useCallback, useState } from 'react';
import styles from '@/styles/layout/channel.module.scss';

import UploadVideoModal from './UploadVideoModal';

const MyVideo = () => {
  const [uploadVideo, setUploadVideo] = useState(true);
  console.log(uploadVideo);
  const onClickCancel = useCallback(() => {
    setUploadVideo((pre) => !pre);
  }, []);
  return (
    <>
      <div className={styles.myvideo_container}>
        {uploadVideo && <UploadVideoModal onClickCancel={onClickCancel} />}
      </div>
    </>
  );
};

export default MyVideo;
