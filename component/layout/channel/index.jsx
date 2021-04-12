import styles from '@/styles/layout/channel.module.scss';
import InfoWrap from './InfoWrap';
import InfoContent from './InfoContent';

const Channel = () => {
  return (
    <div className={styles.channel_container}>
      <InfoWrap />
    </div>
  );
};

export default Channel;
