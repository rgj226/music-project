import {commonparams,options} from './config'  //公共参数
import axios from 'axios'

export function getcdlist(disstid){
  const url = '/api/getcdlist'
  const data = Object.assign({}, commonparams, {
    type:1,
    json:1,
    utf8:1,
    onlysong:0,
    disstid:disstid,
    format:'json',
    g_tk:5381,
    loginUin:0,
    hostUin:0,
    format:'json',
    inCharset:'utf8',


    outCharset:'utf-8',
    notice:0,
    platform:'yqq',
    needNewCode:0
  })  
  return axios.get(url, {
    params: data
  })
  .then(function (response) {
    return Promise.resolve(response.data.cdlist[0])
  })
  .catch(function (error) {
    console.log(error);
  });
}

