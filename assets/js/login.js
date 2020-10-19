
// 声明全局变量
var $btnLogin,$btnReg;//登录页面的 两个超链接

$(function(){
    $btnLogin=$('.login-box');
    $btnReg= $('.reg-box');
    // 1.dom树准备完毕后 为 去登录 超链接添加 添加点击事件
    $('#link_reg').on('click',function(){
        // 隐藏登录框
        $btnLogin.hide();
        // 显示登录框
        $btnReg.show();
    })
    // 2.dom树准备完毕后 为 去注册 超链接添加 添加点击事件
    $('#link_login').on('click',function(){
        // 显示登录框
        $btnLogin.show();
        // 隐藏登录框
        $btnReg.hide();
    });

    // 为登录和注册添加新的验证规则
    layui.form.verify({
        pwd:[/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 重复密码验证
        repwd:function(val){
            // 1.获取 密码内容
            var pwdStr=$('.reg-box [name=password]').val();
            // 2.对比 密码内容和 val内容是否一样
            if(pwdStr!==val){
                return '两次密码不正确'
            }
        }
    });

    // 事件操作
    // 1.注册表单提交事件
    $('#formReg').on('submit',function(e){
        // a.取消表单的默认提交行为
        e.preventDefault();
        // b.获取注册信息
        let data={
            username:$('.reg-box [name=username]').val().trim(),
            password:$('.reg-box [name=password]').val().trim(),
        }
        // c.发送注册信息 接口
        $.post('http://ajax.frontend.itheima.net/api/reguser',data,function(res){
            // console.log(res);
            if(res.status!==0){
                layui.layer.msg(res.message)
            }else{
                layui.layer.msg(res.message);
                // 模拟点击 去登录 按钮
                // 进而触发 点击事件 切换显示窗口
                $('#link_login').click();
                // 清空注册表单内容
                $('#formReg')[0].reset();
                // 将用户名和密码设置给登录窗口的输入框
                $('.login-box [name=username]').val(data.username);
                $('.login-box [name=password]').val(data.password)
            }
        })
    })

    // 2.登陆表单的提交事件
    $('#formLogin').on('submit',function(e){
        // a.获取用户名密码数据
        e.preventDefault();
        // b。提交到 登录接口
        var strData=$(this).serialize();
        $.ajax({
            url:'http://ajax.frontend.itheima.net/api/login',
            method:'post',
            data:strData,
            success: function (res) {
                // c.直接显示 登陆结果 并执行回调函数
                layui.layer.msg(res.message,function () {
                    // d.判断 是否成功 就跳转
                    if(res.status===0){
                      localStorage.setItem('token',res.token)
                      //localStorage.removeItem('token');
                        location.href='/index.html';
                    }
                })
            }
        })
    })
})

$(function(){
  console.log(1);
    // 点击去注册账号链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录的链接
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从 layui 中获取 form 对象
  var form = layui.form
  var layer = layui.layer
  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: function(value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function(e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function(res) {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录！')
      // 模拟人的点击行为
      $('#link_login').click()
    })
  })


  // 监听登录表单的提交事件
  $('#form_login').submit(function(e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
})

  // // 监听登录表单的提交事件
  // $('#form_login').submit(function(e) {
  //   // 阻止默认提交行为
  //   e.preventDefault()
  //   $.ajax({
  //     url: '/api/login',
  //     method: 'POST',
  //     // 快速获取表单中的数据
  //     data: $(this).serialize(),
  //     success: function(res) {
  //       if (res.status !== 0) {
  //         return layer.msg('登录失败！')
  //       }
  //       layer.msg('登录成功！')
  //       // 将登录成功得到的 token 字符串，保存到 localStorage 中
  //       localStorage.setItem('token', res.token)
  //       // 跳转到后台主页
  //       // location.href = '/index.html'
  //     }
  //   })
  // })



