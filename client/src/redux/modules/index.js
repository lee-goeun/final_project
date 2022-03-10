import { combineReducers } from 'redux';
import profileImgHandler from './profileImgHandler';
import matching from './matching';
import market from './market';
import loading from './loading';
import { post } from './post';

import { LikePostReducer, postReducer } from './post/post';

const rootReducer = combineReducers({
  profileImgHandler,
  matching,
  market,
  loading,
  post,
  postReducer,
  LikePostReducer,
});

export default rootReducer;
