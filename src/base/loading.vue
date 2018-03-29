<template>
  <div class="loading">
    <div class="mian">
      <img width="48" height="48" src="./loading.gif" alt="" />
      <p class="title">{{title}}</p>      
    </div>
  </div>
</template>

<script type="text/ecmascript-6">  
  export default {
    props:{
      title:{
        type:String,
        default:''
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .loading{
    width: 100%;
    display: flex;
    justify-content: center;
    .main{
      .title{
      font-size: 12px;
      text-align: center;
      color: #333333;
      }
    }   
  }
</style>