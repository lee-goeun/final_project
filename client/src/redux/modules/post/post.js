import { createAction, handleAction } from 'redux-actions';
import axios from 'axios';
import createRequestThunk from '../../../lib/createRequestThunk';

// export const AXIOS_POST_LIST = 'AXIOS POST LIST',
//   AXIOS_POST_UPLOAD = 'AXIOS POST UPLOAD',
//   AXIOS_POST_ITEM = 'AXIOS POST ITEM',
//   AXIOS_POST_MODIFY = 'AXIOS POST MODIFY',
//   AXIOS_POST_DELETE = 'AXIOS POST DELETE',
//   AXIOS_POST_LIKE = 'AXIOS POST LIKE',
//   AXIOS_POST_COMMENT_UPLOAD = 'AXIOS POST COMMENT UPLOAD';

// export const getPostList = () => axios.get('http://localhost:3001/board/');

// const initialState = {};

// const postList = handleAction({
//   })
// });

export const getPostList = () => axios.get('http://localhost:3001/board/');

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

// post actions types
const GET_POST_LIST = `post/GET_POST_LIST`;
const GET_POST = 'post/GET_POST';
const UPLOAD_POST = 'post/UPLOAD_POST';
const MODIFY_POST = 'post/MODIFY_POST';
const DELETE_POST = 'post/DELETE_POST';
const LIKE_POST = 'post/LIKE_POST';
const UPLOAD_COMMENT_IN_POST = 'post/UPLOAD_COMMENT_IN_POST';

// post actions
export const actionGetPostList = createAction(GET_POST_LIST, getPostList);

// initial state
const initialState = {
  posts: {},
};

// post reducers
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_LIST:
      return {
        posts,
      };
  }
};
