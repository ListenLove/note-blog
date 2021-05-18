# TypeScript 简明知识手册

## TypeScript 项目

### 编译上下文

> 它来给文件分组，告诉 TypeScript 哪些文件是有效的，哪些是无效的。除了有效文件所携带信息外，编译上下文还包含有正在被使用的编译选项的信息。

定义这种逻辑分组，一个比较好的方式是使用 `tsconfig.json` 文件。

####  tsconfig.json

1. 创建一个空的`tsconfig.json`文件，TypeScript 将 会把此目录和子目录下的所有 .ts 文件作为编译上下文的一部分；

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

   #### TypeScript 编译

   使用 `tsconfig.json` 时从命令行手动运行 TypeScript 编译器

   1. 运行 tsc，它会在当前目录或者是父级目录寻找 `tsconfig.json` 文件
   2. `tsc -p ./path-to-project-directory` 。当然，这个路径可以是绝对路径，也可以是相对于当前目录的相对路径
   3. `tsc -w` 来启用 TypeScript 编译器的观测模式，在检测到文件改动之后，它将重新编译

   #### 指定文件

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

   ### 模块

   #### 全局模块

   在默认情况下，当你开始在一个新的 TypeScript 文件中写下代码时，它处于全局命名空间中。**使用全局变量空间是危险的，因为它会与文件内的代码命名冲突。我们推荐使用下文中将要提到的文件模块。**

   #### 文件模块

   文件模块也被称为外部模块。如果在你的 TypeScript 文件的根级别位置含有 `import` 或者 `export`，那么它会在这个文件中创建一个本地的作用域。

   文件里使用 `import` 时，它不仅允许你使用从其他文件导入的内容，还会将此文件标记为一个模块，文件内定义的声明也不会“污染”全局命名空间。

   推荐使用：ES 模块语法。

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

   

