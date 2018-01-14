import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Apply = resolve => require(['@/components/page/apply'], resolve)                         //申请页面
const Package = resolve => require(['@/components/page/package'], resolve)                     //选择套餐页面
const Check = resolve => require(['@/components/page/orderCheck'], resolve)                    //订单确认页面
const OrderDetail = resolve => require(['@/components/page/orderDetail'], resolve)             //订单详情页面
// const Test = resolve => require(['@/components/page/test'], resolve)                        //test
/*地址管理页面*/
const CreateAddress = resolve => require(['@/components/page/address/createAdr'], resolve)           //新增地址
const RegAddress = resolve => require(['@/components/page/address/registerAdr'], resolve)            //修改地址
const Address = resolve => require(['@/components/page/address/address'], resolve)                   //地址管理

const Businesslist = resolve => require(['@/components/page/business/businessList'], resolve)        //我的申请
const BusDetail  = resolve => require(['@/components/page/business/busDetail'], resolve)             //业务详情

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
    {
      path:'/address',               //地址管理
      name:'Address',
      component:Address
    },
    {
      path:'/createAddress',          //新增地址
      name:'CreateAddress',
      component:CreateAddress
    },
    {
      path:'/regAddress',            //修改地址
      name:'RegAddress',
      component:RegAddress
    },
    {
      path:'/businesslist',          //我的申请（业务列表）
      name:"Businesslist",
      component:Businesslist
    },
    {
      path:'/busDetail',             //业务详情
      name:"BusDetail",
      component:BusDetail
    },
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
