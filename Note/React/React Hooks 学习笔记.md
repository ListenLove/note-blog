# React Hook 基础笔记

## 要点注意

1. Hooks 是 React 的一部分
2. 只能在函数组件中使用，不能在函数组件外部、类组件中使用
3. 只能在最外层调用，不要在循环、条件判断或者子函数组件中调用
4. 同一个函数组件中可自由使用Hooks

## Hooks

### useState

useState 是函数组件保存自己状态的 Hooks。

| Hooks 名称 | 用法                                                         |
| ---------- | ------------------------------------------------------------ |
| useState   | 保存组件状态                                                 |
| 参数       | 组件状态的初始值                                             |
| 返回值     | 返回一个数组；数组中第一个元素是组件保存的状态，第二个元素是修改保存状态的方法。 |

**注意点**：同 setState 类似，注意 useState 更新状态时是异步的，注意其异步更新合并现象。复杂对象更新常常使用析构`...`运算符。

```jsx
import './App.css';
import {useState} from "react";

function App() {
  // state count and setter
  const [countState, setCountState] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {countState}
        </p>
        <div>
          <button onClick={() => setCountState(countState + 1)}>ADD Count</button>
          <button onClick={() => setCountState(countState - 1)}>SUB Count</button>
        </div>
      </header>
    </div>
  );
}

export default App;
```

### useEffect

可以设置相关项的依赖，只有依赖发生变化时才执行。

| Hooks 名称 | 用法                                                         |
| ---------- | ------------------------------------------------------------ |
| useState   | 依赖发生变化时执行回调函数                                   |
| 第一个参数 | 需传入函数，一般为箭头函数。不传入第二个参数时，在组件挂载时、任意组件状态改变时会执行传入的函数。**不指定依赖项而且回调函数如若有一个返回函数，将在组件卸载时执行该返回函数。** |
| 第二个参数 | 监听变化的依赖项，一般为元素为相关依赖项的数组。**传入空数组时只在组件挂载后执行一次** |

```jsx
import './App.css';
import {useEffect, useState} from "react";

function Home() {
  const [countState, setCountState] = useState(0)
  useEffect(() => {
    console.log('组件更新！')
    return () => {
      console.log('组件卸载！')
    }
  }, [])
  return <>
    <p> {countState} </p>
    <div>
      <button onClick={() => setCountState(countState + 1)}>ADD Count</button>
      <button onClick={() => setCountState(countState - 1)}>SUB Count</button>
    </div>
  </>
}

function App() {
  // state count and setter
  const [isShow, setIsShow] = useState(true)
  return (
    <div className="App">
      <header className="App-header">
        <div>
          {
            isShow && <Home/>
          }
          <button onClick={() => setIsShow(!isShow)}>Toggle</button>
        </div>
      </header>
    </div>
  );
}

export default App;
```

### memo

由于子组件不经特殊处理时在父组件数据状态进行更新时也会重新进行渲染，由此将造成页面性能影响，未避免吧这种不必要的性能损失，可从 React 中引入 `memo` 方法，对子组件进行二次处理，返回的组件将不会再有如此不断重新渲染的性能损耗。

```jsx
import './App.css';
import {memo, useState} from "react";

function About() {
  console.log('About 渲染了！')
  return <>
    <p>About</p>
  </>
}

function Home() {
  console.log('Home 渲染了！')
  return <>
    <p>Home</p>
  </>
}
const MemoAbout = memo(About)
const MemoHome = memo(Home)

function App() {
  console.log('App 渲染了')
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
        <p>{count}</p>
        <button onClick={() => setCount(count+1)}>增加</button>
        {/*<About/>*/}
        {/*<Home/>*/}
        <MemoAbout/>
        <MemoHome/>
      </header>
    </div>
  );
}

export default App;
```

### useCallback

如若父组件中的依赖传入子组件后，随着数据状态的变化即便依然使用了`memo`也将造成子组件重新渲染，造成性能问题。此时可用 `useCallbck`来解决这样的性能问题。

基本原理为：**在 useCallback 指定依赖未发生改变时，将会返回原有函数（返回值也不会有变化），所以在Home中让 count2 数据更新时，About 子组件和 count 将不会受到其影响，从而节省了页面性能。**

注意：**useCallback依然要运用到 memo 方法。**

```jsx
import './App.css';
import {memo, useCallback, useState} from "react";

function About(props) {
  console.log('About 渲染了！')
  return <>
    <p>About</p>
    <button onClick={() => props.handler()}>增加</button>
  </>
}

function Home(props) {
  console.log('Home 渲染了！')
  return <>
    <p>Home</p>
    <button onClick={() => props.handler()}>减少</button>
  </>
}

const MemoAbout = memo(About)
const MemoHome = memo(Home)

function App() {
  console.log('App 渲染了')
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)
  const add = useCallback(() => {
    setCount(count + 1)
  }, [count])

  const sub = () => {
    setCount2(count2 - 1)
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>count: {count}</p>
        <p>count2: {count2}</p>
        <MemoAbout handler={add}/>
        <MemoHome handler={sub}/>
      </header>
    </div>
  );
}

export default App;
```

### useMemo

只有在依赖发生变化时，才会将新的值进行返回，其返回值就是第一个参数的返回值。

```jsx
import './App.css';
import {memo, useMemo, useState} from "react";

function About(props) {
  console.log('About 渲染了！')
  return <>
    <p>About</p>
    <button onClick={() => props.handler()}>增加</button>
  </>
}

function Home(props) {
  console.log('Home 渲染了！')
  return <>
    <p>Home</p>
    <button onClick={() => props.handler()}>减少</button>
  </>
}

const MemoAbout = memo(About)
const MemoHome = memo(Home)

function App() {
  console.log('App 渲染了')
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)
  // useMemo 的返回值是第一个参数回调函数的返回值，在此处的作用是直接替代 useCallback
  const add = useMemo(() => {
    return () => setCount(count + 1)
  }, [count])

  const sub = () => {
    setCount2(count2 - 1)
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>count: {count}</p>
        <p>count2: {count2}</p>
        <MemoAbout handler={add}/>
        <MemoHome handler={sub}/>
      </header>
    </div>
  );
}

export default App;
```

#### 与useCallback的区别

useCallback 永远返回一个函数，而 useMemo 返回其第一个参数回调函数的返回值。

### useContext

Hooks 提供给函数式组件生产者容器用于组件上下文。相当于类组件中设置 `static contextType = Context`。

```jsx
import './App.css';
import {createContext, useContext, useState} from "react";

const UserContext = createContext({})
const ColorContext = createContext({})

function Home() {
    // 获取到 context 生产者容器提供的数据
  const userCtx = useContext(UserContext)
  const colorCtx = useContext(ColorContext)
  return <>
    <p>{userCtx.name}</p>
    <p>{colorCtx.color}</p>
  </>
}

function App() {
  // state count and setter
  const [isShow, setIsShow] = useState(true)
  return (
    <div className="App">
      <header className="App-header">
        <div>
          {
            isShow && (
                <UserContext.Provider value={{name: 'user context'}}>
              		<ColorContext.Provider value={{color: 'red'}}>
                		<Home/>
              		</ColorContext.Provider>
            	</UserContext.Provider>
            )
          }
          <button onClick={() => setIsShow(!isShow)}>Toggle</button>
        </div>
      </header>
    </div>
  );
}

export default App;
```

### useReducer

替代 useState 帮助复用操作数据逻辑代码的 Hooks。写法与 Redux 十分相像，但是用途相去甚远。

| Hooks 名称           | 用法                       |
| -------------------- | -------------------------- |
| useState             | 依赖发生变化时执行回调函数 |
| 第一个参数           | 处理数据函数               |
| 第二个参数           | 保存的数据默认值           |
| 返回数组的第一个元素 | 保存的数据                 |
| 返回数组的第二个元素 | dispatch 函数              |

```jsx
import './App.css';
import {useReducer} from "react";

function Reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        num: state.num + 1
      }
    case 'SUB':
    return {
      ...state,
      num: state.num - 1
    }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(Reducer, {num: 0})
  function Counter1() {
    return (
        <div>
          	<button onClick={() => dispatch({type: 'SUB'})}>-</button>
            <span>Counter1: {state.num}</span>
            <button onClick={() => dispatch({type: 'ADD'})}>+</button>
        </div>
    )
  }

  function Counter2() {
    return (
        <div>
          	<button onClick={() => dispatch({type: 'SUB'})}>-</button>
            <span>Counter2: {state.num}</span>
            <button onClick={() => dispatch({type: 'ADD'})}>+</button>
        </div>
    )
  }
  return (
    <div className="App">
      <header className="App-header">
        <Counter1/>
        <br/>
        <Counter2/>
      </header>
    </div>
  );
}

export default App;
```

### useRef

获取函数式组件中的元素。**注意：函数式组件不能使用 refs 直接进行获取。**

```jsx
import './App.css';
import {PureComponent, useRef} from "react";

class Home extends PureComponent{
  render() {
    console.log('Home 渲染了！')
    return <>
      <p>Home</p>
    </>
  }
}

function App() {
  const HomeRef = useRef()
  const PRef = useRef()
  const btnClick = () => {
    console.log(HomeRef.current)
    console.log(PRef.current)
  }
  return (
    <div className="App">
      <header className="App-header">
        <p ref={PRef}>Test Paragraph.</p>
        <Home ref={HomeRef}/>
        <button onClick={() => btnClick()}>打印</button>
      </header>
    </div>
  );
}

export default App;
```

### useRef 比 createRef更优

原因是，useRef能够保存数据，除非手动对该数据进行修改，否则将永远不变。**对 constCount.current 手动赋值才能改变它的值。**

```jsx
import './App.css';
import {useRef, useState} from "react";

function App() {
  const age = useRef(18)
  const [count, setCount] = useState(0)
  const constCount = useRef(count)
  const btnClick = () => {
    console.log(age)    // {current: 18}
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>count: {count}</p>
        <p>constCount: {constCount.current}</p>
        <button onClick={() => setCount(count + 1)}>ADD</button>
        <button onClick={() => btnClick()}>打印</button>
      </header>
    </div>
  );
}

export default App;
```

### useImperativeHandle

需要获取到函数式组件时，与 `forwardRef`使用进行获取。在获取到子组件后，控制父组件的权限，即父组件仅能使用 useImperativeHandle 中提供的方法，不能做多余的操作。

```jsx
import './App.css';
import {forwardRef, useImperativeHandle, useRef} from "react";

function Home(props, homeRef) {
  const inputRef = useRef()
  useImperativeHandle(homeRef, () => {
    return {
      myFocus: () => {
        console.log('input myFocus work.')
        inputRef.current.focus()
      }
    }
  })
  return <>
    <p>HOME</p>
    <input ref={inputRef} type="text" placeholder={'something may here'}/>
  </>
}

// 这样处理才能获取到函数式组件中指定的元素
const HomeForwardRef = forwardRef(Home)

function App() {
  const homeRef = useRef()
  const btnClick = () => {
    // console.log(homeRef) // 未设置 useImperativeHandle 时为 {current: input}
    // homeRef.current.focus()  // 未设置 useImperativeHandle 时可用
    console.log(homeRef) // 设置了 useImperativeHandle 时为 {current: myFocus: () => { console.log('input myFocus work.');... }
    // homeRef.current.focus()  // 设置了 useImperativeHandle 时不可用
    homeRef.current.myFocus()
  }
  return (
    <div className="App">
      <header className="App-header">
        <HomeForwardRef ref={homeRef}/>
        <button onClick={() => btnClick()}>打印</button>
      </header>
    </div>
  );
}

export default App;
```

### useLayoutEffect

与 useEffect 一般情况下用法相同。

#### 与useEffect的区别

1. 执行实际不同：挂载和更新时，useLayoutEffect 比 useEffect 更先执行；卸载时，useLayoutEffect 比 useEffect 更晚执行。
2. 同步异步：useEffect是同步的；useLayoutEffect是异步的，在渲染组件之前就开始执行。
3. 只在组件挂载之后更新DOM布局和样式时后才使用 useLayoutEffect，以避免 DOM 更改时造成的闪屏现象。

## [自定义 Hook]([自定义 Hook – React (reactjs.org)](https://zh-hans.reactjs.org/docs/hooks-custom.html))

抽取函数式组件中冗余的 Hook 逻辑代码。

**只要在函数名称前加上 `use`作为前缀，React就会将其视为自定义 Hook，在`use+`这样的函数中才可能像函数式组件一样使用 原生Hooks。**

```jsx
import './App.css';
import {useEffect, useState} from "react";

const useComponentShowOrHidden = (name) => {
  useEffect(() => {
    console.log(`${name} - 组件正在渲染！`)
    return () =>{
      console.log(`${name} - 组件正在卸载！`)
    }
  })
}
function Home() {
  // 使用自定义 Hook 省略以下冗余代码 
  // useEffect(() => {
  //   console.log('Home - 组件正在渲染！')
  //   return () =>{
  //     console.log('Home - 组件正在卸载！')
  //   }
  // })
  useComponentShowOrHidden('Home')
  return <>
  <p>Home</p>
  </>
}

function About() {
  // 使用自定义 Hook 省略以下冗余代码 
  // useEffect(() => {
  //   console.log('About - 组件正在渲染！')
  //   return () =>{
  //     console.log('About - 组件正在卸载！')
  //   }
  // })
  useComponentShowOrHidden('About')
  return <>
    <p>About</p>
  </>
}

function App() {
  const [isShow, setIsShow] = useState(true)
  const btnClick = () => {
    setIsShow(!isShow)
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => btnClick()}>TOGGLE</button>
        {isShow && <Home/>}
        {isShow && <About/>}
      </header>
    </div>
  );
}

export default App;
```



