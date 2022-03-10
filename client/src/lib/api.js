import axios from 'axios';

export const getMatchList = (matchId) =>
  axios.get('http://localhost:3001/match/list');
export const getMatchPost = (matchId) =>
  axios.get(`http://localhost:3001/match/detail/${matchId}`);
export const deleteMatchPost = (matchId) =>
  axios.put(`http://localhost:3001/match/del/${matchId}`);
export const writeMatchPost = (formData) => {
  return axios.post('http://localhost:3001/match/add', formData);
};
export const updateMatchPost = (formData) => {
  return axios.put('http://localhost:3001/match/mod', formData);
};


export const getMarketList = (keyword) =>
  axios.get(`http://localhost:3001/market/list?keyword=${keyword}`);
export const getMarketPost = (marketId) =>
  axios.get(`http://localhost:3001/market/detail/${marketId}`);
export const deleteMarketPost = (marketId) =>
  axios.put(`http://localhost:3001/market/del/${marketId}`);
export const writeMarketPost = (formData) => {
  return axios.post('http://localhost:3001/market/add', formData);
};
export const updateMarketPost = (formData) => {
  return axios.put('http://localhost:3001/market/mod', formData);
};
//관심목록
export const addLikeMarketPost = (data) => {
  return axios.post('http://localhost:3001/market/like', data);
};
export const delLikeMarketPost = (data) => {
  return axios.post('http://localhost:3001/market/delLike', data);
};

