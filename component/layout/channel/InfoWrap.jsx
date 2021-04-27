import styles from '@/styles/layout/channel.module.scss';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiOutlineShareAlt } from 'react-icons/ai';

const InfoWrap = () => {
  const { singlechannel } = useSelector((state) => state.user);
  const router = useRouter();
  const { userId, type } = router.query;
  console.log(userId, type);
  console.log(type === undefined);
  console.log(type === 'videos');
  return (
    <div className={styles.inf_wrap}>
      <div className={styles.info_banner}>
        <img className={styles.banner_img} src={singlechannel.userBackImg} />
      </div>
      <div className={styles.info_box}>
        <div className={styles.info_box_content}>
          <div className={styles.info_user}>
            <img className={styles.user_img} src={singlechannel.userImg} />
            <div className={styles.user_detail}>
              <h2>{singlechannel.userName}</h2>
              <span>동영상 500</span>
            </div>
          </div>
          <button className={styles.share_btn}>
            <AiOutlineShareAlt size="1.2em" />
            공유
          </button>
        </div>

        <div className={styles.info_box_content_mobile}>
          <div className={styles.channel_info_mobile}>
            <img
              className={styles.user_img_mobile}
              src={singlechannel.userImg}
            />
          </div>
          <div className={styles.info_user_mobile}>
            <div className={styles.user_detail_mobile}>
              <h2>{singlechannel.userName}</h2>
              <span>동영상 500</span>
            </div>
            <button className={styles.share_btn}>
              <AiOutlineShareAlt size="1.2em" />
              공유
            </button>
          </div>
        </div>
      </div>

      <div className={styles.info_menu}>
        <ul>
          <li
            className={classNames({
              [`${styles.selected}`]: type === undefined,
            })}
          >
            <Link href={`/user/${userId}`}>
              <span className={styles.span_tab}> 전체</span>
            </Link>
          </li>
          <li
            className={classNames({
              [`${styles.selected}`]: type === 'videos',
            })}
          >
            <Link href={`/user/${userId}?type=videos`}>
              <span className={styles.span_tab}>동영상</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InfoWrap;
