import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import SERVER_BASE_URL from '../../../lib/utils/constant';
import { useCookies, CookiesProvider } from 'react-cookie';
import styles from '@/styles/layout/header.module.scss';
import Gnb from './Gnb';
import Lnb from './Lnb';

// axios.defaults.baseURL = `${SERVER_BASE_URL}/user/login`;
// axios.defaults.withCredentials = true;

const HeaderLayout = () => {
  const [cookies, setCookie] = useCookies(['token']);
  const [hasCookie, setHasCookie] = useState(false);

  useEffect(() => {
    if (cookies) setHasCookie(true);
  }, [cookies]);

  return (
    <CookiesProvider>
      <header className={styles.header}>
        <Gnb cookie={cookies} />
        <Lnb />
      </header>
    </CookiesProvider>
  );
};

export default HeaderLayout;
