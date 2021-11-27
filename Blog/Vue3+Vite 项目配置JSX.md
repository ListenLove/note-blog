# Vue3 + Vite 项目配置 JSX

## 起步

## 项目基础配置

以 Vite 作为项目工程化工具的项目可用。

## 插件下载

`npm install -D @vitejs/plugin-vue-jsx`

[插件基本使用](https://github.com/vuejs/jsx-next)

## 配置

### jsx 插件配置

在`vite.config.js`中配置启用下载的 JSX 插件,以及推荐配置.

```js
// vite.config.js 
import {defineConfig} from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
    // ...
    plugins: [vue(), svgBuilder('./src/assets/icons/svg/'), vueJsx({
        transformOn: true,		// 将时间绑定方式进行转换 on: { click: xx } to onClick: xxx
        mergeProps: false,		// 设置不要把  class / style 属性 / onXXX 等合并为一个对象
    })],
    // ...
})
```

### jsx 组件编写示例

此时vue组件的编写将不再依赖 Vue 原生的`.vue`文件而新建`.jsx`文件编写组件成为启用 jsx 配置的关键步骤.

示例:

文档路径:`src/components/JSXTestComp/`

组件文件:`index.jsx`

组件名称:`JSXTestComp`

```jsx
// src/components/JSXTestComp/index.jsx
import {defineComponent, ref} from "vue";

export default defineComponent({
    name: "JSXTestComp",
    props: {
        propsCount: {
            type: Number,
            default: 10,
        }
    },
    setup(props, {emit}) {
        const useCounts = ((num = 0) => {
            const counts = ref(num)
            const setCounts = (newNumber) => {
                counts.value = newNumber
            }
            return {
                counts, setCounts
            }
        })
        const {counts, setCounts} = useCounts(props.propsCount)
        const myButton = <a-button type="primary" shape="round" onClick={() => setCounts(++counts.value)}>	// a-button 来自于 antdv UI 框架,已全局配置完成
           NUMBERS ADD ONE
        </a-button>

        return () => <>
            <h1>NUMBERS: {counts.value}</h1>
            <myButton/>
        </>
    }
})
```

### 编写通用 jsx 组件的注意点 :heavy_exclamation_mark:

1. 请务必使用 **defineComponent** 方法编写组件
2. 请务必将编写的通用组件进行默认导出
3. 可在 **setup** 中将 **JSX 代码包装的箭头函数**返回作为组件的模板代码,也可在 setup 属性方法同级作用域内定义 **render** 属性方法中**直接返回 JSX 代码**作为作为组件的模板.

## 样式文件设置

直接在 jsx 组件文件中引入相关的样式文件如 scss 文件是有效的,但是直接引入的样式文件将会带来引入的样式文件污染全局样式的问题,为保证样式文件的限制于引入文件的局部,我推荐采用`css module`的样式引入方法.

### 集成相关插件

vite 是原生集成的`css module` ,我们只需将它启用即可,在`vite.config.js`中配置 CSS 相关配置:

```js
// vite.config.js 
import {defineConfig} from 'vite'
export default defineConfig({
    // ...
    css: {
        preprocessorOptions: {
            scss: {
                // 全局引入基本样式规范文件
                additionalData: `@import './src/styles/standard-style.scss';`
            },
        },
        // vite 原生集成的 css module 启用
        modules: {
            // generateScopedName: '[name]_[locale]_[hash:base64]',	// 生成的作用域命名
            // hashPrefix: 'prefix',								// 是否加入 hash 前缀
            requireModuleExtension: true,	// 启用后，后续编写样式文件需以 .module.scss结尾
        }
    },
    // ...
})
```

启用`css module`配置后,后续编写样式文件需以`.module.scss`(以 scss 为例).

示例:

样式文件路径:`src/components/JSXTestComp/`

样式文件:`index.module.scss`

```scss
// index.module.scss
.test-title {
  color: red;
  transition: background-color .5s ease-in-out;
  &:hover {
    background-color: #B2C7E2FF;
  }
}
```

### 组件中引入样式文件示例

继续以组件**JSXTestComp**为例:

```jsx
import {defineComponent, ref} from "vue";
import styles from './index.module.scss'

export default defineComponent({
    name: "JSXTestComp",
    props: {
        propsCount: {
            type: Number,
            default: 10,
        }
    },
    setup(props, {emit}) {
        const useCounts = ((num = 0) => {
            const counts = ref(num)
            const setCounts = (newNumber) => {
                counts.value = newNumber
            }
            return {
                counts, setCounts
            }
        })
        const {counts, setCounts} = useCounts(props.propsCount)
        const myButton = <a-button type="primary" shape="round" onClick={() => setCounts(++counts.value)}>
            ADD ONE
        </a-button>

        return () => <>
            <h1 className={styles['test-title']}>NUMBERS: {counts.value}</h1>
            <myButton/>
        </>
    }
})
```

### 引入样式文件注意点:exclamation:

1. `import styles from './index.module.scss'`以`css module`方式引入
2. 标签中的类属性不再是`class`而是`className`
3. 绑定对应样式类方法为:`className={styles['test-title']}`,可简单视为获取引入的样式对象属性

## 结尾

配置好相关 JSX 配置后,接下来就可采用 React Hooks 组合式编程的范式编写 Vue 代码.











 

