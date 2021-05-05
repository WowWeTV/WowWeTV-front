import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, modifyComment, removeComment } from '@/lib/action/video';
import classnames from 'classnames';
import moment from 'moment';
import styles from '@/styles/layout/detail.module.scss';
import VideoNestedComment from './VideoNestedComment';
import { AiOutlineDown, AiOutlineMore } from 'react-icons/ai';

const VideoComment = () => {
  const { singleVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const { comments } = singleVideo;

  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastPage] = useState(10);
  const [moreComments, setMoreComments] = useState(1);
  const commentList = comments.slice(startIndex, lastIndex * moreComments);
  const [commentInput, setCommentInput] = useState({
    newComment: '',
    postedComment: '',
  });
  const { newComment, postedComment } = commentInput;
  const initialStates = new Array(comments.length).fill(false);
  const [updateButton, setUpdateButton] = useState(initialStates);
  const [modification, setModification] = useState(initialStates);
  const [nestedList, setNestedList] = useState(initialStates);

  // 댓글 게시 날짜
  const postedDate = useCallback(
    (date) => {
      const today = moment();
      const uploadDate = moment(date);
      const calcMin = Math.floor(today.diff(uploadDate) / 1000 / 60);
      const calcHour = Math.floor(calcMin / 60);
      const calcDay = Math.floor(calcMin / 60 / 24);
      if (calcMin < 1) return '방금 전';
      if (calcMin < 60) return `${calcMin}분 전`;
      if (calcHour < 24) return `${calcHour}시간 전`;
      if (calcDay < 7) return `${calcDay}일 전`;
      return uploadDate.format('YYYY. M. D.');
    },
    [comments],
  );
  // 댓글 입력
  const onChangeComment = useCallback(
    (e) => {
      const { name, value } = e.target;
      setCommentInput({ ...commentInput, [name]: value });
    },
    [commentInput],
  );
  // 댓글 등록
  const onAddComment = useCallback(
    (e) => {
      e.preventDefault();
      if (!newComment) {
        alert('댓글을 입력해 주세요.');
      } else {
        dispatch(addComment({ commentText: newComment }));
        alert(`${newComment}\n댓글이 등록되었습니다.`);
        setCommentInput({ newComment: '' });
      }
    },
    [newComment],
  );
  // 댓글 수정, 삭제 보기 버튼
  const onClickUpdateButton = useCallback(
    (index) => {
      setUpdateButton(updateButton.map((_, i) => i === index));
    },
    [updateButton],
  );
  // 댓글 수정
  const onClickModifyButton = useCallback(
    (index) => {
      setUpdateButton(initialStates);
      setModification(
        modification.map((state, i) => (i === index ? !state : false)),
      );
      setCommentInput({ postedComment: commentList[index].commentText });
    },
    [updateButton, modification, postedComment],
  );
  const onModifyComment = useCallback(
    (e, id) => {
      e.preventDefault();
      if (!postedComment) {
        alert('댓글을 입력해 주세요.');
      } else {
        dispatch(modifyComment({ id, commentText: postedComment }));
        alert(`${postedComment}\n댓글이 수정되었습니다.`);
        setModification(initialStates);
      }
    },
    [postedComment, modification, comments],
  );
  // 댓글 삭제
  const onRemoveComment = useCallback(
    (id) => {
      dispatch(removeComment({ id }));
      alert('댓글이 삭제되었습니다.');
    },
    [comments],
  );
  // 댓글 더보기
  const onShowMoreComments = useCallback(() => {
    setUpdateButton(initialStates);
    setMoreComments(moreComments + 1);
  }, [updateButton, moreComments]);
  // 대댓글 열기
  const onShowNested = useCallback(
    (index) => {
      setUpdateButton(initialStates);
      setNestedList(
        nestedList.map((state, i) => (i === index ? !state : state)),
      );
    },
    [updateButton, nestedList],
  );

  return (
    <div className={styles.comment_container} id="comment">
      <div className={styles.comment_title}>
        <h4>댓글</h4>
        <span>{comments.length}</span>
      </div>
      <form className={styles.write_comment} onSubmit={onAddComment}>
        <input
          type="textarea"
          placeholder="댓글을 입력해 주세요"
          value={newComment}
          name="newComment"
          onChange={onChangeComment}
          onClick={() => setUpdateButton(initialStates)}
        />
        <button type="submit" className="primary" onClick={onAddComment}>
          등록
        </button>
      </form>
      <div className={styles.comment_list}>
        <ul>
          {commentList.map((comment, index) => {
            const {
              id,
              user,
              commentText,
              createDate,
              nestedComment,
            } = comment;
            return (
              <li key={id}>
                <div
                  className={
                    nestedList[index]
                      ? classnames(styles.open_nested, styles.comment_box)
                      : styles.comment_box
                  }
                >
                  <div className={styles.comment_info_box}>
                    {modification[index] ? (
                      <div className={styles.comment_form}>
                        <form onSubmit={(e) => onModifyComment(e, id)}>
                          <input
                            type="textarea"
                            value={postedComment}
                            name="postedComment"
                            onChange={onChangeComment}
                          />
                          <div>
                            <button onClick={() => onClickModifyButton(index)}>
                              취소
                            </button>
                            <button
                              type="submit"
                              className="primary"
                              onClick={(e) => onModifyComment(e, id)}
                            >
                              수정
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <>
                        <div
                          className={styles.comment_info}
                          onClick={() => setUpdateButton(initialStates)}
                        >
                          <p className={styles.user_name}>
                            {index} {user.userName}
                          </p>
                          <div className={styles.comment_text}>
                            <p>{commentText}</p>
                          </div>
                          <p className={styles.date}>
                            {postedDate(createDate)}
                          </p>
                        </div>
                        <button
                          className={styles.comment_update_btn}
                          onClick={() => onClickUpdateButton(index)}
                        >
                          <AiOutlineMore />
                        </button>
                        {updateButton[index] && (
                          <div className={styles.modify_remove}>
                            <button onClick={() => onClickModifyButton(index)}>
                              수정
                            </button>
                            <button onClick={() => onRemoveComment(id)}>
                              삭제
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <button
                    className={
                      nestedList[index]
                        ? classnames(styles.nested_btn, styles.clicked)
                        : styles.nested_btn
                    }
                    onClick={() => onShowNested(index)}
                  >
                    댓글 {nestedComment.length > 0 && nestedComment.length}
                  </button>
                </div>
                {nestedList[index] && (
                  <VideoNestedComment
                    postedDate={postedDate}
                    onShowNested={onShowNested}
                    commentIndex={index}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
      {comments.length > 10 && comments.length - 1 > lastIndex * moreComments && (
        <div className={styles.more_comments} onClick={onShowMoreComments}>
          더보기 <AiOutlineDown className={styles.icon} />
        </div>
      )}
    </div>
  );
};

export default VideoComment;
