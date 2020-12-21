# 函数式编程

函数式编程遵循几个**==核心原则==**：

- **独立于程序状态或全局变量，只依赖于传递给它们的参数进行计算**——功能独立

- 限制更改程序状态，**避免更改保存数据的全局对象**——同一个输入永远能得到同一个输出，或者说不改变任何东西
- 对程序的副作用尽量小——朝向==pure function==

## map

使用==map方法（即Array.prototype.map）==，核心：**`map`方法是==迭代数组==中每一项的方式之一。在对每个元素应用回调函数后，它会创建一个新数组(不改变原来的数组)。**

- 传入`map`方法的参数是回调函数
- ==Array.prototype.forEach()==用法相似

使用示例：

```js
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```

实现`map方法`示例：

```js
// 全局变量
var s = [23, 65, 98, 5];

Array.prototype.myMap = function(callback){
  var newArray = [];
  // 请在本行以下添加你的代码
  for(let i = 0;i < this.length; i++){
    newArray.push(callback(this[i]));
  }
  // 请在本行以上添加你的代码
  return newArray;

};

var new_s = s.myMap(function(item){
  return item * 2;
});
console.log(new_s);
// output: [46, 130, 196, 10]
```

## filter

- 即`Array.prototype.filter()`
- `filter`方法会返回一个长度不大于原始数组的新数组
- `filter`不会改变原始数组，它接收一个回调函数，将回调内的逻辑应用于数组的每个元素。**新数组包含根据==回调函数内条件返回 true== 的元素**

使用实例：

```js
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

实现实例：

```js
// 全局变量
var s = [23, 65, 98, 5];

Array.prototype.myFilter = function(callback){
  var newArray = [];
  // 请在本行以下添加你的代码
  for(let i = 0; i < this.length; i++){
    if(callback(this[i]) === true){
      newArray.push(this[i])
    }
  }
  // 请在本行以上添加你的代码
  return newArray;

};

var new_s = s.myFilter(function(item){
  return item % 2 === 1;
});
// output: [23, 65, 5]
```

## reduce

- `reduce()`，即`Array.prototype.reduce()`
- 对数组中的每个元素执行一个传入的**reducer**函数(升序执行)，将其结果汇总为单个返回值。
- 提供初始值，更加安全（推荐）。

**callback**

执行数组中每个值 (如果没有提供 `initialValue则第一个值除外`)的函数，包含四个参数：

**`accumulator`**

- `currentValue`

  数组中正在处理的元素。

- `index` 可选

  数组中正在处理的当前元素的索引。 如果提供了`initialValue`，则起始索引号为0，否则从索引1起始。

- `array`可选

  调用`reduce()`的数组

`initialValue`可选

作为第一次调用 `callback`函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

```js
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
  return accumulator + currentValue;
}, 0);
// Output: 10
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
  return accumulator + currentValue;
}, 5);
// Output: 15
```



## slice

使用 slice 方法返回数组的一部分,`slice`返回一个新数组，不会修改原始数组。

```js
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 6));
// expected output: Array ["bison", "camel", "duck", "elephant"]
```

## concat

字符串和数组提供了`concat`方法:另一个数组作为参数添加到第一个数组末尾，返回一个新数组，不会改变任何一个原始数组。

`concat`方法 而代替`push`方法，不会改变数组。

示例：

```js
[1, 2, 3].concat([4, 5, 6]);
// 返回新数组 [1, 2, 3, 4, 5, 6]
```

## sort

- 对数组进行原地排序
- 传入函数（compare function）作为参数时，`compare function`有以下特性：
  - 函数是对两个参数进行比较，所以定义`compareFunc`函数时需两个参数：`a,b`。
  - 如果`compareFunc(a, b)`小于0，那么 a 会被排列到 b 之前;
  - 如果`compareFunc(a, b)`等于0，那么 a 和b 的相对位置不变;
  - 如果`compareFunc(a, b)`大于0，那么 a 会被排列到 b 之后;

示例：

```js
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);

// 也可以写成：
var numbers = [4, 2, 5, 1, 3]; 
numbers.sort((a, b) => a - b); 
console.log(numbers);				// [1, 2, 3, 4, 5]
numbers.sort((a, b) => b - a)
console.log(numbers);				// [5, 4, 3, 2, 1]
```

## every 和 some

### every

使用 every 方法检查数组中的每个元素是否符合条件，如果所有元素满足条件，返回布尔值`true`，反之返回`false`。

```js
var numbers = [1, 5, 8, 0, 10, 11];
numbers.every(function(currentValue) {
  return currentValue < 10;
});
// 返回 false
```



### some

检查数组中是否有元素是否符合条件，如果有一个元素满足条件，返回布尔值`true`，反之返回`false`。

```js
var numbers = [10, 50, 8, 220, 110, 11];
numbers.some(function(currentValue) {
  return currentValue < 10;
});
// 返回 true
```



