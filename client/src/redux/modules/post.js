import { handleActions } from 'redux-actions';
import { isDoStatement } from 'typescript';
import * as api from '../../lib/api';

const GET_POST_LIST = 'post/GET_POST_LIST';
const GET_POST_LIST_SUCCESS = 'post/GET_POST_LIST_SUCCESS';
const GET_POST_LIST_FAILURE = 'post/GET_POST_LIST_FAILURE';

const GET_POST = 'post/GET_POST';
const GET_POST_SUCCESS = 'post/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'post/GET_POST_FAILURE';

const UPDATE_POST = 'post/UPDATE_POST';
const UPDATE_POST_SUCCESS = 'post/UPDATE_POST_SUCCESS';
const UPDATE_POST_FAILURE = 'post/UPDATE_POST_FAILURE';

const REPORT_POST = 'post/REPORT_POST';
const REPORT_POST_SUCCESS = 'post/REPORT_POST_SUCCESS';
const REPORT_POST_FAILURE = 'post/REPORT_POST_FAILURE';

const LIKE_POST = 'post/LIKE_POST';
const LIKE_POST_SUCCESS = 'post/LIKE_POST_SUCCESS';
const LIKE_POST_FAILURE = 'post/LIKE_POST_FAILURE';

export const getPostList = () => async (dispatch) => {
  dispatch({ type: GET_POST_LIST });
  try {
    const response = await api.getPostList();
    dispatch({
      type: GET_POST_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_POST_LIST_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

export const getPost = (boardId) => async (dispatch) => {
  dispatch({ type: GET_POST });
  try {
    const response = await api.getPost(boardId);
    dispatch({
      type: GET_POST_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

export const updatePost = (boardId) => async (dispatch) => {
  dispatch({ type: UPDATE_POST });
  try {
    const response = await api.updatePost(boardId);
    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_POST_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

export const reportPost = (boardId) => async (dispatch) => {
  dispatch({ type: REPORT_POST });
  try {
    const response = await api.reportPost(boardId);
    dispatch({
      type: REPORT_POST_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: REPORT_POST_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

export const likePost = (boardId, userId) => async (dispatch) => {
  dispatch({ type: LIKE_POST });
  try {
    const response = await api.likePost(boardId, userId);
    dispatch({
      type: LIKE_POST_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: LIKE_POST_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

const initialState = {
  loading: {
    GET_POST_LIST: false,
    GET_POST: false,
    UPDATE_POST: false,
    REPORT_POST: false,
    LIKE_POST: false,
  },
  postList: null,
  postListCommentList: null,
  post: null,
  commentList: null,
  imgList: null,
  goodStatus: null,
  collectStatus: null,
  LikeStatus: 0,
};

export const post = handleActions(
  {
    [GET_POST_LIST]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST_LIST: true,
      },
    }),
    [GET_POST_LIST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST_LIST: false,
      },
      postList: action.payload,
      postListCommentList: action.payload.comment,
    }),

    [GET_POST_LIST_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST_LIST: false,
      },
    }),
    [GET_POST]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: true,
      },
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false,
      },
      post: action.payload,
      commentList: action.payload.comment,
      imgList: action.payload.boardImgList,
      goodStatus: action.payload.goodStatus,
      collectStatus: action.payload.collectStatus,
    }),
    [LIKE_POST]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        LIKE_POST: true,
      },
    }),
    [LIKE_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        LIKE_POST: false,
      },
      LikeStatus: action.payload,
    }),
    [LIKE_POST_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        LIKE_POST: false,
      },
    }),
  },
  initialState,
);
