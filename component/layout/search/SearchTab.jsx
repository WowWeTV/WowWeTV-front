
import styles from '@/styles/search.module.scss';
import { useRouter } from 'next/router'
import Link from 'next/link';
import classNames from 'classnames';
const SerachTab = () => {
    const router = useRouter()
    const { query, type } = router.query



    return <div className={styles.searchTabContainer}>
        <div className={styles.searchTextArea}>
            <h2 > <span className={styles.searcSpan}>{query} </span>검색결과</h2>

            <div>
                <ul>
                    <li>
                        <Link href={`/search?query=${query}`}>
                            <span className={classNames(styles.spanTab, { [`${styles.selected}`]: type === undefined })}> 전체</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/search?query=${query}&type=videos`}><span className={classNames(styles.spanTab, { [`${styles.selected}`]: type === 'videos' })}>동영상</span></Link>
                    </li>
                    <li>  <Link href={`/search?query=${query}&type=channels`}><span className={classNames(styles.spanTab, { [`${styles.selected}`]: type === 'channels' })}>채널</span></Link>
                    </li>
                </ul>


            </div>

        </div>


    </div >;
};

export default SerachTab;
