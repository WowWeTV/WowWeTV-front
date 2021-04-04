import SearchTab from './SearchTab';
import ChannerlList from './ChannelList';
import VideoList from './VideoList';
import { useRouter } from 'next/router';
import styles from '@/styles/search.module.scss';
const SearchLayout = () => {
    const router = useRouter()
    const { type } = router.query;

    return (
        <>
            <div className={styles.searchPage}>
                <SearchTab />

                {type == undefined && (
                    <>
                        <ChannerlList />
                        <VideoList />
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
