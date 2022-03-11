import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as api from '../../lib/api';
import createRequestThunk from '../../lib/createRequestThunk';
import moment from 'moment';

//action type
const CHANGE_INPUT = 'mypet/CHANGE_INPUT';
const CHANGE_INPUT_TIME = 'mypet/CHANGE_INPUT_TIME';
const CHANGE_INPUT_IMAGE = 'mypet/CHANGE_INPUT_IMAGE';
const INITIALIZE_FORM = 'mypet/INITIALIZE_FORM';

const WRITE_POST = 'mypet/WRITE_POST';
const WRITE_POST_SUCCESS = 'mypet/WRITE_POST_SUCCESS';
//작성된포스트불러오기
const SET_ORIGINAL_POST = 'mypet/SET_ORIGINAL_POST';
const UPDATE_POST = 'mypet/UPDATE_POST';
const UPDATE_POST_SUCCESS = 'mypet/UPDATE_POST_SUCCESS';

const GET_LIST = 'mypet/GET_LIST';
const GET_LIST_SUCCESS = 'mypet/GET_LIST_SUCCESS';

const GET_POST = 'mypet/GET_POST';
const GET_POST_SUCCESS = 'mypet/GET_POST_SUCCESS';
const UNLOAD_POST = 'mypet/UNLOAD_POST';

const DELETE_POST = 'mypet/DELETE_POST';
const DELETE_POST_SUCCESS = 'mypet/DELETE_POST_SUCCESS';

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
export const writeMyPetPost = createRequestThunk(
  WRITE_POST,
  api.writeMyPetPost,
);
export const setOriginalPost = createAction(SET_ORIGINAL_POST, (post) => post);
export const updateMyPetPost = createRequestThunk(
  UPDATE_POST,
  api.updateMyPetPost,
);
export const getMyPetList = createRequestThunk(GET_LIST, api.getMyPetList);
export const getmyPetPost = createRequestThunk(GET_POST, api.getMyPetPost);
export const unloadPost = createAction(UNLOAD_POST);
export const deleteMyPetPost = createRequestThunk(
  DELETE_POST,
  api.delMyPetPost,
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
    petName: '',
    petTypeDetail: '',
    petType: '',
    petBirth: '',
    petSex: '',
    petImgName:''
  },

  update: {
    petName: '',
    petTypeDetail: '',
    petType: '',
    petBirth: '',
    petSex: '',
    petImgName:'',
    petId:''
  },
};

//reducer
const mypet = handleActions(
  {
    //form change write/update
    [CHANGE_INPUT]: (state, { payload: { form, name, value } }) =>
      produce(state, (draft) => {
        draft[form][name] = value;
      }),
    [CHANGE_INPUT_IMAGE]: (state, { payload: { form, imgUrl, imgName } }) =>
      produce(state, (draft) => {
        draft[form]['petImgName'] = imgName;
        draft[form]['imageUrl'] = imgUrl;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
      ...state,
      update: {
        petName: post.petName,
        petTypeDetail: post.petTypeDetail,
        petType : post.petType,
        petBirth: moment(post.petBirth).format('YYYY-MM-DD'),
        petImgName: post.petImgName,
        petSex : post.petSex,
        petId: post.petId,
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

export default mypet;
