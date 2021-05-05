import styles from '@/styles/layout/myvideo.module.scss';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';

const UploadModal = ({ onClickCancel }) => {
  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_pc}>
        <div className={styles.modal_box}>
          <div className={styles.modal_header}>
            <h1 className={styles.h3_font}>동영상 업로드</h1>

            <button className={styles.cancel_btn} onClick={onClickCancel}>
              <AiOutlineClose size={20} />
            </button>
          </div>

          <div className={styles.modal_content}>
            <div className={styles.modal_video_detail}>
              <h1>세부정보</h1>

              <div className={styles.input_container}>
                <textarea
                  className={styles.video_input}
                  placeholder="동영상을 설명하는 제목을 추가하세요"
                />
                <label className={styles.video_label}>제목(필수)</label>
              </div>
              <div className={styles.input_container}>
                <textarea
                  className={styles.video_input}
                  placeholder="시청자에게 동영상을 설명하세요"
                />
                <label className={styles.video_label}>설명(필수)</label>
              </div>
              <div className={styles.video_preview}>
                <h3>미리보기 이미지</h3>
                <span className={styles.content_info_span}>
                  동영상의 내용을 알려주는 사진을 선택하거나 업로드하세요.
                  시청자의 시선을 사로잡을만한 이미지를 사용해 보세요
                </span>
                <input
                  id="preview_file"
                  type="file"
                  className={styles.perview_img_upload}
                />
                <label htmlFor="preview_file">
                  <BiImageAdd size="25" color="#847c7c" />
                  미리보기 이미지 업로드
                </label>
              </div>

              <div className={styles.video_tags}>
                <h3>태그</h3>

                <span className={styles.content_info_span}>
                  영상을 태그로 분류하세요.
                </span>
                <br />
                <select>
                  <option value="0">영화</option>
                  <option value="1">음악</option>
                  <option value="2">게임</option>
                  <option value="3">학습</option>
                  <option value="4">스포츠</option>
                  <option value="5">기타</option>
                </select>
              </div>
              <div className={styles.add_tags} />
            </div>

            <div className={styles.modal_video_content}>
              {' '}
              <div className={styles.preview_img}>
                <div className={styles.file_name}>파일이름</div>
              </div>
              <div className={styles.upload_box}>
                <input
                  id="video_file"
                  type="file"
                  className={styles.video_upload}
                />
                <label htmlFor="video_file">영상 파일</label>
              </div>
            </div>
          </div>

          <div className={styles.modal_footer} />

          <button>다음</button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
