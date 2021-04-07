import Link from "next/link";
import styles from "@/styles/login.module.scss";

const ExtraInfo = ({ onHandleModal }) => {
  return (
    <div className={styles.find_info}>
      <span className={styles.find} onClick={onHandleModal}>
        비밀번호 찾기
      </span>
      <span className={styles.bar}> | </span>
      <Link href="/register">회원가입</Link>
    </div>
  );
};

export default ExtraInfo;
