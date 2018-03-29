//将mutation修改后的值映射到组件中
export const singer=state=>state.singer

export const playing=state=>state.playing

export const fullscreen=state=>state.fullscreen

export const playlist=state=>state.playlist

export const sequencelist=state=>state.sequencelist

export const mode=state=>state.mode

export const currentindex=state=>state.currentindex

export const currentsong=(state)=>{
  return state.playlist[state.currentindex] || {}
}

export const cdlist = state => state.cdlist

export const toplist = state => state.toplist

export const history = state => state.searchhistory
