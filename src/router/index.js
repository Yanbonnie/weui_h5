import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Apply = resolve => require(['@/components/page/apply'], resolve)                         //申请页面
const Package = resolve => require(['@/components/page/package'], resolve)                     //选择套餐页面
const Check = resolve => require(['@/components/page/orderCheck'], resolve)                    //订单确认页面
const OrderDetail = resolve => require(['@/components/page/orderDetail'], resolve)             //订单详情页面
// const Test = resolve => require(['@/components/page/test'], resolve)                           //订单详情页面

export default new Router({  
  // mode: 'history',
  routes: [
    {
      path:'/apply',            //申请页面
      name:'Apply',
      component:Apply
    },
    {
      path:'/package',          //选择套餐页面
      name:'Package',
      component:Package
    },
    {
      path:'/check',           //订单确认页面
      name:'Check',
      component:Check
    },
    {
      path:'/detail',          //订单详情（支付）
      name:'OrderDetail',
      component:OrderDetail
    },
    // {
    //   path:'/test',          //订单详情（支付）
    //   name:'Test',
    //   component:Test
    // },
    {
      path:'/',
      redirect:'/apply'
    },
    // {
    //   path:'*',
    //   redirect:'/apply'
    // }
  ]
})
