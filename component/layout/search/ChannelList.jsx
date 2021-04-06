import styles from '@/styles/layout/search.module.scss';
import { useState } from 'react';
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
    <div className={styles.listContainer}>
      <div className={classnames(styles.listBox, styles.margin_top)}>
        <div className={styles.listHeader}>
          <h2>
            <strong>채널</strong>
            <em> {searchChannels.length} </em>
          </h2>
        </div>
        <div className={styles.listContent}>
          {searchChannels.map((element) => {
            return (
              <div className={styles.searchContent}>
                <img src={element.userImg} alt="userImg" />
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
        />
      </div>
    </div>
  );
};

export default ChannelsList;
