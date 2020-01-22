## tomcat

- 作为 web 开发人员,开发完的网页肯定是想通过 ip 或域名在浏览器上访问.
- 用户使用浏览器访问网页就是发送 http 请求,web 服务器响应请求的过程.所以解析 http 的工作就交给 web 服务器了.
- web 服务器有很多,tomcat 是一款小巧灵活并使用最多的 Web 应用服务器

## 下载

[tomcat 下载](https://tomcat.apache.org/download-70.cgi)

## 解压文件

复制/usr/local 中,改名为 ApacheTomcat

## 配置环境变量

```
// 编辑
vi ~/.bash_profile
// 键入内容
# apache-tomcat
export TOMCAT_HOME=/usr/local/ApacheTomcat
export PATH=$PATH:$TOMCAT_HOME/bin
// 重启
source ~/.bash_profile
```

## 配置文件权限

```
cd /usr/local/ApacheTomcat/bin
sudo chmod +x *.sh
```

## 启动 Tomcat

```
startup.sh // 启动 tomcat
// 执行后即可访问 http://localhost:8080/
shutdown.sh // 关闭 tomcat
```

## 设置管理员的用户名/密码

修改 conf/tomcat-users.xml

```xml
<role rolename="manager-gui"/>
<role rolename="manager-script"/>
<role rolename="manager-jmx"/>
<role rolename="manager-status"/>
<role rolename="admin-gui"/>
<role rolename="admin-script"/>
<user username="admin" password="admin" roles="manager-gui,manager-script,manager-jmx,manager-status,admin-gui,admin-script"/>
```

## 修改默认端口

修改 conf/server.xml

```xml
<Connector port="8080" protocol="HTTP/1.1"
               maxThreads="150" connectionTimeout="20000"
               redirectPort="8443" />
```

将 8080 改为 8366
