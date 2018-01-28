<template>
   <section class="business" id="business">
       <ul class="businessList">
           <li class="box">
               <div class="sideLeft">
                    <canvas id="canvas" width="200" height="200"></canvas>
               </div>
               <div class="sideRight">
                   <h3>广州保德计算器信息服务系统大数据有限公司</h3>
                   <p>申请项目：国税局土地使用证书 <span class="icon">审核中</span></p>
                   <p>更新于01-02 18:44</p>
               </div>
           </li>
           <li class="box">
               <div class="sideLeft">
                    <canvas id="canvas2" width="200" height="200"></canvas>
               </div>
               <div class="sideRight">
                   <h3>广州保德计算器信息服务系统大数据有限公司</h3>
                   <p>申请项目：国税局土地使用证书 <span class="icon">物流中</span></p>
                   <p>更新于01-02 18:44</p>
               </div>
           </li>
       </ul>

   </section>
</template>
<script>
export default {
    name:'businessList',
    data(){
        return{
        }
    },
    methods:{
        getData(){
            this.drawPro('canvas',55);
            this.drawPro('canvas2',45);
        },
        drawPro(id,process){
            let c = document.getElementById(id);
            let ctx = c.getContext('2d');
            ctx.scale(2,2);
            // 画灰色的圆
            ctx.beginPath();
            ctx.arc(50, 50, 30, 0, Math.PI*2);  3
            ctx.closePath();
            ctx.fillStyle = '#eeeeee';
            ctx.fill();
            drawCricle(ctx, process);
            function drawCricle(ctx, percent){
                // 画进度环
                ctx.beginPath();
                ctx.moveTo(50, 50);
                ctx.arc(50, 50, 30, Math.PI * 1.5, Math.PI * (1.5 + 2 * percent / 100 ));
                ctx.closePath();
                ctx.fillStyle = '#5be835';
                ctx.fill();
                // 画内填充圆
                ctx.beginPath();
                ctx.arc(50, 50, 25, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = '#fff';
                ctx.fill();
                // 填充文字
                ctx.font = "12px Microsoft YaHei";
                ctx.fillStyle = '#333';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.moveTo(50, 50);
                ctx.fillText(process + '%', 50, 50);
            }
        }
    },
    mounted(){
        document.title="我的申请";
        this.getData();
    }
}
</script>
