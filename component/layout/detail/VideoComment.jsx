import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import styles from '@/styles/layout/detail.module.scss';
import VideoNestedComment from './VideoNestedComment';
import { AiOutlineDown, AiOutlineMore } from 'react-icons/ai';
import {
  addComment,
  modifyComment,
  removeComment,
} from 'lib/slices/videoSlice';

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
  const initialButtonState = new Array(comments.length).fill(false);
  const [commentWorks, setCommentWorks] = useState(initialButtonState);
  const initialModify = new Array(comments.length).fill(false);
  const [modification, setModification] = useState(initialModify);
  const initialNestedState = new Array(comments.length).fill(false);
  const [nestedList, setNestedList] = useState(initialNestedState);

  // 댓글 게시 날짜
  const postedDate = useCallback(
    (date) => {
      const today = new Date();
      const upload = new Date(date);
      const calcMin = Math.floor(
        (today.getTime() - upload.getTime()) / 1000 / 60,
      );
      const calcHour = Math.floor(calcMin / 60);
      const calcDay = Math.floor(calcMin / 60 / 24);
      if (calcMin < 1) return '방금 전';
      if (calcMin < 60) return `${calcMin}분 전`;
      if (calcHour < 24) return `${calcHour}시간 전`;
      if (calcDay < 7) return `${calcDay}일 전`;
      return upload.toLocaleString().substr(0, 12);
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
        alert('댓글을 입력해 주세요');
      } else {
        dispatch(addComment({ commentText: newComment }));
        alert(`${newComment}\n댓글이 등록되었습니다.`);
        setCommentInput({ newComment: '' });
      }
    },
    [newComment],
  );
  // 댓글 수정, 삭제 보기 버튼
  const onClickWorksButton = useCallback(
    (index) => {
      setCommentWorks(commentWorks.map((_, i) => i === index));
    },
    [commentWorks],
  );
  // 댓글 수정
  const onClickModifyButton = useCallback(
    (index) => {
      setCommentWorks(initialButtonState);
      setModification(
        modification.map((state, i) => (i === index ? !state : false)),
      );
      setCommentInput({ postedComment: commentList[index].commentText });
    },
    [commentWorks, modification, postedComment],
  );
  const onModifyComment = useCallback(
    (e, id) => {
      e.preventDefault();
      dispatch(modifyComment({ id, commentText: postedComment }));
      alert(`${postedComment}\n댓글이 수정되었습니다.`);
      setCommentWorks(initialButtonState);
    },
    [postedComment, commentWorks, comments],
  );
  // 댓글 더보기
  const onShowMoreComments = useCallback(() => {
    setCommentWorks(initialButtonState);
    setMoreComments(moreComments + 1);
  }, [commentWorks, moreComments]);
  // 대댓글 열기
  const onShowNested = useCallback(
    (index) => {
      setCommentWorks(initialButtonState);
      setNestedList(
        nestedList.map((state, i) => (i === index ? !state : state)),
      );
    },
    [commentWorks, nestedList],
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
          onClick={() => setCommentWorks(initialButtonState)}
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
                      <div className={styles.modify_comment_box}>
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
                              등록
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <>
                        <div
                          className={styles.comment_info}
                          onClick={() => setCommentWorks(initialButtonState)}
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
                          className={styles.comment_works_btn}
                          onClick={() => onClickWorksButton(index)}
                        >
                          <AiOutlineMore />
                        </button>
                        {commentWorks[index] && (
                          <div className={styles.works_list}>
                            <button onClick={() => onClickModifyButton(index)}>
                              수정
                            </button>
                            <button onClick={() => dispatch(removeComment(id))}>
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
                    index={index}
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
