import axios from 'axios';

export const getMatchList = (matchId) =>
  axios.get('http://localhost:3001/match/list');
export const getMatchPost = (matchId) =>
  axios.get(`http://localhost:3001/match/detail/${matchId}`);
export const deleteMatchPost = (matchId) =>
  axios.put(`http://localhost:3001/match/del/${matchId}`);
export const writeMatchPost = (formData) => {
  // for (const [key, value] of formData.entries()) {
  //   console.log(`key:${key}, value:${value}}0000000000000000000000000000`);
  // }
  return axios.post('http://localhost:3001/match/add', formData);
};
export const updateMatchPost = (formData) => {
  // console.log(formData, '2222222222222222222222222222222222222222');
  // for (const [key, value] of formData.entries()) {
  //   console.log(`key:${key}, value:${value}}11111111111111111111111111111`);
  // }
  return axios.put('http://localhost:3001/match/mod', formData);
};


export const getMarketList = (marketId) =>
  axios.get('http://localhost:3001/market/list');
export const getMarketPost = (marketId) =>
  axios.get(`http://localhost:3001/market/detail/${marketId}`);
export const deleteMarketPost = (marketId) =>
  axios.put(`http://localhost:3001/market/del/${marketId}`);
export const writeMarketPost = (formData) => {
  // for (const [key, value] of formData.entries()) {
  //   console.log(`key:${key}, value:${value}}0000000000000000000000000000`);
  // }
  return axios.post('http://localhost:3001/market/add', formData);
};
export const updateMarketPost = (formData) => {
  // console.log(formData, '2222222222222222222222222222222222222222');
  // for (const [key, value] of formData.entries()) {
  //   console.log(`key:${key}, value:${value}}11111111111111111111111111111`);
  // }
  return axios.put('http://localhost:3001/market/mod', formData);
};
