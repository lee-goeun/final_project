import axios from 'axios';

export const getMatchList = () => axios.get('http://localhost:3001/match/list');
export const postMatchItem = () =>
  axios.post('http://localhost:3001/match/add');
