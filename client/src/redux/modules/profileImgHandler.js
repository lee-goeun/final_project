//action type
const UPLOAD = 'profileImgButtons/UPLOAD';
const REMOVE = 'profileImgButtons/REMOVE';

//action creator
// export const upload = (input) => ({ type: UPLOAD, input });
export const upload = (imgUrl) => ({ type: UPLOAD, payload: imgUrl });
export const remove = () => ({ type: REMOVE });

//initial state
const initialState = {
  user_img: '',
  user_img_name: '',
};

//reducer
function profileImgHandler(state = initialState, action) {
  switch (action.type) {
    case UPLOAD:
      return { ...state, user_img: action.payload };
    case REMOVE:
      return {
        //remove login
      };
    default:
      return state;
  }
}

export default profileImgHandler;
