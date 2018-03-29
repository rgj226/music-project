<template>
  <div class="recommend">
    <scroll class="scrollwrapper" :data="cdlist" ref="scroll">
      <div>
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for='item in recommendlist' :key="item.id">
            <a :href="item.linkUrl"><img :src="item.picUrl" @load="imgload" alt="" /></a>
          </mt-swipe-item>
        </mt-swipe>
        <div class="title">
          <h1>热门歌单推荐</h1>
        </div>
        <div class="cdwrap">
          <ul>
            <li v-for="item in cdlist" class="cdlist" @click="getcd(item)">
              <img :src="item.imgurl" alt="" />
              <p class="notice" v-html="item.dissname"></p>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>  
</template>

<script type="text/ecmascript-6">  
  import {getrecommend} from '../../api/recommend'
  import {getcdlist} from '../../api/recommend'
  import scroll from '../../base/scroll'
  import {mapMutations} from 'vuex'
  export default{
    data(){
      return{
        recommendlist:[],
        cdlist:[]
      }
    },
    created(){
      this._getrecommend(),
      this._getcdlist()
    },
    methods:{
      _getrecommend(){
        getrecommend().then((res)=>{
          if(res.code===0){
            this.recommendlist=res.data.slider
            //console.log(this.recommendlist)
          }
        })
      },
      _getcdlist(){
        getcdlist().then((res)=>{
          this.cdlist=res
          console.log( res)
        })
      },
      imgload(){
        if(!this.scrolls){  //添加变量来判断，只执行一次refresh
          this.$refs.scroll.refresh()
          this.scrolls = true
        }      
      },
      getcd(item){
        this.$router.push({
          path:`/recommend/${item.dissid}`
        })
        this.setcdlist(item)
      },
      ...mapMutations({
        setcdlist:'set_cdlist'
      })
    },
    components :{
      scroll
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .recommend{
    position: fixed;
    top: 176px;
    bottom: 0;
    .mint-swipe-items-wrap{
      width: 100%;
      height: 300px;
      img{
        width: 100%;
        height: 100%;
      }     
    }
    .scrollwrapper{
      height: 100%;
      overflow: hidden;
    }
    .mint-swipe-indicator{
      width: 12px;
      height:12px;
      &.is-active{
        width: 15px;
      }
    }
    .title{
      width: 100%;
      height: 65px;
      text-align: center;
      line-height: 130px;
      font-size: 14px;
      color: #FFCD2B;
    }
    .cdwrap{
      width: 100%;
      ul{
        padding: 20px 14px;
        display: flex;
        flex-wrap: wrap;
      }
      li{
        width: 220px;
        padding: 0 10px;
        margin-bottom: 25px;
        img{
          width: 100%;
          height: 230px;
        }
        p{
          height: 47px;
          overflow: hidden;
          color: #fff;
          font-size: 10px;
        }
      }
    }
  }
</style>