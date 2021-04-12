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
    console.log(inputs);
    if (inputs === '') {
      setErrorMsg(`${inputPlaceholder}을 입력해 주세요.`);
    } else {
      // Add function
      setErrorMsg(errMsg);
    }
  };
  return (
    <div className={styles.modal_wrap} onClick={onHandleModal}>
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
            <button type="button" onClick={handleSubmit}>
              {btnText}
            </button>
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
  btnText: PropTypes.string.isRequired,
};

export default Modal;
