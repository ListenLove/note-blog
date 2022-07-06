# 快学 Redis

## 简介

### 特点

1. 数据存储于内存当中，存取相应速度快
2. 支持数据持久化
3. key-value形式存储数据，value同时支持常用数据类型，还支持list、set，zset，hash等数据结构
4. 定制性强
5. 支持分布式

### 应用场景

- 缓存系统
- 排行榜：支持集合和有序集合
- 计数器：提供incr和decr指令
- 存储社交关系：集合类型数据结构十分类似社交关系
- 消息队列系统：天生支持发布订阅模式

## redis 通用操作

|       指令        | 效果                       |
| :---------------: | -------------------------- |
|      keys *       | 查询当前数据库中的所有key  |
|      flushdb      | 清空当前数据库（开发操作） |
|     flushall      | 清空所有数据库             |
|      dbsize       | 计算当前数据库中有多少key  |
|     type key      | 查看key对应value的数据类型 |
|    exists key     | 存在key返回1，否则返回0    |
| expire key second | 设置key过期时间            |
|      ttl key      | 查看key过期时间            |
|    persist key    | 取消key过期时间            |

## 数据类型

Redis 是以key-value形式存储数据，其中

- key 无论如何都是字符串类型
- value 支持
  - 字符串 String
  - 哈希 Hash
  - 列表 List
  - 无序集合 Sets
  - 有序集合 Sorted Sets

## 字符串

| 指令 |     形式      | 效果                                                   |
| :--: | :-----------: | ------------------------------------------------------ |
| set  | set key value | 设置 /修改 key对应的 value值，不存在即新增，存在即修改 |
| get  |    get key    | 获取 key 对应的 value 值                               |
| del  |    del key    | 删除key对应的键-值对记录                               |

### 字符串高级操作

|   指令   |              形式               | 效果                            |
| :------: | :-----------------------------: | ------------------------------- |
|  setnx   |         setnx key value         | 不存在才新增，存在不操作修改    |
|  set xx  |        set key value xx         | 存在key，才把key的值修改为value |
|   mset   | MSET key value [ key value ...] | 批量设置                        |
|   mget   |       MGET key [key ...]        | 批量获取                        |
|  getset  |        GETSET key value         | 返回旧值，同时设定新值          |
|  append  |        APPEND key value         | 在存在key字符串之后增加value    |
|  strlen  |           STRLEN key            | 获取key对应值字符串长度         |
| getrange |     GETRANGE key start end      | 获取指定范围字符串              |
| setrange |    SETRANGE key offset value    | 设定指定范围字符串              |

### 字符串自增自减

|    指令     |           形式            | 效果                         |
| :---------: | :-----------------------: | ---------------------------- |
|    incr     |         INCR key          | 自增 +1                      |
|    decr     |         DECR key          | 自减 -1                      |
|   incrby    |   INCRBY key increment    | 自增 increment               |
|   decrby    |   DECRBY key decrement    | 批自减 decrement             |
| incrbyfloat | INCRBYFLOAT key increment | 自增小数值，增加值为负即自减 |



## 哈希类型

哈希类型存储结构类似对象的数据。

| 指令 |                  形式                   | 效果                                    |
| :--: | :-------------------------------------: | --------------------------------------- |
| hset | HSET key field value [ field value ...] | 设置 /修改 key对应的 哈希值的字段属性值 |
| hget |             HGET key field              | 获取 key 对应的 哈希类型的字段属性值    |
| hdel |       HDEL key field [field ...]        | 删除key对应哈希类型指定的字段           |
| del  |                 del key                 | 删除key对应的整个哈希类型               |

### 哈希类型高级操作

|  指令   |            形式             | 效果                                                     |
| :-----: | :-------------------------: | -------------------------------------------------------- |
|  hmget  | HMGET key field [field ...] | 批量获取哈希类型的指定字段                               |
|  hlen   |          HLEN key           | 获取key对应哈希类型储存的字段数量                        |
| hexists |      HEXISTS key field      | 判断哈希类型key是否存在字段field，存在返回1，不存在返回0 |

### 哈希类型其他操作

|    指令     | 效果                                                         |
| :---------: | ------------------------------------------------------------ |
|  HKEYS key  | 查询哈希类型key的所有字段                                    |
|  HVALS key  | 查询哈希类型key的所有字段值                                  |
| HGETALL key | 返回一个按哈希字段排序的所有字段和字段值的数组，所有字段值紧跟着其字段 |

**注意：**以上操作特别耗时，不推荐在企业开发中使用。

## 列表

|  指令  |              形式               | 效果                                                         |
| :----: | :-----------------------------: | ------------------------------------------------------------ |
| lpush  | LPUSH key element [element ...] | 将element一个接一个的插入到列表key头部                       |
| rpush  |         HGET key field          | 将element一个接一个的插入到列表key尾部                       |
| lrange |      LRANGE key start stop      | 查询列表key从start到stop的指定范围元素，负数表示从尾部开始   |
| lindex |        LINDEX key index         | 查询列表key指定index的元素                                   |
|  lset  |     LSET key index element      | 设置列表key指定index的元素为element                          |
|  lpop  |        LPOP key [count]         | 删除列表key头部的元素                                        |
|  rpop  |        RPOP key [count]         | 删除列表key尾部的元素                                        |
|  lrem  |     LREM key count element      | 删除列表key指定count个数的指定元素element，其中`count>0从表头向表尾搜索，移除。count<0从表尾向表头搜索，移除。count=0时移除全部element` |

效果：`lpush arr1 aa bb cc`=>`cc bb aa`。

效果：`rpush arr2 aa bb cc`=>`aa bb cc`。

### 其他操作

|  指令   |                   形式                    | 效果                                           |
| :-----: | :---------------------------------------: | ---------------------------------------------- |
|  lpush  |      LPUSH key element [element ...]      | 指定的key不存在为新建，key存在为从列表头部追加 |
|  rpush  |              HGET key field               | 指定的key不存在为新建，key存在为从列表尾部追加 |
| linsert | LINSERT key BEFORE \| AFTER pivot element | 在列表指定元素前面或者后面插入新元素element    |
|  llen   |                 LLEN key                  | 获取列表长度                                   |



## 集合

集合就是一堆无序数据，**集合中不能出现重复数据**。

|    指令     |             形式             | 效果                                      |
| :---------: | :--------------------------: | ----------------------------------------- |
|    sadd     | SADD key member [member ...] | 集合key中添加数据member                   |
|  smembers   |         SMEMBERS key         | 返回集合key保存的所有值                   |
| srandmember |   SRANDMEMBER key [count]    | 随机返回一个（或count个）集合保存的数据   |
|    spop     |       SPOP key [count]       | 随机删除并返回一个或多个集合key保存的数据 |
|    srem     | SREM key member [member ...] | 删除集合key中指定的数据                   |

### 集合其他操作

|   指令    |         形式         | 效果                               |
| :-------: | :------------------: | ---------------------------------- |
|   scard   |      SCARD key       | 统计集合储存的数据量               |
| sismember | SISMEMBER key member | 集合存在数据member返回1，否则返回0 |
|  sinter   | SINTER key [key ...] | 集合间的交集                       |
|  sunion   | SUNION key [key ...] | 集合间的并集                       |
|   sdiff   | SDIFF key [key ...]  | 集合间的差集                       |

### 应用场景

- 抽奖系统
- 绑定标签
- 社交关系

## 有序集合

>  ZSet有序集合，将一堆通过权重排序的数据当做一个Value存储起来



|       指令       |                   形式                    | 效果                                                     |
| :--------------: | :---------------------------------------: | -------------------------------------------------------- |
|       zadd       | ZADD key score member [ score member ...] | 有序集合添加权重及相关数据                               |
|      zrange      |            ZRANGE key min max             | 查找min-max范围内有序集合key的数据                       |
|      zscore      |             ZSCORE key member             | 查找有序集合指定元素的权重                               |
|      zcount      |            ZCOUNT key min max             | 统计min-max范围内有序集合的数据个数                      |
|      zcard       |                 ZCARD key                 | 统计有序集合数据数量                                     |
|       zrem       |       ZREM key member [member ...]        | 有序集合删除指定数据                                     |
| zremrangebyrank  |      ZREMRANGEBYRANK key start stop       | 移除有序集合排行start-stop范围内数据                     |
| zremrangebyscore |      ZREMRANGEBYRANK key start stop       | 移除有序集合权重start-stop范围内数据                     |
|     zincrby      |       ZINCRBY key increment member        | 提升increment有序集合中指定数据权重，increment可以为负值 |
|    zrevrange     |         ZREVRANGE key start stop          | 按权重大小从大到小排序                                   |

**注：**score: 元素权重。

应用场景：排行榜。

## 发布和订阅

角色：

- 发布者
- 订阅者
- 频道

> 订阅者通过 subscribe 指令订阅频道，当发布者向频道中 publish 发布相关内容，订阅者即可接到相关内容的推送，即实现发布和订阅功能。

|    指令     |                形式                 | 效果                     |
| :---------: | :---------------------------------: | ------------------------ |
|  subscribe  |   SUBSCRIBE channel [channel ...]   | 订阅频道                 |
|   publish   |       PUBLISH channel message       | 向频道中发布内容 message |
| unsubscribe | UNSUBSCRIBE [channel [channel ...]] | 取消订阅频道             |









