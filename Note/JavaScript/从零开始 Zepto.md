## Zeptop





### 概述

1. Zepto 是一个轻量级的针对现代高级浏览器的 JavaScript库，和`jQuery`类似。

2. jQuery更多是在PC端被应用，Zepto更多是在移动端被应用；Zepto 体积更小

3. Zepto专门用于移动端的轻量级的jQuery

    官方网址:

    [英文版](http://zeptojs.com/)
    [中文版](http://www.css88.com/doc/zeptojs_api/)

    

### 特点

Zepto采用了模块化的开发, 将不同的功能放到了不同的模块中,在使用的过程中按需导入。

### 选择器

要实现高级选择器需引入[selector](https://github.com/madrobby/zepto/blob/master/src/selector.js#files)，实验性的支持 [jQuery CSS 表达式](https://www.css88.com/jqapi-1.9/category/selectors/jquery-selector-extensions/) 实用功能，比如 `$('div:first')`和 `el.is(':visible')。

### 事件

要想监听事件，需引入[event](https://github.com/madrobby/zepto/blob/master/src/event.js#files)，通过`on()`& `off()`处理事件。

### 动画

Zepto通过CSS3来实现动画

需要实现动画，需引入[fx](https://github.com/madrobby/zepto/blob/master/src/fx.js#files)，执行The `animate()`方法。

需要以动画形式的 `show`, `hide`, `toggle`, 和 `fade*()`方法，引入[fx](https://github.com/madrobby/zepto/blob/master/src/fx.js#files)。

### touch

企业开发中如果需要在移动端监听点击事件, 一般不会使用click来监听，而会使用`tap`事件。 tap事件是Zepto自己封装的一个事件, 解决了原生click事件100~300毫秒的延迟问题。

### tap

```javascript
// 务必引入 touch 模块，方可使用 tap
$('button').tap(function () {
    console.log('clcked button')
})
```

### touch事件传递参数对象

- `touches`:  当前屏幕上所有手指的列表
- `targetTouches`:  保存了元素上所有的手指里列表
- `changedTouches`: 当前屏幕上刚刚接触的手指或者离开的手指

### 移动端"点透问题"

当一个元素放覆盖了另一个元素，覆盖的元素监听touch事件,而下面的元素监听click事件，并且touch事件触发后覆盖的元素就消失了, 那么就会出现点透问题。

解决方案是阻止事件扩散：

1. 在touch事件中添加`event.preverDefault() 来`阻止事件扩散
2. 使用Zepto新版本。
3. 使用Fastclick插件。

### swipe

#### swipe

监听滑动事件

#### 四个方向滑动

```javascript
$("div").swipeLeft(function () {
    // console.log("向左边轻扫");
});
$("div").swipeRight(function () {
    // console.log("向右边轻扫");
 
});
$("div").swipeUp(function () {
    // console.log("向上边轻扫");
});
$("div").swipeDown(function () {
    // console.log("向下边轻扫");
});
```

### 为 Zepto 添加插件方法

```javascript
;(function($){
  $.extend($.fn, {
    foo: function(){
      // `this` refers to the current Zepto collection.
      // When possible, return the Zepto collection to allow chaining.
      return this.html('bar')
    }
  })
})(Zepto)
```



## IScroll

iScroll是一个高性能，资源占用少，无依赖，多平台的javascript滚动插件。iScroll不仅仅是滚动。在你的项目中包含仅仅4kb大小的iScroll，能让你的项目便拥有滚动，缩放，平移，无限滚动，视差滚动，旋转功能。

### IScroll 基本用法

1. 按照iScroll的规定搭建HTML结构

   ```html
   <!-- 最佳结构为 -->
   <div>
    	<ul>
       <li>...</li>
      <!-- ... -->   
       <li>...</li>
     </ul>
   </div>
   ```

   

2. 文件导入iScroll模块

3. 创建iScroll对象, 告诉它谁需要滚动

   ```javascript
   let someScroll = new IScroll('selector');	// 给选择器 selector 指定元素添加基本的 IScroll 功能
   ```

### 进阶用法

1. 传入第二个参数对象，对象中写入属性-值对，可自定功能。

   ```javascript
   var myScroll = new IScroll('selector', {
       scrollbars: true,		// 添加滚动条
     	snap: true，				 // 按照页面容器的大小自动分割滚动条
   });
   ```

2. 事件

   - **`beforeScrollStart`**，在用户触摸屏幕但还没有开始滚动时触发。
   - **`scrollCancel`**，滚动初始化完成，但没有执行。
   - **`scrollStart`**，开始滚动
   - **`scroll`**，内容滚动时触发，只有在`scroll-probe.js`版本中有效，请参考[onScroll event](https://iiunknown.gitbooks.io/iscroll-5-api-cn/content/customevents.html#onscroll)。
   - **`scrollEnd`**，停止滚动时触发。
   - **`flick`**，用户打开左/右。
   - **`zoomStart`**，开始缩放。
   - **`zoomEnd`**，缩放结束。

   ```javascript
   // 使用on(type, fn)方法注册事件。
   myScroll = new IScroll('selector');
   myScroll.on('scrollEnd', doSomething);	// 每次滚动停止时执行 doSomething 方法
   ```

## Swiper

**Swiper**是纯**javascript**打造的滑动特效插件，面向PC、平板电脑等移动终端。Swiper能实现触屏焦点图、触屏Tab切换等常用效果。Swiper**开源、免费、稳定、使用简单、功能强大，是架构移动终端网站的重要选择！**

[Swiper首页](https://www.swiper.com.cn/)

### 基本用法

1. 引入swiper对应的css和js文件

   首先加载插件，需要用到的文件有swiper-bundle.min.js和swiper-bundle.min.css文件，不同[Swiper版本](https://www.swiper.com.cn/about/us/index.html#version-different)用到的文件名略有不同。可下载[Swiper文件](https://www.swiper.com.cn/download/index.html#file1)或使用[CDN](https://www.swiper.com.cn/cdn/index.html)。

2. 按照框架的需求搭建三层结构

   <div class="swiper-container">     
     <div class="swiper-wrapper">         
       <div class="swiper-slide">Slide 1</div>         
       <div class="swiper-slide">Slide 2</div>         
       <div class="swiper-slide">Slide 3</div>     
     </div>     
     <!-- 如果需要分页器 -->     
     <div class="swiper-pagination"></div>          
     <!-- 如果需要导航按钮 -->     
     <div class="swiper-button-prev"></div>    
     <div class="swiper-button-next"></div>         
     <!-- 如果需要滚动条 -->    
     <div class="swiper-scrollbar"></div> 
   </div> 
   <!-- 导航等组件可以放在container之外 -->

3. 创建一个Swiper对象, 将容器元素传递给它

   ```javascript
   var mySwiper = new Swiper ('.swiper-container', {
       direction: 'vertical', // 垂直切换选项
       loop: true, // 循环模式选项
       
       // 如果需要分页器
       pagination: {
         el: '.swiper-pagination',
       },
       
       // 如果需要前进后退按钮
       navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
       },
       
       // 如果需要滚动条
       scrollbar: {
         el: '.swiper-scrollbar',
       },
     })
   ```

   

### 进阶用法

1. 重写（覆盖）Swiper CSS 样式的类名，可以自定义样式
2. 初始化时传入第二对象参数，设置`Swiper`诸如`自动滑动切换`、`滑动动画时长`等属性值
3. 未来企业开发中可直接使用`Swiper`类库实现轮播图等效果，不必写业务代码，只需要按照API文档配置需要的配置即可

### Swiper animate

1. 使用Swiper Animate需要先加载[swiper.animate.min.js](https://www.swiper.com.cn/download/index.html#file8)和[animate.min.css](https://www.swiper.com.cn/download/index.html#file9)。

2. 初始化时隐藏元素并在需要的时刻开始动画。

   ```javascript
   //Swiper5   
     var mySwiper = new Swiper ('.swiper-container', {     
       on:{       
         init: function(){         
           swiperAnimateCache(this); 
           //隐藏动画元素          
           swiperAnimate(this); //初始化完成开始动画      
         },        
         slideChangeTransitionEnd: function(){         
           swiperAnimate(this); //每个slide切换结束时也运行当前slide动画         
           //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名       
         }      
       }   
    })    
   ```

3. 在需要运动的元素上面增加类名 **ani**  ，和其他的类似插件相同，`Swiper Animate`需要指定几个参数：

   `swiper-animate-effect`：切换效果，例如 fadeInUp 
   `swiper-animate-duration`：可选，动画持续时间（单位秒），例如 0.5s
   `swiper-animate-delay`：可选，动画延迟时间（单位秒），例如 0.3s

   

   ```html
   <div class="swiper-slide">
   <p class="ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="0.5s" swiper-animate-delay="0.3s">内容</p>
   </div>
   ```

4. 还可根据`swiper.animate.min.css`中的动画效果类名，在本地自定义实现自定义动画效果：

   ```css
   /*swiper.animate.min.css*/
   @keyframes fadeInLeft {
       0% {
           opacity: 0;
           -webkit-transform: translate3d(-100%,0,0);
           -ms-transform: translate3d(-100%,0,0);
           transform: translate3d(-100%,0,0)
       }
   
       100% {
           opacity: 1;
           -webkit-transform: none;
           -ms-transform: none;
           transform: none
       }
   }
   /*myAnimate.css*/
   @keyframes fadeInLeft {
               0% {
                   opacity: 0;
                   transform: translate3d(-100%, 0, 0) scale(2);
               }
   
               100% {
                   opacity: 1;
                   transform: scale(0.5);
               }
           }
   ```

   

## Animate.CSS

wiper-animate就是参考Animate.css演变出来的一个插件,Animate.css和swiper-animate一样都是用于快速添加动画。

[Animate中文网](http://www.animate.net.cn/)

### 基本用法

1. 引入animate.css的文件

   ```html
    <link rel="stylesheet" href="animate.min.css">
   ```

2. 给需要执行动画的元素添加类名

   1.如果说想给某个元素动态添加动画样式，可以通过`jQuery`来实现：

   

   ```js
   $('#yourElement').addClass('animated bounceOutLeft');
   ```

   2.当动画效果执行完成后还可以通过以下代码添加事件

   ```js
   $('#yourElement').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', doSomething);
   ```

   3.你也可以通过 JavaScript 或 jQuery 给元素添加这些 class，比如：

   ```js
   $(function(){
       $('#yourElement').addClass('animated bounce');
   });
   ```

   4.有些动画效果最后会让元素不可见，比如淡出、向左滑动等等，可能你又需要将 class 删除，比如：

   ```js
   $(function(){
       $('#yourElement').addClass('animated bounce');
       setTimeout(function(){
           $('#yourElement').removeClass('bounce');
       }, 1000);
   });
   ```

   5.animate.css 的默认设置也许有些时候并不是我们想要的，所以你可以重新设置，比如：

   ```css
   #yourElement {
       animate-duration: 2s;    //动画持续时间
       animate-delay: 1s;    //动画延迟时间
       animate-iteration-count: 2;    //动画执行次数
   }
   ```

   **注意**：添加类名时一定要先添加基类**`animated`**。

3. 若预定义样式不满足需求，可搜索Animate.CSS 文件内预定义的类名，后复制到本地进行自定义修改，得到需要的样式。

其他类库可供参考使用：

[WOWJS](https://wowjs.uk/)

