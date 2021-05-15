import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { loadTop100Video } from '@/lib/action/video';
import classnames from 'classnames';
import styles from '@/styles/layout/sub.module.scss';
import {
  AiOutlineHeart,
  AiOutlineLoading3Quarters,
  AiOutlinePlayCircle,
} from 'react-icons/ai';

const Top100Video = () => {
  // 영상 데이터 추가 후 top100VideoList 삭제
  const { top100VideoList, top100Videos } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const [curVideos, setCurVideos] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const videosPerPage = 20;
  const ref = useRef();

  const loadVideos = useCallback(
    (pageNumber) => {
      // dispatch(
      //   loadTop100Video({
      //     limit: videosPerPage,
      //     offset: 3 + (page - 1) * videosPerPage,
      //   }),
      // );
      setCurVideos(
        curVideos.concat(
          top100VideoList.slice(
            3 + (pageNumber - 1) * videosPerPage,
            3 + pageNumber * videosPerPage,
          ),
        ),
      );
      if (curVideos.length < 96) setIsLoading(true);
      else setIsLoading(false);
    },
    [curPage],
  );
  const loadMoreVideos = () => {
    if (curPage < 5) setCurPage((page) => page + 1);
  };
  useEffect(() => loadVideos(curPage), [curPage]);
  useEffect(() => {
    if (isLoading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) loadMoreVideos();
        },
        { threshold: 1 },
      );
      observer.observe(ref.current);
    }
  }, [isLoading]);

  return (
    <div className={styles.video_list_container}>
      <div className={classnames(styles.video_list, styles.top_videos)}>
        <div className={styles.top_videos_inner}>
          {top100VideoList.slice(0, 3).map((video, index) => {
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
                <div key={id} className={styles.video}>
                  <div className={styles.mobile_video_ranking}>{index + 1}</div>
                  <div className={styles.video_img}>
                    <img src={videoUrl} alt={videoTitle} />
                    <span>{(videoLength / 3600).toFixed(2)}</span>
                  </div>
                  <div className={styles.video_ranking}>{index + 1}</div>
                  <div className={styles.video_info}>
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
      <div className={styles.video_list}>
        {curVideos.map((video, index) => {
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
              <div key={id} className={styles.video}>
                <div className={styles.mobile_video_ranking}>{index + 4}</div>
                <div className={styles.video_img}>
                  <img src={videoUrl} alt={videoTitle} />
                  <span>{(videoLength / 3600).toFixed(2)}</span>
                </div>
                <div className={styles.video_ranking}>{index + 4}</div>
                <div className={styles.video_info}>
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
      {isLoading && (
        <div ref={ref} className={styles.loading_icon}>
          <span>
            <AiOutlineLoading3Quarters />
          </span>
        </div>
      )}
    </div>
  );
};

export default Top100Video;
