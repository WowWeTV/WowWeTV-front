import { useState } from "react";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import ExtraInfo from "./ExtraInfo";
import Modal from "../../common/Modal";
import styles from "@/styles/login.module.scss";
import "@/styles/modal.module.scss";

const LoginLayout = () => {
  const [findPWModal, setFindPWModal] = useState(false);
  const onHandleModal = () => {
    setFindPWModal(!findPWModal);
  };
  const header = "비밀번호 찾기";
  const contentHeader = "찾으려는 계정의 이메일을 입력해 주세요.";
  const inputPlaceholder = "이메일";
  const btnText = "확 인";
  const errMsg = "가입하지 않은 이메일입니다.";
  return (
    <div className={styles.wrap}>
      {findPWModal && (
        <Modal
          onHandleModal={onHandleModal}
          errMsg={errMsg}
          header={header}
          contentHeader={contentHeader}
          inputPlaceholder={inputPlaceholder}
          btnText={btnText}
        />
      )}
      <LoginHeader />
      <LoginForm />
      <ExtraInfo onHandleModal={onHandleModal} />
    </div>
  );
};

export default LoginLayout;
