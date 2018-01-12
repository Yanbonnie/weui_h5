const URL = {  
    // queryNavigationProcess:'app/flow/queryNavigationProcess',                                 //2.1.4.清单流程配置查询 
    queryPresentFlowcfg:'app/flow/queryPresentFlowcfg',                                       //nav配置
    getInventoryElementView:'app/element/getInventoryElementViewExample',                     //2.1.10.获取清单流程配置资料准备元素
    applyCert:'app/applys/applyCert',                                                         //业务办理
    applyVerify:'app/verify/applyVerify',                                                     //申请验证
    getVerifyCode:'app/verify/getVerifyCode',                                                 //获取验证码
    verifyCodeSubmit:'app/verify/verifyCodeSubmit',                                           //验证码提交
    bindingEmail:'app/verify/bindingEmail',                                                   //绑定邮箱
    queryGoodsMessage:'app/goods/queryGoodsMessage',                                          //获取业务名称
    checkApply:'app/applys/checkApply',                                                       //判断有误流程表单，如果为0的话，到阅读页面，如果为1的话，直接进入流程
    getOpenId:'wechat-service/weChat/openId/getOpenId',     //openId
    uploadImg:'file/upload/image',      //上传图片
    lastStep:'app/applys/lastStep',     //上一步
    sendEmail:'app/email/sendEmailAttachment',                                                 //发送邮件

    getChargeList:'app/charge/getChargeList',                                                  //获取套餐列表
    getInvHeadTypeEnum:'app/charge/getInvHeadTypeEnum',                                        //获取发票类型
    applyCharge:'app/charge/applyCharge',                                                      //提交套餐
    restoreCharge:'app/charge/restoreCharge',                                                  //获取套餐信息
    getChargeDetail:'app/charge/getChargeDetail',                                              //获取套餐详情
    confirmOrder:'app/order/confirmOrder',                                                     //确认订单
    getOrderDetail:'app/order/getOrderDetail',                                                 //获取订单详情
    paying:'app/pay/paying',                                                                   //支付接口
}
export default URL