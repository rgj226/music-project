import jsonp from '../common/js/jsonp.js'
import {commonparams,options} from './config'  //公共参数
import axios from 'axios'


export function getranking(){
  const url='https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = {
    g_tk:5381,
    uin:0,
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    platform:'h5',
    needNewCode:1,
    _:1512626363707
  }
  
  return jsonp(url,data,options)
}

export function getrankingdetail(topid){
  const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = {
    g_tk:5381,
    uin:0,
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    platform:'h5',
    needNewCode:1,
    tpl:3,
    page:'detail',
    type:'top',
    topid:topid,
    _:1513046896854
  }
  
  return jsonp(url,data,options)
}

