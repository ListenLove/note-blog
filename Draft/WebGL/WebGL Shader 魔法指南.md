
## 入门
### Shader 编程语言选择
`Shader`的主要编程语言有以下几种：

1. **`GLSL`：主要用于`OpenGL`平台的图形`API`。**
2. `HLSL`：由微软开发，主要用于`DirectX`平台的图形`API`。
3. `Cg`：由`Nvidia`开发，可被编译为`GLSL`和`HLSL`。
4. `WGSL`：主要用于`WebGPU`的图形`API`。
**`GLSL` 也是我们的当前选择**
### WebGL 渲染管线流程
![Pasted image 20231211142826](https://gitee.com/wencbin/pics/raw/master/202312111428310.png)
整个流程是这样的：
1. 我们在`JS`中提供顶点的数据（通常是`Float32Array`类型的数组，包含了顶点的位置等信息），将这些数据传递给顶点着色器，让它计算每个顶点的位置，
2. 然后`WebGL`将顶点装配成图元（如三角形），图元再被转换成屏幕上的空像素（光栅化），让片元着色器来计算每个像素的颜色并填充上去，最终将物体渲染到屏幕上。
3. 其中，图元装配和光栅化是`WebGL`自带的操作，我们无法进行额外的定制，但**顶点着色器和片元着色器则是完全可通过编程来定制化的**。将它们两者的定制化给做到极致是我们学习的目的，就是要把对！
## GLSL
> 非常类似于C语言.
1. `GLSL`初始化变量的格式是`变量类型 变量名=值;`，主要变量类型有标量`float`、`int`、`bool`，向量`vec2`、`vec3`、`vec4`，矩阵`mat2`、`mat3`、`mat4`，可以使用`.`符号访问向量的分量，向量的维度支持任意组合，可以通过定义结构体`struct`来将多个变量捆绑到一个变量上，变量也可以先声明后再进行赋值。
2. 和常规编程语言一样，`GLSL`有算数运算符`+ - * /`、赋值运算符`+=`、比较运算符`> < ==`、逻辑运算符`&& || !`等运算符。
3. 在`GLSL`中，我们能通过定义函数来复用一个代码片段，定义时要指定参数和返回值的类型，调用时要确保类型一致。
4. 和常规编程语言一样，`GLSL`有`if`条件语句、`for`循环语句等控制流结构。
5. `GLSL`通过变量限定符来描述变量的存储和使用方式，书写格式是`变量限定符 变量类型 变量名;`，常用的变量限定符有`uniform`、`const`等。
6. `GLSL`的宏是一种预处理指令，用于在编译时进行文本的替换，格式为`#define 宏的名称 宏的值`，本质上是一种文本替换机制。
### 变量限定符
变量限定符是用来描述变量的存储和使用方式的关键词。

它的书写格式是`变量限定符 变量类型 变量名;`，语句结尾要加分号，例如：

```c
uniform vec3 uColor;
```

以上代码声明了一个`uniform`类型的名为`uColor`的 3 维向量。

在`GLSL`中，常用的变量限定符有以下几种：`uniform`、`const`、`varying`、`attribute`等。

#### uniform

`uniform`变量是一种全局的变量，一旦定义后会同时存在于顶点着色器与片元着色器中，并且它在每一个顶点和片元上的值都是相同的，是一个“统一”的值。

在我们目前的`Shader`创作环境中，有一些内置的`uniform`变量可供我们直接使用，无需显式地去声明它们。

要注意的一点是：以后在`three.js`环境下，这些变量就不是内置的了，需要手动地去注入和声明。

#### iTime

`iTime`变量表示`Shader`从开始到现在执行所经过的时间。

如果要创作动画效果，这个变量可以说是必备的。

#### iResolution

`iResolution`变量表示`Shader`所在画布的大小，默认是占满整个屏幕。

有时我们可能会根据屏幕的比例对`Shader`的坐标进行适当的调整。

#### iMouse

`iMouse`变量表示用户鼠标当前所在的位置。

如果要创作可交互的效果，这个变量也是必备的。

#### const

`const`定义的量是一种常量，它是无法被改变的一个值。

`const float PI=3.14159265359;`

以上代码定义了一个浮点型的常量`PI`，值为`3.14159265359`，其实就是圆周率。

## UV坐标

用输入坐标`fragCoord`除以画布大小`iResolution.xy`，我们就能得到一个归一化的坐标，把它命名为`uv`。
```c
void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fragCoord/iResolution.xy;
}
```
> 所谓的`UV`坐标，它**代表了图像（这里指画布）上所有像素的归一化后的坐标位置，其中`U`代表水平方向，`V`代表垂直方向**。
> `UV`坐标能画出各种各样的图形效果。

然后再居中归一化。
```c
void mainImage(out vec4 fragColor,in vec2 fragCoord){

  vec2 uv=fragCoord/iResolution.xy;

  // float d=length(uv-.5)*2;

  // fragColor=vec4(vec3(d),1.);

  uv=(uv-.5)*2.;　　／／　居中

  fragColor=vec4(uv,0.,1.);　／／　看效果

}
```
![Pasted image 20231212160337](https://gitee.com/wencbin/pics/raw/master/202312121603002.png)


### 圆形的绘制
```c
  
void mainImage(out vec4 fragColor,in vec2 fragCoord){

  vec2 uv=fragCoord/iResolution.xy;// 归一化坐标

  uv.x*=iResolution.x/iResolution.y;// 调整视图比例

  uv=(uv-.5)*2.;// 调整视图中心

  float d=length(uv);// 距离

  d-=.5;// 距离-0.5

  float c=0.;// 颜色

  /* 应当尽量避免使用 if */

  // if(d>0.){

    //   c=1.;

  // }else{

    //   c=0.;

  // }

  // fragColor=vec4(vec3(d),1.);// 距离作为颜色

  // c=step(0.,d);// step(a,b) a>b?1:0

  c=smoothstep(0.,.05,d);// smoothstep 平滑过渡, 减少锯齿

  fragColor=vec4(vec3(c),1.);// 距离作为颜色, 得到一个圆

}
```
注意点:
1. 在`Shader`中，值的显示范围只会是`[0,1]`之间，也就是说，小于 0 的负数实际显示的值还是 0（黑色），大于 1 的数实际显示的值还是 1（白色）。
2. `Shader`的编写中，我们应当尽量避免使用`if`语句，因为`GPU`是并行处理结果的，而`if`语句会让处理器进行分支切换这一操作，处理多个分支会降低并行处理的性能。
3. 内置函数是 **`step`函数**，也被称作“**阶梯函数**”, 可用来替代`if`语句
4. **`smoothstep`函数**，它也被称作“**平滑阶梯函数**”, 用来消除锯齿
5. 得到一个完整的圆
![Pasted image 20231213170045](https://gitee.com/wencbin/pics/raw/master/202312131700279.png)


## 项目搭建
### 安装 kokomi.js
安装`kokomi.js`和`three.js`
```bash
npm install kokomi.js three
```
### 定义`Experience`类:
```js
import * as kokomi from "kokomi.js";

export default class Experience extends kokomi.Base {
  constructor(sel = "#sketch") {
    super(sel);
  }
}
```
引入并实例化Experience对象
```js
import Experience from "./Experience/Experience"; 
document.querySelector("#app").innerHTML = ` <div id="sketch"></div> `; 
new Experience("#sketch");
```
有以下打印结果则说明成功引入了`kokomi.js`.
![Pasted image 20231211231433](https://gitee.com/wencbin/pics/raw/master/202312112314458.png)
### 定义World类
> `World`部分负责创建场景内的所有物体。

```js
import * as kokomi from "kokomi.js";

export default class World extends kokomi.Component {
  constructor(base) {
    super(base);
  }
}

```

在`Experience.js`中，引入`World`类并初始化。
```js
import * as kokomi from "kokomi.js";

import World from "./World/index.js";

export default class Experience extends kokomi.Base {
  constructor(sel = "#sketch") {
    super(sel);

    window.experience = this;

    this.world = new World(this);
  }
}
```
