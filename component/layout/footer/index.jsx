import React from 'react';
import Link from 'next/link';
import styles from '@/styles/layout/footer.module.scss';

const FooterLayout = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <ul className={styles.mobile_footer_lnb}>
          <li>
            <Link href="/login">로그인</Link>
          </li>
          <li>
            <Link href="/">채널 만들기</Link>
          </li>
          <li>
            <Link href="/">운영정책</Link>
          </li>
          <li>
            <Link href="/">고객센터</Link>
          </li>
        </ul>
        <ul className={styles.footer_lnb}>
          <li>
            <Link href="/">이용약관</Link>
          </li>
          <li>
            <Link href="/">
              <b>개인정보처리방침</b>
            </Link>
          </li>
          <li>
            <Link href="/">책임의 한계와 법적고지</Link>
          </li>
          <li>
            <Link href="/">채널 만들기</Link>
          </li>
          <li>
            <Link href="/">운영정책</Link>
          </li>
          <li>
            <Link href="/">고객센터</Link>
          </li>
        </ul>
        <p className={styles.footer_notice}>
          본 콘텐츠의 저작권은 저작권자에게 있으며, 이를 무단으로 이용하는 경우
          저작권법 등에 따라 법적 책임을 질 수 있습니다.
        </p>
        <p className={styles.footer_copyright}>
          WowWeTV
          <span className={styles.footer_cr}>
            Copyright &copy; <b>WowWeTV Corp.</b> All rights Reserved.
          </span>
        </p>
      </div>
    </footer>
  );
};

export default FooterLayout;
