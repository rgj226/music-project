<template>
  <div class="history">
    <div class="historymain">
      <div class="title">
        <h2>历史搜素</h2>
        <span @click="clearall" class="clearall"></span>
      </div>
      <ul class="listmain">
        <li v-for="item in data" @click="sethistoryname(item)">
          <span class="name">{{item}}</span>
          <span class="itemclear" @click.stop="deleatitem(item)">x</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      data:{
        type:Array,
        default:''
      }
    },
    methods:{
      sethistoryname(item){
        this.$emit('sethistoryname',item)
      },
      deleatitem(item){
        this.$emit('deleathistory',item)
      },
      clearall(){
        this.$emit('clearhistory')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .history{
    .historymain{
      .title{
        display: flex;
        font-size: 16px;
        margin-bottom: 20px;
        color: rgba(255,255,255,0.5);
        h2{
          flex: 1;
        }
        .clearall{
          flex: 0 0 30px;
          align-items: right;
          background: url("delete.png") no-repeat;
          -webkit-background-size: cover;
          background-size: cover;
        }
      }
      .listmain{
        li{
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          display: flex;
          margin-top: 25px;
          .name{
            flex: 1;
          }
          .itemclear{
            flex: 0 0 30px;
          }
        }
      }
    }
  }
</style>
