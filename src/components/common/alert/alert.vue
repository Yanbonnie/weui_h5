<template>
    <section class="alertCover">
        <div class="alertBox">
            <div class="alertBody" slot="alertBody">
                <h3>{{context}}</h3>
            </div>
            <div class="alertFooter clf">
                <a href="javascript:;" @click="cancelHandle">{{cancelTxt}}</a>
                <a href="javascript:;" @click="sureHandle">{{sureTxt}}</a>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name:'alert',
    data(){
        return{

        }
    },
    props:{
        context:{
            type:String,
            defalut:''
        },
        cancelTxt:{
            type:String,
            defalut:'取消'
        },
        sureTxt:{
            type:String,
            defalut:'确定'
        }
    },
    methods:{
		cancelHandle(){
			this.$emit("cancelHandle");
		},
		sureHandle(){
            this.$emit("sureHandle");
			// if(this.sureTxt == "确定"){
			// 	this.$emit("sureHandle");
			// }			
		}
    },
    mounted(){

    }
}
</script>

<style lang="scss" scoped>
    .alertCover{
        position: fixed;
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
        background: rgba(0,0,0,0.6);
        z-index: 50;
        .alertBox{
            width:90%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            background:#fff;
            .alertBody{
                padding: 45px 25px;
                h3{
                    font-size:16px;
                    text-align: center;
                }
            }
            .alertFooter{
                padding: 0 25px 25px;
                a{
                    width: 45%;
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
                    float: left;
                    text-align: center;
                    background: #eeeeee;
                    color: #acacac;
                    &:nth-child(2){
                        float: right;
                        background:#e83535;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
