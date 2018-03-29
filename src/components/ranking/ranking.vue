<template>
  <div class="ranking">
    <scroll ref="scroll" class="scrollwrp" :data="rankinglist">
      <div class="main">
        <ul>
          <li class="ranksinger" v-for="item in rankinglist" @click="todetail(item)">
            <div class="imgbox"><img :src="item.picUrl"/></div>
            <ul class="songlist">
              <li class="songs" v-for="(song,index) in item.songList">
                <span>{{index +1 }}</span>
                <span>{{song.songname}} - {{song.singername}} </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">  
  import scroll from '../../base/scroll'
  import {getranking} from "../../api/ranking"
  import {mapMutations} from 'vuex'
  export default {
    data(){
      return {
        rankinglist:[]
      }
    },
    created(){
      this._getranking()
    },
    methods:{
      _getranking(){
        getranking().then((res)=>{
          this.rankinglist=res.data.topList
          console.log(this.rankinglist)
        })
      },
      todetail(item){
        this.$router.push({
          path:`/ranking/${item.id}`
        })
        this.stelist(item)
      },
      ...mapMutations({
        stelist:'set_toplist'
      })
    },
    components:{
      scroll
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
.ranking{
  position: fixed;
  left: 0;
  top: 176px;
  width: 100%;
  bottom: 0;
  .scrollwrp{
    height: 100%;
    overflow: hidden;
  }
  .ranksinger{
    display: flex;
    padding-top:40px;
    margin:0 40px;
    .imgbox{
      flex: 0 0 200px;
      img{
        width: 200px;
        height: 200px;
      }
    }
    .songlist{
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column; 
      padding: 0 20px;     
      .songs{
        width: 430px;
        line-height: 60px;
        color:rgba(255,255,255,0.3);
        font-size: 12px;        
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
  .ranksinger:last-child{
    padding-bottom: 40px;
  }
}
</style>