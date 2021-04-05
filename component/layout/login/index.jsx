import { useState } from "react";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import ExtraInfo from "./ExtraInfo";
import FindPWModal from "./FindPWModal";
import styles from "@/styles/login.module.scss";

const LoginLayout = () => {
  const [findPWModal, setFindPWModal] = useState(false);
  const onHandleModal = () => {
    setFindPWModal(!findPWModal);
  };
  return (
    <div className={styles.wrap}>
      {findPWModal && <FindPWModal onHandleModal={onHandleModal} />}
      <LoginHeader />
      <LoginForm />
      <ExtraInfo onHandleModal={onHandleModal} />
    </div>
  );
};

export default LoginLayout;
