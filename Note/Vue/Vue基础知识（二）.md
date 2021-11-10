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

   **注意点:** 在执行mutations中定义的方法的时候, 系统会自动给这些方法传递一个state参数， state中就保存了共享的数据。

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

`Vue Router`和`v-if/v-show`一样, 是用来切换组件的显示的；`v-if/v-show`是标记来切换`(true/false)`.`Vue Router`是用哈希来切换(#/xxx)；比`v-if/v-show`强大的是`Vue Router`不仅仅能够切换组件的显示, 还能够在**切换的时候传递参数**。

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

6. 通过`<router-view>`标签渲染匹配的组件

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
                // 注意点: 如果是嵌套路由(子路由), 那么不用写一级路径的地址, 并且也不用写'/'
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

### 命名视图

和匿名插槽类似，路由地址匹配之后多个`router-view`会提供同样的视图显示出口，但通过指定不同的命名属性，`router-view`将会提供指定命名的视图出口。

```html
<router-view name="name1"></router-view>	<!-- 在路径规则对象中的 components 属性定义命名值 components: { name1: one // one 视图赋给 name1 key}-->
```

## Vue 生命周期

![Vue 实例生命周期](https://cn.vuejs.org/images/lifecycle.png)

### 创建期间的生命周期方法

​    `beforeCreate`: 仅仅表示Vue实例刚刚被创建出来,此时此刻还没有初始化Vue实例中的数据和方法, 所以无法访问Vue实例中保存的数据和方法。  
​    `created`: 最早能够访问Vue实例中保存的数据和方法的地方。  
​    `beforeMount`:Vue已经编译好了模板, 但是还没有将模板渲染到界面上。  
​    `mounted`:Vue已经完成了模板的渲染, 表示可以拿到界面上渲染之后的内容。  

### 运行期间的生命周期方法

​    `beforeUpdate`: 表示Vue实例中保存的数据已被修改，**注意点**：只有保存的数据被修改了才会调用beforeUpdate, 否则不会调用；在调用beforeUpdate的时候, 数据已经更新了, 但是界面还没有更新。
​    `updated`: 表示Vue实例中保存的数据已被修改, 并且界面也同步了修改的数据。

### 销毁期间的生命周期方法

​    `beforeDestroy`:表示当前组件即将被销毁，**注意点**: 只要组件不被销毁, 那么`beforeDestroy`就不会调用；`beforeDestroy`是我们最后能够访问到组件数据和方法的生命周期方法。
​    `destroyed`：表示当前组件已经被销毁，注意点: 只要组件不被销毁, 那么`destroyed`就不会调用；不要在`destroyed`生命周期方法中再去操作组件的数据和方法。

## Vue-CLI

#### 基本使用

[Vue-CLI使用指南](https://cli.vuejs.org/zh/guide/)

1. 安装

   `npm install -g @vue/cli`

2. 检查是否安装成功

   `vue —version`：输出为：`@vue/cli 4.5.9`类似信息时表明安装成功

3. 开始一个项目名为'my-project'的新项目

   ` vue create my-project`

4. 根据需要选择`vue`自动提供的配置选项

5. 根据手动配置选项及其他配置选择生成如下项目结构：

   > └── my-project	根目录
   >
   > ​	｜—— node_modules 	存储了依赖的相关的包
   >
   > ​    ├── public	               静态资源都会被简单的复制,不经过webpack,需要通过绝对路径来引用
   > ​    └── src		               代码文件夹
   > ​        ├── assets	           存储项目中自己的一些静态文件(图片/字体等)
   > ​        ├── components	 存储项目中的自定义组件(小组件,公共组件)
   > ​        ├── router				存储VueRouter相关文件
   > ​        ├── store				 存储Vuex相关文件
   > ​        └── views			   存储项目中的自定义组件(大组件,页面级组件,路由级别组件)
   >
   > ​		|----App.vue			    根组件
   > ​		|----main.js			      入口js文件	

6. 在项目根目录下运行：

   `npm run serve`

7. build 构建项目：

   `npm run build`

### 修改 Vue-CLI 配置

Vue-CLI对webpack原有的属性进行了一层封装。

1.  如果需要修改webpack的配置可以在项目中新建一个`vue.config.js`的文件；

2. 查询Vue-CLI的封装是否能够满足需求，

   1. 如果可以满足需求, 那么就使用`Vue-CLI`（[配置参考](https://cli.vuejs.org/zh/config/)）封装的属性来修改`webpack`的配置

   2. 如果不可以满足需求, 那么可以通过`configureWebpack`的属性来编写原生的webpack配置

      ```js
      // vue.config.js
      const webpack = require('webpack')
      module.exports = {
        // 选项...
        outputDir: 'bundle',	// 封装的 outputDir 属性
        configureWebpack: {		// 原生的 webpack 配置编写处
          plugins: [
            new webpack.BannerPlugin({
              banner: 'hello, world www.GitHub.com'
            })
          ]
        }
      }
      ```



## [ElementUI](https://element.eleme.cn/#/zh-CN)

### 基本用法

1. npm 安装
   推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

   `npm i element-ui -S`

2. [快速上手](https://element.eleme.cn/#/zh-CN/component/quickstart)

   **完整引入**

   在 main.js 中写入以下内容：

   ```javascript
   import Vue from 'vue';
   import ElementUI from 'element-ui';
   import 'element-ui/lib/theme-chalk/index.css';
   import App from './App.vue';
   
   Vue.use(ElementUI);
   
   new Vue({
     el: '#app',
     render: h => h(App)
   });
   ```

   以上代码便完成了 Element 的引入。需要注意的是，**样式文件需要单独引入**。

   **按需引入**

   借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

   首先，安装 babel-plugin-component：

   ```bash
   npm install babel-plugin-component -D
   ```

   然后，将 .babelrc 修改为：

   ```json
   {
     "presets": [["es2015", { "modules": false }]],	/* Vue-CLI设置该属性的默认值，不需要再修改*/
     "plugins": [
       [
         "component",
         {
           "libraryName": "element-ui",
           "styleLibraryName": "theme-chalk"
         }
       ]
     ]
   }
   ```

   接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

   ```javascript
   import Vue from 'vue';
   import { Button, Select } from 'element-ui';
   import App from './App.vue';
   
   Vue.component(Button.name, Button);
   Vue.component(Select.name, Select);
   /* 或写为
    * Vue.use(Button)
    * Vue.use(Select)
    */
   
   new Vue({
     el: '#app',
     render: h => h(App)
   });
   ```

   完整组件列表和引入方式（完整组件列表以 [components.json](https://github.com/ElemeFE/element/blob/master/components.json) 为准）

3. 在[组件](https://element.eleme.cn/#/zh-CN/component)中选取适合的样式、复制对应代码使用框架

## [MintUI](https://mint-ui.github.io/#!/zh-cn)

MintUI基本使用与 ElementUI 的使用相似，此处不在赘述。

[MIntUI 快速上手](https://mint-ui.github.io/docs/#/zh-cn/quickstart)

[特别适于制作移动端电商平台页面的有赞UI框架 Vant](https://youzan.github.io/vant/#/zh-CN/)

## Vue 插件使用

### [开发插件](https://cn.vuejs.org/v2/guide/plugins.html#开发插件)

> 插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：
>
> 1. 添加全局方法或者 property。如：[vue-custom-element](https://github.com/karol-f/vue-custom-element)
> 2. 添加全局资源：指令/过滤器/过渡等。如 [vue-touch](https://github.com/vuejs/vue-touch)
> 3. 通过全局混入来添加一些组件选项。如 [vue-router](https://github.com/vuejs/vue-router)
> 4. 添加 Vue 实例方法，通过把它们添加到 `Vue.prototype` 上实现，实例方法名以美元符`$`开头。
> 5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 [vue-router](https://github.com/vuejs/vue-router)

### 使用 Component 方法

1. 项目`src`目录下新建`plugins`目录，在`plugins`中再新建插件名目录，编写相应的`vue`组件和`index.js`（插件核心文件）。

2. 在插件`index.js`文件中中必须使用`install`方法注册当前的插件，之后在根组件中才能使用`Vue.use`方法全局使用封装好的插件。

   ```js
   import Vue from 'vue'
   import pluginName from './pluginName'		// 此处引入的还是 Vue Component 文件
    
   export default {
     install: function () {
       Vue.component(pluginName.name, pluginName)
     }
   }
   ```

3. 在项目运行入口文件中（一般是`main.js`）进行注册：

   ```js
   import pluginName from './plugins/pluginName/index'	// 此处引入的插件核心文件 index.js
   Vue.use(pluginName)		// 注册插件，之后即可全局使用该插件
   ```

### 组件生成构造函数方法

```js
install: function (Vue, Options) {
    // Vue.component(Loading.name, Loading)

    // 1.根据我们的组件生成一个构造函数
    let LoadingContructor = Vue.extend(Loading)
    // 2.根据构造函数创建实例对象
    let LoadingInstance = new LoadingContructor()
    // 3.随便创建一个标签(元素)
    let oDiv = document.createElement('div')
    // 4.将创建好的标签添加到界面上
    document.body.appendChild(oDiv)
    // 5.将创建好的实例对象挂载到创建好的元素上
    LoadingInstance.$mount(oDiv)

    // console.log(Options)
    // console.log(LoadingInstance.title)
    // 添加初始化值
    if (Options && Options.title !== null && Options.title !== undefined) {
      LoadingInstance.title = Options.title
    }
    // 添加全局方法
    Vue.showLoading = function () {
      LoadingInstance.isShow = true
    }
    Vue.hiddenLoading = function () {
      LoadingInstance.isShow = false
    }
    // 添加实例方法，注意实例方法名必须以美元符 $ 开头
    Vue.prototype.$showLoading = function () {
      LoadingInstance.isShow = true
    }
    Vue.prototype.$hiddenLoading = function () {
      LoadingInstance.isShow = false
    }
  }
```



 









