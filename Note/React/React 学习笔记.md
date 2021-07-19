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

props是单向数据流，不可进行直接更改。

#### 限制props数据

引入prop-types模块：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.7.2/prop-types.min.js" crossorigin="anonymous"></script>
```

再通过类组件（函数组件也是同理）中定义`propTypes`属性为对象实例`PropTypes`。

```react
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

#### 将props限制和默认porps与组件实例合并编写

利用`static`关键字，定义类的静态变量即可合并编写。

```react
class Person extends React.Component {
  static propTypes = {
        name: PropTypes.string.isRequired,
        age: PropTypes.number,
        gender: PropTypes.string,
      }
	static defaultProps = {
        age: 18,
        gender: 'male'
      }
}
```

**注意：函数式组件可传入prop参数，但不可传入state和refs。**

### refs

#### 字符串类型ref（不推荐）

组件内的标签通过定义`ref`属性来标识自己，有点类似于属性`id`，作用很大程度和Vue的ref语法糖相仿。可通过组件属性`refs`访问到标识的标签，入下列的`input100`标识标签（字符串形式），而且此标签通过获取到标签后更改的属性值，对`state`属性出发修改，可产生类似于`v-model`的”双向数据流“的效果。

```react
class MyComponent extends React.Component {
  state = {
    greet: ""
  }
  render() {
    return (
      <div>
        <input ref="input100" type="text" placeholder="随便写点啥" value={this.state.greet} onChange={this.changeValue}/>
        <h1>{this.state.greet}</h1>
      </div>
    )
  }
  changeValue = () => {
    console.log(this.refs['input100'])
    let value = this.refs['input100'].value
    this.setState({
      greet: value
    })
  }
}
```

#### 回调函数形式ref

```react
class MyComponent extends React.Component {
    state = {
      greet: ""
    }
    render() {
      return (
        <div>
          <input ref={currentNode => this.input100 = currentNode} type="text" 	placeholder="随便写点啥" value={this.state.greet} onChange={this.changeValue}/>
          <h1>{this.state.greet}</h1>
        </div>
      )
    }
    changeValue = () => {
      let value = this.input100.value
      this.setState({
        greet: value
      })
    }
  }
```

关键看input标签的ref定义方式，采用箭头函数，传入参数为当前标签节点自身，然后使用属性变量绑定到当前类实例上。**注意：使用以上内联函数的回调函数方式，会在页面更新的时候连续调用两次，所以使用绑定到类的函数形式**

```jsx
// jsx 中的写法
<input type="text" ref={this.saveInput} placeholder="随便写点啥" value={this.state.greet} onChange={this.changeValue}/>
```

```react
// 组件类实例中定义，其他内容保持不变
saveInput = (currentNode) => {
      this.input100 = currentNode
}
```

#### createRef 形式:100:

> React.createRef函数，调用后可返回一个被ref所标识的节点。该容器为单一使用的。

```react
class MyComponent extends React.Component {
    state = {
      greet: ""
    }
    input100 = React.createRef()
    render() {
      return (
        <div>
          <input type="text" ref={this.input100} 
            placeholder="随便写点啥" value={this.state.greet} onChange={this.changeValue}/>
          <h1>{this.state.greet}</h1>
        </div>
      )
    }
    changeValue = () => {
      let value = this.input100.current.value
      this.setState({
        greet: value
      })
    }
  }
```

**不可以过度使用ref，能不用即不用。**

## 事件处理

1. 通过`onXXX`属性指定事件处理函数（注意区分大小写）
   1. React使用自定义事件，而非DOM原生事件
   2. 通过事件委托，委托给最外层元素处理
2. 通过属性`event.target`可以获取发生事件的DOM元素对象

**常用函数柯里化和高阶函数进行定义。**

## 生命周期

![img](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/5eb55c03e2cfa.jpg)

![image-20210529182650765](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210529182650765.png)

### 组件

#### 组件构造初始化

constructor

初始化和状态更新时调用

#### 组件将要挂载

componentWillMount

#### render（核心）

渲染组件

#### 组件挂载页面完毕

componentDidMound

#### 组件将要卸载

componentWillUnmount

### 组件更新

状态更新时的生命周期。

#### shouldComponentUpdate

判断是否应该更新页面组件，返回true时更新，否则不更新。

不定义属性时默认属性返回true，定义了以定义的为基本。

#### componentWillUpdate

组件将要更新

#### setState触发时

```flow
st=>start: setState
op1=>operation: shouldComponentWillUpdate
op2=>operation: render
op3=>operation: componentDidUpdate
cond=>condition: shouldComponentUpdate
sub1=>subroutine: 不再继续执行
done=>end: componentDidUnmount
st->cond
cond(yes)->op1->op2->op3->done
cond(no)->sub1(right)

```















