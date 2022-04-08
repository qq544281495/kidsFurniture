'use strict';
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:7001';
axios.defaults.timeout = 15000;
axios.defaults.xsrfHeaderName = 'x-csrf-token';
axios.defaults.xsrfCookieName = 'csrfToken';
export default {
  post(url, data, options) {
    return axios.post(`${url}`, data, { options });
  },
  get(url,params,options) {
    return axios.get(`${url}`,params,options);
  }
};