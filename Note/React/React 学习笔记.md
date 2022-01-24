

### React 学习笔记

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

#### 类组件

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

#### setState 的异步和同步

1. setState 默认时异步的，在时间段内收集所有的更新一次更新到位，提升性能
2. setState 第二个传参为回调函数，在更新完成后调用
3. 在定时器中和原生事件中是同步的

## React 组件

### 有状态组件和无状态组件

组件中的状态（state）实际上指的就是数据，所以说有状态组件是指有自己数据的组件（逻辑组件），无状态组件是指没有自己数据的组件（展示组件）。

更加具体的区分是继承自React.Component的组件默认会从父类继承过来一个state属性，所以继承自React.Component组件都是有状态组件，没有继承来自React.Component的组件都是无状态组件。

### this的注意点

```react
import "./styles.css";
import "react";
import React from "react";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "hello world"
    };
  }
  myFn(value, element) {
    console.log(this);
    // this.state.message = "你好世界"
    this.setState({
      message: "你好世界"
    });
  };
  render() {
    return (
      <div className="App">
        <h1>{this.state.message}</h1>
        <button onClick={(e) => this.myFn(value, element)}>Click</button>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    );
  }
}

```

注意其中的`myFn`回调函数编写，要使用箭头函数调用解决点击事件调用时调用者会被绑定至`undefined`的问题，同时还可传入我们调用方法时所需的触发的元素和参数。

## JSX

### 注释

```react
{/* 多行注释 */}
{
	//单行注释
}
```

### 绑定属性

#### 普通属性

HTML标签怎么绑定属性，JSX就怎么绑定。

#### 特殊属性

需要绑定属性名属于JS关键字时进行的特殊处理。

1. 绑定类名时由于class时Javascript的一个关键字，所以绑定类名应当使用 `className`进行绑定

   - ```re
     <h1 className="hello">Hello World</h1>
     ```

   

2. JSX绑定央视时，必须通过对象的形式来绑定

   - ````react
     <h1 style={{ color: "red", backgroundColor: "grey" }}>Hello World</h1>
     ````

### 嵌入内容

1. 任何合法的JavaScript表达式都可以嵌入到JSX的`{}` 中
2. 嵌入内容为空数组、true、false、null、undefined时将不会展示，需要展示时通过转换为字符串后方可进行展示
3. 空数组转换成字符串也不会展示

## 组件间通讯

### 父子组件通讯

#### 函数式子组件传值组件

> 通过形参 props 将父组件绑定至自定义属性的值传递给子组件

```react
// App.js 父组件文件
import './App.css';
import React from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header title={"这里是头部子组件"}/>	{/* 将 title 值给子组件 */}
        <Main/>
        <Footer/>
      </div>
    )
  }
}

export default App
// 子组件 Header.js
import './Header.css'
function Header(props) {
  console.log(JSON.stringify(props))	// {"title":"这里是头部子组件"}
  return (
    <div className="header">{props.title}</div>
  )
}

export default Header
```

#### 子组件定义 props 的默认值

> 子组件使用 props.defaultProps 对默认值进行定义

```react
// 定义 props 的默认值
// Header为函数式子组件
Header.defaultProps = {
  title: '页头子组件'
}
```

#### 使用 prop-types 库对 props 进行校验

[使用 PropTypes 进行类型检查 – React (reactjs.org)](https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html)

```react
// 对 props 的进行校验
// Header为函数式子组件
import PropTypes from 'prop-types'
Header.propTypes = {
  title: PropTypes.string
}
```

### 类组件通讯

父组件向类子组件传递值的形式与函数时子组件同理。通过构造函数`constructor`形参获取到父组件传递过来的值对象，在`constructor`中绑定到类组件`this.props`上引用。

```react
// App.js 父组件文件
import './App.css';
import React from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header title={"这里是头部子组件"}/>
        {/*<Header />*/}
        <Main title={"这里是主体内容子组件"}/>
        <Footer/>
      </div>
    )
  }
}

export default App;

// 类子组件 Main
import './Main.css'
import React from "react";

class Main extends React.Component {
  constructor(props) {
    super(props)
    // this.props = props 上一行中继承中实现，此处不需要写
  }
  render() {
    console.log(this.props)		// {title: '这里是主体内容子组件'}
    return (
      <div className="main">{this.props.title}</div>
    )
  }
}

export default Main
```

#### 类子组件定义 props 默认值

> 在类静态属性 defaultProps 中对需要props默认值的属性进行定义

```react
    constructor() {...}
	static defaultProps = {
      title: '主体子组件'
    }
	render() {...}
```

#### 类子组件对props进行类型校验

> 同上，使用类静态属性 propTypes。

```react
    constructor() {...}
	static defaultProps = {...}
    static propTypes = {
      title: PropTypes.string
    }
	render() {...}

```

### 子组件向父组件通讯

通过父组件向子组件传递行数方法，然后通过回调函数形式获取在子组件中被调用并传递过来的值。

![image-20220111225518863](https://gitee.com/wencbin/pics/raw/master/images/image-20220111225518863.png)

```react
import './App.css';
import React from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header title={"这里是头部子组件"}/>
        {/*<Header />*/}
        <Main title={"这里是主体内容子组件"}/>
        {/*<Main/>*/}
        <Footer footerClick={this.myFn}/>
      </div>
    )
  }
  myFn(value) {
    // 对返回的 value 进行处理
    alert(typeof value=== 'string'?value:JSON.stringify(value))
  }
}

export default App;

import './Footer.css'
import PropTypes from "prop-types";
function Footer(props) {
  console.log(JSON.stringify(props))
  return (
    <div className="footer" onClick={() => props.footerClick('Hello, world')}>Footer</div>
  )
}

Footer.propTypes = {
  footerClick: PropTypes.func.isRequired
}

export default Footer

```

### 跨组件通讯

#### 层层传递模式（不推荐）

#### 通过 context 上下文传递数据

##### 方式一 通过容器组件使用

1. 创建一个上下文对象`const AppContext = React.createContext({})`
2. 从上下文中获取生产者和消费者容器组件：Provider和Consumer
3. 生产者容器Provider组件将需要提供数据的父组件包裹起来传递数据，而被提供数据的子孙组件用消费者容器组件Consumer进行包裹
4. 在Consumer组件中调用回调函数对传递过来的数据进行利用。

```react
import './App.css';
import React from "react";
const AppContext = React.createContext({})
const {Provider, Consumer} = AppContext

function Father() {
  return (
    <div>
      <h2>Father</h2>
      <Son/>
    </div>
  )
}

function Son() {
  return (
    <Consumer>
      {
        (value => {
          // 注意这个，要用回调函数的来渲染
          return (
            <div>
             <h3>Son</h3>
              <p style={{color: 'red'}}>{value.data}</p>
            </div>
          )
        })
      }
    </Consumer>
  )
}

function App() {
  return (
    <div className="App">
      <Provider value={{data: '在爷爷组件App里随便写点数据往下传'}}>
        <h1>APP</h1>
        <Father/>
      </Provider>
    </div>
  );
}

export default App;
```

##### 方式二 通过 contextType 静态属性(推荐:100:)

此方法可不用再将组件包裹起来，只需要再定义上下文时将数据传入`createContext` 方法，而后在需要的组件中定义声明其静态属性`contextType`引用定义的上下文进行使用。

尤其是在定义多个上下文 context ，且context传递的数据组件有嵌套关系时更应该使用方式二。

## 组件生命周期

**[生命周期图谱](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)**

![**[生命周期图谱](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)**](https://gitee.com/wencbin/pics/raw/master/images/image-20220116134048286.png)

### 挂载时生命周期方法

#### constructor 组件创建时

1. 通过 props 接受父组件传递过来的数据
2. 通过 this.state 初始化内部传递过来的数据
3. 通过 bind 为事件绑定实例 this

#### render 组件渲染时

返回组件的页面结构

#### componentDidMount 组件挂载后

1. 依赖于 DOM 的操作可以在这里进行
2. 官方建议在此处发送网络请求
3. 在此处添加一些订阅，会在 componentDidUnmount 取消订阅

### 更新时生命周期方法

#### render 组件数据更新渲染界面

返回组件的页面结构

#### componentDidUpdate 组件更新完成后

1. 在此处对更新后的组件进行操作

### 卸载时生命周期方法

#### componentWillUnmount 组件将要卸载时

1. 必要的清理操作
2. 清除定时器等

### 其他生命周期方法（仅了解）

#### static getDerivedStateFromProps()

挂载或更新时使用，将 props 映射到 state。必须返回一个对象，将返回对象的值映射到 state 中

#### shouldComponentUpdate()

更新时决定是否更新组件，返回 true 时会继续更新。

#### getSnapshotBeforeUpdate()

获取更新之前的数据。 

### Ref

获取方式：

1. 字符串（不推荐）
2. 对象（推荐）
3. 回调函数（事件方法将元素本身作为参数传入回调函数，然后将该参数保存就是响应事件的该元素）推荐

#### 使用对象获取 Ref

在constructor方法中通过 React.createRef 方法定义 Ref 对象，然后在  JSX 中绑定到对应元素的即可获取该元素。

```react
import './Main.css'
import React, {createRef} from "react";

class Main extends React.Component {
  constructor(props) {
    super(props)
    // this.props = props
    this.opRef = createRef()
  }
  btnClick() {
    console.log(this.opRef.current.innerText)
    this.opRef.current.innerText = 'Hello Ref'
  }
  render() {
    console.log(this.props)
    return (
      <div className="main" onClick={() => this.btnClick()} ref={this.opRef}>{this.props.title}</div>
    )
  }
}

export default Main
```

注意：**如果获取的是原生组件，那么拿到的就是原生元素。如果拿到的是类组件对象，拿到的就是类组件的实例，如果是去获取函数组件，那无法获取函数组件，拿到的是空。**

#### Ref 转发

使用 React.forwardRef() 方法定义函数组件，此时在父组件中可正常获取，还可在定义函数组件时任意将 ref 绑定到指定元素。

```react
import './Main.css'
import React, {createRef, forwardRef} from "react";

// forwardRef 方法的使用, props 参数为父组件向子组件传递数据, ref 为转发绑定的 Ref 对象
const About = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      {/*<p ref={ref}> this is a paragraph in about component.</p>*/}
      This is About Component.
    </div>
  )
})

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.abRef = createRef()
  }
  btnClick() {
    console.log(this.abRef.current.innerText)
    this.abRef.current.innerText = 'Hello Ref'
  }
  render() {
    return (
      <div className="main" onClick={() => this.btnClick()} >
        {this.props.title}
        <About ref={this.abRef}/>
      </div>
    )
  }
}

export default Main
```

### [受控组件]([React.Component – React (reactjs.org)](https://zh-hans.reactjs.org/docs/react-component.html))

### [非受控组件]([非受控组件 – React (reactjs.org)](https://zh-hans.reactjs.org/docs/uncontrolled-components.html#gatsby-focus-wrapper))

## 渲染优化

### diff算法

暂略。

### 列表渲染优化

给渲染项添加`key`的属性值，还必须保证`key`的值是唯一的。

### 性能优化

1. 使用 shouldComponentUpdate() 根据适应逻辑判断是否进行更新以保证组件性能。
2. 组件继承自 PureComponent ，让 React 自动进行组件的性能优化
3. 函数组件使用 React.memo() 的高阶函数进行性能优化

## [高阶组件]([高阶组件 – React (reactjs.org)](https://zh-hans.reactjs.org/docs/higher-order-components.html#gatsby-focus-wrapper))

### 定义

高阶组件是个函数，其中其参数为组件，返回值为新的组件，像这样的函数组件，我们称之为“高阶组件”。

#### 应用场景

1. 增强代码复用，消除冗余代码
2. 增强 props
3. 抽离 state 属性，复用组件生命周期方法
4. 权限控制

## 其他重要内容

### Portals

将组件传递到指定地点（元素）挂载，类似于 Vue3 的 teleport 内建组件。

步骤：

1. 使用 ReactDOM.createPortal() 方法定义 render 返回的模板
2. ReactDOM.createPortal() 方法第一个参数一般使用`this.props.children`以获取组件包裹的所有子元素和子组件，第二个参数是挂载到的指定地点。

```react
import './Main.css'
import React, {Component} from "react";
import {createPortal} from "react-dom";

class PortalText extends Component {
  render() {
  /*
      return (
        <div>
          This is PortalText.
        </div>
      )
  */
    return createPortal(this.props.children, document.querySelector('body'))	// 将 PortalText 组件的所有内容传递到 body 元素挂载
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="main" >
        Main Content.
        <PortalText>
          this is content of PortalText!
          <p>this is a paragraph of PortalText!</p>
        </PortalText>
      </div>
    )
  }
}

export default Main
```

### Fragment

React.Fragment 内可以包裹多个元素，同时渲染时将不会渲染 React.Fragment 这个根元素。、

```react
<React.Fragment>
	<comp1></comp1>
	<comp2></comp2>
    {/*...*/}
</React.Fragment>
```

等价于语法糖：

```react
<>
	<comp1></comp1>
	<comp2></comp2>
    {/*...*/}
<>
```

需要注意的是，在使用时，如果 Fragment 要添加key属性时将不允许使用语法糖的编写形式。

### StrictMode

React.StrictMode 开启严格模式，仅在开发模式下有效，对后代组件进行编码检查。

## React 编写 CSS

### CSS in Module（推荐）

React 内置了该功能的实现，只需按要求书写和引入中间扩展名带`module`的样式文件（包括.css .scss .sass .less）文档，然后作为一个对象引入并使用即可。

### [CSS-In-Js（推荐:100:）]()[styled-components](https://styled-components.com/)

编写示例：

**注意：** 首字母一定要大写,将他视为携带自定义样式的组件。

```react
import './Footer.css'
import styled from 'styled-components'

// 首字母一定要大写,将他视为携带自定义样式的组件
const AboutDiv = styled.div`
  color: cyan;
`
function Footer(props) {
  return (
    <AboutDiv >
      <p>
        Footer
      </p>
    </AboutDiv>
  )
}

export default Footer
```

## React Router

[安装]([React Router | Installation](https://reactrouter.com/docs/en/v6/getting-started/installation))

```react
import './App.css';
import React from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import {
  BrowserRouter,
  Route,
  Link,
  Routes
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Link to={'/'}>Main</Link>
          <Link to={'/Footer'}>Footer</Link>
          <Routes>
            <Route path={'/'} element={<Main/>}/>
            <Route path={'/Footer'} element={<Footer/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
```

### BrowserRouter

设置页面的监听模式为 history。

*只兼容高版本浏览器*

### HashRouter

设置路由的监听模式为 hash。

*兼容低版本浏览器*

### Link

组件路径导航标签，关键属性 to 引导浏览器路由跳转至指定路径。

### Route

当路由路径匹配时，组件将在此组件进行渲染，关键属性为 path 指定要匹配的路由路径，element 指定要进行渲染的组件，注意使用标签形式。

### Routes

Route必须是Routes标签子元素，且 Routes 标签必须置于 HashRouter 或 BrowserRouter。

### [跳转](https://reactrouter.com/docs/en/v6/getting-started/concepts#navigate-function)

使用 useNavigate Hooks进行跳转。

使用示例：

```react
import {  useNavigate } from "react-router-dom";
let navigate = useNavigate();
useEffect(() => {
  setTimeout(() => {
    navigate("/logout");
  }， 5000);
}, []);
```

### 嵌套路由

#### 写法一

路由与组件分开编写，然后嵌套即可。

```react
import './App.css';
import React from "react";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'

function Home() {
  return (
    <div>
      Home
        <Link to={'/home/home'}>Home</Link>
        <Routes>
          <Route path={'/about'} element={<HomeAbout/>}/>	{/* 路由匹配为 /home/about */}
          <Route path={'/home'} element={<HomeHome/>}/>		{/* 路由匹配为 /home/home */}
        </Routes>
    </div>
  )
}

function HomeAbout() {
  return (
    <div>
      Home About
    </div>
  )
}
function HomeHome() {
  return (
    <div>
      Home Home
    </div>
  )
}


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to={'/home'}>Home</Link>
        <Routes>
          <Route path={'/about'} element={<About/>}/>
          <Route path={'/home/*'} element={<Home/>}/>	{/* 进行嵌套的路由 */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```

 注意嵌套的父层级路由路径属性字符串后要添加星号`*`，例如：`<Route path={'/home/*'} element={<Home/>}/>`。子路由无需重复编写父层级路由进行匹配。

```react
function Home() {
  return (
    <div>
      Home
        <Link to={'/home/home'}>Home</Link>
        <Routes>
          <Route path={'/about'} element={<HomeAbout/>}/>
          <Route path={'/home'} element={<HomeHome/>}/>
        </Routes>
    </div>
  )
}
```

#### 方式二

将 Route 集中编写，并使用 Outlet 在子组件中进行匹配并渲染路由匹配最佳的组件：

```react
import './App.css';
import React from "react";
import {BrowserRouter, Link, Route, Routes, Outlet} from 'react-router-dom'

function Home() {
  return (
    <div>
      Home
      <Link to={'/home/home'}>Home Home</Link>
      <Link to={'/home/about'}>Home about</Link>
      <Outlet/>
    </div>
  )
}

function HomeAbout() {
  return (
    <div>
      Home About
    </div>
  )
}
function HomeHome() {
  return (
    <div>
      Home Home
    </div>
  )
}


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to={'/home'}>Home</Link>
        <Routes>
          <Route path={'/home/*'} element={<Home/>}>
            <Route path={'about'} element={<HomeAbout/>}/>
            <Route path={'home'} element={<HomeHome/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```

#### 方式三

使用 useRoutes 和 Outlet 的组合方式。

### 路由传参

#### URL参数

直接在路由中传参，使用 window.location 接收，再利用[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)进行解析。

```react
import './App.css';
import React from "react";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'

class Home extends React.Component{
  constructor(props) {
    super(props)
    console.log(window.location.search)
  }
  render() {
    return (
      <div>
        Home
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to={'/home?name=wenbin&age=25'}>Home</Link>
        <Routes>
          <Route path={'/home'} element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
```

####   动态路由

在 Route 路由路径中使用 `:name, :age`等占位符，对将要传递的参数进行声明；再在 Link 中指定实际路径，并传参，可在跳转后，通过 `useParams` 访问到传递过来的参数对象，例如：

```react
import './App.css';
import React from "react";
import {BrowserRouter, Link, Route, Routes, useParams} from 'react-router-dom'

function Home() {
  const params = useParams()    // Object { name: "wenbin", age: "25" }
  console.log(params)
  return (
    <div>
      Home
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to={'/home/wenbin/25'}>Home</Link>
        <Routes>
          <Route path={'/home/:name/:age'} element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```

#### 路由统一管理

1. 使用 useRoutes 生成相应的路由结构
2. 路由结构是一种 JSX 代码，且必须由 Router 标签进行包裹，在此处使用了 BrowserRouter
3. routes 对象由 route 对象数组组成，具体示例如下，一定要编写：`{ path: "*", element: ... }`，对无法匹配的路由进行跳转控制

```react
import {Outlet, Link, useRoutes, BrowserRouter} from "react-router-dom";

function Routes() {
  let routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/courses",
          element: <Courses />,
        },
        { path: "*", element: <NoMatch /> }
      ]
    }
  ];

  // The useRoutes() hook allows you to define your routes as JavaScript objects
  // instead of <Routes> and <Route> elements. This is really just a style
  // preference for those who prefer to not use JSX for their routes config.
  return useRoutes(routes);
}

export default function App() {

  return (
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Courses() {
  return (
    <div>
      <h2>Courses</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>It looks like you're lost...</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
```
