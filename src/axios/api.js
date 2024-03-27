import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333/api/",
});

api.interceptors.request.use((req)=>{
  if(localStorage.getItem("token")){
    req.headers.Authorization=localStorage.getItem("token")
  }
  return req
})

export default api;
