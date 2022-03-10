import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as api from '../../lib/api';
import createRequestThunk from '../../lib/createRequestThunk';
import moment from 'moment';

//action type
const CHANGE_INPUT = 'market/CHANGE_INPUT';
const CHANGE_INPUT_TIME = 'market/CHANGE_INPUT_TIME';
const CHANGE_INPUT_IMAGE = 'market/CHANGE_INPUT_IMAGE';
const INITIALIZE_FORM = 'market/INITIALIZE_FORM';

const LIKE_POST = 'market/LIKE_POST';
const LIKE_POST_SUCCESS = 'market/LIKE_POST_SUCCESS';
const DELLIKE_POST = 'market/DELLIKE_POST';
const DELLIKE_POST_SUCCESS = 'market/DELLIKE_POST_SUCCESS';

const WRITE_POST = 'market/WRITE_POST';
const WRITE_POST_SUCCESS = 'market/WRITE_POST_SUCCESS';
//작성된포스트불러오기
const SET_ORIGINAL_POST = 'market/SET_ORIGINAL_POST';
const UPDATE_POST = 'market/UPDATE_POST';
const UPDATE_POST_SUCCESS = 'market/UPDATE_POST_SUCCESS';

const GET_LIST = 'market/GET_LIST';
const GET_LIST_SUCCESS = 'market/GET_LIST_SUCCESS';

const GET_POST = 'market/GET_POST';
const GET_POST_SUCCESS = 'market/GET_POST_SUCCESS';
const UNLOAD_POST = 'market/UNLOAD_POST';

const DELETE_POST = 'market/DELETE_POST';
const DELETE_POST_SUCCESS = 'market/DELETE_POST_SUCCESS';

//action creator
export const changeInput = createAction(
  CHANGE_INPUT,
  ({ form, name, value }) => ({
    form,
    name,
    value,
  }),
);
export const changeInputTime = createAction(
  CHANGE_INPUT_TIME,
  ({ form, time }) => ({ form, time }),
);
export const changeInputImage = createAction(
  CHANGE_INPUT_IMAGE,
  ({ form, imgUrl, imgName }) => ({ form, imgUrl, imgName }),
);

export const addLikeMarketPost = createRequestThunk(
  LIKE_POST,
  api.addLikeMarketPost,
);
export const delLikeMarketPost = createRequestThunk(
  DELLIKE_POST,
  api.delLikeMarketPost,
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const writeMarketPost = createRequestThunk(
  WRITE_POST,
  api.writeMarketPost,
);
export const setOriginalPost = createAction(SET_ORIGINAL_POST, (post) => post);
export const updateMarketPost = createRequestThunk(
  UPDATE_POST,
  api.updateMarketPost,
);
export const getMarketList = createRequestThunk(GET_LIST, api.getMarketList);
export const getMarketPost = createRequestThunk(GET_POST, api.getMarketPost);
export const unloadPost = createAction(UNLOAD_POST);
export const deleteMarketPost = createRequestThunk(
  DELETE_POST,
  api.deleteMarketPost,
);


//init state
const initialState = {
  loading: {
    GET_LIST: false,
    GET_POST: false,
    DELETE_POST: false,
    WRITE_POST: false,
    UPDATE_POST: false,
    LIKE_POST: false,
    DELLIKE_POST: false,
  },

  list: null,
  post: null,
  res: null,

  write: {
    marketTitle: '',
    marketContent: '',
    price :"",
    marketImgName: '',
    imageUrl: '',
  },

  update: {
    marketTitle: '',
    marketContent: '',
    price :"",
    marketImgName: '',
    marketId: '',
    imageUrl: '',
  },
};

//reducer
const market = handleActions(
  {
    //form change write/update
    [CHANGE_INPUT]: (state, { payload: { form, name, value } }) =>
      produce(state, (draft) => {
        draft[form][name] = value;
      }),
    [CHANGE_INPUT_IMAGE]: (state, { payload: { form, imgUrl, imgName } }) =>
      produce(state, (draft) => {
        draft[form]['marketImgName'] = imgName;
        draft[form]['imageUrl'] = imgUrl;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
      ...state,
      update: {
        marketTitle: post.marketTitle,
        marketContent: post.marketContent,
        price:post.price,
        marketImgName: post.marketImgName,
        marketId: post.marketId,
        imageUrl: post.imageUrl,
      },
    }),
    //api request
    [LIKE_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        LIKE_POST: false,
      },
      res: action.payload,
    }),
    [DELLIKE_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        DELLIKE_POST: false,
      },
      res: action.payload,
    }),
    [WRITE_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        WRITE_POST: false,
      },
      res: action.payload,
    }),
    [UPDATE_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        UPDATE_POST: false,
      },
      res: action.payload,
    }),
    [GET_LIST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_LIST: false,
      },
      list: action.payload,
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false,
      },
      post: action.payload,
    }),
    [UNLOAD_POST]: () => initialState,
    [DELETE_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        DELETE_POST: false,
      },
      post: action.payload,
    }),
  },

  initialState,
);

export default market;
