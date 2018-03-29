import originjsonp from 'jsonp'

//使用jsonp，数据请求。返回err和data参数
//jsonp(url,data,option) url请求地址，data需要的param参数，需要拼接在url后，option选项，一般包含param参数返回的callback 函数名
//data的参数是拼接在url后面的

export default function jsonp(url,data,options){
  //url的拼接是有？问号的，判断是否存在，没有的话就要添加？否则要添加&
  url+=(url.indexOf('?') < 0 ? '?' : '&')+param(data)  
  return new Promise(function(resolve,reject){
    //jsonp(url, opts, fn)
    originjsonp(url,options,(err,data)=>{
      if(!err){
        resolve(data)
      }else{
        reject(err)
      } 
    })
  })
}

function param(data){
  let url=''
  for(var k in data){
    let value=data[k]!==undefined?data[k]:''
    url+=`&${k}=${encodeURIComponent(value)}`
  }
  return url?url.substring(1):''
}







