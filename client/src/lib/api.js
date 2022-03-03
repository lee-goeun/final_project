import axios from 'axios';

export const getMatchList = (matchId) =>
  axios.get('http://localhost:3001/match/list');
export const getMatchItem = (matchId) =>
  axios.get(`http://localhost:3001/match/detail/${matchId}`);
export const deleteMatchItem = (matchId) =>
  axios.put(`http://localhost:3001/match/del/${matchId}`);
export const postMatchItem = () =>
  axios.post('http://localhost:3001/match/add');
export const updateMatchItem = () =>
  axios.put('http://localhost:3001/match/mod');
