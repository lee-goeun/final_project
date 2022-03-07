import { combineReducers } from 'redux';
import user from './user_reducer';
import { postReducer } from './post_reducer';

const rootReducer = combineReducers({
  user,
  post: postReducer,
});

export default rootReducer;
