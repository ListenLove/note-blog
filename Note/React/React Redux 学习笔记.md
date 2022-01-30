# React Redux 学习笔记

集中管理数据的容器，提供了可预测的状态管理。

## 起步

#### 安装

在 React 项目中使用：`npm install @reduxjs/toolkit react-redux`

在新项目中使用:

```bash
# Redux + Plain JS template
npx create-react-app my-app --template redux

# Redux + TypeScript template
npx create-react-app my-app --template redux-typescript
```

#### Provider

React Redux 包含一个能让 Redux store 在你的App中随处可用的`<Provider />`组件.

#### Hooks

React Redux 提供了一对能够让你与React store 进行交互的自定义 React Hooks。

`useSelector`从 store 的 state 中读取值和监听值的更新。

`useDispatch` 返回 store 的 `dispatch`的方法来 “dispatch action”。

## 基本使用

### 安装 Redux Toolkit 和 React Redux

```bash
npm install @reduxjs/toolkit react-redux
```

### 创建 Redux Store

从 Redux Toolkit 中导入`configureStore`，来创建一个空的 Redux store，并且将其设置为默认导出。

```js
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {},
})
```

### 提供给 React 应用

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import store from './redux/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

### 创建 Redux state slice 切片

createSlice 方法使用的注意点：

- 必须提供给 name 一个注明身份的字符串
- initialState ：初始值
- reducers：必须一个或多个 reducer 函数来定义 state 如何进行更新

```js
import {createSlice} from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
   value: 0
  },
  reducers: {
    increment(state) {
      state.value += 1
    },
    decrement(state) {
      state.value -= 1
    },
    incrementByAmount(state, amount) {
      state.value += amount
    }
  }
})

export const {increment, decrement, incrementByAmount} = counterSlice.actions
export default counterSlice.reducer
```

定义完成 createSlice 方法后，在返回的对象中将生成的 action 导出，将该对象的 reducer 默认导出。

### 将 Slice Reducers 添加至 store

store 中的 reducer 字段声明一个字段为 counterReducer

```js
import {configureStore} from "@reduxjs/toolkit";
import counterReducer from './features/counter'

export default configureStore({
  reducer:{
    counter: counterReducer
  }
})
```

### 在组件中使用 store

- `useSelector`从 store 中或取数据
- `useDispatch`使用其返回的 dispatch 方法配合 counterSlice 中定义的 actions 触发 store 的更新

```js
import {useDispatch, useSelector} from "react-redux";
import {increment, decrement} from "../redux/features/counter";

export default function Counter(props) {
  console.log(props)
  const counter = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <span>{counter}</span>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}
```

值得注意的是：`useSelector`获取数据是响应式的，将会随着数据的更新而更新。

#### 总结

- Create a Redux store with `configureStore`
  - `configureStore` accepts a `reducer` function as a named argument
  - `configureStore` automatically sets up the store with good default settings
- Provide the Redux store to the React application components
  - Put a React Redux `<Provider>` component around your `<App />`
  - Pass the Redux store as `<Provider store={store}>`
- Create a Redux "slice" reducer with `createSlice`
  - Call `createSlice` with a string name, an initial state, and named reducer functions
  - Reducer functions may "mutate" the state using Immer
  - Export the generated slice reducer and action creators
- Use the React Redux `useSelector/useDispatch` hooks in React components
  - Read data from the store with the `useSelector` hook
  - Get the `dispatch` function with the `useDispatch` hook, and dispatch actions as needed

## Redux Thunk

[如何在 React 中使用 Redux Thunk 编写需要 dispatch 的异步代码]([Writing Logic with Thunks | Redux](https://redux.js.org/usage/writing-logic-thunks))

## [Redux-Saga](https://redux-saga.js.org/)







