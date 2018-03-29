<template>
 <scroll :data='data' 
   ref='scroll' 
   :listenscroll="listenScroll"
   :probetype='this.probetype'
   @scroll='scroll'
   >
  <ul class="listwrapper" ref='listwrapper'>
    <li class="singerwrapper" v-for="item in data" >
      <h1 class="title">{{item.title}}</h1>
      <ul>
        <li v-for="item in item.item" class="main" @click="selectitem(item)">
          <div class="img-box">
            <img :src="item.avatar" alt="" />
            <span class="name" v-html="item.name"></span>
          </div>
        </li>
      </ul>
    </li>
  </ul>
  <div class="rightnav">
    <ul>
      <li v-for="(item,index) in getrightnav" @click="findsinger(index)" :class="{'active':currentindex===index }">{{item}}</li>
    </ul>
  </div>
  <div ref="flexd" class="fixed-title" v-show="gettitle">
     <h1 class="title">{{gettitle}}</h1>
  </div>
 </scroll>
</template>

<script type="text/ecmascript-6">  
  import scroll from '../../base/scroll'
  export default {
    data(){
      return{
        probetype:3,
        scrolly:-1,
        listheight:[],
        currentindex:0,
        diff:-1
      }      
    },
    created() {
      this.listenScroll=true
    },
    props:{
      data:{
        type:Array
      }
    },
    computed:{
      getrightnav(){
        let navlist=[]
        this.data.forEach((item)=>{
          navlist.push( item.title.substring(0,1))
        })
        return navlist
      },
      gettitle(){
        if(this.scrolly>0){
          return ''
        }
        return this.data[this.currentindex]?this.data[this.currentindex].title:''
      }
    },
    methods:{
      selectitem(item){
        this.$emit('select',item)
      },
      findsinger(index){
        let listwrapper = this.$refs.listwrapper.getElementsByClassName('singerwrapper') 
        let el=listwrapper[index]
        this.currentindex = index  //添加样式
        this.$refs.scroll.scrollToElement(el,0)
      },
      scroll(pos){
        //获取实时滚动位置的时候注意probetype的值应该为3，否则不派发位置值
        this.scrolly=pos.y
      },
      getheight(){
        //滚动关联，计算每个区块的高度
        this.listheight=[]
        const list = this.$refs.listwrapper.getElementsByClassName('singerwrapper') 
        let height=0
        this.listheight.push(height)
        for(let i = 0 ; i<list.length; i++){
          let item = list[i]
          height+= item.clientHeight
          this.listheight.push(height)  //一个各个区块的高度集合
        }
        //console.log(this.listheight) //每个区间的高度
        //将拿到的高度与scrolly的值做对比，对比落在哪个区间
      }
    },
    watch:{
      data(){
        setTimeout(()=>{
          this.getheight()
        },20)
      },
      scrolly(newy){
        const listheight=this.listheight
        //监测scrolly滚动的实时变化，将新的值与所在区块高度的上限，下限对比
        //向下拉动，超过顶部的时候，newy的值大于0.
        if(newy>=0){
           this.currentindex = 0
           return
        } 
        //在中间部分滚动
        for(let i =0 ; i<listheight.length-1;i++){
          let height1=listheight[i]   //上部位置值
          let height2=listheight[i+1] //下部位置值
          if(-newy>=height1 && -newy<height2 ){
            this.currentindex = i   
            this.diff=height2+newy   //计算到区块最底部与滚动至区块最底部的差
            return
          }          
        }
        this.currentindex = listheight.length-2
      },
      diff(newval){
        let top=(newval>0 && newval<60)?newval-60:0   
        this.$refs.flexd.style.transform=`translate3d(0,${top}px,0)`
      }
    },
    components:{
      scroll
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .listwrapper{
    .title{
      width: 100%;
      height: 60px;
      line-height: 60px;
      padding-left: 40px;
      color: rgba(255,255,255,0.5);
      background: #333;
      font-size: 14px;
    }
    .main{    
      padding: 20px 0 20px 50px;     
      .img-box{
        width: 100%;
        display: flex;
        img{
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        span{
          line-height: 100px;
          color: rgba(255,255,255,0.5);;
          margin-left: 40px;
          font-size: 14px;
        }
      }
    }    
  }
  .rightnav{
    position: fixed;
    right: 10px;
    top: 50%;
    margin-top: -50%;
    background: rgba(0,0,0,0.3);
    border-radius: 30px;
    font-size: 12px;
    color: rgba(255,255,255,0.5);
    text-align: center;
    padding: 20px 0;
    li{
      padding: 6px;
      &.active{
        color: #FFCD2B;
      }
    }
  }
  .fixed-title{
    width: 100%;
    height: 60px;
    position: absolute;
    left: 0;
    top: 0;
    .title{
      width: 100%;
      height: 60px;
      line-height: 60px;
      padding-left: 40px;
      color: rgba(255,255,255,0.5);
      background: #333;
      font-size: 14px;
    }
  }
</style>