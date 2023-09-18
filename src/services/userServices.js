import API from "./axiosConfig";
const baseURL = "user";
function getUser() {
  return API.get(`${baseURL}`);
}

function userDetail(id) {
  return API.get(`${baseURL}/${id}`);
}

function createUser(data) {
  return API.post(`${baseURL}`, data);
}

function editUser(id, data) {
  return API.put(`${baseURL}/${id}`, data);
}

function deleteUser(id) {
  return API.delete(`${baseURL}/${id}`);
}
export const UserService = {
  getUser,
  userDetail,
  createUser,
  editUser,
  deleteUser,
};
