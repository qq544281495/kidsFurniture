'use strict';
import axios from 'axios';
import request from 'framework/network/request';
import common from 'framework/network/common'

export default {
  install(Vue) {
    if (!Vue.prototype.hasOwnProperty('$request')) {
      Vue.prototype.$request = request;
      Vue.prototype.$axios = axios;
      Vue.prototype.$common = common;
    }
  }
};