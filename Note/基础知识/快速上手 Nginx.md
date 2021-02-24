# 快速上手 Nginx

## 基础概念

### 正向代理

> 在客户端配置代理服务器，客户端通过代理服务器进行互联网的访问。

![image-20210110171207684](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210110171207684.png)

### 反向代理

> 客户端不做任何配置，反向代理服务器和目标服务器对外显示为反向代理服务器。反向代理服务器将客户端请求转发到目标处理服务器处理后返回响应。

![image-20210110171946770](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210110171946770.png)

### 负载均衡

> 通过反向代理服务器将客户端请求分发到各个（多个）服务器上处理后返回，增强服务的并发能力。

![image-20210110173207096](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210110173207096.png)

### 动静分离

> 加快网站解析速度，分担服务器压力。将静态资源和动态资源放置在不同的服务器上，通过反向代理服务器分发请求（负载）。

![image-20210110173558035](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210110173558035.png)

## 安装和配置

### 安装

[如何在Debian 9上安装Nginx](https://www.myfreax.com/how-to-install-nginx-on-debian-9/)

1. ```bash
   sudo apt update	# 更新软件包索引
   ```

2. ```bash
   sudo apt install nginx	# 安装Nginx软件包
   ```

3. ```bash
   curl -I 127.0.0.1	# Nginx服务将在安装过程完成后自动启动。您可以通过运行以下 curl 命令进行验证
   ```

4. ```bash
   # 出现下列响应内容，则 Nginx 安装成功
   HTTP/1.1 200 OK
   Server: nginx/1.10.3
   Date: Mon, 27 Aug 2018 22:29:02 GMT
   Content-Type: text/html
   Content-Length: 612
   Last-Modified: Mon, 27 Aug 2018 22:27:54 GMT
   Connection: keep-alive
   ETag: "5b847aea-264"
   Accept-Ranges: bytes
   ```

### 配置

> 使用阿里云服务器，要想从客户端访问到服务器，还需要配置安全组，放开端口 80 （http专用）和端口 443 （https专用）的限制。

#### Nginx配置文件的结构和最佳做法

- **Nginx配置文件存储在`/etc/nginx`目录中。**
- **主要Nginx配置文件为`/etc/nginx/nginx.conf`。**
- 服务器块（vhost）配置文件存储在`/etc/nginx/sites-available`目录。除非将这些文件链接到`/etc/nginx/sites-enabled`目录，否则Nginx不会使用该目录中的配置文件。
- 通过从服务器目录创建[ symlink ](https://www.myfreax.com/how-to-create-symbolic-links-in-linux-using-the-ln-command/)（指针）来激活服务器块。配置文件站点从`sites-available`目录移至`sites-enabled`目录。
- 要编写更具可维护性的代码，遵循标准命名约定是一个好主意。例如，如果您的域名是`mydomain.com`，则配置文件应命名为`/etc/nginx/sites-available/mydomain.com.conf`。
- `/etc/nginx/snippets`目录包含可包含在服务器阻止文件中的配置摘要。如果使用可重复的配置段，则可以将这些段重构为片段，并将片段文件包括到服务器块中。
- Nginx日志文件（`access.log`和`error.log`）位于`/var/log/nginx/`目录中。建议每个服务器块使用不同的`access`和`error`日志文件。
- 您可以将域文档根目录设置为所需的任何位置。 Webroot的最常见位置包括：
- `/home/<user_name>/<site_name>`
- `/var/www/<site_name>`
- `/var/www/html/<site_name>`
- `/opt/<site_name>`

#### 常用命令

```bash
ngxin -v 			# 查看 nginx 版本号
nginx 	 			# 启动 nginx
nginx -s stop # 关闭 nginx
nginx -s reload	# 重新加载配置文件
```

#### 配置文件

##### 文件组成

1. 全局块（配置文件开始到 events 块之间的内容，设置服务器整体运行的配置命令）
   1. `worker_process	1;`可处理的并发值
2. events 块（设置 Nginx 服务器与用户的网络连接）
   1. `worker_connections 1024;`支持最大连接数
3. http 块
   1. http 全局块（文件引入、MIME-TYPE定义、日志定义、连接超时事件、单链接请求数上限等）
   2. server 块（与虚拟主机密切相关）

## 实例

### 反向代理

1. 先配置本地`hosts`和`ip`。

2. 在 nginx 中做方向代理配置

   1. 新建一条`server`块

   2. `listen`设置监听端口

   3. `server_name` 设置代理服务器的`ip`地址

   4. 新建`location`块

      ```bash
      location / {
      	root html;
      	proxy_pass	http:127.0.0.1:8080;	# 监听目标真实服务器的 IP 地址和端口
      	index index.html	index.htm;
      }
      ```

### location 指令说明

1. `=`：要求字符串与`uri` 指令严格匹配，不含正则表达式。
2. `~`： 用于表示`uri`包含正则表达式，并且**区分大小写**。
3. `~*`：用于表示`uri`包含正则表达式，并且**不区分大小写**。
4. `^~`：用于不含正则表达式`uri`前，要求`Nginx`服务器找到标识`uri`和请求字符串匹配度最好的`location`后，立即使用此`location`处理请求，而不再使用`location`块中的正则`uri`和请求字符串做匹配。

### 动静分离

将动态请求和静态请求分开代理处理。

![image-20210111185644914](https://gitee.com/lijiangdao/notebook-map-bed/raw/master/noteIMG/image-20210111185644914.png)

#### 静态文件放在独立服务器中，通过 `nginx`转发处理



