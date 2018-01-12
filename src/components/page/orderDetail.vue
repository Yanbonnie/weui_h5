<template>
    <section class="orderDetail" v-if="detail">
        <div class="wait box">
            <div class="sideLeft">
                <p v-if="orderState==3">{{'已支付'}}</p>
                <p v-else-if="orderState==2">{{'支付取消'}}</p>
                <p v-else>{{'等待支付中'}}</p>
                <p v-if="orderState==1">订单将在{{hour == '00' ? '' : hour + '小时'}}{{minute == '00' ? '' : minute + '分'}}{{second == '00' ? '' : second + '秒'}}后关闭</p>
                <p v-if="orderState==2">订单已关闭</p>
            </div>
            <div class="sideRight">
                <img src="../../assets/images/wait_icon.png">
            </div>
        </div>
        <div class="address box">
            <div class="sideLeft">
                <img src="../../assets/images/adreess_icon.png">
            </div>
            <div class="sideRight">
                <h3>收货人：{{detail.expName}}{{detail.expPhone ? detail.expPhone : ''}}</h3>
                <p>收货地址：{{expAddress}}</p>
            </div>
        </div>
        <div class="detail">
            <ul>
                <li class="box">
                    <span>订单编号</span>
                    <span>{{detail.orderId}}</span>
                </li>
                <li class="box">
                    <span>所选套餐</span>
                    <span>{{detail.chargeVo.chargeName}}</span>
                </li>
                <li class="box">
                    <span>订单创建时间</span>
                    <span>{{detail.createTime}}</span>
                </li>
                <li class="box" v-show="detail.payTime">
                    <span>支付时间</span>
                    <span >{{detail.payTime}}</span>
                </li>
                <li class="box">
                    <span>订单状态</span>
                    <span v-if="orderState==3">已支付</span>
                    <span v-else-if="orderState==2">{{'已取消'}}</span>
                    <span v-else>{{'等待付款'}}</span>
                </li>
                <li class="box" v-if="detail.invUrl">
                    <span>开票状态</span>
                    <span>已开票</span>
                </li>
                <li class="box">
                    <span>应付金额</span>
                    <span>{{'￥'+detail.chargeVo.sumCount}}</span>
                </li>
                <li>
                    <!-- <p class="box">
                        <span>应用服务费</span>
                        <span>{{'￥'+detail.chargeVo.expressCount}}</span>
                    </p>
                    <p class="box">
                        <span>介质费</span>
                        <span>{{'￥'+detail.chargeVo.expressCount}}</span>
                    </p> -->
                    <p class="box" v-for="(item,index) in chargeProList" :key="index">
                        <span>{{item.projectTypeName}}</span>
                        <span>{{'￥'+item.projectCost}}</span>
                    </p>
                    <p class="box">
                        <span>快递费</span>
                        <span>{{'￥'+detail.chargeVo.expressCount}}</span>
                    </p>
                    <p class="box">
                        <span>税点</span>
                        <span>{{'￥'+detail.chargeVo.taxCount}}</span>
                    </p>
                </li>
            </ul>
        </div>
        <div class="button">
            <a href="javascript:;" class="active" v-if="orderState == 1" @click="paying">前往支付</a>
        </div>
        <!-- 加载中弹框 -->
        <Loading v-show="loadState"></Loading>
    </section>
</template>
<script>
    export default{
        name:"orderDetail",
        data(){
            return{
                loadState:false,
                businessId:'',
                thirdPartyId:'',
                businessApplyId:'',
                detail:null,       //订单详情   
                countDown:'',      //倒计时
                Timer:null,        //倒计时定时器
                hour:'',
                minute:'',
                second:'',
                orderState:1,    //订单状态   1-等待支付  2-订单已取消  3已支付
                chargeProList:[],   //介质列表
                expAddress:'',      //地址

            }
        },
        methods:{
            //支付
            paying(){
                this.httpGet(this.URL['paying'],{
                    "businessId":this.businessId,
                    "thirdPartyId":this.thirdPartyId 
                },(json)=>{
                    if(json.code == 200){
                        console.log(json)
                        window.location.href = json.data.payUrl;
                    }else{
                        this.modelCommonTip(json.alertMsg)
                    }
                })
            },
            //获取详情
            getOrderDetail(){
                this.loadState = true;
                let data = {};
                if(this.businessApplyId){  //存在
                    data = {
                        "businessId":this.businessId,
                        "thirdPartyId":this.thirdPartyId,
                        "businessApplyId":this.businessApplyId
                    }
                }else{
                    data = {
                        "businessId":this.businessId,
                        "thirdPartyId":this.thirdPartyId,
                    }
                }
                this.httpGet(this.URL['getOrderDetail'],data,(json)=>{
                    this.loadState = false;
                    if(json.code == 200){
                        this.detail = json.data;
                        if(detail.payTime){   //存在支付时间的时候
                            this.orderState = 3;
                        }
                        this.expAddress = this.detail.expAddress.replace(/,/g,'');
                        this.chargeProList = json.data.chargeVo.chargeProList;
                        // json.data.endPayTime = '2018-01-05 11:38:59'
                        let mydata = json.data.endPayTime.replace(/-/g, '/');  
                        let endStamp = Date.parse(new Date(mydata))/1000;
                        let nowStamp = Date.parse(new Date())/1000;
                        let temTime = endStamp - nowStamp;
                        if(temTime < 0){
                            this.orderState = 2;
                            return;
                        }
                        clearInterval(this.Timer);
                        this.Timer = setInterval(()=>{
                            temTime--                            
                            let curTime = this.formatTime(temTime).split(':');
                            this.hour = curTime[0];
                            this.minute = curTime[1].substring(0,2);
                            this.second = curTime[2];
                        },1000)
                    }
                })
            },
            formatTime(second){
                return [parseInt(second / 60 / 60), second / 60 % 60, second % 60].join(":").replace(/\b(\d)\b/g, "0$1");
            }
        },
        mounted(){
            this.businessId = this.getSData('businessId');
            this.thirdPartyId = this.getSData('thirdPartyId');
            this.businessApplyId = this.$route.query.businessApplyId;
            this.getOrderDetail();
            document.title="订单详情"
        }
    }
</script>