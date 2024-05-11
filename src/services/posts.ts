import axios from "axios";
import { BASE_URL } from "../constants/constantUrl";
import TypeOfFormData from "../types/FormDataType";

export function createUser(formData: TypeOfFormData) {
  return axios
    .post(BASE_URL, {
      formData,
      userId: 15,
    })
    .then((res) => res.data);
}

export function updateColor(color: string) {
  return (
    axios
      // .patch(`${BASE_URL}/formData`, { color: color })
      .patch(BASE_URL, { color: color })
      .then((res) => res.data)
  );
}
