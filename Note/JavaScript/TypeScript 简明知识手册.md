# TypeScript 简明知识手册

## TypeScript 项目

### 编译上下文

> 它来给文件分组，告诉 TypeScript 哪些文件是有效的，哪些是无效的。除了有效文件所携带信息外，编译上下文还包含有正在被使用的编译选项的信息。

定义这种逻辑分组，一个比较好的方式是使用 `tsconfig.json` 文件。

###  tsconfig.json

1. `tsc --init`创建一个tsconfig.json`文件，TypeScript 将 会把此目录和子目录下的所有 .ts 文件作为编译上下文的一部分；

2. 通过 `compilerOptions` 来定制你的编译选项：

   ```json
   /*tsconfig.json*/
   {
     "compilerOptions": {
   
       /* 基本选项 */
       "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
       "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
       "lib": [],                             // 指定要包含在编译中的库文件
       "allowJs": true,                       // 允许编译 javascript 文件
       "checkJs": true,                       // 报告 javascript 文件中的错误
       "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
       "declaration": true,                   // 生成相应的 '.d.ts' 文件
       "sourceMap": true,                     // 生成相应的 '.map' 文件
       "outFile": "./",                       // 将输出文件合并为一个文件
       "outDir": "./",                        // 指定输出目录
       "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
       "removeComments": true,                // 删除编译后的所有的注释
       "noEmit": true,                        // 不生成输出文件
       "importHelpers": true,                 // 从 tslib 导入辅助工具函数
       "isolatedModules": true,               // 将每个文件作为单独的模块 （与 'ts.transpileModule' 类似）.
   
       /* 严格的类型检查选项 */
       "strict": true,                        // 启用所有严格类型检查选项
       "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
       "strictNullChecks": true,              // 启用严格的 null 检查
       "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
       "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'
   
       /* 额外的检查 */
       "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
       "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
       "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
       "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）
   
       /* 模块解析选项 */
       "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
       "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
       "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
       "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
       "typeRoots": [],                       // 包含类型声明的文件列表
       "types": [],                           // 需要包含的类型声明文件名列表
       "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。
   
       /* Source Map Options */
       "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
       "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
       "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
       "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性
   
       /* 其他选项 */
       "experimentalDecorators": true,        // 启用装饰器
       "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
     }
   }
   ```

### TypeScript 编译

   使用 `tsconfig.json` 时从命令行手动运行 TypeScript 编译器

   1. 运行 tsc，它会在当前目录或者是父级目录寻找 `tsconfig.json` 文件
   2. `tsc -p ./path-to-project-directory` 。当然，这个路径可以是绝对路径，也可以是相对于当前目录的相对路径
   3. `tsc -w` 来启用 TypeScript 编译器的观测模式，在检测到文件改动之后，它将重新编译

### 指定文件

   ```json
   /* tsconfig.json */
   {
     ...,
     {
     "files": [
       "./some/file.ts"
     ]
   }
   }
   ```

   还可以使用 `include` 和 `exclude` 选项来指定需要包含的文件和排除的文件。

## 类型概述

   类型可以对程序实体（例如函数、变量和属性）施加静态约束，以便编译器和开发工具可以在开发过程中提供更好的验证和帮助。静态类型还提供了一种方法来更好地记录代码的意图，这有助于你和其他开发人员理解它。TypeScript 类型分析完全在编译时进行，不增加程序执行的运行时开销。

   ### 声明 let 和 const 变量

   声明具有块级作用域的变量，防止多次声明同一变量。

   > **注意**:`let` 声明可以在不进行初始化的情况下完成，而 `const` 声明始终使用值进行初始化。 `const` 声明分配后，就无法再重新分配。

   ```typescript
   let x: number;   //* Explicitly declares x as a number type
   let y = 1;       //* Implicitly declares y as a number type
   let z;           //* Declares z without initializing it
   ```

   ### 类型

   ### 任何类型 any

   所有类型都是单个顶级类型的子类型，称为 `any` 类型。 `any` 类型是可以无限制地表示任何 JavaScript 值的一种类型。

   **注意：应当尽量避免使用 any**。

   ### unknown 类型

   `unknown` 类型与 `any` 类型的相似之处在于，可以将任何值赋予类型 `unknown`。 但无法访问 `unknown` 类型的任何属性，也不能调用或构造它们。

   > **`any` 和 `unknown` 之间的核心区别在于你无法与 `unknown` 类型的变量进行交互；这样做会产生“编译器”错误。 `any` 将绕过所有编译时检查，并且在运行时评估对象；如果该方法或属性存在，它将表现出预期的效果。**

   ### 基元类型

   基元类型是 `boolean`、`number`、`string`、`void`、`null` 和 `undefined` 类型以及用户定义的枚举或 `enum` 类型。 `void` 类型的存在纯粹是为了指示不存在值，例如存在于没有返回值的函数中。 `null` 和 `undefined` 类型是所有其他类型的子类型。 无法显式引用 null 和 undefined 类型。 使用 `null` 和 `undefined` 字面量只能引用这些类型的值。

   ### 对象类型和类型参数

   对象类型是所有类、接口、数组和字面量类型（不是基元类型的任何类型）。

   类和接口类型将通过类和接口声明引入，并通过在其声明中为其指定的名称进行引用。 类和接口类型可以是具有一个或多个类型参数的通用类型。

   ### 类型断言

   如果需要将变量视为其他数据类型，则可以使用类型断言。 类型断言告诉 TypeScript 你在调用该语句之前已执行了所需的任何特殊检查。  它告诉编译器“相信我，我知道我在做什么”。 类型断言就像其他语言中的类型转换一样，但是它不执行数据的特殊检查或重组。  它对运行时没有影响，仅由编译器使用。

   类型断言有两种形式。 一种是 `as` 语法：

   ```
(randomValue as string).toUpperCase();
   ```

   另一个版本是“尖括号”语法：

   ```
(<string>randomValue).toUpperCase();
   ```

   > 注意`as` 是首选语法。 使用 `< >` 进行类型转换时，某些 TypeScript 应用程序（例如 JSX）可能会发生混淆。

   ### 联合类型

   联合类型描述的值可以是几种类型之一。联合类型使用竖线 (`|`) 分隔每种类型，示例中，`multiType` 可以是  `number` 或  `boolean`：

   ```typescript
let multiType: number | boolean;
multiType = 20;         //* Valid
multiType = true;       //* Valid
multiType = "twenty";   //* Invalid
   ```

   ### 交叉类型

   交叉类型与联合类型密切相关，但它们的使用方式完全不同。 交叉类型组合两个或多个类型以创建具有现有类型的所有属性的新类型。 这使你可以将现有类型加在一起，以获得具有所需所有功能的单个类型。

   交叉类型使用与号 (`&`) 分隔每种类型，最常与接口一起使用。

```typescript
interface Employee {
  employeeID: number;
  age: number;
}
interface Manager {
  stockPlan: boolean;
}
type ManagementEmployee = Employee & Manager;
let newManager: ManagementEmployee = {
    employeeID: 12345,
    age: 34,
    stockPlan: true
};
```

### 定义字面量类型

字面量类型以对象、数组、函数或构造函数类型字面量的形式编写，用于将其他类型组合为新类型。

```typescript
type testResult = "pass" | "fail" | "incomplete";
let myResult: testResult;
myResult = "incomplete";    //* Valid
myResult = "pass";          //* Valid
myResult = "failure";       //* Invalid
```

在定义字面量类型或类型的任何组合时，也可以使用 `boolean`、`number` 值。

### 集合类型

#### 数组类型

 第一种方式，使用元素类型后跟方括号 (`[ ]`) 来表示该元素类型的数组。第二种方式，通过语法 `Array<type>` 使用泛型 `Array` 类型。

```typescript
let list: number[] = [1, 2, 3];		 // 方法一
let list: Array<number> = [1, 2, 3]; // 方法二
```

#### 元祖类型

声明元组，使用语法 `variableName: [type, type, ...]`。

```typescript
let person1: [string, number] = ['Marcia', 35];
```

> **注意**元组 `array` 中的元素是固定的且值的顺序必须与类型的顺序匹配

## 接口

### 接口概述

接口会充当命名类型检查关注类型的角色，并且是在代码内定义“代码协定”以及在项目外定义代码协定的一种强大方法。

示例接口简单定义 `Employee` 对象的两个属性和一个方法：

```typescript
interface Employee {
    firstName: string;
    lastName: string;
    fullName(): string;
}
```

接口的唯一任务是描述类型。，它定义了代码协定所需的内容，而实现接口的变量、函数或类则通过提供所需的实现详细信息来满足协定。**接口不会初始化或实现在其中声明的属性。**

employee 实例实现接口协定：

```typescript
let employee: Employee = {
    firstName : "Emil",
    lastName: "Andersson",
    fullName(): string {
        return this.firstName + " " + this.lastName;
    }
}
```

**注意： 如果一个接口和一个类实现相同的结构，则它们可以互换使用。**

#### 使用接口的场景

1. 为常用类型创建简写名称。 即使是使用一个简单的接口（如前面示例中声明的接口），你仍然可以享受 Intellisense 和类型检查带来的好处。
2. 在一组对象中保持一致性，因为实现接口的每个对象都在相同的类型定义下运行。  当你与开发人员团队合作并想要确保将正确的值传递到属性、构造函数或函数时，这会很有用。 例如，实现接口的对象必须实现接口的所有必需成员。  因此，如果未传递正确类型的所有必需参数，TypeScript 编译器将引发错误。
3. 描述现有的 JavaScript API 并阐明函数参数和返回类型。 这在使用 jQuery 等 JavaScript 库时特别有用。 接口可以让你清楚地了解函数的期望值和返回值，而无需重复访问文档。

#### 接口与类型别名

上述 `Employee` 接口还可以使用 `type` 键字表示为类型别名：

```typescript
type Employee = {
    firstName: string;
    lastName: string;
    fullName(): string;
}
```

异同点在于：类型别名是数据类型（例如联合、基元、交集、元组或其他任何类型）的定义。 另一方面，接口是描述数据形状（例如对象）的一种方法。  类型别名可以像接口一样使用；但有一些细微的差异。 主要区别在于，不能重新打开类型别名以添加新属性，而接口始终是可扩展的。  此外，只能使用类型别名描述并集或元组。

### 接口声明

若要声明接口，请以 `interface` 关键字开头，后跟接口名称（标识符）。接口名称不能是类型系统中预定义的类型名称之一。 而且按照惯例，接口名称为 PascalCase 形式。

> **备注**
>
> TypeScript 编码准则建议接口不应以字母 `I` 开头。

然后，定义该接口的属性（或成员）及其类型。 属性可以为必需、可选或只读属性。

| 属性类型 | 说明                                                         | 示例                          |
| :------- | :----------------------------------------------------------- | :---------------------------- |
| 必须     | 除非另行指定，否则所有属性都是必需的。                       | `firstName: string;`          |
| 可选     | 在属性名称的末尾添加问号 (`?`)。 对于不是必需的属性，请使用此属性。 这可以防止类型系统在省略该属性时引发错误。 | `firstName?: string;`         |
| 只读     | 在属性名称的前面添加 **readonly** 关键字。 对于只应在首次创建对象时修改的属性，请使用此属性。 | `readonly firstName: string;` |

### 扩展接口

接口可以相互扩展，当使用一个或多个接口扩展接口时，将适用以下规则：

- 必须从所有接口实现所有必需的属性。
- 如果属性具有完全相同的名称和类型，则两个接口可以具有相同的属性。
- 如果两个接口具有名称相同但类型不同的属性，则必须声明一个新属性，以使生成的属性是这两个接口的子类型。

声明一个新接口，该接口 `extends` 已声明的接口，再为新接口的属性进行声明即可完成接口的扩展。

```typescript
interface IceCream {
  flavor: string;
  scoops: number;
  instructions?: string;
}

interface Sundae extends IceCream {
  sauce: 'choclate' | 'caramel' | 'strawberry'
  nuts?: boolean
  whippedCream?: boolean
  instructions?: string
}

function tooManyScoops(dessert: Sundae) {
  if(dessert.scoops >= 4)
    return dessert.scoops + ' is too many scoops!'
  else return 'Your order will be ready soon.'
}

let icecream: Sundae = {
  flavor: 'test',
  scoops: 10,
  sauce: 'strawberry'
}
console.log(tooManyScoops(icecream))
```

### 接口中使用其他方法

#### 创建可索引类型

可以使用描述可编制索引的**数组类型的接口**。

可编制索引的类型具有“索引签名”，该签名描述可用于在对象中编制索引的类型，以及编制索引时相应的返回类型 **** 。

例如，`IceCreamArray` 接口将索引签名声明为 `number` 并返回 `string` 类型。 此索引签名声明 `IceCreamArray` 是使用数字编制索引的，它将返回一个字符串。

```typescript
interface IceCreamArray {
    [index: number]: string;
}

let myIceCream: IceCreamArray;
myIceCream = ['chocolate', 'vanilla', 'strawberry'];
let myStr: string = myIceCream[0];
console.log(myStr);
```

#### 使用接口描述 JavaScript API

可以使用接口描述现有的 JavaScript API 并阐明函数参数和返回类型。 接口使你能够清楚地了解 API 的期望值和返回值。

   ### 声明空间

   TypeScript 里存在两种声明空间：类型声明空间与变量声明空间。

   #### 类型声明空间

   类型声明空间包含用来当做类型注解的内容，例如下面的类型声明：

   ```ts
   class Foo {}
   interface Bar {}
   type Bas = {};
   ```

   可以将 `Foo`, `Bar`, `Bas` 作为类型注解使用，示例如下：

   ```ts
   let foo: Foo;
   let bar: Bar;
   let bas: Bas;
   ```

   但不能够作为一个变量来使用，因为没有定义在变量声明空间中。

   #### 变量声明空间

   变量声明空间包含可用作变量的内容，在上文中 `Class Foo` 提供了一个类型 `Foo` 到类型声明空间，此外它同样提供了一个变量 `Foo` 到变量声明空间，如下所示：

   ```ts
   class Foo {}
   const someVar = Foo;
   const someOtherVar = 123;
   ```

   **注意：不能把一些如 `interface` 定义的内容当作变量使用**

## 函数

### 命名函数

命名函数是使用关键字 `function` 编写的函数声明，在当前范围内以不同名称提供。

> 在运行任何代码之前，命名函数声明会加载到执行上下文中。 这称为提升，这**意味着你可以在声明函数之前使用该函数。**

TypeScript 可以为函数的参数和返回值提供类型注释。

```typescript
function addNumbers (x: number, y: number): number {
   return x + y;
}
addNumbers(1, 2);
```

### 匿名函数

函数表达式（或匿名函数）是未预先加载到执行上下文中的函数，并且仅当代码遇到该函数时才会运行。 函数表达式是在运行时创建的，并且必须先声明才能调用。 （这意味着不会对它们进行提升，而命名函数声明在程序开始执行时就会进行提升，并且可以在其声明之前调用。）

示例将 `function` 表达式赋值给变量 `addNumbers`：

```typescript
let addNumbers = function (x: number, y: number): number {
   return x + y;
}
addNumbers(1, 2);
```

### 箭头函数

```typescript
// Anonymous function
let addNumbers1 = function (x: number, y: number): number {
   return x + y;
}

// Arrow function
let addNumbers2 = (x: number, y: number): number => x + y;

// Multiline arrow function
let total2 = (input: number[]): number => {
    let total: number =  0;
    for(let i = 0; i < input.length; i++) {
        if(isNaN(input[i])) {
            continue;
        }
        total += Number(input[i]);
    }
    return total;
}
```

### 参数

除非另行指定，否则所有函数形参都是必需的，并且传递给函数的实参数目必须与该函数所需的必需形参数目匹配。

#### 可选参数

可以通过在参数名后面附加问号 (?) 来定义可选参数。

```typescript
/* x 是必需的，y 是可选的。 */
function addNumbers(x: number, y?:number) {
  return x + (y ? y:0)
}

console.log(addNumbers(1))  // 1
console.log(addNumbers(1, 2))  // 3
```

#### 默认参数

将值作为实参传递给可选形参，则将向其分配该值。 否则，将为它分配默认值。 **与可选参数一样，默认参数必须位于参数列表中所需的参数之后。**

```typescript
/* x 是必需的，y 是可选的。 如果值没有传递给 y，则默认值为 0 */
function addNumbers(x: number, y = 0) {
  return x + y
}

console.log(addNumbers(1))  // 1
console.log(addNumbers(1, 2))  // 3
```

#### rest 参数

使用多个参数作为一个组（在数组中）或不知道函数最终将采用的参数数量，则可以使用 rest 参数。 rest 参数被视为无限数量的可选参数。 可以将它们保留不动，或根据需要调整数量。

```typescript
let addAllNumbers = (firstNumber: number, ...restOfNumbers: number[]): number => {
   let total: number =  firstNumber;
   for(let counter = 0; counter < restOfNumbers.length; counter++) {
      if(isNaN(restOfNumbers[counter])){
         continue;
      }
      total += Number(restOfNumbers[counter]);
   }
   return total;
}
addAllNumbers(1, 2, 3, 4, 5, 6, 7);  // returns 28
addAllNumbers(2);                    // returns 2
```

#### 析构对象参数

启用命名参数，可以使用称为析构对象参数的技术。 这使你能够在函数中使用接口来定义命名参数，而不是定位参数。

```typescript
interface Message {
   text: string;
   sender: string;
}

function displayMessage({text, sender}: Message) {
    console.log(`Message from ${sender}: ${text}`);
}

displayMessage({sender: 'Christopher', text: 'hello, world'});
```

### 函数类型

类型别名定义名为 `calculator` 的函数类型。 类型签名有一个参数列表 `(x: number, y: number)` 并返回 `number`，以箭头 (`=>`) 运算符分隔。*定义函数时，函数参数的名称不需要与函数类型中的名称匹配*

**请注意，类型签名的语法与箭头函数相同。**

```typescript
type calculator = (x: number, y: number) => number;
// 实现
let addNumbers: calculator = (x, y) => x + y
let subtractNumbers: calculator = (x, y) => x - y

console.log(addNumbers(1, 2)) // 3
console.log(subtractNumbers(1, 2))  // -1
```

接口定义函数类型:

```typescript
// type calculator = (x: number, y: number) => number;
interface Calculator {
    (x: number, y: number): number;
}
// 实现
let addNumbers: Calculator = (x, y) => x + y
let subtractNumbers: Calculator = (x, y) => x - y

console.log(addNumbers(1, 2)) // 3
console.log(subtractNumbers(1, 2))  // -1
```

两者的运用场景:

- 函数要使用元组或联合类型时,使用类型别名方式更好
- 函数类型需要扩展时,使用接口定义更好

## 类

### 概述

将类视为用于生成对象的蓝图，如汽车。 `Car` 类描述汽车的属性，例如品牌、颜色或车门数量。 它还介绍了汽车可以执行的行为，如加速、制动或转向。

但 `Car` 类只是一个制造汽车的计划。 必须从 `Car` 类生成一个实例 `Car`，然后才能成为向其分配属性值的对象（例如将颜色设置为蓝色）或调用其行为（如踩下制动。）。

类可重复使用，可以创建任意数量的新 `Car` 对象，每个对象都有其自身的特征。 还可以扩展此 `Car` 类。 例如，`ElectricCar` 类可以扩展 `Car`。 它将具有与 `Car` 相同的属性和行为，但也可以有其自己的唯一属性和行为，如档位和充电操作。

### 类组件

- 属性（也称为字段）是对象的数据（或特性）。 这些是可以在代码中设置或返回的对象的定义特征。
- `constructor` 是一个特殊函数，用于基于类创建和初始化对象。 创建类的新实例时，构造函数使用类形状创建一个新对象，并使用传递给它的值对其进行初始化。
- 访问器是一种用于 `get` 或 `set` 属性值的函数类型。 属性可以是只读的，只需省略类中的 `set` 访问器，或者通过省略 `get` 访问器使其不可访问（如果尝试访问它，该属性将返回 `undefined`，即使在初始化期间为其赋值也是如此。）
- 方法是定义对象可以执行的行为或操作的函数。 可以调用这些方法来调用对象的行为。 还可以定义只能从类本身访问的方法，并且通常由类中的其他方法调用以执行任务。

### 创建类

#### 定义类

使用 `class` 关键字后跟类名创建一个新的 `class`。

#### 声明类属性

将类属性视为在初始化时传递给对象的原始数据。

#### 定义类构造函数

类创建两个不同的类型：实例类型（定义类实例的成员）和 `constructor` 函数类型（定义类 `constructor` 函数的成员）。 `constructor` 函数类型也称为“静态端”类型，因为它包括类的静态成员。

使用 `constructor` 可以简化类，并在使用多个类类时使它们更易于管理。

`constructor` 函数初始化类的属性，并且有三个部分：

- `constructor` 关键字。
- 参数列表，定义在创建新实例时将传递给新对象的参数。 在定义参数列表时，请记住：
  - 不需要为类中的每个属性定义参数。
  - 与所有 TypeScript 函数一样，参数可以是必需的或可选的，可以是默认值，也可以是其他参数。 （这是与 JavaScript 的一个关键区别。）
  - 参数名称可以与属性名称不同。 请记住，当你使用此类型的对象时，这些名称将出现在 Intellisense 中，因此请使用具有足够说明性的名称。
- 属性赋值。 每个语句都将参数的值赋给属性的值。 要表明你正在访问类的成员（本例中为属性），请应用 `this.` 关键字。

一个类最多只能包含一个 `constructor` 声明。 如果类不包含 `constructor` 声明，则提供自动构造函数。

#### 定义访问器

可以直接访问类属性（它们在默认情况下都是 `public`），但 TypeScript 支持使用 getter/setter 作为拦截对属性的访问的方法。 这使你可以更精细地控制如何在每个对象上访问成员。

若要 `set` 或从代码中返回对象成员的值，则必须在类中定义 `get` 和 `set` 访问器。

#### 定义类方法

可以在类中定义任何 TypeScript 函数，并将其作为对象的方法调用，或者从类中的其他函数调用。 这些类成员描述类可执行的行为，并可执行类所需的任何其他任务。

类示例：

```typescript
class Car {
  // Properties
  _make: string;
  _color: string;
  _doors: number;
  // Constructor
  constructor(make: string, color: string, doors: number = 4) {
    this._make = make
    this._color = color
    this._doors = doors
  }
  // Accessors
  set make(make: string) {
    this._make = make
  }

  get doors() {
    return this._doors
  }

  set doors(doors: number) {
    if ((doors % 2) === 0) this._doors = doors
    else throw new Error('门的数量必须为偶数')
  }
  // Methods
  accelerate(speed: number): string {
    return `${this.worker()} is accelerating to ${speed} MPH.`
  }
  worker(): string {
    return this._make
  }
}
```

### 类访问修饰符

| 访问修饰符  | 说明                                                         |
| :---------: | :----------------------------------------------------------- |
|  `public`   | 如果不指定访问修饰符，则默认为 public。 还可以使用 `public` 关键字显式地将成员设置为 public。 |
|  `private`  | 如果使用 `private` 关键字修改成员，则不能从其包含类的外部访问该成员。 |
| `protected` | `protected` 修饰符的作用与 `private` 修饰符非常类似，但也可以在派生类中访问声明 `protected` 的成员。 |

此外，还可以**通过使用 readonly 修饰符将属性设置为 `readonly`。 readonly 属性只能在其声明时或在 `constructor` 中初始化时设置**。

### 静态属性

实例属性，意味着它们将在类对象的每个实例中实例化和调用。 还有另一种类型的属性称为静态属性。 静态属性和方法由类的所有实例共享。

若要将属性设置为静态，请在属性或方法名称前使用 `static` 关键字。

```typescript
class Car {
  // Properties
  private static numberOfCars: number = 0
  _make: string;
  _color: string;
  _doors: number;
  // Constructor
  constructor(make: string, color: string, doors: number = 4) {
    this._make = make
    this._color = color
    this._doors = doors
    Car.numberOfCars++  // 每实例化一个类示例就计算一次现有车辆的总数
  }
  // Accessors
  // 静态方法
  public static getNumberOfCars() {
    return Car.numberOfCars
  }
}

let car1 = new Car('BMW', 'Silver', 4)
let car2 = new Car('Benz', 'White', 4)
console.log(Car.getNumberOfCars())
```

### 继承

`extends`创建一个新类以继承。继承的类将继承基类的属性和方法，也可定义自身的唯一属性和和行为，通过重用原来的类的属性和方法，并加以扩展和构建，减少降低复杂度，增加可用性。

应用场景：

- 代码可重用性。 可以一次性开发，并在许多地方重用。 此外，这有助于避免在代码中出现冗余。
- 可以使用一个基类派生层次结构中的任意数量的子类。 例如，`Car` 层次结构中的子类还可以包括 `SUV` 类或 `Convertible` 类。
- 不必在许多具有类似功能的不同类中更改代码，只需在基类中更改一次即可。

新类继承时， `constructor ` 需注意：

- 参数列表可以包含基类和子类的任何属性。 （和 TypeScript 中的所有参数列表一样，请记住，必需参数必须出现在可选参数之前。）
- 在 `constructor` 正文中，你必须添加 `super()` 关键字以包括来自基类的参数。 `super` 关键字在运行时执行基类的 `constructor`。
- 在引用子类中的属性时，`super` 关键字必须出现在对 `this.` 的任何引用之前。

### 使用接口以确保类的形状

使用接口来建立描述对象的必需属性及其类型的“代码协定”。 因此，你可以使用接口来确保类实例形状。 类声明可以引用其 `implements` 子句中的一个或多个接口来验证它们是否提供接口的实现。

**注意：接口只能描述类的公共面，不能包括私有成**

## 泛型

### 定义

泛型定义一个或多个“类型变量”来标识要传递给组件的一个或多个类型（用尖括号 (`< >`) 括起来）。 （你还会看到称为类型参数或泛型参数的类型变量。）在上面的示例中，函数中的类型变量称为 `<T>`。 `T` 是泛型的常用名称，但可以根据需要对其进行命名。

指定类型变量后，可以使用它来代替参数中的类型、返回类型或将其置于函数中要添加类型批注的任何其他位置。

```typescript
function getArray<T>(items : T[]) : T[] {
    return new Array<T>().concat(items);
}
```

代码解释：

![image-20211206155349675](https://gitee.com/wencbin/pics/raw/master/images/20211206155350.png)

### 使用多个类型变量

泛型组件中并不是只能使用单个类型变量。

```typescript
function identity<T, U> (value: T, message: U) : T {
    console.log(message);
    return value
}
```

### 方法和属性使用泛型

#### 泛型约束来限制类型

方法一：将自定义 `type` 声明为元组，然后使用自定义类型 `extend` 类型变量。

```typescript
type ValidTypes = string | number;	// 元组

function identity<T extends ValidTypes, U> (value: T, message: U) : T {
    let result: T = value + value;    // Error
    console.log(message);
    return result
}
```

> 方法一这样报错，在本例中没什么效果，意在说明能使用这样的方法进行泛型约束

方法二：将类型限制为另一个对象的属性时可将 `extends` 与 `keyof` 运算符一起使用，该运算符采用对象类型并生成其键的字符串或数字文本并集。

```typescript
function getPets<T, K extends keyof T>(pet: T, key: K): T[K] {
  return pet[key]
}

let pets1 = { cats: 4, dogs: 3, parrots: 1, fish: 6 };
let pets2 = { 1: "cats", 2: "dogs", 3: "parrots", 4: "fish"}

console.log(getPets(pets1, "fish"));  // 6
console.log(getPets(pets2, "3"));     // Error
console.log(getPets(pets2, 3));     // parrots
```

#### 类型保护

使用类型保护可解决方法一的问题：

```typescript
ype ValidTypes = string | number;
function identity<T extends ValidTypes, U> (value: T, message: U) {   // Return type is inferred
    let result: ValidTypes = '';
    let typeValue: string = typeof value;
	
    /* 类型保护 */
    if (typeof value === 'number') {           // Is it a number?
        result = value + value;                // OK
    } else if (typeof value === 'string') {    // Is it a string?
        result = value + value;                // OK
    }

    console.log(`The message is ${message} and the function returns a ${typeValue} value of ${result}`);

    return result
}

let numberValue = identity<number, string>(100, 'Hello');
let stringValue = identity<string, string>('100', 'Hello');

console.log(numberValue);       // Returns 200
console.log(stringValue);       // Returns 100100
```

> **注意:只能使用 `typeof` 类型保护来检查基元类型 `string`、`number`、`bigint`、`function`、`boolean`、`symbol`、`object` 和未定义类型。 若要检查类的类型，请使用 `instanceof` 类型保护。**

### 类和接口使用泛型

#### 泛型接口

声明:

```typescript
interface Identify<T, U> {
  value: T
  message: U
}

interface ProcessIdentity<T, U> {
    (value: T, message: U): T;
}
```

#### 泛型类

```typescript
interface ProcessIdentity<T, U> {
    value: T;
    message: U;
    process(): T;
}

class processIdentity<X, Y> implements ProcessIdentity<X, Y> {
    value: X;
    message: Y;
    constructor(val: X, msg: Y) {
        this.value = val;
        this.message = msg;
    }
    process() : X {
        console.log(this.message);
        return this.value
    }
}
```

### 自定义类型和类使用 extends 进行泛型约束

```typescript
class Car {
  make: string = 'BMW'
  doors: number = 4
}

class ECar {
  make: string = 'BYD'
  doors: number = 4
}

class Truck extends Car {
  make: string = 'S1'
  doors = 2
}

function acceleration<T extends Car>(car: T): T {
  console.log(`All ${car.doors} doors are closed`)
  console.log(`the ${car.make} is now acceleration`)
  return car
}

let ecar = new ECar()
let tcar = new Truck()
acceleration(ecar)
acceleration(tcar)
```





## 命名空间和模块

   ### 模块

#### 全局模块

   在默认情况下，当你开始在一个新的 TypeScript 文件中写下代码时，它处于全局命名空间中。**使用全局变量空间是危险的，因为它会与文件内的代码命名冲突。我们推荐使用下文中将要提到的文件模块。**

#### 文件模块

   文件模块也被称为外部模块。如果在你的 TypeScript 文件的根级别位置含有 `import` 或者 `export`，那么它会在这个文件中创建一个本地的作用域。

   文件里使用 `import` 时，它不仅允许你使用从其他文件导入的内容，还会将此文件标记为一个模块，文件内定义的声明也不会“污染”全局命名空间。

   推荐使用：ES 模块语法。

从某个模块中导入单个导出：

```typescript
import { <component name> } from '<module name>'
```

若要重命名导入，请使用 as 关键字：

```typescript
import { <component name> as <new name> } from '<module name>'
```

若将整个模块导入单个变量，并使用它访问模块导出：

```typescript
import * as <variable name> from '<module name>'
```

   ### 命名空间

   在 JavaScript 使用命名空间时， 这有一个常用的、方便的语法：

   ```js
   (function(something) {
     something.foo = 123;
   })(something || (something = {}));
   ```

   `something || (something = {})` 允许匿名函数 `function (something) {}` 向现有对象添加内容，或者创建一个新对象，然后向该对象添加内容。这意味着你可以拥有两个由某些边界拆成的块。

   TypeScript 提供了 `namespace` 关键字来描述这种分组：

   ```ts
   namespace Utility {
     export function log(msg) {
       console.log(msg);
     }
     export function error(msg) {
       console.log(msg);
     }
   }
   
   // usage
   Utility.log('Call me');
   Utility.error('maybe');
   ```

   `namespace` 关键字编译后的 JavaScript 代码，与我们早些时候看到的 JavaScript 代码一样。

   ```js
   (function (Utility) {
     // 添加属性至 Utility
   })(Utility || Utility = {});
   ```

   **注意：命名空间是支持嵌套的。因此，你可以做一些类似于在 `Utility` 命名空间下嵌套一个命名空间 `Messaging` 的事情。**

   ## 类型系统

   ### 基本注解

   类型注解使用 `:TypeAnnotation` 语法。在类型声明空间中可用的任何内容都可以用作类型注解。

   在下面这个例子中，使用了变量、函数参数以及函数返回值的类型注解：

   ```ts
   const num: number = 123;
   function identity(num: number): number {
     return num;
   }
   ```

   ### 原始类型

   JavaScript 原始类型也同样适应于 TypeScript 的类型系统，因此 `string`、`number`、`boolean` 也可以被用作类型注解：

   ```ts
   let num: number;
   let str: string;
   let bool: boolean;
   
   num = 123;
   num = 123.456;
   num = '123'; // Error
   
   str = '123';
   str = 123; // Error
   
   bool = true;
   bool = false;
   bool = 'false'; // Error
   ```

   ### 数组

   TypeScript 为数组提供了专用的类型语法，因此你可以很轻易的注解数组。它使用后缀 `[]`， 接着你可以根据需要补充任何有效的类型注解（如：`:boolean[]`）。它能让你安全的使用任何有关数组的操作，而且它也能防止一些类似于赋值错误类型给成员的行为。如下所示：

   ```ts
   let boolArray: boolean[];
   
   boolArray = [true, false];
   console.log(boolArray[0]); // true
   console.log(boolArray.length); // 2
   
   boolArray[1] = true;
   boolArray = [false, false];
   
   boolArray[0] = 'false'; // Error
   boolArray = 'false'; // Error
   boolArray = [true, 'false']; // Error
   ```

   ### 接口

   合并众多类型声明至一个类型声明。

   ```ts
   interface Name {
     first: string;
     second: string;
   }
   
   let name: Name;
   name = {
     first: 'John',
     second: 'Doe'
   };
   
   name = {
     // Error: 'Second is missing'
     first: 'John'
   };
   
   name = {
     // Error: 'Second is the wrong type'
     first: 'John',
     second: 1337
   };
   ```

   类型注解：`first: string` + `second: string` 合并到了一个新的类型注解里 `Name`，这样能强制对每个成员进行类型检查。

   ### 内联类型注解

   与创建一个接口不同，你可以使用内联注解语法注解任何内容：`:{ /*Structure*/ }`：

   ```ts
   let name: {
     first: string;
     second: string;
   };
   
   name = {
     first: 'John',
     second: 'Doe'
   };
   
   name = {
     // Error: 'Second is missing'
     first: 'John'
   };
   
   name = {
     // Error: 'Second is the wrong type'
     first: 'John',
     second: 1337
   };
   ```

   内联类型能为你快速的提供一个类型注解。它可以帮助你省去为类型起名的麻烦（你可能会使用一个很糟糕的名称）。然而，如果你发现需要多次使用相同的内联注解时，那么考虑把它重构为一个接口（或者是 `type alias`，它会在接下来的部分提到）是一个不错的主意。

   ### 特殊类型

   #### any

   在类型系统里 `any` 能够兼容所有的类型（包括它自己）。因此，所有类型都能被赋值给它，它也能被赋值给其他任何类型。

   #### null和undefined

   都能被赋值给任意类型的变量。

   #### void

   使用 `:void` 来表示一个函数没有一个返回值。

   #### 泛型

   在计算机科学中，许多算法和数据结构并不会依赖于对象的实际类型。但是，你仍然会想在每个变量里强制提供约束。例如：在一个函数中，它接受一个列表，并且返回这个列表的反向排序，这里的约束是指传入至函数的参数与函数的返回值：

   ```ts
   function reverse<T>(items: T[]): T[] {
     const toreturn = [];
     for (let i = items.length - 1; i >= 0; i--) {
       toreturn.push(items[i]);
     }
     return toreturn;
   }
   
   const sample = [1, 2, 3];
   let reversed = reverse(sample);
   
   console.log(reversed); // 3, 2, 1
   
   // Safety
   reversed[0] = '1'; // Error
   reversed = ['1', '2']; // Error
   
   reversed[0] = 1; // ok
   reversed = [1, 2]; // ok
   ```

   #### 联合类型

   希望属性为多种类型之一，如字符串或者数组。TypeScript 中联合类型能派上用场的地方（它使用 `|` 作为标记，如 `string | number`）。用例是一个可以接受字符串数组或单个字符串的函数：

   ```ts
   function formatCommandline(command: string[] | string) {
     let line = '';
     if (typeof command === 'string') {
       line = command.trim();
     } else {
       line = command.join(' ').trim();
     }
   
     // Do stuff with line: string
   }
   ```

   #### 交叉类型

    `extend` 是一种非常常见的模式，在这种模式中，你可以从两个对象中创建一个新对象，新对象拥有着两个对象所有的功能。交叉类型可以让你安全的使用此种模式：

   ```ts
   function extend<T extends object, U extends object>(first: T, second: U): T & U {
     const result = <T & U>{};
     for (let id in first) {
       (<T>result)[id] = first[id];
     }
     for (let id in second) {
       if (!result.hasOwnProperty(id)) {
         (<U>result)[id] = second[id];
       }
     }
   
     return result;
   }
   
   const x = extend({ a: 'hello' }, { b: 42 });
   
   // 现在 x 拥有了 a 属性与 b 属性
   const a = x.a;
   const b = x.b;
   ```

   #### 元组类型

   JavaScript 并不支持元组，开发者们通常只能使用数组来表示元组。而 TypeScript 支持它，开发者可以使用 `:[typeofmember1, typeofmember2]` 的形式，为元组添加类型注解，元组可以包含任意数量的成员，示例：

   ```ts
   let nameNumber: [string, number];
   
   // Ok
   nameNumber = ['Jenny', 221345];
   
   // Error
   nameNumber = ['Jenny', '221345'];
   ```

   将其与 TypeScript 中的解构一起使用：

   ```ts
   let nameNumber: [string, number];
   nameNumber = ['Jenny', 322134];
   
   const [name, num] = nameNumber;
   ```

   #### 类型别名

   TypeScript 提供了为类型注解设置别名的便捷语法，你可以使用 `type SomeName = someValidTypeAnnotation` 来创建别名：

   ```ts
   type StrOrNum = string | number;
   
   // 使用
   let sample: StrOrNum;
   sample = 123;
   sample = '123';
   
   // 会检查类型
   sample = true; // Error
   ```

   ### 环境声明

   #### 声明文件

   可以通过 `declare` 关键字来告诉 TypeScript，你正在试图表述一个其他地方已经存在的代码，如：写在 JavaScript、CoffeeScript 或者是像浏览器和 Node.js 运行环境里的代码：

   ```ts
   foo = 123; // Error: 'foo' is not defined
   ```

   和：

   ```ts
   declare var foo: any;
   foo = 123; // allow
   ```

   可以选择把这些声明放入 `.ts` 或者 `.d.ts` 里。**强烈建议你应该把声明放入独立的 `.d.ts` 里（可以从一个命名为 `global.d.ts` 或者 `vendor.d.ts` 文件开始）**。

   #### 变量

   告诉 TypeScript 编辑器关于 `process` 变量时，你可以这么做：

   ```ts
   declare let process: any;
   ```

   > 并不需要为 `process` 做这些，因为已经存在于社区维护的 [`node.d.ts`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/index.d.ts)

   推荐尽可能的使用接口：

   ```ts
   interface Process {
     exit(code?: number): void;
   }
   
   declare let process: Process;
   ```

   原因是这允许其他人扩充这些全局变量，并将告诉TypeScript有关这些声明的修改。

   ### 接口

   #### 类可以实现接口

   在类中使用必须要被遵循的接口（类）或别人定义的对象结构，可以使用 `implements` 关键字来确保其兼容性：

   ```ts
   interface Point {
     x: number;
     y: number;
   }
   
   class MyPoint implements Point {
     x: number;
     y: number; // Same as Point
   }
   ```

   **注意，`implements` 限制了类实例的结构。**

   ### 枚举

   枚举是组织收集有关联变量的一种方式，许多程序语言（如：c/c#/Java）都有枚举数据类型。

   ```ts
   enum CardSuit {
     Clubs,
     Diamonds,
     Hearts,
     Spades
   }
   
   // 简单的使用枚举类型
   let Card = CardSuit.Clubs;
   
   // 类型安全
   Card = 'not a member of card suit'; // Error: string 不能赋值给 `CardSuit` 类型
   ```

   ### lib.d.ts

   安装 `TypeScript` 时，会顺带安装一个 `lib.d.ts` 声明文件。这个文件包含 JavaScript 运行时以及 DOM 中存在各种常见的环境声明。

   - 它自动包含在 TypeScript 项目的编译上下文中；
   - 它能让你快速开始书写经过类型检查的 JavaScript 代码。

   你可以通过指定 `--noLib` 的编译器命令行标志（或者在 `tsconfig.json` 中指定选项 `noLib: true`）从上下文中排除此文件。

   ```json
   {
     "compilerOptions": {
       "noLib": true
     }
   }
   ```

   ### 函数

   #### 参数注解

   注解函数参数，就像你可以注解其他变量一样:

   ```ts
   // variable annotation
   let sampleVariable: { bar: number };
   
   // function parameter annotation
   function foo(sampleParameter: { bar: number }) {}
   ```

   这里我们使用了内联类型注解，除此之外，你还可以使用接口等其他方式。

   #### 返回类型注解

   你可以在函数参数列表之后使用与变量相同的样式来注解返回类型，如例子中 `：Foo`：

   ```ts
   interface Foo {
     foo: string;
   }
   
   // Return type annotated as `: Foo`
   function foo(sample: Foo): Foo {
     return sample;
   }
   ```

   我们在这里使用了一个 `interface`，但你可以自由地使用其他注解方式，例如内联注解。

   通常，你不*需要*注解函数的返回类型，因为它可以由编译器推断：

   ```ts
   interface Foo {
     foo: string;
   }
   
   function foo(sample: Foo) {
     return sample; // inferred return type 'Foo'
   }
   ```

   不打算从函数返回任何内容，则可以将其标注为：`void`，或是不写，让编译器自动推断。

   #### 可选参数？

   你可以将参数标记为可选:

   ```ts
   function foo(bar: number, bas?: string): void {
     // ..
   }
   
   foo(123);
   foo(123, 'hello');
   ```

   或者，当调用者没有提供该参数时，你可以提供一个默认值（在参数声明后使用 `= someValue` ）：

   ```ts
   function foo(bar: number, bas: string = 'hello') {
     console.log(bar, bas);
   }
   
   foo(123); // 123, hello
   foo(123, 'world'); // 123, world
   ```

   #### 重载

   主要用于文档 + 类型安全，可以使用函数重载来*强制*和*记录*这些约束。你只需多次声明函数头。最后一个函数头是在函数体内实际处于活动状态但不可用于外部。

   ```ts
   // 重载
   function padding(all: number);
   function padding(topAndBottom: number, leftAndRight: number);
   function padding(top: number, right: number, bottom: number, left: number);
   // Actual implementation that is a true representation of all the cases the function body needs to handle
   function padding(a: number, b?: number, c?: number, d?: number) {
     if (b === undefined && c === undefined && d === undefined) {
       b = c = d = a;
     } else if (c === undefined && d === undefined) {
       c = a;
       d = b;
     }
     return {
       top: a,
       right: b,
       bottom: c,
       left: d
     };
   }
   ```

   > TypeScript 中的函数重载没有任何运行时开销。它只允许你记录希望调用函数的方式，并且编译器会检查其余代码。

   ### 可调用的

   可以使用类型别名或者接口来表示一个可被调用的类型注解：

   ```ts
   interface ReturnString {
     (): string;
   }
   ```

   它可以表示一个返回值为 `string` 的函数：

   ```ts
   declare const foo: ReturnString;
   
   const bar = foo(); // bar 被推断为一个字符串。
   ```

   #### 可实例化

   使用 `new` 作为前缀。它意味着你需要使用 `new` 关键字去调用它：

   ```ts
   interface CallMeWithNewToGetString {
     new (): string;
   }
   
   // 使用
   declare const Foo: CallMeWithNewToGetString;
   const bar = new Foo(); // bar 被推断为 string 类型
   ```

   ### 类型断言

   TypeScript 允许你覆盖它的推断，并且能以你任何你想要的方式分析它，这种机制被称为「类型断言」。

   ```ts
   const foo = {};
   foo.bar = 123; // Error: 'bar' 属性不存在于 ‘{}’
   foo.bas = 'hello'; // Error: 'bas' 属性不存在于 '{}'
   ```

   这里的代码发出了错误警告，因为 `foo` 的类型推断为 `{}`，即是具有零属性的对象。因此，你不能在它的属性上添加 `bar` 或 `bas`，你可以通过类型断言来避免此问题：

   ```ts
   interface Foo {
     bar: number;
     bas: string;
   }
   
   const foo = {} as Foo;
   foo.bar = 123;
   foo.bas = 'hello';
   ```

   **使用 `as typeName`语法作为类型断言。**

   ### 类型保护

   类型保护允许你使用更小范围下的对象类型。

   #### in

   `in` 操作符可以安全的检查一个对象上是否存在一个属性，它通常也被作为类型保护使用：

   ```ts
   interface A {
     x: number;
   }
   
   interface B {
     y: string;
   }
   
   function doStuff(q: A | B) {
     if ('x' in q) {
       // q: A
     } else {
       // q: B
     }
   }
   ```

   

