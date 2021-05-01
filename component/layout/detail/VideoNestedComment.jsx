import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNestedComment,
  modifyNestedComment,
  removeNestedComment,
} from '@/lib/action/video';
import styles from '@/styles/layout/detail.module.scss';
import { AiOutlineMore, AiOutlineUp } from 'react-icons/ai';

const VideoNestedComment = ({ postedDate, onShowNested, commentIndex }) => {
  const { singleVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const { comments } = singleVideo;

  const nestedCommentList = comments[commentIndex].nestedComment;
  const [nestedInputs, setNestedInputs] = useState({
    newNestedComment: '',
    postedNestedComment: '',
  });
  const { newNestedComment, postedNestedComment } = nestedInputs;
  const initialStates = new Array(nestedCommentList.length).fill(false);
  const [updateButton, setUpdateButton] = useState(initialStates);
  const [modification, setModification] = useState(initialStates);

  // 대댓글 입력
  const onChangeNested = useCallback(
    (e) => {
      const { name, value } = e.target;
      setNestedInputs({ ...nestedInputs, [name]: value });
    },
    [nestedInputs],
  );
  // 대댓글 등록
  const onSubmitNested = useCallback(
    (e, id) => {
      e.preventDefault();
      if (!newNestedComment) {
        alert('댓글을 입력해 주세요');
      } else {
        dispatch(
          addNestedComment({
            commentId: id,
            nestedCommentText: newNestedComment,
          }),
        );
        alert(`${newNestedComment}\n댓글이 등록되었습니다.`);
        setNestedInputs('');
      }
    },
    [newNestedComment],
  );
  // 대댓글 수정, 삭제 보기 버튼
  const onClickUpdateButton = useCallback(
    (index) => {
      setUpdateButton(updateButton.map((_, i) => i === index));
    },
    [updateButton],
  );
  // 대댓글 수정
  const onClickModifyButton = useCallback(
    (index) => {
      setUpdateButton(initialStates);
      setModification(
        modification.map((state, i) => (i === index ? !state : false)),
      );
      setNestedInputs({
        postedNestedComment: nestedCommentList[index].nestedCommentText,
      });
    },
    [updateButton, modification, postedNestedComment, comments],
  );
  const onModifyNested = useCallback(
    (e, id) => {
      e.preventDefault();
      if (!postedNestedComment) {
        alert('댓글을 입력해 주세요.');
      } else {
        dispatch(
          modifyNestedComment({
            commentId: comments[commentIndex].id,
            nestedId: id,
            nestedCommentText: postedNestedComment,
          }),
        );
        alert(`${postedNestedComment}\n댓글이 수정되었습니다.`);
        setModification(initialStates);
      }
    },
    [postedNestedComment, comments],
  );
  // 대댓글 삭제
  const onRemoveNested = useCallback(
    (nestedId) => {
      dispatch(
        removeNestedComment({
          commentId: comments[commentIndex].id,
          nestedId,
        }),
      );
      alert('댓글이 삭제되었습니다.');
    },
    [comments],
  );

  return (
    <div className={styles.nested_box}>
      <ul className={styles.nested_list}>
        {nestedCommentList.map((nested, index) => {
          const { id, userName, nestedCommentText, createDate } = nested;
          return (
            <li key={id} className={modification[index] && styles.comment_form}>
              {modification[index] ? (
                <>
                  <div className={styles.icon}>└</div>
                  <form onSubmit={(e) => onModifyNested(e, id)}>
                    <input
                      type="textarea"
                      value={postedNestedComment}
                      name="postedNestedComment"
                      onChange={onChangeNested}
                    />
                    <div>
                      <button onClick={() => onClickModifyButton(index)}>
                        취소
                      </button>
                      <button
                        type="submit"
                        className="primary"
                        onClick={(e) => onModifyNested(e, id)}
                      >
                        수정
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className={styles.icon}>└</div>
                  <div className={styles.nested_info}>
                    <p className={styles.user_name}>{userName}</p>
                    <div className={styles.nested_text}>
                      {nestedCommentText}
                    </div>
                    <p className={styles.date}>{postedDate(createDate)}</p>
                  </div>
                  <button
                    className={styles.nested_update_btn}
                    onClick={() => onClickUpdateButton(index)}
                  >
                    <AiOutlineMore />
                  </button>
                  {updateButton[index] && (
                    <div className={styles.modify_remove}>
                      <button onClick={() => onClickModifyButton(index)}>
                        수정
                      </button>
                      <button onClick={() => onRemoveNested(id)}>삭제</button>
                    </div>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>
      <form onSubmit={(e) => onSubmitNested(e, comments[commentIndex].id)}>
        <input
          type="textarea"
          placeholder="댓글을 입력해 주세요"
          value={newNestedComment}
          name="newNestedComment"
          onChange={onChangeNested}
        />
        <button
          type="submit"
          className={styles.submit_nested}
          onSubmit={(e) => onSubmitNested(e, comments[commentIndex].id)}
        >
          등록
        </button>
      </form>
      <div
        className={styles.close_nested}
        onClick={() => onShowNested(commentIndex)}
      >
        댓글접기 <AiOutlineUp className={styles.icon} />
      </div>
    </div>
  );
};

VideoNestedComment.propTypes = {
  postedDate: PropTypes.func.isRequired,
  onShowNested: PropTypes.func.isRequired,
  commentIndex: PropTypes.number.isRequired,
};

export default VideoNestedComment;
