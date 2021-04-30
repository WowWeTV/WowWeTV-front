import { useCallback } from 'react';
import SearchTab from './SearchTab';
import ChannerlList from './ChannelList';
import VideoList from './VideoList';
import { useRouter } from 'next/router';
import SearchMain from './SearchMain';
import styles from '@/styles/layout/search.module.scss';

const SearchLayout = () => {
  const router = useRouter();
  const { type } = router.query;

  const onClickVideo = useCallback((videoId) => {
    console.log(videoId);
    router.push(`/detail/${videoId}`);
  }, []);
  const onClickChannel = useCallback((userId) => {
    console.log(userId);
    router.push(`/user/${userId}`);
  }, []);

  return (
    <>
      <div className={styles.search_page}>
        <SearchTab />
        {type === undefined && (
          <>
            <SearchMain
              onClickVideo={onClickVideo}
              onClickChannel={onClickChannel}
            />
          </>
        )}
        {type === 'videos' && (
          <>
            <VideoList onClickVideo={onClickVideo} />
          </>
        )}
        {type === 'channels' && (
          <>
            <ChannerlList onClickChannel={onClickChannel} />
          </>
        )}
      </div>
    </>
  );
};

export default SearchLayout;
