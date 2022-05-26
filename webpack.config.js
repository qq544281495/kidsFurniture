'use strict';
// Document：https://www.yuque.com/easy-team/easywebpack 和 https://www.yuque.com/easy-team/egg-vue 
module.exports = {
  module:{
     rules:[
       {
         less: true
       }
     ]
  },
  deploy: {
    mode: 'npm', // 支持 npm, cnpm, yarn, tnpm ,
    nodejs: true, // 是否把 node 打进 node_modules, 默认 false 
    filename: 'test',
    source: ['dist', 'package.json'],
    target: './zip',
    done(filepath) { console.log('>>filepath', filepath); }
  }
};