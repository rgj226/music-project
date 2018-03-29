import jsonp from '../common/js/jsonp.js'
import {commonparams,options} from './config'  //公共参数

export function getsuggest (name,page){
  const url='https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  const data={
    g_tk:5381,
    uin:0,
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    platform:'h5',
    needNewCode:1,
    w:name,
    zhidaqu:1,
    catZhida:1,
    t:0,
    flag:1,
    ie:'utf-8',
    sem:1,
    aggr:0,
    perpage:50,
    n:50,
    p:page,
    remoteplace:'txt.mqq.all',
    _:1513237922941
  }
  return jsonp(url,data,options)
}
