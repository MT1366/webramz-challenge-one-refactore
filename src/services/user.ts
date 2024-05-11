import axios from "axios";
import { BASE_URL } from "../constants/constantUrl";

// export function getUser({ id: number }) {
export function getUser() {
  return axios.get(BASE_URL).then((res) => res.data);
  // console.log(res.data);
}
