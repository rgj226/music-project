<template>
  <div class="search-box">
    <span class="icon-find"></span>
    <input type="text" v-model="query" :placeholder="placeholder" />
    <span class="icon-close" v-show="query" @click="clearquery">x</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      placeholder:{
        type:String,
        default:'请输入歌手、歌名'
      }
    },
    data(){
      return{
        query:this.querys
      }
    },
    methods:{
      clearquery(){
        this.query=''
      },
      getquery(name){
        this.query=name
      },
      setquery(item){
        this.query=item
      }
    },
    watch:{
      query(newquery){
        this.$emit('changequery',newquery)
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .search-box{
    background: #333;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-radius: 5px;
    .icon-find{
      flex: 0 0 35px;
      font-size: 24px;
    }
    input{
      flex: 1;
      width: 100%;
      height: 60px;
      background: #333;
      color: #fff;
    }
    .icon-close{
      flex: 0 0 30px;
      font-size: 12px;
      height: 30px;
      line-height: 30px;
      display: inline-block;
      border-radius: 50%;
      text-align: center;
      background: #222;
      padding-bottom: 5px;
    }
  }
</style>
