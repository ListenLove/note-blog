# Webpack 基础

> 一套模块打包工具，代码维护和复用的利器。

## 入门使用

### 安装

```shell
npm init -y
npm install --save-dev webpack
npm install --save-dev webpack-cli
```

### 打包指令

```shell
npx webpack index.js # index.js就是需要打包的文件
```

### 存放路径

打包之后的文件会放到`dist`目录中, 名称为`main.js`。

## Webpack 配置文件

### mode

指定打包的模式, 模式有两种

一种是开发模式(development): 不会对打包的JS代码进行压缩
还有一种就是上线(生产)模式(production): 会对打包的JS代码进行压

### entry

 指定需要打包的文件。

### output

指定打包之后的文件输出的路径和输出的文件名称

####  filename 

指定打包之后的JS文件的名称

#### path

指定打包之后的文件存储到什么地方

#### devtool

选择一种 [source map](http://blog.teamtreehouse.com/introduction-source-maps) 格式来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度。

**企业开发配置:**
development: `cheap-module-eval-source-map`
只需要行错误信息, 并且包含第三方模块错误信息, 并且不会生成单独sourcemap文件

production: `cheap-module-source-map`
只需要行错误信息, 并且包含第三方模块错误信息, 并且会生成单独sourcemap文件

#### module

webpack处理webpack不能够识别的文件

将图片、css文件等打包。

#### watch

监听打包文件的变化，自动编译打包。

`watch: true`

```javascript
watch: true,
watchOptions: {
    aggregateTimeout: 300, // 防抖, 和函数防抖一样, 改变过程中不重新打包, 只有改变完成指定时间后才打包
    poll: 1000, // 每隔多少时间检查一次变动
    ignored: /node_modules/ // 排除一些巨大的文件夹, 不需要监控的文件夹
},
```

## Loader

### 特点

1. 单一原则
2. 按从右至左、从下至上的顺序进行

### file-loader

打包图像等多媒体资源

### url-loader

将图片转为`base64`的字符串。

### css-loader

和`style-loader`一起，帮助打包CSS文件。

### less-loader



## 模块化（ES6）

### 方式一

`export xxx;`
`import {xxx} from "path";`

#### 注意

接收导入变量名必须和导出变量名一致.
如果想修改接收变量名可以通过`import  { xxx as newName} from "path"`方式。
变量名被修改后原有变量名自动失效。

### 方式二

```javascript
export default xxx;
import xxx from "path";
```

#### 注意点

一个模块只能使用一次默认导出, 多次无效
默认导出时, 导入的名称可以和导出的名称不一致

方式一和方式二可以**混合使用**。

#### PostCSS

转换CSS的工具。

## 常用的插件

1. autofixer: 自动为CSS添加浏览器私有域
2. pxtorem: 自动将px转换为rem。
3. html-webpack-plugin: 指定模版`html`文件
4. clean-webpack-plugin：打包时清空原包文件夹，重新生成。
5. MiniCssExtractPlugin：将`css`文档提取为文件保存。
6. CssMinimizerWebpackPlugin：压缩CSS代码。
7. TerserWebpackPlugin：压缩JS代码。

### devServer

在`webpack.config.js`的配置文件中添加配置项。

```javascript
devServer: {
    contentBase: "./bundle",
    open: true,
    // 指定端口
    port: 5000,
    // 处理跨域问题
    /*
   proxy: {
       // 以下配置的含义:
       // 当我们在代码中发送请求到/user的时候, devServer就会自动将我们请求的地址替换为
       // http://127.0.0.1:3000/user
       "/user": {
           target: "http://127.0.0.1:3000",
           changeOrigin: true,     // 域名跨域
           secure: false,          // https跨域
       },
       "/login": {
           target: "http://127.0.0.1:3000",
           changeOrigin: true,     // 域名跨域
           secure: false,          // https跨域
       },
       */
    
  
    proxy: [{
        context: ["/user", "/login"],
        target: "http://127.0.0.1:3000",
        changeOrigin: true,     // 域名跨域
        secure: false,          // https跨域
        pathRewrite: {"": "/api"} // 路径重写, 将路径中的api替换为空
    }]
}
```

注意：devServer 只能解决开发时的跨域问题。产品上线后依然需要在服务端解决跨域问题。

### 热更新插件

内容改变时更新修改，但不会刷新页面。

内置插件，导入即可使用。

### babel

