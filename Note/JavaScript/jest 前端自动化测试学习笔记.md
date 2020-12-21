# jest 前端自动化测试学习笔记

## jest 解决的问题

- API简单
- 多项目运行
- 速度快
- IDE 整合友好

## jest 配置

### 环境配置

1. 在项目根目录使用`npm`初始化项目

   `npm init`

2. 使用`npm`安装`jest`包

   `npm install jest@24.8.0 /*版本号为24.8.0 的jest包*/`

3. 修改`package.json`文件中`test`命令为`jest`

   `test: "Error: no test specified" && exit 1" 替换为"test: jest"`

### WebStorm 配置 jest

依次点击`Preferences`=>`Languages & Frameworks`=>`JavaScript`**(务必点击侧边栏展开三角形按钮)**=>`Libraries`=>`DownLoad…`**（在界面右侧边栏）**=>在弹出的`Download Library`中查找`jest`包=>单击选中高亮后点击`DOWNLOAD AND INSTALL`安装。

最后安装`jest`成功后的界面：

![image-20201105195014814](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20201105195014814.png)



## jest 基础

### 简单测试

```javascript
// 文件: hello-world.js
function hello(greets) {
    return greets == 1 ? "hello" : "hello, hi~";
}

module.exports = {
    hello,
}

// 测试文件: hello-wolrd.test.js
const hello = require("../hello-world")
test("打1次招呼", function () {
    expect(hello.hello(1)).toBe("hello");
});
test("打2次招呼", () => {
    expect(hello.hello(2)).toBe("hello, hi~");
});
```

终端输入`npm run test`运行项目测试。

### 匹配器（常用）

1. `toBe()`

   严格相等，输出值与预测值严格匹配，相当于`===`。

2. `toEqual()`

   不严格相等，相当于 `==`。

3. `toBeNull()`

   测试是否会等于`null`	。

4. `toBeUndefined()`

   测试是否为`undefined`。

5. `toBeDefined()`

   测试是否已经定义（有值即可通过测试）。

6. `toBeTruthy()`

   判断是否为真值。

7. `toBeFalsy()`

   判断是否为假值。

8. `toBeGraterThan()`

   判断测试数据是否大于预测值，相当于`>`。

9. `toBeLessThan()`

   相当于`<`。

10. `toBeGreaterThanOrEqual()`

    相当于`>=`。

11. `toBeCloseTo()`

    弥补JS浮点数不精确的缺陷

12. `toMatch()`

    字符串常用，测试数据能够匹配到预测值即通过。

13. `toContain()`

    测试数据包含预测数据就匹配成功。

14. `toThrow()`

    预测测试用例有异常。且抛出异常的字符串与预测值相等。

15. `not`

    **属性**，测试用例的取反，用法如下：

    <img src="https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20201106173505976.png" alt="image-20201106173505976" style="zoom:100%;" />

    注意：能不用`not`就不用，直接用匹配器最好。



### 异步测试代码

`expect.assertions(1) `，必须执行一次测试。



![image-20201106180650065](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20201106180650065.png)

上面的异步业务代码片段`export`为*ES6*写法。采用用`async`和`await`编写对应测试用例为：

![image-20201106180933741](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20201106180933741.png)



## 四个钩子函数

1. `beforeAll(fn())`

   在所有测试用例开始之前，先调用`fn()`。

2. `afterAll(fn())`

   在所有测试用例结束之后，再调用`fn()`。

3. `beforeEach(fn())`

   在每一个测试用例开始之前，先调用`fn()`。

4. `afterEach(fn())`

   在每一个测试用例结束之后，再调用`fn()`。



## 杂项和参考

[技术胖B站课程](https://www.bilibili.com/video/BV1yA411b7EV?from=search&seid=13821787470419077228)

[前端**技术胖** 博客](https://jspang.com)

**后续用上了再补齐异步测试和VUE框架内使用的内容**



