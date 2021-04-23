import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import styles from '@/styles/layout/detail.module.scss';
import VideoNestedComment from './VideoNestedComment';
import { AiOutlineDown } from 'react-icons/ai';
import { addComment } from 'lib/slices/videoSlice';

const VideoComment = () => {
  const { singleVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const { comments } = singleVideo;

  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastPage] = useState(10);
  const [moreComments, setMoreComments] = useState(1);
  const [commentInput, setCommentInput] = useState('');
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
      setCommentInput(e.target.value);
    },
    [commentInput],
  );
  // 댓글 등록
  const onSubmitComment = useCallback(
    (e) => {
      e.preventDefault();
      // if (!commentInput) {
      //   return alert('댓글을 입력해 주세요');
      // }
      dispatch(addComment({ commentText: commentInput }));
      // alert(`${commentInput}\n댓글이 등록되었습니다.`);
      setCommentInput('');
    },
    [commentInput],
  );
  // 댓글 더보기
  const onShowMoreComments = () => {
    setMoreComments(moreComments + 1);
  };
  // 대댓글 열기
  const onShowNested = (index) => {
    setNestedList(nestedList.map((state, i) => (i === index ? !state : state)));
  };

  return (
    <div className={styles.comment_container} id="comment">
      <div className={styles.comment_title}>
        <h4>댓글</h4>
        <span>{comments.length}</span>
      </div>
      <form className={styles.write_comment} onSubmit={onSubmitComment}>
        <input
          type="textarea"
          placeholder="댓글을 입력해 주세요"
          value={commentInput}
          onChange={onChangeComment}
        />
        <button type="submit" className="primary" onClick={onSubmitComment}>
          등록
        </button>
      </form>
      <div className={styles.comment_list}>
        <ul>
          {comments
            .slice(startIndex, lastIndex * moreComments)
            .reverse()
            .map((comment, index) => {
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
                    <p className={styles.user_name}>
                      {index} {user.userName}
                    </p>
                    <div className={styles.comment_text}>{commentText}</div>
                    <p className={styles.date}>{postedDate(createDate)}</p>
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
