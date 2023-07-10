import axios from 'axios';
import Api from './Api';

export const api = axios.create({
  baseURL: Api.request.URL 
});

const refreshAccessToken = async () => {

  //const refreshTokens = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiQURNSU4iLCJpZCI6MX0sImlhdCI6MTYyNDk1MTQ2MiwiZXhwIjoxNjI1MDM3ODYyfQ.jVSIfyWHiB0NpzoV5hwA5wUFLADr4fACQXMkeXza4nb";
 const refreshTokens = localStorage.getItem('refreshTokens');
  if (refreshTokens === null || refreshTokens === '') {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshTokens');
    localStorage.removeItem('auth_user');

   return window.location.replace('/login');
  }
  const userId = Api.request.userID;
  const username = Api.request.username;

  const result = await api.post('/api/v2/Auth/renew', { userId,refreshTokens,username });
  //console.log("result: ", result.data);
  return result.data.accessToken;
  // console.log("result: ", result.data);
  // return result.data.accessToken;
  };

  api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['X-User'] = Api.request.userID;
      return config;
    },
    error => {
      //console.log("errorr: ", error)
      return Promise.reject(error);
      //console.log("error: ", error);
    }
  );

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     config.headers.Authorization = Bearer ${token};
//     config.headers['X-User'] = store.getState().user.data.id;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  response => response,
  async function(error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const access_token = await refreshAccessToken();
     // console.log('access_token: ',access_token)
      localStorage.setItem('token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      return api(originalRequest);
    }else if(error.response.status === 403){
      localStorage.removeItem('token');
      localStorage.removeItem('refreshTokens');
      localStorage.removeItem('auth_user');
     return window.location.replace('/login');
    }
    if(error.response.data.message === "invalid refresh token"){
      localStorage.removeItem('token');
      localStorage.removeItem('refreshTokens');
      localStorage.removeItem('auth_user');
     return window.location.replace('/login');
    }else{

    }

    return Promise.reject(error);
  }
);




// var IDLE_TIMEOUT = 5; //seconds
// var _idleSecondsCounter = 0;
// document.onclick = function() {
//     _idleSecondsCounter = 0;
// };
// document.onmousemove = function() {
//     _idleSecondsCounter = 0;
// };
// document.onkeypress = function() {
//     _idleSecondsCounter = 0;
// };
// window.setInterval(CheckIdleTime, 1000);

// function CheckIdleTime() {
//     _idleSecondsCounter++;
//     var oPanel = document.getElementById("SecondsUntilExpire");
//     if (oPanel)
//         oPanel.innerHTML = (IDLE_TIMEOUT - _idleSecondsCounter) + "";
//     if (_idleSecondsCounter >= IDLE_TIMEOUT) {
//         alert("Time expired!");
//        document.location.href = "/login";
//        //return window.location.replace('/login');
//     }
// }

// export function ErrorHandler(error, src = '') {
//   if (error.response) {
//     let { message = '' } = error.response.data;
//     console.error('error.response', message);
  
//   } else {
//     console.log(src);
//     return 'Something went really wrong. Please check your connection or contact our support.';
//   }
// }


export default api;
