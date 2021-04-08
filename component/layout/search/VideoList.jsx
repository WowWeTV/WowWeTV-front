import React, { useCallback, useState, useEffect } from 'react';
import styles from '@/styles/layout/search.module.scss';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import classnames from 'classnames';
import PageNation from '@/component/common/PageNation';

const VideosList = () => {
  const [curPage, setCurPage] = useState(1);
  const [startPage, setStartPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { searchVideoList } = useSelector((state) => state.video);

  return (
    <div className={styles.listContainer}>
      <div className={classnames(styles.listBox, styles.margin_top)}>
        <div className={styles.listHeader}>
          <h2>
            <strong>동영상</strong>
            <em> {searchVideoList.length} </em>
          </h2>
        </div>
        <div className={styles.listContent}>
          {searchVideoList
            .slice(
              (curPage - 1) * (rowsPerPage * 2),
              (curPage - 1) * (rowsPerPage * 2) + rowsPerPage * 2,
            )
            .map((element) => {
              return (
                <div className={styles.searchVideoBox}>
                  <img src={element.videoUrl} />
                  <div className={styles.searchVideoDetail}>
                    <span className={styles.title}>{element.videoTitle}</span>

                    <Link href="/" className={styles.videoUserName}>
                      {element.userName}
                    </Link>
                    <div>
                      <span>👁️ {element.views}</span>
                      <span> 💙 {element.like}</span>
                      {/* <span>{element.videoLength}</span> */}
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

export default VideosList;
