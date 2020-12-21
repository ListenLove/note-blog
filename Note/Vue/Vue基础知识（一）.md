# Vue基础知识（一）

## 核心基础

### 基本模版··

1. 创建Vue实例对象
2. 指定Vue实例对象控制的区域
3. 指定Vue实例对象控制区域的数据

```javascript
// 1.创建一个Vue的实例对象
let vue = new Vue({
    // 2.告诉Vue的实例对象, 将来需要控制界面上的哪个区域
    el: '#app',
    // 3.告诉Vue的实例对象, 被控制区域的数据是什么
    data: {
        name: "any one"
    }
});
```

### Vue 设计模式

1. MVVM设计模式
   在MVVM设计模式中由3个部分组成
   `M : Mode`l      数据模型(保存数据, 处理数据业务逻辑)
   `V : View`       视图(展示数据, 与用户交互)
   `VM: View Model` 数据模型和视图的桥梁(M是中国人, V是美国人, VM就是翻译)

   MVVM设计模式最大的特点就是支持数据的双向传递
   数据可以从 `M -> VM -> V`
   也可以从   `V -> VM -> M`

2. Vue中MVVM的划分
   Vue其实是基于MVVM设计模式的
   被控制的区域: View
   Vue实例对象 : View Model
   实例对象中的data: Model

3. Vue中数据的单向传递
   我们把"数据"交给"Vue实例对象", "Vue实例对象"将数据交给"界面"
         `Model  ->  View Model  ->   View`

4. 在`<input>、<textarea> 及 <select> `元素上可以用 v-model 指令创建双向数据绑定。

   注意：**v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值而总是将 Vue 实例的数据作为数据来源**。

### 常用指令

> 指令就是Vue内部提供的一些自定义属性,
> 这些属性中封装好了Vue内部实现的一些功能
> 只要使用这些指令就可以使用Vue中实现的这些功能

**数据绑定的特点：只要数据发生变化, 界面就会跟着变化**。

#### v-once指令:
让界面不要跟着数据变化, 只渲染一次

#### v-cloak指令作用:
数据渲染之后自动显示元素

#### v-text和v-html指令：

v-text就相当于过去学习的innerText;

v-html就相当于过去学习的innerHTML.

**NOTE！**：他们都会覆盖原有的内容。

#### v-if指令
条件渲染: 如果v-if取值是true就渲染元素, 如果不是就不渲染元素.

**NOTE！**：

1. 如果条件不满足根本就不会创建这个元素。
2. v-if可以从模型中获取数据，v-if也可以直接赋值一个表达式。

#### v-else指令
v-else指令可以和v-if指令配合使用, **当v-if不满足条件时就执行v-else就显示v-else中的内容**。

**NOTE！**：v-else不能单独出现；v-if和v-else中间不能出现其它内容。

#### v-else-if指令
v-else-if可以和v-if指令配合使用, 当v-if不满足条件时就依次执行后续v-else-if, 哪个满足就显示哪个。

**NOTE！**：同v-else。

#### v-show指令

v-show和v-if的能够一样都是条件渲染, 取值为true就显示, 取值为false就不显示。

##### v-if和v-show区别
v-if: 只要取值为false就不会创建元素
v-show: 哪怕取值为false也会创建元素, 只是如果取值是false会设置元素的display为none。

##### v-if和v-show应用场景

如果企业开发中需要频繁切换元素显示隐藏, 那么推荐使用v-show, 否则使用v-if。

#### v-for指令
相当于JS中的`for in`循环, 可以根据数据多次渲染元素。

**数组, 字符, 数字, 对象**都可进行遍历。

**key**

渲染列表的时候给每一个元素加上一个独一无二的`key`
v-for在更新已经渲染过的元素列表时, 会先判断key是否相同, 如果相同则复用, 如果不同则重新创建。

```html
<li v-for="(person,index) in persons" :key="index">		// index 创建独一无二的key
    <input type="checkbox">
    <span>{{index}} --- {{person.name}}</span>
</li>
```

#### v-bind指令

如果想给"元素的属性"绑定数据, 就必须使用v-bind；
v-bind的作用是专门用于给"元素的属性"绑定数据的。

##### v-bind绑定类名格式

`:class="['需要绑定类名', …]"`

##### 注意点

1. 直接赋值一个类名(没有放到数组中)默认回去Model中查找
   `:class="需要绑定类名"`
2. 数组中的类名没有用引号括起来也会去Model中查找
   `:class="[需要绑定类名]"`
3. 数组的每一个元素都可以是一个三目运算符按需导入
   `:class="[flag?'active':'']"`
4. 可以使用对象来替代数组中的三目运算符按需导入
   `:class="[{'active': true}]"`
5. 绑定的类名太多可以将类名封装到Model中
   `obj: {
       'color': true,
       'size': true,
       'active': false,
   }`

#### v-bind给style属性绑定数据

1. 数据放在对象中：`:style="{color:'red','font-size':'50px'}"`
2. 数据放在模型（data）中：`obj: {
       color: 'red',
       'font-size': '80px',
   }`

#### v-on指令
v-on指令专门用于给元素绑定监听事件；

**格式为：**

1. `v-on:事件名称="回调函数名称"`
2. `@事件名称="回调函数名称"`

**注意点**:
v-on绑定的事件被触发之后, 会去Vue实例对象的methods中查找对应的回调函数。

#### v-on修饰符
在事件中有很多东西需要我们处理, 例如事件冒泡,事件捕获, 阻止默认行为等，那么可以通过v-on修饰符来处理。

1. .once    - 只触发一次回调。
2. .prevent - 调用 event.preventDefault()。
3. .stop    - 调用 event.stopPropagation()。
4. .self    - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
5. .capture - 添加事件侦听器时使用 capture 模式。

#### v-on注意点

1. 绑定回调函数名称的时候, 后面可以写()也可以不写
   `v-on:click="myFn"`
   `v-on:click="myFn()"`
2. 可以给绑定的回调函数传递参数
   `v-on:click="myFn('lnj', 33)"`
3. 如果在绑定的函数中需要用到data中的数据必须加上**this**。

#### 自定义全局指令

##### 自定义全局指令语法
```javascript
Vue.directive('自定义指令名称', {
    生命周期名称: function (el) {
        // 指令业务逻辑代码
    }
});
```

##### 指令生命周期方法
明确指令的业务逻辑代码更适合在哪个阶段执行
例如: <u>指令业务逻辑代码中没有用到元素事件</u>, 那么可以在**bind**阶段执行。
例如: <u>指令业务逻辑代码中用到了元素事件</u>, 那么就需要在**inserted**阶段执行。

##### 自定义指令注意点
使用时需要加上`v-`, 而在自定义时不需要加上`v-`。

##### 自定义指令参数

在执行自定义指令对应的方法的时候, 除了会传递`el`给我们, 还会传递一个对象给我们
这个对象中就保存了指令传递过来的参数。

#### 自定义局部指令

给创建Vue实例时传递的对象添加

```javascript
directives: {
    // key: 指令名称
    // value: 对象
    'color': {
        bind: function (el, obj) {
            el.style.color = obj.value;
        }
    }
}
```

## 核心属性

### 计算属性(computed)和函数

通过计算属性我们能拿到处理后的数据, 但是通过函数我们也能拿到处理后的数据。

1. 函数"不会"将计算的结果缓存起来, 每一次访问都会重新求值
2. 计算属性"会"将计算的结果缓存起来, 只要数据没有发生变化, 就不会重新求值

#### 计算属性应用场景

计算属性:比较适合用于计算不会频繁发生变化的的数据.

### 过滤器 filter

#### 自定义全局过滤器
`Vue.filter("过滤器名称", 过滤器处理函数)；`

#### 使用全局过滤器
1. `{{msg | 过滤器名称}}`
2. `:value="msg | 过滤器名称"`

#### 过滤器注意点

1. 只能在插值语法和v-bind中使用
2. 过滤器可以连续使用

### 自定义局部过滤器

```javascript
//给创建Vue实例时传递的对象添加
filters: {
    // key: 过滤器名称
    // value: 过滤器处理函数
    'formartStr': function (value) {}
}
```

## 过渡动画

执行动画的元素，要放置于`transition`组件中。

1. transition组件中的元素显示时会自动查找`.v-enter/.v-enter-active/.v-enter-to`CSS类名。
2. transition组件中的元素隐藏时会自动查找`.v-leave/ .v-leave-active/.v-leave-to`CSS类名
3. 我们只需要在.v-enter和.v-leave中指定动画动画开始的状态
4.  在.v-enter-active和.v-leave-active中指定动画执行的状态即可完成过渡动画。

### transition组件

1. 标签内只能放置一个根元素。
2. 添加`appear`属性，初始便可显示动画。
3. transition指定name的方式，来指定"进入之前/进入之后/进入过程中, 离开之前/离开之后/离开过程中"对应的类名，来实现不同的元素执行不同的过渡动画。

#### transition组件使用钩子函数

- `v-on:before-enter="beforeEnter" ` 进入动画之前
- `v-on:enter="enter" ` 进入动画执行过程中
- `v-on:after-enter="afterEnter"  `进入动画完成之后
- `v-on:enter-cancelled="enterCancelled"`  进入动画被取消
- `v-on:before-leave="beforeLeave" `离开动画之前
- `v-on:leave="leave"  `离开动画执行过程中
- `v-on:after-leave="afterLeave" `离开动画完成之后
- `v-on:leave-cancelled="leaveCancelled" `离开动画被取消。

**注意点**：

1. 在动画过程中必须写上`el.offsetWidth`或者`el.offsetHeight`
2. 在`enter`和`leave`方法中**必须调用done方法**, 否则after-enter和after-leave不会执行
3. 需要需要添加初始动画, 那么需要把done方法包裹到setTimeout方法中调用

#### 自定义类名动画

使用自定义类名的方式来指定过渡动画

```javascript
enter-class  // 进入动画开始之前
enter-active-class // 进入动画执行过程中
enter-to-class // 进入动画执行完毕之后
leave-class  // 离开动画开始之前
leave-active-class // 离开动画执行过程中
leave-to-class // 离开动画执行完毕之后
```

#### transition-group

`transition-group`和`transition`的用法一致, 只是一个是给单个元素添加动画, 一个是给多个元素添加动画而已。

**注意点：**

1. transition-group注意点:
   **默认情况下**transition-group会将动画的元素放到span标签中
   我们可以通过**tag**属性来指定将动画元素放到什么标签中。

2. transition-group动画混乱问题
   一般情况下组动画出现动画混乱都是因为v-for就地复用导致的
   我们**只需要保证所有数据key永远是唯一的即可**

## 组件化

将大界面，拆分为小界面，组装。

### 基本步骤

1. 创建组件构造器

   ```js
   // 创建组件构造器
       let Profile = Vue.extend({
           // 注意点: 在创建组件指定组件的模板的时候, 模板只能有一个根元素
           template:
         	`
              <div>
                   <img src="images/fm.jpg"/>
                   <p>我是描述信息</p>
               </div>
           `
       });
   ```

2. 注册已经创建好的组件

   ```js
   // 注册已经创建好的组件
   // 第一个参数: 指定注册的组件的名称
   // 第二个参数: 传入已经创建好的组件构造器
   Vue.component("abc", Profile );
   ```

3. 使用注册好的组件

   ```html
   <!--这里就是MVVM中的View-->
   <div id="app">
       <!-- 使用注册好的组件-->
       <abc></abc>
   </div>
   ```

### 全局组件

1. 注册组件构造器`Vue.component()`时，第二个参数可直接传入对象，它会自动调用`Vue.extend()`方法

2. 使用`template`标签，赋值`id`，创建自定义模版。

   ```html
   <template id="info">
       <div>
           <img src="images/fm.jpg"/>
           <p>我是描述信息</p>
       </div>
   </template>
   ```

### 局部组件

在vue实例中新增**`components: {}`**
在`{}`中通过`key/vue`形式注册组件

```js
let app = new Vue({
  // 其他配置...
  components:{
   'abc': {
     // 注意点: 在创建组件指定组件的模板的时候, 模板只能有一个根元素
     template: "#info"
   }
}
})

```

### 组件中的 data 和 methods

Vue实例控制的区域相当于一个大的组件, 在大组件中可以使用data和methods。自定义的组件也是一个组件, 所以在自定义的组件中也能使用data和methods。

#### 自定义组件中data使用

在自定义组件中不能像在vue实例中一样直接使用data而是**必须通过返回函数的方式来使用data。**

```js
// 注意点：组件中使用的方式和Vue实例中不太一样
//        在自定义组件中使用data必须赋值一个函数, 然后通过函数的返回值来定义数据
data: function () {
    return {
        abcMsg: "学院"
    }
}
```

**自定义组件可以复用, 为了保证复用时每个组件的数据都是独立的, 所以必须是一个函数。**

#### 自定义组件中methods使用

#### 组件切换

1. 使用`v-if` 语句进行切换

2. 动态组件切换：

   ```html
   <!--<p v-if="isShow">我是首页</p>
   <img v-else src="images/fm.jpg" alt="">-->
   <!--<home v-if="isShow"></home>
   <photo v-else></photo>-->
   <keep-alive>		<!-- 保存缓存 -->
       <component v-bind:is="name"></component>	<!-- name 保存组件名称的变量 -->
   </keep-alive>
   ```

3. 组件添加动画，组件被包裹于`transiiton`标签中，添加动画和动画模式`mode`。

### 父子组件

组件中可以使用components，所以也可以在自定义组件中再定义其它子组件。

#### 父子组件数据传递

##### 父组件传递给子组件数据

Vue中子组件不能访问父组件的方法，如果子组件想要访问父组件的方法, 必须通过父组件传递。

1. 在父组件中通过v-bind传递数据

   传递格式 **v-bind:自定义接收名称 = "要传递数据"**

2. 在子组件中通过props接收数据

   接收格式 **props: ["自定义接收名称"]**

##### 子组件传递给父组件数据

```js
// 子组件
components: {
    "son": {
        template: "#son",
        methods: {
            sonFn(){
                // 第一个参数: 需要调用的函数名称
                // 后续的参数: 给调用的函数传递的数据
                this.$emit("parentMethod", "data");
            }
        }
    }
}
```

#### 父子组件方法传递

1. 在父组件中通过v-on传递方法：

   传递格式 v-on:自定义接收名称 = "要传递方法"

2. 在子组件中自定义一个方法在自定义方法中通过

    **this.$emit('自定义接收名称');触发传递过来的方法**

**NOTE！**：

子组件只能在定义它的父组件中使用。

#### 组件的命名

1. 注册组件的时候使用了"驼峰命名", 那么在使用时需要转换成"短横线分隔命名"
   例如: `注册时: myFather  ->  使用时: my-father`
2. **传递时方法必须写"短横线分隔命名"**
   例如: `传递时: parent-name="name" ->  接收时: props: ["parentName"]`
3. **使用传递的方法时也只能用"短横线分隔命名"**
   `@parent-say="say"  -> this.$emit("parent-say");`

## 插槽 slot

### 匿名插槽

默认情况下使用子组件时在子组件中编写的元素是不会被渲染的。如果子组件中有部分内容是使用时才确定的, 那么我们就可以使用插槽`<slot>{{默认内容}}</slot>`。插槽就是在子组件中放一个"坑", 以后由父组件来"填"。
使用时指定的内容替换整个插槽

<template id="info">
    <div>
        <header> head content</header>
        <main> main content</main>
        <slot>默认内容</slot>		<!-- 后续组件使用中，动态添加内容的匿名插槽-->
        <footer> foot content</footer>
    </div>
</template>

**注意点**: 

1. 如果有多个匿名插槽, 每一个匿名插槽都会被指定的内容替换
2. 虽然写多个匿名插槽不会报错, 但是在企业开发中推荐只能有一个匿名插槽**

### 具名插槽

具名插槽使用
通过插槽的`name`属性给插槽`slot`指定名称
在使用时可以通过slot="name"方式, 指定当前内容用于替换哪一个插槽

**注意点: 如果没有指定要替换哪个插槽中的内容, 则不会被替换**

```html
<div id="app">
    <sub-component>
        <div slot="one">追加内容1</div>	<!-- 内容指定添加给 插槽名为 one 的插槽-->
        <div slot="two">追加内容2</div>	<!-- 内容指定添加给 插槽名为 two 的插槽-->
    </sub-component>
</div>
<template id="info">
    <div>
        <header> head content</header>
        <slot name="one"> default content</slot>	<!-- 插槽名为 one -->
        <slot name="two"> default content</slot>	<!-- 插槽名为 two -->
        <footer> foot content</footer>
    </div>
</template>
```

### v-slot

`v-slot`指令是`Vue2.6`中用于替代slot属性的一个指令。在`Vue2.6`之前, 通过slot属性告诉Vue当前内容填充到哪一个具名插槽；从`Vue2.6`开始, 通过`v-slot`指令告诉Vue当前内容填充到哪一个具名插槽。

```html
<template v-slot:one>		
    <div>我是追加的内容1</div>
    <div>我是追加的内容11</div>
</template>
<template #two>			<!-- #two 等价于 v-slot:two -->
    <div>我是追加的内容2</div>
    <div>我是追加的内容22</div>
</template>
```


取代了 `slot` 和 `slot-scope`

也就是说我们除了可以通过`v-slot`指令告诉`Vue`内容要填充到哪一个具名插槽中
还可以通过`v-slot`指令告诉Vue如何接收作用域插槽暴露的数据

**`v-slot:插槽名称="作用域名称"`或`#插槽名称="作用域名城"`**

**注意点: **

1. **v-slot指令只能用在template标签上**
2. **使用#号替代v-slot**

### 作用域插槽

作用域插槽就是带数据的插槽, 让父组件在填充子组件插槽内容时也能使用子组件的数据。

使用作用域插槽

1. 在子组件`slot`中通过` v-bind:数据名称="数据名称" `方式暴露数据；
2. 在父组件中通过 `<template slot-scope="作用域名称">` 接收数据；
3. 在父组件的`<template></template>`中通过`作用域名称.数据名称`方式使用数据。