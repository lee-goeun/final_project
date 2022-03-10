import { createAction, handleAction } from 'redux-actions';
import axios from 'axios';
import createRequestThunk from '../../../lib/createRequestThunk';

// post actions types
const GET_POST_LIST = `post/GET_POST_LIST`;
const GET_POST_REQUEST = 'post/GET_POST_REQUEST';
const GET_POST_SUCCESS = 'post/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'post/GET_POST_FAILURE';
const GET_POST = 'post/GET_POST';
const UPLOAD_POST = 'post/UPLOAD_POST';
const MODIFY_POST = 'post/MODIFY_POST';
const DELETE_POST = 'post/DELETE_POST';
const LIKE_POST = 'post/LIKE_POST';
const LIKE_CANCEL_POST = 'post/LIKE_CANCEL_POST';
const UPLOAD_COMMENT_IN_POST = 'post/UPLOAD_COMMENT_IN_POST';

// API actions
export const getPostList = () => {
  // const res = await axios.get('http://localhost:3001/board/');
  // getPostSuccess(res.data);
  return (dispatch) => {
    dispatch(getPostRequest());
    axios
      .get('http://localhost:3001/board/')
      .then((res) => {
        dispatch(getPostSuccess(res));
      })
      .catch((error) => {
        dispatch(getPostFailure(error));
      });
  };
};

export const getPost = (boardId) =>
  axios.get(`http://localhost:3001/board/post/${boardId}`);

export const uploadPost = (FormData) =>
  axios.post(`http://localhost:3001/board/post`, FormData);

export const modifyPost = (boardId) =>
  axios.post(`http://localhost:3001/board/post/edit/${boardId}`);

export const deletePost = (boardId) =>
  axios.delete(`http://localhost:3001/board/post/${boardId}`);

export const likePost = (boardId) =>
  axios.post(`http://localhost:3001/board/post/${boardId}/like`);

export const uploadCommentInPost = (boardId) =>
  axios.post(`http://localhost:3001/board/comment/${boardId}`);

// post actions
export const actionGetPostList = createAction(GET_POST_LIST, getPostList);

export const getPostRequest = () => {
  return {
    type: GET_POST_REQUEST,
  };
};

export const getPostSuccess = (res) => {
  return {
    type: GET_POST_SUCCESS,
    payload: res,
  };
};
// {
//   return {
//     type: GET_POST_SUCCESS,
//     payload: res,
//   };
// };

export const getPostFailure = (error) => {
  return {
    type: GET_POST_FAILURE,
    payload: error,
  };
};

export const goodIncrease = () => ({ type: LIKE_POST });
export const goodDecrease = () => ({ type: LIKE_CANCEL_POST });

// initial state
const postInitialState = {
  posts: [],
  postsLoading: false,
  postsError: null,
};

// 좋아요 기능 initial state
const LikeInitialState = {
  number: 0,
  isGood: false,
};

// post reducers
export const postReducer = (state = postInitialState, action) => {
  switch (action.type) {
    case GET_POST_REQUEST:
      return {
        ...state,
        postsLoading: true,
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        postsLoading: false,
      };
    case GET_POST_FAILURE:
      return {
        ...state,
        postsError: action.payload,
        postsLoading: false,
      };
    default:
      return state;
  }
};

// 좋아요 리듀서 함수
export const LikePostReducer = (state = LikeInitialState, action) => {
  switch (action.type) {
    case LIKE_POST:
      return {
        ...state,
        number: state.number + 1,
        isGood: !state.isGood,
      };
    case LIKE_CANCEL_POST:
      return {
        ...state,
        number: state.number - 1,
        isGood: !state.isGood,
      };
    default:
      return state;
  }
};
