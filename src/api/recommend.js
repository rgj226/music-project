import jsonp from '../common/js/jsonp.js'
import {commonparams,options} from './config'  //公共参数
import axios from 'axios'

export function getrecommend(){               
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg' 
  const data = Object.assign({},commonparams,{
    uin:'0',
    needNewCode:1
  })
  return jsonp(url,data,options)
}


export function getcdlist(){
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonparams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })  
  return axios.get(url, {
    params: data
  })
  .then(function (response) {
    return Promise.resolve(response.data.data.list)
  })
  .catch(function (error) {
    console.log(error);
  });
}


