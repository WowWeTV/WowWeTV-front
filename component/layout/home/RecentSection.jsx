import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
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
  const { recentVideoList } = useSelector((state) => state.video);

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
          {recentVideoList.slice(0, 4).map((element) => {
            return (
              <div key={element.id} className={styles.slide}>
                <img src={element.videoUrl} alt={element.videoTitle} />
                <div className={styles.slide_info}>
                  <p>{element.userName}</p>
                  <p>{element.videoTitle}</p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      {/* tablet, desktop */}
      <div className={styles.recent_container}>
        <div className={styles.section_title}>
          <Link href="/recentVideo">
            <h3>지금 뜨는</h3>
          </Link>
          <Link href="/recentVideo">
            <button>
              더보기
              <AiOutlineRight className={styles.icon} />
            </button>
          </Link>
        </div>
        <div className={styles.recent_list}>
          {recentVideoList.slice(0, 2).map((element) => {
            return (
              <div key={element.id} className={styles.recent}>
                <div
                  className={classnames(styles.recent_img, styles.video_img)}
                >
                  <img src={element.videoUrl} alt={`${element.videoTitle}`} />
                  <span>{(element.videoLength / 3600).toFixed(2)}</span>
                </div>
                <div
                  className={classnames(styles.recent_info, styles.video_info)}
                >
                  <p>{element.videoTitle}</p>
                  <Link
                    href={`/search?query=${element.userName}&type=channels`}
                  >
                    <p>{element.userName}</p>
                  </Link>
                  <p>
                    <AiOutlinePlayCircle className={styles.icon} />
                    {element.views}
                    <span>
                      <AiOutlineHeart className={styles.icon} />
                    </span>
                    {element.like}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.recent_list}>
          {recentVideoList.slice(2, 4).map((element) => {
            return (
              <div key={element.id} className={styles.recent}>
                <div
                  className={classnames(styles.recent_img, styles.video_img)}
                >
                  <img src={element.videoUrl} alt={element.videoTitle} />
                  <span>{(element.videoLength / 3600).toFixed(2)}</span>
                </div>
                <div
                  className={classnames(styles.recent_info, styles.video_info)}
                >
                  <p>{element.videoTitle}</p>
                  <Link
                    href={`/search?query=${element.userName}&type=channels`}
                  >
                    <p>{element.userName}</p>
                  </Link>
                  <p>
                    <AiOutlinePlayCircle className={styles.icon} />
                    {element.views}
                    <span>
                      <AiOutlineHeart className={styles.icon} />
                    </span>
                    {element.like}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentSection;
