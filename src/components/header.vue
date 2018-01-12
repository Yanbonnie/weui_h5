<template>
    <header>
        <ul class="clf" :class="'nav'+navList.length">
            <!-- <li>
                <p class="clf" :class="[step == 1 ? 'active':'',step > 1 ? 'ok':'']" >
                    <span class="left"></span>
                    <span class="center"><b>1</b></span>
                    <span class="right"></span>
                </p>
                <a href="javascript:;">个人信息</a>
            </li>
            <li>
                <p class="clf" :class="[step == 2 ? 'active':'',step > 2 ? 'ok':'']">
                    <span class="left"></span>
                    <span class="center"><b>2</b></span>
                    <span class="right"></span>
                </p>
                <a href="javascript:;">企业信息</a>
            </li>
            <li>
                <p class="clf" :class="[step == 3 ? 'active':'',step > 3 ? 'ok':'']">
                    <span class="left"></span>
                    <span class="center"><b>3</b></span>
                    <span class="right"></span>
                </p>
                <a href="javascript:;">法人信息</a>
            </li>
            <li>
                <p class="clf" :class="[step == 4 ? 'active':'',step > 4 ? 'ok':'']">
                    <span class="left"></span>
                    <span class="center"><b>4</b></span>
                    <span class="right"></span>
                </p>
                <a href="javascript:;">提交应用</a>
            </li> -->
            <li v-for="(item,index) in navList" :key="index" >
                <p class="clf" :class="[step == item.seq ? 'active':'',step > (item.seq+1) ? 'ok':'']">
                    <span class="left"></span>
                    <span class="center"><b>{{item.seq}}</b></span>
                    <span class="right"></span>
                </p>
                <a href="javascript:;">{{item.name}}</a>
            </li>
        </ul>
    </header>
</template>
<script>
    export default{
        name:'header2',
        data(){
            return {
                navList:[]
            }
        },
        computed:{
            step(){
                return this.$store.state.step
            },

        },
        methods:{
            queryNavigationProcess(){  //2.1.4.清单流程配置查询
                this.httpGet(this.URL['queryNavigationProcess'],{},(json)=>{
                    this.navList = json.data.presentInventoryList;
                })
            },
        },
        mounted(){
            // this.queryNavigationProcess();
        }
    }
</script>
