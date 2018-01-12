<template>
    <section>
        <p>{{'endStamp:'+endStamp}}</p>
        <p>{{'nowStamp:'+nowStamp}}</p>
        <p>{{'temTime:'+temTime}}</p>
        <p>{{'hour:'+hour}}</p>
        <p>{{'minute:'+minute}}</p>
        <p>{{'second:'+second}}</p>
    </section>
</template>
<script>
    export default{
        data(){
            return{
                endStamp:'',
                nowStamp:'',
                temTime:'',
                hour:'',
                minute:'',
                second:'',
                Timer:''
            }
        },
        methods:{
            timeHandle(){
                let endPayTime = '2018-01-10 11:38:59';
                let mydata=endPayTime.replace(/-/g, '/');  
                this.endStamp = Date.parse(new Date(mydata))/1000;
                this.nowStamp = Date.parse(new Date())/1000;
                this.temTime = this.endStamp - this.nowStamp;
                if(this.temTime < 0){
                    // this.orderState = false;
                    return;
                }
                clearInterval(this.Timer);
                this.Timer = setInterval(()=>{
                    this.temTime--;                         
                    let curTime = this.formatTime(this.temTime).split(':');
                    this.hour = curTime[0];
                    this.minute = curTime[1].substring(0,2);
                    this.second = curTime[2];
                },1000)
            },
            formatTime(second){
                return [parseInt(second / 60 / 60), second / 60 % 60, second % 60].join(":").replace(/\b(\d)\b/g, "0$1");
            }
        },
        mounted(){
            this.timeHandle();
        }
    }
</script>