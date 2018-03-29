import Vue from 'vue'
import Router from 'vue-router'
import recommend from '@/components/recommend/recommend'
import singer from '@/components/singer/singer'
import hunk from '@/components/hunk/hunk'
import ranking from '@/components/ranking/ranking'
import singerdetail from '@/components/singerdetail/singerdetail'
import cdlist from '@/components/cdlist/cdlist'
import rankdetail from '@/components/ranking/rankingdetail'

Vue.use(Router)

export default new Router({
routes: [
    {
      path: '/',
      component: recommend
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend,
      children:[{
        path: ':id',
        component:cdlist
      }]
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer,
      children:[{
        path: ':id',
        component: singerdetail     
       }]
        
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: ranking,
      children:[{
        path:':id',
        component:rankdetail
      }]
    }
    ,
    {
      path: '/hunk',
      name: 'hunk',
      component: hunk,
      children:[{
        path:":id",
        component:singerdetail
      }]
    }
]
})
