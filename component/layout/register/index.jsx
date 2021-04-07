import RegisterHeader from "./RegisterHeader";
import RegisterForm from "./RegisterForm";
import styles from "@/styles/register.module.scss";

const RegisterLayout = () => {
  return (
    <div className={styles.wrap}>
      <RegisterHeader />
      <RegisterForm />
    </div>
  );
};

export default RegisterLayout;
