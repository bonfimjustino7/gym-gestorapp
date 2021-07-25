import Toast from 'react-native-toast-message';
import {BASE_API} from './api';
import {storeData} from './store';

export const Auth = async data => {
  try {
    const response = await (await BASE_API.post('/auth/', data)).data;
    await storeData('@user', response);
    return 'OK';
  } catch ({response}) {
    if (response?.status === 400) {
      return 'ERROR_SENHA';
    } else {
      Toast.show({
        text1: 'Não foi possivel realizar a requisição',
        text2: response,
        type: 'error',
        position: 'bottom',
      });
      return null;
    }
  }
};
