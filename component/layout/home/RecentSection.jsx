import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { loadRecentVideo } from '@/lib/action/video';
import classnames from 'classnames';
import styles from '@/styles/main.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  AiOutlineHeart,
  AiOutlinePlayCircle,
  AiOutlineRight,
} from 'react-icons/ai';

const RecentSection = () => {
  // 영상 데이터 추가 후 recentVideoList 삭제
  const { recentVideoList, recentVideos } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const dataToLoad = { limit: 3, offset: 0 };
  useEffect(() => {
    dispatch(loadRecentVideo(dataToLoad))
      .then((response) => {
        if (response.payload.success) {
          // console.log(response.payload.data.content);
          // console.log(recentVideos);
        } else {
          console.error(response.payload.message);
        }
      })
      .catch((err) => console.error(err));
  }, []);
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    dots: true,
    dotsClass: 'slick_dots',
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className={styles.recent_section}>
      {/* mobile */}
      <div className={styles.recent_slider}>
        <Slider {...settings}>
          {recentVideoList.slice(0, 4).map((video) => {
            const { id, videoUrl, userName, videoTitle } = video;
            return (
              <div key={id} className={styles.slide}>
                <img src={videoUrl} alt={videoTitle} />
                <div className={styles.slide_info}>
                  <p>{userName}</p>
                  <p>{videoTitle}</p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      {/* tablet, desktop */}
      <div className={styles.recent_container}>
        <div className={styles.section_title}>
          <Link href="/sub?type=recent">
            <h3>지금 뜨는</h3>
          </Link>
          <Link href="/sub?type=recent">
            <button>
              더보기
              <AiOutlineRight className={styles.icon} />
            </button>
          </Link>
        </div>
        <div className={styles.recent_list}>
          {recentVideoList.slice(0, 4).map((video) => {
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
                <div key={id} className={styles.recent}>
                  <div
                    className={classnames(styles.recent_img, styles.video_img)}
                  >
                    <img src={videoUrl} alt={`${videoTitle}`} />
                    <span>{(videoLength / 3600).toFixed(2)}</span>
                  </div>
                  <div
                    className={classnames(
                      styles.recent_info,
                      styles.video_info,
                    )}
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
      </div>
    </section>
  );
};

export default RecentSection;
