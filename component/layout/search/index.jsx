import SearchTab from './SearchTab';
import ChannerlList from './ChannelList';
import VideoList from './VideoList';
import { useRouter } from 'next/router';
import SearchMain from './SearchMain';
import styles from '@/styles/layout/search.module.scss';

const SearchLayout = () => {
  const router = useRouter();
  const { type } = router.query;

  return (
    <>
      <div className={styles.search_page}>
        <SearchTab />
        {type === undefined && (
          <>
            <SearchMain />
          </>
        )}
        {type === 'videos' && (
          <>
            <VideoList />
          </>
        )}
        {type === 'channels' && (
          <>
            <ChannerlList />
          </>
        )}
      </div>
    </>
  );
};

export default SearchLayout;
