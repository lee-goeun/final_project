import { startLoading, finishLoading } from '../redux/modules/loading';

export default function createRequestThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  //params로 api리퀘스트가들어가야하는거아닌가>1이나오네? container가필요한가?거기서 한번 더 호출을하던데 왜지?
  return (params) => async (dispatch) => {
    dispatch({ type }); //start
    dispatch(startLoading(type));
    try {
      const response = await request(params);
      dispatch({
        type: SUCCESS,
        payload: response.data,
      }); //in case success
      dispatch(finishLoading(type));
    } catch (e) {
      dispatch({
        type: FAILURE,
        payload: e,
        error: true,
      }); // in case error
      dispatch(startLoading(type));
      throw e; //showing error on component
    }
  };
}
