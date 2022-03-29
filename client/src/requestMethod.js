import axios from "axios";

const BaseUrl = `${window.location.origin}/api/`;
// const BaseUrl = `http://localhost:3001/api/`;

console.log(BaseUrl);

export const publicRequest = axios.create({
  baseURL: BaseUrl,
});
