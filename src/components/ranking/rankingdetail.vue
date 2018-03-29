<template>
  <div class="ranking-detail">
   <musiclist :title='title' :bgimage='bgimg' :songs='songs'></musiclist>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getrankingdetail} from '../../api/ranking'
  import musiclist from '../music-list/music-list'
  export default {
    data(){
      return{
        songs:[]
      }
    },
    created(){
      this.getdetail()

    },
    methods:{
      getdetail(){
        if(!this.toplist.id){
          this.$router.push('./')
          return
        }
        getrankingdetail(this.toplist.id).then((res)=>{
          this.songs=this.simplify(res.songlist)
          //console.log(this.songs)
        })
      },
      simplify(list){
        var ret=[]
        list.forEach((item)=>{
          if(item.data.albummid){
            ret.push(this.createSong(item.data) )
          }
        })
        return ret
      },
      createSong(musicData){
        let Song={}
        return Song=({
          id: musicData.songid,
          mid: musicData.songmid,
          singer: this.filterSinger(musicData.singer),  //同一首歌会有两个歌手合唱，做处理
          name: musicData.songname,
          album: musicData.albumname,
          duration: musicData.interval,
          image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
          url: `http://ws.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=38`
        })
      },
      filterSinger(list){
        if(!list){
          return
        }
        let singer=[]
        list.forEach((item)=>{
          singer.push(item.name)
        })
        return singer.join('/')
      }
    },
    computed:{
      title(){
        return this.toplist.topTitle
      },
      bgimg(){
        return this.toplist.picUrl
      },
      ...mapGetters([
        'toplist'
      ])
    },
    components:{
      musiclist
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
