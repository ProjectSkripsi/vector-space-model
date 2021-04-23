import axios from 'axios';
import { baseUrl } from '../../constants/defaultValues';
import { getToken } from '../../helpers/Utils';

export const getStatisticService = async (type) => {
  const token = getToken();
  try {
    const response = await axios.get(`${baseUrl}/tweet/statistic/${type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch ({ response }) {
    return response;
  }
};

export const getRatioService = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${baseUrl}/tweet/ratio`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch ({ response }) {
    return response;
  }
};
