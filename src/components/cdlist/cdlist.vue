<template>
  <transition name='slide'>
    <musclist :title='title' :bgimage='bgimg' :songs='cd'></musclist>
  </transition>
</template>

<script type="text/ecmascript-6">
  import musclist from '../music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getcdlist} from '../../api/cdlist'
  export default {
    data(){
      return{
        cd:[]
      }
    },
    created(){
      this.getlist()
    },
    methods:{
      getlist(){
        if(!this.cdlist.dissid){
          this.$router.push('./')
          return
        }
        getcdlist(this.cdlist.dissid).then((res)=>{
          this.cd =this.dispose(res.songlist)
          //console.log(this.cd)
        })
      },
      dispose(list){
        //所拿到的数据筛选存在songid 和 albummid 关键id的就是一首歌曲 ，存起来
        let ret = []
        list.forEach((item)=>{
          if(item.songid && item.albummid){
            ret.push(this.simplify(item))    //取到符合要求的songlist ，之后将数据简化
          }
        })
        return ret
      },
      simplify(songlist){
        let Song={}
        return Song=({
          id: songlist.songid,
          mid: songlist.songmid,
          singer: this.filterSinger(songlist.singer),  //同一首歌会有两个歌手合唱，做处理
          name: songlist.songname,
          album: songlist.albumname,
          duration: songlist.interval,
          image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songlist.albummid}.jpg?max_age=2592000`,
          url: `http://ws.stream.qqmusic.qq.com/C100${songlist.songmid}.m4a?fromtag=38`
        })
      },
      filterSinger(singer){  //多为个歌手的时候要用/分割
        let ret=[]
        if(!singer){
          return
        }
        singer.forEach((s)=>{
          ret.push(s.name)
        })
        return ret.join('/')
      }
    },
    computed:{
      title(){
        return this.cdlist.dissname
      },
      bgimg(){
        return this.cdlist.imgurl
      },
      ...mapGetters([
        'cdlist'
      ])
    },
    components:{
      musclist
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
.slide-enter-active,.slide-leave-active{
  transition: all .3s;
}
.slide-enter,.slide-leave-to{
  transform: translate3d(100%,0,0);
}
</style>
