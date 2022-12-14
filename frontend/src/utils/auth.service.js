import axios from 'axios';
import { API_AUTH_URL } from './APIRoutes';


const register = (email, password, confirmPassword) => {
  return axios.post(API_AUTH_URL + "signup", {
    email,
    password,
    confirmPassword,
  });
};

const login = (email, password) => {
  return axios.post(API_AUTH_URL + "login", {
    email,
    password,
  });
};

const logout = async () => {
  const user = JSON.parse(localStorage.getItem("token"));

  var config = {
    method: 'post',
    url: API_AUTH_URL + "logout",
    headers: {
      'Access-Control-Allow-Origin': '*',
      'x-access-token': user
    }
  };

  try {
    const response = await axios(config);
    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    return error;
  }
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("token"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;