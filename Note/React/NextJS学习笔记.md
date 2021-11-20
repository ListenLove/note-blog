# NextJS——为生产专门打造的 React 框架

优势：

1. 基于页面文件夹—— **pages** 的直观路由系统
2. 预渲染，包括静态生成（SSG）和服务器渲染（SSR）
3. 为了保证页面的快速展示，集成了自动代码分割功能
4. 充分利用客户端的预加载
5. 集成 CSS、Sass和 CSS-in-JS 类库
6. 基于 API Route 并使用微服务函数 打造 API 端点
7. 可扩展性

## 起步

### 项目

依赖：node >= v10.13

#### 创建 NextJS App

带有模板的项目生成：

```shell
npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"
```

切换到项目根目录下`/nextjs-blog`，命令行`next dev`进行本地运行`http://localhost:3000/`。

看到项目主页，即运行成功：

![image-20211120154647087](https://gitee.com/wencbin/pics/raw/master/images/20211120154647.png)

## 页面间导航

对 NextJS 来说，一个来自 `pages` 文件夹的被导出的 React 组件就是一个页面。





