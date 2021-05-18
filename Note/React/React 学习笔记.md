# React 学习笔记

## 简介

[React 中文官网](https://zh-hans.reactjs.org/)

### CLI 创建 React 项目

```shell
$ npx create-react-app my-app # my-app 可替换为自己的项目名称
$ cd my-app
$ npm start
```

### 单HTML文件引入 React 相关依赖

#### 引入核心库 react.js

```html
<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
```

#### 引入DOM操作库 react-dom.js

```html
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
```

#### 引入解析JSX语法库 babel.min.js

```html
<script crossorigin src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

#### 开始编写JSX

```html
<script type="text/babel">  // 此处一定要写 babel
    const VDOM = <h1>Hello World</h1>   // JSX内容
    ReactDOM.render(VDOM, document.querySelector('#root')) // 在选定容器中渲染
</script>
```

### 虚拟DOM的创建方式

#### JS创建虚拟DOM

```
React.createElement(标签名, 标签属性, 标签内容)
```

#### JSX创建虚拟DOM

```js
const VDOM = <h1>Hello World</h1>   // JSX内容
    ReactDOM.render(VDOM, document.querySelector('#root')) // 在选定容器中渲染
```

### 关于虚拟DOM

1. 虚拟DOM 本质是Object类型对象
2. 虚拟DOM 相对真实DOM 更加轻量
3. 虚拟DOM 最终会渲染为真实DOM

### JSX 语法

1. 定义虚拟DOM 时不要用**引号**包裹
2. 混入JS表达式时使用`{}`包裹
   ![image-20210515202658597](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210515202658597.png)
3. 样式类名指定用`className`属性
4. 内联样式使用`style={{key:value,..}}`写法，属性需要赋值对象
5. 只能有一个根标签
6. 标签必须闭合
7. 标签首字母：
   1. 若小写字母开头，同步转为HTML同名元素，无对应标签报错；
   2. 若大写字母开头，同步渲染为同名组件，无对应组件报错；

## React 面向组件编程

### 基础

#### 函数式组件

> 适用于简单组件的定义

```js
// 1. 创建函数式组件
function MyComponent() {
    console.log(this) // 此处 this 指向为 undefined
    return <h1>hello world(使用函数式组件编写简单组件)</h1>
  }
// 2. 渲染组件到页面上
ReactDOM.render(<MyComponent/>, document.querySelector('#test'))
```

执行原理：
![image-20210515202723385](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210515202723385.png)

#### 类式组件

```js
class MyComponent extends React.Component {
      render() {    // render 方法放置于 MyComponent 原型对象
        console.log(this) // this 为 MyComponent 组件实例对象
        return <h1>定义MyComponent类组件（适用于【复杂组件】）</h1>
      }
    }
    ReactDOM.render(<MyComponent/>, document.querySelector('#test'))
```

**注意**：

1. 类式组件定义时必须继承自`React.Component`
2. 必须有`render`实例方法，且`render`方法有返回值

**原理**：
![image-20210515202739972](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210515202739972.png)

## 组件实例的三大属性

### state

定义组件状态:
\1. 必须定义构造方法
\2. `state`是一个对象
代码块：

```js
constructor(props) {  
    super(props)  
    this.state = {   
        isHot: true 
}}
```

#### 事件绑定

1. 解决类方法中事件指向问题
   1. 在构造方法中进行修改
   2. 使用`bind`方法重新绑定`this`被调用的函数变量
   3. 另外可使用箭头函数，在事件绑定至元素时使用
2. 事件已由 React 封装为 `onClick, onBlur, onFocus` 等属性形式，编写时应加以注意。
3. 在组件类中使用赋值语句+箭头函数的方式，编写实例方法
   ![image-20210515202818640](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210515202818640.png)

#### setState

直接更改state数据，将不会触发页面进行更新，此时需要借助setState方法进行更改和更新。且更新是替换，将不会影响到state其他属性的状态

### props

通过组件对象的props属性获取父组件传递给子组件的数据，可综合扩展运算符传值和对象。

#### 限制props数据

引入prop-types模块：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.7.2/prop-types.min.js" crossorigin="anonymous"></script>
```

再通过类组件（函数组件也是同理）中定义`propTypes`属性为对象实例`PropTypes`。

```js
// 组件接受父组件参数的规则，后缀isRequired表示必须从父组件传参
MyComponent.propTypes = {
      name: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      gender: PropTypes.string
    }
// 父组件传参时子组件默认值
MyComponent.defaultProps = {
      age: 18,
      gender: 'male'
    }
```

**注意：**限制参数传递函数时，类型名用`func`。