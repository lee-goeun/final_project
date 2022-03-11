import { combineReducers } from 'redux';
import profileImgHandler from './profileImgHandler';
import matching from './matching';
import market from './market';
import loading from './loading';
import { post } from './post';

const rootReducer = combineReducers({
  profileImgHandler,
  matching,
  market,
  loading,
  post,
});

export default rootReducer;
