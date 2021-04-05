import { useState } from "react";
import styles from "@/styles/login.module.scss";

const FindPWModal = ({ onHandleModal }) => {
  const onClickModal = (e) => {
    e.stopPropagation();
  };
  const [inputs, setInputs] = useState("");
  const onChange = (e) => {
    setInputs(e.target.value);
  };
  const [errorMsg, setErrorMsg] = useState("");
  const handleSubmit = () => {
    console.log(inputs);
    if (inputs === "") {
      setErrorMsg("이메일을 입력해 주세요.");
    } else {
      //Add function
      setErrorMsg("가입하지 않은 이메일입니다.");
    }
  };
  return (
    <div className={styles.modal_wrap} onClick={onHandleModal}>
      <div className={styles.find_modal} onClick={onClickModal}>
        <div className={styles.modal_header}>
          <h1>비밀번호 찾기</h1>
        </div>
        <div>
          <h2 className={styles.modal_content_header}>
            찾으려는 계정의 이메일을 입력해 주세요.
          </h2>
          <div className={styles.modal_content_wrap}>
            <div className={styles.modal_content}>
              <div className={styles.modal_input}>
                <input
                  id="email"
                  placeholder="이메일"
                  type="text"
                  value={inputs}
                  onChange={onChange}
                  className="text-input"
                />
              </div>
              {errorMsg && <p>{errorMsg}</p>}
            </div>
            <button onClick={handleSubmit}>확 인</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPWModal;
