## Blog
- [常用工具合集](.%5CBlog%5C%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7%E5%90%88%E9%9B%86.md)
## Note
### HTML5
- [# Less、SASS和Stylus等CSS预处理器](./Note/HTML5/#%20Less%E3%80%81SASS%E5%92%8CStylus%E7%AD%89CSS%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8.md)
- [CSS3](./Note/HTML5/CSS3.md)
- [HTML](./Note/HTML5/HTML.md)
- [移动端单位和适配问题](./Note/HTML5/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E5%8D%95%E4%BD%8D%E5%92%8C%E9%80%82%E9%85%8D%E9%97%AE%E9%A2%98.md)
### JavaScript
- [Echarts数据可视化](.%5CNote%5CJavaScript%5CEcharts%E6%95%B0%E6%8D%AE%E5%8F%AF%E8%A7%86%E5%8C%96.md)
- [JavaScript DOM 核心编程](.%5CNote%5CJavaScript%5CJavaScript%20DOM%20%E6%A0%B8%E5%BF%83%E7%BC%96%E7%A8%8B.md)
- [JavaScript 高级编程（一）](.%5CNote%5CJavaScript%5CJavaScript%20%E9%AB%98%E7%BA%A7%E7%BC%96%E7%A8%8B%EF%BC%88%E4%B8%80%EF%BC%89.md)
- [JavaScript 高级编程（二）](.%5CNote%5CJavaScript%5CJavaScript%20%E9%AB%98%E7%BA%A7%E7%BC%96%E7%A8%8B%EF%BC%88%E4%BA%8C%EF%BC%89.md)
- [JavaScript函数式编程](.%5CNote%5CJavaScript%5CJavaScript%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B.md)
- [jest 前端自动化测试学习笔记](.%5CNote%5CJavaScript%5Cjest%20%E5%89%8D%E7%AB%AF%E8%87%AA%E5%8A%A8%E5%8C%96%E6%B5%8B%E8%AF%95%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.md)
- [TypeScript 简明知识手册](.%5CNote%5CJavaScript%5CTypeScript%20%E7%AE%80%E6%98%8E%E7%9F%A5%E8%AF%86%E6%89%8B%E5%86%8C.md)
- [Zepto&IScroll&Swiper&Animate](.%5CNote%5CJavaScript%5CZepto&IScroll&Swiper&Animate.md)
- [网络编程](.%5CNote%5CJavaScript%5C%E7%BD%91%E7%BB%9C%E7%BC%96%E7%A8%8B.md)
### jQuery
- [jQuery 核心编程](.%5CNote%5CjQuery%5CjQuery%20%E6%A0%B8%E5%BF%83%E7%BC%96%E7%A8%8B.md)
### NodeJS
- [NodeJs 简明基础知识](.%5CNote%5CNodeJS%5CNodeJs%20%E7%AE%80%E6%98%8E%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.md)
- [Webpack 基础](.%5CNote%5CNodeJS%5CWebpack%20%E5%9F%BA%E7%A1%80.md)
### React
- [React 学习笔记](.%5CNote%5CReact%5CReact%20%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.md)
### Tools
### Vue
- [Vue3.0 学习笔记](.%5CNote%5CVue%5CVue3.0%20%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.md)
- [Vue基础知识（一）](.%5CNote%5CVue%5CVue%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%EF%BC%88%E4%B8%80%EF%BC%89.md)
- [Vue基础知识（二）](.%5CNote%5CVue%5CVue%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%EF%BC%88%E4%BA%8C%EF%BC%89.md)
### 基础知识
- [Linux基础与使用](.%5CNote%5C%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%5CLinux%E5%9F%BA%E7%A1%80%E4%B8%8E%E4%BD%BF%E7%94%A8.md)
- [快速上手 Nginx](.%5CNote%5C%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%5C%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B%20Nginx.md)
### 机器学习
- [机器学习的学习路线](.%5CNote%5C%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0%5C%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0%E7%9A%84%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF.md)
## 说明
此项目会根据用户在`Blog`和`Note`之中按目录分类相关的文档和笔记，通过编写的`node`脚本综合渲染在在项目主页目录中。适合喜欢用纯`markdown`模式下编写和管理博客笔记的同学。
- [ ] 由于当前的项目的对内容展示确实不能与`Github Pages`相比，将会提供自动打包部署到`Github Pages`的功能。
### 注意
  1. nodeJS脚本只会查找`/Blog`目录和`/Note`目录的内容
  2. 使用`Github Actions`代替人工运行脚本，需要的同学编写完毕之后，直接 push 即可哦！
  3. 每篇文章都会以`*.md`文件的文件名做标题，不会包含文件扩展名。
  4. 考虑将项目`issue`作为自己的解决各种程序bug的收集库，未来再以`issue`为基础，一并整合进入`README.MD`。
  5. `info.md`用于说明，会自动添加到`README.MD`文档底部。

以上。
