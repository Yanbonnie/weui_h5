<template>
    <section class="package">
        <!-- <header style="width:60%;margin:0 auto;">
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
        </header> -->
        <div class="packageBox" style="padding-top:30px;">
            <!-- combo -->
            <div class="combo">
                <div class="p" @click="packageSelectHandleShow"> 

                    <span>套餐选择</span>
                    <span class="right"><b>{{chargeName ? chargeName : '请选择'}}</b><i class="right_icon"></i></span>

                    <!--下拉框-->
                    <div class="addressCover"  v-show="packageSelect">
                        <div class="title">选择套餐
                            <img  @click.stop="packageSelectClose" src="../../assets/images/close.png" alt="">
                        </div> 
                        <div  class="address">
                            <div class="address-header">
                                <ul>
                                    <li class="active">请选择</li> 
                                </ul>
                            </div> 
                            <div class="address-container">
                                <ul>
                                    <li v-for="(item,index) in packages" @click.stop="packageSelectHandle(item)">
                                        <p>{{item.chargeName}}</p>
                                        <p>包含{{item.chargeDetail}}</p>
                                    </li>   
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="defaultBox box">
                <span>物流公司</span>
                <span>顺丰快递</span>
            </div>
            <!-- 选择地址 -->
            <div class="menu">
                <div class="p" @click="address.state = true">
                    <span>选择地址</span>
                    <span class="right"><b>{{address.name ? address.name.join('') : '请选择'}}</b><i class="right_icon"></i></span>
                    <div class="addressCover" v-show="address.state">
                        <div class="title">请选择地址<img src="../../assets/images/close.png" alt="" @click.stop="address.state = false"></i></div>
                        <v-distpicker  type="mobile" @selected="onSelected" :province="address.name[0]" :city="address.name[1]" :area="address.name[2]"></v-distpicker>
                    </div>
                </div> 
            </div>
            
            <div class="addressDetail box">
                <span>详细地址</span>
                <span>
                    <input type="text" name="" v-model="address.detail" id="addressDetail">
                    <b v-show="!address.detail" @click="focusInput(0)">请输入详细地址</b>
                </span>
            </div>
            <!-- 发票 -->
            <div class="invoiceBox box">
                <span>
                    是否需要电子发票
                </span>
                <div>                    
                    <label @click="invoiceNeed = invoiceNeed == 0 ? 1 : 0"><b :class="[!invoiceNeed ? 'active' : '']"></b>不需要</label>
                    <label @click="invoiceNeed = invoiceNeed == 0 ? 1 : 0"><b :class="[invoiceNeed ? 'active' : '']"></b>需要</label>
                </div>
            </div>
            <!-- combo -->
            <div class="combo" v-show="invoiceNeed">
                <div class="p" @click="invoice.state = true"> 

                    <span>开票类型</span>
                    <span class="right"><b>{{invoiceName}}</b><i class="right_icon"></i></span>

                    <!--下拉框-->
                    <div class="addressCover"  v-show="invoice.state">
                        <div class="title">选择开票类型
                            <img  @click.stop="invoice.state = false" src="../../assets/images/close.png" alt="">
                        </div> 
                        <div  class="address">
                            <div class="address-header">
                                <ul>
                                    <li class="active">请选择</li> 
                                </ul>
                            </div> 
                            <div class="address-container">
                                <ul>
                                    <li @click.stop="selectinvoiceStyle(item)" v-for="(item,index) in invoiceStyleList" :key="index">{{item.displayField}}</li> 
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="addressDetail box kaipiao" v-show="invoiceNeed">
                <span>开票单位信息</span>
                <span>
                    <input type="text" name="" v-model="invoice.comInfo" id="invoiceDetail">
                    <b v-show="!invoice.comInfo" @click="focusInput(1)">请输入</b>
                </span>
            </div>
            <div class="addressDetail box code" v-show="invoiceNeed">
                <span>请输入企业识别码</span>
                <span>
                    <input type="text" name="" v-model="invoice.code" id="invoiceCode">
                    <b v-show="!invoice.code" @click="focusInput(2)">请输入</b>
                </span>
            </div>
            <div class="label">
                <p class="gray">本业务只支持开具电子发票，如需开具其他类型发票请终止本业务并通过其他渠道办理业务。</p>
            </div>
            <div class="comButtonBox box">
                <span @click="preHandle"><a href="javascript:;">返回修改</a></span>
                <span @click="applyCharge" class="active"><a href="javascript:;" class="active">下一步</a></span>
            </div>
        </div>
        <!-- 加载中弹框 -->
        <Loading v-show="loadState"></Loading>
    </section>
</template>
<script>
    import packData from '@/assets/js/package.js';
    import VDistpicker from 'v-distpicker';
    export default {
        name:'package',
        data(){
            return {
                navList:packData.navList,   //导航
                packages:null, //套餐
                step:1,                     //第几步
                packageSelect:false,        //套餐选择状态
                chargeName:'',              //套餐名成
                chargeId:'',                //套餐id
                invoiceNeed:1,              //是否需要开发票  1需要  0 不需要
                invoiceStyleList:[],        //发票类型list
                invoiceName:'',             //发票类型名称
                invHeadType:'',             //发票类型Value值
                address:{                   //地址弹框
                    state:false,
                    name:'',
                    detail:''
                },
                invoice:{
                    state:false,           //开票类型弹框状态
                    comInfo:'',            //开票单位信息
                    code:'',               //企业识别码
                },
                businessId:'',
                thirdPartyId:'',
                loadState:false,
            }
        },
        components:{
            'v-distpicker':VDistpicker
        },
        methods:{
            //选择套餐
            packageSelectHandleShow(){
                this.packageSelect = true;
                $("body,html").css({"height":"100%","overflow":"hidden"});
            },
            packageSelectClose(){
                this.packageSelect = false;
                $("body,html").css({"height":"auto","overflow":"auto"});
            },
            //获取选择套餐详情
            restoreCharge(){
                this.loadState = true;
                this.httpGet(this.URL['restoreCharge'],{
                    businessId:this.businessId,
                    thirdPartyId:this.thirdPartyId,
                },(json)=>{
                    if(json.code == 200){
                        this.loadState = false;
                        let data = json.data;
                        let expAddress = data.expAddress;
                        if(expAddress){   //存在地址
                            [this.address.name,this.address.detail] = 
                            [[data.expAddress.split(',')[0],data.expAddress.split(',')[1],data.expAddress.split(',')[2]],data.expAddress.split(',')[3]]
                        }
                        if(data.invoiceNeed){
                            this.invoiceNeed = data.invoiceNeed 
                        }
                        [this.chargeId,this.invHeadType,this.invoice.comInfo,this.invoice.code] = [data.chargeId,data.invType,data.invHead,data.taxNo];
                        this.getChargeList();
                        this.getInvHeadTypeEnum();
                    }
                })
            },
            //提交套餐
            applyCharge(){
                if(!this.chargeId){
                    this.modelCommonTip('请选择套餐!');
                    return;
                }
                if(this.address.name.length == 0){
                    this.modelCommonTip('请选择地址!');
                    return;
                }
                if(!this.address.detail){
                    this.modelCommonTip('请填写地址详情!');
                    return;
                }
                if(this.invoiceNeed){  //开发票
                    if(!this.invoice.comInfo){
                        this.modelCommonTip('开票单位信息不能为空!');
                        return;
                    }
                    if(!this.invoice.code){
                        this.modelCommonTip('企业识别码不能为空!');
                        return;
                    }
                }
                this.httpPost(this.URL['applyCharge'],{
                    businessId:this.businessId,
                    thirdPartyId:this.thirdPartyId,
                    chargeId:this.chargeId,
                    expAddress:this.address.name.join(',')+','+this.address.detail,
                    invoiceNeed:this.invoiceNeed,
                    invType:this.invHeadType,
                    invHead:this.invoice.comInfo,
                    taxNo:this.invoice.code
                },(json)=>{
                    if(json.code == 200){  //保存成功
                        // this.queryPresentFlowcfg();
                        // this.$router.push({
                        //     name:'Check'
                        // })
                        this.checkOrder();
                    }
                })
            },
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
            //选择发票类型
            selectinvoiceStyle(item){
                this.invoiceName = item.displayField;
                this.invHeadType = item.valueField;
                this.invoice.state = false;
            },
            //获取发票类型
            getInvHeadTypeEnum(){
                this.httpGet(this.URL['getInvHeadTypeEnum'],{
                    businessId:this.businessId,
                    thirdPartyId:this.thirdPartyId
                },(json)=>{
                    if(json.code == 200){
                        this.invoiceStyleList = json.data;
                        if(this.invoiceStyleList.length == 0) return;
                        if(!this.invHeadType){  //不存在发票类型
                            this.invoiceName = this.invoiceStyleList[0].displayField;
                            this.invHeadType = this.invoiceStyleList[0].valueField;
                        }else{
                            this.invoiceName = this.invoiceStyleList.filter(item=>this.invHeadType == item.valueField)[0].displayField;
                        }
                        
                    }
                })
            },
            //套餐选择
            packageSelectHandle(item){
                this.packageSelect = false;
                $("body,html").css({"height":"auto","overflow":"auto"});
                this.chargeId = item.chargeId;
                this.chargeName= item.chargeName;
            },
            //获取套餐列表
            getChargeList(){
                this.httpGet(this.URL['getChargeList'],{
                    businessId:this.businessId,
                    thirdPartyId:this.thirdPartyId
                },(json)=>{
                    if(json.code == 200){
                        this.packages = json.data;
                        if(this.packages.length == 0) return;
                        if(this.chargeId){
                            this.chargeName = this.packages.filter((item)=>{
                                return this.chargeId == item.chargeId
                            })[0].chargeName
                        }
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
            focusInput(num){
                if(num == 0){
                    $('#addressDetail').focus();
                }else if(num == 1){
                    $("#invoiceDetail").focus();
                }else{
                    $("#invoiceCode").focus();
                }
                
            },
            onSelected(data){
                this.address.state = false;
                this.address.name = [data.province.value,data.city.value,data.area.value];
            }
        },
        mounted(){
            this.businessId = this.getSData('businessId');
            this.thirdPartyId = this.getSData('thirdPartyId');
            // this.restoreCharge();
        }
    }
</script>