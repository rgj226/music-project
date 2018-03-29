<template>
  <div class="wrapper" ref='wrapper'>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
   props:{
     //派发滚动位置。1非实时派发scroll事件，在滑动一段后。2，实时派发滚动位置。3，实时派发，且在动画的时候也派发
     probetype:{
       type:Number,
       default:1
     },
     //滚动区域是否可以点击
     click:{
       type:Boolean,
       default:true
     },
     //是否监听滚动
     listenscroll:{
       type:Boolean,
       default:false
     },
     //判断数据是否更新来执行滚动重置
     data:{
       type:Array,
       default:null
     },
     //是否需要上拉刷新
     pullup:{
       type:Boolean,
       default:false
     },
     //滚动开始的时候会派发一个scroll start 。用来监听是否触发滚动开始
    beforescroll:{
      type:Boolean,
      default:false
    }
   },
   mounted(){
     setTimeout(()=>{
       this.initscroll()
     },20)
   },
   methods:{
     initscroll(){
       //在滚动的区域还没有数据的时候return掉
       if(!this.$refs.wrapper){
         return
       }
        this.scroll= new BScroll(this.$refs.wrapper,{
         probeType:this.probetype,
         click:this.click
       });
       //监听scroll事件的时候，要派发事件出去，返回位置
       if(this.listenscroll){
         let me=this;
         //pos是一个对象，返回x ，y 值。bscroll提供
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
       }
       //上拉加载派发事件
       if(this.pullup){
         this.scroll.on('scrollEnd',()=>{
           if(this.scroll.y <= (this.scroll.maxScrollY + 100)){
             this.$emit('scrollToEnd')
           }
         })
       }
       //监听滚动是否触发
       if(this.beforescroll){
         this.scroll.on('beforeScrollStart',()=>{
           this.$emit('beforescroll')
         })
       }

     },
     //enable()作用：启用 better-scroll, 默认 开启。
     enable(){
       this.scroll && this.scroll.enable()
     },
     //disable()作用：禁用 better-scroll。
     disable(){
       this.scroll && this.scroll.disable()
     },
     //refresh作用：重置 better-scroll。
     refresh(){
       this.scroll && this.scroll.refresh()
     },
     scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
     },
     scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
   },
   watch:{
    data(){
      setTimeout(()=>{
        this.refresh()
      },20)
    }
   }
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
