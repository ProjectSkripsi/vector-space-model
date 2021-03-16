import axios from 'axios';
import { baseUrl } from '../../constants/defaultValues';
import { getToken } from '../../helpers/Utils';

export const submitSchoolService = async (data) => {
  const token = getToken();
  try {
    const response = await axios.post(`${baseUrl}/school`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch ({ response }) {
    return response;
  }
};

export const deleteSchoolService = async (id) => {
  const token = getToken();
  try {
    const response = await axios.delete(`${baseUrl}/school/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch ({ response }) {
    return response;
  }
};

export const updateSchoolService = async (id, data) => {
  const token = getToken();
  try {
    const response = await axios.put(`${baseUrl}/school/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch ({ response }) {
    return response;
  }
};
