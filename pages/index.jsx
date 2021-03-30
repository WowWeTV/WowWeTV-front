import styles from "../styles/main.module.scss";
import { useSelector } from 'react-redux';

const Main = () => {
  const { loading } = useSelector(state => state.video);
  console.log(loading);


  return <div className={styles.main}>홈 !!!!!!!</div>;
};
export default Main;
