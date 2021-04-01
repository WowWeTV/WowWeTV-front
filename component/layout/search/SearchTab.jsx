
import styles from '../../../styles/search.module.scss'
import { useRouter } from 'next/router'
import Link from 'next/link';
const SerachTab = () => {
    const router = useRouter()
    const { query, type } = router.query
    // console.log(query)

    return <div className={styles.searchTabContainer}>
        <div className={styles.searchTextArea}>

            <h2 > <span className={styles.searcSpan}>{query} </span>검색결과</h2>
            <ul>
                <li>
                    <Link href={`/search?query=${query}`}>
                        <span className={styles.spanTab}> 전체</span>
                    </Link>
                </li>
                <li>
                    <Link href={`/search?query=${query}&type=videos`}><span className={styles.spanTab}>동영상</span></Link>
                </li>
                <li>  <Link href={`/search?query=${query}&type=channels`}><span className={styles.spanTab}>채널</span></Link>
                </li>

            </ul>

        </div>

    </div >;
};

export default SerachTab;
