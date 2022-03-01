import { combineReducers } from 'redux';
import profileImgHandler from './profileImgHandler';
import matching from './matching';

const rootReducer = combineReducers({
  profileImgHandler,
  matching,
});

export default rootReducer;
