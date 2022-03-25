import axios from "axios";
import { api } from "../urlConfig";
import store  from "../store";
import { authConstants } from "../actions/constants";

const token = window.localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    'Authorization': token ? `Bearer ${token}`  : "",
  },
});

// This will assign the new token after the logout with token exipred.
axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if(auth.token) {
    req.headers.Authorization =  `Bearer ${auth.token}`;
  }
  return req;
})

//System do this thing to imedeatly signout if the user's token is expired. 
axiosInstance.interceptors.response.use((res) => {
  return res;
}, (error) => {
    console.log(error.response);
    const  status  = error.response ? error.response.status : 500;
    if(status && status === 500){
      localStorage.clear();
      store.dispatch({type: authConstants.LOGOUT_SUCCESS}); // We cannot directly access auth.actions.js file. Because we can't call react hooks in here (useDespatch). So thats why we access our store. 
    }
    return Promise.reject(error);
})

export default axiosInstance;
