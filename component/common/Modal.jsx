import { useState } from 'react';
import styles from '@/styles/common/modal.module.scss';
import PropTypes from 'prop-types';

const FindPWModal = ({
  onHandleModal,
  errMsg,
  header,
  contentHeader,
  inputPlaceholder,
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
            </div>
            <button type="button" onClick={handleSubmit}>{btnText}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

FindPWModal.propTypes = {
  onHandleModal: PropTypes.func.isRequired,
  errMsg: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  contentHeader: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
}

export default FindPWModal;
