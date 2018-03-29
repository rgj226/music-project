import axios from 'axios'
import jsonp from '../common/js/jsonp.js'
import {commonparams,options} from './config'

export function getsinger(){
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg' 
  const data = Object.assign({},commonparams,{
    channel:'singer',
    page:'list',
    key:"all_all_all",
    pagesize:100,
    pagenum:1,
    g_tk:940235217,
    loginUin:0,
    hostUin:0,
    format:"json",
    inCharset:"utf-8",
    outCharset:'utf-8',
    platform:'yqq',
    needNewCode:0
  })
  return jsonp(url,data,options)
}

export function getsingerdetail(singerid){
  const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({},commonparams,{
    g_tk:940235217,
    loginUin:0,
    hostUin:0,
    format:'json',
    inCharset:'utf8',
    outCharset:'utf-8',
    notice:0,
    platform:'yqq',
    needNewCode:0,
    singermid:singerid,
    order:'listen',
    begin:0,
    num:50,
    songstatus:1
  })
  return jsonp(url,data,options)
}
