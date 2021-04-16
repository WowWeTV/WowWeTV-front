import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from '@/styles/layout/detail.module.scss';
import { AiOutlineUp } from 'react-icons/ai';

const VideoNestedComment = ({ postedDate, onShowNested, index }) => {
  const { singleVideo } = useSelector((state) => state.video);
  const { comments } = singleVideo;

  const [nestedInputs, setNestedInputs] = useState('');

  // 대댓글 입력
  const onChangeNested = useCallback(
    (e) => {
      setNestedInputs(e.target.value);
    },
    [nestedInputs],
  );
  // 대댓글 등록
  const onSubmitNested = useCallback(
    (e) => {
      e.preventDefault();
      // if (!nestedInputs) return alert('댓글을 입력해 주세요');
      // return alert(`${nestedInputs}\n댓글이 등록되었습니다.`);
    },
    [nestedInputs],
  );

  return (
    <div className={styles.nested_box}>
      <ul className={styles.nested_list}>
        {comments[0].nestedComment.map((comment) => (
          <li key={comment.id}>
            <div className={styles.icon}>└</div>
            <div className={styles.nested_info}>
              <p className={styles.user_name}>{comment.userName}</p>
              <div className={styles.nested_text}>
                {comment.nestedCommentText}
              </div>
              <p className={styles.date}>{postedDate(comment.createDate)}</p>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={onSubmitNested}>
        <input
          type="textarea"
          placeholder="댓글을 입력해 주세요"
          value={nestedInputs}
          onChange={onChangeNested}
        />
        <button
          type="submit"
          className={styles.submit_nested}
          onSubmit={onSubmitNested}
        >
          등록
        </button>
      </form>
      <div className={styles.close_nested} onClick={() => onShowNested(index)}>
        댓글접기 <AiOutlineUp className={styles.icon} />
      </div>
    </div>
  );
};

VideoNestedComment.propTypes = {
  postedDate: PropTypes.func.isRequired,
  onShowNested: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default VideoNestedComment;
