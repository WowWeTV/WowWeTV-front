import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import styles from '@/styles/layout/detail.module.scss';
import { AiOutlineUp } from 'react-icons/ai';

const VideoComment = () => {
  const { singleVideo } = useSelector((state) => state.video);
  const { comments } = singleVideo;

  const [commentInput, setCommentInput] = useState('');
  const [nested, setNested] = useState(false);
  // const [selectedNested, setSelectedNested] = useState([]);

  const onChange = useCallback(
    (e) => {
      const { value } = e.target;
      setCommentInput(value);
    },
    [commentInput],
  );

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
      if (calcDay < 365) return `${calcDay}일 전`;
      return upload.toLocaleString().substr(0, 12);
    },
    [comments],
  );

  return (
    <div className={styles.comment_container} id="comment">
      <div className={styles.comment_title}>
        <h4>댓글</h4>
        <span>{comments.length}</span>
      </div>
      <form className={styles.write_comment}>
        <input
          type="textarea"
          placeholder="댓글을 입력해 주세요"
          value={commentInput}
          onChange={onChange}
        />
        <button type="submit" className="primary">
          등록
        </button>
      </form>
      <div className={styles.comment_list}>
        <ul>
          {comments.map((comment, index) => {
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
                    nested
                      ? classnames(styles.open_nested, styles.comment_box)
                      : styles.comment_box
                  }
                >
                  <p className={styles.user_name}>{user.userName}</p>
                  <div className={styles.comment_text}>{commentText}</div>
                  <p className={styles.date}>{postedDate(createDate)}</p>
                  <button className={styles.show_nested}>
                    댓글 {nestedComment.length > 0 && nestedComment.length}
                  </button>
                </div>
                {nested && (
                  <div className={styles.nested_box}>
                    {nestedComment.length > 0 && (
                      <ul className={styles.nested_list}>
                        {nestedComment.map((item) => (
                          <li key={item.id}>
                            <div className={styles.icon}>└</div>
                            <div className={styles.nested_text}>
                              <p className={styles.user_name}>
                                {item.userName}
                              </p>
                              <div className={styles.nested_text}>
                                {item.nestedCommentText}
                              </div>
                              <p className={styles.date}>
                                {postedDate(item.createDate)}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                    <form>
                      <input
                        type="textarea"
                        placeholder="댓글을 입력해 주세요"
                      />
                      <button type="submit" className={styles.submit_nested}>
                        등록
                      </button>
                    </form>
                    <div className={styles.close_nested}>
                      댓글접기 <AiOutlineUp className={styles.icon} />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default VideoComment;
