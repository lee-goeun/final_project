import { createAction, handleActions } from 'redux-actions';

// action type
const START_LOADING = 'loading/START_LOADING';
const END_LOADING = 'loading/END_LOADING';

// 로딩 시작/끝 액션 함수를 만들고 외부에서 사용할 수 있도록 공개
export const startLoading = createAction(
  START_LOADING,
  (actionType) => actionType,
);
export const endLoading = createAction(END_LOADING, (actionType) => actionType);

// init states - 모듈의 초기 값
const initialState = {};

// reducer
const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [END_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState,
);

export default loading;
