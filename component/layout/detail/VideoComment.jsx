import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadComment,
  addComment,
  modifyComment,
  removeComment,
} from '@/lib/action/video';
import classnames from 'classnames';
import moment from 'moment';
import styles from '@/styles/layout/detail.module.scss';
import VideoNestedComment from './VideoNestedComment';
import { AiOutlineDown, AiOutlineMore } from 'react-icons/ai';

const VideoComment = () => {
  const { videoComments } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const dataToLoad = { videoId: 1, limit: 3, offset: 0 };

  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastPage] = useState(10);
  const [moreComments, setMoreComments] = useState(1);
  const [commentList, setCommentList] = useState([]);
  const [commentInput, setCommentInput] = useState({
    newComment: '',
    postedComment: '',
  });
  const { newComment, postedComment } = commentInput;
  const [initialState, setInitialState] = useState([]);
  const [updateButton, setUpdateButton] = useState(initialState);
  const [modification, setModification] = useState(initialState);
  const [nestedList, setNestedList] = useState(initialState);

  useEffect(() => {
    if (videoComments.length === 0) {
      dispatch(loadComment(dataToLoad))
        .then((response) => {
          if (response.payload) {
            const data = response.payload.content;
            setCommentList(commentList.concat(data));
            setInitialState(new Array(data.length).fill(false));
          }
        })
        .catch((err) => console.error(err));
    }
  }, []);

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
    [commentList],
  );
  const onChangeComment = useCallback(
    (e) => {
      const { name, value } = e.target;
      setCommentInput({ ...commentInput, [name]: value });
    },
    [commentInput],
  );
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
  const onClickUpdateButton = useCallback(
    (index) => {
      setUpdateButton(updateButton.map((_, i) => i === index));
    },
    [updateButton],
  );
  const onClickModifyButton = useCallback(
    (index) => {
      setUpdateButton(initialState);
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
        setModification(initialState);
      }
    },
    [postedComment, modification, commentList],
  );
  const onRemoveComment = useCallback(
    (id) => {
      dispatch(removeComment({ id }));
      alert('댓글이 삭제되었습니다.');
    },
    [commentList],
  );
  const onShowMoreComments = useCallback(() => {
    setUpdateButton(initialState);
    setMoreComments(moreComments + 1);
  }, [updateButton, moreComments]);
  const onShowNested = useCallback(
    (index) => {
      setUpdateButton(initialState);
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
        <span>{commentList.length}</span>
      </div>
      <form className={styles.write_comment} onSubmit={onAddComment}>
        <input
          type="textarea"
          placeholder="댓글을 입력해 주세요"
          value={newComment}
          name="newComment"
          onChange={onChangeComment}
          onClick={() => setUpdateButton(initialState)}
        />
        <button type="submit" className="primary" onClick={onAddComment}>
          등록
        </button>
      </form>
      <div className={styles.comment_list}>
        <ul>
          {commentList &&
            commentList.map((comment, index) => {
              const {
                id,
                commentText,
                createdAt,
                userDto,
                // nestedComment,
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
                              <button
                                onClick={() => onClickModifyButton(index)}
                              >
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
                            onClick={() => setUpdateButton(initialState)}
                          >
                            <p className={styles.user_name}>
                              {userDto.userName}
                            </p>
                            <div className={styles.comment_text}>
                              <p>{commentText}</p>
                            </div>
                            <p className={styles.date}>
                              {postedDate(createdAt)}
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
                              <button
                                onClick={() => onClickModifyButton(index)}
                              >
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
                      {/* 댓글 {nestedComment.length > 0 && nestedComment.length} */}
                      댓글 0
                    </button>
                  </div>
                  {nestedList && nestedList[index] && (
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
      {commentList.length > 10 &&
        commentList.length - 1 > lastIndex * moreComments && (
          <div className={styles.more_comments} onClick={onShowMoreComments}>
            더보기 <AiOutlineDown className={styles.icon} />
          </div>
        )}
    </div>
  );
};

export default VideoComment;
