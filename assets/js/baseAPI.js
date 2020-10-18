// 1.为 jq 的异步请求 新增一个回调函数
$.ajaxPrefilter(function(opt){
    // 1.基地址改造：opt.
    opt.url='http://ajax.frontend.itheima.net'+opt.url;

    // 2.自动将 localstorage中的 token读取
    // 2.1判断 当前 url中是否包含了/my 如果包含了 则发送token
    if(opt.url.indexOf('/my/')>-1){
        opt.headers={
            Authorization:localStorage.getItem('token')
    }
    
    }
    // 3.统一处理 服务器返回的 未登录 错误
    opt.complete=function(res){
        if(res.responseJSON.status===1 && res.responseJSON.message==='认证失败！'){
            
            // a. 提示用户没有权限
            alert('对不起,你的登陆已失效,请重新登录！')
            
            // b.删除 localStorage 中可能存在的伪造的 token
            localStorage.removeItem('token');
            // c. 跳转到登陆页面
            location.href='/login.html';
        }
    }
})