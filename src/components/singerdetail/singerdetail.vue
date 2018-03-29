<template>
  <transition name="slide">
    <musiclist :songs='songs' :title="title" :bgimage="bgimage"></musiclist>
  </transition>

</template>

<script type="text/ecmascript-6">
   import {mapGetters} from 'vuex'
   import {getsingerdetail} from '../../api/singer'
   import musiclist from '../music-list/music-list'
   import {getlrc} from '../../api/song'
  export default {
    data(){
      return {
        songs:[]
      }
    },
    computed:{
      title(){
        return this.singer.name
      },
      bgimage(){
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created(){
      this._getsinger()
    },
    methods:{
      _getsinger(){
        if(!this.singer.id){
          this.$router.push('./')
          return
        }
        getsingerdetail(this.singer.id).then((res)=>{
          if(res.code===0){
            this.songs = this.integration(res.data.list)
            console.log(this.songs)
          }
        })
      },
      //数据整合，拿到每首歌的详情
      integration(list){
        //console.log(list)
        let ret = []
        list.forEach((item)=>{
          let {musicData} = item    //对象解构,只要musicData中的数据
          if (musicData.songid && musicData.albummid) {
            ret.push(this.createsong(musicData))
          }
        })
        return ret
      },
      //为了数据的简洁，只取出需要的部分
      createsong(musicData){
        let Song={}
        return Song=({
          id: musicData.songid,
          mid: musicData.songmid,
          singer: this.filterSinger(musicData.singer),  //同一首歌肯能会有两个歌手合唱，做处理
          name: musicData.songname,
          album: musicData.albumname,
          duration: musicData.interval,
          image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
          url: `http://ws.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=38`
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
    components:{
      musiclist
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
