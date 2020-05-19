<!--一级菜单-二级菜单-三级菜单-四级菜单-->
<template>
  <div class="container pl16 pr16 pb8 bg-gray">
    <h4 class="ml16 mr16 mb8 mt24">页面开发规范文档-开发前必读</h4>
    <h5 class="ml16 mr16 mb8">代码一定要写好备注！！！</h5>
    <ul class="ml16 mr16 mb8">
      <li>1、svn提交，要注意冲突问题的解决，并书写有意义的commit内容，代码写好注释</li>
      <li>2、背景小图片直接引用base64格式 https://www.css-js.com/tools/base64.html</li>
      <li>3、前后端联调，4xx错误可能是地址或者入参问题，先进行检查用postman测试，还是有问题，找对应的后台开发人员，互换请求地址和入参进行检查，5xx错误抛给后台</li>
      <li>4、“demo组件”路由地址：/demo/page</li>
      <li>5、删除、关闭等操作，要有提示弹窗，需让用户二次确认 <Button type="error" class="style-btn">删除</Button></li>
      <li>6、批量操作，未选择，点击按钮的时候，给一个提示 this.$Message.warning( "请先选择待。。。。数据" ); //数据内容自己填写<br>
        <p>自动消失</p>
        <Button type="primary" class="style-btn">提示</Button>
        <Button type="warning" class="style-btn">警告</Button>
        <Button type="error" class="style-btn" >错误</Button>
        <Button type="success" class="style-btn" >成功</Button>
        <p>不可自动消失</p>
        <Button type="primary" class="style-btn">提示</Button>
        <Button type="warning" class="style-btn">警告</Button>
        <Button type="error" class="style-btn">错误</Button>
        <Button type="success" class="style-btn">成功</Button>
      </li>
      <li>7、导出：this.GLOBAL.exportFile(resData.data.fileDownUrl); //resData.data.fileDownUrl 接口返回的导出地址</li>
      <li>9、
        js 命名规则<br>
        can 判断是否可执行某个动作<br>
        has 判断是否含有某个值<br>
        is 判断是否为某个值<br>
        get 获取某个值<br>
        set 设置某个值<br>
        load 加载某些数据<br>
      </li>
      <li>10、可点击项，鼠标移动上去，要是手的标识 cursor: pointer;</li>
      <li>11、保存、编辑按钮节流</li>
      <li>12、图片、文件都使用英文或者拼音，不要出现中文</li>
      <li>13、所有的下拉都写成公用接口，静态值前端写成模拟接口，具体用汉字orcode待定</li>
      <li>14、重置-清空搜索条件并请求接口</li>
      <li>
        15、表格设置高度,根据具体情况<br>
      </li>
      <li>
      </li>
      16、table表格单元格设置<br>
      align: 'center', 表格内容居中<br>
      width: 320,表格固定宽度
      minWidth: 320,表格最小宽度，满足表格响应式宽度
      resizable: true,表格拖拽设置，需要设定固定宽度
      tooltip: true 文本提示框
      <li>
        17、修改公用文件，要在群里通知所有前端开发人员
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container{
  height:100%;
  overflow-y: auto;
}
</style>
