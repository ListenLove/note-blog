# Linux系统基础与应用

## Linux简介

### 学习方法

#### 为什么选择命令行？

1. 易用性
2. 稳定性
3. 操作简捷

#### 解决问题的智慧

1. 帮助
2. 搜索引擎
3. 忘掉Windows操作方式

#### Linux注意事项

1. Linux 严格区分大小写
2. 所有内容都以文件的形式保存，包括设备、硬件
3. Linux 不依靠文件扩展名区分文件
4. Linux存储设备挂载之后才能使用
5. Windows平台的程序无法直接在Linux中安装使用

#### 服务器管理和运维的建议

1. Linux 各目录的作用

   ![image-20210312134843758](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210312134843758.png)

   ![image-20210312135630603](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210312135630603.png)

   ![image-20210312135812347](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210312135812347.png)

2. 服务器不允许关机，只能重启

3. **重启时应关闭服务**

4. 不要在服务器访问高峰期运行高负载命令

5. 远程配置防火墙时，不要把自己踢出服务器 

6. 合理的密码，定期更新

7. 合理分配权限

8. 定期备份重要数据和日志

## Linux 常用命令

### 命令格式

![image-20210312143027813](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210312143027813.png)

### 目录处理命令

#### ls

![image-20210312144203794](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210312144203794.png)

![image-20210312144222894](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210312144222894.png)

#### mkdir

创建目录

![image-20210312145137448](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210312145137448.png)

#### cd

![image-20210312145256891](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210312145256891.png)

#### pwd

![image-20210312145324088](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210312145324088.png)

#### rmdir

![image-20210312145437085](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210312145437085.png)

#### cp

![image-20210312145608646](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210312145608646.png)

#### mv

![image-20210312150048145](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210312150048145.png)

#### rm

![image-20210312150536521](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210312150536521.png)

### 文件处理命令



### 介绍

#### 修改密码

输入`password`命令后，输入原密码和新密码，确认密码即可。

```bash
$ passwd
```

#### 查看当前用户

##### 查看自己的用户名
```bash
$ whoami
```

##### 查看当前在线用户

可以使用`users` 、`who`、`w`命令。

### Linux 文件

#### `普通文件`

普通文件是以字节为单位的数据流，包括文本文件、源码文件、可执行文件等。文本和二进制对Linux来说并无区别，对普通文件的解释由处理该文件的应用程序进行。

#### `目录`

目录可以包含普通文件和特殊文件，目录相当于Windows和Mac OS中的文件夹。

#### `设备文件`

Linux 与外部设备（例如光驱，打印机，终端，modern等）是通过一种被称为设备文件的文件来进行通信。Linux 输入输出到外部设备的方式和输入输出到一个文件的方式是相同的。Linux 和一个外部设备通讯之前，这个设备必须首先要有一个设备文件存在。

**设备文件和普通文件不一样，设备文件中并不包含任何数据。**

设备文件有两种类型：**字符设备文件**和**块设备文件**。

- 字符设备文件**以字母"c"开头**。字符设备文件向设备传送数据时，一次传送一个字符。典型的通过字符传送数据的设备有终端、打印机、绘图仪、modern等。字符设备文件有时也被称为"raw"设备文件。
- 块设备文件**以字母"b"开头**。块设备文件向设备传送数据时，先从内存中的buffer中读或写数据，而不是直接传送数据到物理磁盘。磁盘和CD-ROMS既可以使用字符设备文件也可以使用块设备文件。








