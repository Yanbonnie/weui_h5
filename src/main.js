// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import axios from 'axios'
axios.defaults.withCredentials = true
Vue.prototype.$http = axios;
/*CSS*/
import '@/assets/css/css.scss'
import '@/assets/css/style.scss'

/*JS*/
import url from '@/assets/js/URL.js'
Vue.prototype.URL = url

import MyPlugin from './assets/js/common.js'
Vue.use(MyPlugin)

//模态框公共组件
import Model from './components/common/model/index.js';
Vue.use(Model)

//Loading公共组件
import Loading from './components/common/loading/index.js';
Vue.use(Loading)

//弹框公共组件
import Alert from './components/common/alert/index.js';
Vue.use(Alert)

import { CellSwipe } from 'mint-ui';
Vue.component(CellSwipe.name, CellSwipe);

import '@/assets/js/plugin/jquery-1.12.2.min.js';

Vue.prototype.validateQb =  require('@/assets/js/validate.js').default;

Vue.prototype.setSData=function(key, value){
  sessionStorage.setItem(key, JSON.stringify(value));
 };
 /*
  * 获取localStorage
  */
 Vue.prototype.getSData=function(key){
    if(sessionStorage.getItem(key) === "undefined"){        
        return '';
    }else{
        return JSON.parse(sessionStorage.getItem(key));
    }   
 };
 /*
  * 清楚localStorage数据
  */
 Vue.prototype.removeSData=function(key){
   window.sessionStorage.removeItem(key);
 };

//路由跳转之前
router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0;      
    let businessId = Vue.prototype.getSData('businessId');
    let thirdPartyId = Vue.prototype.getSData('thirdPartyId');
    if(businessId && thirdPartyId){   //存在业务id和openid
        Vue.prototype.queryPresentFlowcfg(businessId,thirdPartyId,router);
    }else{
        if(to.name != 'Apply'){
            router.push({
                name:'Apply',
            })            
        }    
    }
    
    next();
})

Vue.config.productionTip = false
Vue.prototype.CUSTOMEVENT = new Vue()   //自定义事件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
