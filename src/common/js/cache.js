
//使用good-storage来存储历史搜索记录.
//显示15条历史记录，最新的排列在最前。不出现重复

// localStorage
//storage.set(key,val)
//storage.get(key, def)

//sessionStorage
//storage.session.set(key, val)
//storage.session.get(key, val)

import storage from 'good-storage'

  const key = '_search' ; //设置key.localstorage的key值
  const maxlength = 15 ;  //规定最大存储空间

//判断当前要插入的值是否已经存在
function insertArray(arr,val,compare,maxlen){ //要存储的数组，要保存的值，比较函数，最大值
  const index = arr.findIndex(compare);   //找出要存储的内容在数组中的索引值
  if(index===0){
    return
  }
  if(index>0){  //不在第一位的就把之前的删除掉，将新的插到第一位
    arr.splice(index,1)
  }
  arr.unshift(val);
  if(maxlen && arr.length>maxlen){
    arr.pop()
  }
}

//将存储内容插入到本地历史记录中
export function savesearc(query){
  let searches = storage.get(key,[]);  // 首先获取之前的历史记录
  insertArray(searches,query,(item)=>{
    return item === query
  },maxlength);
  storage.set(key,searches);
  return searches
}

export function getstorage(){
  let searches = storage.get(key,[]);
  return searches
}

//删除单个搜索历史记录
export function deleatitem(items){
  let searches = storage.get(key,[]);  // 首先获取之前的历史记录
  let index = searches.findIndex(function(item){  //要删除的索引值
    return item === items
  })
  searches.splice(index,1)
  storage.set(key,searches);
  return searches
}

//清空历史搜索记录
export function clearall(){
  storage.remove(key)
  return []
}

/**
 * findindex 接受的参数是一个函数，规定测试条件，返回符合条件
 * 的数组的第一位索引值
 * **/
