import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import reducer from '../lib/slices';

const makeStore = (context) =>
  configureStore({
    reducer,
  });

const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
