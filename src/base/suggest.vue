<template>
  <div class="suggest">
    <scroll :data="songs" :pullup='pullup' @scrollToEnd='searchmore' ref="scroll">
      <div class="main">
        <ul>
          <li v-for="(item,index) in songs" @click="selectsong(item)">
            <div class="suggest-list">
              <span :class="seticon(item)"></span>
              <span class="name" v-html="setname(item)"></span>
            </div>
          </li>
        </ul>
        <loading v-show='more'></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getsuggest} from '../api/suggest'
  import scroll from '../base/scroll'
  import loading from '../base/loading'
  import {mapMutations,mapActions} from 'vuex'

  export default {
    props:{
      query:{
        type:String,
        default:''
      }
    },
    data(){
      return{
        page:1,
        songs:[],
        pullup:true,
        more:true    //默认存在更多数据
      }
    },
    methods:{
      seticon(item){
        if(item.type=='singer'){
          return 'icon-user'
        }else{
          return 'icon-music'
        }
      },
      setname(item){
        if(item.type=='singer'){
          return this.query
        }else{
          return `${item.name} - ${item.singer}`
        }
      },
      //点击选中歌曲，或歌手
      selectsong(item){
        //console.log(item)
        let song = item
        if(song.type==='singer'){
          let singer={
            id:song.singermid,
            name:this.query,
            avatar:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${song.singermid}.jpg?max_age=2592000`
          }
          this.$router.push({
            path:`/hunk/${item.singermid}`
          })
          this.setsinger(singer)
        }else{
          this.setsong(song)
        }
        this.$emit('select')
      },
      //下拉加载
      searchmore(){
        if(!this.more){
          return
        }
        this.page++
        getsuggest(this.query,this.page).then((res)=>{
          this.songs =this.songs.concat(this.simplify(this.settle(res.data)))
          this.checkmore(res.data)
        })
      },
      getsearch(){
        this.more=true
        this.page=1
        this.$refs.scroll.scrollTo(0,0)
        getsuggest(this.query,this.page).then((res)=>{
          this.songs = this.simplify(this.settle(res.data))
          console.log(this.songs)
          this.checkmore(res.data)
        })
      },
      settle(list){
        let arr =[]
        if(list.zhida && list.zhida.singerid){
          arr.push({...list.zhida,...{type:'singer'}})
        }
        if(list.song){
          arr=arr.concat(list.song.list)
        }
        //console.log(arr)
        return arr
      },
      simplify(list){
        var ret=[]
        list.forEach((item)=>{
          if(item.albummid||item.singerid){
            ret.push(this.createSong(item) )
          }
        })
        return ret
      },
      createSong(musicData){
        let Song={}
        return Song=({
          type:musicData.type,
          singerid:musicData.singerid,
          singermid:musicData.singermid,
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
      filterSinger(list){
        if(!list){
          return
        }
        let singer=[]
        list.forEach((item)=>{
          singer.push(item.name)
        })
        return singer.join('/')
      },
      checkmore(data){
        let song=data.song
        if(!song.list.length){
          this.more=false
        }
      },
      ...mapMutations({
        setsinger:'SET_SINGER'
      }),
      ...mapActions([
        'setsong'
      ])
    },
    watch:{
      query(newquery){
        this.getsearch()
      }
    },
    components:{
      scroll,
      loading
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .suggest{
    .wrapper{
      height: 100%;
      overflow: hidden;
    }
    .main{
      padding: 14px 30px;
    }
    ul{
      width: 100%;
      li{
        width:100%;
        margin-bottom: 25px;
        color: rgba(255,255,255,0.3);
        font-size: 13px;
        .icon-music{
          display: inline-block;
          width: 25px;
          height: 25px;
          background: url(music.png) no-repeat;
          background-size: cover;
          vertical-align: middle;
        }
        .icon-singer{
          font-size: 20px;
        }
      }
    }
  }
</style>
