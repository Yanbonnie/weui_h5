<template>
    <section class="sweet stepOne">
        <header>
            <ul class="clf" :class="'nav'+navList.length">
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
        <!-- 第一部分 -->
        <div class="verification" v-if="validateState">
            <div class="verBox">
                <!-- <span class="close" @click="stepPhone = 1 ; stepButton='下一步'; buttonState = true; ResetCodeTime = 0 ; sendCodeState = true" v-show="stepPhone == 2"></span> -->
                <div class="phone" v-if="stepPhone == 1">
                    <img src="../../assets/images/phone.png" alt="">
                </div>
                <div class="phone" v-if="stepPhone == 2 ">
                    <img src="../../assets/images/email.png" alt="">
                </div>
                <div class="operation" v-show="stepPhone == 1">
                    <p>用户未绑定，请先输入手机号</p>
                    <p><input type="number" v-model="user.phone" name="" ></p>
                    <p class="yzm">
                        <input type="number" v-model="user.code" name="">
                        <span :class="[ResetCodeTime != 0 ? 'gray' : '']" @click="getCode">{{ResetCodeTime == 0 ? '获取验证码' : '重新获取('+ResetCodeTime+'s)'}}</span>
                    </p>
                </div>
               <!--  <div class="operation" v-show="stepPhone == 2">
                    <p>请输入验证码，或<span class="time" v-show="ResetCodeTime > 0">{{ResetCodeTime+'后'}}</span><a class="getCode" @click="getCode" href="javascript:;" :class="[ResetCodeTime == 0 ? 'blue' : '']">重新获取</a></p>
                    <p class="yzm" id="yzm">
                        <span></span><span></span><span></span><span></span>
                        <input type="number" name="" maxlength="4" v-model="user.code">
                    </p>
                </div> -->
                <div class="operation" v-show="stepPhone == 2">
                    <p>请输入常用邮箱</p>
                    <p><input type="text" v-model="user.email" name="" ></p>
                </div>
                <div class="business" v-show="stepPhone == 3">
                    <p class="gray">您正申请的业务为</p>
                    <p class="business_txt">{{businessName}}</p>
                    <p class="tip">我们已经为你准备了办理本次业务所需的文件，请根据需要下载这些文件，打印填写相关信息后，上传扫描件或拍照给我们。</p>
                    <div class="email ">
                        <p class="gray">您绑定的邮箱为</p>
                        <p>{{user.email}}</p>
                        <p class="clf"><a href="javascript:;" :class="[ResetCodeTime == 0 ? '' : 'gray']" @click="sendEmail">{{ResetCodeTime == 0 ? '发送到该邮箱' : '重新发送('+ResetCodeTime+'s)'}}</a><span>{{sendTip}}</span></p>
                    </div>
                    <div class="email">
                        <p class="gray">为确保我们的服务质量，请先阅读并同意以下文件</p>
                        <p class="clf"><a href="javascript:;" @click="agreementState = true">阅读用户协议</a></p>
                    </div>
                </div>
                <div class="bottom" @click="stepOneSubmit" :class="[buttonState ? '' : 'gray'] ">
                    {{stepButton}}
                </div>
            </div>
        </div>
        <div class="agreement" v-show="agreementState">
            <div class="agreementBox box">
                <div class="agreementScroll sign_page_scroll">
                    <h3>GDCA数字证书用户协议书</h3>
                    <p>数安时代科技股份有限公司（以下简称“甲方”或“GDCA”）作为依法设立并获得《电子认证许可证》的第三方信任机构，依法向社会用户（以下简称“乙方”）颁发数字证书,用于电子商务活动及电子政务公众服务。协议标的：本协议中的“证书”指包含了证书持有者的企业身份信息，公钥及证书颁发机构（GDCA）的签名，并且保证在互联网传输过程中的完整性和安全性。为进一步明确双方权利与义务，按照《中华人民共和国电子签名法》及《电子认证服务管理办法》的有关规定，甲乙双方就数字证书的申请和使用达成以下协议:</p>
                    <p>一、 协议内容：1、乙方向甲方购买数字证书,用于电子商务活动及电子政务公众服务；2、产品价格、支付时间以证书申请表为准。</p>
                    <p>二、甲方的权利与义务</p>
                    <p>（一）甲方权利：1、有权要求乙方提供真实、完整、准确的材料和信息。2、有权要求乙方按时交纳服务费用。3、有权要求乙方在规定的时间以及范围内遵守约定，使用数字证书。4、有权要求乙方对所知的甲方的商业秘密进行保密。</p>
                    <p>（二）甲方义务：1、在网上交易和网上作业中，交易双方使用证书时可通过GDCA验证对方证书的有效性。如果由于甲方的原因导致身份认证错误，造成用户或他人损失时，甲方承担赔偿责任，赔偿方法参照《数安时代科技股份有限公司电子认证业务规则》（该业务规则报信息产业部备案，并在甲方的官方网站http://www.gdca.com.cn上公布。2、甲方保证乙方使用和发放的公钥算法在现有的技术条件下在数字证书的有效期内不会被破解。如果发生被破解的情况，经甲方或权威机构确认后，甲方对用户承担赔偿责任，赔偿方法参照《数安时代科技股份有限公司电子认证业务规则》。</p>
                    <p>三、乙方的权利与义务</p>
                    <p>（一）乙方权利：1、有权要求甲方提供有效的数字证书。2、有权要求甲方使用和发放的证书在有效期内不会被破解。3有权在因甲方原因导致数字证书认证错误，给乙方造成损失时要求甲方给予赔偿。</p>
                    <p>（二）乙方义务：1、提供真实、完整、准确的材料和信息，不得提供虚假、无效的材料和信息；2、妥善保管甲方所签发的数字证书和密码信封，不得泄漏或交付他人；3、在使用自己的密钥或数字证书时，应当使用可依赖、安全的系统；4、知悉数字证书已经失密或者可能已经失密时，应当及时告知甲方及相关各方，并终止使用该数字证书；5、必须在证书有效期内使用该证书；不得使用已失密或可能失密、已过期、被中止、被撤销或被注销的数字证书；6、根据规定按时向甲方及业务受理点交纳服务费用。</p>
                    <p>四、有下列情形之一的，应当免除甲方的责任：</p>
                    <p>1、乙方在申请和使用甲方的数字证书时，有违反本协议书第三条所列义务之一的；</p>
                    <p>2、乙方故意、过失导致数字证书密钥泄密或被盗用、冒用、伪造或者篡改的；</p>
                    <p>3、由于意外事件或不可抗力而导致数字证书签发错误、延迟、中断、无法签发，或暂停、终止全部或部分证书服务的。本项所规定之“不可抗力”，是指不能预见、不能避免并不能克服的客观情况。包括但不限于：（1）自然现象或者自然灾害，包括地震、火山爆发、滑坡、泥石流、雪崩、洪水、海啸、台风等自然现象；（2）社会现象、社会异常事件或者政府行为，包括政府颁发新的政策、法律和行政法规，或战争、罢工、骚乱等社会异常事件；（3）关联单位如电力、电信、通讯部门服务中断；</p>
                    <p>4、甲方签发的数字证书只能用于在网络（Internet/Intranet/Extranet）上标识用户身份、确保电子数据的保密性、完整性和不可抵赖性。乙方将数字证书用于其他用途引起的一切法律后果，甲方不承担责任；</p>
                    <p>5、甲方有权要求乙方及时更换数字证书，乙方在收到技术更新通知时，应在规定的期限内到甲方机构更新数字证书，若逾期用户没有按时更新数字证书所导致的后果，甲方不承担任何责任；</p>
                    <p>6、甲方已谨慎地遵循了国家法律、法规规定的数字证书认证业务规则，而仍有损失产生的。</p>
                    <p>五、有下列情形之一的，甲方有权主动废除所签发的数字证书，并且不承担任何责任：</p>
                    <p>1、新密钥对替代旧的密钥对；</p>
                    <p>2、与数字证书中的公钥相对应的私钥被泄密；</p>
                    <p>3、数字证书中的相关信息有所变更；</p>
                    <p>4、由于数字证书不再需要用于原来的用途而要求终止；</p>
                    <p>5、用户未按时缴纳数字证书更新费用的；</p>
                    <p>6、用户不能履行相关法律、法规和协议所规定的责任和义务；</p>
                    <p>7、用户申请初始注册时，提供不真实材料；</p>
                    <p>8、数字证书已被盗用、冒用、伪造或者篡改；</p>
                    <p>9、其他因相关法律、法规或政策的要求采取的临时作废数字证书措施的。</p>
                    <p>六、违约责任：若甲乙任意一方违反了本协议的约定，需要向对方承担相应的违约责任。</p>
                    <p>七、数字证书的注销。乙方不希望继续使用数字证书时或者因自然人死亡、单位解散等原因导致用户主体不存在时，法定责任人应当携带相关证明文件及原数字证书，向甲方请求注销用户数字证书。甲方在接到业务受理点的注销申请后，在24小时内正式注销用户的数字证书。乙方应当承担其数字证书在注销前产生的一切责任。</p>
                    <p>八、数字证书的更新。乙方数字证书的默认有效期为二年，以交纳服务费用的期限计算实际有效期，超过有效期，数字证书将会自动失效。乙方需要继续使用的须在证书失效期前30天内向甲方或业务受理点提出数字证书更新请求。甲方不承担因用户不及时更新数字证书而造成数字证书失效所带来的任何责任。</p>
                    <p>九、协议书的变更本协议书如有修订而涉及用户及业务受理点的权利、义务时，甲方须在官方网站上公布或者按照用户在申请证书时提供的联系方式进行通知。乙方如果因此而需要撤销或变更证书的，应当在甲方公布修订的相关信息之日起十五日之内，向甲方提出申请。逾期没有提出，则视为同意并遵照新修订的协议书所确定的权利和义务。</p>
                    <p>十、本协议书不适用于甲方签发的测试证书。乙方使用测试证书所导致的后果，甲方不承担任何责任。</p>
                    <p>十一、因本协议产生的争议，双方协商解决，解决不了的由甲方所在地人民法院进行管辖。</p>
                    <p>十二、本协议自双方在数字证书申请表上签字或盖章之日起生效。</p>
                    <p>十三、本协议一式二份，甲乙双方各执一份，具有同等法律效力。</p>
                </div>
                <div class="bottom"><a href="javascript:;" @click="agreementState = false">确定</a></div>
            </div>
        </div>
        <!-- 第二部分 -->
        <form id="formBox">     
            <!-- <div class="textfield">
                <p >                    
                    <input type="text" placeholder="请输入常用邮箱" 
                    >
                </p>
            </div>  -->      
            <div  v-for="(item,index) in sourceList" 
            :class="[filterClass(item.xtype),item.xtype != 'htmlfield' ? 'mainBox' : '',(item.fieldSet && item.fieldset != '' && !item.value) ? 'disNone' : '',item.fieldSet ? 'fieldSetLabel' : '']" 
            :id="item.id" 
            :fieldSet="item.fieldSet"
            :key="index"
            >   
                
                <!-- label -->
                <p v-if="item.xtype == 'label' && item.tipText == ''" :style="item.style" >{{item.text}}</p>

                <!-- label -->
                <p  v-if="item.xtype == 'label' && item.tipText"  >
                    {{item.text}}
                    <span @click="lookImg(item)">{{item.tipText}}</span>
                </p>                

                <!-- textfield -->
                <p class="tipTxt" v-if="item.xtype == 'textfield' && item.value">{{item.emptyText+'：'}}</p>
                <p v-if="item.xtype == 'textfield'" :style="item.style">                    
                    <input type="text" 
                    :name="item.name" 
                    :value="item.value" 
                    :readonly="item.readOnly" 
                    :allowBlank="item.allowBlank"
                    :blankText="item.blankText"
                    :regex="item.regex"  
                    :regexText="item.regexText"
                    :placeholder="item.emptyText"
                    :class="[(item.fieldSet && item.fieldset != '') ? '' : 'subInput']"
                    >
                </p>
                <!-- combo -->
                <div 
                    v-if="item.xtype == 'combo'" 
                    class="p" 
                    @click="comboShow('combo'+item.id)" 
                    :style="item.style">  

                    <span>{{item.text}}</span>
                    <span class="right"><b>{{item.valueTxt ? item.valueTxt : '请选择'}}</b><i class="right_icon"></i></span>
                    <input type="text" hidden  
                        :name="item.name" 
                        :value="item.value" 
                        :allowBlank="item.allowBlank" 
                        :blankText="item.blankText" 
                        :readonly="item.readOnly"
                        :class="[(item.fieldSet && item.fieldset != '') ? '' : 'subInput']"
                        >

                    <!--下拉框-->
                    <div class="addressCover" :id="'combo'+item.id" v-if="item.options.length > 0" style="display: none">
                        <div class="title">{{item.emptyText}}
                            <img @click.stop="closeCombo('combo'+item.id)" src="../../assets/images/close.png" alt="">
                        </div> 
                        <div  class="address">
                            <div class="address-header">
                                <ul>
                                    <li class="active">请选择</li> 
                                </ul>
                            </div> 
                            <div class="address-container">
                                <ul>
                                    <li @click.stop="selectCombo(item2,'combo'+item.id)" v-for="(item2,index2) in item.options" :key="index2">{{item2.text}}</li>   
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- imgupload -->
                <div class="upLoad box"  :class="[item.valueTxt ? 'exitValue' : '']"
                    v-if="item.xtype == 'imgupload'" 
                    :id="'upLoad'+item.id"                     
                    :style="item.style">
                    <input type="file" hidden  :id="'file'+item.id" accept="image/*"> <!--accept="image/*" -->
                    <input type="text" hidden  
                        :name="item.name" 
                        :value="item.value" 
                        :allowBlank="item.allowBlank" 
                        :blankText="item.blankText" 
                        :readonly="item.readOnly" 
                        :id="'input'+item.id"
                        :class="[(item.fieldSet && item.fieldset != '') ? '' : 'subInput']"
                        >
                    <div class="sideLeft">
                        <img src="../../assets/images/upload.png" class="upLoadImg step1" alt="">                    
                        <span class="step2"></span>
                        <img v-if="item.value" :src="apiPath+item.src+'?width=80'" class="certImg step3" alt="" @click.stop="showUploadImg(item)">
                        <img v-else src="" class="certImg step3" alt="" @click="showUploadImg2($event)">
                    </div>
                    <div class="sideCenter" @click="uploadImgChange('file'+item.id,'upLoad'+item.id,'input'+item.id)" >
                        <div class="step1">
                            <h3>点击上传<i class="right_icon"></i></h3>
                            <h4>{{item.text}}</h4>
                        </div>
                        <div class="step2">
                            <h2>正在上传</h2>
                        </div>
                        <div  class="step3">
                            <h2>已上传<span>|</span><b>重新上传<i class="right_icon"></i></b></h2>
                            <h4>{{item.text}}</h4>
                            <!-- <h2>已上传&nbsp;&nbsp;<span>|</span><b>重新上传<i class="right_icon"></i></b></h2> -->
                        </div>
                    </div>
                    <div class="sideRight" v-show="item.tipText">
                        <a @click="lookImg(item)"><span>|</span>{{item.tipText}}<i class="right_icon"></i></a>
                    </div>
                </div>

                <!-- fieldset -->
                <div 
                    v-if="item.xtype == 'fieldset'" class="p" 
                    @click="comboShow('combo'+item.id)" 
                    :style="item.style">       

                    <span>请选择{{item.text}}</span>
                    <span class="right"><b>{{item.valueTxt ? item.valueTxt : '请选择'}}</b><i class="right_icon"></i></span>
                    <input type="text" hidden  
                        :name="item.name" 
                        :value="item.value" 
                        :readonly="item.readOnly" 
                        :allowBlank="item.allowBlank"
                        :blankText="item.blankText" 
                        :class="[(item.fieldSet && item.fieldset != '') ? '' : 'subInput']"
                        >
                    <!--下拉框-->
                    <div class="addressCover" :id="'combo'+item.id" v-if="item.options.length > 0" style="display: none">
                        <div class="title">{{item.emptyText}}
                            <img @click.stop="closeCombo('combo'+item.id)" src="../../assets/images/close.png" alt="">
                        </div> 
                        <div  class="address">
                            <div class="address-header">
                                <ul>
                                    <li class="active">请选择</li> 
                                </ul>
                            </div> 
                            <div class="address-container">
                                <ul>
                                    <li @click.stop="selectFieldset(item2,'combo'+item.id)" v-for="(item2,index2) in item.options" :key="index2">{{item2.text}}</li>   
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- menu -->
                <!--选择地址-->
                <div @click="selectAddress('address'+item.id,'input'+item.id)" v-if="item.xtype == 'menu'" class="p">
                    <span>{{item.text}}</span>
                    <span class="right"><b>{{item.value ? item.value : '选择地区'}}</b><i class="right_icon"></i></span>
                    <input type="text" hidden 
                        :name="item.name" 
                        :blankText="item.blankText" 
                        :allowBlank="item.allowBlank"
                        :value="item.value"
                        :readonly="item.readOnly"
                        :id="'input'+item.id"
                        :class="[(item.fieldSet && item.fieldset != '') ? '' : 'subInput']"
                        >
                    <div class="addressCover disNone" :id="'address'+item.id" style="display:none">
                        <div class="title">请选择地址<img src="../../assets/images/close.png" alt="" @click.stop="closeAddress"></i></div>
                        <v-distpicker hide-area type="mobile" @selected="onSelected"></v-distpicker>
                    </div>
                </div> 
                
                <!-- htmlfield -->
                <div class="htmlFiledBox " v-if="item.xtype == 'htmlfield'" :style="item.style">
                    <div class="sign_page_scroll scrollBox" v-html="item.html" :style="item.style"></div>
                </div>
                <!-- button -->
                <a href="javascript:;" v-if="item.xtype == 'button'" class="active" :class="[item.type == 'action' ? 'gray' : '']" :style="item.style"  @click="submitHandle(item)">{{item.text}}</a>                
            </div>
            <input type="hidden" name="businessId" v-model="businessId">
            <input type="hidden" name="thirdPartyId" v-model="thirdPartyId">
        </form>
        
        <!-- 查看示例弹框 -->
        <section class="imgCover" id="imgCoverBox" style="display:none" @click="closeImgCover">
            <div class="imgBox">
                <img  src="" alt="">
            </div>
        </section>
        <!-- 加载中弹框 -->
        <Loading v-show="loadState" :context="loadContext"></Loading>
    </section>
</template>
<script>
    import Vue from 'vue';
    import '@/assets/js/plugin/jquery.form.js';
    import VDistpicker from 'v-distpicker';
    export default{
        name:'sweet',
        data(){
            return{
                /****第一部分****/
                stepPhone:1,            //流程之前的步骤  1-验证手机输入手机号码  2-邮箱  3-用户协议
                stepButton:'下一步',    //按钮文字
                buttonState:true,       //按钮是否可点击   false不可点击，true可点击
                sendCodeState:true,     //发送验证码状态
                ResetCodeTime:0,        //验证码倒计时
                agreementState:false,   //用户协议状态
                validateState:false,    //验证页面显示隐藏
                businessName:'',        //业务名称
                sendTip:'',             //邮件是否发送成功提示
                /****第二部分****/
                navList:[],        //导航数据
                step:null,         //导航到第几步
                imgState:false,    //查看示例弹框 
                imgHrefLink:null,      //查看示例图片链接
                loadState:false, 
                loadContext:'加载中...',
                sourceList:[],     //资料准备数据  
                upLoadCurrent:null,         //当前上传图片id
                addressCurrent:null,        //当前选择地址id
                addressCurrentInput:null,   //当前选择地址input
                code:'',
                businessId:'',
                // thirdPartyId:"oj-_306EIXOTZI9qqRqirmYmCWlE",  //满劲的
                // thirdPartyId:'oj-_301Rf5Et9kQNnImRhQMrjpFk',  //自己的
                thirdPartyId:'',  
                thirdParty:1,
                user:{
                    phone:'',
                    email:'',
                    code:'',
                }
            }
        },
        components:{
            'v-distpicker':VDistpicker
        },
        methods:{ 
            /************************************************第一部分****************************************************/
            //业务办理
            applyCert(){
                this.httpGet(this.URL['applyCert'],{
                    businessId:this.businessId,
                    thirdPartyId:this.thirdPartyId
                },(json)=>{
                    //成功回调                    
                    if (json.code == 200) {   //成功
                        [this.validateState] = [false];
                        this.queryPresentFlowcfg();
                        this.getInventoryElementView();
                    }else{                        
                        this.modelCommonTip(json.alertMsg)
                        this.sourceList = [{
                            xtype:"label",
                            text:json.alertMsg,
                            tipText:'',
                            style:'text-align:center;font-size:18px;'
                        }]
                    }
                })
            },
            //申请验证
            applyVerify(){   
                this.httpGet(this.URL['applyVerify'],{
                    "thirdPartyId":this.thirdPartyId 
                },(json)=>{
                    // alert('到达申请验证')
                    // json.data.code = 0;
                    if(json.code == 200){
                        if(json.data.code == 0){  //需验证
                            this.validateState = true;
                            this.stepPhone = 1;
                        }else if(json.data.code == 1){  //无需验证   
                            console.log(json.data.email)
                            this.user.email = json.data.email;                         
                            this.checkApply();          //判断用户有无同意阅读
                        }else if(json.data.code == 2){  //验证邮箱
                            [this.validateState,this.stepPhone,this.stepButton,this.buttonState] = [true,2,'绑定邮箱',true];
                        }else{

                        }
                    }
                })
            },
            //验证提交
            stepOneSubmit(){
                switch(this.stepPhone){
                    // case 1:                        
                    //     this.getCode();            //获取二维码
                    //     break;
                    case 1:
                        this.verifyCodeSubmit();   //提交验证码
                        break;
                    case 2:
                        this.bindingEmail();       //绑定邮箱
                        break;
                    case 3:                        
                        this.applyCert();          //已阅读协议并同意创建业务表单
                        break;
                    default:
                            break;
                }
            },
            //发送邮件
            sendEmail(){
                if(!this.sendCodeState) return;
                this.loadState = true;
                this.loadContext = '发送中...';
                this.httpGet(this.URL['sendEmail'],{
                    "businessId":this.businessId,
                    "thirdPartyId":this.thirdPartyId 
                },(json)=>{
                    if(json.code == 200){
                        this.loadState = false;
                        this.loadContext = '加载中...';
                        /*倒计时*/
                        this.sendCodeState = false;
                        this.ResetCodeTime = 60;
                        this.resetCode();
                        if(json.data.code == -1){
                            this.sendTip = '发送失败';
                        }else if(json.data.code == 1){
                            this.sendTip = '发送成功';
                        }else{

                        }
                    }else{
                        this.modelCommonTip(json.data.msg);
                    }
                })
            },
            getFocus(){   //获取验证码焦点
                let This = this;
                // $('#yzm').find('input').focus().bind('input porpertychange',function(){
                $('#yzm').find('input').bind('input porpertychange',function(){
                    if($(this).val().length >= 4){
                        $(this).blur();
                        This.buttonState = true;
                        This.stepButton = '下一步';
                        // This.verifyCodeSubmit();   
                    }
                });
            },  
            //获取验证码
            getVerifyCode(){ 
                this.httpGet(this.URL['getVerifyCode'],{
                    tel:this.user.phone,
                    thirdPartyId:this.thirdPartyId
                },(json)=>{
                    if(json.code == 200){
                        if(json.data.code == 1){
                            // this.stepPhone = 2;
                            // this.buttonState = false;
                            // setTimeout(()=>{
                            //     this.getFocus();
                            // },600);
                            this.sendCodeState = false;
                            this.ResetCodeTime = 60;
                            this.resetCode();   
                        }else if(json.data.code == 2){   //经办人已验证
                            this.modelCommonTip('此手机号码已验证');                        
                        }else{
                           this.modelCommonTip('操作太频繁,'+json.data.msg); 
                        }
                    }
                })
            },  
            //验证码提交
            verifyCodeSubmit(){
                if(this.validateQb.isEmpty(this.user.code)){
                    this.modelCommonTip('请输入验证码');
                    return;
                }
                if(this.validateQb.isEmpty(this.user.phone)){
                    this.modelCommonTip('请输入手机号码');
                    return false;
                }
                if(!this.validateQb.isPhone(this.user.phone)){
                    this.modelCommonTip('手机号码格式不正确');
                    return false;
                }  
                this.stepButton = '...';
                this.httpGet(this.URL['verifyCodeSubmit'],{
                    tel:this.user.phone,
                    code:this.user.code,
                    thirdPartyId:this.thirdPartyId,
                    thirdParty:this.thirdParty,
                },(json)=>{
                    if(json.code == 200){
                        if(json.data.code == 1){  //成功
                            this.stepPhone = 2;
                            this.ResetCodeTime = 0;
                            this.stepButton = '绑定邮箱';
                            this.buttonState = true;
                        }else if(json.data.code == 2){  //经办人已验证
                            this.modelCommonTip('此手机号码已验证');
                            [this.stepButton,this.buttonState,this.ResetCodeTime,this.user.code]=['下一步',false,0,''];
                        }else if(json.data.code == -1){
                            [this.user.code,this.buttonState,this.stepButton] = ['',true,'下一步'];
                            this.modelCommonTip(json.data.msg);
                        }else{
                            // [this.user.code,this.buttonState,this.stepButton] = ['',true,'下一步'];
                            [this.buttonState,this.stepButton] = [true,'下一步'];
                            this.modelCommonTip('验证码有误');
                        }
                    }
                })
            }, 
            //绑定邮箱  
            bindingEmail(){
                if(this.validateQb.isEmpty(this.user.email)){
                    this.modelCommonTip('邮箱不能为空');
                    return false;
                }
                if(!this.validateQb.isEmail(this.user.email)){
                    this.modelCommonTip('邮箱格式不正确');
                    return false;
                }
                this.httpGet(this.URL['bindingEmail'],{
                    email:this.user.email,
                    thirdPartyId:this.thirdPartyId
                },(json)=>{
                    if(json.code == 200){
                        let code = json.data.code;
                        if(code == 0){   //请验证手机信息
                            this.stepPhone = 1;
                            [this.user.phone,this.user.code,this.user.email] = ['','',''];
                        }else if(code == 1 || code == 2){   //绑定成功
                            [this.stepPhone,this.buttonState,this.stepButton] = [3,true,'我已阅读，并同意继续操作'];
                            this.checkApply();                            
                        }else{
                            this.modelCommonTip(json.data.msg);
                        }
                    }
                })
            },
            getCode(){  //获取验证码
                if(this.validateQb.isEmpty(this.user.phone)){
                    this.modelCommonTip('请输入手机号码');
                    return false;
                }
                if(!this.validateQb.isPhone(this.user.phone)){
                    this.modelCommonTip('手机号码格式不正确');
                    return false;
                }    
                if(!this.sendCodeState) return false;  
                this.getVerifyCode();
            },
            resetCode(){ //验证码倒计时
                this.ResetCodeTime -- ;
                if(this.ResetCodeTime <= 0){
                    this.ResetCodeTime = 0;
                    this.sendCodeState = true;
                    this.sendTip = '';
                    // $(".sendCode").text("获取验证码");
                    // $(".sendCode").css({'cursor':'pointer','background':"#fff"});
                }else{
                    // $(".sendCode").text("重新发送("+this.ResetCodeTime+'s)');
                    // $(".sendCode").css({'cursor':'not-allowed','background':'#e6e7ed'});
                    setTimeout(()=>{
                        this.resetCode();
                    },1000)
                }                
            },
            //获取业务名称
            queryGoodsMessage(){
                this.httpGet(this.URL['queryGoodsMessage'],{
                    "businessId":this.businessId,
                    "thirdPartyId":this.thirdPartyId 
                },(json)=>{
                    if(json.code == 200){
                        this.businessName = json.data.goodsName;
                    }else if(json.code ==  499){
                        this.modelCommonTip('查询失败');
                    }
                })
            },
            //判断用户有无走过流程
            checkApply(){
                this.httpGet(this.URL['checkApply'],{
                    "businessId":this.businessId,
                    "thirdPartyId":this.thirdPartyId 
                },(json)=>{
                    if(json.code == 200){
                        if(json.data.code == 0){  //没有阅读，到阅读页面
                            this.queryGoodsMessage();   //获取业务名称
                            [this.validateState,this.stepPhone,this.buttonState,this.stepButton] = [true,3,true,'我已阅读，并同意继续操作'];                            
                        }
                        if(json.data.code == 1){  //已阅读，进入流程
                            this.queryPresentFlowcfg();
                            this.getInventoryElementView();
                        }
                    }
                })
            },
            /*********************************************************第二部分*********************************************************/
            //过滤样式
            filterClass(value){
                var statusTxt = '';
                switch(value){
                    case 'label':
                        statusTxt = "label";
                        break;
                    case 'button':
                        statusTxt = "button";
                        break;
                    case 'textfield':
                        statusTxt = "textfield";
                        break;
                    case 'combo':
                        statusTxt = "combo";
                        break;
                    case 'imgupload':
                        statusTxt = "imgupload";
                        break;
                    case 'fieldset':
                        statusTxt = 'fieldset';
                        break;
                    case 'menu':
                        statusTxt = 'menu';
                        break;
                    case 'htmlfield':
                        statusTxt = 'htmlfield';
                        break;
                    default:
                        break;
                         
                }
                return statusTxt;
            },
            submitHandle(item){                
                if(item.type == 'submit'){
                    let inputSelect = $('.subInput[type="text"]');
                    for(let i = 0; i < inputSelect.length ; i++){
                        let val = inputSelect.eq(i).val();
                        let allowBlank = inputSelect.eq(i).attr('allowBlank');
                        let blankText = inputSelect.eq(i).attr('blankText');
                        let regex = inputSelect.eq(i).attr('regex');
                        let regexText = inputSelect.eq(i).attr('regexText');
                        if(!allowBlank){  //不允许为空
                            if(this.isEmpty(val)){
                                this.modelCommonTip(blankText ? blankText+'!' : '此输入框不能为空');
                                return false;
                            }
                        }
                        if(regex){    //要验证正则
                            let reg = new RegExp(regex);
                            if(!reg.test(val)){  //不符合正则
                                this.modelCommonTip(regexText+'!');
                                return false;
                            }
                        }
                    }
                }
                $('#formBox').ajaxSubmit({  
                    url : this.apiPath+item.actionUrl,  
                    dataType: 'json', 
                    xhrFields: {
                        withCredentials: true
                    },
                    type:'get',
                    beforeSubmit:()=>{

                    },
                    success:(res)=>{
                        this.sourceList = [];
                        this.queryPresentFlowcfg();
                        this.getInventoryElementView();
                    },
                    error:(err)=>{
                        if(err.responseJSON.alertType){
                            this.modelCommonTip(err.responseJSON.alertMsg);
                        }
                        
                    },
                    timeout:30000
                });
            },
            closeImgCover(){
                $("#imgCoverBox").find('img').attr('src','');
                $('#imgCoverBox').hide();
            },
            //查看上传图片
            showUploadImg(item){
                // [this.imgState,this.imgHrefLink] = [true,this.apiPath+item.tipImg+'?width=500']

                $('#imgCoverBox').show();
                $("#imgCoverBox").find('img').attr('src',this.apiPath+item.tipImg+'?width=500')
            },
            showUploadImg2(event){
                let target = event.target;
                let imgHrefLink2 = $(target).attr('src');
                // this.imgState = true;
                this.imgHrefLink = imgHrefLink2+'?width=500';

                $('#imgCoverBox').show();
                $("#imgCoverBox").find('img').attr('src',this.imgHrefLink)
            },
            //选择地区
            selectAddress(id,inputId){
                let selectItem = $('#'+id);
                let selectInput = $('#'+inputId);
                selectItem.show();
                this.addressCurrent = selectItem;
                this.addressCurrentInput = selectInput;
            },
            //地址选择完毕
            onSelected(data){
                console.log(data)
                this.addressCurrent.hide();
                this.addressCurrent.siblings('.right').find('b').html(data.province.value+','+data.city.value);
                this.addressCurrentInput.val(data.province.value+','+data.city.value);
            },
            //关闭地址选择弹框
            closeAddress(){
                this.addressCurrent.hide();
            },
            //点击上传图片
            uploadImgChange(fileId,upLoadId,inputId){   
                let oMyFile = $("#"+fileId);     //file
                let upLoadObj = $('#'+upLoadId); //uploadBox
                let inputObj = $('#'+inputId); //inputBox
                oMyFile.val("");
                oMyFile.click();
                oMyFile.unbind().on('change',()=>{

                    let fileObj = oMyFile[0].files[0];
                    if(!fileObj){ 
                          return false; 
                    }
                    // if(!fileObj.type.indexOf('image')){
                    //     this.modelCommonTip("不支持该类型，请上传图片");
                    //     return false;
                    // }
                   /*if(oMyFile.files){  //判断ie是否支持此属性
                        let filesSize = fileObj.size/1024/1024;
                        if(filesSize > 2){
                            this.modelCommonTip("请上传小于2M的图片");
                            return false;
                        }
                    } */
                    this.uploadFile(fileObj,upLoadObj,inputObj)

                })
            },
            //上传文件
            uploadFile(fileObj,upLoadObj,inputObj){  
                let that = this;
                let formData = new FormData();     
                formData.append('file',fileObj);   
                this.upLoadCurrent =  upLoadObj;            
                $.ajax({
                    url: this.apiPath+this.URL['uploadImg'],
                    dataType: 'json',
                    type: 'post',
                    // headers: {'Content-Type': 'image/jpeg'},
                    processData: false,
                    contentType: false,
                    cache: false,
                    data: formData,
                    xhr: () => {
                      var xhr = $.ajaxSettings.xhr();
                      if(that.onprogress && xhr.upload) {
                        xhr.upload.addEventListener("progress" , that.onprogress, false);
                        xhr.upload.addEventListener("loadend" , ()=> { //上传完成
                            upLoadObj.find('.sideLeft').children('.step2').hide();
                            upLoadObj.find('.sideCenter').children('.step2').hide();                            
                            upLoadObj.find('.sideLeft').children('.step3').show();
                            upLoadObj.find('.sideCenter').children('.step3').show();
                            
                        }, false);
                       return xhr;
                      }
                  }
                }).done((json) => {
                    if(json.code == 200){
                        upLoadObj.find('.sideLeft').children('.step3').attr('src',this.apiPath+json.data.src);
                        inputObj.val(json.data.value);
                    }

                }).fail((err) => {
                    if(err.responseJSON.alertType){
                        this.modelCommonTip(err.responseJSON.alertMsg);
                    }
                });
            },
            //监听上传进度
            onprogress(evt) {
              var loaded = evt.loaded;     //已经上传大小情况 
              var tot = evt.total;      //附件总大小 
              var per = Math.floor(100*loaded/tot);  //已经上传的百分比 
              this.upLoadCurrent.find('.sideLeft').children('.step1').hide();
              this.upLoadCurrent.find('.sideLeft').children('.step3').hide();
              this.upLoadCurrent.find('.sideCenter').children('.step1').hide();
              this.upLoadCurrent.find('.sideCenter').children('.step3').hide();
              this.upLoadCurrent.find('.sideLeft').children('.step2').show().html(per +"%" );              
              this.upLoadCurrent.find('.sideCenter').children('.step2').show();
            },            
            //选择下拉框找对应试图
            selectFieldset(item,id){  
                let selectItem = $('#'+id);
                selectItem.hide();
                selectItem.siblings('input').val(item.value);
                selectItem.siblings('.right').find('b').text(item.text);
                // let 
                $('.disNone,.fieldSetLabel').hide();
                let selectObj = $('.fieldSetLabel');
                for(let i = 0 ; i < selectObj.length ; i++){
                    if(selectObj.eq(i).attr('fieldset') == item.id){
                        selectObj.eq(i).show();
                        selectObj.eq(i).find('input').addClass('subInput');
                    }else{
                        selectObj.eq(i).find('input').removeClass('subInput');
                    }
                }
            },
            //选择下拉框
            selectCombo(item,id){ 
                let selectItem = $('#'+id);
                selectItem.hide();
                selectItem.siblings('input').val(item.value);
                selectItem.siblings('.right').find('b').text(item.text);
            },
            //关闭下拉框
            closeCombo(id){
                let selectItem = $('#'+id);
                selectItem.hide();
            },
            //展开下拉框
            comboShow(id){
                $('#'+id).show();
            },
            //提交按钮
            isEmpty:function(str) {
                return str.replace(/(^\s*)|(\s*$)/g, "") ? false : true;
            },            
            lookImg(item){   //查看示例
                $('#imgCoverBox').show();
                $("#imgCoverBox").find('img').attr('src',this.apiPath+item.tipImg+'?width=500')
            }, 
            queryPresentFlowcfg(){    //2.1.4.清单流程配置查询
                this.httpGet(this.URL['queryPresentFlowcfg'],{
                    "businessId":this.businessId,
                    "thirdPartyId":this.thirdPartyId 
                },(json)=>{
                    if(json.code == 200){
                        this.navList = json.data.presentInventoryList;
                        this.step = json.data.presentInventorySeq;   //当前流程在第几步  
                        if(json.data.type == 'charge'){  //套餐选择
                            this.$router.push({
                                name:'Package',
                            })
                        }
                        if(json.data.type == 'order'){  //订单确认
                            this.$router.push({
                                name:'Package',
                            })
                        }
                        if(json.data.type == 'pay'){   //支付页面
                            this.$router.push({
                                name:'OrderDetail',
                            })
                        }
                        if(json.data.type == 'form'){  //申请页面
                            this.$router.push({
                                name:'Apply',
                            })
                        }                       
                    }else{
                        this.modelCommonTip(json.alertMsg)
                    }
                })
            },          
            getInventoryElementView(){   //2.1.10.获取清单流程配置资料准备元素
                this.loadState = true;
                this.httpGet(this.URL['getInventoryElementView'],{
                    "businessId":this.businessId,
                    "thirdPartyId":this.thirdPartyId 
                },(json)=>{
                    this.loadState = false;
                    if(json.code == 200){  //成功
                        this.sourceList = json.data;
                        for(let i = 0 ; i < this.sourceList.length ; i++){   
                            if(this.sourceList[i].xtype == 'fieldset' || this.sourceList[i].xtype == 'combo'){   //fieldset赋值
                                if(this.sourceList[i].value){  //存在值
                                    for(let j = 0 ; j < this.sourceList[i].options.length ; j++){
                                        if(this.sourceList[i].options[j].value == this.sourceList[i].value){
                                            this.sourceList[i].valueTxt = this.sourceList[i].options[j].text;
                                        }
                                    }
                                }
                            }
                            if(this.sourceList[i].xtype == 'imgupload'){
                                if(this.sourceList[i].value){ //存在值
                                    this.sourceList[i].valueTxt = true;
                                }
                            }
                            if(this.sourceList[i].xtype == 'htmlfield'){  //设置滚动调背景色
                                $(`<style>#${this.sourceList[i].id} .sign_page_scroll::-webkit-scrollbar-track{${this.sourceList[i].style}}</style>`).appendTo('head');
                            }
                        }
                    }else{
                        this.modelCommonTip(json.alertMsg)
                    }
                },(err)=>{
                    this.loadState = false;
                })
            },            
            getOpenId(){  //获取openid
                this.$http.get(this.wechatPath+this.URL['getOpenId'],
                {
                    params:{
                        code:this.code,
                        clientId:'WECHAT_REMOT_CLIENT'
                    },
                    headers: {'X-Requested-With':'XMLHttpRequest'}
                }).then((json)=>{
                    let result = json.data;
                    if(result.code == 200){
                        this.thirdPartyId = result.data.openId;
                        this.setSData('businessId',this.businessId);
                        this.setSData('thirdPartyId',this.thirdPartyId);
                        this.applyVerify();
                    }else{
                        this.alert("获取openid失败");
                    }                
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        mounted(){
            // let hrefLink  = 'http://testremoteauth.95105813.cn/wechat/?code=0816T0Zr16jWTn0owy0s1RpiZr16T0ZM&state=cdbab193-8cff-47ce-8685-9a2a2f382cdf#/apply'; 
            /*发版*/
            let hrefLink = window.location.href;
            this.businessId = this.getSData('businessId');
            this.thirdPartyId = this.getSData('thirdPartyId');            
            if(hrefLink.indexOf('code') > 0 ){              //线上
                if(this.businessId && this.thirdPartyId){   //存在业务id和openid
                    this.applyVerify();
                }else{
                    this.code = this.getUrlPara('code',hrefLink);
                    this.businessId = this.getUrlPara('state',hrefLink).split('#')[0];
                    this.getOpenId();
                }                   
            }else{                                         //本地

                this.businessId = 'b73c3d89-1d3a-40e9-9119-76345dbf6492';
                this.thirdPartyId = 'oj-_301Rf5Et9kQNnImRhQMrjpFk';
                this.setSData('businessId',this.businessId);
                this.setSData('thirdPartyId',this.thirdPartyId);
                this.applyVerify();
            }           

            document.title = '远程证书申请';
        }
    }
</script>
