<template>
  <div id="app">
    <div class="header">
      <p><span class="obicon"></span>Chicken Music</p>
    </div>
    <div class="tab">
      <router-link to="/recommend"><div>推荐</div></router-link>
      <router-link to="/singer"><div>歌手</div></router-link>
      <router-link to="/ranking"><div>排行</div></router-link>
      <router-link to="/hunk"><div>搜索</div></router-link>
    </div>
    <player></player>
    
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script type="text/ecmascript-6">
  import player from "./components/player/palyer"
  export default {
   components:{
     player
   }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  .header{
    width: 100%;
    height: 88px;
    text-align: center;
    color: #FFCD2B;
    font-size: 18px;
    line-height: 88px;
    .obicon{
      display: inline-block;
      width: 60px;
      height:62px;
      background-image:url(../static/img/logo@2x.png);
      background-size: cover;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  .tab{
    width: 100%;
    height: 88px;
    display: flex;
    a{
      flex: 1;
      line-height: 88px;
      font-size: 14px;
      text-align: center;
      text-decoration: none;
      &.router-link-active{
        border-bottom: 2px solid #FFCD2B;
      }
    }
    
  }
</style>
