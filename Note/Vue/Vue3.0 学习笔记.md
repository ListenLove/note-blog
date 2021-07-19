# Vue3 学习笔记

## 使用 Vite 创建项目

使用 NPM:
`npm init @vitejs/app`

使用 Yarn:
`yarn create @vitejs/app`

然后按照提示操作即可！你还可以通过附加的命令行选项直接指定项目名称和你想要使用的模板。例如，要构建一个 Vite + Vue 项目，运行:

```bash
# npm 6.x
npm init @vitejs/app my-vue-app --template vue
# npm 7+, 需要额外的双横线：
npm init @vitejs/app my-vue-app -- --template vue
# yarn
yarn create @vitejs/app my-vue-app --template vue
```

然后根据提示运行安装相关依赖命令和运行初始项目命令即可。

## 组合API

### setup

1. setup 函数时组合API的入口函数
2. 组合API中定义的变量和方法，要通过return向外暴露
3. setup 方法中 this 指向 undefined

#### setup 执行时机

在 beforecreate 之前执行，setup是同步的；

### ref

简单类型（基本类型？）数据更改
`import {ref} from 'vue'`
基本使用为：

```js
setup(){
let count = ref(0)  // ref 传入的值为 count的初始值
const handleClick = (el) => {  
    console.log(count)  
    count.value++   // 通过对value属性的修改，更改count值
}
return {  count,  handleClick}
}
```

#### ref 本质

本质上依然是使用 reactive，但是会对简单值再包裹一层对象，赋值给属性value
`ref(18) ===> reactive({value: 18})`，只是类似，与实际实现有区别。

### reactive

复杂类型（引用类型？）的数据变化更改
`import {reactive} from 'vue'`
生命和定义要进行修改的复杂变量
`variable = reactive(Object)`
之后，修改按照普通复杂类型一样处理即可。

#### reactive 本质

是将传入的数据包装成一个Proxy对象

#### 注意点

reactive 参数必须为对象/数组，如果传递了其他对象（例如Date对象）时，默认情况下修改对象时是不会更新界面的，此时需要重新对其赋值，让其页面同步更新

### ref 和 reactive

#### 递归监听

无论是ref还是 reactive，默认都是递归监听修改的，比较消耗性能

#### 非递归监听

reactive通过shallowReactive创建监听非递归的数据
ref通过shallowRef创建非递归监听的数据

#### triggerRef

主动触发界面更新ref数据方法

### shallowRef

创建的数据将会监听`value`属性的变化，进行界面更新。
底层还是shallowReactive

### toRaw

只有通过包装后对象的修改，才能触发界面更新。
返回经过ref或者是reactive包装后的Proxy的原始对象。如果不需要更新界面时，可通过toRaw拿到原数据进行修改，而不更新界面。
**注意**：在获取ref的原始对象时，要传入被包装的Proxy对象的`value`属性，才能使toRaw正确取得原始数据。

### markRaw

`obj = markRaw(obj)`表示`obj`将永远不会被跟踪（监听）

### toRef

利用ref将某对象的属性包装为响应式的数据时，如果修改包装的数据将不会对原始数据产生影响，此时将需要`toRef`，将对象属性包装为响应式的，但是修改后不会出发界面的更新。

### toRefs

将遍历传入对象的属性，分别包装后统一打包为一个对象，然后属性值可同roRef后的数据可经过toRef数据样的进行操作和处理

### customRef

显示的定义追踪和更新响应式数据
常用于网络请求

### 组合式API

可通过模块化变量、函数定义等将他们分块管理，最后在setup方法中组合使用。
另外，可将Option API 和 Composition API 混合开发

#### 获取元素

1. template 包裹的元素上设置属性ref及其唯一值名字
2. 通过setup中声明和定义ref(null)获取到与该名字同名的变量，并要将其暴露出来
3. 在倒入onMounted()方法，在方法中通过获取该变量的value属性，便能够获取到该元素

### readonly

用于创建一个只读的数据，且是递归只读

#### shallowReadonly

用于创建一个只读的数据，只是非递归只读

#### isReadonly

判断数据是否为只读数据