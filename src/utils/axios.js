import axios from "axios";



const DOMAIN = "http://3.36.45.215:8000";  //backend server 01

axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해
export const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
