# Vue基础知识（二）



## 共享数据——Vuex

### Vuex

开发中遇到两个问题:

1. 如果想要在子组件中使用祖先组件中的数据, 那么就必须一层一层的传递(非常麻烦)
2. 兄弟组件之间不能直接传递数据, 如果兄弟组件之间想要传递数据, 那么就必须借助父组件(非常麻烦)

**Vuex就是解决方案**

`Vuex` 是 `Vue` 配套的 公共数据管理工具，我们可以将**共享的数据保存到 `Vuex`** 中，方便整个程序中的任何组件都可以获取和修改`Vuex`中保存的公共数据。

**NOTE!**

1. 必须在引入`Vue`之后再引入`Vuex`；
2. 只有需要共享的才放到`Vuex`上, 不需要共享的数据依然放到组件自身的`data`上。

### 基本使用

1. 引入`Vue`包后再引入`Vuex`包。

2. 创建`Vuex`对象

   ```js
   const store = new Vuex.Store({
       // 这里的state就相当于组件中的data, 就是专门用于保存共享数据的
       state: {
           msg: "hello, world."
       },
   });
   ```

3. 祖先组件中添加`store`的`key`保存`Vuex对象`

   只要祖先组件中保存了`Vuex对象` , 那么祖先组件和所有的后代组件就可以使用`Vuex`中保存的共享数据了

4. 在使用Vuex中保存的共享数据的时候, 必须通过如下的格式来使用

    ` <p>{{this.$store.state.msg}}</p>`，JS代码中也同样按如上用法取用。

**注意点: 在Vuex中不推荐直接修改共享数据**

### 修改数据

1. mutations: 用于保存修改共享数据的方法。

   ```js
   mutations: {
       mAdd(state){
           state.count = state.count + 1;
       },
       mSub(state){
           state.count = state.count - 1;
       }
   }
   ```

   **注意点:** 在执行mutations中定义的方法的时候, 系统会自动给这些方法传递一个state参， state中就保存了共享的数据。

2. 使用`$store.commit`方法调用。例如：

   ```js
   methods: {
     									add(){
                           // this.$store.state.count = this.$store.state.count + 1;
                           this.$store.commit("mAdd");		// 参数为 mutations 中定义的函数名
                       },
                       sub(){
                           // this.$store.state.count = this.$store.state.count - 1;
                           this.$store.commit("mSub");
                       }
                   }
   ```

### Vuex 属性

#### getters

`Vuex`的`getters`属性就和组件的计算属性一样, 会将数据缓存起来, 只有数据发生变化才会重新计算。

```js
getters: {
    format (state) {
        console.log('getter 执行 formate')
        return state.count + '次数'
    }
},
```

在组件中调用：

```html
<template id="son2">
    <div>
        son2:{{ this.$store.getters.format }}		<!-- 在 getters 中定义的 format 函数的点式调用法-->
    </div>
</template>
```



## Vue Router

`Vue Router`和`v-if/v-show`一样, 是用来切换组件的显示的；`v-if/v-show`是标记来切换`(true/false)``Vue Router`用哈希来切换(#/xxx)；比`v-if/v-show`强大的是`Vue Router`不仅仅能够切换组件的显示, 还能够在**切换的时候传递参数**。

### 基本使用

1. 导入Vue Router

   `<script src="js/vue-router.js"></script>`

2. 定义路由规则

   ```js
   const routes = [
           {
               path: '/one',
               component: one	// 定义了的 one 组件
           },
           {
               path: '/two',
               component: two	// 定义了的 two 组件
           }
       ]
   ```

   

3. 根据路由规则创建路由对象

   ```js
   const router = new VueRouter({
     routes // (缩写) 相当于 routes: routes
   })
   ```

4. 将路由对象注入到Vue实例中

   ```js
   let app = new Vue({
       el: '#app',
       router: router,	// 路由对象 注入 Vue 实例 app 中
       methods: {},
       data: {},
   })
   ```

5. 修改URL哈希值

6. 通过<router-view>标签渲染匹配的组件

#### router-link

1. Vue Router中提供了一个专门用于设置hash的标签 router-link。

2. 默认情况下Vue会将router-link渲染成a标签, 但是可以通过tag来指定渲染标签。

   ```html
   <router-link tag="button" to="/one">切换到 one 组件</router-link>	<!-- tag 指定渲染为 button-->
   ```

#### router-link设置选中样式

默认情况下可以通过重写`router-link-active`类名来实现设置选中样式，这样会覆盖默认样式。但是也可以通过在路由对象中设置`linkActiveClass`属性来指定选中样式。

```js
const router = new VueRouter({
    routes: routes,
    linkActiveClass: 'aLinkActive',		// CSS 类 .aLinkActive 的类名
})
```

#### 重定向

路由规则对象中，用`redirect`属性定义：

```js
const routes = [{
    path: '/',
    redirect: '/one'		// 重定向的目标 URL
},
                ]
```

### router 传递参数

只要将`Vue Router`挂载到了`Vue`实例对象上, 就可以通过`vue.$route`拿到路由对象。只要能拿到路由对象, 就可以通过路由对象拿到传递的参数

**方式一**: 通过URL参数参数(?key=value&key=value), 通过`this.$route.query`获取

**方式二**: 通过占位符传递     (路由规则中/:key/:key, 路径中/value/value), 通过`this.$route.params`获取

#### 嵌套路由

路由路径规则对象`VueRouter` 的参数中使用 `children` 配置：

```js
// 2.定义切换的规则(定义路由规则)
const routes = [
    // 数组中的每一个对象就是一条规则
    {
        path: '/one',
        component: one,
        children:[
            {
                // 注意点: 如果是嵌套路由(子路由), 那么不用写一级路径的地址, 并且也不用写/
                path: "onesub1",
                component: onesub1
            },
            {
                path: "onesub2",
                component: onesub2
            }
        ]
    },
  ]
```

**NOTE！**如果是嵌套路由(子路由), 那么不用写一级路径的地址, 并且也不用写斜杠`/`