<template>
  <div class="play-wrapper" v-show="playlist.length>0">
    <div class="play" v-show="fullscreen">
      <div class="playbg"><img :src="currentsong.image"/></div>
      <!--顶部-->
      <div class="top">
        <p class="songname">{{currentsong.name}}</p>
        <p class="singername">{{currentsong.singer}}</p>
        <div class="close" @click="close">收起</div>
      </div>
     <!-- 中间cd-->
      <div class="cd-wrapper">
        <div class="middle1">
          <div :class="cdroted">
            <img :src="currentsong.image" alt="" />
          </div>
        </div>
      </div>
     <!-- 底部控制-->
     <div class="control">
       <div class="barwrapper">
         <div class="barmain" >
           <span class="currenttime">{{timesettle(currenttime)}}</span>
           <div class="barwarrp" ref='linewarrp'>
              <div @click="changetime" class="linbar" ref='linbar'> 
               <div ref="yelloline" class="yelloline"></div>
               <div @touchstart='touchstart' @touchmove='touchmove' @touchend='touchend' ref="yelloball" class="yelloball"></div>
              </div>
             </div> 
           <span class="songtimme">{{ timesettle(currentsong.duration) }}</span>
         </div>
       </div>
       <div class="control-btn">
         <span @click="changemode" :class="changemodeicon" class="icon-right"></span>
         <span @click="previous" class="icon-shangyishou icon-right"></span>
         <span @click="toogleplaying" :class="toggleplayicon" class="icon-center"></span>
         <span @click="next" class="icon-xiayishou icon-left"></span>
         <span class="icon-like icon-left"></span>
       </div>
     </div>
    </div>
    <div class="min-player" v-show="!fullscreen" @click="showplay">
      <div class="minimg">
        <img :src="currentsong.image" alt="" />       
      </div>
      <div class="main">
        <p class="songname">{{currentsong.name}}</p>
        <p class="singername">{{currentsong.singer}}</p>        
      </div>
      <div class="control">
        <span @click.stop="toogleplaying" :class="toggleplayicon"></span>
      </div>      
    </div>
    <audio ref='audio' :src="currentsong.url" @canplay="ready" @ended="songend" @timeupdate="uptime"></audio>
  </div>
</template>

<script type="text/ecmascript-6"> 
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    data(){
      return{
        songready:false,
        currenttime:0,
        touch:{}
      }
    },
    methods:{
      close(){
        this.setfullscreen(false)
      },
      showplay(){
         this.setfullscreen(true)
      },
      toogleplaying(){
        this.setplaying(!this.playing)
      },
      next(){
        if(!this.songready){
          return
        }
        this.setcurrentindex(this.currentindex + 1) 
        if(this.currentindex>=this.playlist.length){
          this.setcurrentindex(0)
        }    
        this.songready=false
        this.setplaying(true)
      },
      songend(){
        if(this.mode===1){
          this.$refs.audio.currentTime=0
          this.$refs.audio.play()
        }else{
          this.next()
        }
      },
      previous(){
        if(!this.songready){
          return
        }
        if(this.currentindex===0){
          this.setcurrentindex(this.playlist.length)
        }
        this.setcurrentindex(this.currentindex - 1)   
        this.songready=false
        this.setplaying(true)
      },  
      changemode(){
        let mode = (this.mode+1)%3
        this.setmode(mode)
        let list = null
        if(mode===2){  //0顺序播放，1单曲循环，2随机播放。随机的时候洗牌
          list= this.shuffle(this.sequencelist)  //当前歌曲列表传入，打乱
        }else{
          list = this.sequencelist
        }
        this.restcurrentindex(list)
        this.setplaylist(list)        
      },
      //洗牌获取随机函数
      getrandomint(min,max){
        return Math.floor(Math.random()*(max-min+1)+min)
      },
      //洗牌函数
      shuffle(arr){
        let shuffle= arr.slice()  //原本播放列表不能更改，所以要生成一个新的
        for(let i = 0; i < shuffle.length ; i++){
          let j = this.getrandomint(0,i)
          let t = shuffle[i]
          shuffle[i] = shuffle[j]
          shuffle[j] = t
        }
        return shuffle
      },
      //保证切换模式的时候，不影响当前播放的歌曲
      restcurrentindex(list){
        let index = list.findIndex((item)=>{
          return item.id === this.currentsong.id
        })
        this.setcurrentindex(index)
      },
      timesettle(currentTime){
        const minute=Math.floor(Math.floor(currentTime)/60)
        const sec=this.zero(Math.floor(currentTime)%60)  //获得的时间格式的秒要补0
        return `${minute}:${sec}`         
      },
      zero(num,n=2){
        let len = num.toString().length
        while(len<n){
          num='0'+ num
          len++
        }
        return num
      },
      
      ready(){
        this.songready=true
      },
      uptime(){
        let touch=this.touch
        if(touch.init){
          return
        }
        this.currenttime = this.$refs.audio.currentTime
        const linelength= Math.max(0,this.$refs.yelloline.clientWidth-this.$refs.yelloball.clientWidth) 
        let bili=(Math.floor(this.currenttime)/this.currentsong.duration )*100
        this.$refs.yelloline.style.width=`${bili}%`
        this.$refs.yelloball.style.left=`${linelength}px`     
        
      },
      touchstart(e){
        let touch=this.touch
        touch.init=true
        touch.startx=e.touches[0].clientX
        touch.left=this.$refs.yelloline.clientWidth  //当前已经播放的长度
      },
      touchmove(e){
        let touch=this.touch
         if(!touch.init){
          return
        }        
        let move=e.touches[0].clientX-touch.startx  //滑动长度        
        let width=this.$refs.linbar.clientWidth- this.$refs.yelloball.clientWidth*1.5 //长度最大值。减去小球的1.5倍宽
        let movelength=Math.min(width,Math.max(0,move + touch.left)) 
        touch.songlength = Math.floor((move + touch.left) / this.$refs.linbar.clientWidth*100)          
        this.$refs.yelloline.style.width=`${movelength}px`
        this.$refs.yelloball.style.left=`${movelength}px`   
        
      },
      touchend(){
         let touch=this.touch
         touch.init=false
         //console.log(touch)
         const songnum = this.currentsong.duration
         this.$refs.audio.currentTime=songnum*(touch.songlength/100)
      },
      changetime(e){
        let nowloc= this.$refs.linbar.getBoundingClientRect()
        let nowleft= parseInt( e.pageX - nowloc.left)
        this.$refs.yelloline.style.width=`${nowleft}px`
        this.$refs.yelloball.style.left=`${nowleft}px` 
        const songnum = this.currentsong.duration
        const timeloc= Math.floor((nowleft/this.$refs.linbar.clientWidth)*100)
        this.$refs.audio.currentTime=songnum*(timeloc/100)
      },
      ...mapMutations({
        setfullscreen:'set_fullscreen',
        setplaying:'set_playing',
        setcurrentindex:'set_currentindex',
        setmode:'set_mode',
        setplaylist:'set_playlist'
      })
    },
    computed:{
      cdroted(){
        return this.playing?'cdborder':'cdborder pause'       
      },
      toggleplayicon(){
        return this.playing?'icon-zanting':'icon-play' 
      },
      changemodeicon(){
        return this.mode===0?'icon-loop':this.mode===1?'icon-onlyloop':'icon-random'
      },
      ...mapGetters([
        'playing',
        'fullscreen',
        'playlist',
        'sequencelist',
        'currentindex',
        'mode',
        'currentsong'        
      ])
    },
    watch:{
      currentsong(newsong,oldsong){
        if(newsong.id===oldsong.id){
          return
        }
        let audio = this.$refs.audio
        this.$nextTick(()=>{
          audio.play()
        })
      },
      playing(newstate){
        let audio = this.$refs.audio
        this.$nextTick(()=>{
          newstate?audio.play():audio.pause()
        })             
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .play-wrapper{
    .play{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      background: #222;
      .playbg{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width:100%;
        z-index: -1;
        filter: blur(20px);
        img{
          width: 100%;
          height: 100%;
        }
      }
      .top{
        text-align: center;
        font-size: 14px;
        color: #fff;
        padding-top: 10px;
        p{
          height: 60px;
          line-height: 60px;
        }
        .songname{
          font-size: 16px;
        }
        .close{
          position: absolute;
          left: 30px;
          top: 30px;
          width: 70px;
          height: 40px;
          line-height: 40px;
          font-size:12px;
          color: #FFCD32;
        }
      }
      .cd-wrapper{
        position: fixed;
        width: 100%;
        left: 0;
        bottom: 240px;
        top: 120px;
        padding-top: 60px;
        .middle1{
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 0;
          padding-top:80%;
          position:relative;
          .cdborder{
            position: absolute;
            top: 0;
            left: 10%;
            width: 80%;
            border: 20px solid rgba(225,225,225,0.1);
            border-radius: 50%;
            animation: random 15s linear infinite;
            img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .pause{
            animation-play-state: paused;
          }          
          @keyframes random{
          	0%{
          	  transform: rotate(0deg);
          	}
          	100%{
          	  transform: rotate(360deg);
          	}
          }
        }
      }
      .control{
        position: absolute;
        bottom: 100px;
        width: 100%;
        .control-btn{
          display: flex;
          align-items: center;
          span{
            flex: 1;
            font-size: 32px;
            color: #FFCD32;
            &.icon-right{
              text-align: right;              
            }
            &.icon-left{
              text-align: left;
            }
            &.icon-center{
              padding: 0 20px;
              text-align: center;
              font-size: 40px;
            }
          }
        }
        .barwrapper{
          display: flex;
          padding: 20px;
          .barmain{
            width: 80%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            span{
              flex: 0 0 60px;
              text-align: center;
              color: #FFCD2B;
            }
            .barwarrp{
              flex: 1;
              position: relative;             
              background:rgba(0,0,0,0.3) ;
              .yelloline{
                background: #FFCD2B;
                width: 0;
                height: 7px;
              }
              .yelloball{
                position: absolute;
                left: 0;
                top: -10px;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                border: #fff 0.06667rem solid;
                background: #FFCD32;
              }
            }
          }        
        }
      }
    }
   
    .min-player{
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 120px;
      background: #333;
      display: flex;
      align-items: center;
      .minimg{
        flex: 0 0 80px;
        width: 100%;
        padding: 0 20px ;        
        img{
          width:100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .main{
        flex: 1;
        flex-direction: column;
        line-height: 40px;
        font-size: 12px;
        .songname{
          color: #fff;
          font-size: 14px;
          margin-bottom: 2px;
        }
      }
      .control{
        flex: 0 0 80px;
        text-align: center;
        font-size: 38px;
        color: #FFCD2B;
        padding-right:20px;      
      }
    }
    
  }
</style>