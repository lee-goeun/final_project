import axios from 'axios';

// ------ 산책메이트 --------
export const getMatchList = (keyword) =>
  axios.get(`http://118.67.142.229:3001/match/list?keyword=${keyword}`);
export const getMatchPost = (matchId) =>
  axios.get(`http://118.67.142.229:3001/match/detail/${matchId}`);
export const deleteMatchPost = (matchId) =>
  axios.put(`http://118.67.142.229:3001/match/del/${matchId}`);
export const writeMatchPost = (formData) => {
  return axios.post('http://118.67.142.229:3001/match/add', formData);
};
export const updateMatchPost = (formData) => {
  return axios.put('http://118.67.142.229:3001/match/mod', formData);
};

// ------ 중고장터 ---------
export const getMarketList = (data) =>
  axios.get(`http://118.67.142.229:3001/market/list/`, { params: data });
export const getMarketPost = (marketId) =>
  axios.get(`http://118.67.142.229:3001/market/detail/${marketId}`);
export const deleteMarketPost = (marketId) =>
  axios.put(`http://118.67.142.229:3001/market/del/${marketId}`);
export const writeMarketPost = (formData) => {
  return axios.post('http://118.67.142.229:3001/market/add', formData);
};
export const updateMarketPost = (formData) => {
  return axios.put('http://118.67.142.229:3001/market/mod', formData);
};
//관심목록
export const addLikeMarketPost = (data) => {
  return axios.post('http://118.67.142.229:3001/market/like', data);
};
export const delLikeMarketPost = (data) => {
  return axios.post('http://118.67.142.229:3001/market/delLike', data);
};
//물건구매하기
export const sellingMarketPost = (data) => {
  return axios.post('http://118.67.142.229:3001/market/selling', data);
};

// ------ 마이페이지 --------
//나의 게시물
export const getMyMatchingList = (userId) =>
  axios.get(`http://118.67.142.229:3001/match/myList/${userId}`);
export const getMyMarketList = (userId) =>
  axios.get(`http://118.67.142.229:3001/market/myList/${userId}`);
export const getMyPostList = (userId) =>
  axios.get(`http://118.67.142.229:3001/mypage/myboard`, {params: { userId: userId }});

// export const getMyProfileUpdate = (userId) =>
//   axios.get(`http://118.67.142.229:3001/Profile/Update`, userId);

//나의반려동물
export const getMyPetList = (userId) =>
  axios.get(`http://118.67.142.229:3001/mypage/mypetList?userId=${userId}`);
export const writeMyPetPost = (formData) => {
  return axios.post('http://118.67.142.229:3001/mypage/mypetAdd', formData);
};
// TODO : 추후 시간되면 수정까지
export const getMyPetPost = (petId) => {
  return axios.get(`http://118.67.142.229:3001/mypage/mypet/${petId}`);
};
export const updateMyPetPost = (formData) => {
  return axios.put('http://118.67.142.229:3001/mypage/mypetAdd', formData);
};
export const delMyPetPost = (petId) => {
  return axios.put(`http://118.67.142.229:3001/mypage/del/${petId}`);
};

//관심게시물
export const getMyLikeMarketList = (userId) =>
  axios.get(`http://118.67.142.229:3001/market/myLikeList/${userId}`);
export const getMyCollectPostList = (userId) =>
  axios.get(`http://118.67.142.229:3001/mypage/mycollectboard`, {params: { userId: userId }});

//프로필관리(임시)
export const getMyInfoPost = (userId) => {
  return axios.get(`http://118.67.142.229:3001/mypage/mypet/${userId}`);
};
// 펫 프로필 수정
export const updateMyInfoPost = (formData) => {
  return axios.put('http://118.67.142.229:3001/mypage/mypetAdd', formData);
};

// 수정 작업 중 주석 처리 [서성조]
// 일반 게시물
export const getPostList = (boardId) =>
  axios.get('http://118.67.142.229:3001/board/');

// 게시물 요청
export const getPost = (boardId) =>
  axios.get(`http://118.67.142.229:3001/board/post/${boardId}`);

//게시물 갱신
export const updatePost = (boardId) =>
  axios.post(`http://118.67.142.229:3001/board/post/edit/${boardId}`);

// 게시물 신고
export const reportPost = (boardId) =>
  axios.post(`http://118.67.142.229:3001/board/post/${boardId}/report`);

// 게시물 좋아요
export const likePost = (boardId, userId) =>
  axios.post(`http://118.67.142.229:3001/board/post/${boardId}/like`, userId);

// 댓글 삭제 [redux로 변경시 수정필요]
export const deleteComment = (boardId, userId) =>
  axios.post(`http://118.67.142.229:3001/board/post/${boardId}/like`, userId);
