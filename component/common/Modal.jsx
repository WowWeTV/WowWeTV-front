import { useState } from 'react';
import styles from '@/styles/common/modal.module.scss';
import PropTypes from 'prop-types';

const Modal = ({
  onHandleModal,
  errMsg,
  header,
  contentHeader,
  inputPlaceholder,
  contentText,
  btnText,
  copyBtn,
}) => {
  const onClickModal = (e) => {
    e.stopPropagation();
  };
  const [inputs, setInputs] = useState('');
  const onChange = (e) => {
    setInputs(e.target.value);
  };
  const [errorMsg, setErrorMsg] = useState('');
  const handleSubmit = () => {
    if (inputs === '') {
      setErrorMsg(`${inputPlaceholder}을 입력해 주세요.`);
    } else {
      // Add function
      setErrorMsg(errMsg);
    }
  };
  const onCopyUrl = () => {
    navigator.clipboard.writeText(contentText);
    alert('링크가 복사되었습니다.');
    onHandleModal();
  };
  return (
    <div
      className={styles.modal_wrap}
      onClick={copyBtn ? () => onHandleModal() : onHandleModal}
    >
      <div className={styles.find_modal} onClick={onClickModal}>
        <div className={styles.modal_header}>
          <h1>{header}</h1>
        </div>
        <div>
          <h2 className={styles.modal_content_header}>{contentHeader}</h2>
          <div className={styles.modal_content_wrap}>
            <div className={styles.modal_content}>
              {inputPlaceholder && (
                <>
                  <div className={styles.modal_input}>
                    <input
                      id="input"
                      placeholder={inputPlaceholder}
                      type="text"
                      value={inputs}
                      onChange={onChange}
                      className="text-input"
                    />
                  </div>
                  {errorMsg && <p>{errorMsg}</p>}
                </>
              )}
              {contentText && (
                <div className={styles.modal_text}>{contentText}</div>
              )}
            </div>
            {btnText && (
              <button type="button" onClick={handleSubmit}>
                {btnText}
              </button>
            )}
            {copyBtn && (
              <div className={styles.copy_btn}>
                <button type="button" onClick={onCopyUrl} className="primary">
                  {copyBtn}
                </button>
                <button type="button" onClick={() => onHandleModal()}>
                  취 소
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onHandleModal: PropTypes.func.isRequired,
  errMsg: PropTypes.string,
  header: PropTypes.string.isRequired,
  contentHeader: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string,
  contentText: PropTypes.string,
  btnText: PropTypes.string,
  copyBtn: PropTypes.string,
};

export default Modal;
