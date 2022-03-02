import { combineReducers } from 'redux';
import profileImgHandler from './profileImgHandler';
import matching from './matching';
import loading from './loading';

const rootReducer = combineReducers({
  profileImgHandler,
  matching,
  loading,
});

export default rootReducer;
