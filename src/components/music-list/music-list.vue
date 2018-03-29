<template>
 <div class="song">
     <span class="back" @click="back">返回</span>
     <span class="title" v-html="title" ref='title'></span>
     <div class="head" v-bind:style="imgbg" ref="bgimg">
       <div class="filter" ref="filter">
         <div class="randomplay" ref="randomplay">
           <p @click="play">随机播放</p>
         </div>
       </div>
     </div>  
     
     <div class="bg-layer" ref="layers"></div>
     <scroll @scroll='scroll' :probetype="probetype" :listenscroll="listenscroll" :data='songs' class="list" ref="list">
       <div class="songwrapper">
         <songlist @select='select' :songs='songs'></songlist>
       </div>
     </scroll>
  </div>  
</template>

<script type="text/ecmascript-6">  
  import scroll from '../../base/scroll'
  import songlist from './songlist'
  import {mapActions} from 'vuex'
  import {playlistmixin} from '../../common/js/mixin'
  
  export default {
    mixins:[playlistmixin],
    data(){
      return{
        probetype:3,
        listenscroll:true,
        scrolly:0
      }
    },
    props:{
      title:{
        type:String
      },
      songs:{
        type:Array,
        default:[]
      },
      bgimage:{
        type:String
      }
    },
    methods:{
      back(){
        this.$router.back()
      },
      scroll(pos){
        this.scrolly=pos.y
      },
      select(song,index){
        this.selectplay({
          list:this.songs,
          index
        })
      },
      play(){
        this.randomplay({list:this.songs})        
      },
      handleplaylist(playlist){
        const bottom = playlist.length>0?'120px':0
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      ...mapActions([
        'selectplay',
        'randomplay'
      ])
    },
    computed:{
      imgbg(){
        return `background-image: url(${this.bgimage})`
      }
    },
    mounted(){ 
      this.headerheight= parseInt(`${this.$refs.title.clientHeight}`) 
      this.imgheight=`${this.$refs.bgimg.clientHeight}`    //图片的高度
      this.mintranslatey = -this.imgheight + this.headerheight
      this.$refs.list.$el.style.top=`${this.imgheight}px`  //元素创建的时候设置scroll的位置。保证在背景图的下方
    },
    watch:{
      scrolly(newy){
        //console.log(newy)
        let zindex=0
        let scale=1  //缩放比例
        let blur =0  //模糊值  当向上的滑动值越大，模糊值越大
        let percent=Math.abs(newy/this.imgheight)
        
        let height= Math.max(this.mintranslatey,newy)
        this.$refs.layers.style['transform'] = `translate3d(0,${height}px,0)`
        this.$refs.layers.style['webkitTransform']=`translate3d(0,${height}px,0)`
        if(newy<height){
          this.$refs.bgimg.style.zIndex=10
          this.$refs.bgimg.style.paddingTop=0+'%'
          this.$refs.bgimg.style.height=this.headerheight+'px'
          this.$refs.randomplay.style.display='none'
        }else{
          this.$refs.bgimg.style.zIndex=0
          this.$refs.bgimg.style.paddingTop=70+'%'
          this.$refs.bgimg.style.height=0+'px'
          this.$refs.randomplay.style.display='block'
        }
        if(newy>0){
          scale=scale+percent  //滑动到底部后设置缩放
          zindex=20
        }else{
          blur=Math.min(20*percent,20)  //模糊效果值计算
        }
        this.$refs.bgimg.style['transform'] = `scale(${scale})`      
//      模糊效果样式
        this.$refs.filter.style['backdrop-filter'] = `blur(${blur}px)`
      }
    },
    components:{ 
      songlist,
      scroll
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
.song{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #222;
   .back{
    display: inline-block;
    position: absolute;
    top: 0;
    left: 12px;
    z-index: 50;
    font-size: 12px;
    color: #FFCD32;
    padding: 20px;
    color: #ffcd32;
    
   }
   .title{
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    line-height: 80px;
    font-size: 18px;
    color: #fff;
   }
   .head{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    .filter{
      width: 100%;      
      height: 100%;
      background: rgba(0,0,0,0.4);
      position: absolute;
      left: 0;
      top: 0;
      .randomplay{
       position: absolute;
       bottom: 40px;
       text-align: center;
       width: 100%;
        p{
          font-size: 14px;
          color: #FFCD2B;
          display: inline-block;
          margin: 0 auto;
          border: 1px solid #FFCD2B;
          border-radius: 40px;
          padding: 20px 75px;
          line-height: 32px;
        }
      }
    }
   }
   .list{
     position: fixed;
     width: 100%;
     bottom: 0;
   }
   .bg-layer{
    position: relative;
    height: 100%;
    background: #222;
   }
 }
</style>