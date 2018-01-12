<template>
  <div id="app">
    <Model v-show="model.state" :context="model.context" :topClass="model.topClass"></Model>
    <!-- <HeaderCom ></HeaderCom>  -->
    <router-view></router-view>   
  </div>
</template>

<script>
// import HeaderCom from '@/components/header';
export default {
    name: 'app',
    data(){
  	    return{

  	    }
    },
    computed:{
        model(){
            return this.$store.state.model;
        }
    },
    components:{
        // HeaderCom
    },
    methods:{
        showModel(){
            this.modelCommonTip('我是测试',2000,'topClass')
        }
    }
}
</script>
<style lang="scss" scoped>
</style>