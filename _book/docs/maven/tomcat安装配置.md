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
