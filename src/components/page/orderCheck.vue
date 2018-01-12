<template>    
    <section class="orderCheck" v-if="chargeDetail">
        <header style="width:60%;margin:0 auto;">
            <ul class="clf" :class="'nav'+navList.length" v-if="navList">
                <li v-for="(item,index) in navList" :key="index">
                    <p class="clf" :class="[step == item.seq ? 'active':'',step > item.seq ? 'ok':'']">
                        <span class="left"></span>
                        <span class="center"><b>{{item.seq}}</b></span>
                        <span class="right"></span>
                    </p>
                    <a href="javascript:;">{{item.name}}</a>
                </li>
            </ul>
        </header>
        <div class="combo">
            <div class="p">
                <span>{{chargeDetail.chargeName}}</span>
                <span class="right"><b>{{'￥'+chargeDetail.chargeCount}}</b></span>
            </div>
        </div>
        <div class="cost box" v-for="(item,index) in chargeDetail.chargeProList">
            <span>{{item.projectTypeName}}</span>
            <span>{{'￥'+item.projectCost}}</span>
        </div>
        <!-- <div class="cost box">
            <span>服务费</span>
            <span>￥200</span>
        </div> -->
        
        <div class="combo">
            <div class="p">
                <span>快递费</span>
                <span class="right"><b>{{'￥'+chargeDetail.expressCount}}</b></span>
            </div>
        </div>
        <div class="combo">
            <div class="p">
                <span>税点</span>
                <span class="right"><b>{{'￥'+chargeDetail.taxCount}}</b></span>
            </div>
        </div>
        <div class="combo">
            <div class="p">
                <span>费用总计</span>
                <span class="right"><b class="red">{{'￥'+chargeDetail.sumCount}}</b></span>
            </div>
        </div>
        <div class="comButtonBox box">
            <span @click="preHandle"><a href="javascript:;">上一步</a></span>
            <span @click="checkOrder"><a href="javascript:;" class="active" >确认订单</a></span>
        </div>
        <!-- 加载中弹框 -->
        <Loading v-show="loadState" :context="loadContext"></Loading>
    </section>
</template>
<script>
    import packData from '@/assets/js/package.js';
    export default{
        name:"orderCheck",
        data(){
            return{
                navList:packData.navList,   //导航
                step:2,                     //第几步
                businessId:'',
                thirdPartyId:'',
                chargeDetail:null,            //套餐详情\
                loadState:false,
                loadContext:'提交中...'
            }
        },
        methods:{
            //确认订单
            checkOrder(){
                this.loadState = true;
                this.httpPost(this.URL['confirmOrder'],{
                    "businessId":this.businessId,
                    "thirdPartyId":this.thirdPartyId 
                },(json)=>{
                    if(json.code == 200){
                        this.loadState = false;
                        this.$router.push({
                            name:'OrderDetail'
                        })
                    }
                })
            },
            //获取套餐详情
            getChargeDetail(){
                this.loadState = true;
                this.httpGet(this.URL['getChargeDetail'],{
                    "businessId":this.businessId,
                    "thirdPartyId":this.thirdPartyId 
                },(json)=>{
                    this.loadState = false;
                    if(json.code == 200){
                        this.chargeDetail = json.data;
                    }
                })
            },
            //上一步
            preHandle(){
                this.httpGet(this.URL['lastStep'],{
                    businessId:this.businessId,
                    thirdPartyId:this.thirdPartyId
                },(json)=>{
                    if(json.code == 200){
                        this.$router.push({
                            name:"Apply"
                        })
                    }
                })
            },
        },
        mounted(){
            this.businessId = this.getSData('businessId');
            this.thirdPartyId = this.getSData('thirdPartyId');
            this.getChargeDetail();
        }
    }
</script>