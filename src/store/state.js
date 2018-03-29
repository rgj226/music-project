import {playmode} from './playconfig'
import {getstorage} from '../common/js/cache'

//定义一个状态，状态管理

const state ={
  singer:{},
  playing:false,      //是否播放状态
  fullscreen:false,   //是否展开状态
  playlist:[],        //歌曲列表
  sequencelist:[],    //播放模式对应列表
  mode:playmode.sequence,   //播放模式
  currentindex:-1,     //当前播放歌曲
  
  cdlist:{},   //首页cd列表
  toplist:{},  //热门排行
  
  searchhistory:getstorage()  //搜索历史。数据的来源是从本地的  localstorage 
  
}

export default state