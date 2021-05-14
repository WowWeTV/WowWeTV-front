import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { loadTop100Video } from '@/lib/action/video';
import classnames from 'classnames';
import styles from '@/styles/main.module.scss';
import {
  AiOutlineHeart,
  AiOutlinePlayCircle,
  AiOutlineRight,
} from 'react-icons/ai';

const Top100Section = () => {
  // 영상 데이터 추가 후 top100VideoList 삭제
  const { top100VideoList, top100Videos } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const dataToload = { limit: 9, offset: 0 };
  useEffect(() => {
    dispatch(loadTop100Video(dataToload))
      .then((response) => {
        if (response.payload.success) {
          // console.log(response.payload.data.content);
          // console.log(top100Videos);
        } else {
          console.log(response.payload.message);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className={styles.top100_container}>
      <div className={styles.section_title}>
        <Link href="/sub?type=top100">
          <h3>TOP100</h3>
        </Link>
        <Link href="/sub?type=top100">
          <button>
            더보기
            <AiOutlineRight className={styles.icon} />
          </button>
        </Link>
      </div>
      <div>
        {top100VideoList.slice(0, 10).map((video, index) => {
          const {
            id,
            videoUrl,
            userName,
            videoTitle,
            videoLength,
            views,
            likes,
          } = video;
          return (
            <Link href={`/detail/${id}`}>
              <div key={id} className={styles.top100}>
                <div className={styles.top100_ranking}>{index + 1}</div>
                <div
                  className={classnames(styles.top100_img, styles.video_img)}
                >
                  <img src={videoUrl} alt={videoTitle} />
                  <span>{(videoLength / 3600).toFixed(2)}</span>
                </div>
                <div
                  className={classnames(styles.top100_info, styles.video_info)}
                >
                  <p>{videoTitle}</p>
                  <Link href={`/search?query=${userName}&type=channels`}>
                    <p>{userName}</p>
                  </Link>
                  <p>
                    <AiOutlinePlayCircle className={styles.icon} />
                    {views}
                    <span>
                      <AiOutlineHeart className={styles.icon} />
                    </span>
                    {likes}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Top100Section;
