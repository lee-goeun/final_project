import { handleActions } from 'redux-actions';
import * as api from '../../lib/api';
import createRequestThunk from '../../lib/createRequestThunk';

const GET_MARKET_LIST = 'mypage/GET_MARKET_LIST';
const GET_MARKET_LIST_SUCCESS = 'mypage/GET_MARKET_LIST_SUCCESS';

const GET_MATCHING_LIST = 'mypage/GET_MATCHING_LIST';
const GET_MATCHING_LIST_SUCCESS = 'mypage/GET_MATCHING_LIST_SUCCESS';

const GET_LIKE_MARKET_LIST = 'mypage/GET_LIKE_MARKET_LIST';
const GET_LIKE_MARKET_LIST_SUCCESS = 'mypage/GET_LIKE_MARKET_LIST_SUCCESS';

const GET_POST_LIST = 'mypage/GET_POST_LIST';
const GET_POST_LIST_SUCCESS = 'mypage/GET_POST_LIST_SUCCESS';

//action creator
export const getMyMarketList = createRequestThunk(
  GET_MARKET_LIST,
  api.getMyMarketList,
);
export const getMyMatchingList = createRequestThunk(
  GET_MATCHING_LIST,
  api.getMyMatchingList,
);

export const getMyLikeMarketList = createRequestThunk(
  GET_LIKE_MARKET_LIST,
  api.getMyLikeMarketList,
);

export const getMyPostList = createRequestThunk(
  GET_POST_LIST,
  api.getMyPostList,
);

//init state
const initialState = {
  loading: {
    GET_LIST: false,
  },
};

//reducer
const matching = handleActions(
  {
    //api request
    [GET_MARKET_LIST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_LIST: false,
      },
      marketList: action.payload,
    }),
    [GET_MATCHING_LIST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_LIST: false,
      },
      matchList: action.payload,
    }),

    [GET_LIKE_MARKET_LIST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_LIST: false,
      },
      marketLikeList: action.payload,
    }),

    [GET_POST_LIST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_LIST: false,
      },
      postList: action.payload,
    }),
  },

  initialState,
);

export default matching;
