import Link from 'next/link';
import styles from '@/styles/layout/login.module.scss';
import PropTypes from 'prop-types';

const ExtraInfo = ({ onHandleModal }) => {
  return (
    <div className={styles.find_info}>
      <a href="#" className={styles.find} onClick={onHandleModal}>
        비밀번호 찾기
      </a>
      <span className={styles.bar}> | </span>
      <Link href="/register">회원가입</Link>
    </div>
  );
};
ExtraInfo.propTypes = {
  onHandleModal: PropTypes.func.isRequired,
};

export default ExtraInfo;
