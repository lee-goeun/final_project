//action type
const UPLOAD = 'profileImgButtons/UPLOAD';
const REMOVE = 'profileImgButtons/REMOVE';

//action creator
export const upload = (input) => ({ type: UPLOAD, input });
export const remove = () => ({ type: REMOVE });

//initial state
const initialState = {
  user_img:
    'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2598&q=80',
};

//reducer
function profileImgButtons(state = initialState, action) {
  switch (action.type) {
    case UPLOAD:
      return {
        user_img: action.input,
      };
    case REMOVE:
      return {
        //remove login
      };
    default:
      return state;
  }
}

export default profileImgButtons;
