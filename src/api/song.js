import {commonparams,options} from './config'  //公共参数
import axios from 'axios'

export function getlrc(mid){
  const url = '/api/getlrc'
  const data = Object.assign({}, commonparams, {
    callback:'MusicJsonCallback_lrc',
    pcachetime:+new Date(),
    songmid:mid,
    g_tk:1496144476,
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
    return Promise.resolve(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
}
