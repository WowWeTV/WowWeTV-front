import React, { useCallback, useState, useEffect } from 'react';
import styles from '@/styles/layout/search.module.scss';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import classnames from 'classnames';
import PageNation from '@/component/common/PageNation';
import PropTypes from 'prop-types';
import { AiOutlineHeart, AiOutlinePlayCircle } from 'react-icons/ai';

const VideosList = ({ onClickVideo }) => {
  const [curPage, setCurPage] = useState(1);
  const [startPage, setStartPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { searchVideoList } = useSelector((state) => state.video);

  return (
    <div className={styles.list_container}>
      <div className={classnames(styles.list_box, styles.margin_top)}>
        <div className={styles.list_header}>
          <h2>
            <strong>동영상</strong>
            <em> {searchVideoList.length} </em>
          </h2>
        </div>
        <div className={styles.list_content}>
          {searchVideoList
            .slice(
              (curPage - 1) * (rowsPerPage * 2),
              (curPage - 1) * (rowsPerPage * 2) + rowsPerPage * 2,
            )
            .map((element) => {
              return (
                <div className={styles.search_videobox}>
                  <img
                    src={element.videoImg}
                    onClick={() => onClickVideo(element.id)}
                  />
                  <div className={styles.search_videodetail}>
                    <span
                      className={styles.title}
                      onClick={() => onClickVideo(element.id)}
                    >
                      {element.videoTitle}
                    </span>

                    <Link
                      href={`/user/${element.userId}`}
                      className={styles.video_username}
                    >
                      {element.userName}
                    </Link>
                    <div className={styles.video_views}>
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
                </div>
              );
            })}
        </div>
        <PageNation
          curPage={curPage}
          startPage={startPage}
          rowsPerPage={rowsPerPage}
          setCurPage={setCurPage}
          setStartPage={setStartPage}
        />
      </div>
    </div>
  );
};
VideosList.prototype = {
  onClickVideo: PropTypes.func.isRequired,
};
export default VideosList;
