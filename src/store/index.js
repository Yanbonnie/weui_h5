import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  curAccount:null,      //用户所有数据
  model:{state:false,context:'',topClass:''},    //模态框默认数据
  step:0,          //执行到第几步骤
  flowId:null,
}

const Actions = {
    saveCurAccount({commit},jsonData){
      commit('saveCurAccount',jsonData)
    },
    changeModel({commit},jsonData){
      commit('changeModel',jsonData)
    },
    changeStep({commit},num){
      commit('changeStep',num)
    },
    saveFlowId({commit},str){
      commit('saveFlowId',str)
    }
  }
const Mutations = {
  saveCurAccount(state,jsonData){   //用户信息
    state.curAccount = jsonData;
  },
  changeModel(state,jsonData){      //改变公共模态框状态
    state.model = jsonData
  },
  changeStep(state,num){
    state.step = num;    
  },
  saveFlowId(state,str){
    state.flowId = str;
  }
}

const Getters = {
  curAccount(state){
    return state.curAccount;
  },
  model(state){
    return state.model
  },
  step(state){
    return state.step
  },
  flowId(state){
    return state.flowId
  }
}

export default new Vuex.Store({
  state:state,
  actions:Actions,
  mutations:Mutations,
  getters:Getters
})
