# NodeJS 简明基础知识

## Node环境和浏览器环境区别

### 内置对象不同

- 浏览器环境中提供了window全局对象
- NodeJS环境中的全局对象不叫window, 叫**`global`**

### this默认指向不同

- 浏览器环境中全局**this默认指向window**
- NodeJS环境中全局**this默认指向空对象{}**

### API不同

- NodeJS环境中没有`DOM/BOM`相关API

## 常用NodeJS 全局对象和方法

1. `__dirname`: 当前文件所在文件夹的绝对路径
2. `filename`: 当前文件的绝对路径
3. `setInterval` / clea`rInterval : 和浏览器中window对象上的定时器一样
4. `setTimeout` /  `clearTimeout` : 和浏览器中window对象上的定时器一样
5. `console` :  和浏览器中window对象上的打印函数一样

## NodeJS模块化

### CommonJS 规范

- 在CommonJS规范中**一个文件就是一个模块**

  `moduleA.js`是一个模块

- 在CommonJS规范中每个文件中的变量函数都是**私有**的，对其他文件不可见的

  ```javascript
  // this is moduleA.js file.
  let name = "moduleA";
  function greetA() {
    console.log("hello~, this is moduleA");
  }
  ```

- 在CommonJS规范中每个文件中的变量函数必须通过**exports**导出之后其它文件才可以使用

  ```javascript
  // this is moduleA.js file.
  // ...
  
  // 将模块 moduleA.js 导出给外界。否则，对其他文件将不可见
  module.exports = {
    name: name,
    greetFromA: greetA,
  }
  ```

- 在CommonJS规范中想要使用其它文件导出的变量函数必须通过**require()**导入模块才可以使用

  ```javascript
  // this is main.js
  // 参数为路径字符串，倒入目标模块
  let aModule = require("moduleA");
  
  console.log(aModule.A);	//[Output] moduleA
  aModule.greetFromA(); // [Output] hello~, this is moduleA
  ```

  ### 导出数据的四种方式

  1. 通过exports.xxx = xxx导出

  2. 通过module.exports.xxx = xxx导出

  3. 通过将导出对象赋值给`module.exports`

     ```javascript
     module.exports = {
       xxx: method or varialble
     }
     ```

  4. 通过global.xxx = xxx导出

     **不符合CommonJS规范, 不推荐使用**

  **NOTE！**
  使用时都需要先导入(**require**)才能使用


### exports和module.exports

1. `exports`只能通过` exports.xxx`方式导出数据, 不能直接赋值；
2. `module.exports`既可以通过`module.exports.xxx`方式导出数据, 也可以直接赋值。

### require

1. 模块后缀名可不写，按照`.js`=>`.json`=>`.node`文件的查找顺序查找文件。
2. 导入后返回JS对象。
3. 必须按照路径规则书写。

## Node包管理器 NPM

### NPM包安装方式

#### 全局安装

```shell
npm install -g <package name> # 默认安装最新版本
npm install -g <package name>@version # 安装指定版本的包
npm uninstall -g <package name> # 卸载包
npm update -g <package name> # 更新包
```

#### 本地安装

 包描述文件 package.json, 定义了当前项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。  ` npm install` 命令根据这个配置文件，自动下载所需的模块，也就是配置项目所需的运行和开发环境
    **注意点**:package.json文件中, 不能加入任何注释。

- dependencies：生产环境包的依赖，一个关联数组，由包的名称和版本号组成
- devDependencies：开发环境包的依赖，一个关联数组，由包的名称和版本号组成

一般用于安装当前项目使用的包, 存储在当前项目node_modules中

```shell
npm install <package name> # 默认安装最新版本
npm uninstall <package name> # 卸载包
npm update <package name> # 更新包
```

#### package.json

```shell
npm init # 初始化 package.json 文件
npm install <package name> --save # 安装到生产环境 dependencies
npm install <package name> --save # 安装到开发环境 devDependencies
npm install # 所有的包都会被安装
npm install --production  # 只会安装dependencies中的包
npm install --development # 只会安装devDependencies中的包
```

## NRM和CNPM

nrm工具, 允许你将资源下载地址从国外切换到国内。

```shell
nrm ls # 查看可用的下载源
nrm use taobao # 使用淘宝下载源
```

## Node http 模块核心编程

### 简易 Web 服务器

```javascript
// 1.创建一个服务器实例对象
let server = http.createServer();
// 2.注册请求监听
server.on("request", function (req, res) {
    // end方法的作用: 结束本次请求并且返回数据
    // res.end("hello, world.");
    // writeHead方法的作用: 告诉浏览器返回的数据的类型的, 返回的数据需要用的字符集
    res.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8"
    });
    res.end("你好，世界");
});
// 3.指定监听的端口
server.listen(3000);
```

**以上简易 Web 服务器代码可使用链式编程进行简化**。

### 路由（路径分发）

通过请求监听方法中的request对象, 我们可以获取到当前请求的路径。
通过判断请求路径的地址就可以实现不同的请求路径返回不同的数据。

```javascript
// 服务器的响应函数中
if(req.url.startsWith("/index")){
        // 注意点: 如果通过end方法来返回数据, 那么只会返回一次
        // res.end("首页1");
        // res.end("首页2");
        // 注意点: 如果通过write方法来	返回数据, 那么可以写入多次
        // 				但是write方法不具备结束本次请求的功能, 所以还需要手动的调用end方法来结束本次请求
        res.write("首页1");
        res.write("首页2");
        res.end();
    }else if(req.url.startsWith("/login")){
        res.end("登录");
    }else{
        res.end("没有数据");
    }
```

### （GET请求）获取 url 查询参数

```javascript
// 引入 url 处理包
let url = require("url");
// 模拟一个来自网页的请求网址
let req = "http://www.it666.com:80/index.html?name=lnj&age=33#banner";
console.log(url.parse(req, true).query); // Output:  [Object: null prototype] { name: 'lnj', age: '33' }
// query属性中可获取到 客户端的查询参数

```

### （POST请求） 获取url查询参数

```javascript
server.on("request", function (req, res) {
    let params = "";    // post 请求必须分批获取
    req.on("data", function (chunk) {
        params += chunk;
    });
    req.on("end", function () { // 读取结束后处理请求
        console.log(params);
        let obj = querystring.parse(params); // 返回封装好post请求参数的对象
        console.log(obj);
    })
})
```

### 获取请求类型

`request`对象的`method`属性返回对应方法（“GET”、“POST”）的请求类型名。

## NodeJS高频问题

1. NodeJS环境下`this`为空对象。
2. 可以直接使用`exports`, `require`, `module`, `__filename`, `__dirname`。
3. NodeJS中为什么不能直接exports赋值。
4. 导入包时使用`const`接收。因为导入包不是修改包。

## NodeJS 任务队列

### NodeJS宏任务和微任务

宏任务: setTimeout, setInterval, setImmediate（IE独有）...
微任务: Promise, MutationObserver （浏览器环境）,process.nextTick（node独有) ...
**注意点**: 所有的宏任务和微任务都会放到自己的执行队列中, 也就是有一个宏任务队列和一个微任务队列
        所有放到队列中的任务都采用"先进先出原则", 也就是多个任务同时满足条件, 那么会先执行先放进去的

### timers

执行setTimeout() 和 setInterval()中到期的callback

### pending callbacks

执行系统操作的回调, 如:tcp, udp通信的错误callback

### idle, prepare

只在内部使用

### poll

执行与I/O相关的回调

### check

执行setImmediate的callback

### close callbacks

执行close事件的callback，例如socket.on("close",func)



