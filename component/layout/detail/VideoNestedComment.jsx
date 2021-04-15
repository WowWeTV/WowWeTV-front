import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from '@/styles/layout/detail.module.scss';
import { AiOutlineUp } from 'react-icons/ai';

const VideoNestedComment = ({ postedDate }) => {
  const { singleVideo } = useSelector((state) => state.video);
  const { comments } = singleVideo;

  return (
    <div className={styles.nested_box}>
      <ul className={styles.nested_list}>
        {comments[0].nestedComment.map((item) => (
          <li key={item.id}>
            <div className={styles.icon}>└</div>
            <div className={styles.nested_info}>
              <p className={styles.user_name}>{item.userName}</p>
              <div className={styles.nested_text}>{item.nestedCommentText}</div>
              <p className={styles.date}>{postedDate(item.createDate)}</p>
            </div>
          </li>
        ))}
      </ul>
      <form>
        <input type="textarea" placeholder="댓글을 입력해 주세요" />
        <button type="submit" className={styles.submit_nested}>
          등록
        </button>
      </form>
      <div className={styles.close_nested}>
        댓글접기 <AiOutlineUp className={styles.icon} />
      </div>
    </div>
  );
};

VideoNestedComment.propTypes = {
  postedDate: PropTypes.func.isRequired,
};

export default VideoNestedComment;
