import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

export const getAll = () => {
  return axios.get(baseUrl);
};

export const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

export const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};
export const DeletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};
