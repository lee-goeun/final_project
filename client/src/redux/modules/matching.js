import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as api from '../../lib/api';
import createRequestThunk from '../../lib/createRequestThunk';
import moment from 'moment';

//action type
const CHANGE_INPUT = 'matching/CHANGE_INPUT';
const CHANGE_INPUT_TIME = 'matching/CHANGE_INPUT_TIME';
const CHANGE_INPUT_IMAGE = 'matching/CHANGE_INPUT_IMAGE';
const INITIALIZE_FORM = 'matching/INITIALIZE_FORM';

const WRITE_POST = 'matching/WRITE_POST';
const WRITE_POST_SUCCESS = 'matching/WRITE_POST_SUCCESS';
//작성된포스트불러오기
const SET_ORIGINAL_POST = 'matching/SET_ORIGINAL_POST';
const UPDATE_POST = 'matching/UPDATE_POST';
const UPDATE_POST_SUCCESS = 'matching/UPDATE_POST_SUCCESS';

const GET_LIST = 'matching/GET_LIST';
const GET_LIST_SUCCESS = 'matching/GET_LIST_SUCCESS';

const GET_POST = 'matching/GET_POST';
const GET_POST_SUCCESS = 'matching/GET_POST_SUCCESS';
const UNLOAD_POST = 'matching/UNLOAD_POST';

const DELETE_POST = 'matching/DELETE_POST';
const DELETE_POST_SUCCESS = 'matching/DELETE_POST_SUCCESS';

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
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const writeMatchPost = createRequestThunk(
  WRITE_POST,
  api.writeMatchPost,
);
export const setOriginalPost = createAction(SET_ORIGINAL_POST, (post) => post);
export const updateMatchPost = createRequestThunk(
  UPDATE_POST,
  api.updateMatchPost,
);
export const getMatchList = createRequestThunk(GET_LIST, api.getMatchList);
export const getMatchPost = createRequestThunk(GET_POST, api.getMatchPost);
export const unloadPost = createAction(UNLOAD_POST);
export const deleteMatchPost = createRequestThunk(
  DELETE_POST,
  api.deleteMatchPost,
);

//init state
const initialState = {
  loading: {
    GET_LIST: false,
    GET_POST: false,
    DELETE_POST: false,
    WRITE_POST: false,
    UPDATE_POST: false,
  },

  list: null,
  post: null,
  res: null,

  write: {
    matchTitle: '',
    matchContent: '',
    matchTime: new Date(),
    matchImgName: '',
    selectPet: '',
    imageUrl: '',
  },

  update: {
    matchTitle: '',
    matchContent: '',
    matchTime: new Date(),
    matchImgName: '',
    selectPet: '',
    matchId: '',
    imageUrl: '',
  },
};

//reducer
const matching = handleActions(
  {
    //form change write/update
    [CHANGE_INPUT]: (state, { payload: { form, name, value } }) =>
      produce(state, (draft) => {
        draft[form][name] = value;
      }),
    [CHANGE_INPUT_TIME]: (state, { payload: { form, time } }) =>
      produce(state, (draft) => {
        draft[form]['matchTime'] = moment(time).format('YYYY-MM-DD HH:mm');
      }),
    [CHANGE_INPUT_IMAGE]: (state, { payload: { form, imgUrl, imgName } }) =>
      produce(state, (draft) => {
        draft[form]['matchImgName'] = imgName;
        draft[form]['imageUrl'] = imgUrl;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
      ...state,
      update: {
        matchTitle: post.matchTitle,
        matchContent: post.matchContent,
        matchTime: moment(post.matchTime).format('YYYY-MM-DD HH:mm'),
        matchImgName: post.matchImgName,
        selectPet: post.selectPet,
        matchId: post.matchId,
        imageUrl: post.imageUrl,
      },
    }),
    //api request
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

export default matching;
