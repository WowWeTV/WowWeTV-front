import { useState, useCallback, useEffect } from 'react';
import styles from '@/styles/layout/my.module.scss';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AiOutlineHeart,
  AiOutlinePlayCircle,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import { useInView } from 'react-intersection-observer';

const LikedVideo = () => {
  const router = useRouter();
  const [curPage, setCurPage] = useState(1);
  const rowsPerPage = 10;
  const { likedVideoList } = useSelector((state) => state.video);
  const onClickVideo = useCallback((videoId) => {
    router.push(`/detail/${videoId}`);
  }, []);
  const [editList, setEditList] = useState(false);
  const onEditList = () => {
    setEditList(!editList);
  };
  const [allChecked, setAllChecked] = useState(false);
  const [checkedID, setCheckedID] = useState([]);
  const [likedVideos, setLikedVideos] = useState(likedVideoList.slice(0, 10)); // 나중에 서버연결시 수정 필요
  const onCheckVideo = (id) => {
    setLikedVideos(
      likedVideos.map((video) =>
        video.id === id ? { ...video, checked: !video.checked } : video,
      ),
    );
    const index = likedVideos.findIndex((video) => video.id === id);
    if (!likedVideos[index].checked) {
      setCheckedID((checked) => checked.concat(id));
    } else {
      checkedID.splice(checkedID.indexOf(id), 1);
    }
  };
  const onCheckAll = () => {
    setAllChecked(!allChecked);
    setLikedVideos(
      likedVideos.map((video) => ({ ...video, checked: !allChecked })),
    );
    if (!allChecked) {
      setCheckedID(likedVideos.map((video) => video.id));
    } else {
      setCheckedID([]);
    }
  };

  const onRemoveSelect = () => {
    // 서버연결
    setLikedVideos(
      likedVideos.filter((video) => !checkedID.includes(video.id)),
    );
    setCheckedID([]);
  };
  const loadMore = () => {
    setLikedVideos(
      likedVideos.concat(
        likedVideoList.slice(
          rowsPerPage * curPage,
          rowsPerPage * (curPage + 1),
        ),
      ),
    );
    setCurPage(curPage + 1);
  };
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    if (curPage * rowsPerPage < likedVideoList.length) {
      if (inView) loadMore();
    }
  }, [inView]);

  return (
    <>
      <div className={styles.my_container}>
        <div className={styles.wrap}>
          <div className={styles.header}>
            <div className={styles.text_area}>
              {!editList && (
                <div className={styles.edit_btn_area}>
                  <a onClick={onEditList}>편집</a>
                </div>
              )}
              {editList && (
                <div className={styles.edit_btn_area}>
                  <a onClick={onEditList}>완료</a>
                  <a onClick={onCheckAll}>전체선택</a>
                  <a onClick={onRemoveSelect}>삭제</a>
                  <p className={styles.checked_number}>{checkedID.length}</p>
                  <p className={styles.checked_text}>개 선택</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.list_container}>
            {likedVideos.map((video) => {
              return (
                <div className={styles.list_box}>
                  {editList && (
                    <div className={styles.check_box}>
                      <input
                        type="checkbox"
                        checked={video.checked}
                        onClick={() => onCheckVideo(video.id)}
                      />
                    </div>
                  )}
                  <div className={styles.video_info}>
                    <img
                      onClick={onClickVideo}
                      src={video.videoUrl}
                      alt="userImg"
                    />
                    <div className={styles.video_detail}>
                      <span
                        onClick={onClickVideo}
                        className={styles.video_title}
                      >
                        {video.videoTitle}
                      </span>
                      <Link href={`/user/${video.userId}`}>
                        {video.userName}
                      </Link>
                      <div className={styles.video_views}>
                        <p>
                          <AiOutlinePlayCircle className={styles.icon} />
                          {video.views}
                          <span>
                            <AiOutlineHeart className={styles.icon} />
                          </span>
                          {video.likes}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {curPage * rowsPerPage < likedVideoList.length && (
          <div ref={ref} className={styles.more_list} onClick={loadMore}>
            <AiOutlineLoading3Quarters className={styles.loading_icon} />
          </div>
        )}
      </div>
    </>
  );
};

export default LikedVideo;
