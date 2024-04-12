# RPC和gRPC

## RPC

**RPC(Remote Procedure Call Protocol)**，是远程过程调用的缩写，通俗的说就是调用远程的一个函数，与之相对应的是本地函数调用。

- IPC：进程间通信
- RPC：远程进程间通信，应用层协议（http也是应用层协议），底层使用TCP实现

### 理解RPC

1. 像调用本地函数一样，调用远程函数
2. 通过RPC协议，传递：函数名、函数参数，达到在本地调用远程函数，将返回值返回到本地的目的

### 微服务使用RPC的原因

1. 每个服务都在自己的进程，彼此之间“独立” 
2. 进程之间可以使用不同的语言实现

### RPC入门

#### 服务端

1. 注册RPC服务对象，给对象绑定方法

   1. 定义类

   2. 绑定类方法

   3. ```go
      rpc.RegisterName("服务名", 回调对象)
      ```

2. 创建监听器

   ```go
   listener, err := net.Listen()
   ```

3. 建立连接

   ```go
   conn, err := listener.Accept()
   ```

4. 将连接绑定RPC服务

   ```go
   rpc.ServeConn(conn)
   ```

#### 客户端

1. 使用RPC连接服务器

   ```go
   conn, err := rpc.Dial()
   ```

2. 调用远程函数

   ```go
   conn.Call("服务名.方法名", 传入参数, 传出参数)
   ```



#### RPC API示例

##### rpc.RegisterName

```go
func (server *Server) RegisterName(name string,rcvr interface{}) error {}
```

参数`name`：服务名。字符串类型。
参数`rcvr`：对应rpc对象。该对象绑定方法要满足如下条件：

1. 方法必须是导出的一一包外可见，首字母大写。
2. 方法必须有两个参数，都必须导出类型或内建类型。
3. 方法的第二个参数必须是“指针”（传出参数）
4. 方法只有一个error接口类型的返回值

代码示例：

```go
package main

import "net/rpc"

// Person 定义
type Person struct{}

// Hello 回调方法
func (w *Person) Hello(name string, resp *string) error {
	*resp = "Hello, " + name
	return nil
}

func main() {
	// ...
	rpc.RegisterName("Person", new(Person))
    // ...
}
```

##### rpc.ServeConn

```go
func (server *Server) ServeConn(conn io.ReadwriteCloser){}
```

其中，`conn`是成功建立好的`socket`连接。

##### rpc.Call

注意是客户端调用远程方法。

```go
func （client *client) Call(serviceMethod string, args interface{}, replyinterface{b)error {}
```

1. `serviceMethod`：“服务路.方法名"
2. args：传入参数。方法需要的数据。
3. reply：传出参数。一般是提前定义变量，再通过取址`&`变量完成传参。

#### RPC整体示例

服务端：

```go
package main

import (
	"fmt"
	"net"
	"net/rpc"
)

// Person 定义
type Person struct{}

// Hello 回调方法
func (w *Person) Hello(name string, resp *string) error {
	*resp = "Hello, " + name
	return nil
}
func main() {
	listner, err := net.Listen("tcp", ":10086")
	if err != nil {
		fmt.Printf("监听端口失败: %v", err)
		return
	}
	defer listner.Close()
	// 注册服务
	rpc.RegisterName("Person", new(Person))
	for {
		fmt.Println("等待连接...")
		conn, err := listner.Accept()
		if err != nil {
			fmt.Printf("接收连接失败: %v", err)
			return
		}
		rpc.ServeConn(conn)
	}
}
```

客户端：

```go
package main

import (
	"fmt"
	"net/rpc"
)

func main() {
	conn, err := rpc.Dial("tcp", "localhost:10086")
	if err != nil {
		fmt.Printf("连接RPC服务器失败: %v", err)
		return
	}
    defer conn.Close()
    
	var resp string
	err = conn.Call("Person.Hello", "World", &resp)
	if err != nil {
		fmt.Printf("RPC调用失败: %v", err)
		return
	}
	fmt.Println(resp)
}
```

### 跨语言的RPC

标准库的RPC默认采用Go语言特有的gob编码。因此，其它语言调用Go语言实现的RPC服务将比较困难。通过官方自带的net/rpc/jsonrpc扩展可以实现一个跨语言RPC。

#### 服务端

```go
package main

import (
	"fmt"
	"net"
	"net/rpc"
	"net/rpc/jsonrpc"
)

// Person 定义
type Person struct{}

// Hello 回调方法
func (w *Person) Hello(name string, resp *string) error {
	*resp = "Hello, " + name
	return nil
}
func main() {
	listner, err := net.Listen("tcp", ":10086")
	if err != nil {
		fmt.Printf("监听端口失败: %v", err)
		return
	}
	defer listner.Close()
	// 注册服务
	rpc.RegisterName("Person", new(Person))
	for {
		fmt.Println("等待连接...")
		conn, err := listner.Accept()
		if err != nil {
			fmt.Printf("接收连接失败: %v", err)
			return
		}
		jsonrpc.ServeConn(conn)
	}
}
```

最大的变化是使用：**`jsonrpc.ServeConn(conn)`**替换了`rpc.ServeConn(conn)`。

#### 客户端

```go
package main

import (
	"fmt"
	"net/rpc/jsonrpc"
)

func main() {
	conn, err := jsonrpc.Dial("tcp", "localhost:10086")
	if err != nil {
		fmt.Printf("连接RPC服务器失败: %v", err)
		return
	}
	defer conn.Close()

	var resp string
	err = conn.Call("Person.Hello", "World", &resp)
	if err != nil {
		fmt.Printf("RPC调用失败: %v", err)
		return
	}
	fmt.Println(resp)
}
```

最大的变化是使用：**`jsonrpc.Dial`**替换了`rpc.Dial`。

## Protobuf

Protobuf是Protocol Buffers的简称，它是Google公司开发的一种数据描述语言，是一种轻便高效的结构化数据存储格式，可以用于结构化数据串行化，或者说序列化。它很适合做**数据存储**或 **RPC 数据交换格式**。可用于通讯协议、数据存储等领域的语言无关、平台无关、可扩展的序列化结构数据格式。

### 基本语法

protobuf的定义语法比较简单，使用`.proto`文件来描述数据结构。以下是protobuf的详细语法说明。

### 一、基本语法元素

#### 1. 语法版本

每个`.proto`文件的开头通常需要指定protobuf的语法版本，目前主要有`proto2`和`proto3`两个版本。

```protobuf
syntax = "proto2";
// 或者
syntax = "proto3";
```

#### 2. 包（Package）

包定义可以帮助防止命名冲突，并且可以作为命名空间使用。

```protobuf
package example;
```

#### 3. 消息（Message）

消息是protobuf中定义数据结构的基础单元，类似于C++中的类或Java中的对象。

```protobuf
message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  int32 result_per_page = 3;
}
```

#### 4. 字段类型

protobuf提供了多种字段类型，包括标量类型、枚举、消息类型等。

- 标量类型：包括整型、浮点型、布尔型、字符串等。
- 枚举（Enum）：用来定义一组命名的常量。
- 消息类型：可以引用其他消息。

#### 5. 字段标签（Field Tags）

每个字段都有一个唯一的数字标签（Tag），这些标签用于在编解码时识别字段。

#### 6. 字段修饰符

- 对于`proto2`语法，字段可以是可选（optional）、必需（required）或重复（repeated）。
- 对于`proto3`语法，所有字段默认都是可选的，但不存在`required`修饰符，并且没有字段默认值的概念。

### 二、数据类型

#### 1. 标量类型

protobuf提供以下标量类型：

- 整型：`int32`, `int64`, `uint32`, `uint64`, `sint32`, `sint64`, `fixed32`, `fixed64`, `sfixed32`, `sfixed64`
- 布尔型：`bool`
- 浮点型：`float`, `double`
- 字符串：`string`
- 字节序列：`bytes`

#### 2. 枚举（Enum）

枚举用来定义一组命名的整型常量。

```protobuf
enum Corpus {
  UNIVERSAL = 0;
  WEB = 1;
  IMAGES = 2;
  LOCAL = 3;
  NEWS = 4;
  PRODUCTS = 5;
  VIDEO = 6;
}
```

#### 3. 消息类型

消息类型可以嵌套定义，并且可以互相引用。

```protobuf
message SearchResponse {
  repeated Result results = 1;
  
  message Result {
    string url = 1;
    string title = 2;
    repeated string snippets = 3;
  }
}
```

### 三、字段规则

#### 1. `proto2`字段规则

在`proto2`语法中，字段可以被声明为`optional`（默认），`required`或`repeated`。

- `optional`：字段不一定需要出现，可以有默认值。
- `required`：字段必须出现，否则消息就会被认为是不完整的。
- `repeated`：字段可以重复任意次数（包括0次），字段的集合顺序会被保留。

#### 2. `proto3`字段规则

在`proto3`语法中，所有字段都被认为是`optional`，但是不再表示为“字段可以没有”，而是表示“字段可以为默认值”。`repeated`字段表示法与`proto2`相同。

### 四、服务定义（Service Definition）

Protobuf还可以定义RPC（远程过程调用）服务接口。

```protobuf
service SearchService {
  rpc Search(SearchRequest) returns (SearchResponse);
}
```

### 五、导入其他`.proto`文件

可以通过`import`语句来引用其他`.proto`文件中定义的消息类型。

```protobuf
import "google/protobuf/timestamp.proto";
```

### 六、选项（Options）

选项可以自定义protobuf编译器的行为，例如为生成的代码指定包名。

```protobuf
option java_package = "com.example.foo";
```

### 七、其他语法元素

- 注释：`//`和`/* */`可以用来添加注释。
- Oneof：`oneof`字段允许你在指定的字段中仅设置一个。
- Map：`map<key_type, value_type>`可以用来定义键值对集合。
- 包含类型：可以使用".typename"来指定全局作用域。

### 八、实例

以下是一个`.proto`文件的示例：

```protobuf
syntax = "proto3";

package tutorial;

import "google/protobuf/timestamp.proto";

message Person {
  string name = 1;
  int32 id = 2;
  string email = 3;
  
  enum PhoneType {
    MOBILE = 0;
    HOME = 1;
    WORK = 2;
  }
  
  message PhoneNumber {
    string number = 1;
    PhoneType type = 2;
  }
  
  repeated PhoneNumber phones = 4;
  
  google.protobuf.Timestamp last_updated = 5;
}

message AddressBook {
  repeated Person people = 1;
}
```

这个例子定义了一个地址簿（`AddressBook`），其中包含多个人（`Person`），每个人有名字、ID、邮箱和多个电话号码，以及一个最后更新时间戳。

### 编译protobuf

```bash
protoc --go_out=./ *.proto
```

### 添加RPC服务

#### 基本语法

```protobuf
service 服务名 {
	rpc 函数名 returns (返回值: 消息体)
}
// example
message Peple {
	string name = 1;
}
message Student {
	string name = 2;
}
service hello {
	rpc HelloWorld(People) returns (Student);
}
```

因为protobuf默认不编译服务`service`的。要想编译`RPC`服务，需要使用`grpc`。

将使用的编译指令改为:

```bash
# protoc --go_out=./ *.proto
protoc --go-grpc_out=./ *.proto
```

生成的文件，本质上就是对RPC服务的封装。

### gRPC使用示例

编辑proto文件：

```protobuf
// hello.proto
syntax = "proto3";

package pb;

option go_package = "/pb"; // 这个是一定要指定的

message Person {
  string name = 1;
  int32 age = 2;
}

message HelloReq {
  Person p = 1;
}

message HelloResp {
  string greet = 1;
}

service HelloService {
  rpc SayHello (HelloReq) returns (HelloResp);
}

/*
protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    hello.proto
*/
```

运行protoc编译文件到当前hello.proto文件的文件夹：

```bash
protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    hello.proto
```

这个命令使用 `protoc` 编译器来编译 `hhello.proto` protobuf 文件，并为 Go 语言生成相应的源代码。命令中的每一部分都有特定的作用：

- `protoc`：这是 Protocol Buffers 的编译器命令。

- `--go_out=.`：这告诉 `protoc` 为 protobuf 消息生成 Go 语言的代码，并将输出文件放在当前目录（`.` 指代当前目录）。

- `--go_opt=paths=source_relative`：这是一个额外的选项，它告诉 `protoc` 使用源相对路径作为生成的 Go 文件的输出路径。这意味着生成的 Go 文件将位于与 `.proto` 文件相对应的相对路径下，而不是位于 `$GOPATH` 下的绝对路径。

- `--go-grpc_out=.`：这告诉 `protoc` 为 gRPC 服务接口生成 Go 代码，并将输出文件放在当前目录。

- `--go-grpc_opt=paths=source_relative`：这同样是一个额外的选项，作用类似于 `--go_opt`，但是它是用来指定 gRPC 生成代码的输出路径。

- `helloworld/helloworld.proto`：这是要编译的 protobuf 文件的路径。

综合起来，这条命令会在当前目录下创建两个 Go 语言源文件：一个对应于 `helloworld.proto` 文件中定义的 protobuf 消息的代码，另一个对应于其中定义的 gRPC 服务接口的代码。这些生成的文件的包路径将与 `.proto` 文件在项目中的相对路径相匹配。

**注意：proto文件中一定要包含`option go_package = "/pb";`，不然编译会报错，让你进行补充。**

以上命令行执行成功后，会在当前文件夹下生成`hello_grpc.pb.go`这个文件，里面就包含了我对RPC SayHello() 方法的封装，接下来就只需要按照实现RPC通信的方式分别在服务端和客户端将其进行实现即可。

#### 服务端

```go
package main

import (
	"context"
	"fmt"
	"go-microservice-study/protobuf-tutorial/pb"
	"net"

	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedHelloServiceServer
}

// SayHello 实现对应的SayHello接口
func (s *server) SayHello(ctx context.Context, in *pb.HelloReq) (*pb.HelloResp, error) {
	return &pb.HelloResp{Greet: "Greet: hello , " + in.P.Name}, nil
}

func main() {
	// 启动监听服务
	listener, err := net.Listen("tcp", ":8081")
	if err != nil {
		fmt.Println("net.Listen err", err)
		return
	}
	// 创建gRPC服务
	s := grpc.NewServer()
	// 注册gRPC响应函数
	pb.RegisterHelloServiceServer(s, new(server))
	fmt.Printf("server listening at %v", listener.Addr())
	// 启动gRPC服务，这里会是一直保持启动状态的，不必使用无限循环
	if err = s.Serve(listener); err != nil {
		fmt.Println("s.Serve(listener) err", err)
		return
	}
}
```

#### 客户端

```go
package main

import (
	"context"
	"fmt"
	"go-microservice-study/protobuf-tutorial/pb"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	// 启动grpc连接远程服务的方法
	conn, err := grpc.Dial("127.0.0.1:8081", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		fmt.Println("grpc.Dial err: ", err)
		return
	}
	defer conn.Close()
	// 启动封装的gRPC客户端
	c := pb.NewHelloServiceClient(conn)
	// gRPC传参
	var req = pb.HelloReq{
		P: &pb.Person{
			Name: "小明",
			Age:  11,
		},
	}
	// 调用服务端gRPC服务，注意此时返回值就是第一个参数，resp
	resp, err := c.SayHello(context.Background(), &req)
	if err != nil {
		fmt.Println("c.SayHello err", err)
	}
	// 打印调用结果
	fmt.Println("Get: ", resp.Greet)
}
```

