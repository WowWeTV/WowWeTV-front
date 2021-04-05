import styles from '@/styles/search.module.scss'
import { useSelector } from "react-redux";
import Link from 'next/link';
import classnames from 'classnames';
const ChannelsList = () => {

    const { searchChannels } = useSelector(state => state.user);

    console.log(searchChannels)
    return (<div className={styles.listContainer}>
        <div className={classnames(styles.listBox, styles.margin_top)}>

            <div className={styles.listHeader}>
                <h2><strong>채널</strong>
                    <em> {searchChannels.length} </em>
                </h2>
            </div>
            <div className={styles.listContent}>

                {searchChannels.map((element) => {
                    return (

                        <div className={styles.searchContent}>
                            <img src={element.userImg} />
                            <br />
                            <Link href="/">{element.userName}</Link>
                            <div>
                                <span>동영상 {element.videoCount}</span>
                            </div>

                        </div>

                    )
                })}

            </div>


        </div>
    </div>)

};


export default ChannelsList;
