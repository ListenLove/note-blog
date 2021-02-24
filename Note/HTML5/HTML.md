# HTML

### DTD文档声明

```html
<!DOCTYPE html>
```

## 标签

###  h 标签

```html
<h1>
  大标题 h1
</h1>
```

- 添加标题语意
- 标签系列从`<h1>~<h6>`共6个
- 企业开发中慎用`<h1>`标签（SEO原因）
- 块级标签

### p 标签

```html
<p>
  段落内容
</p>
```



- 文本语义
- 块级标签

### hr 标签

```html
<hr>
<hr/>
```

- 分割线语义
- 块级标签
- HTML5既可添加斜杠又可不添加斜杠。

### img 标签

```html
<img	src="/path/to/img">
```

- 内联标签
- `src`属性指定显示的图片资源，`source`简写
- 系统优先按照指定宽高显示图片
- `title`属性，鼠标悬停提供提示信息
- `alt`图片找不到时，显示的提示

### br 标签

```html
<br>
<br/>
```

- 另起一段换行语义
- 可连续使用

### a 标签

```html
<a href="path/to/another/uri">链接提示内容</a>
```

- 控制页面之间的跳转
- 必须要具有`href`属性
- `href`属性指定 外部URL 必须使用`http://`或`https://`
- 指定内部 URL 使用相对路径
- `target`属性
  - `_self`：指定在当前选项卡跳转页面
  - `_blank`：指定新增空白选项卡，并在此选项卡中跳转
- `title`属性：鼠标悬停是显示提示文本

#### 假链接

```html
<a href="javascrip:">点击不跳1</a>
<a href="#">点击不跳2</a>
```

- `a` 标签的`href`属性值指定为：
  - `#`
  - `javascript:`

#### 锚点

```html
<h1 id="title">h1 title</h1>
...
<a href="#title">back to h1 title</a>
```

- 必须指定目标标签`id`属性特值
- 指定点击跳转`a`标签的目标`id`属性值
- 无过渡动画
- 还可以跳转至其他页面的指定位置

### base 标签

- `target`属性：
  - `_self`：指定当前网页所有超链接在当前选项卡跳转页面
  - `_blank`：指定当前网页所有超链接新增空白选项卡，并在此选项卡中跳转
- 写在`head`标签
- 浏览器优先按照`a`标签自身属性设置选择跳转方式

### 无序列表

```html
<ul>
  <li>...</li>
  <li>...</li>
  <li>...</li>
</ul>
```

- 列表语义，无先后之分
- `ul`（**unordered list**）

### 有序列表

```html
<ol>
    <li>列表1</li>
    <li>列表2</li>
    <li>列表3</li>
</ol>
```

- 基本用法同`ul`类似
- 语义为顺序列表，列表项有先后之分

### dl 定义列表

```html
<dl>
    <dt>北京</dt>
    <dd>首都</dd>
    <dt>上海</dt>
    <dd>魔都</dd>
    <dd>沪市</dd>
</dl>
```

- 添加列表语义
- 用法与`ul/ol`基本一致
- 常在网站尾部使用和图文混排
- 定义列表项语义
- `dl`和`dt/dd`时一个整体，一般不会单独出现

#### dt 标签

- 定义列表项的标题
- 推荐一个`dt`对应一个`dd`

#### dd 标签

- 定义列表项标题的描述

### 表格标签

#### table

```html
<table>
  <caption>表格标题</caption>
  <tr>
  	<td>单元格内容</td>
  </tr>
</table>
```

- 展示数据、表格语义
- 代表整个表格
- `border`属性默认为0，不可视
- 表格宽高，默认按照内容尺寸调整
- `align`属性设置水平方向居中（`center`）等
- 外边距`cellspacing`，单元格之间的距离，默认值为`2px`
- 内边距`cellpadding`，单元格边框和文字间的距离，默认值为`1`

#### tr

- 表格中的一行数据
- `align`属性设置当前行所有内容的水平方向对齐方式，如居中`center`
- `valign`属性设置当前行所有内容的垂直方向对齐方式，如顶部`top`

#### td

- 表格一行中的一个单元格
- 单元格设置宽高，修改当前单元格宽高
- `align`属性设置当前单元格内容在水平方向的对齐方式，如居右`right`
- `valign`属性设置当前单元格所有内容的垂直方向对齐方式，如底部`bottom`

**注**：以上控制样式内容仅作了解即可

#### caption

- 设置表格标题语义
- 必须紧跟`table`标签后
- 自动居中

#### th

- 标题单元格标签
- 自动居中、加粗显示

#### tbody（了解）

- 表格主体语义

#### thead（了解）

- 表格表头语义

#### tfoot（了解）

- 表格附加、页尾信息语义

### 单元格合并

#### colspan

- 赋给指定单元格该属性的数值`n`，将此单元格视为`n`个水平单元格
- 向后合并

#### rowspan

- 给指定单元格该属性的数值`n`，将此单元格视为`n`个垂直单元格
- 向下合并

### 表单

```html
<form>
  ...
</form>
```

- 专门收集用户信息

#### input标签

- `type`属性有

  | type='{{ 值 }}' | 效果                   |      常用属性      |
  | --------------- | :--------------------- | :----------------: |
  | **text**        | 明文输入框             | value、placeholder |
  | **password**    | 暗文输入框             | value、placeholder |
  | radio           | 单选框                 |   name、checked    |
  | checkbox        | 多选框                 |   name、checked    |
  | button          | 按钮                   |       value        |
  | image           | 图片按钮               |        src         |
  | reset           | 重置按钮               |       value        |
  | submmit         | 提交按钮               |    name、value     |
  | hidden          | 隐藏域（隐匿收集信息） |    name、value     |

- 单选框和多选框指定`name`属性同组的值一致

- 除按钮标签外都通过`value`属性指定提交的数据

#### label标签

- 文字和输入框绑定，形成整体
- `label`包裹文字
- 输入框添加`id`属性
- `label`添加`for`属性指定输入框的`id`值

#### select



- 下拉列表语义

##### option标签

- `select`下拉列表中的选项
- `selected`属性指定默认值
- `opationgroup`子标签分组`option`标签

#### textarea

- 多行文本输入框，默认可无限换行
- `cols`和`rows`可指定文本框行数和列数
- 默认可手动拉伸

### fieldset（了解）

- 表单边框语义

#### legend（了解）

- 表单标题标签语义

## HTML5 新增标签

### video

```html
<vidio src="path/to/uri"></vidio>
```

- 播放视频语义
- `autoplay='autoplay'`属性，让视频自动播放
- `controls='controls'`属性，显示视频控制条
- `poster='path/to/cover'`属性，视频播放前的封面图片
- `loop='loop'`属性，循环播放
- `preload`属性，预先加载视频；**注**：`preload`属性在`autoplay`属性设置下失效
- `muted='muted'`属性，视频静音
- `width`&`height`属性，视频播放器宽高

#### 第二种格式

```html
<video>
  <source type='' src='path/to/uri'></source>
  <source type='' src='path/to/uri'></source>
</video>
```

- **浏览器适配**：不同的`source`指定不同的视频格式，浏览器选择能够播放的视频格式播放

### audio

```html
<audio src='path/to/uri'></audio>
<!--第二种方式-->
<audio>
  <source src='path/to/uri' type=''></source>
</audio>
```

- 音频标签语义
- `autoplay='autoplay'`属性，让音频自动播放
- `controls='controls'`属性，显示音频控制条
- `loop='loop'`属性，循环播放
- `preload`属性，预先加载音频；**注**：`preload`属性在`autoplay`属性设置下失效
- `muted='muted'`属性，音频静音

### detail & summary

```html
<details>
	<summary>概要信息</summary>
  详情信息
</details>
```

- `summary`标签概要信息语义，`details`标签详情信息语义
- 默认情况下，详情信息折叠

### marquee（非W3C）

```html
<marquee>
	...content
</marquee>
```

- 跑马灯效果语义
- `direction='right'`：从左往右滚动；`direction='up'`从上往下滚动
- `scrollamount='100'`：内容滚动速度，值越大越快
- `loop='3'`：循环次数：3
- `behavior='slide'`：滚动类型，至边界停止；`behavior='alternate'`：滚动到边界反弹

### div

> 配合CSS完成网页的基本布局

- 块级元素

### span

> 配合CSS完成网页的局部布局

- 内联元素

## 被废弃的标签

> HTML标签中只能用来添加语义，而删除过去用来添加样式的标签

~~br、hr、font、b、u、i、s~~：无语义

`strong,ins,em,del`有语义

- **strong**: 强调文字语义
- **ins**(insted)：插入文字语义
- **em**(emphasized )：强调的文字
- **del**：被删除的文字

## 字符实体

> HTML会将空格、回车和tab多个当一个处理

通过HTML的保留字符，在页面中处理以上以上问题

例如：

`&nbsp;`空格，有多少个`&nbsp;`，就会当作多少个空格处理

































