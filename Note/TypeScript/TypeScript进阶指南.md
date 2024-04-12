# TypeScript 进阶

## 原始类型

### number

### string

### boolean

### null

> 这里有值，但是个空值

### undefined

这里没有值

### symbole

### bigint

```typescript
const bigintVar2: bigint = BigInt(9007199254740991);
const bigintVar1: bigint = 9007199254740991n;
```

### void

TS中的特殊类型，TypeScript 的原始类型标注中也有 void，但与 JavaScript 中不同的是，这里的 void 用于描述一个内部没有 return 语句，或者没有显式 return 一个值的函数的返回值，如：

```typescript
function func1() {}
function func2() {
  return;
}
function func3() {
  return undefined;
}
```

在这里，func1 与 func2 的返回值类型都会被隐式推导为 void，只有显式返回了 undefined 值的 func3 其返回值类型才被推导为了 undefined。但在实际的代码执行中，**func1 与 func2 的返回值均是 undefined**。

## 数组类型标注

```typescript
const arr1: string[] = []; // 常用

const arr2: Array<string> = []; // 类型签名也是 string[]
```

### 元组

```typescript
const truple: [string, string, string] = ["JavaScript", "TypeScript", "Go"]; // 元组
console.log(truple[99]); // 报错：长度为 "3" 的元组类型 "[string, string, string]" 在索引 "99" 处没有元素。
```

除了同类型的元素以外，元组内部也可以声明多个与其位置强绑定的，不同类型的元素：

```typescript
const truple2: [string, number, boolean] = ["linbudu", 599, true];
```

元组也支持了在某一个位置上的可选成员：

```typescript
const truple3: [string, number?, boolean?] = ["linbudu"];
// 下面这么写也可以
// const arr6: [string, number?, boolean?] = ['linbudu', , ,];
```

元组的长度可能为多种情况：

```typescript
const truple4: [string, number?, boolean?] = ["hello, world", , ,];
type Truple4Lenght = typeof truple4.length; // type Truple4Lenght = 3 | 2 | 1
```

具名元组：

```typescript
const labeledTruple: [name: string, age: number, male: boolean] = [
  "linbudu",
  599,
  true,
];
```

元祖可以检查解构赋值中可能存在的隐式越界访问：

```typescript
const truple2: [string, number, boolean] = ["hello, world", 123, true];
const [name, age, isMale, other] = truple2; // 报错：长度为 "3" 的元组类型 "[string, number, boolean]" 在索引 "3" 处没有元素。
```

综上：使用元组确实能帮助我们进一步**提升数组结构的严谨性**，包括**基于位置的类型标注、避免出现越界访问**等等。

## 对象类型标注

### interface

TypeScript 中我们也需要特殊的类型标注来描述对象类型，即 **interface** ，你可以理解为它代表了这个对象对外提供的接口结构。

```typescript
interface IDescription {
  name: string;
  age: number;
  isMale: boolean;
}

const person: IDescription = {
  name: "hello, world",
  age: 24,
  isMale: true,
};
```

- 每一个属性的值必须**一一对应**到接口的属性类型
- 不能有多的属性，也不能有少的属性，包括直接在对象内部声明，或是 `person.other = 'xxx'` 这样属性访问赋值的形式

### 修饰接口属性

```typescript
interface IDescription {
  name: string;
  age: number;
  isMale: boolean;
  saySomething?: Function; // 可选属性
  readonly id: number;
}

const person: IDescription = {
  name: "hello, world",
  age: 24,
  isMale: true,
  // 无需实现 saySomething
  id: 1024,
};
person.id = 123; // error：无法为“id”赋值，因为它是只读属性
```

其实在数组与元组层面也有着只读的修饰，但与对象类型有着两处不同。

- 你只能将整个数组/元组标记为只读，而不能像对象那样标记某个属性为只读。
- 一旦被标记为只读，那这个只读数组/元组的类型上，将不再具有 push、pop 等方法（即会修改原数组的方法），因此报错信息也将是**类型 xxx 上不存在属性“push”这种**。这一实现的本质是**只读数组与只读元组的类型实际上变成了 ReadonlyArray，而不再是 Array。**

### type 与 interface

很多同学更喜欢用 type（Type Alias，类型别名）来代替接口结构描述对象，而更推荐的方式是：interface 用来描述**对象、类的结构**；类型别名用来**将一个函数签名、一组联合类型、一个工具类型等等抽离成一个完整独立的类型**。

### object、Object 以及 { }

1. TypeScript 中就表现为 Object 包含了所有的类型
2. object 的引入就是为了解决对 Object 类型的错误使用，它代表**所有非原始类型的类型，即数组、对象与函数类型这些**
3. 最后是`{}`，一个奇奇怪怪的空对象，如果你了解过字面量类型，可以认为`{}`就是一个对象字面量类型（对应到字符串字面量类型这样）。否则，你可以认为使用`{}`作为类型签名就是一个合法的，但**内部无属性定义的空对象**，这类似于 Object（想想 `new Object()`），它意味着任何非 null / undefined 的值

**注意：**

1. 在任何时候都**不要，不要，不要使用** Object 以及类似的装箱类型
2. 当你不确定某个变量的具体类型，但能确定它不是原始类型，可以使用 object。但我更推荐进一步区分，也就是使用 `Record<string, unknown>` 或 `Record<string, any>` 表示对象，`unknown[]` 或 `any[]` 表示数组，`(...args: any[]) => any`表示函数这样
3. 我们同样要避免使用`{}`。`{}`意味着任何非 `null / undefined` 的值，从这个层面上看，使用它和使用 `any` 一样恶劣。

## 字面量类型与联合类型

使用联合类型加上字面量类型，就能在访问时获得精确地类型推导。

```typescript
interface IRes {
  code: 10000 | 10001 | 50000;
  status: "success" | "failure";
  data: any;
}

declare let res: IRes; // 没有实际值的变量，同时它也不存在于运行时中
if (res.status === "success") {
}
```

### 字面量类型

**字面量类型（Literal Types）**，它代表着比原始类型更精确的类型，同时也是原始类型的子类型。单独使用字面量类型比较少见，通常和联合类型（即这里的 `|`）一起使用，表达一组字面量类型。

> 字面量类型主要包括**字符串字面量类型**、**数字字面量类型**、**布尔字面量类型**和**对象字面量类型**，它们可以直接作为类型标注。

```typescript
const str: "hello, world" = "hello, world";
const num: 1024 = 1024;
const bool: true = true;
const str1: "hello, world" = "TypeScript"; // 不能将类型“"TypeScript"”分配给类型“"hello, world"”
const str2: string = "hello, world";
const str3: string = "TypeScript";
```

上面的代码，原始类型的值可以包括任意的同类型值，而字面量类型要求的是**值级别的字面量一致**。

#### 对象字面量类型

对象字面量类型就是一个对象类型的值：

```typescript
interface Tmp {
  obj: {
    name: "linbudu";
    age: 18;
  };
}

const tmp: Tmp = {
  obj: {
    name: "linbudu",
    age: 18,
  },
};
```

**注意：**

**无论是原始类型还是对象类型的字面量类型，它们的本质都是类型而不是值**。它们在编译时同样会被擦除，同时也是被存储在内存中的类型空间而非值空间。

### 联合类型

联合类型可以理解为，它代表了**一组类型的可用集合**，只要最终赋值的类型**属于联合类型的成员之一**，就可以认为符合这个联合类型。联合类型对其成员并没有任何限制，除了上面这样对同一类型字面量的联合，我们还可以将各种类型混合到一起：

```typescript
interface Tmp {
  mixed: string | number | 123 | (() => {}) | (1 | 2);
}
```

**注意：**

- 对于联合类型中的函数类型，需要使用括号`()`包裹起来
- 函数类型并不存在字面量类型，因此这里的 `(() => {})` 就是一个合法的函数类型
- 你可以在联合类型中进一步嵌套联合类型，但这些嵌套的联合类型最终都会被展平到第一级中

#### 实现互斥属性

```typescript
interface IUserVip {
  user:
    | {
        vip: true;
        expires: string;
      }
    | {
        vip: false;
        promotion: string;
      };
}

declare var testUser: IUserVip;
if (testUser.user.vip) {
  console.log(testUser.user.expires); // vip为true，类型收窄到VIP用户的类型
} else {
  console.log(testUser.user.promotion); // vip为false，类型收窄到非VIP用户的类型
}
```

### 枚举

```typescript
enum Items {
  Foo, // 0
  Zig, // 1
  Bar = 99, // 99
  Baz, // 100
}
```

#### 延迟求值

```typescript
const returnNum = () => 1 + 599;
enum Items2 {
  num0, // 0
  num600 = returnNum(), // 600
  num299 = 299,
  num300, // 300
}
```

延迟求值的枚举值是有条件的。**如果你使用了延迟求值，那么没有使用延迟求值的枚举成员必须放在使用常量枚举值声明的成员之后，或者放在第一位**。

#### 字符串和数字混合枚举值

```typescript
enum Mixed {
  Num = 599,
  Str = "hello, world",
}
```

#### 枚举和对象的区别

- **对象是单向映射**：只能从键映射到键值；
- **枚举是双向映射的**，即你可以从枚举成员映射到枚举值，也可以从枚举值映射到枚举成员；

```typescript
enum Items {
  Foo, // 0
  Zig, // 1
  Baz, // 2
}
console.log(Items.Foo); // 0
console.log(Items[0]); // Foo
console.log(Items[Items.Foo]); // Foo
```

需要注意的是，仅有值为数字的枚举成员才能够进行这样的双向枚举，**字符串枚举成员仍然只会进行单次映射**

```typescript
enum Items {
  Foo, // 0
  Zig, // 1
  Baz, // 2
  Str = "hello, world",
}
console.log(Items.Str); // hello, world
console.log(Items["hello, world"]); // 元素隐式具有 "any" 类型，因为索引表达式的类型不为 "number"
```

#### 常量枚举

类似枚举，声明多了一个 const：

```typescript
const enum Items {
  Foo,
  Bar,
  Baz,
}
console.log(Items.Bar); // 1
console.log(Items[1]); // error：只有使用字符串文本才能访问常数枚举成员。
```

- **只能通过枚举成员访问枚举值**（而不能通过值访问成员）
- 对枚举成员的访问会被**直接内联替换为枚举的值**

## 函数

### 函数类型签名

```typescript
// 一个简单函数
function foo(name: string): number {
  return name.length;
}

//函数类型声明： (name: string) => number
const foo: (name: string) => number = function (name) {
  return name.length;
};

const foo: (name: string) => number = (name) => {
  return name.length;
}; //不推荐此方式，这种方式可读性太差了
```

`(name: string) => number`箭头函数在TypeScript 中可作为**函数类型签名**。函数类型声明混合箭头函数将导致可读性非常差，应当避免。

推荐用法：

1. **直接在函数中进行参数和返回值的类型声明**
2. **使用类型别名将函数声明抽离出来**

```typescript
// 方式一
const foo = (name: string): number => {
  return name.length;
};

// 方式二
type FuncFoo = (name: string) => number;

const bar: FuncFoo = (name) => {
  return name.length;
};
```

#### 可调用 interface

这时的 interface 被称为 **Callable Interface**，看起来可能很奇怪，但我们可以这么认为，interface 就是用来描述一个类型结构的，而函数类型本质上也是一个结构固定的类型罢了。

```typescript
interface FuncFooStruct {
  (name: string): number;
}

const bar: FuncFooStruct = (name) => {
  return name.length;
};
```

### void 类型

在 TypeScript 中，一个没有返回值（即没有调用 return 语句）的函数，其返回类型应当被标记为 void 而不是 undefined，即使它实际的值是 undefined。

```typescript
// 没有调用 return 语句
function foo(): void {}

// 调用了 return 语句，但没有返回值
function bar(): void {
  return;
}
// 调用了 return 语句，进行了返回操作，但没有返回实际的值，返回undefined
function car(): undefined {
  return undefined;
}
```

**在 TypeScript 中，undefined 类型是一个实际的、有意义的类型值，而 void 才代表着空的、没有意义的类型值**

### 可选参数

```typescript
// 函数逻辑中注入可选参数默认值
function foo1(name: string, age?: number) {
  const inputAge = age ?? 18;
  return `name: ${name}, age: ${inputAge}`;
}
// 直接为可选参数声明默认值
function foo2(name: string, age = 18) {
  return `name: ${name}, age: ${age}`;
}
```

**注意：可选参数必须位于必选参数之后。**

### rest参数

rest参数类型标注实际为一个数组：

```typescript
function foo(arg1: string, ...rest: any[]) {}
```

还可以用元祖类型进行标注

```typescript
function foo(arg1: string, ...rest: [number, boolean]) {}

foo("linbudu", 18, true);
```

### 重载

在逻辑较复杂的情况下，函数可能有多组入参类型和返回值类型

```typescript
function complexFunc(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * foo + 1;
  }
}
```

函数的返回类型基于入参 bar 的值：当 bar 为 true 时返回值为string类型，否则为number类型，而函数返回类型仅提示一个string和number的联合类型，完全没有体现这一点。故我们可以使用 TypeScript 提供的**函数重载签名（Overload Signature）**，将以上的例子使用重载改写：

```typescript
function foo(foo: number, bar: true): string;
function foo(foo: number, bar?: false): number;
function foo(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * foo + 1;
  }
}
console.log(foo(10)); // 函数返回值number
console.log(foo(10, true)); // 函数返回值string
console.log(foo(10, false)); // 函数返回值number
```

实际上，TypeScript 中的重载更像是伪重载，**它只有一个具体实现，其重载体现在方法调用的签名上而非具体实现上**。而在如 C++ 等语言中，重载体现在多个**名称一致但入参不同的函数实现上**，这才是更广义上的函数重载。

### 异步函数、Generator 函数等类型签名

对于异步函数、Generator 函数、异步 Generator 函数的类型签名，其参数签名基本一致，而返回值类型则稍微有些区别。

#### 异步函数类型签名

```typescript
async function asyncFunc(): Promise<void> {}
```

异步函数（即标记为 async 的函数），其返回值必定为一个 Promise 类型，而 Promise 内部包含的类型则通过泛型的形式书写，即 `Promise<T>`。

#### Generator 函数类型签名

```typescript
function* genFunc(): Iterable<void> {}
```

#### 异步 Generator 函数类型签名

```typescript
async function* asyncGenFunc(): AsyncIterable<void> {}
```

## 类 Class

类主要结构只有**构造函数**、**属性**、**方法**和**访问符（Accessor）**。

### 类与类成员的类型签名

其中，属性的类型标注类似于变量，而构造函数、方法、存取器的类型编标注类似于函数。

```typescript
class Foo {
  prop: string;
  constructor(prop: string) {
    this.prop = prop;
  }

  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`);
  }

  get propA(): string {
    return `${this.prop}+A`;
  }

  set propA(value: string) {
    this.prop = `${value}A`;
  }
}
```

**注意：setter 方法不允许进行返回值的类型标注**。

就像函数可以通过**函数声明**与**函数表达式**创建一样，类也可以通过**类声明**和**类表达式**的方式创建。很明显上面的写法即是类声明，而使用类表达式的语法则是这样的：

```typescript
const Foo = class {
  prop: string;

  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`);
  }

  // ...
};
```

### 修饰符

在 TypeScript 中我们能够为 Class 成员添加这些修饰符：

- **public**：此类成员在**类、类的实例、子类**中都能被访问。
- **private**：此类成员仅能在**类的内部**被访问。
- **protected**：此类成员仅能在**类与子类中**被访问，你可以将类和类的实例当成两种概念，即一旦实例化完毕（出厂零件），那就和类（工厂）没关系了，即**不允许再访问受保护的成员**。
- **readonly**：只读属性**无法再重新赋值**。

> 除 readonly 以外，其他三位都属于访问性修饰符，而 readonly 属于操作性修饰符。

```typescript
class Foo {
  private prop: string;
  readonly test: string;
  constructor(prop: string, test: string) {
    this.prop = prop;
    this.test = test;
  }

  protected print(addon: string): void {
    console.log(`${this.prop} and ${addon}`);
  }

  public get propA(): string {
    return `${this.prop}+A`;
  }

  public set propA(value: string) {
    this.prop = `${value}A`;
  }

  public set testA(value: string) {
    this.test = `${value}A`; // error: 无法为“test”赋值，因为它是只读属性。
  }
}
```

> 我们通常不会为构造函数添加修饰符，而是让它保持默认的 public。

当不显式使用访问性修饰符，成员的访问性默认会被标记为 public。实际上，在上面的例子中，我们通过构造函数为类成员赋值的方式还是略显麻烦，需要声明类属性以及在构造函数中进行赋值。简单起见，我们可以**在构造函数中对参数应用访问性修饰符**：

```typescript
class Foo {
  constructor(
    private prop: string,
    public readonly test: string,
  ) {}
}

const foo = new Foo("hello", "world");
console.log(foo.prop, foo.test); // error: 属性“prop”为私有属性，只能在类“Foo”中访问。
foo.test = "1024"; // error: 无法为“test”赋值，因为它是只读属性。
```

### 静态成员

使用 static 关键字来标识一个成员为静态成员。

```typescript
class Foo {
  static staticStr = "1024";
  static staticHandler() {
    console.log("staticHandler() run");
  }

  public instanceHandler() {
    console.log("instanceHandler() run");
  }
}
const foo = new Foo();
console.log(Foo.staticStr); // 1024
Foo.staticHandler(); // staticHandler() run
foo.instanceHandler(); // instanceHandler() run
```

查看编译后的代码：

```typescript
var Foo = /** @class */ (function () {
  function Foo() {}
  Foo.staticHandler = function () {
    console.log("staticHandler() run");
  };
  Foo.prototype.instanceHandler = function () {
    console.log("instanceHandler() run");
  };
  Foo.staticStr = "1024";
  return Foo;
})();
var foo = new Foo();
console.log(Foo.staticStr); // 1024
Foo.staticHandler(); // staticHandler() run
foo.instanceHandler(); // instanceHandler() run
```

从中我们可以看到，**静态成员直接被挂载在函数体上**，而**实例成员挂载在原型上**，这就是二者的最重要差异：**静态成员不会被实例继承，它始终只属于当前定义的这个类（以及其子类）**。而原型对象上的实例成员则会**沿着原型链进行传递**，也就是能够被继承。

### 继承

TypeScript 中也使用 extends 关键字来实现继承：

```typescript
class Base {} // 基类
class Derived extends Base {} // 派生类
```

对于这里的两个类，比较严谨的称呼是 **基类（Base）** 与 **派生类（Derived）**。当然，如果你觉得叫父类与子类更容易理解也没问题。

关于基类与派生类，我们需要了解的主要是**派生类对基类成员的访问与覆盖操作**。

派生类中可以访问到使用 `public` 或 `protected` 修饰符的基类成员。除了访问以外，基类中的方法也可以在派生类中被覆盖，但我们仍然可以通过 super 访问到基类中的方法：

```typescript
class Base {
  print() {
    console.log("Base print");
  }
} // 基类
class Derived extends Base {
  print() {
    super.print();
    console.log("Derived print");
  }
} // 派生类
const derived = new Derived();
derived.print(); // Base print  Derived print
```

使用 `override`关键字确保派生类覆盖方法时一定在基类中存在定义：

```typescript
class Base {
  print() {
    console.log("Base print");
  }
} // 基类
class Derived extends Base {
  override print() {
    console.log("Derived print");
  }

  override notExistPrint() {
    // 此成员不能有 "override" 修饰符，因为它未在基类 "Base" 中声明。
    console.log("notExistPrint");
  }
} // 派生类
const derived = new Derived();
derived.print(); // Derived print
```

### 抽象类

抽象类使用 **abstract** 关键字声明，**使用implements**实现相关抽象类。

**一个抽象类描述了一个类中应当有哪些成员（属性、方法等）**，**一个抽象方法描述了这一方法在实际实现中的结构**。

```typescript
abstract class AbsFoo {
  abstract props: string;
  abstract get getter(): string;
  abstract method(name: string): string;
}
class Foo implements AbsFoo {
  props: string = "props";
  get getter(): string {
    return this.props;
  }
  method(name: string): string {
    return name;
  }
}
```

**注意：TypeScript中无法声明静态的抽象成员。**

#### 使用interface定义抽象类

```typescript
interface AbsFoo {
  props: string;
  get getter(): string;
  method(name: string): string;
}
class Foo implements AbsFoo {
  props: string = "props";
  get getter(): string {
    return this.props;
  }
  method(name: string): string {
    return name;
  }
}
```

在这里，接口的作用和抽象类一样。

## 内置类型

### any

> 表示任意类型

**“任意类型”，它能兼容所有类型，也能够被所有类型兼容**。

**tips：**

- 如果是类型不兼容报错导致你使用 any，考虑用类型断言替代。
- 如果是类型太复杂导致你不想全部声明而使用 any，考虑将这一处的类型去断言为你需要的最简类型。如你需要调用 `foo.bar.baz()`，就可以先将 foo 断言为一个具有 bar 方法的类型。
- 如果你是想表达一个未知类型，更合理的方式是使用 unknown。

### unknown

unknown 类型的变量可以再次赋值为任意其它类型。**在类型未知的情况下，更推荐使用 unknown 标注。**

### never

**never 类型不携带任何的类型信息。**在编程语言的类型系统中，never 类型被称为 **Bottom Type**，是**整个类型系统层级中最底层的类型**。

## 类型断言

### 基本使用

基本语法是：**`as NewType`**，可以断言到任何一个具体类型。

```typescript
let unknownVar: unknown;
(unknownVar as { foo: () => {} }).foo();
```

使用方式是，**在 TypeScript 类型分析不正确或不符合预期时，将其断言为此处的正确类型**。

### 双重断言

源类型与断言类型之间差异过大，**要先断言到 unknown 类型，再断言到预期类型**。

```typescript
const str = "hello, world";

// 类型 "string" 到类型 "{ handle: () => void; }" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"。
(str as { handle: () => void }).handle = () => {};

(str as unknown as { handle: () => void }).handle = () => {}; // ok
```

### 非空断言

使用`!`语法的形式，标记前一个声明一定是非空的。如果不想理会编辑器的错误提示，可直接使用非空断言。

```typescript
declare const foo: {
  func?: () => {
    prop?: number | null;
  };
};

foo.func().prop.toFixed(2); // 对象可能为 "null" 或“未定义”。ts(2533)

foo.func!().prop!.toFixed(); // ok
```

### 类型断言作为代码提示的辅助

```typescript
interface IStruct {
  foo: string;
  bar: {
    barPropA: string;
    barPropB: number;
    barMethod: () => void;
    baz: {
      handler: () => Promise<void>;
    };
  };
}

// const obj: IStruct = {} // 类型“{}”缺少类型“IStruct”中的以下属性: foo, bar

const obj = <IStruct>{
  // 通过类型断言，可以不用完全实现接口
  bar: {
    barPropB: 1,
  },
};
```

## 类型层级

- 最顶级的类型，any 与 unknown (**Top Type**)
- 特殊的 Object ，它也包含了所有的类型，但和 Top Type 比还是差了一层
- String、Boolean、Number 这些装箱类型
- 原始类型与对象类型
- 字面量类型，即更精确的原始类型与对象类型嘛，需要注意的是 null 和 undefined 并不是字面量类型的子类型
- 最底层的 never (**Bottom Type**)

## 类型别名

类型别名的作用主要是对一组类型或一个特定类型结构进行封装，以便于在其它地方进行复用。通过`type`关键字声明类型别名。

```typescript
type StatusCode = 200 | 201 | 202 | 204 | 400 | 401 | 403 | 404 | 500;

type PossibleDataTypes = string | number | (() => unknown);

const status: StatusCode = 200;

// 抽离函数类型
type Handler = (e: Event) => void;
const clickHandler: Handler = (e) => {};

// 声明对象类型
type User = {
  name: string;
  age: number;
};
const user: User = {
  name: "xiaoming",
  age: 18,
};
```

### 类型别名接受泛型

接受泛型参数，实现**更灵活的类型创建功能**。

```typescript
type Factory<T> = T | number | undefined;

const factory: Factory<string> = "hello";
```

## 联合类型

联合类型的符号是`|`，它代表了按位或，即只需要符合联合类型中的一个类型，既可以认为实现了这个联合类型，如`A | B`，只需要实现 A 或 B 即可。

```typescript
type StatusCode = 200 | 201 | 202 | 204 | 400 | 401 | 403 | 404 | 500;

type PossibleDataTypes = string | number | (() => unknown);

const status: StatusCode = 200; // 赋值200即可满足联合类型的条件
```

## 交叉类型

交叉类型的语法按位与的 `&` ，需要符合这里的所有类型，才可以说实现了这个交叉类型，即 `A & B`，**需要同时满足 A 与 B 两个类型**才行。

```typescript
interface NameStruct {
  name: string;
}

interface AgeStruct {
  age: number;
}

type User = NameStruct & AgeStruct; // 对象类型的合并

const user: User = {
  name: "John",
  age: 20,
};

type StrAndNum = string & number; // never
```

对象类型的交叉类型，其内部的同名属性同样会按照交叉类型进行合并：

```typescript
interface NameStruct {
  name: string;
  prop: {
    desc: string;
  };
}

interface AgeStruct {
  age: number;
  prop: {
    year: number;
  };
}

type User = NameStruct & AgeStruct;

const user: User = {
  name: "John",
  age: 20,
  prop: {
    // 对象类型内部的同名属性按交叉类型合并
    desc: "A person",
    year: 2000,
  },
};
```

联合类型组成的交叉类型，是两边联合类型的交集：

```typescript
type UnionIntersection1 = (1 | 2 | 3) & (3 | 4 | 5); // 3

type UnionIntersection2 = (string | number | null) & (object | string | null); // string | null
```

## 索引类型

**索引类型包含索引签名类型、索引类型查询和索引类型访问。**其中索引签名类型是**声明**，其他的是**读取**。

### 索引签名类型

索引签名类型主要指的是在接口或类型别名中，**快速声明一个键值类型一致的类型结构**：

```typescript
interface AllStringInterface {
  [key: string]: string;
}

type AllStringType = {
  [key: string]: string;
};

const propInterface: AllStringInterface = {};
const propType: AllStringType = {};
const propType1 = propInterface["123"]; // string
const propType2 = propType[123]; // string
```

代码例子中声明的键的类型是string（`[key: string]`），对于这些类型结构的属性访问也将全部被视为 string 类型。

**注意**：对于 `propType2[prop]` 形式的访问会将**数字索引访问转换为字符串索引访问**，也就是说， `propType[123]` 和 `propType["123"]` 的效果是一致的。因此，在字符串索引签名类型中我们仍然可以声明数字类型的键。

索引签名类型也可以和具体的键值对类型声明并存，但这时这些具体的键值类型也需要符合索引签名类型的声明：

```typescript
interface AllStringInterface {
  propA: number; // 类型“number”的属性“propA”不能赋给“string”索引类型“string”。
  [key: string]: string;
}
```

### 索引类型查询

`keyof`操作符，会将对象中的所有键转换为对应字面量类型，然后再组合成联合类型。

```typescript
interface Foo {
  hello: 1;
  599: 2;
  "600": 3;
}

// type FooKeys = keyof Foo; // "hello" | 599 | "600"
type FooKeys = keyof Foo & {}; // "hello" | 599 | "600" ——vscode要这么处理
type AnyKeys = keyof any; // type AnyKeys = string | number | symbol
```

**keyof 的产物必定是一个联合类型**。

### 索引类型访问

索引类型查询的本质其实就是，**通过键的字面量类型访问这个键对应的键值类型**。

```typescript
interface NumberRecord {
  [key: string]: number;
}
type PropType = NumberRecord[string]; // type PropType = number

interface Foo {
  propA: number;
  propB: string;
}

type PropAType = Foo["propA"]; // type PropAType = number
type PropBType = Foo["propB"]; // type PropBType = string
```

索引类型访问的方式和返回值均是类型。

字面量联合类型进行索引类型访问时，其结果就是将联合类型每个分支对应的类型进行访问后的结果，重新组装成联合类型：

```typescript
interface Foo {
  propA: number;
  propB: string;
}

type PropTypeUnion = Foo[keyof Foo]; // type PropTypeUnion = string | number
```

### 映射类型

映射类型的主要作用即是**基于键名映射到键值类型**。

映射类型使用 **in** 关键字。**映射类型只能使用类型别名实现。**

```typescript
type Stringfy<T> = {
  [K in keyof T]: string;
};
type Clone<T> = {
  [K in keyof T]: T[K]; // 索引类型访问
};
interface Foo {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => {};
}

/* type StringfiedFoo = {
    prop1: string;
    prop2: string;
    prop3: string;
    prop4: string;
} */
type StringfiedFoo = Stringfy<Foo>;
/* type ClonedFoo = {
    prop1: string;
    prop2: number;
    prop3: boolean;
    prop4: () => {};
} */
type ClonedFoo = Clone<Foo>;
```

## 类型安全

### 类型查询操作符 typeof

typeof除了在Javascript中的作用外，在TypeScript 还新增了用于类型查询的 typeof ，即 **Type Query Operator**，这个 typeof 返回的是一个 TypeScript 类型。

```typescript
const str = "Hello World!";

const obj = {
  name: "John",
  age: 20,
};

const nullVar = null;

const undefVar = undefined;

const func = (input: string) => {
  return input.length > 10;
};

const arr = [1, 2, 3, 4, 5];

type Str = typeof str; // type Str = "Hello World!"

/** type Obj = {
    name: string;
    age: number;
} */
type Obj = typeof obj;

type Null = typeof nullVar; // type Null = null

type Undef = typeof undefVar; // type Undef = undefined

type Func = typeof func; // type Func = (input: string) => boolean

/* 在工具类型中使用 typeof */
const test: typeof func = (name: string) => {
  return name === "John";
};
```

### ReturnType

ReturnType 这个工具类型，会返回一个函数类型中返回值位置的类型。

```typescript
const func = (input: string) => {
  return input.length > 10;
};

type FuncReturnType = ReturnType<typeof func>; // type FuncReturnType = boolean
```

### 类型守卫

从逻辑中进行类型地推导，再反过来让类型为逻辑保驾护航。

```typescript
declare const strOrNumOrBool: string | number | boolean;

if (typeof strOrNumOrBool === "string") {
  // 一定是字符串！
  strOrNumOrBool.charAt(1);
} else if (typeof strOrNumOrBool === "number") {
  // 一定是数字！
  strOrNumOrBool.toFixed();
} else if (typeof strOrNumOrBool === "boolean") {
  // 一定是布尔值！
  strOrNumOrBool === true;
} else {
  // 要是走到这里就说明有问题！
  const _exhaustiveCheck: never = strOrNumOrBool;
  throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
}
```

**注意类型控制流分析做不到跨函数上下文来进行类型的信息收集**。 但是TS提供了**is 关键字**来显式地提供类型信息。

```typescript
function isString(input: unknown): input is string {
  return typeof input === "string";
}

function test(input: string | number) {
  if (isString(input)) {
    input.replace("hi", "hello");
  }
}
```

isString 函数称为类型守卫，在它的返回值中，我们不再使用 boolean 作为类型标注，而是使用 `input is string` 这么个奇怪的搭配，拆开来看它是这样的：

- input 函数的某个参数；
- `is string`，即 **is 关键字 + 预期类型**，即如果这个函数成功返回为 true，那么 is 关键字前这个入参的类型，就会**被这个类型守卫调用方后续的类型控制流分析收集到**。

### in 与 instanceof 的类型保护

#### in

```typescript
interface Foo {
  foo: string;
  fooOnly: boolean;
  common: number;
}

interface Bar {
  bar: string;
  barOnly: boolean;
  common: number;
}

function test(input: Foo | Bar) {
  if ("foo" in input) {
    console.log(input.fooOnly);
  } else {
    console.log(input.barOnly);
  }
}
```

使用in关键字和使用类型的独有属性将类型进行区分。这种独有的属性，可以称为**可辨识属性（Discriminant Property 或 Tagged Property）**。Foo 与 Bar 又因为存在这样具有区分能力的辨识属性，可以称为**可辨识联合类型（Discriminated Unions 或 Tagged Union）**。

#### instanceof

instanceof 也可以用来进行类型保护：

```typescript
class FooBase {}
class BarBase {}

class Foo extends FooBase {
  fooOnly() {}
}

class Bar extends BarBase {
  barOnly() {}
}

function test(input: Foo | Bar) {
  if (input instanceof Foo) {
    input.fooOnly();
  } else {
    input.barOnly();
  }
}
```

### 类型断言守卫 asserts

使用`asserts`关键字。

## 泛型

### 类型别名中的泛型

```typescript
type Factory<T> = T | string | number;

declare const objFactory: Factory<object> & {}; // const objFactory: string | number | object
```

类型别名中的泛型大多是用来进行工具类型封装。

```typescript
/**
 * 将对象的所有属性转换为 string 类型
 */
type Stringfy<T> = {
  [K in keyof T]: string;
};

/**
 * 将对象的所有属性clone转换为相同类型
 */
type Clone<T> = {
  [K in keyof T]: T[K];
};

/**
 * 将对象的所有属性转换为可选类型
 */
type Partialize<T> = {
  [K in keyof T]?: T[K];
};
type StringfyFoo = Stringfy<IFoo>;
type CloneFoo = Clone<IFoo>;
type PartialFoo = Partialize<IFoo>;
```

注意：**Partial**工具类型已在TS中内置了，不必重复定义。

### 条件类型 extends

通常泛型会被作为条件类型中的判断条件（`T extends Condition`，或者 `Type extends T`）以及返回值（即 `:` 两端的值）。

```typescript
type IsEqual<T> = T extends true ? 1 : -1;

type A = IsEqual<true>; // type A = 1
type B = IsEqual<false>; // type B = -1
type C = IsEqual<"true">; // type C = -1
```

### 泛型默认值

泛型也可声明默认值，调用时就可以不带任何参数，默认会使用声明的默认值来填充。

```typescript
type DefaultGeneric<T = string> = T | null | undefined;

type BooleanType = DefaultGeneric<boolean>; // boolean | null | undefined
type StringType = DefaultGeneric; // string | null | undefined
```

### 泛型约束

使用 `extends` 关键字来约束传入的泛型参数必须符合要求。关于 extends，`A extends B` 意味着 **A 是 B 的子类型**，也就是说 A 比 B 的类型更精确，或者说更复杂：

- 更精确，如**字面量类型是对应原始类型的子类型**，即 `'linbudu' extends string`，`599 extends number` 成立。类似的，**联合类型子集均为联合类型的子类型**，即 `1`、 `1 | 2` 是 `1 | 2 | 3 | 4` 的子类型。
- 更复杂，如 `{ name: string }` 是 `{}` 的子类型，因为在 `{}` 的基础上增加了额外的类型，基类与派生类（父类与子类）同理。

```typescript
/* ResCode extends number 表名传入的泛型要严格约束于 number 类型 */
type ResStatus<ResCode extends number> = ResCode extends 10000 | 10001 | 10002
  ? "success"
  : "failure";

type Res1 = ResStatus<10000>; // type Res1 = "success"
type Res2 = ResStatus<10001>; // type Res2 = "success"
type Res3 = ResStatus<10002>; // type Res3 = "success"

type Res4 = ResStatus<20000>; // type Res4 = "failure"

type ErrRes = ResStatus<"10000">; // 类型“string”不满足约束“number”。
```

设置泛型约束的同时，声明默认泛型类型也是可以的：

```typescript
type ResStatus<ResCode extends number = 10000> = ResCode extends
  | 10000
  | 10001
  | 10002
  ? "success"
  : "failure";

type Res = ResStatus; // type Res = "success"

type Res1 = ResStatus<20000>; // type Res4 = "failure"
```

### 多泛型关联

多泛型参数就像接受更多参数的函数，其内部的运行逻辑（类型操作）会更加抽象，表现在参数（泛型参数）需要进行的逻辑运算（类型操作）会更加复杂。

```typescript
type Conditional<Type, Condition, TruthyResult, FalsyResult> =
  Type extends Condition ? TruthyResult : FalsyResult;

type R1 = Conditional<"hello", string, true, false>; // type R1 = true
type R2 = Conditional<"hello", number, "Passed", "Rejected">; // type R2 = "Rejected"

type ProcessInput<
  Input,
  SecondInput extends Input = Input,
  ThirdInput extends Input = SecondInput,
> = number;
```

### 对象类型中的泛型

对象类型结构中使用泛型，最常见的一个例子是响应类型结构的泛型处理。

```typescript
interface IRes<TData = unknown> {
  code: number;
  msg: string;
  data: TData;
}

interface IUserProfile {
  name: string;
  age: number;
  roleId: string;
}

interface IPaginationRes<TItem = unknown> {
  list: TItem[];
  page: number;
  totalCount: number;
}

function fetchUserProfile(): Promise<IRes<IUserProfile>> {
  return Promise.resolve({
    code: 0,
    msg: "success",
    data: {
      name: "tom",
      age: 18,
      roleId: "1",
    },
  });
}

function featchUserProfileList(): Promise<IRes<IPaginationRes<IUserProfile>>> {
  return Promise.resolve({
    code: 0,
    msg: "success",
    data: {
      list: [
        {
          name: "tom",
          age: 18,
          roleId: "1",
        },
      ],
      page: 1,
      totalCount: 1,
    },
  });
}
```

### 函数中的泛型

```typescript
function handle<T>(input: T): T {
  return input;
}

const author = "hello";

let age = 18;

handle(author); // function handle<"hello">(input: "hello"): "hello"
handle(age); // function handle<number>(input: number): number
```

注意：

1. author*使用 const 声明，被推导为 hello*
2. age*使用 let 声明，被推导为 number*

```typescript
function swap<S, E>([start, end]: [S, E]): [E, S] {
  return [end, start];
}

const swapped1 = swap(["start", 123]); // [numebr, string]
const swapped2 = swap([null, 123]); // [number, null]
const swapped3 = swap([{ age: 18 }, 123]); // [number, { age: number }]
```

如果swap函数只想处理数字类型元组，就需要使用类型约束。

```typescript
function swap<S extends number, E extends number>([start, end]: [S, E]): [
  E,
  S
] {
  return [end, start];
}

const swapped1 = swap(["start", 123]); // 不能将类型“string”分配给类型“number”
const swapped2 = swap([123, 456]); // ok: [456, 123]

function pick<O extends object, P extends keyof O>(
  obj: O,
  ...props: P[]
): Pick<(O, >) {
  return props.reduce((res, prop) => {
    res[prop] = obj[prop];
    return res;
  }, {} as Pick<O, P>);
}

const o = {
  a: "a",
  b: 123,
  c: true,
  d: {
    name: "d",
  },
};
console.log(pick(o, "a", "b", "d"));
```

### Class 中的泛型

Class 中的泛型和函数中的泛型非常类似，只不过函数中泛型参数的消费方是参数和返回值类型，Class 中的泛型消费方则是属性、方法、装饰器等。同时 Class 内的方法还可以再声明自己独有的泛型参数。

```typescript
class Queue<QElementType> {
  private queue: QElementType[] = [];

  constructor(initialList: QElementType[]) {
    this.queue = initialList;
  }

  enqueue<QType extends QElementType>(item: QType): QElementType[] {
    this.queue.push(item);
    return this.queue;
  }

  dequeue(): QElementType | undefined {
    return this.queue.shift();
  }
}
```

## 结构化类型系统

### 结构化类型系统

```typescript
class Cat {
  eat() {}
  // miao() { }  // cat 的特有方法，dog 没有将使得 feedCat(new Dog()) 报错
}

class Dog {
  eat() {}
}

function feedCat(cat: Cat) {
  cat.eat();
}

feedCat(new Dog());
```

明明`feedCat`函数需要一只猫，但是给它一只狗也能正常运行，这就是**结构化类型系统**。TypeScript 比较两个类型并非通过类型的名称（即 `feedCat` 函数只能通过 Cat 类型调用），而是比较这两个类型上实际拥有的属性与方法。也就是说，这里实际上是比较 Cat 类型上的属性是否都存在于 Dog 类型上。

Cat 与 Dog 类型上的方法是一致的，所以它们虽然是两个名字不同的类型，但仍然被视为结构一致，这就是结构化类型系统的特性。

**鸭子类型（Duck Typing）**：**如果你看到一只鸟走起来像鸭子，游泳像鸭子，叫得也像鸭子，那么这只鸟就是鸭子**。

### 标称类型系统

标称类型系统（**Nominal Typing System**）要求，两个可兼容的类型，**其名称必须是完全一致的**。

```typescript
type USD = number;
type CNY = number;

const addCNY = (src: CNY, target: CNY): CNY => {
  return src + target;
};

const cny = 100;
const usd = 99;

addCNY(cny, usd); // Ok, TS的结构化类型没有报任何问题
```

C++、Java、Rust 等是标称类型系统的语言中将会提示错误，因此标称类型系统更能**限制了数据的可用操作与实际意义**。

## 类型系统层级

![img](https://gitee.com/wencbin/pics/raw/master/202401231729536.webp)

**TypeScript 中所有类型的兼容关系，从最上面一层的 any 类型，到最底层的 never 类型。**

装箱，值类型向引用类型转换；拆箱，引用类型向值类型转换。

### 从原始类型开始

```typescript
type Result1 = "hello world" extends string ? 1 : 0; // 1
type Result2 = true extends boolean ? 1 : 0; // 1
type Result3 = 1 extends number ? 1 : 0; // 1
type Result4 = { name: string } extends object ? 1 : 0; // 1
type Result5 = [] extends object ? 1 : 0; // 1
```

一个基础类型和它们对应的字面量类型必定存在父子类型关系。object 出现在这里并不恰当，因为它实际上代表着**所有非原始类型的类型，即数组、对象与函数类型**。

**字面量类型 < 包含此字面量类型的联合类型（同一基础类型） < 对应的原始类型**。

**原始类型 < 原始类型对应的装箱类型 < Object 类型**。

**never < 字面量类型**。

### 类型层级链

```typescript
// TypeChain = 8
type TypeChain = never extends "linbudu"
  ? "linbudu" extends "linbudu" | "599"
    ? "linbudu" | "599" extends string
      ? string extends String
        ? String extends Object
          ? Object extends any
            ? any extends unknown
              ? unknown extends any
                ? 8
                : 7
              : 6
            : 5
          : 4
        : 3
      : 2
    : 1
  : 0;
```
