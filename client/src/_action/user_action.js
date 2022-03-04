import axios from 'axios';
import {AUTH_USER, SIGNIN_USER, SIGNUP_USER} from "./types";

export function signinUser(dataToSubmit){
  const request = axios.post('http://localhost:3001/auth/login', dataToSubmit)
    .then(response => response.data)
  console.log('req',request);
  
  return{
      type:SIGNIN_USER,
      payload:request
  }
}

export function signupUser(dataToSubmit){
  const request = axios.post('http://localhost:3001/auth/join', dataToSubmit)
    .then(response => response.data)

    return {
      type : SIGNUP_USER,
      payload : request
    }
}

export function auth(){
  const request = axios.get('http://localhost:3001/auth/auth').then(response => response.data)
  return {
    type : AUTH_USER,
    payload : request
  }
}