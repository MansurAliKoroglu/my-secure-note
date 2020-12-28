import axios from 'axios';

import key from '../key';

const refresh = async refreshToken => {
  return axios.post(
    `https://securetoken.googleapis.com/v1/token?key=${key}`,
    {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }
  );
};

export default refresh;
