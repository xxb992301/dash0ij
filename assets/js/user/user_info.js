
$(function(){
    // a.添加layui的自定义效验规则
    layui.form.verify({
        nickname:function(inputValue){
            if(inputValue.length>6){
                return '昵称必须在1~6个字符之间'
            }
        }
    });
    // b.发送异步请求 获取用户基本信息
    getUserInfo();
    // c.重置
    $('#btnReset').on('click',function(){
        // 重新 请求用户信息 并填充到表单中
        getUserInfo();
    })
    // d.提交修改功能
    $('#btnSubmit').on('click',function(){
        modifyUserInfo();
    })
})
// 2.获取用户基本信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status!==0)return alert('获取信息失败');
            layui.form.val('formUserInfo',res.data);
        }
    });
}
// 3.提交修改的用户信息
function modifyUserInfo(){
    // a.获取表单的数据
    var dataStr=$('#formModify').serialize();
    // b.异步提交到服务器 修改数据框 接口
    $.ajax({
        url:'',
        method:'post',
        data:dataStr,
        success:function(res){
            if(res.status===0){
                layui.layer.msg(res.message);
                window.parent.getUserInfo();
            }
        }
    })
}