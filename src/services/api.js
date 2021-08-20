import axios from 'axios';
import Toast from 'react-native-toast-message';

export const BASE_API = axios.create({
  baseURL: 'http://192.168.1.10:8001/api/',
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
