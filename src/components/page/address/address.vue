<template>
    <section class="addressPage" style="width:92%;">
        <ul class="addressList">
            <li v-for="(item,index) in list" :key="index" @click="goAddressDetail">
                <mt-cell-swipe 
                :right="[
                    {
                    content: '删除',
                    style: { background: 'red', color: '#fff' },
                    handler: () => messagebox(item)
                    }
                ]">
                    <div slot="title" class="context">
                        <h3>{{item.name+item.phone}}</h3>
                        <p>{{item.address}}</p>
                        <span>设为默认</span>
                    </div>
                </mt-cell-swipe>
            </li>
        </ul>
        <div class="comButtonBox box">
            <span><a href="javascript:;">返回</a></span>
            <span><router-link to="/createAddress" class="active" >增加地址</router-link></span>
        </div>
    </section>

</template>
<script>
let list = [
    {
        name:'张三',
        phone:'18825039689',
        address:'广东省广州市海珠区成悦大厦'
    },
    {
        name:'张三',
        phone:'18825039689',
        address:'广东省广州市海珠区成悦大厦'
    }
]
export default {
    name:'addressManage',
    data(){
        return{
            list:list
        }
    },
    methods:{
        messagebox(item){
            console.log(item)
        },
        goAddressDetail(item){
            this.$router.push({
                name:'RegAddress'
            })
        }
    },
    mounted(){
        document.title="地址管理"
    }
}
</script>

