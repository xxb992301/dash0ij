$(function(){
    // 1.为提交按钮 添加点击事件
    $('#btnSubmit').on('click',function(){
        changePwd();
    })
})
// 2.修改 用户的密码
function changePwd(){
    // a.通过 jq 获取 表单数据
    var strData=$('#formChangePwd').serialize();
    console.log(strData);
    // b.提交 到重置密码接口
    $.ajax({
        url:'/my/updatepwd',
        method:'post',
        data:strData,
        success:function(res){
            console.log(res);
            if(res.status!==0){
                layui.layer.msg(res.message);
            }else{
                // 如果修改成功 则要求重新输入密码
                // a.提示消息
                layui.layer.msg(res.message,function(){
                    localStorage.removeItem('token');
                    window.parent.location.href='/login.html';
                })
                // b.删除本地token
                // c.跳转到login
            }
        }
    })

}