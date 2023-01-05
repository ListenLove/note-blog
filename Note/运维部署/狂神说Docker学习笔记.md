# 狂神说Docker学习笔记

## 学习大纲

### 初级

- Docker 概述
- Docker 安装
- Docker 命令
  - 镜像命令
  - 容器命令
  - 操作命令

### 中级

- Docker 镜像
- 容器数据卷
- DockerFile 脚本
- Docker 网络原理
- IDE 整合 Docker

### 高级

- Docker Compose
- Docker Swarm
- 持续集成与部署 Jekins

## 起步

### Docker 应用场景

- 容器化技术
- 系统级别虚拟化技术
- 轻便、容器间隔离
- DevOps
- 一键运行
- 打包镜像，发布
- 便捷升级和扩、缩容
- 高效的计算资源利用
- 

### 文档

[官方文档](https://docs.docker.com/)

### 基本组成

#### 架构

![img](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/7868545-060cc40d94102469.jpg)

### 名词解释

1. 镜像 **image**：类似于一个模板，可通过这个模板来创建容器服务，tomcat => docker run => tomcat 01 （容器服务）；通过这个镜像可重复创建多个容器。
2.  容器 **container**：Docker 利用容器技术，独立运行一个或一组通过镜像来创建的应用。容器具备启动、停止、删除等的基本命令；可理解为简易的 Linux 系统。 
3. 仓库 **repository**：存放镜像的地方。公有仓库：Docker Hub。国内访问需采取加速措施。

### [Debian 安装 Docker](https://docs.docker.com/engine/install/debian/)

### [卸载 Docker](https://docs.docker.com/engine/install/debian/#uninstall-docker-engine)

## Docker 原理

C-S架构，容器之间互相隔离，通过 Socket 进行通信。

### Docker 快于 VM 的原理

1. 比 VM 更少的抽象层
   1. ![docker容器与虚拟机有什么区别？ - 知乎](https://gitee.com/wencbin/pics/raw/master/images/v2-e30ef11428ac454d101f2b7d3ffc067e_720w.jpg)
2. docke 利用宿主机的内核， VM 需要 Guest OS

## [Docker 常用命令]([Use the Docker command line | Docker Documentation](https://docs.docker.com/engine/reference/commandline/cli/))

###  帮助命令

```shell
docker version	# docker 版本信息
docker info		# 显示 docker 系统信息
docker --help	# 帮助命令
docker stats	# 查看 docker 资源占用情况命令
docker system df # 查看镜像、容器、数据卷所占用的空间
```

### 镜像命令

#### docker images 展示镜像

> ‎默认值将显示所有顶级映像、其存储库和标记以及大小。‎`docker images`
>
> ‎Docker 映像具有中间层，可提高可重用性、降低磁盘使用率，并通过允许缓存每个步骤来加快速度。默认情况下不显示这些中间层。‎`docker build`
>
> ‎是图像及其所有父图像占用的累积空间。这也是映像时创建的 Tar 文件的内容所使用的磁盘空间。‎`SIZE``docker save`
>
> ‎如果一个映像具有多个存储库名称或标记，则该映像将被多次列出。这个单一的图像（可以通过其匹配来识别）只用完了列出的一次。‎`IMAGE ID``SIZE`

![image-20211230072035208](https://gitee.com/wencbin/pics/raw/master/images/image-20211230072035208.png)

#### docker search 搜索镜像

例如：`docker search mysql`。

![image-20211230073207415](https://gitee.com/wencbin/pics/raw/master/images/image-20211230073207415.png)

#### [docker pull 下载镜像]([Docker Hub Container Image Library | App Containerization](https://hub.docker.com/))

`docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]`

不加 tag，默认下载 最新镜像.前往标题链接地址,确定适用版本.

![image-20211230073732966](https://gitee.com/wencbin/pics/raw/master/images/image-20211230073732966.png)

#### docker rmi 删除镜像

>  docker remove image 的简写

 Options

| ‎名称，速记‎     | ‎Default | ‎描述‎                 |
| -------------- | ------- | -------------------- |
| `--force`‎,‎`-f` |         | ‎强制删除镜像‎         |
| `--no-prune`   |         | ‎不要删除未标记的父项‎ |

#### docker image ls 列出镜像

列出已经下载下来的镜像，`docker image ls`。

### 容器命令

> 有了镜像才能够创建容器

#### 新建容器并启动

```shell
docker run [options] image
# 参数说明
--name="Name"			指定容器名
-d						后台方式运行
-it						交互方式运行
-p						指定容器端口,常用 主机端口:容器端口(主机端口映射到容器端口)
-v 	主机目录:容器目录	   指定容器数据卷,将主机目录映射到指定的容器目录进行数据持久化和同步

docker run -it centos	#交互式启动并进入容器,-it 后可跟镜像id
# exit 从容器中退出
# 容器不停止推出 Ctrl + P + Q


```

#### docker ps 列出所有运行的容器

| 参数 | 描述                            |
| ---- | ------------------------------- |
| -a   | 列出正在运行的+历史运行过的容器 |
| -n=? | 最近创建的?个容器               |
| -q   | 只显示容器的编号                |

#### docker rm 删除容器

```shell
docker rm 容器id	# 删除指定容器,不能删除正在运行的容器,添加 -f 可强制删除
```

#### 启动和停止容器

```shell
docker start 容器id	#启动容器
docker restart 容器id	#重启容器
docker stop 容器id	#停止当前运行的容器
docker kill	容器id	#强制停止当前容器
```

### 常用其他命令

#### docker logs 打印日志

`docker logs -tf --tail 10 容器id`：打印正在运行容器的最新的10条日志

#### docker ps 查看容器内的进程信息

#### docker top 查看容器内的进程信息

`docker top 容器id`:查看相关的容器进程信息

#### docker inspect 查看容器的详细元数据

#### docker cp 文件拷贝到主机

拷贝是一个手动过程,未来可通过数据卷实现自动拷贝

用法:`docker cp 容器id:目录文件 宿主机目录位置`

示例:`docker cp 7acc78a184ab:/home/test.go /home`

### 进入当前正在运行的容器

#### `docker exec -it 容器id COMMAND`

![image-20211230233514100](https://gitee.com/wencbin/pics/raw/master/images/image-20211230233514100.png)

进入容器后开启一个新的终端

#### `docker attach 容器id COMMAND`

进入容器中正在执行的终端

### 总结

![image-20211230234713226](https://gitee.com/wencbin/pics/raw/master/images/image-20211230234713226.png)

## 实战练习

### docker 部署 Nginx

1. 搜索镜像
2. 下载镜像
3. 运行测试

```shell
# 搜索 Nginx 镜像
root@ALi:~# docker search nginx
NAME                              DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
nginx                             Official build of Nginx.                        16043               [OK]                
jwilder/nginx-proxy               Automated Nginx reverse proxy for docker con…   2104                                    [OK]
richarvey/nginx-php-fpm           Container running Nginx + PHP-FPM capable of…   819                                     [OK]
jc21/nginx-proxy-manager          Docker container for managing Nginx proxy ho…   301                                     
linuxserver/nginx                 An Nginx container, brought to you by LinuxS…   161                                     
tiangolo/nginx-rtmp               Docker image with Nginx using the nginx-rtmp…   148                                     [OK]
jlesage/nginx-proxy-manager       Docker container for Nginx Proxy Manager        147                                     [OK]
alfg/nginx-rtmp                   NGINX, nginx-rtmp-module and FFmpeg from sou…   112                                     [OK]
nginxdemos/hello                  NGINX webserver that serves a simple page co…   81                                      [OK]
privatebin/nginx-fpm-alpine       PrivateBin running on an Nginx, php-fpm & Al…   61                                      [OK]
nginx/nginx-ingress               NGINX and  NGINX Plus Ingress Controllers fo…   59                                      
nginxinc/nginx-unprivileged       Unprivileged NGINX Dockerfiles                  56                                      
nginxproxy/nginx-proxy            Automated Nginx reverse proxy for docker con…   33                                      
staticfloat/nginx-certbot         Opinionated setup for automatic TLS certs lo…   25                                      [OK]
nginx/nginx-prometheus-exporter   NGINX Prometheus Exporter for NGINX and NGIN…   22                                      
schmunk42/nginx-redirect          A very simple container to redirect HTTP tra…   19                                      [OK]
centos/nginx-112-centos7          Platform for running nginx 1.12 or building …   16                                      
centos/nginx-18-centos7           Platform for running nginx 1.8 or building n…   13                                      
bitwarden/nginx                   The Bitwarden nginx web server acting as a r…   12                                      
flashspys/nginx-static            Super Lightweight Nginx Image                   11                                      [OK]
mailu/nginx                       Mailu nginx frontend                            10                                      [OK]
webdevops/nginx                   Nginx container                                 9                                       [OK]
sophos/nginx-vts-exporter         Simple server that scrapes Nginx vts stats a…   7                                       [OK]
ansibleplaybookbundle/nginx-apb   An APB to deploy NGINX                          3                                       [OK]
wodby/nginx                       Generic nginx                                   1                                       [OK]
# 下载 Nginx 镜像
root@ALi:~# docker pull nginx
Using default tag: latest
latest: Pulling from library/nginx
a2abf6c4d29d: Pull complete 
a9edb18cadd1: Pull complete 
589b7251471a: Pull complete 
186b1aaa4aa6: Pull complete 
b4df32aa5a72: Pull complete 
a0bcbecc962e: Pull complete 
Digest: sha256:0d17b565c37bcbd895e9d92315a05c1c3c9a29f762b011a10c54a66cd53c9b31
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest
# 验证 Nginx 镜像是否下载成功
root@ALi:~# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
nginx               latest              605c77e624dd        21 hours ago        141MB
mysql               latest              3218b38490ce        9 days ago          516MB
hello-world         latest              feb5d9fea6a5        3 months ago        13.3kB
centos              latest              5d0da3dc9764        3 months ago        231MB
# 新建容器并运行 Nginx,同时完成端口映射和命名
root@ALi:~# docker run --name first-Nginx -d -p 3000:80 nginx
12fe23e2bac31ebcce62e4fdfe8ae85108c2afa94a1c47e7ee77f99a0e590dba
root@ALi:~# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                  NAMES
12fe23e2bac3        nginx               "/docker-entrypoint.…"   3 seconds ago       Up 2 seconds        0.0.0.0:3000->80/tcp   first-Nginx
# 验证是否正确开启 Nginx, 以下为y
root@ALi:~# curl localhost:3000
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

## docker 镜像

### docker commit（慎用）

需要保存当前容器的状态,便可通过 commit 提交,来获得一个对象.

| 名称，速记‎       | ‎默认值 | ‎描述‎                                                       |
| ---------------- | ------ | ---------------------------------------------------------- |
| `--author`‎,‎`-a`  |        | ‎作者（例如，"John Hannibal Smith\<hannibal@a-team.com\>"）‎ |
| `--change`‎,‎`-c`  |        | ‎将 Dockerfile 指令应用于创建的映像‎                         |
| `--message`‎,‎`-m` |        | ‎提交消息‎                                                   |
| `--pause`‎,‎`-p`   | `true` | ‎在提交期间暂停容器‎                                         |

例如:`docker commit c3f279d17e0a  svendowideit/testimage:version3`

## 容器数据卷

如果数据都在容器中,一旦删除容器,数据也会丢失.**如何使数据持久化?**

为解决这个问题, Docker具备一个数据共享技术进行容器数据的持久化和同步操作.

### 使用数据卷

#### 直接使用命令进行挂在`-v`

`docker run -it -v 主机目录:容器目录`

例如:`docker run -d -p 3310:3306  -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mysql2022 --name="mysql01" mysql`

解释:

1. `-v`可使用多次,挂载多个目录
2. `-e`配置环境参数,`MYSQL_ROOT_PASSWORD=centos-2022`就是配置 MySQL的 root 密码为`centos-2022`
3. `-p 3310:3306`将主机的3310端口映射到该容器的3306端口

#### 数据卷容器

**使用`docker run --volumes-from`命令开启一个新容器同时挂载已挂载于容器中的数据卷以实现数据卷共享和同步**.

例如:`docker run -it --name docekr02 --volumes-from docker01 wenbin/dockerfile01:1.0`

帮助容器之间配置信息传递、数据持久化和同步。数据卷容器的生命周期持续到无容器使用该数据卷。

## DockerFile

DockerFile就是构建Docker镜像的脚本文件。

### 构建步骤

1. 编写 dockerfile 文件
2. docker build 构建成为一个镜像
3. docker run 运行镜像
4. docker push 发布镜像（可选）

简单脚本示例:

```dockerfile
# 创建dockerfile文件,文件名建议带有dockerfile
# 脚本中的指令大写
FROM centos
# 挂载 "/volumes1", "/volumes2" 两个数据卷
VOLUME ["/volumes1", "/volumes2"]
CMD echo "----end----"
CMD /bin/bash
```

使用`docker build`命令运行:`docker build -f /dockerfile1 -t wenbin/dockerfile01:1.0 .`

![image-20220105221714050](https://gitee.com/wencbin/pics/raw/master/images/image-20220105221714050.png)

检查一下,发现容器构建成功:

![image-20220105221832507](https://gitee.com/wencbin/pics/raw/master/images/image-20220105221832507.png)

再使用`docker run`命令运行容器.

### 指令

#### 基础知识

1. 每个指令必须是大写
2. 从上到下顺序执行
3. `#`注释
4. 每个指令都会创建提交一个镜像层
5. 面向开发者

#### 命令

| 命令       | 描述                                                     |
| ---------- | -------------------------------------------------------- |
| FROM       | 基础镜像，一切从这里开始                                 |
| MAINTAINER | 镜像作者、维护者，名字+邮箱                              |
| RUN        | 镜像构建时需要运行的命令                                 |
| VOLUME     | 镜像挂载的目录                                           |
| EXPOSE     | 对外暴露的端口配置                                       |
| CMD        | 指定容器启动时要运行的命令，仅最后一个生效，可以追加命令 |
| ENTRYPOINT | 指定容器启动时要运行的命令，可以追加命令                 |
| ONBUILD    | 当构建一个被继承的 dockerfile 时会运行                   |
| COPY       | 类似 ADD， 将文件拷贝到镜像中                            |
| ENV        | 构建时设置的环境变量                                     |

![image-20220105225110724](https://gitee.com/wencbin/pics/raw/master/images/image-20220105225110724.png)

![image-20220105225005891](https://gitee.com/wencbin/pics/raw/master/images/image-20220105225005891.png)

### dockerfile 实战

****



## Docker 网络

## docker 常用配套工具

### [Portainer](https://www.portainer.io/)









