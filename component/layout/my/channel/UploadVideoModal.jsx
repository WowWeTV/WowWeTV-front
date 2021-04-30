import styles from '@/styles/layout/myvideo.module.scss';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

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
            <h1>세부정보</h1>

            <textarea />
            <textarea />
            <input type="file" />
          </div>
          <div className={styles.modal_footer} />

          <button>다음</button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
