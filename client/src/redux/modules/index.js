import { combineReducers } from 'redux';
import profileImgHandler from './profileImgHandler';
import matching from './matching';
import market from './market';
import mypet from './mypet';
import loading from './loading';
import { post } from './post';

const rootReducer = combineReducers({
  profileImgHandler,
  matching,
  market,
  mypet,
  loading,
  post,
});

export default rootReducer;
