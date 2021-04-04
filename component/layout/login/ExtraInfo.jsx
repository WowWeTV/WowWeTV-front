import styles from "@/styles/login.module.scss";
import Link from "next/link";

const ExtraInfo = () => {
  return (
    <div className={styles.find_info}>
      <Link href="/login">아이디 찾기</Link>
      <span> | </span>
      <Link href="/login">비밀번호 찾기</Link>
      <span> | </span>
      <Link href="/login">회원가입</Link>
    </div>
  );
};

export default ExtraInfo;
