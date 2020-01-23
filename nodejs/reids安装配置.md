## 下载 redis

[下载地址](https://redis.io/download)

## 解压配置 path

解压文件并将文件夹复制到 /usr/local/redis,更改名称为 redis 方便操作

```
cd redis
make
sudo make install
```

## redis 的命令

- redis-server: Redis 服务器
- redis-server /etc/redis.conf
- redis-cli: 命令行客户端
- redis-benchmark: Redis 的性能测试工具
- redis-check-aof: AOF 文件修复工具
- redis-check-dump: RDB 文件检测工具
- redis.conf: Redis 的配置文件
- shutdown

执行`redis-server`开启 redis

## 关闭 redis

- 强行关闭,强行终止 redis 进程可能会导致数据丢失，因为 redis 可能正在将内存数据同步到硬盘中。

```
ps axu|grep redis ## 查找 redis-server 的 PID
kill -9 PID
```

- 命令关闭,向 redis 发送 SHUTDOWN 命令，即 redis-cli SHUTDOWN 。Redis 收到命令后，服务端会断开所有客户端的连接，然后根据配置执行持久化，最后退出。

```
## 启动redis-server，后台线程
AT8775:redis shoren$ redis-server /usr/local/redis/etc/redis.conf
## 启动成功
AT8775:redis shoren$ ps axu|grep redis
shoren           14948   0.0  0.0  2434840    760 s000  S+   10:18上午   0:00.00 grep redis
shoren           14946   0.0  0.0  2452968   1492   ??  Ss   10:18上午   0:00.01 redis-server *:6379
## 关闭服务器
AT8775:redis shoren$ redis-cli shutdown
##关闭成功
AT8775:redis shoren$ ps axu|grep redis
shoren           14952   0.0  0.0  2435864    772 s000  S+   10:19上午   0:00.01 grep redis
```

## 启动客户端

- 默认启动
  使用命令 redis-cli 启动客户端，按照默认配置连接 Redis（127.0.0.1:6379）。

- 指定地址和端口号
  使用命令 redis-cli -h 127.0.0.1 -p 6379

## 关闭客户端

交互模式使用 quit

```
AT8775:redis shoren$ redis-cli -h 127.0.0.1 -p 6379
## 简单使用set、get命令
127.0.0.1:6379> set key value12
OK
127.0.0.1:6379> get key
"value12"
## 退出
127.0.0.1:6379> quit
AT8775:redis shoren$
```

## 配置守护进程

redis 下新建 etc 目录,添加 redis.conf

```
#修改为守护模式
daemonize yes

#设置进程锁文件
pidfile /usr/local/redis/redis.pid

#端口
port 6379

#客户端超时时间
timeout 300

#日志级别
loglevel debug

#日志文件位置
logfile /usr/local/redis/log-redis.log

#设置数据库的数量，默认数据库为16，可以使用SELECT 命令在连接上指定数据库id
databases 16

##指定在多长时间内，有多少次更新操作，就将数据同步到数据文件，可以多个条件配合
#save

#Redis默认配置文件中提供了三个条件：
save 900 1
save 300 10
save 60 10000

#指定存储至本地数据库时是否压缩数据，默认为yes，Redis采用LZF压缩，如果为了节省CPU时间，
#可以关闭该#选项，但会导致数据库文件变的巨大
rdbcompression yes

#指定本地数据库文件名
dbfilename dump.rdb

#指定本地数据库路径
dir /usr/local/redis/db/

#指定是否在每次更新操作后进行日志记录，Redis在默认情况下是异步的把数据写入磁盘，如果不开启，可能
#会在断电时导致一段时间内的数据丢失。因为 redis本身同步数据文件是按上面save条件来同步的，所以有
#的数据会在一段时间内只存在于内存中
appendonly no

#指定更新日志条件，共有3个可选值：
#no：表示等操作系统进行数据缓存同步到磁盘（快）
#always：表示每次更新操作后手动调用fsync()将数据写到磁盘（慢，安全）
#everysec：表示每秒同步一次（折衷，默认值）
appendfsync everysec
```

## redis 图形管理工具

[图形管理工具](http://www.pc6.com/mac/486661.html)
