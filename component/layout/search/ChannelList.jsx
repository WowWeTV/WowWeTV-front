import React, { useCallback, useState, useEffect } from 'react';
import styles from '@/styles/layout/search.module.scss';

import Link from 'next/link';
import classnames from 'classnames';
import PageNation from '@/component/common/PageNation';
import { useSelector, useDispatch } from 'react-redux';

const ChannelsList = () => {
  const [curPage, setCurPage] = useState(1);
  const [startPage, setStartPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const { searchChannels } = useSelector((state) => state.user);

  return (
    <div className={styles.list_container}>
      <div className={classnames(styles.list_box, styles.margin_top)}>
        <div className={styles.list_header}>
          <h2>
            <strong>채널</strong>
            <em> {searchChannels.length} </em>
          </h2>
        </div>
        <div className={styles.list_content}>
          {searchChannels
            .slice(
              (curPage - 1) * (rowsPerPage * 3),
              (curPage - 1) * (rowsPerPage * 3) + rowsPerPage * 3,
            )
            .map((element) => {
              return (
                <div className={styles.search_content}>
                  <img
                    src={element.userImg}
                    alt="userImg"
                    className={styles.user_img}
                  />
                  <br />
                  <Link href="/">{element.userName}</Link>
                  <div>
                    <span>동영상 {element.videoCount}</span>
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

export default ChannelsList;
