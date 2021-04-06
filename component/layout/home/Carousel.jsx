import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import styles from '@/styles/main.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  AiOutlineHeart,
  AiOutlinePlayCircle,
  AiOutlinePlus,
} from 'react-icons/ai';

const Carousel = () => {
  const { newVideoList } = useSelector((state) => state.video);

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
    <section className={styles.new_video_section}>
      {/* mobile */}
      <div className={styles.new_video_slider}>
        <Slider {...settings}>
          {newVideoList.map((element) => {
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
      <div className={styles.new_video_container}>
        <div className={styles.new_video_title}>
          <Link href="/recentVideo">
            <h3>지금 뜨는</h3>
          </Link>
          <Link href="/recentVideo">
            <button>
              더보기
              <AiOutlinePlus className={styles.icon} />
            </button>
          </Link>
        </div>
        <div className={styles.new_video_list}>
          {newVideoList.slice(0, 2).map((element) => {
            return (
              <div key={element.id} className={styles.new_video}>
                <div className={styles.new_video_img}>
                  <img src={element.videoUrl} alt={element.videoTitle} />
                  <span>{(element.videoLength / 3600).toFixed(2)}</span>
                </div>
                <div className={styles.new_video_info}>
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
        <div className={styles.new_video_list}>
          {newVideoList.slice(2, 4).map((element) => {
            return (
              <div key={element.id} className={styles.new_video}>
                <div className={styles.new_video_img}>
                  <img src={element.videoUrl} alt={element.videoTitle} />
                  <span>{(element.videoLength / 3600).toFixed(2)}</span>
                </div>
                <div className={styles.new_video_info}>
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

export default Carousel;
