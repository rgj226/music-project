import jsonp from '../common/js/jsonp.js'
import {commonparams,options} from './config'  //公共参数

export function gethunk(){
  const url='https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data={
    g_tk:5381,
    uin:0,
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    platform:'h5',
    needNewCode:1,
    _:1513220299698
  }
  return jsonp(url,data,options)
}
