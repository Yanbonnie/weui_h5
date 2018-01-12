exports.install = function (Vue, options) { 
    let localHost = window.location.host;
    let apiPath = '';
    let wechatPath = '';
    let appid = '';
    let secret = '';

    if(localHost == 'localhost:8213' || localHost == '192.168.22.212:8213') { //本地环境
        apiPath = "/api/remot-app/";  
        wechatPath='/wechat/';
        appid = 'wx46eba52fd2730ca2';
        secret = 'a350654030ccfbab1fd3f9832238fcb9';
    }else if(localHost == 'testremoteauth.95105813.cn'){   //测试环境 
        apiPath = "/remot-app/";   
        wechatPath='/';                
        appid = 'wx837a9431ce9fdf0c';
        secret = '6465d84a013ae2df21b652c57d80b4a2';
    }else{                                                 //生产环境 
        apiPath = "/remot-app/";   
        wechatPath='/';                
        appid = 'wx46eba52fd2730ca2';
        secret = 'a350654030ccfbab1fd3f9832238fcb9';
    }



    Vue.prototype.apiPath = apiPath;
    Vue.prototype.wechatPath = wechatPath;
    Vue.prototype.appid = appid;
    Vue.prototype.secret = secret;

    /**get请求 */
    Vue.prototype.httpGet=function(url,data,sucFn,errFn){
        this.$http.get(apiPath+url+"?data="+new Date().getTime(),
            {
                params:data,
                headers: {'X-Requested-With':'XMLHttpRequest'}
            }).then((json)=>{
                let result = json.data;
                sucFn(result)
            }).catch((err)=>{
                if(errFn){
                    errFn(err)
                }else{
                    console.log(err)
                }
            })
    };

    /**post请求 */
    Vue.prototype.httpPost=function(url,data,sucFn,errFn){
        this.$http({
            method:"POST",
            url:apiPath + url,
            data:data,
            headers: {'X-Requested-With': 'XMLHttpRequest'},
        }).then((json)=>{
            let data = json.data;
            sucFn(data)
        }).catch((err)=>{
            if(errFn){
                errFn(err)
            }else{
                console.log(err)
            }
        })
    };
    //流程查询接口（所有页面都需要）
    Vue.prototype.queryPresentFlowcfg = function(businessId,thirdPartyId,routerName){
        Vue.prototype.httpGet('app/flow/queryPresentFlowcfg',{
            "businessId":businessId,
            "thirdPartyId":thirdPartyId 
        },(json)=>{
            let businessApplyId = Vue.prototype.getUrlPara('businessApplyId');
            if(json.code == 200){
                if(json.data.type == 'charge'){  //套餐选择
                    routerName.push({
                        name:'Package',
                    })
                }
                if(json.data.type == 'order'){  //订单确认
                    routerName.push({
                        name:'Package',
                    })
                }
                if(json.data.type == 'pay'){   //支付页面
                    if(businessApplyId){
                        routerName.push({
                            name:'OrderDetail',
                            query:{
                               "businessApplyId":businessApplyId 
                            }
                        })
                    }else{
                        routerName.push({
                            name:'OrderDetail',
                        })
                    }
                }
                if(json.data.type == 'form'){  //申请页面
                    routerName.push({
                        name:'Apply',
                    })
                }                
            }else{
                Vue.prototype.modelCommonTip(json.alertMsg)
            }
        })
    }
    /*公共模态框*/
    Vue.prototype.modelCommonTip=function(msg,time,topClass){
        let Time = arguments[1] || 1500;
        let CLASS = arguments[2] || '';
        this.$store.dispatch('changeModel',{
            state:true,
            context:msg,
            topClass:CLASS
        })
        setTimeout(()=>{
            this.$store.dispatch('changeModel',{
                state:false,
                context:'',
                topClass:''
            })
        },Time)
    }
    
    /* 数组包含对象去重 */
    Vue.prototype.unique3 = function(arr,field) {   //field  以对象中的什么字段去重
        var hash = {};
        arr = arr.reduce(function(item, next) {
            hash[next[field]] ? '' : hash[next[field]] = true && item.push(next);
            return item
        }, [])
        return arr;
    }
    /*数组不包含对象去重*/
    Vue.prototype.unique1 = function(arr){
        var res = [];
        var json = {};
        for(var i = 0; i < arr.length; i++){
            if(!json[arr[i]]){
            res.push(arr[i]);
            json[arr[i]] = 1;
            }
        }
        return res;
    }
    /*
    * 获取当前时间和一个月
    */
    Vue.prototype.getDataFn = function(n){ //n为1表示一周，为30表示一个月
        var nowdate = new Date();
        var Y = nowdate.getFullYear();
        var M = (nowdate.getMonth()+1) < 10 ? "0"+ (nowdate.getMonth()+1) : (nowdate.getMonth()+1);
        var D = nowdate.getDate();
        var currentdate = Y+'-'+M+'-'+D;
            
        nowdate.setDate(nowdate.getDate() - n);
        var y = nowdate.getFullYear();
        var m = (nowdate.getMonth()+1) < 10 ? "0"+ (nowdate.getMonth()+1) : (nowdate.getMonth()+1);
        var d = nowdate.getDate();
        var formatwdate = y+'-'+m+'-'+d;        
        return {
            "formatwdate":formatwdate,
            "currentdate":currentdate
        }
    }

    /*获取url的参数值 */
    Vue.prototype.getUrlPara= function(str,_url){
        var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)", "i");
        var hrefIndex = window.location.href.indexOf('?');
        //var search = _url ? _url.split('?')[1] : window.location.search.substr(1);
        var search = _url ? _url.split('?')[1] :  window.location.href.substr(hrefIndex+1);
        var par = search.match(reg);
        var str = par ? decodeURIComponent(par[2]) : '';
        return str;
    }
}
