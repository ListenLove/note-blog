# JavaScript 高级编程学习笔记（一）

## 函数

### arguments

保存所有传递给函数的实参的**伪数组**。

```javascript
function Sum(){
  let result = 0;
  // 利用 for 循环遍历 arguments 伪数组
  for(let i = 0; i < arguments.length; i++)
    result += arguments[i];
  return result;
}
console.log(Sum(10, 20, 30)); /* [output]: 60 */
```

利用`ES6`*扩展运算符*替代 `arguments`。

```javascript
function Sum(...values){
  let result = 0;
  // 利用 for 循环遍历 arguments 伪数组
  for(let i = 0; i < values.length; i++)
    result += values[i];
  return result;
}
console.log(Sum(10, 20, 30)); /* [output]: 60 */
```

### 函数形参默认值
`ES6`之前的做法：`argument1 = argument1 || 指定默认值`
现在直接在函数定义中，通过形参后的等号`=`指定默认值。

### 匿名函数

**注意⚠️：不能只定义不使用。**

其作用有：

1. 作为其他函数的参数

   ```javascript
   function test(fn) {
     fn();
   }
   test(function() {
     console.log("hello, world!");
   });  /* [output]: hello, world! */
   ```

2. 作为其他函数的返回值

   ```javascript
   function test(fn) {
     return function() {
     console.log("hello, world!");
   	}
   }
   let fn = test();
   fn();		/* [output]: hello, world! */
   ```

3. 作为一个*立即执行函数*

   ```javascript
   (function() {
     console.log("hello, world!");
   })();		/* [output]: hello, world! */
   ```

### 箭头函数

用于简化定义函数的代码。大体格式如下：

```javascript
let 函数名称 = (形参列表) => {
  // 代码块
};
// Example
let say = (hello = "hello, world!") => {
    console.log(hello);
};
say();	/* [output]: hello, world! */
```

**注意点⚠️**

1. 在箭头函数中，如果只有一个形参，那么括住形参的对括号`()`可以省略。
2. 在箭头函数中，如果中括号中只有一句代码，那么括住形参的对括号`()`可以省略。

## 作用域

### 注意点

1. 在JavaScript `{}`的作用域，为**全局作用域**。
2. 在JavaScript函数后`{}`中的作用域，为**局部作用域**。
3. 在JavaScrip`{}`不跟函数结合的作用域，成为**块级作用域**。
4. 在**块级作用域中用`var`定义的变量为全局变量**。
5. 在**局部作用域中用`var`定义的变量为局部变量**。
6. 无论是在**块级还是在局部作用域中，省略`let`和`var`，就会变成一个全局变量**。
7. 在不同的作用域范围内，`let`可定义重名变量。只要出现了`let`定义的变量，在相同的作用域内就不能出现重定义的变量。

### 作用域链

#### ES6之前

1. 之前变量通过 `var`定义

2. 没有块级作用域，只有全局和局部作用域。

3. 全局作用域为0级作用域。定义函数会开启新的作用域，就是1级/2级/3级等等作用域。

   ```javascript
   // 全局作用域
   function demo() {
     // 1级作用作用域
     functino test() {
       // 2级作用域
       // ...
     }
   }
   ```

4. 查找变量规则为，现在当前作用域内查找，当前没有，逐层向上查找，找到返回或找不到报错。

#### ES6

1. 变量通过 `let`定义
2. 有了块级作用域，还有全局和局部作用域。
3. 全局作用域为0级作用域。**定义函数和利用`{}`开启代码块都会开启新的作用域**，就是1级/2级/3级等等作用域。
4. 查找变量规则为，现在当前作用域内查找，当前没有，逐层向上查找，找到返回或找不到报错。
5. 统一使用一种作用域风格，推荐 `ES6`。

### 函数预解析

1. 函数声明会被提到当前作用域最前面进行解析。
2. 函数复制给变量不会被预解析，只有变量会被预解析。
3. `let`定义的变量不能被预解析。
4. 函数优先级高于变量，如果函数名称和变量名称同名的话，函数会先预解析。

## `Javascript` 面向对象编程

### 创建默认对象

1. JavaScript提供了默认的类`Object`，通过这个类可创建对象。
2. 由于使用系统默认的类对象，必须手动添加属性和行为。
3. 添加属性：`对象名称.属性名称 = 值`。
4. 添加行为：`对象属性.行为名称 = 函数`。

### 构造函数

1. 构造函数首字母必须大写。
2. 构造函数只能够通过`new`来调用。

以下`Persong`函数就是一个构造函数。

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.say = function() {
    console.log("hi~");
  };
}
```

#### 性能优化

两个相同对象，如果需要相同的行为(例如上例代码中的`Say`方法)，利用原型链解决构造函数重复定义的性能问题。

```javascript
// 添加下列代码，去掉对象中 say 方法的定义
Person.prototype = {
            say: function () {
                console.log("hello, world!");
     }
}
let p1 = new Person("hello", 21);
let p2 = new Person("world", 22);
console.log(p1.say === p2.say);	/*[Output]: true */
```

### Prototype

1. `prototype`用于存储构造函数对象中公共的属性和方法。

2. 如果出现和构造函数同名的属性和方法，会先访问到构造函数的同名属性和方法。

3. 如果是对象特有的属性或者方法，要存储到构造函数中。

4. `prototype`中的默认属性`constructor`，指向当前原型对象对应的“构造函数”。另外，每个“实例对象”都有一个默认属性`__proto__`只想创建他的那个构造函数的“原型对象”。

5. `prototype`、`constructor`和`__proto__`的三角关系

   ![image-20201119115536148](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20201119115536148.png)

   进一步演化：

   ![image-20201119120757544](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20201119120757544.png)

   以及：

   ![image-20201119120616745](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20201119120616745.png)



在重定义`prototype`中，如果不将`constructor`属性指向原构造函数，将会使得`prototype`的`constructor`默认指向`Object`的构造函数，破坏原型链。

所以，重定义`prototype`应这样做：

```javascript
Person.prototype = {
    constructor: Person
  // 其他公共属性和公共方法
}
```

### 原型链

通过`__proto__`连接起来的链条就是**原型链**。对象的方法、属性查找就是通过这个链条进行查找，最好找到`Object`一级停止。

**在给对象不存在的属性设置值的时候，不会去原型链上找，会直接给当前对象新增该属性并设置值**

## Javascript 三大特性

### 封装

可使用，构造函数中定义局部变量，使用公共方法进行设置和获取。

#### 私有属性

如果找不到私有属性（局部变量），会给当前对象新增一个不存在的属性。

属性分类：

1. 实例属性和实例方法

   **实例属性**：通过实例对象访问的属性。

   **实例方法**：通过实例对象访问的方法。

2. 静态属性和静态方法

   **静态属性**：通过构造函数访问的属性。

   **静态方法**：通过构造函数访问的方法。

   

### 继承

#### `is a`类型

通过修改原型对象，继承新原型对象中的属性和方法。注意修改回`constructor`对应的对象。

例如：

```javascript
/*
 * 定义 Person 类
 */
function Person() {
    this.age = 0;
    this.name = null;

    this.say = function () {
        console.log(this.name, this.age);
    };
}

/*
* Student类 is a Person类
* */
function Student() {
    this.score = 0;
    this.score_card = function () {
        console.log(this.score);
    }
}
// Student类也有基本的名字和年龄，但没有指定从 Person中继承
// 所以无法获取
let stu = new Student();
// stu.say();  /*未指定继承自Person， 报错*/
Student.prototype = new Person();
Student.prototype.constructor = Student;    /*注意⚠️，不能破坏原型关系*/
stu = new Student();	/* 重新实例化一下*/
stu.say()  /*[Output]: null 0*/
```

### 利用 `call`方法，实现实现上例代码的继承

```javascript
function Person(name = null, age = 0) {
    this.age = age;
    this.name = name;

    this.say = function () {
        console.log(this.name, this.age);
    };
}

/*
* Student类 is a Person类
* */
function Student(name, age, score) {
    Person.call(this, name, age);		/* 调用 call 实现继承*/
    this.score = score;
    this.score_card = function () {
        console.log(this.score);
    }
}
let stu = new Student("hello", 22, 99);
stu.say()  /*[Output]: hello 22*/
```

**注意要想使用`Persong`的原型对象中的属性和方法，那么就必须将`Student`原型对象改为`Person`的实例才是最终继承方案。**

```javascript
Student.prototype = new Person();
Student.prototype.constructor = Student;
```

### 多态

`JavaScript`是弱类型语言，不关注多态。

## ES6 类和对象

**`class`**关键字专门用于定义类。

实例：

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age
    }

    say() {
        console.log(this.name, this.age);
    }

    static num = 666;
    static hello = () => {
        console.log("hello, world~");
    };
}

let p1 = new Person("hello, world", 24);
p1.say();	/* hello, world 24*/
Person.hello(); /* hello, world~*/
console.log(Person.num); /* 666 */
```

1. **大部分浏览器都不支持在`consturctor`函数之外的作用域定义属性。**
2. **大部分浏览器都不支持在`static`定义静态变量**。
3. `class`**类不支持自定义原型对象**。因为原型对象改变的话，不利于动态的在类定义代码块中给原型对象添加方法。

### class 继承

使用**`extends`**关键字。例如以下代码示例`Student`类要继承自`Persong`类。

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age
    }

    say() {
        console.log(this.name, this.age);
    }

    static num = 666;
    static hello = () => {
        console.log("hello, world~");
    };
}
// Student 继承自 Person
class Student extends Person {
    constructor(name, age, score) {
        super(name, age);   /*等同于 Person.call(this, name, age)*/
        this.score = score;
    }

    score_card() {
        console.log(this.score);
    }
}

let s1 = new Student("hello, world", 24, 99);
s1.say();	// [Output]  hello, world 24
s1.score_card(); // [Output]	99
```

## 对象和实例的方法和属性

### 获取实例对象的类型

```javascript
let s1 = new Student("hello, world", 24, 99);
console.log(s1.constructor.name);	/*这样才能获取到实例构造函数名称*/
```



### instanceOf

`instanceOf`用于判断“对象”是否是指定构造函数的“实例”。

```javascript
console.log(s1 instanceof Student); /* true */
console.log(s1 instanceof Person); /*true，解释请看👇粗体字*/
```

**只要构造函数的原型对象出现在实例对象原型链中就会返回`true`**。

### isPrototypeOf

判断类的原型对象是否在实例对象的原型链中。

### in

判断对象自身（类中，或者原型对象啊那个中有）是否拥有某一个属性。

```javascript
"score" in s1;	/* true,注意属性名两端要加引号 */
"name" in s1; /* true,原型对象中的也判断为 true*/
```

### hasOwnProperty

判断对象自身（类中，不会去原型对象中查找）是否拥有某一个属性。

 ### for in 循环遍历对象的所有属性和方法

```javascript
for(let key in p) {
  // 打印属性或方法的名称
  console.log(key);
  // 要用中括号访问对象属性和方法，才能进行操作
  console.log(p[key]);
}
```

对象解构赋值的注意点：**等号左边的变量名称必须和对象的属性名称一致，才能结垢处数据。**

### assign

`Object`的`assign`方法可以讲第二个参数的对象和属性拷贝到第一参数的对象中，可以实现“伪深拷贝”。

## 数组高级 API

### for … of 遍历数组(ES6)

```javascript
let arr = [1, 2, 3, 4, 5, 6];
for (let v of arr) {
    console.log(v);
}
/* [Output]
1
2
3
4
5
6
*/
```

### forEach方法遍历数组

```javascript
let arr = [1, 2, 3, 4, 5, 6];
arr.forEach(function (currentValue, currentIndex, currentArray) {
    console.log(currentValue, currentIndex, currentArray);
})
/*[Output]
1 0 [ 1, 2, 3, 4, 5, 6 ]
2 1 [ 1, 2, 3, 4, 5, 6 ]
3 2 [ 1, 2, 3, 4, 5, 6 ]
4 3 [ 1, 2, 3, 4, 5, 6 ]
5 4 [ 1, 2, 3, 4, 5, 6 ]
6 5 [ 1, 2, 3, 4, 5, 6 ]
*/
```

### findIndex方法

定制版的`indexOf`方法，找到即返回索引，找不到返回-1；

![image-20201120222518624](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20201120222518624.png)

### find

返回找到的元素。找不到返回 `undefined`。

### filter

数组过滤，将满足条件的元素添加到一个新的数组中返回。实现：

```javascript
Array.prototype.filter = function (fn) {
    let res = [];
    for (let i = 0; i < this.length; i++) {
        let result = fn(this[i], i, this);
        if (result)
            res.push(this[i]);
    }
    return res;
};
```



### 数组映射

将经过处理函数处理后的值映射到新的数组返回，实现：

```javascript
Array.prototype.map = function (fn) {
    let res = [].fill(undefined)
    for (let i = 0; i < this.length; i++) {
        res[i] = fn(this[i], i, this);
    }
    return res;
};
```

### sort方法

直接调用会返回升序数组。**如果元素是字符串类型，那么比较的是unicode编码**。

```javascript
// 降序排列数值数组
let arr = [6, 5, 4, 1, 2, 3];
console.log(arr.sort(function (a, b) {
    return b - a;
}));
// 降序排列字符串数组
let brr = ["b", "c", "a"];
console.log(brr.sort(function (a, b) {
    if (b > a) {
        return 1;
    } else if (b < a) {
        return -1;
    } else {
        return 0;
    }
}));
// 按对象年龄序升序排列对象数组
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

let crr = [
    new Person("hello", 19),
    new Person("world", 18),
    new Person("C", 31),
    new Person("Any", 16)
]
console.log(crr.sort(function (o1, o2) {
    return o2.age - o1.age;
}));
/* [Output]
[
  Person { name: 'C', age: 31 },
  Person { name: 'hello', age: 19 },
  Person { name: 'world', age: 18 },
  Person { name: 'Any', age: 16 }
]
*/
```

## 字符串常用方法

1. 获取某个字符`charAt` / `str[i]`。

2. 拼接字符串`concat / +`。
3. 字符串查找`indexOf / lastIndexof / includes`。
4. 截取子串，`substring / substr`。
5. 字符串切割，`split`。
6. 字符串判断是否以指定字符串开头，`startWith`。
7. 字符串判断是否以指定字符串结尾，endWith`。
8. 字符串模版。






















