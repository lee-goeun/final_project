import axios from 'axios';

export const axiosPost = () => {
  return (dispatch) => {
    axios
      .get('http://localhost:3001/board/')
      .then((res) => console.log('일반게시물 리스트 : ', res))
      .catch((error) => console.log(error));
  };
};
