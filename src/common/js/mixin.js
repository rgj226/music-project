//mixin。在playlist生成的时候去执行

import {mapGetters} from 'vuex'


export const playlistmixin={
  computed:{
    ...mapGetters([
      'playlist'
    ])
  },
  mounted(){    //组件dom ready 的时候触发
    this.handleplaylist(this.playlist)
  },
  activated(){  //组件切换的时候会触发activated
    this.handleplaylist(this.playlist)
  },
  watch:{
    playlist(newval){
      this.handleplaylist(newval)
    }
  },
  methods:{
    handleplaylist(){
      throw new Error('注意使用mixin')
    }
  }
}
