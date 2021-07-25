import Toast from 'react-native-toast-message';
import {BASE_API} from './api';
import {storeData} from './store';

export const cadastrarAcademia = async dataPost => {
  try {
    const response = await (await BASE_API.post('/academia/', dataPost)).data;
    await storeData('@user', response);
    return 'OK';
  } catch ({response}) {
    if (response) {
      const {data} = response;

      if (data) {
        return data;
      } else {
        Toast.show({
          text1: 'Erro de validação',
          type: 'error',
          position: 'bottom',
        });
        return null;
      }
    }
    Toast.show({
      text1: 'Erro ao cadastrar academia',
      type: 'error',
      position: 'bottom',
    });
    return null;
  }
};
