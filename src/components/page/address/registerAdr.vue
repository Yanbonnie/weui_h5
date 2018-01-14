<template>
    <section class="addressPage">
        <div class="item box">
            <label for="">收货人</label>
            <input type="text" placeholder="请输入收货人姓名" v-model="name">
        </div>
        <div class="item box">
            <label for="">联系方式</label>
            <input type="text" placeholder="请输入固话或手机号码" v-model="phone">
        </div>
        <div class="item box">
            <label for="">选择地区</label>
            <span>{{address.name.join('')}}<b @click="address.state = true">{{address.name.length > 0 ? '修改':'请选择地址'}}<i></i></b></span>                        
        </div>
        <div class="item box">
            <label for="">详细地址</label>
            <input type="text" placeholder="请输入详细地址(不包含省市区)" v-model="detailAdr">
        </div>
        <div class="comButtonBox box">
            <span><a href="javascript:;">返回</a></span>
            <span><a href="javascript:;" class="active">保存修改</a></span>
        </div>

        <div class="addressCover" v-show="address.state">
            <div class="title">请选择地址<img src="../../../assets/images/close.png" alt="" @click.stop="address.state = false"></i></div>
            <v-distpicker  type="mobile" @selected="onSelected" ></v-distpicker>
        </div>        
    </section>    
</template>
<script>
import VDistpicker from 'v-distpicker';
export default {
    name:"regAddress",
    data(){
        return{
            name:'张三',    //收货人
            phone:'18825365958',    //联系方式
            detailAdr:'成悦大厦',   //详细地址
            address:{
                state:false,
                name:['广东省','广州市','越秀区']
            }
        }
    },
    components:{
        'v-distpicker':VDistpicker
    },
    methods:{
        onSelected(data){
            this.address.state = false;
            this.address.name = [data.province.value,data.city.value,data.area.value];
        }
    },
    mounted(){
        document.title="修改地址"
    }
}
</script>

