# JavaScript 高级编程（二）

## BOM

> 一套操作浏览器的API。

### 常见对象

1. `window`: 代表整个浏览器窗口

   **注意**: window是BOM中的一个对象, 并且是一个顶级的对象(全局)

2. `Navigator`: 代表当前浏览器的信息, 通过Navigator我们就能判断用户当前是什么浏览器

3. `Location`:  代表浏览器地址栏的信息, 通过Location我们就能设置或者获取当前地址信息

4. History:   代表浏览器的历史信息, 通过History来实现刷新/上一步/下一步

   **注意点**: 出于隐私考虑, 我们并不能拿到用户所有的历史记录, 只能拿到当前的历史记录

5. `Screen`:   代表用户的屏幕信息

### **`Navigator`**

#### Navigator.userAgent

判断是什么浏览器(Chrome, FireFox)。

### `Location`

代表地址栏信息。

#### window.Location.href

获取、设置当前标签页的地址。

#### `window.Location.reload(boolean)`

重新加载页面，传入参数为`true`的话会强制更新缓存。

### `History`

#### `window.History.forward()`

浏览器页面前进方法（打开过的前进的页面）。

#### `window.History.back()`

浏览器页面回退方法（打开过的回退的页面）。

#### **`window.History.go(num)`**

`num`代表前进几个页面，可以为负数，比`forward()`方法更前好；num为0时，刷新页面。

## 函数防抖

函数防抖时优化高频率执行js代码的一种手段，可以让被调用的函数在一次连续的高频操作中只被调用一次。

具体作用：**减少代码执行次数**，**优化网页性能**。

具体封装：

```javascript
function debounce(fn, delay) { // fn = test
    let timerId = null;
  // 返回防抖函数
    return function () {
        let self = this;
        let args = arguments;
        timerId && clearTimeout(timerId);
        timerId = setTimeout(function () {
            fn.apply(self, args);
        }, delay || 1000);
    }
}
```

## 函数节流

函数节流也是优化高频率执行js代码的手段，与函数防抖只执行一次不同的是，函数节流可能会执行多次（3～4次）。

具体作用：**减少代码执行次数**，**优化网页性能**。

具体封装：

```javascript
function throttle(fn, delay) {
    let timerId = null;
    let flag = true;
    return function () {
        if(!flag) return;
        flag = false;
        let self = this;
        let args = arguments;
        timerId && clearTimeout(timerId);
        timerId = setTimeout(function () {
            flag = true;
            fn.apply(self, args);
        }, delay || 1000);
    }
}
```

# JavaScrip 新特性
## SessionStorage和LocalStorage
和Cookie一样, SessionStorage和LocalStorage也是用于存储网页中的数据的

### Cookie、 SessionStorage、LocalStorage区别


    无论通过以上那种方式存储的数据, 切记不能将敏感数据直接存储到本地

|          | Cookie                                                       | SessionStorage                                               | LocalStorage                           |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------- |
| 容量     | 大小(4KB左右)和个数(20~50)限制                               | 大小限制(5M左右)                                             | 大小限制(5M左右)                       |
| 网络请求 | 每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题 | 仅在浏览器中保存，不参与和服务器的通信                       | 仅在浏览器中保存，不参与和服务器的通信 |
| 应用场景 | 判断用户是否登录                                             | 表单数据                                                     | ·购物车                                |
| 生命周期 | 关闭浏览器后失效, 也可以设置过期时间                         | 仅在当前会话(窗口)下有效，关闭窗口或浏览器后被清除, 不能设置过期时间 | 除非被清除，否则永久保存               |

**无论通过以上那种方式存储的数据, 切记不能将敏感数据直接存储到本地**

## 同源策略?
​    同源策略（Same origin policy）是一种约定，它是浏览器最核心也最基本的安全功能
​    所谓同源是指: 协议，域名，端口都相同,就是同源, 否则就是跨域(`CORS`)



1. 协议+一级域名+二级域名+端口号都相同, 所以同源
   http://www.it666.com:80/index.html
   http://www.it666.com:80/detail.html

2. 协议不同, 所以不同源, 是跨域
   http://www.it666.com:80/index.html
   https://www.it666.com:80/index.html

3. 一级域名不同, 所以不同源, 是跨域
   http://www.it666.com:80/index.html
   http://www.itzb.com:80/index.html

4. 二级域名不同, 所以不同源, 是跨域
   http://www.it666.com:80/index.html
   http://edu.it666.com:80/index.html

5. 端口号不同, 所以不同源, 是跨域
   http://www.it666.com:80/index.html
   http://www.it666.com:8090/index.html

### 同源策略带来的影响
在同源策略下, 浏览器只允许Ajax请求同源的数据, 不允许请求不同源的数据
但在企业开发中, 一般情况下为了提升网页的性能, 网页和数据都是单独存储在不同服务器上的
这时如果再通过Ajax请求数据就会拿不到跨域数据

### 跨域解决方案 jsonp

`JSONP`让网页从别的地址（跨域的地址）那获取资料，即跨域读取数据

#### JSONP实现跨域访问的原理

1. 在同一界面中可以定义多个script标签
2. 同一个界面中多个script标签中的数据可以相互访问
3. 可以通过script的src属性导入其它资源
4. 通过src属性导入其它资源的本质就是将资源拷贝到script标签中
5. script的src属性不仅能导入本地资源, 还能导入远程资源
6. 由于script的src属性没有同源限制, 所以可以通过script的src属性来请求跨域数据

#### 优化一

在企业开发中通过JSONP来获取跨域的数据,一般情况下服务器返回的都不会是一个变量, 而是一个函数的调用。
#### 优化二
通过URL参数的方式来动态指定函数名称
#### 优化三
由于script标签默认是同步, 前面的script标签没有加载完数据, 后面的script标签就不会被执行
所以请求数据的script标签必须放到后面。
通过JS动态创建script标签, 因为JS动态创建的script标签默认就是异步的,
不用等到前面的标签加载完就可以执行后面的script标签


```javascript
let oScript = document.createElement("script");
oScript.src = "http://127.0.0.1:80/jQuery/Ajax/20-jsonp.php?cb=test";
document.body.appendChild(oScript);

function test(data) {
    console.log(data);
}
```


​    

```javascript
// 当前网页的地址: http://127.0.0.1:63342/jQuery/Ajax/22-jQuery%E4%B8%ADjsonp%E4%BD%BF%E7%94%A8.html
// 当前资源的地址: http://127.0.0.1:80/jQuery/Ajax/22-jsonp.php

$.ajax({
    url: "http://127.0.0.1:80/jQuery/Ajax/22-jsonp.php",
    data:{
        "teacher": "lnj",
        "age": 34
    },
    dataType: "jsonp", // 告诉jQuery需要请求跨域的数据
    jsonp: "cb",  // 告诉jQuery服务器在获取回调函数名称的时候需要用什么key来获取
    jsonpCallback: "lnj", // 告诉jQuery服务器在获取回调函数名称的时候回调函数的名称是什么
    success: function (msg) {
        console.log(msg);
    }
});
```

## JS的同步和异步    

1. JS是单线程
   JS中的代码都是串行的, 前面没有执行完毕后面不能执行

2. 同步代码和异步代码
   除了"事件绑定的函数"和"回调函数"以外的都是同步代码
   1. 程序运行会从上至下依次执行所有的同步代码
   2. 在执行的过程中如果遇到异步代码会将异步代码放到事件循环中
   3. 当所有同步代码都执行完毕后, JS会不断检测 事件循环中的异步代码是否满足条件
   4. 一旦满足条件就执行满足条件的异步代码
3. promise作用
       企业开发中为了保存异步代码的执行顺序, 那么就会出现回调函数层层嵌套
       如果回调函数嵌套的层数太多, 就会导致代码的阅读性, 可维护性大大降低
       promise对象可以将异步操作以同步流程来表示, **避免了回调函数层层嵌套(回调地狱)**

## Promise?
Promise是ES6中新增的一个对象,

1.  用同步的流程来表示异步的操作
2. 避免回调函数层层嵌套(回调地狱)问题

### Promise基本用法

1. 创建Promis对象

   ```javascript
   new Promise(function(resolve, reject){});
   ```

2. promise对象不是异步的, 只要创建promise对象就会立即执行存放的代码

3. Promise同步的流程来表示异步
   promise对象是通过状态的改变来实现的, 只要状态发生改变就会自动触发对应的函数

4. **Promise对象三种状态**
   1. `pending`:   默认状态，只要没有告诉`promise`任务是成功还是失败就是`pending`状态
   2. `fulfilled`(resolved): 只要调用`resolve`函数, 状态就会变为`fulfilled`, 表示操作成功
   3. `rejected`:  只要调用`rejected`函数, 状态就会变为`rejected`, 表示操作失败
      **注意点: 状态一旦改变既不可逆**

5. 监听Promise状态改变
   我们还可以通过函数来监听状态的变化
   `resolved --> then()`
   `rejected --> catch() `

### then

1. `then`方法接收两个参数,
   第一个参数是状态切换为成功时的回调,
   第二个参数是状态切换为失败时的回调

```javascript
let promise = new Promise(function (resolve, reject) {
  // resolve(); // 将状态修改为成功
  reject(); // 将状态修改为失败
});
promise.then(function () {
  console.log("成功");
}, function () {
  console.log("失败");
});
```



2. 在修改promise状态时, 可以传递参数给then方法中的回到函数

   ```javascript
   // resolve = success, reject = error;
   let promise = new Promise(function (resolve, reject) {
     // resolve("111"); // 将状态修改为成功 success("111");
     reject("aaa"); // 将状态修改为失败  error("aaa");
   });
   =
   function success(data) {
     console.log(data);
   }
   function error(data) {
     console.log(data);
   }
   promise.then(success, error);
   ```

3. 同一个promise对象可以多次调用then方法,
   当该promise对象的状态时所有then方法都会被执行

   ```javascript
   let promise = new Promise(function (resolve, reject) {
     // resolve(); // 将状态修改为成功
     reject(); // 将状态修改为失败
   });
   promise.then(function () {
     console.log("成功1");
   }, function () {
     console.log("失败1");
   });
   promise.then(function () {
     console.log("成功2");
   }, function () {
     console.log("失败2");
   });
   ```

   

4. 每次执行完毕后会返回一个新的promise对象

   ```javascript
   let promise = new Promise(function (resolve, reject) {
       resolve(); // 将状态修改为成功
       // reject(); // 将状态修改为失败
   });
   let p2 = promise.then(function () {
       console.log("成功1");
   }, function () {
       console.log("失败1");
   });
   console.log(p2);
   console.log(promise === p2); // false
   ```

   

5. 上一个promise对象的`then`方法给下一个promise对象的`then`方法传递参数
   **注意点: 无论是在上一个promise对象成功的回调还是失败的回调传递的参数,**
   **都会传递给下一个promise对象成功的回调**

   ```javascript
   let promise = new Promise(function (resolve, reject) {
       // resolve("111"); // 将状态修改为成功
       reject("aaa"); // 将状态修改为失败
   });
   let p2 = promise.then(function (data) {
       console.log("成功1", data);
       return "222";		// return 就能传给下一个promise
   }, function (data) {
       console.log("失败1", data);
       return "bbb";		// 失败的回调不会传，只会传成功的
   });
   p2.then(function (data) {
       console.log("成功2", data);
   }, function (data) {
       console.log("失败2", data);
   });
   ```

6. 如果then方法返回的是一个Promise对象, 那么会将返回的Promise对象的
   执行结果中的值传递给下一个then方法

   ```javascript
   let promise = new Promise(function (resolve, reject) {
     resolve("111"); // 将状态修改为成功
     // reject("aaa"); // 将状态修改为失败
   });
   let ppp = new Promise(function (resolve, reject) {
     // resolve("222"); // 将状态修改为成功
     reject("bbb"); // 将状态修改为失败
   });
   let p2 = promise.then(function (data) {
     console.log("成功1", data);
     return ppp;			// 传递 promise 对象
   }, function (data) {
     console.log("失败1", data);
     return "bbb";
   });
   p2.then(function (data) {
     console.log("成功2", data);
   }, function (data) {
     console.log("失败2", data);
   ```

   

## catch 方法

1. catch方法

    `catch 其实是 then(undefined, () => {}) 的语法糖`。

   ```javascript
   let promise = new Promise(function (resolve, reject) {
   	// resolve(); // 将状态修改为成功
   	reject(); // 将状态修改为失败
   });
   promise.catch(function () {
   	console.log("abc");
   });
   ```

2. 分开监听

   **注意点: 如果需要分开监听, 也就是通过then监听成功通过catch监听失败；那么必须使用链式编程, 否则会报错**

   ```javascript
   let promise = new Promise(function (resolve, reject) {
       // resolve(); // 将状态修改为成功
       reject(); // 将状态修改为失败
   });
   // promise.then(function () {
   //     console.log("成功");
   // }).catch(function () {
   //     console.log("失败");
   // });
   // 分开监听会出错
   promise.then(function () {
       console.log("成功");
   });	// 返回新的 Promise 对象会继承原来的状态
   // 新的Promise 没有监听到，状态出错会报错
   promise.catch(function () {
       console.log("失败");
   });
   
   ```

3. **不使用链式编程的注意点**
   1. 如果promise的状态是失败, 但是没有对应失败的监听就会报错
   2. then方法会返回一个新的promise, 新的promise会继承原有promise的状态
   3. 如果新的promise状态是失败, 但是没有对应失败的监听也会报错
4. catch方法可以捕获上一个`Promise`对象`then`中的异常。
5. 其他特点同`then`

### `Promise all()静态`方法

1. all方法接收一个数组
2. 如果数组中有多个Promise对象,只有都成功才会执行then方法,并且会按照添加的顺序, 将所有成功的结果重新打包到一个数组中返回给我们
3. 如果数组中不是Promise对象, 那么会直接执行then方法

### Promise `race()`静态方法

1. `race`方法接收一个数组,
2. 如果数组中有多个`Promise`对象, 谁先返回状态就听谁的, 后返回的会忽略
3. 如果数组中不是`Promise`对象, 那么会直接执行then方法

### JS中的异常处理

​    简单粗暴就是有错误出现
​    由于JS是单线程的, 编写的代码都是串行的,
​    所以一旦前面代码出现错误,程序就会被中断, 后续代码就不会被执行

1. 自身编写代码问题, --> 手动修复BUG
2.  外界原因问题, --> `try{}catch{}`
   对于一些可预见的异常, 我们可以使用`try{}catch{}`来处理,

3. JS中如何进行异常处理

   ```javascript
   // 利用try{}catch{}来处理异常可以保证程序不被中断, 也可以记录错误原因以便于后续优化迭代更新
   try {
       // 可能遇到的意外的代码
   }
   catch(e) {
       // 捕获错误的代码块
   }
   ```



## fetch

1. 什么是`fetch`?
   fetch是ES6中新增的, 基于`Promise`的网络请求方法

2. `fetch`基本使用

   `fetch(url, {options}).then(...).catch(...);`

options: 中可用`body`属性传递字符串化的`post`对象



 ## axios
​    axios 是一个基于 `promise` 的 HTTP 库网络请求插件

### axios特点

1. 可以用在浏览器和 node.js 中
2. 支持 Promise API
3. 自动转换 JSON 数据
4. 客户端支持防御 XSRF

### 执行 `GET` 请求

```javascript
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 可选地，上面的请求可以这样做
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### 执行 `POST` 请求

```javascript
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

#### 全局 axios 默认值

```javascript
axios.defaults.timeout = 2000		// 设置 2000ms 接收服务器数据的限定时间，若 2000ms 内无法获取到数据，将报错
axios.defaults.baseURL = 'http://127.0.0.1'		// 设置项目根地址，便于项目上线时修改
```

## Symbol

`ES6`，用来表示生成独一无二的值

通过Symbol生成独一无二的值时可以设置一个标记， 这个标记仅仅用于区分, 没有其它任何含义。

```javascript
let name = Symbol("name");		// 生成一个标记为 name 的Symbol值
```

### 特点

1. 类型转换不能转换成数值

2. 不能进行运算

3. 前面不加`new`，将其视为基本数据类型

4. `Symbol`生成的值，一定要保存下来才能使用

5. `for`循环无法遍历出`Symbol`属性和方法

   可使用Object静态方法取出`Symbol`属性和方法，以数组形式返回

   ```javascript
   Object.getOwnPropertySymbols(obj)		
   ```

## Iterator

**迭代器**，提供`for..of`机制的标准接口。

### 以下数据类型都实现的Iterator接口

  **`Array/Map/Set/String/TypedArray/函数的 arguments 对象/NodeList 对象`**

### 特点

1. 只要一个数据已经实现了`Iterator`接口, 那么这个数据就有一个叫做`[Symbol.iterator]`的属性
2. `[Symbol.iterator]`的属性会返回一个函数
3. `[Symbol.iterator]`返回的函数执行之后会返回一个对象
4. `[Symbol.iterator]`函数返回的对象中又一个名称叫做next的方法
5.  `next方法`每次执行都会返回一个对象`{value: 1, done: false}`
6. 这个对象中存储了当前取出的数据和是否取完了的标记

```javascript
// 实现数组类型
class myArray {
    constructor () {
        for (let i = 0; i < arguments.length; i++) {
            this[i] = arguments[i]
        }
        this.length = arguments.length
    }

    [Symbol.iterator] () {
        let self = this
        let index = 0
        return {
            next () {
                if (index < self.length) {
                    return {
                        value: self[index++],
                        done: false
                    }
                } else {
                    return {
                        value: self[index],
                        done: true
                    }
                }
            }
        }
    }
}

let arr = new myArray(1, 3, 5)
for (let item of arr) {
    console.log(item)
}	// output: 1   3   5
// let it = arr[Symbol.iterator]()
// console.log(it.next())		// {value: 1, done: false}
// console.log(it.next())		// {value: 3, done: false}
// console.log(it.next())		// {value: 5, done: false}
// console.log(it.next())		// {value: undefined, done: true}

```

### 应用

1. 解构赋值

   实现了`Iterator`接口的数据才能进行解构赋值

   ```javascript
   let arr = new myArray(1, 3)
    let [x, y, z] = arr
    console.log(x, y, z)		// 1 3 undefined
   ```

2. 扩展运算符

   实现了`Iterator`接口的数据才能进行扩展运算

   ```javascript
   let arr = new myArray(1, 3)
   let brr = new myArray(2, 4)
   console.log([...arr, ...brr])       // [1, 3, 2, 4]
   ```

## Generator

### Generator函数

​    `Generator` 函数是 ES6 提供的一种异步编程解决方案
​    `Generator` 函数内部可以封装多个状态, 因此又可以理解为是一个状态机

### 定义Generator函数

**只需要在普通函数的function后面加上`*`即可**

```javascript
function* gen() {
	// statements
}
```

### Generator函数和普通函数区别
3.1调用Generator函数后, 无论函数有没有返回值, 都会返回一个迭代器对象,
3.2调用Generator函数后, 函数中封装的代码不会立即被执行

|  普通函数调用后  | Generator函数调用后 |
| :--------------: | :-----------------: |
| 返回定义的返回值 | 一定返回迭代器对象  |
|     立即执行     |    不会立即执行     |

### yield

只能用于`Generator`函数中

1. `Generator`函数内部使用yield关键字定义状态

2. `yield`关键字可以让 `Generator`内部的逻辑能够切割成多个部分。

3. 通过调用迭代器对象的`next`方法执行一个部分代码,

4.  执行哪个部分就会返回哪个部分定义的状态

5. 在调用`next`方法的时候可以传递一个参数, 这个参数会传递给上一个yield

   ```javascript
   function * gen () {
       console.log('yield 1')
       let data = yield '1'
       console.log(data)
       yield '2'
       console.log('yield 3')
       yield '3'
   }
   
   let i = gen()
   i.next()	// 1
   i.next('parm')	// yield
   i.next()	// 3
   i.next()	//
   ```

### 应用场景

1. 应用场景, 让函数返回多个值

2. 利用 `Generator` 函数，可以在任意对象上快速部署 `Iterator` 接口

   ```javascript
   let obj = {
       name: 'lnj',
       age: 34,
       gender: 'man',
       [Symbol.iterator]: function * () {
       let keys = Object.keys(this)
       for (let key of keys) {
           yield obj[key]
       }
   }
   }
   // 可使用 for...of 
   for (let prop of obj) {
       console.log(prop)
   }
   ```

3. 用同步的流程来表示异步的操作

## async && await

### async函数
​    `async`函数是ES8中新增的一个函数, 用于定义一个异步函数
​    `async`函数函数中的代码会自动从上至下的执行代码

### await操作符
`await`操作符只能在异步函数 `async function `中使用
`await`表达式会暂停当前` async function `的执行，等待 `Promise `处理完成。
若 `Promise `正常处理(`fulfilled`)，其回调的`resolve`函数参数作为 `await` 表达式的值，然后继续执行 `async function`。