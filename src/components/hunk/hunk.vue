<template>
  <div class="hunk">
    <div class="main">
      <searchbox ref='serach' @changequery='onchanggequery'></searchbox>
      <div class="hothunk" v-show='!query'>
        <div class="hotlist">
          <h2>热门搜索</h2>
          <ul>
            <li @click="setquery(item.k)" v-for="item in hot">{{item.k}}</li>
          </ul>
        </div>
        <searchhistory :data="this.history" v-show="this.history.length>0" @clearhistory="clearhistory" @deleathistory="deleathistory" @sethistoryname="sethistoryname"></searchhistory>
      </div>
    </div>
    <suggest v-show='query'  class="suggest" :query='query' @select='sethistory'></suggest>

   <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import searchbox from '../../base/searchbox'
  import {gethunk} from '../../api/hunk'
  import suggest from '../../base/suggest'
  import {mapActions,mapGetters} from 'vuex'
  import searchhistory from '../../base/history'
  import  {deleatitem} from  '../../common/js/cache'

  export default {
    data(){
      return {
        hot:[],
        query:''
      }
    },
    created(){
      this._gethunk()
    },
    methods:{
      _gethunk(){
        gethunk().then((res)=>{
          this.hot=this.filter(res.data.hotkey)
          //console.log(this.hot)
        })
      },
      filter(list){
        return list.slice(0,10)
      },
      setquery(name){
        this.$refs.serach.getquery(name)
      },
      onchanggequery(query){
        this.query=query
      },
      sethistory(){
        this.gethistory(this.query)
      },
      //点击历史搜索记录搜索
      sethistoryname(item){
        this.$refs.serach.setquery(item)
      },
      //点击删除单个历史记录
      deleathistory(item){
        this.deleathistory(item)
      },
      //清空历史记录
      clearhistory(){
        this.clearallhistory()
      },
      ...mapActions([
        'gethistory',
        'deleathistory',
        'clearallhistory'
      ])
    },
    computed:{
      ...mapGetters([
        'history'
      ])
    },
    components:{
      searchbox,
      suggest,
      searchhistory
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .hunk{
    position: fixed;
    bottom: 0;
    top: 175px;
    width: 100%;
    .main{
      padding: 18px;
    }
    .hothunk{
      margin-top: 50px;
      z-index:100;
      .hotlist{
        margin-bottom: 20px;
        h2{
          font-size: 16px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 20px;
        }
        ul{
          overflow: hidden;
          li{
            float: left;
            padding: 15px;
            border-radius: 15px;
            background: #333;
            color: rgba(255,255,255,0.3);
            margin: 0 18px 20px 0;
          }
        }
      }
    }
    .suggest{
      position: fixed;
      left: 0;
      bottom: 0;
      top: 270px;
      width: 100%;
    }
  }
</style>
