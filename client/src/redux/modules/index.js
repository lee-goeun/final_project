import { combineReducers } from 'redux';
import profileImgHandler from './profileImgHandler';
import matching from './matching';
import market from './market';
import loading from './loading';

import { LikePostReducer, postReducer } from './post/post';

const rootReducer = combineReducers({
  profileImgHandler,
  matching,
  market,
  loading,
  postReducer,
  LikePostReducer,
});

export default rootReducer;
