# JavaScript DOM 核心编程

## 获取元素和设置属性

### 节点的属性

![image-20201006143934782](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20201006143934782.png)

### 获取DOM中的元素

DOM方法可获取元素节点，分别是通过元素ID、通过标签名字、通过类名字和选择器等 来获取。

1. **`getElementById`**

   `document.getElementById(id)`取得对应`id`元素节点，返回相应的对象。

2. **`getElementsByTagName`**

   `element.getElementsByTagName(tag)`方法返回一个对象数组，每个对象分别对应着文档里有着给定标签的一个元素。

3. **`getElementsByClassName`**

   `getElementsByClassName(class)`返回一个具有相同类名的元素的数组。

4. **`getElementsByName`**

   `getElementsByName(name)`通过`name`属性获取元素节点对象的数组。

5. **`querySelector(selecterStr)`**

   `querySelector`方法传入选择器字符串为参数，返回查询得到的第一个元素节点对象。

6. **`querySelectorAll(selecterStr)`**

   `querySelectorAll`方法传入选择器字符串为参数，返回查询得到的元素节点对象数组。

### 获取元素节点的子节点

1. **`getElementsByTagName()`**

   **方法**——返回当前节点的指定标签名后代节点。

2. **`childNodes`**

   属性——表示当前节点的所有子节点

3. **`firstChild`**

   属性——表示当前节点的第一个子节点

4. **`lastChild`**

   属性——表示当前节点的最后一个子节点

### 获取父节点和兄弟节点

1. **`parentNode`**

   **属性**——表示当前节点元素的父节点

2. **`previousSibling`**

   **属性**——表示当前节点的前一个兄弟节点。

3. **`nextSibling`**

   属性**——表示当前节点的后一个兄弟节点。



### 设置属性

`getAttribute`方法就是用来获取元素属性。相应地，`setAttribute`方法则可以更改属性节点的值。

1. **`object.getAttribute(attribute)`**，只能通过元素节点对象调用。
2. **`object.setAttribute(attribute,value)`**，对属性节点的值做出修改，只能用于元素节点。 

## 事件

用户与浏览器之间的交互行为，比如：点击、鼠标移动、关闭窗口等等。

1. 获取对应元素对象
2. 对应事件绑定处理函数
3. 当事件触发时，绑定的处理函数将被调用。 

### 事件对象

当事件的响应函数出发时，浏览器都会将一个时间函数作为实参传递进响应函数。

示例：event作为形参，作为事件对象传入响应函数。（以下示例不适用IE8及以下，IE8使用`window`全局对象的属性`window.event`获取。）

![image-20201009114322590](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20201009114322590.png)

### 事件冒泡

冒泡（Bubble）是指当后代元素上的事件被触发时，其**祖先元素**的**相同事件**也会被触发。

如果不希望发生冒泡，可使用事件对象进行取消。：**`event.cancelBubble = true;`**

### 事件的委派

 只绑定一次事件，可应用于多元素上。

> 将事件绑定到元素共同的祖先元素上，当后代元素上的事件触发时，会一直冒泡到祖先元素响应事件。这便是事件**委派**。

核心内容：

- 事件对象`event.target`返回触发事件的元素。

### 事件的绑定

1. **`addEventListener(事件名，响应函数，布尔值)`**，绑定多个相同事件到同一个元素节点。触发事件后按绑定顺序执行。
2. **`attachEvent(事件名，响应函数)`**，只限在IE8及以下浏览器中使用。绑定多个相同事件到同一个元素节点，触发事件后按**绑定顺序逆序执行**。
3. 注意：`序号1`方 法事件名不要带`on`。
4. **`return false;`**取消对应事件的默认行为。
5. **`event.preventDefault()`**事件对象方法，取消在`addEventListener()`中定义事件的默认行为。

 

## 在 DOM 中创建和修改元素

应用 DOM 方法完成创建元素、创建文本节点、删除元素节点。

1. **`createElement(tagName)`**

   创建一个元素节点对象并返回，参数`tagName`是标签名的字符串。

2. **`createTextNode(textContent)`**

   创建一个文本节点对象并返回，参数`textContent`为文本内容字符串。

3. **`appendChild(childNode)`**

   **方法**——元素节点方法，父节点添加`childNode`子节点。

4. **`insertBefore(newChild, refChild)`**

   **方法**——父节点调用方法，可以在指定的`refChild`前插入新节点`newChild`。

5. **`replaceChild(newChild, oldChild)`**

   **方法**——父节点调用，指定`newChild`节点替换`oldChild节点。`

6. **`removeChild(child)`**

   **方法**——父节点调用，删除置顶的子节点`child`。

7. **`parentNode`**

   **属性**——子节点调用方法，返回该节点的父节点。  

## 获取和修改元素 CSS 样式

在 JavaScript 中使用 `元素.style.样式名`获取该元素内联样式值，如果对 `元素.style.样式名`赋值将会赋给该元素相应的样式值。类似的还有如下元素样式属性：

1. **`元素.currentStyle.样式名`**(仅IE兼容)

   读取当前元素**正在显示**的样式。**read only**

2. **`getComputedStyle(样式元素，伪类元素)`**（不支持IE8及以下）

   **window**方法，传入要获取的样式元素和一个伪类元素（一般传`null`），返回**封装了当前元素样式的对象**。**read only**

3. 另外还有：

   1.  ![image-20201008183151952](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20201008183151952.png)
   2. ![image-20201008223517046](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20201008223517046.png)
   3. ![image-20201008223858808](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20201008223858808.png)
   4. ![image-20201009104739407](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20201009104739407.png)
   5. 其余详见参考手册中元素节点的方法与属性。

   