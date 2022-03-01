import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as api from '../../lib/api';
import createRequestThunk from '../../lib/createRequestThunk';

//action type
const CHANGE_INPUT = 'matching/CHANGE_INPUT';
const CHANGE_INPUT_TIME = 'matching/CHANGE_INPUT_TIME';
const CHANGE_INPUT_IMAGE = 'matching/CHANGE_INPUT_IMAGE';
const INITIALIZE_FORM = 'matching/INITIALIZE_FORM';

const GET_LIST = 'matching/GET_LIST';
const GET_LIST_SUCCESS = 'matching/GET_LIST_SUCCESS';

const GET_ITEM = 'matching/GET_ITEM';
const GET_ITEM_SUCCESS = 'matching/GET_ITEM_SUCCESS';

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
  ({ form, uploaded }) => ({ form, uploaded }),
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const getMatchList = createRequestThunk(GET_LIST, api.getMatchList);
export const getMatchItem = createRequestThunk(GET_ITEM, api.getMatchItem);

//init state
const initialState = {
  loading: {
    GET_LIST: false,
    GET_ITEM: false,
  },

  list: null,
  item: null,

  write: {
    matchTitle: '',
    matchContent: '',
    matchTime: '',
    matchImgName: '',
    selectPet: '',
  },

  update: {
    matchTitle: '',
    matchContent: '',
    matchTime: '',
    matchImgName: '',
    selectPet: '',
  },
};

//reducer
const matching = handleActions(
  {
    //form change write
    [CHANGE_INPUT]: (state, { payload: { form, name, value } }) =>
      produce(state, (draft) => {
        draft[form][name] = value;
      }),
    [CHANGE_INPUT_TIME]: (state, { payload: { form, time } }) =>
      produce(state, (draft) => {
        draft[form]['matchTime'] = time;
      }),
    [CHANGE_INPUT_IMAGE]: (state, { payload: { form, uploaded } }) =>
      produce(state, (draft) => {
        draft[form]['matchImgName'] = uploaded;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    //api request
    [GET_LIST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_LIST: false,
      },
      list: action.payload,
    }),
    [GET_ITEM_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_ITEM: false,
      },
      item: action.payload,
    }),
  },
  initialState,
);

export default matching;
