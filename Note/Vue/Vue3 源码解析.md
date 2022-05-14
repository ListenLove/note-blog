# [Vue3 源码解析(vue3js.cn)](https://vue3js.cn/start/)

## Proxy

> 用于定义基本操作的自定义行为。`proxy`修改的是程序默认行为，就形同于在编程语言层面上做修改，属于元编程(`meta` `programming`)

译为代理，可以理解为在操作目标对象前架设一层代理，将所有本该我们手动编写的程序交由代理来处理，生活中也有许许多多的“proxy”, 如代购，中介，因为他们所有的行为都不会直接触达到目标对象。

```js
const proxy = new Proxy(target, hadler)
```

- Proxy类
- target 要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）
- handler 一个通常以函数作为属性的对象，用来定制拦截行为

```js
const origin = {}
const handler = {
  get: function (target, propKey, reciever) {
    return '10'
  }
}
const proxy = new Proxy(origin, handler)
console.log(proxy.a)  // 10
console.log(proxy.any) // 10
console.log(origin.a) // undefined
console.log(origin.any) // undefined
```

## Handler 对象常用的方法

| 方法                     | 描述                                                                          |
| ------------------------ | ----------------------------------------------------------------------------- |
| handler.has()            | in 操作符的捕捉器。                                                           |
| handler.get()            | 属性读取操作的捕捉器。                                                        |
| handler.set()            | 属性设置操作的捕捉器。                                                        |
| handler.deleteProperty() | delete 操作符的捕捉器。                                                       |
| handler.ownKeys()        | Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器。 |
| handler.apply()          | 函数调用操作的捕捉器。                                                        |
| handler.construct()      | new 操作符的捕捉器                                                            |

#### handler.get()

接受三个参数 `get(target, propKey, ?receiver)`

- target 目标对象
- propName 属性名
- receiver Proxy 实例本身

```js
const person = {
  likes: 'Vue Next'
}

const proxy = new Proxy(person, {
  get(target, propName, receiver) {
    if (propName in target) return target[propName]
    else throw new ReferenceError(`获取属性${propName}失败！`)
  }
})
console.log(proxy.likes)  // Vue Next
console.log(proxy.others) // ERROR!
```

**注意:**

- 如果要访问的目标属性是不可写以及不可配置的，则返回的值必须与该目标属性的值相同
- 如果要访问的目标属性没有配置访问方法，即get方法是undefined的，则返回值必须为undefined



```js
const person = {
  likes: 'Vue Next'
}

Object.defineProperty(person, 'test', {
  configurable: false,
  readOnly: true,
  writable: false,
  value: 10
})
const proxy = new Proxy(person, {
  get(target, p, receiver) {
    return 20
  }
})

/*
'get' on proxy: property 'test' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '10' but got
'20')
*/
console.log(proxy.test)
```

### 可撤销的Proxy

使用唯一静态方法：`Proxy.revocable(target, handler)`创建一个可撤销的代理对象

该方法的返回值是一个对象，其结构为： `{"proxy": proxy, "revoke": revoke}`

- proxy 表示新生成的代理对象本身，和用一般方式 new Proxy(target, handler) 创建的代理对象没什么不同，只是它可以被撤销掉。
- revoke 撤销方法，调用的时候不需要加任何参数，就可以撤销掉和它一起生成的那个代理对象。

```javascript
const origin = {
  likes: 'Vue3 Next'
}

const { proxy, revoke } = Proxy.revocable(origin, {})
console.log(proxy.likes)  // Vue3 Next
revoke()  // 撤销 Proxy
console.log(proxy.likes) // TypeError: Cannot perform 'get' on a proxy that has been revoked...

```

### 应用场景

- 校验器
- 私有属性





