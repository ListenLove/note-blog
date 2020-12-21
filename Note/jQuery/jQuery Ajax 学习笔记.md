# jQuery Ajax 学习笔记



## AJAX

AJAX 是与服务器交换数据并更新部分网页的艺术，在不重新加载整个页面的情况下。

### 原生AJAX 五步

```javascript
// 1. 创建一个异步对象
let xmlhttp=new XMLHttpRequest();
// 2. 设置请求方式和请求地址
/*
//	open(method,url,async)
method：请求的类型；GET 或 POST
url：文件在服务器上的位置
async：true（异步）或 false（同步）
*/
xmlhttp.open("GET","test1.php",true);
// 3. 发送请求
/*
send(string)
string：仅用于 POST 请求
*/
xmlhttp.send();
// 4. 监听状态的变化
/*
**readyState**
0: 请求未初始化
1: 服务器连接已建立
2: 请求已接收
3: 请求处理中
4: 请求已完成，且响应已就绪
**status**
200: "OK"
404: 未找到页面
在 onreadystatechange 事件中，我们规定当服务器响应已做好被处理的准备时所执行的任务。

当 readyState 等于 4 且状态为 200 时，表示响应已就绪：
*/
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      console.log("接收服务器数据成功");å
    }
  }
// 5. 处理返回的结果
```



## AJAX GET



