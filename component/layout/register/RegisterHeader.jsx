import styles from '@/styles/layout/register.module.scss';
import Link from 'next/link';

const RegisterHeader = () => {
  return (
    <h1 className={styles.header}>
      <Link href="/">WowWeTV</Link>
    </h1>
  );
};

export default RegisterHeader;
