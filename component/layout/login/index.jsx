import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import ExtraInfo from "./ExtraInfo";
import styles from "@/styles/login.module.scss";

const LoginLayout = () => {
  return (
    <div className={styles.wrap}>
      <LoginHeader />
      <LoginForm />
      <ExtraInfo />
    </div>
  );
};

export default LoginLayout;
