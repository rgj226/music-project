import * as type from './mutation-types.js'

//只有在mutations中可以修改state中的数据。

const mutations ={
  [type.SET_SINGER](state,singer){
    state.singer=singer
    //console.log(state.singer)
  },
  [type.set_playing](state,flag){
    state.playing=flag
  },
  [type.set_fullscreen](state,flag){
    state.fullscreen=flag
  },
  [type.set_playlist](state,list){
    state.playlist=list
  },
  [type.set_sequencelist](state,list){
    state.sequencelist=list
  },
  [type.set_mode](state,mode){
    state.mode=mode
  },
  [type.set_currentindex](state,index){
    state.currentindex=index
  } ,
  [type.set_cdlist](state,list){
    state.cdlist = list
  },
  [type.set_toplist](state,list){
    state.toplist=list
  },
  [type.set_searchhistory](state,query){
    state.searchhistory=query
  }
}

export default mutations
