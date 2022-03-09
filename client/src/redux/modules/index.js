import { combineReducers } from 'redux';
import profileImgHandler from './profileImgHandler';
import matching from './matching';
import loading from './loading';

import { LikePostReducer, postReducer } from './post/post';

const rootReducer = combineReducers({
  profileImgHandler,
  matching,
  loading,
  post: postReducer,
  likePost: LikePostReducer,
});

export default rootReducer;
