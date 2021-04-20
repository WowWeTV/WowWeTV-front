import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '@/styles/layout/sub.module.scss';
import Top100Video from './Top100Video';
import RecentVideo from './RecentVideo';

const SubLayout = () => {
  const tabTitle = ['TOP100', '지금 뜨는'];
  const tab = { 0: <Top100Video />, 1: <RecentVideo /> };
  const [activeTab, setActiveTab] = useState(0);
  const onClickTab = (idx) => {
    setActiveTab(idx);
  };

  return (
    <div className={styles.sub_container}>
      <div className={styles.sub_tabs}>
        <div>
          {tabTitle.map((title, idx) => {
            return (
              <span
                key={title}
                onClick={() => onClickTab(idx)}
                className={
                  activeTab === idx
                    ? classnames(styles.active, styles.sub_tab)
                    : styles.sub_tab
                }
              >
                {title}
              </span>
            );
          })}
        </div>
      </div>
      {tab[activeTab]}
    </div>
  );
};

export default SubLayout;
