<template>
    <section class="addressPage">
        <div class="item box">
            <label for="">收货人</label>
            <input type="text" placeholder="请输入收货人姓名">
        </div>
        <div class="item box">
            <label for="">联系方式</label>
            <input type="text" placeholder="请输入固话或手机号码">
        </div>
        <div class="item box">
            <label for="">选择地区</label>
            <span>{{address.name.join('')}}<b @click="address.state = true">{{address.name.length > 0 ? '修改':'请选择地址'}}<i></i></b></span>                        
        </div>
        <div class="item box">
            <label for="">详细地址</label>
            <input type="text" placeholder="请输入详细地址(不包含省市区)">
        </div>
        <div class="comButtonBox box">
            <span><a href="javascript:;">返回</a></span>
            <span><a href="javascript:;" class="active">保存地址</a></span>
        </div>

        <div class="addressCover" v-show="address.state">
            <div class="title">请选择地址<img src="../../../assets/images/close.png" alt="" @click.stop="address.state = false"></div>
            <v-distpicker  type="mobile" @selected="onSelected" ></v-distpicker>
        </div>


        <Alert v-show="reduceAdd.state" :context="'该地址未保存，是否放弃增加'" :cancelTxt="'放弃增加'" :sureTxt="'继续修改'" @cancelHandle="cancelHandle" @sureHandle="sureHandle"></Alert>

        <!-- 已申请证书列表 -->
        <section class="comCover" v-show="false">
            <div class="coverBox certificateList">
                <h3 class="title">多个未完成业务，请选择进入</h3>
                <ul>
                    <li>
                        <div class="shengl">
                            <span>国税局在线证书国税局在线证</span>
                            <span class="icon">申请中</span>
                        </div>
                        <p>数安时代科技股份有限公司</p>
                    </li>
                    <li>
                        <div class="shengl">
                            <span>书国税局在线证</span>
                            <span class="icon">审核不通过</span>
                        </div>
                        <p>数安时代科技股份有限公司</p>
                    </li>
                </ul>
            </div>
        </section>

    </section>
    
</template>
<script>
import VDistpicker from 'v-distpicker';
export default {
    name:"createAddress",
    data(){
        return{
            address:{
                state:false,
                name:[]
            },
            reduceAdd:{   //放弃修改弹框
                state:false
            }
        }
    },
    components:{
        'v-distpicker':VDistpicker
    },
    methods:{
        cancelHandle(){
            console.log("放弃增加")
        },
        sureHandle(){
            console.log("继续修改")
        },
        onSelected(data){
            this.address.state = false;
            this.address.name = [data.province.value,data.city.value,data.area.value];
        }
    },
    mounted(){
        document.title="新增地址"
    }
}
</script>

