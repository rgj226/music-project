<template>
  <div class="singer">
    <singerlist class="singer-list" @select='selectsinger' :data="singers"></singerlist>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">  
  import {getsinger} from '../../api/singer'
  import singerlist from './singerlist'
  import {mapMutations} from 'vuex'
  
  export default {
    data(){
      return{
        singers:[]
      }      
    },
    created(){
     this._getsinger()
    },
    methods:{
      selectsinger(singer){
        this.$router.push({
          path:`/singer/${singer.id}`         
        })
        this.setsingers(singer)
      },
      _getsinger(){
        getsinger().then((res)=>{
          if(res.code===0){
            this.singers = this.singerclassify(res.data.list)
            //console.log(this.singers)
          }
        })
      },
      singerclassify(list){ 
        //let list=this.singers
        let map={        
          hot:{
            title:'热门',
            item:[]
          }
        }
        list.forEach((item,index)=>{
          if(index<10){
            map.hot.item.push({
              name: item.Fsinger_name,
              id: item.Fsinger_mid,
              avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
            })
          }          
          const key=item.Findex
          if(!map[key]){
            map[key]={
              title:key,
              item:[]
            }
          }
          map[key].item.push({
            name: item.Fsinger_name,
            id: item.Fsinger_mid,
            avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`        
          })
        })
        //console.log(map)
        //因为对象的循环无法保证遍历顺序，所以从a-z的顺序就不能保证
        //要保证顺序，应该保存到数组中后在排序
        let hot=[]
        let ret=[]
        for(let key in map){
          let val= map[key]
          if(map[key].title.match(/[a-zA-Z]/)){
            ret.push(map[key])
          }else if(map[key].title==='热门'){
            hot.push(map[key])
          }
        }
        ret.sort((a,b)=>{
          //根据ret的item的titlt的charCodeAt字符编码大小来排序
          return a.title.charCodeAt(0) -  b.title.charCodeAt(0)
        })
        return hot.concat(ret)    //返回新数组
      },
      ...mapMutations({
        setsingers:'SET_SINGER'
      })
    },
    components:{
      singerlist
    }
    
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .singer{
    position: fixed;
    top: 176px;
    bottom: 0;
    width: 100%;
    .singer-list{
      height: 100%;
      overflow: hidden;
      position: relative;
    }
  }
</style>