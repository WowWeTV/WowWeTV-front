import Head from 'next/head';
import HomeLayout from '@/component/layout/home';
import HeaderLayout from '@/component/layout/header';
import FooterLayout from '@/component/layout/footer';

const Main = () => {
  return (
    <div>
      <Head>
        <title>Wow WeTV</title>
        <meta name="description" content="와우 위티비에 오신걸 환영합니다." />
      </Head>
      <>
        <HeaderLayout />
        <HomeLayout />
        <FooterLayout />
      </>
    </div>
  );
};

export default Main;
