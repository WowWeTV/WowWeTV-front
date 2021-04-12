import { useCallback } from 'react';
import styles from '@/styles/common/common.module.scss';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const PageNation = ({
  curPage,
  startPage,
  rowsPerPage,
  setCurPage,
  setStartPage,
}) => {
  const pagesNums = [
    startPage + 1,
    startPage + 2,
    startPage + 3,
    startPage + 4,
    startPage + 5,
  ];

  const onClickFirstPage = useCallback(() => {
    setCurPage(1);
    setStartPage(0);
  }, [curPage, startPage]);

  const onClickNextPage = useCallback(() => {
    setStartPage(startPage + rowsPerPage);
    setCurPage(startPage + rowsPerPage + 1);
  }, [curPage, startPage]);

  const onClickPrePage = useCallback(() => {
    setStartPage(startPage - rowsPerPage);
    setCurPage(startPage - rowsPerPage + 1);
  }, [curPage, startPage]);

  const onClickNum = (num) => {
    setCurPage(num);
  };
  return (
    <div className={styles.paging_wrap}>
      <div className={styles.page_move_pc}>
        <ul>
          {' '}
          {startPage !== 0 && (
            <>
              <li>
                <span className={styles.link} onClick={onClickFirstPage}>
                  {' '}
                  맨앞{' '}
                </span>
              </li>
            </>
          )}
          {curPage !== 1 && (
            <>
              <li>
                <span className={styles.link} onClick={onClickPrePage}>
                  {' '}
                  {'<'} 이전
                </span>
              </li>
            </>
          )}
          {pagesNums.map((num, index) => {
            return curPage === num ? (
              <li>
                <span className={styles.link} onClick={() => onClickNum(num)}>
                  <strong>{num}</strong>
                </span>
              </li>
            ) : (
              <li>
                <span className={styles.link} onClick={() => onClickNum(num)}>
                  {num}
                </span>
              </li>
            );
          })}
          <li>
            <span className={styles.link} onClick={onClickNextPage}>
              다음 {'>'}
            </span>
          </li>
          <li>
            <span className={classnames(styles.link)}> 맨뒤 </span>
          </li>
        </ul>
      </div>

      <div className={styles.page_move_mobile}>
        {' '}
        {curPage !== 1 && (
          <>
            <div className={styles.page_button} onClick={onClickPrePage}>
              {'<'}
            </div>
          </>
        )}
        {pagesNums.map((num, index) => {
          return curPage === num ? (
            <div className={styles.page_button} onClick={() => onClickNum(num)}>
              <strong>{num}</strong>
            </div>
          ) : (
            <div className={styles.page_button} onClick={() => onClickNum(num)}>
              {num}
            </div>
          );
        })}
        <div className={styles.page_button} onClick={onClickNextPage}>
          {'>'}
        </div>
      </div>
    </div>
  );
};

PageNation.propTypes = {
  curPage: PropTypes.number.isRequired,
  startPage: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setStartPage: PropTypes.func.isRequired,
  setCurPage: PropTypes.func.isRequired,
};

export default PageNation;
