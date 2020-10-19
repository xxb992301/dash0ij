$(function(){
      // 1.1 获取裁剪区域的 DOM 元素
      var $image = $('#image')
      // 1.2 配置选项
      const options = {
      // 纵横比
      aspectRatio: 1,
      // 指定预览区域
      preview: '.img-preview'
}

     // 1.3 创建裁剪区域
     $image.cropper(options)

    //  为上传按钮模拟点击事件
    $('#btnChooseImage').on('click',function(){
        $('#file').click();
    });
    
    // 为 文件选择框添加 onchange事件
    $('#file').on('change',function(e){
        var list=e.target.files;
        console.log(list);
        if(list.length==0){
            return layui.layer.msg('请选择要上传的图片')
        }

        // 如果选中了新的图片 则设置给 图片剪裁区
        // a.获取选中的文件图片
        var file = e.target.files[0];
        // b. 为文件图片 创建虚拟路径
        var newImgURL = URL.createObjectURL(file);
        console.log(newImgURL);
        // c.设置 剪裁区
        $image
           .cropper('destroy')      // 销毁旧的裁剪区域
           .attr('src', newImgURL)  // 重新设置图片路径
           .cropper(options)        // 重新初始化裁剪区域
    })
    // 确定按钮 绑定点击事件
    $('#btnUpload').on('click',function(){
        var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
       
      $.ajax({
          method:'post',
          url:'/my/update/avatar',
          data:{avatar:dataURL},
          success(res){
            //   一旦收到服务器数据后 就立即显示提示信息
            layui.layer.msg(res.message)
            // 如果上传成功 则调用父页面的方法重新加载用户信息区域
              if(res.status===0){
                  window.parent.getUserInfo();
              }
          }
      })
    });

   
})
