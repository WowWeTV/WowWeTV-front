import styles from '@/styles/layout/login.module.scss';
import Link from 'next/link';

const LoginHeader = () => {
  return (
    <h1 className={styles.header}>
      <Link href="/">WowWeTV</Link>
    </h1>
  );
};

export default LoginHeader;
