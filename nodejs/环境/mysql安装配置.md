## mysql

数据库（Database）是按照数据结构来组织、存储和管理数据的仓库，
每个数据库都有一个或多个不同的 API 用于创建，访问，管理，搜索和复制所保存的数据。
Mysql 数据库，MySQL 是一个关系型数据库管理系统，由瑞典 MySQL AB 公司开发，目前属于 Oracle 公司。MySQL 是一种关联数据库管理系统，关联数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。

- 数据库: 数据库是一些关联表的集合。.
- 数据表: 表是数据的矩阵。在一个数据库中的表看起来像一个简单的电子表格。
- 列: 一列(数据元素) 包含了相同的数据, 例如邮政编码的数据。
- 行：一行（=元组，或记录）是一组相关的数据，例如一条用户订阅的数据。
- 冗余：存储两倍数据，冗余降低了性能，但提高了数据的安全性。
- 主键：主键是唯一的。一个数据表中只能包含一个主键。你可以使用主键来查询数据。
- 外键：外键用于关联两个表。
- 复合键：复合键（组合键）将多个列作为一个索引键，一般用于复合索引。
- 索引：使用索引可快速访问数据库表中的特定信息。索引是对数据库表中一列或多列的值进行排序的一种结构。类似于书籍的目录。
- 参照完整性: 参照的完整性要求关系中不允许引用不存在的实体。与实体完整性是关系模型必须满足的完整性约束条件，目的是保证数据的一致性。

## homebrew 安装 mysql

homebrew 是 macOS 缺失的软件包管理器,譬如可以下载 mysql、redis、wget 等等.操作系统：macOS High Sierra Version 10.14.5
Homebrew 会将软件包安装到独立目录,并将其文件软链接至 /usr/local . Homebrew 不会将文件安装到它本身目录之外,所以您可将 Homebrew 安装到任意位置.

### 安装 Homebrew

安装命令,粘贴到终端

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

[https://brew.sh/](https://brew.sh/)

### 安装 mysql

```
brew doctor
brew update
brew install mysql
brew info mysql
```

运行 brew service start mysql 可以后台启动 mysql,运行 mysql.server start 前台启动 mysql(关闭控制台,服务停止),当安装完成之后需要进行一些设置

##### 终端命令启动或关闭：

```bash
// 启动：
sudo /usr/local/mysql/support-files/mysql.server start

// 关闭
sudo /usr/local/mysql/support-files/mysql.server stop
```

##### 进入或退出 mysql

```bash
// 进入mysql（要求输入mysql登录密码）
mysql -u root -p
// 退出mysql
exit
```

设置密码需先启动 mysql 服务

```bash
mysql_secure_installation
```

设置完之后测试一下

```bash
mysql -u root -p 123456
```

### 配置自启动

```bash
mkdir -p ~/Library/LaunchAgents

ln -sfv /usr/local/opt/mysql/*.plist ~/Library/LaunchAgents

find /usr/local/Cellar/mysql/ -name "homebrew.mxcl.mysql.plist" -exec cp {} ~/Library/LaunchAgents/ \;

launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
```

### 配置 my.cnf 文件

系统是按照如下顺序进行 my.cnf 查找

1. /etc/my.cnf
2. /etc/mysql/my.cnf
3. /usr/local/etc/my.cnf
4. ~/.my.cnf

当前在 etc 下是存在一个 my.cnf 文件

```bash
cd /etc
vim my.cnf
```

配置文件如下(略)

```bash
......
[client]
default-character-set=utf8
#password = your_password
port = 3306
socket = /tmp/mysql.sock
# Here follows entries for some specific programs
# The MySQL server
[mysqld]
character-set-server=utf8
init_connect='SET NAMES utf8
port = 3306
socket = /tmp/mysql.sock
skip-external-locking
key_buffer_size = 16M
max_allowed_packet = 1M
table_open_cache = 64
sort_buffer_size = 512K
net_buffer_length = 8K
read_buffer_size = 256K
read_rnd_buffer_size = 512K
......
```

可以改一些配置,修改完后 esc -> : -> wq 保存退出

## 配置远程连接

1、登陆 mysql 数据库

`mysql -u root -p`

查看 user 表

```
mysql> use mysql;
Database changed
mysql> select host,user,password from user;
+--------------+------+-------------------------------------------+
| host | user | password |
+--------------+------+-------------------------------------------+
| localhost | root | *A731AEBFB621E354CD41BAF207D884A609E81F5E |
| 192.168.1.1 | root | *A731AEBFB621E354CD41BAF207D884A609E81F5E |
+--------------+------+-------------------------------------------+
2 rows in set (0.00 sec)
```

可以看到在 user 表中已创建的 root 用户。host 字段表示登录的主机，其值可以用 IP，也可用主机名，

(1)有时想用本地 IP 登录，那么可以将以上的 Host 值改为自己的 Ip 即可。

2、实现远程连接(授权法)

将 host 字段的值改为%就表示在任何客户端机器上能以 root 用户登录到 mysql 服务器，建议在开发时设为%。  
 update user set host = ’%’ where user = ’root’;

将权限改为 ALL PRIVILEGES

```
mysql> use mysql;
Database changed
mysql> grant all privileges on _._ to root@'%' identified by "root";
Query OK, 0 rows affected (0.00 sec)

mysql> select host,user,password from user;
+--------------+------+-------------------------------------------+
| host | user | password |
+--------------+------+-------------------------------------------+
| localhost | root | *A731AEBFB621E354CD41BAF207D884A609E81F5E |
| 192.168.1.1 | root | *A731AEBFB621E354CD41BAF207D884A609E81F5E |
| % | root | \*A731AEBFB621E354CD41BAF207D884A609E81F5E |
+--------------+------+-------------------------------------------+
3 rows in set (0.00 sec)
```

这样机器就可以以用户名 root 密码 root 远程访问该机器上的 MySql.

3、实现远程连接（改表法）

```
use mysql;

update user set host = '%' where user = 'root';
```

这样在远端就可以通过 root 用户访问 Mysql.

## Mac 开放 3306 端口，允许外网访问

- 检查是否打开

```bash
mysql -h [ip address] -u root -p
```

- 打开/usr/local/etc/my.cnf, 修改 bind-address = 0.0.0.0

```bash
sudo vim /usr/local/etc/my.cnf

mysql.server stop
mysql.server start
```

- 把用户权限分配各远程用户, MySQL 默认 root 账户不带%而是 127.0.0.1，因此需要修改。

```bash
mysql -u root -p
use mysql;
update user set host = '%' where user = 'root';

mysql.server stop
mysql.server start
```

- 验证

```bash
brew install telnet
telnet [ip address] 3306
```

## Mysql 8.0 修改密码

- 查看当前安全变量值

```bash
SHOW VARIABLES LIKE 'validate_password%';
```

- 修改变量

```bash
set global validate_password.policy=0;
set global validate_password.length=4;
```

```bash
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '你的密码';
```

- mysql_secure_installation

重置 root 密码可以设置为 123456 了

## 数据库简单操作

- 创建数据库：create database 数据库名称
- 查看数据库：show databases;
- 删除数据库：drop database 数据库名称
- 打开数据库：use 数据库名称
- 显示某个数据库中的所有表：show tables;
- 显示数据表的结构：desc 表名;
- 创建数据表：create tabel 表名(字段名称 字段类型, ……);
- 添加新列：alter table 列名 add 字段名称 字段类型;
- 删除数据表：drop table 表名;
- 复制表：create table 新表名 like 被复制表名;
- 查询数据：select \* from 表名 where 字段 = 值;
- 插入数据：insert into 表名 (字段 1, ……) values (值 1, ……);
- 更新数据：update 表名 字段=值,...,字段 n=值 n where 字段=值;
- 删除数据：delete from 表名 where 字段=值;
