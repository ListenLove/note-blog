# MySQL学习笔记

## 安装MySQL

[详略](https://www.cyberciti.biz/faq/how-to-install-mysql-server-on-debian-10-linux/?__cf_chl_captcha_tk__=5e27b08fa4ad0e6346ea89cbc333e8c398b1b024-1621410345-0-Abln55wx1mznXKrAJi45j55h5uwdDp7K7StbihhEbyAHgxtGuxf1htLqjWjVLOEA8wFcx2nwhifoZ95qlO51NGc5mDJALINsA90fattMibgFOcDimbj2a3jgUAs8YyWSiHGBNHgb4yoJbHUgkh-PvwlHRRWqTkE5nps5s7zNoI2u2BqXd4l99EZx6KiZwffgAWs7jsKFw_iE0hjFhkeyXfYu7q40vUNlDooRv0kh2stAujIBm2TlRowHNk5mgxXQML__6Hsh7gviZBBr_HVf857bKKxuyu6rlMYcDtCN802znfm2EhYNK_XCggm7x3tceGY9zyJsErIe3bnQFQuchiXWCPu9A9fr45nUGXL8S3VkkqOIFLncGxaUDn3pe27zKv_ZpkUk35uy7M6o3k8fK0xMbKrtpDII9OLhRq6Ul1mlQngRcX8HP5izN-KTfs3J3aMNP-ttyemb8njJXhX3gbRADepGj2wKJK5n1vljGRJJbeNt579I7kinFa9q7oaqG3Pzp7wiKjP8JB4KBE4LdIm3p-yY88Y9qWxIlrOYnTuhfOponzCD2bfhOY3wsIFfJlAinVhJVYQ1fBC5-NL6UoWeKkbtpOap_maM90qaWNbbsDDrxNYSBsDd6OwTknYa_5LNywc6SY5Lt_w_QmNQ7S0ESEeD0UkeLP3hxi9-H_Y8LXUvvB7GDkLuq4wrZA_QOu_R_9fdtQYkq3wrklW4n_CJlDXcHAYNJLJtC_DcLM8l)

[开始使用时用户权限设置](https://linuxize.com/post/how-to-create-mysql-user-accounts-and-grant-privileges/)

## 开始使用

### MySQL开始时的数据库

```mysql
# 显示所有数据库，注意最后的 `s`
show databases;
```

![image-20210519165449779](https://gitee.com/wencbin/pics/raw/master/images/20210519170754.png)

### MySQL其他概念

#### 增删改查（CRUD）

1. 数据库的CRUD
2. 表的CRUD
3. 数据的CRUD

#### SQL

1. SQL结构化查询语言的简称

2. 功能划分：

   ![image-20210519171352083](https://gitee.com/wencbin/pics/raw/master/images/20210519171352.png)

3. 具有数据类型

## 数据库增删改查

### 创建数据库

```mysql
create database new_database_name;
```

> 执行上面语句时，不存在该数据库时将创建，存在时会报错

```mysql
create database if not exists new_database_name;
```

> 执行上一语句时，不存在该数据库时将创建，存在时不会报错，**企业开发常用**

### 数据库编码

#### 查看全局默认编码方式

```mysql
show variables like 'character_set_%';
```

#### 查看数据库的编码

```mysql
shwo CREATE DATABASE `stu`;
# !40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
```

#### 创建数据库时设定字符编码集 :100:

```mysql
create database if not exists person charset=utf8;
```

设置数据库person的默认编码为`utf8`。

#### 特殊的数据库名称

数据库名称是SQL关键字和存储的保留字等，需要用到反引号`\``将其包裹起来。

### 删除数据库

```mysql
drop database if exists databaseName;
```

删除数据库名称为`databaseName`的数据库，数据库当不存在时自动跳过。

### 数据库修改和查看

#### 修改数据库

```mysql
alter database 数据库名称 charset=字符集;
# example:
alter databse user charset=utf8;
```

#### 查看数据库

##### 查看指定数据库

```mysql
show create database 数据库名称;
```

##### 查看所有数据库

```mysql
show databases;
```

## 表的增删改查

**注意：**

1. 必须先使用指定数据库`use 数据库名称;`。
2. 查看数据库中有哪些表：`show tables;`。



### 创建表

```mysql
create table 表名(
	字段名 数据类型,
  字段名 数据类型,
  字段名 数据类型,
  字段名 数据类型,
  字段名 数据类型,
)
# example:
create table if not exists stu (
    id integer,
    name varchar(28)
)
```

#### 查看指定表的结构

```mysql
desc 表名;
# example:
desc stu;
```

#### 删除表

```mysql
drop table 表名;
# example
drop table if exists stu;
```

#### 修改表

##### 修改表名称

```mysql
 rename table 原来的表名 to 新的表名;
 # example
 rename table stu to user;
```

##### 修改字段

1. 添加字段

   ```mysql
   alter table 表名 add 字段名 数据类型;
   # 将新增的 phone 字段添加到原有字段之前
   alter table user add phone varchar(11) first;
   # 将新增的 phone 字段添加到 name 字段之前
   alter table user add phone varchar(11) after name;
   ```

2. 删除字段

   ```mysql
   alter table 表名 drop 字段名;
   alter table user drop phone;
   ```

3. 修改字段

   1. 修改字段类型

      `alter table 表名 modify 字段名称 新的数据类型`

      ```mysql
      alter table user modify name varchar(32);
      ```

   2. 修改字段名称

      `alter table 表名 change 原始字段名称 新的字段名称 新的数据类型`

      ```mysql
      alter table user change age score double;
      ```

      

### 表的存储引擎

#### 三种存储引擎

##### MyISAM

安全性低、不支持事务和外键，适合频繁插入和查询应用

##### InnoDB（默认）

安全性高、支持事务和外键，适合对安全性、数据完整性要求较高的应用

##### Memory

访问速度极快、但不会永久储存数据，适合对读写速度要求较高的应用

##### 修改表的存储引擎

## 数据的增删改查

#### 插入数据

`instert into 表名 (字段名称1, 字段名称2, ...) values (数据1, 数据2, ...)`

```mysql
insert into user (id, name, score) values (1, 'helloWorld', 99.99);
```

**插入时字段顺序不影响插入结果，但是插入数据顺序必须和对应字段的顺序一致；如果插入值顺序与字段顺序一致可省略字段顺序的编写；可同时插入多条数据**

#### 查询表中数据

`select * from 表名`：查询返回表名数据表的所有数据。

`select 字段名称1, 字段名称2, … from 表名 [ where 条件 ];`

```mysql
select id, score from user where name='helloWorld';
```

#### 更新数据

`update 表名 set 字段名=值 [where 条件]；`

**更新数据时不指定附加条件，将更新整张表的字段值；且可同时更新多个字段。**

```mysql
update user set score=77.77 where name='helloWorld';
```

#### 删除表中数据

`delete from 表名 [where 条件];`

**不指定条件会删除所有顺序。**

### 逻辑关键字

#### AND

交集，且，作用类似`&&`。

#### OR

并集，或，作用类似`||`。

#### NOT

非，作用类似于`^`;

#### 大于

`>`

#### 小于

`<`

#### 小于等于

`<=`

#### 大于等于

`>=`

#### 不等于

`!=`或`<>`

#### IN

固定的值，判断IN括号后面值的集合，类似于多个`OR`并起来。

#### BETWEEN…AND...

固定范围内的值，值为范围区间。

#### 是否为空

##### IS NULL

#### IS NOT NULL

## 数据类型

（详略）











