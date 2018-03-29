import * as type from './mutation-types'
import {shuffle} from '../common/js/util'
import {savesearc,deleatitem,clearall} from '../common/js/cache'

function findindex(list,song){
  const index= list.findIndex((item)=>{
    return item.id===song.id
  })
  return index
}

export const selectplay= function({commit,state},{list,index}){
  commit(type.set_playing,true)  //是否播放
  commit(type.set_fullscreen,true)  //是否展开状态
  commit(type.set_sequencelist,list)  //播放模式对应歌曲列表
  if(state.mode===2){  //如果点击列表的时候，播放模式是随机，那么就要将列表随机组合，并且播放点击的歌曲
   const randomlist=shuffle(list)
   commit(type.set_playlist,randomlist)
   index= findindex(randomlist,list[index])
  }else{
    commit(type.set_playlist,list)       //默认播放列表
  }
  commit(type.set_currentindex,index)  //当前歌曲索引
}


export const randomplay=function({commit},{list}){
   commit(type.set_playing,true)  //是否播放
   commit(type.set_fullscreen,true)  //是否展开状态
   const randomlist=shuffle(list)
   commit(type.set_playlist,randomlist)
   commit(type.set_currentindex,0)  //从第一首开始
}

export const setsong=function({commit,state},song){
   //playlist应该是一份副本，不然会影响state中的playlist而报错，其他同理
  let playlist =state.playlist.slice()
  let sequencelist=state.sequencelist.slice()
  let currentindex=state.currentindex
  let currentsong= playlist[currentindex]  //当前播放歌曲
  //判断当前播放的列表中是否已经存在要添加的歌曲
  let fpindex=findindex(playlist,song)
  //添加未有，删除已有.插入到当前播放之后,索引加1
  currentindex++
  playlist.splice(currentindex,0,song)
  if(fpindex>-1){ //如果已经存在这首歌，就删除
    //如果插入的这首歌在当前播放歌曲列表的前边，播放过。
    if(currentindex>fpindex){
      playlist.splice(fpindex,1)
      currentindex--
    }else{
      playlist.splice(fpindex+1,1)
    }
  }

  //在sequencelist中插入要添加的歌曲。
  //找到要添加的位置，当前播放的歌曲所在sequencelist中，位置后一位
  //在sequencelist中找到当前播放的歌曲位置+1
  let currentsindex=findindex(sequencelist,currentsong)+1
  //判断sequencelist列表中是否存在要添加的歌曲
  let fsindex=findindex(sequencelist,song)

  sequencelist.splice(currentsindex,0,song)

  if(fsindex>-1){ //如果已经存在这首歌，就删除
    //如果插入的这首歌在当前播放歌曲列表的前边，播放过。
    if(currentsindex>fsindex){
      sequencelist.splice(fsindex,1)
    }else{
      sequencelist.splice(fsindex+1,1)
    }
  }

  commit(type.set_playlist,playlist)
  commit(type.set_sequencelist,sequencelist)
  commit(type.set_currentindex,currentindex)
  commit(type.set_fullscreen,true)
  commit(type.set_playing,true)
}

//提交历史搜索记录
export const gethistory=function({commit},qury){
  commit(type.set_searchhistory,savesearc(qury))
}
//删除单个历史记录
export const deleathistory =function({commit},qury){
  commit(type.set_searchhistory,deleatitem(qury))
}
//清空历史记录
export const clearallhistory = function({commit},qury){
  commit(type.set_searchhistory,clearall(qury))
}


