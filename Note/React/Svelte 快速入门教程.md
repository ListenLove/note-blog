# Svelte 快速入门教程

 

> 笔记来源[Svelte官网](https://svelte.dev/tutorial/basics)。

## Svelte 的优势

1. 将应用直接编译为构建完成时（build time），而非运行时（run time）；
2. 既可依靠 Svelte 开发完整项目，也可引入 Svelte 对现有代码进行增量开发；
3. 分发好的组件可作为独立包运行在任何地方，无需担忧传统框架中各种令人头疼的依赖；
4. 一个‘.svelte’文件有一个或多个组件组成
5. 可包装`CSS、HTML、JS`文件到一个‘.svelte’文件

## 数据绑定和渲染

1. 首先在`script`标签中绑定数据：

   ```html
   <script>
   	let name = 'World'
   </script>
   ```

2. 在视图（HTML）中使用大括号`{}`包裹需要渲染的数据或表达式，即可完成对数据的绑定和渲染；

   ```html
   <h1>
       Hello, {name}
   </h1>
   ```

3. 渲染结果：

   ![image-20210819173022504](https://gitee.com/wencbin/pics/raw/master/images/20210819173022.png)

### 为元素添加样式

1. 直接在当前‘.svelte’文件添加由`style`标签包裹的CSS样式，即可对元素样式进行控制：

   ```html
   <style>
   	h1 {
   	 color: red;
   	}
   </style>
   ```

2. 展示效果如图：

   ![image-20210819174350373](https://gitee.com/wencbin/pics/raw/master/images/20210819174350.png)

3.  **注意事项：**

   **样式规则是对当前文件内相关组件进行控制，将不会对文件以外的组件和元素产生影响。**

### 为App增加一个自定义组件

1. 在同级目录新建一个`Nested.svelte`文件

2. 编写组件：

   ```html
   <!--Nested.svelte-->
   <p>这是 Nested 组件段落。</p>
   ```

3. 在`App.svelte`组引入自定义 Nested 组件，并使用；

   ```html
   <!--App.svelte-->
   <p>这是 App 页面段落。</p>
   <Nested />
   <script>
   	import Nested from './Nested.svelte'
   </script>
   
   <style>
   	p {
   		color: purple;
   		font-family: 'Comic Sans MS', cursive;
   		font-size: 2em;
   	}
   </style>
   ```

4. 效果如下：

   ![image-20210819175855651](https://gitee.com/wencbin/pics/raw/master/images/20210819175855.png)

5. 不难发现，`App.svelte`样式控制代码不会影响到引入的组件样式。

### @HTML

使用特殊标记`{@html 包含HTML的字符串}`，对包含HTML内容的字符串进行渲染，**注意：Svelte 对标记没有提供任何安全管理措施，可能引发XSS攻击，慎用！**

```html
<script>
	let string = `这个字符串包含HTML内容<strong>重点来了！！！</strong>`;
</script>

<p>{@html string}</p>
```

效果：

![image-20210820100338581](https://gitee.com/wencbin/pics/raw/master/images/20210820100338.png)

## 响应式

Svelte 是一个具备响应式来保证DOM与应用数据一直同步的强大框架，比如说事件响应：

点击按钮后将按钮内的数字加一。

```svelte
<script>
	// 点击次数
	let count = 0;
	// 点击事件的响应
	function incrementCount() {
		// event handler code goes here
		count++
	}
</script>

<button on:click={incrementCount}>
	Clicked {count} {count <= 1 ? 'time' : 'times'}
</button>
```

效果如下：

![image-20210824170925766](https://gitee.com/wencbin/pics/raw/master/images/20210824170925.png)

### 响应式声明

`$: variable = stateExpression`，通过改方法获取响应式声明，但相关状态改变时会自动计算相关值，并渲染。

### $ 的作用

监听冒号后相关变量的状态改变，当相关状态发生改变时就会执行冒号后的语句。

`$: console.log(‘log some value with state’, state)`

### 更新引用类型时

因Svelte的响应式在赋值时触发，使用类似数组方法push和splice等将不会自动引起响应式的触发，需要在其后语句中使用赋值语句如`numbers = numbers`来触发。

push的简洁写法有`numbers = […numbers, newNumber]`。可尝试用使用相似的方法替换pop，shift，unshift和splice等方法。

赋值给数组和对象的属性是 ——例如`obj.foo += 1` or `array[i] = x` ——将会和赋值相同的方式作用于它们自身。

## 参数Props

从一个组件向其子组件传递数据时，在子组件中需要使用`export`关键字来声明其为参数变量。而在父组件中以DOM属性的方式将数据传递给子组件。

子组件中声明Props参数，还可轻松的设置默认值：

`export let propsValue = ‘default’; // 默认值为‘default’`

如果有一个带有属性的对象，我可以使用`析构`的方式将他们一起传递个子组件而不必分别指定每一个属性。例如：`<Info {…obj} />`。

## 逻辑控制

Svelte实现了HTML并没有实现的表达逻辑语句的方式，像传统的条件控制和循环控制。

### if

```svelte
{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{/if}

{#if !user.loggedIn}
	<button on:click={toggle}>
		Log in
	</button>
{/if}
```

### else

```svelte
{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{:else}
	<button on:click={toggle}>
		Log in
	</button>
{/if}
```

### each

```svelte
<ul>
	{#each cats as cat}
		<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
			{cat.name}
		</a></li>
	{/each}
</ul>
```

### each循环时需包含key

```svelte
{#each things as thing (thing.id)}
	<Thing name={thing.name}/>
{/each}
```

使用`(thing)`代替`(thing.id)`都可只要保证key的唯一性，无论使用的是对象、数字还是字符串都可。

### await 块

```svelte
{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
```

## 时间监听

### on:监听任何事件

```svelte
<div on:click={handleMouseClick}>
	The mouse position is {m.x} x {m.y}
</div>
```

### 内联事件响应函数写法

```svelte
<div on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}">
	The mouse position is {m.x} x {m.y}
</div>
```

其中，内联函数包裹的双引号是可去掉的。

### 提示

1. `#` 提示开启一个标签快
2.  `/` 提示关闭标签块
3.  `:` 提示连接区块

### 事件装饰

用例：

```svelte
<button on:click|once={handleClick}>
	Click me
</button>
```

- `preventDefault` — 在运行事件回调函数之前调用`event.preventDefault()`  ，以取消元素的默认行为。对在客户端处理回调的形式十分受用。
- `stopPropagation` — 调用`event.stopPropagation()`, 防止事件传播到下一元素。
- `passive` — 提高位于触摸、滚轮事件上的`scrolling`性能，Svelte会安全自动地对其进行应用
- `nonpassive` — 直接地设置 `passive: false`
- `capture` —在“捕获阶段”就触发事件响应，而不是在“冒泡阶段”。 ([MDN docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture))
- `once` — 运行响应事件回调一次之后就移除
- `self` — 当事件在其自身元素上时才能触发事件回调
- `trusted` — 仅在`event.isTrusted` 为 `true`的情况下触发响应事件。

**注意：可使用将修饰符串联使用：`on:click|once|capture={...}`**

### 组件事件

组件一样可以分发事件，只是必须先创建一个事件分发器，更新`Inner.svelte`：

```svelte
<script>
	import { createEventDispatcher } from 'svelte';
	// 注意必须在组件初始化时就立即调用，不能异步调用
	const dispatch = createEventDispatcher();

	function sayHello() {
		// 此时父组件上正在监听'message'方法
		dispatch('message', {
			text: 'Hello!'
		});
	}
</script>
```



### 组件事件前向传递

给外层组件也需添加相关监听事件元素：

```svelte
//Outer.svelte
<script>
	import Inner from './Inner.svelte';
</script>

<Inner on:message/>
```

**对DOM元素也同样有效**

## 绑定（Bindings）

按通常规则来讲，Svelte数据流是自上到下的单向流，但是在使用到诸如input等标签时，获取数据输入需要书写过多的样板代码，所以Svelte为我们提供了简化的语法糖：`<input bind:value={name}>`，直接绑定即可。

### 可编辑内容绑定

标签元素带有 `contenteditable="true"` 属性的支持`textContent` and `innerHTML` 绑定:

```html
<div
	contenteditable="true"
	bind:innerHTML={html}
></div>
```

CSS样式：

```css
[contenteditable] {
    padding: 0.5em;
    border: 1px solid #eee;
    border-radius: 4px;
}
```

### 媒体元素

 `<audio>` 和`<video>` 元素提供了一些你能狗进行绑定的属性。

标签书写示例：

```html
<video
    poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg"
    src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"
    bind:currentTime={time}
    bind:duration
    bind:paused
    on:mousemove={handleMove}
    on:touchmove|preventDefault={handleMove}
    on:mousedown={handleMousedown}
    on:mouseup={handleMouseup}>
    <track kind="captions">
</video>
```

为 `<audio>` 和 `<video>`提供的完整绑定集合由以下六个只读 *readonly* 绑定属性组成：

- `duration` (readonly) — 视频全部时间，以秒`seconds`为单位
- `buffered` (readonly) — 由 `{start, end}` 对象组成的数组
- `seekable` (readonly) — 同上
- `played` (readonly) — 同上
- `seeking` (readonly) — boolean
- `ended` (readonly) — boolean

和五个双向绑定属性组成：

- `currentTime` —视频当前播放的时间点, 以秒`seconds`为单位
- `playbackRate` —指示视频的播放速率, `1` 为 '正常播放速度'
- `paused` — 值为真时暂停
- `volume` — 音量，值在 0 和1之间
- `muted` — 值为真时静音

**video标签还有只读的`videoWidth` 和`videoHeight`绑定属性。**

### 元素维度

每一个块级元素都有`clientWidth`, `clientHeight`, `offsetWidth` 和`offsetHeight` 绑定属性：

```html
<div bind:clientWidth={w} bind:clientHeight={h}>
	<span style="font-size: {size}px">{text}</span>
</div>
```

这些绑定属性都是只读的——改变`w` 和`h`将不会由任何效果。

### this 绑定（只读）

只读的`this`绑定可作用于所有的元素和组件，并且运行你获得将渲染的元素的应用。比如我们想要获取一个`canvas`元素的应用：

```svelte
<canvas
	bind:this={canvas}
	width={32}
	height={32}
></canvas>
```

**需要注意：**状态变量`canvcas`的值在组件挂载之前一直为`undefined`，所以我们需要将相关的逻辑放置于生命周期函数`onMount`中。

### 组件绑定

和绑定元素属性一样，你可以绑定到组件的`props`。比如，我们可以绑定给`<Keypad>`组件一个`value`参数就像是一个原生表格元素一样。

```svelte
<Keypad bind:value={pin} on:submit={handleSubmit}/>
```

### 绑定至组件实例

就像绑定到DOM元素一样，你能够绑定到组件实例的本身。例如，我们能将`<InputField>`的实例绑定到一个名为`field`的参数。：

```svelte
<InputField bind:this={field} />
```

绑定至实例之后，我们就能编码和这个组件进行交互。

## 生命周期

### onMount

在组件的生命周期中，提供了少量可以帮助你在组件关键节点运行相应代码的声明周期函数。

其中使用频次最高的是在第一次渲染DOM元素后执行的`onMount`。例如，我们给`onMount`添加一个载入网络数据的处理函数：

```svelte
<script>
	import { onMount } from 'svelte';

	let photos = [];

	onMount(async () => {
		const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
		photos = await res.json();
	});
</script>
```

推荐将`fetch`放置于`onMount`中，而不是`<script>`中的顶层，因为服务端渲染（SSR）的问题。因为`onDestroy`的异常情况，在SSR过程中将无法运行声明周期函数，这意味着一旦组件挂载到 DOM 上时，我们能够避免获取应该懒加载得到的数据。

生命周期函数必须在组件初始化时调用，所以生命周期函数的回调将会绑定到组件实例上——不（说）在`setTimeout`上。

如果`onMount`的回调返回了一个函数，那么这个函数将会在组件被销毁时调用。

### onDestroy

需要在组件销毁时运行代码的话，使用`onDestroy`。

比方说，我们的定时器`setInterval`在组件初始时生成，在组件销毁时便不再需要它了，为了避免内存泄漏，我们可以使用`onDestroy`进行销毁定时器的处理。

```svelte
<script>
	import { onDestroy } from 'svelte';

	let counter = 0;
	const interval = setInterval(() => counter += 1, 1000);

	onDestroy(() => clearInterval(interval));
</script>
```

Svelte 不关心代码从何处引入的，所以推荐将定时器的逻辑放置于`utils.js`文件，然后引入到组件中进行使用：

```javascript
//utils.js
import { onDestroy } from 'svelte';

export function onInterval(callback, milliseconds) {
	const interval = setInterval(callback, milliseconds);

	onDestroy(() => {
		clearInterval(interval);
	});
}
```

```svelte
// component.svelte
<script>
	import { onInterval } from './utils.js';

	let counter = 0;
	onInterval(() => counter += 1, 1000);
</script>
```

`beforeUpdate`函数设计用于在DOM更新之前立即工作。`afterUpdate`则在`beforeUpdate`的对应于在DOM和数据同步之后开始执行相应代码。

### tick

不像其他的生命周期函数，`tick`你可以在任何时候对它进行调用。调用`tick`时，只要有任何作用域DOM元素上的`Pending state`的改变，他就会返回一个`Promise`。

所以，当你更新组件状态时，Svelte 不会立刻更新DOM。相反，它会一直等待到下一如有需要应用改变的微任务，而且包括在其他组件里的。这么做是为了避免不必要的消耗并且使得浏览器批量处理事务更为高效。

## Stores 全局状态管理

### 可写 stores

定义一个`writable` store：

```svelte
import { writable } from 'svelte/store';

export const count = writable(0);
```

#### subscribe 订阅更新

当相关的`writable` store的值变化时，与其通过`subscribe `相关联的内容也将产生变化：

```svelte
<script>
    import { count } from './stores.js';

	let count_value;

	count.subscribe(value => {
		count_value = value;
	});
</script>
```

#### set 设置值

设置`writable` store的值

```svelte
import { count } from './stores.js';
function reset() {
	count.set(0);
}
```

#### update 更新值

更新`writable` store的值

```svelte
import { count } from './stores.js';
function increment() {
	count.update(n => n + 1);
}
```

### 自动引用值

在需要引用`writable` store的值时，在 store 名字前添加一个美元符`$`：

```svelte
<script>
	import { count } from './stores.js';
	import Incrementer from './Incrementer.svelte';
	import Decrementer from './Decrementer.svelte';
	import Resetter from './Resetter.svelte';
</script>

<h1>The count is {$count}</h1>
```

### 可读 stores

并不是所有的 stores 都需要写入的，而不管谁在引用它们。当你只需要贮存鼠标位置或用户位置的时，而有没有从“外部”设置这些贮存值，都是无关紧要的。所以，Svelte 提供了可读 stores（readable stores）。

#### 初始化

`readable`第一个值为初始值，可以为`null`和`undefined`。

#### start

第二个参数为`start`函数，接受一个`set`函数作为参数，并且返回`stop`函数。

当 stores第一次被订阅者引用时`start`函数会被调用，而`stop`函数在最后一个订阅者取消引用被调用。

### derived stores

需要创建一个stores，其值与另外一个或多个 stores 相关时，使用 `derived `以满足需求。

使用案例：

```js
import { readable, derived } from 'svelte/store';

export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});

const start = new Date();

export const elapsed = derived(
	time,
	$time => Math.round(($time - start) / 1000)
);
```

另外，derived stores 可以通过显式调用`set`给 store 以赋值，而不再是返回它，这在异步生成和取用值时将十分受用。[详情查看API文档](https://svelte.dev/docs#derived)。

### 自定义 stores

一个对象只要正确的实现了`subscribe`方法，那么这个对象就是一个`store`。

所以，我们可以实现一个生产`store`对象的工厂函数：

```javascript
function createCount() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		increment: () => update(n => n + 1),
		decrement: () => update(n => n - 1),
		reset: () => set(0)
	};
}
```

### store 绑定

首先必须是可写的 store（writeable store），这样的对象才能有`set` 方法，能够让你绑定到值，急响绑定到一个原生组件的状态一样。加入 name 是一个可写 store，那么其绑定到 input 标签的写法如下：

```svelte
<input bind:value={$name}>
```

## 动态化

Svelte 提供了一些工具能够帮助你打造一些使用动画平滑交互的用户接口。

### 补间（ tweened）

将以下`progress` store 修改为补间值：

```svelte
<script>
	import { tweened } from 'svelte/motion';
	const progress = tweened(0);
</script>
```

使用动态化和补间，添加缓动函数：

```svelte
<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
</script>
```

*第一个参数应该为初始值，第二参数为可选配置*

`tweened`可用配置集合：

- `delay` ——补间开始之前多少毫秒
- `duration`—— 可以是补间过程中用毫秒表示的一段时间, 也可以是一个允许你为大量的数据改变而特指的一段更长的时间`(from, to) => milliseconds` 函数
- `easing` — a一个`p => t` 函数
- `interpolate` — 自定的 `(from, to) => t => value` 函数为在给定区间内选取的任意添加值

### spring 函数

在处理经常发生变化的值时，使用`spring`函数替代`tweened`更佳。

```javascript
let coords = spring({ x: 50, y: 50 }, {
	stiffness: 0.1,
	damping: 0.25
});
```

spring 默认设置了`stiffness` and `damping`的值，我们可以改变其默认值，对 spring 动态变化进行控制。

## 过渡

标准步骤：

1. 从模块中引入响应的过渡函数，如`import { fade } from 'svelte/transition'`
2. 在标签中使用：`<p transition:fade>Fades in and out</p>`
3. 在标签展示和隐藏过程中就可观察到过渡动画了

### 过渡函数接受参数：

```svelte
<script>
	import { fly } from 'svelte/transition';
	let visible = true;
</script>

<label>
	<input type="checkbox" bind:checked={visible}>
	visible
</label>

{#if visible}
	<p transition:fly="{{y:-20, duration: 400}}">
		Fades in and out
	</p>
{/if}
```

**注意过渡动画是可逆的，如果当过渡动画还在进行当中又快速切换动画，那么过渡便会当前点开始，而不是傻乎乎的总是从开头到结尾。**

此处简要提一下就算了，详情可[查看文档](https://svelte.dev/tutorial/transition)。









