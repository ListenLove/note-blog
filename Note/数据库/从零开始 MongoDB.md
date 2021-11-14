# MongoB 学习笔记



## MongoDB概述

 MongoDB和MySQL一样都是数据库， 都是存储数据的仓库，

不同的是MySQL是关系型数据库， 而MongoDB是非关系型数据库



### 非关系型数据库

- 在*关系型数据库*中，数据都是存储在表中的， 对存储的内容有严格的要求，因为在创建表的时候我们就已经规定了表中有多少个字段，已经规定了每个字段将来要存储什么类型数据，已经规定了每个字段将来是否可以为空，是否必须唯一等等



- 在*非关系型数据库*中，没有表概念所以存储数据更加灵活，因为不需要创建表，所以也没有规定有哪些字段，也没有规定每个字段数据类型，也没有规定每个字段将来是否可以为空，是否必须唯一等等

- *关系型数据库*由于操作的都是结构化的数据， 所以我们需要使用结构化语言SQL来操作

- *非关系型数据库*由于数据没有严格的结构要求， 所以无需使用SQL来操作



### 什么是MongoDB?

存储文档(BSON)的非关系型数据库

例如在MySQL中:

|--------------------------------------------------------|

|   name(varchar(255) not null)   |    age(int unique)   |

|--------------------------------------------------------|

我们可以把            *zs*， 33        保存到表中

但是我们不能将         33， *zs*       保存到表中

但我们不能能将         null， 33       保存到表中

但是我们不能将         *zs*， 33，  *男* 保存到表中

但是我们不能再次将     *zs*， 33        保存到表中



例如在MongoDB中:

我们可以把         {name: *zs*， age: 33};              保存到集合中

我们也可以把       {name: 33， age: *zs*};              保存到集合中

我们也可以把       {name: null， age: 33};              保存到集合中

我们也可以把       {name: *zs*， age: 33， gender:*男*}; 保存到集合中

但是我们可以再次将 {name: *zs*， age: 33};              保存到集合中

>  非关系型数据库*可以看做是*关系型数据库的功能阉割版本，通过减少用不到或很少用的功能，从而提升数据库的性能。

### MongoDB 存储文档原理

**MySQL中所有的数据都是存储在表中的， 而MongoDB中所有的数据都是存储在集合中的。**

### 企业开发中的应用场景

- 关系型数据库和非关系型数据库之间并不是替代关系， 而是互补关系，所以在企业开发中大部分情况是结合在一起使用

- 对于数据模型比较简单、数据性能要求较高、数据灵活性较强的数据， 我们存储到非关系型数据库中相反则存储到关系型数据库中

## MongoDB 快速上手

1. 连接MongoDB服务器
   通过mongo连接MongoDB服务器

2. 查看数据库
   `show dbs`

> 和MySQL中的 `show databases;`指令一样。

3. 创建数据库
   `use 数据库名称`

   > 和MySQL中的 use 指令一样, 只不过MongoDB中的use数据库不存在会自动创建

4. 查看数据库中有哪些集合
   show collections

   > 和MySQL中的 show tables; 指令一样

5. 创建集合
   db.createCollection('集合名称');

   > 和MySQL中的 create table xxx(); 指令一样

6. 插入数据
   db.集合名称.insert(文档对象);

   > 和MySQL中的 insert into xxx values () 指令一样

7. 查询数据
   db.集合名称.find();

   > 和MySQL中的 select * from xxx; 指令一样

8. 删除集合
   db.集合名称.drop()

   > 和MySQL中的 drop table xxx; 指令一样

9. 删除数据库
   db.dropDatabase()

   > 在哪个数据库中就会删除哪个数据库；和MySQL中的 drop database xxx; 指令一样

10. 与MySQL的不同

- 没有MySQL中表的概念, 取而代之的是集合
- 创建集合时不用指定集合中有哪些字段
- 只要是一个合法的文档对象都可以往里面存储

## 主键

> 用于保证每一条数据唯一性的

### 与MySQL主键的不同

1. 无需明确指定
   1. 每一个文档被添加到集合之后, MongoDB都会自动添加主键
   2. MongoDB中文档主键的名称为`_id`
2. 文档主键默认为`ObjectId`类型的数据
   1. `ObjectId`类型是一个12个字节字符串(5e8c5ae9-c9d35e-759b-d6847d)
   2. 前4字节是存储这条数据的时间戳
   3. 再3字节的存储这条数据的那台电脑的标识符
   4. 后2字节的存储这条数据的MongoDB进程id
   5. 最后3字节是计数器
3. MongoDB支持横向扩展（增加数据库服务器台数）
4. MongoDB中支持除了'`数组类型`'以外的其它类型数据作为主键
5. MongoDB中甚至还支持将一个文档作为另一个文档的主键(**复合主键**)

### 写入文档

#### insertOne

```js
db.<collection>.insertOne(
    <document>,
    {
        writeConcern: <document>
    }
);
// document: 需要写入的文档
// writeConcern: 写入安全级别
```

#### save

```js
其它方式
db.<collection>.save(
    <document>,
    {
        writeConcern: <document>
    }
);
```



#### 安全级别

用于判断数据是否写入成功,安全级别越高, 丢失数据风险越小, 但是性能消耗(操作延迟)也就越大；默认情况下MongoDB会开启默认的安全些级别。

#### 注意点

在使用**insertXXX**写入文档时, 如果调用insertOne的集合不存在会自动创建：

> db.student.insertOne({name:'zs', age:18}) #集合不存在会自动创建

### insertOne和save不同

主键冲突时`insertOne`会报错,而`save`会直接用新值覆盖久值。

### 写入多个文档

#### insertMany

```js
db.<collection>.insertMany(
    [<document>, ...],
    {
        writeConcern: <document>,
        ordered: <boolean>
    }
);
// ordered: 是否按顺序写入
// ordered默认取值是true, 也就是会严格按照顺序写入
// 如果ordered是false, 则不会按照顺序写入, 但写入效率更高(系统会自动优化)
```

**注意点：**如果`ordered`是`true`, 前面的文档出错, 后面的所有文档都不会被写入；如果`ordered`是`false`, 前面的文档出错, 后面的所有文档也会被写入。

#### insert

写入一个或多个文档

```js
db.<collection>.insert(
    <document> or ,[<document>, ...]
    {
        writeConcern: <document>,
        ordered: <boolean>
    }
);
```

> insertOne和insertMany结合体

**注意点：**

1. 和`insertOne/insertMany`一样,  集合不存在会自动创建
2. 和`insertOne/insertMany`一样,  主键冲突会报错
3. 和`insertMany`一样, 默认都是按顺序插入, 前面的文档出错, 后续所有文档不会被插入



## 查询文档

```js
db.<collection>.find(
    <query>,
    <projection>
)
```

`query`: 查询条件, 相当于MySQL中的`where`；
`projection`: 投影条件, 规定了结果集中显示那些字段, 相当于MySQL中的 select 字段1, 字段2, .. from 表名。

### 查询条件（find 第一个参数）

#### 查询所有文档

`db.<collection>.find();`

> 不传入条件, 默认就是查询所有。

#### 查询单个字段条件

`db.person.find({name:'z3'})`

> 通过第一个参数指定查询条件。

#### 查询多个字短条件

`db.person.find({name:'zs', age:17}) `

> 默认是 **AND** 关系。

#### 文档中包含文档的情形

```js
db.person.insert(
[{name:'zs', age:17, book:{name:'HTML', price:66}},
{name:'ls', age:18, book:{name:'JavaScript', price:88}},
{name:'ww', age:19, book:{name:'Vue', price:199}}]
)
```

查询语句实例：`db.person.find({'book.name':'JavaScript'}) `

> 判断的时候我们可以通过'**字段.文档属性名称**'的方式来判断。

### 查询指定字段（find 第二个参数）

> 0表示不显示, 1表示显示，且默认为显示。
> 除主键以外, 其它字段不能同时出现0和1(要么不写,写了就必须全是1或者全是0)。

### 比较操作符

| 操作符 |   含义   |
| :----: | :------: |
|  $eq   |   等于   |
|  $ne   |  不等于  |
|  $gt   |   大于   |
|  $gte  | 大于等于 |
|  $lt   |   小于   |
|  $lte  | 小于等于 |

#### 使用格式

```js
db.<collection>.find(
    {<field>: {$<operator>: <value>}},
    <projection>
)
```

示例：

```js
db.person.find({name:'zs'}) //默认情况下就是按照相等来判断
db.person.find({name:{$eq:'zs'}}) //这里就是明确的告诉MongoDB需要按照相等来查询
db.person.find({age:{$gte: 18}})
db.person.find({age:{$lt: 18}})
db.person.find({age:{$ne: 18}})
```

**注意点：文档没有字段的会按不等于计算**

### 其他比较操作符

| 操作符 |              含义              |
| :----: | :----------------------------: |
|  $in   |   匹配和任意指定值相等的文档   |
|  $nin  | 匹配和任意指定值都不相等的文档 |

```js
db.person.find({name:{$in:['zs', 'ls']}}) // 匹配和任意指定值相等的文档
db.person.find({name:{$nin:['zs', 'ls']}}) // 匹配和任意指定值都不相等的文档
db.person.find({gender:{$nin:['男', '女']}}) // 注意点: 和$ne一样, 如果没有需要判断的字段, 也算作满足条件
```

| 操作符 |            含义            |
| :----: | :------------------------: |
|  $not  |   匹配条件有不为真的文档   |
|  $and  |   匹配条件全部为真的文档   |
|  $or   | 匹配条件至少一个为真的文档 |
|  $nor  |  匹配全部条件不为真的文档  |

### 字段操作符

| 操作符  |              含义              |
| :-----: | :----------------------------: |
| $exists |     查询包含某个字段的文档     |
|  $type  | 查询指定字段包含指定类型的文档 |

**$exists 常用于配合比较操作符对查询结果作清理工作。**

`$exists: {<field>: {$exists: <boolean>}}`

`$type: {<field>: {$type: <BSON> or [<BSON1>, <BSON2>]}}`

### 数组操作符

|   操作符   |                        含义                        |
| :--------: | :------------------------------------------------: |
|    $all    |         匹配数组中包含所有指定查询值的文档         |
| $elemMatch | 匹配数组中至少有一个能完全匹配所有的查询条件的文档 |

### 正则表达式操作符

文档数据如下：

![image-20211016225538885](https://gitee.com/wencbin/pics/raw/master/images/image-20211016225538885.png)

使用示例：

`db.Person.find({name: {$in: [/^z/i, /^l/i]}})`

## 文档游标

MongoDB原生支持JS，可直接混入JS代码。文档游标就是集合查询`find`方法调用后返回的一个引用，可当作数组类型取用文档，文档游标的常用方法：

### 常用方法

|   方法    |             解析             |
| :-------: | :--------------------------: |
| hasNext() |      是否还有下一个文档      |
|  next()   |        取出下一个文档        |
| forEach() | 依次取出文档游标中的所有文档 |

### 分页方法

|   方法   |             解析              |
| :------: | :---------------------------: |
| limit(n) |         取出前n个文档         |
| skip(n)  | 跳过n个文档，取出剩余所有文档 |

**支持链式调用**

### 排序方法 sort(order)

order 为1时，升序排序；order 为-1时，降序排序。

**注意：当与分页方法进行链式调用时，排序方法会最先执行，之后再执行分页方法。**

如：`db.Person.find().skip(2).limit(3).sort({age: -1})`，其中`age`属性至为-1，表明按照age字段进行降序排序。

### 统计方法 count({applySkipLimit})

统计文档个数。

`applySkipLimit`默认为`false`,`{applySkipLimit: false}`，表明不忽略skip和limit方法，为true时忽略分页方法。

## 更新文档

### save

指定`_id`字段，可对同`_id`的文档进行更新。

### update(filter, )

#### 更新操作符

update 方法默认情况下为覆盖，如果不想覆盖，而是想更新就必须在第二个参数中使用更新操作符。

#### 更新所有文档

update 方法默认只会更新满足条件的第一个文档，如果想更新所有满足条件的文档就必须指定第三个参数

#### 注意点

1. 第二个参数中指定了`_id`，那么就必须保证指定`_id`和被更新文档中的`_id`一致，不一致则出错，所以update 在企业开发中不指定`_id`。

#### $set

更新字段

|                           代码用例                           |                           功能描述                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|      `db.Person.update({name: 'zs'}, {$set:{age: 56}})`      | 更新 Person 表中的找到的第一个 name 为'zs'的 文档字段 age 为 56 |
| `db.Person.update({name: 'zs'}, {$set:{age: 56}}, {multi: true})` | 更新 Person 表中的找到的全部name 为'zs'的 文档字段 age 为 56 |
| `db.Person.update({name: 'zs'}, {$set:{'book.bookName': 'hello world'}})` | 更新 Person 表中的找到的第一个 name 为'zs'的 文档下 book 字段书名 为 'hello world' |
| db.Person.update({name: 'zs'}, {$set:{'tag.0': 'hello world'}}) | 更新 Person 表中的找到的第一个 name 为'zs'的 文档下 tag 字段数组第一个元素为 'hello world' |

**索引不存在时，会进行新增**

#### $unset

删除字段。

**注意，使用 $unset 删除文档字段时，后面复制任何值都对结果无影响，为防歧义，推荐设为空值**

#### $rename

更改文档的字段名称（包括普通字段和文档字段，写法同 $set）。

基本示例：

|                           代码用例                           |                           功能描述                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| `db.Person.update({name: 'zs'}, {$rename:{name: 'myName'}})` | 更新 Person 表中的找到的第一个 name 为'zs'的 文档 的name 字段为 'myName' |
| `db.Person.update({name: 'zs'}, {$rename:{'book.name': 'book.bookName'}},})` | 更新 Person 表中的找到的第一个name 为'zs'的 文档的文档字段 book 的 name 字段为 bookName 注意要进行对应字段嵌套 |

**注：**

1. 操作的字段不存在时，不会进行任何操作
2. 重命名字段已存在，会删除已存在的字段
3. 不能操作数组

**使用技巧：**可以将外层字段转移到内层文档字段，也可以将内层文档字段转移到外层。

#### $inc 和 $mul

| 操作符 |          作用          |
| :----: | :--------------------: |
|  $inc  | 增加或减少字段保存的值 |
|  $mul  | 乘以或除以字段保存到值 |

`db.Person.update({name: 'zs'}, {$inc: {age: 39}})`：第一个 name 为 zs 的文档的 age 字段加上 39

`db.Person.update({name: 'zs'}, {$mul: {age: 1.2}})`：第一个 name 为 zs 的文档的 age 字段乘上 1.2

**只能对数值类型进行操作**

#### $min 和 $max

更新时，保存最小（$min）或最大（$max）值。

**如果操作字段不存在，将会新增字段，并赋值操作数据**

#### $addToSet

向数组字段中添加数据的标识符。

```js
db.Person.update({'name': 'zs'}, {$addToSet: {tags: 'MongoDB'}})
```

**注意：**

1. 操作字段不存在时，会新增字段，字段会添加新值
2. 会自动去重

#### $push

向数组字段中添加数据的标识符。**不会自动去重**

#### $pop

像栈一样将数组字段最后一个元素删除（弹出）。

**注意：**

- `db.Person.update({'name': 'zs'}, {$pop: {tags: 1}})`
- 字段对应值为1时从数组末尾开始删，为 -1 从数组开头开始删
- 删空时，不会删除数组字段，空数组会保持为空数组

更新操作符 `$` 和 `$[]`

 `$`：更新数组字段中的某个元素；

 `$[]`：更新数组字段中的全部元素。

## 删除文档

### deleteOne

删除一个满足条件的文档

### deleteMany

删除所有满足条件的文档

### findOneAndDelete

删除第一个找到的、满足条件的文档

## 聚合操作

通过一个方法完成一系列的操作，每个操作是一个阶段，上一个阶段的处理结果会传递给下一个阶段，最后所有阶段处理完毕会返回，就是结果集。

**注：**聚合操作不会修改原有文档，只会返回一个新的文档给我们。

`db.<collection>.aggregate(<pipeline>, <options>)`

### 阶段 $project

使用原有文档中不存在的字段，会自动使用NULL来填充。

```javascript
db.Person.aggregate([{$project: {id: 0, 'fullName': 0}}])	// 聚合方式，结果集会得到 id 和 fullName 连个字段
db.Person.find({}, {'fullName': '$name'})					// 查询，应用上行的聚合方式，使用每个文档的 name 字段作为 fullName 字段输出结果
/*
output:
{ _id: ObjectId("616ad8422b1607766c9143cb"), fullName: 'ls' }
{ _id: ObjectId("616ad8422b1607766c9143cc"), fullName: 'ww' }
{ _id: ObjectId("616ad8422b1607766c9143cd"), fullName: 'zsf' }
{ _id: ObjectId("616ad8422b1607766c9143ce"), fullName: 'lnj' }
{ _id: ObjectId("616ad8422b1607766c9143cf"), fullName: 'wz' }
{ _id: ObjectId("619066164779b7e639f328dc"), fullName: 'zs' }
*/
```

#### 阶段 $match

用于筛选符合条件的文档的集合。

```js
// 通过 $match 满足name为 zs 的文档会被筛选出来,通过 $project 对结果字段进行重组
db.Person.aggregate([{$match: {'name': 'zs'}}, {$project: {'name': 0, 'myAge': '$age'}}])
/*
output:
{ _id: ObjectId("619066164779b7e639f328dc"), age: 22 }
{ _id: ObjectId("61906c2f4779b7e639f328dd"), age: 99 }
*/
```

### 阶段 $limit 和 $skip

#### $limit 获取结果集中的几个文档

#### $skip 跳过多少个文档取出所有文档

**注意: 此二者组合起来完成分页操作**

```javascript
db.Person.aggregate([{$match: {'name': 'zs'}}, {$project: {_id: -1, 'age': 0}}, {$skip: 1}, {$limit: 1}])
/*
output:
{ _id: ObjectId("61906c2f4779b7e639f328dd"), name: 'zs' }
*/
```

### 阶段 $unwind

 用于展开数组字段的。

文档模型：

<img src="https://gitee.com/wencbin/pics/raw/master/images/image-20211114101337786.png" alt="image-20211114101337786"  />

展开 tags 字段的数组：

```js
// 通过 includeArrayIndex 获取到文档的在原有数据的索引
db.Person.aggregate([{$unwind: {path: '$tags', includeArrayIndex: 'index'}}])
/*
output:
{ _id: ObjectId("619066164779b7e639f328dc"),
  name: 'zs',
  age: 22,
  tags: 'HTML',
  index: 0 }
{ _id: ObjectId("619066164779b7e639f328dc"),
  name: 'zs',
  age: 22,
  tags: 'Vue',
  index: 1 }
{ _id: ObjectId("619066164779b7e639f328dc"),
  name: 'zs',
  age: 22,
  tags: 'MongoDB',
  index: 2 }
*/
```

**注意：**如果文档中不包含该数组字段、无元素或为NULL，默认将自动进行过滤。

### 阶段 $sort

`{$sort: {<字段名>: 1 | -1}}`：按指定字段名升序或者降序排列。

### 阶段 $lookup

用来作为关联查询。

```js
{
    $lookup: {
        from: '<外联集合名称>',
        localField: '<当前集合查询字段>',
        foreignField: '<外联集合查询字段>',
        as: '<查询结果输出字段名>'
    }
}
```

```js
// $unwind 用来过滤空数组和无该字段的元素
db.Person.aggregate([{$unwind: "$tags"}, {$lookup: {from: "Books", localField: "tags", foreignField: "name", as: "book"}}])
/*
output:
{ _id: ObjectId("616ad8422b1607766c9143cb"),
  name: 'ls',
  age: 28,
  tags: 'Vue',
  book: 
   [ { _id: ObjectId("6190751255b694738392c3bb"),
       name: 'Vue',
       price: 88 } ] }
{ _id: ObjectId("619066164779b7e639f328dc"),
  name: 'zs',
  age: 22,
  tags: 'HTML',
  book: 
   [ { _id: ObjectId("619074ff55b694738392c3b9"),
       name: 'HTML',
       price: 77 } ] }
{ _id: ObjectId("619066164779b7e639f328dc"),
  name: 'zs',
  age: 22,
  tags: 'Vue',
  book: 
   [ { _id: ObjectId("6190751255b694738392c3bb"),
       name: 'Vue',
       price: 88 } ] }
{ _id: ObjectId("619066164779b7e639f328dc"),
  name: 'zs',
  age: 22,
  tags: 'MongoDB',
  book: 
   [ { _id: ObjectId("6190752d55b694738392c3bd"),
       name: 'MongoDB',
       price: 99 } ] }
*/
```

#### 关联查询

```js
{
    $lookup: {
        from: '<外联集合名称>',
        let: {'<自定义常量名>': '外联集合字段名称'},
        pipeline: ['<聚合阶段>'],
        as: '<查询结果输出字段名>'
    }
}
```

### 阶段 $group

`{$group: {_id: '$<字段名称>'}}`

```js
/*
数据模型:
{ _id: ObjectId("619074ff55b694738392c3b9"),
  name: 'HTML',
  price: 77,
  press: '上海' }
{ _id: ObjectId("6190751255b694738392c3bb"),
  name: 'Vue',
  price: 88,
  press: '北京' }
{ _id: ObjectId("6190752d55b694738392c3bd"),
  name: 'MongoDB',
  price: 99,
  press: '上海' }
*/
db.Books.aggregate([{$group: {_id: '$press',sumPrice: {$sum: '$price'}, avgPrice: {$avg: '$price'}, maxPrice: {$max: '$price'}, minPrice: {$min: '$price'}}}])
/*
{ _id: '上海',
  sumPrice: 176,
  avgPrice: 88,
  maxPrice: 99,
  minPrice: 77 }
{ _id: '北京',
  sumPrice: 88,
  avgPrice: 88,
  maxPrice: 88,
  minPrice: 88 }
  */
```

### 阶段 $out

将结果集输出到新的集合中。

`{$out: '<新集合名称>'}`

**注：**如果集合不存在，那么会自动创建；如果集合已经存在，则会覆盖。

### $convert

数据类型转换操作符，便于对数据及逆行统一处理。

`{$convert: {input: '$<要转换的文档字段>', to: '<转换成的文档字段名称>', onError:'<出错时的处理>', onNull: '转换字段为空的文档处理'}}`

## MongoDB的索引

### `getIndexes()` 方法

获取 MongoDB 默认情况下为组件自动创建的索引。

```js
db.Person.getIndexes()
/*
[ { v: 2, key: { _id: 1 }, name: '_id_' } ]
*/
```

### `createIndex()` 方法

```js
db.Person.createIndex({name: 1})	// Person 文档创建name索引 并按升序进行排序; 设为 -1 时为降序
```

#### 复合索引

只指定一个字段就是单值索引，如果指定了多个字段就会创建复合索引。**注：**使用复合索引时，只支持前缀查询。

#### 多键索引

为数组字段的每个元素创造索引。

### 唯一索引

默认情况下时，文档默认创建的主键。

`db.Person.createIndex({name: 1}, {unique: true})`:其中的`{unique: true}`配置即为增加的唯一索引

**注:**

1. 添加唯一索引的字段的取值一定不能重复
2. 添加的唯一索引未指定时默认为null,仅能设置一次(原理同上)
3. 添加复合索引为唯一索引时,复合索引的组合一定不能重复,否则不能添加

### 索引的稀疏性

添加额外配置:`{spars: true}`,可创建稀疏索引,即只为存在索引字段的文档，添加唯一索引。*不会为缺失索引字段的文档创建索引*。

### 索引生存时间

使用`{expireAfterSeconds: <时间长度>}`配置索引生存时间，添加该索引的文档，在此时间后将会被删除。

### 删除索引

#### 通过索引名称删除

dropIndex('<索引名称>')

#### 通过索引定义删除

dropIndex(<索引定义>)

**注：**复合索引删除时，索引定义必须一摸一样才能正确删除。

## 文档关系

通过内嵌式结构或**规范式结构**表达文档之间的关系。

### 一对一

例：一个人有一张身份证。

#### 内嵌式一对一

```js
{
    name: 'zs',
    age: 18,
    IDcard: {
        num: 'xxxxxx',
        date: 'xxxx-xx-xx'
    }
}
```

优势：一次查询能得到所有数据。

劣势：数据复杂时不方便管理和更新。

适用于简单且查询频率较高的数据。

#### 规范式一对一

```js
// ID Card
{
    _id: 123,
    num: 'xxxxxx',
    date: 'xxxx-xx-xx',
    personID: 456,
    name: 'xxx'
}
// Person
{
    _id: 456,
    age: 18,
    IDCard: 123
}
```

优势：数据复杂时，方便管理更新。

劣势：查询数据相对内嵌结构更为复杂。

适用于较为复杂的数据。

查询方法：

```js
// Person: { _id: 1, name: 'zs', age: 18, id_card: 8801 }
// IDCard: { _id: 8801, code: 36031201, person_id: 1, date: 2021-11-14T16:00:00.000Z }
// 常用 $lookup 进行关联查询
db.Person.aggregate([{$lookup: {from: 'IDCard', localField: 'id_card', foreignField: '_id', as:'id_card_data'}}])
/*
output:
{ _id: 1,
  name: 'zs',
  age: 18,
  id_card: 8801,
  id_card_data: 
   [ { _id: 8801,
       code: 36031201,
       person_id: 1,
       date: 2021-11-14T16:00:00.000Z } ] }
*/
```

### 规范式一对多

内嵌式一对多复杂。**不推荐**。

```js
// Person: { _id: 3601, name: 'zs', age: 19, books_ids: [ 1, 2 ] }
// Books: [{ _id: 1, name: 'Vue', price: 999 },{ _id: 2, name: 'MongoDB', price: 888 }]
db.Person.aggregate([{$lookup: {from: 'Books', localField: 'books_ids', foreignField: '_id', as:'books_data'}}])
/*
output:
{ _id: 3601,
  name: 'zs',
  age: 19,
  books_ids: [ 1, 2 ],
  books_data: 
   [ { _id: 1, name: 'Vue', price: 999 },
     { _id: 2, name: 'MongoDB', price: 888 } ] }
*/
```

### 规范式多对多

内嵌式不推荐，数据结构关系复杂，不适用。

**注意：**使用关系集合，对多对多的数据关系进行管理

```js
// 学生集合
db.students.insertMany([{name: 'zs', _id: 1}, {name: 'ls', _id:2}])
// 教师集合
db.taechers.insertMany([{name: 'it666', _id: 8801}, {name: 'bilibili', _id: 8802}])
// 学生-教师关系集合
db.stu_tacher_realship.insertMany([{stu_id: 1, teacher_id: 8801}, {stu_id: 1, teacher_id: 8802}, {stu_id: 2, teacher_id: 8802}])
// 查询
db.students.aggregate([{$lookup: {from: 'stu_teacher_realship', localField: '_id', foreignField: 'stu_id', as: 'teachers'}}, {$lookup: {from: 'teachers', localField: 'teachers.teacher_id', foreignField: '_id', as: 'teachers'}}, {$projec: {name: 1, _id:0, teachers: 1}}])
/*
output:
{ name: 'zs',
  teachers: 
   [ { _id: 8801, name: 'it666' },
     { _id: 8802, name: 'bilibili' } ] }
{ name: 'ls', teachers: [ { _id: 8802, name: 'bilibili' } ] }
*/
```

### 树形结构数据关系(了解)

详略

![image-20211115000353257](https://gitee.com/wencbin/pics/raw/cb9d188dacaef89d3bfbdca8a3f9c2646fa9445b/images/image-20211114235716489.png)





















