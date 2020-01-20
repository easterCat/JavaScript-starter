## 下载

打开 Maven 官网下载页面：[http://maven.apache.org/download.cgi](http://maven.apache.org/download.cgi)
下载:apache-maven-3.5.0-bin.tar.gz

解压下载的安装包到某一目录，比如：/usr/local/apache-maven-3.6.3

- bin 目录：该目录包含了 mvn 运行的脚本，这些脚本用来配置 java 命令，准备好 classpath 和相关的 Java 系统属性，然后执行 Java 命令。
- boot 目录:  该目录只包含一个文件，该文件为 plexus-classworlds-2.6.0.jar。plexus-classworlds 是一个类加载器框架，相对于默认的 java 类加载器，它提供了更加丰富的语法以方便配置，Maven 使用该框架加载自己的类库。
- conf 目录: 该目录包含了一个非常重要的文件 settings.xml。直接修改该文件，就能在机器上全局地定制 Maven 的行为，一般情况下，我们更偏向于复制该文件至~/.m2/目录下（~表示用户目录），然后修改该文件，在用户范围定制 Maven 的行为。
- lib 目录: 该目录包含了所有 Maven 运行时需要的 Java 类库，Maven 本身是分模块开发的，因此用户能看到诸如 maven-core-3.6.3.jar、maven-model-3.6.3.jar 之类的文件，此外这里还包含一些 Maven 用到的第三方依赖如 commons-cli-1.2.jar、commons-lang-2.6.jar 等等。

## 配置环境变量

```
vim ~/.bash_profile
```

然后键入

```
# maven
export MAVEN_HOME=/usr/local/apache-maven-3.6.3
export PATH=$PATH:$MAVEN_HOME/bin
```

最后重新启动

```
source ~/.bash_profile
```

## 查看配置是否生效

```
mvn -v
```

控制台输出

```
Maven home: /usr/local/apache-maven-3.6.3
Java version: 13.0.1, vendor: Oracle Corporation, runtime: /Library/Java/JavaVirtualMachines/jdk-13.0.1.jdk/Contents/Home
Default locale: zh_HK_#Hans, platform encoding: UTF-8
OS name: "mac os x", version: "10.14.6", arch: "x86_64", family: "mac"
```

配置成功

## 在 IntelliJ IDEA 中配置 maven

![](https://raw.githubusercontent.com/easterCat/img-package/master/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-12-18%20%E4%B8%8A%E5%8D%8811.38.45.png)

## 新建 maven web 项目

点击 file=>new=>project

![](https://raw.githubusercontent.com/easterCat/img-package/master/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-12-18%20%E4%B8%8A%E5%8D%8811.41.11.png)

点击 next

![](https://raw.githubusercontent.com/easterCat/img-package/master/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-12-18%20%E4%B8%8A%E5%8D%8811.02.09.png)

点击+号进行配置添加,配置为 archetypeCatalog=internal

![](https://raw.githubusercontent.com/easterCat/img-package/master/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-12-18%20%E4%B8%8A%E5%8D%8811.06.18.png)

继续下一步

![](https://raw.githubusercontent.com/easterCat/img-package/master/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-12-18%20%E4%B8%8A%E5%8D%8811.06.40.png)

当你建立一个 Maven 的项目，Maven 会检查你的 pom.xml 文件，以确定哪些依赖下载。首先，Maven 将从本地资源库获得 Maven 的本地资源库依赖资源，如果没有找到，然后把它会从默认的 Maven 中央存储库  – http://repo1.maven.org/  查找下载。

![](https://raw.githubusercontent.com/easterCat/img-package/master/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-12-18%20%E4%B8%8A%E5%8D%8811.07.10.png)

maven web 模板项目结构

![](https://raw.githubusercontent.com/easterCat/img-package/master/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-12-18%20%E4%B8%8A%E5%8D%8811.36.17.png)

## Maven 唯一 ID

对于某个依赖，Maven 只需要 3 个变量即可唯一确定某个 jar 包：

- groupId：属于组织的名称，类似 Java 的包名；
- artifactId：该 jar 包自身的名称，类似 Java 的类名；
- version：该 jar 包的版本。

通过上述 3 个变量，即可唯一确定某个 jar 包。Maven 通过对 jar 包进行 PGP 签名确保任何一个 jar 包一经发布就无法修改。修改已发布 jar 包的唯一方法是发布一个新版本。

因此，某个 jar 包一旦被 Maven 下载过，即可永久地安全缓存在本地。

> 只有以 SNAPSHOT-开头的版本号会被 Maven 视为开发版本，开发版本每次都会重复下载，这种 SNAPSHOT 版本只能用于内部私有的 Maven repo，公开发布的版本不允许出现 SNAPSHOT。

## Lifecycle 和 Phase

Maven 的生命周期(Lifecycle)由一系列阶段（phase）构成，以内置的生命周期 default 为例，它包含以下 phase：

- validate
- initialize
- generate-sources
- process-sources
- generate-resources
- process-resources
- compile
- process-classes
- generate-test-sources
- process-test-sources
- generate-test-resources
- process-test-resources
- test-compile
- process-test-classes
- test
- prepare-package
- package
- pre-integration-test
- integration-test
- post-integration-test
- verify
- install
- deploy

## Maven 常用命令说明

- mvn clean：表示运行清理操作（会默认把 target 文件夹中的数据清理）。
- mvn clean compile：表示先运行清理之后运行编译，会将代码编译到 target 文件夹中。
- mvn clean test：运行清理和测试。
- mvn clean package：运行清理和打包。
- mvn clean install：运行清理和安装，会将打好的包安装到本地仓库中，以便其他的项目可以调用。
- mvn clean deploy：运行清理和发布（发布到私服上面）。

## Maven 使用

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <packaging>war</packaging>
  <name>ptg-base</name>
  <groupId>com.ptg</groupId>
  <artifactId>ptg-base</artifactId>
  <version>1.0-SNAPSHOT</version>
</project>
```

- 代码的第一行是 XML 头，指定了该 xml 文档的版本和编码方式。
- project 是所有 pom.xml 的根元素，它还声明了一些 POM 相关的命名空间及 xsd 元素。
- 根元素下的第一个子元素 modelVersion 指定了当前的 POM 模型的版本，对于 Maven3 来说，它只能是 4.0.0
- 代码中最重要是包含了 groupId,artifactId 和 version 了。这三个元素定义了一个项目基本的坐标，在 Maven 的世界，任何的 jar、pom 或者 jar 都是以基于这些基本的坐标进行区分的。
- groupId 定义了项目属于哪个组，随意命名，比如谷歌公司的 myapp 项目，就取名为  com.google.myapp
- artifactId 定义了当前 Maven 项目在组中唯一的 ID,比如定义 hello-world。
- version 指定了项目当前的版本 0.0.1-SNAPSHOT,SNAPSHOT 意为快照，说明该项目还处于开发中，是不稳定的。
- name 元素生命了一个对于用户更为友好的项目名称，虽然这不是必须的，但还是推荐为每个 POM 声明 name,以方便信息交流

## 依赖的配置

```xml
  <dependencies>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>RELEASE</version>
    </dependency>
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>4.0.1</version>
    </dependency>
    <dependency>
      <groupId>javax.servlet.jsp</groupId>
      <artifactId>javax.servlet.jsp-api</artifactId>
      <version>2.3.3</version>
    </dependency>
  </dependencies>
```

根元素 project 下的 dependencies 可以包含一个或者多个 dependency 元素，以声明一个或者多个项目依赖。每个依赖可以包含的元素有：

- grounpId、artifactId 和 version:以来的基本坐标，对于任何一个依赖来说，基本坐标是最重要的，Maven 根据坐标才能找到需要的依赖。
- type:依赖的类型，对于项目坐标定义的 packaging。大部分情况下，该元素不必声明，其默认值为 jar
- scope:依赖的范围
- optional:标记依赖是否可选
- exclusions:用来排除传递性依赖

## 依赖范围

依赖范围就是用来控制依赖和三种 classpath(编译 classpath，测试 classpath、运行 classpath)的关系，Maven 有如下几种依赖范围：

- **compile:**编译依赖范围。如果没有指定，就会默认使用该依赖范围。使用此依赖范围的 Maven 依赖，对于编译、测试、运行三种 classpath 都有效。典型的例子是 spring-code,在编译、测试和运行的时候都需要使用该依赖。
- test:  测试依赖范围。使用次依赖范围的 Maven 依赖，只对于测试 classpath 有效，在编译主代码或者运行项目的使用时将无法使用此依赖。典型的例子是 Jnuit,它只有在编译测试代码及运行测试的时候才需要。
- **provided:**已提供依赖范围。使用此依赖范围的 Maven 依赖，对于编译和测试 classpath 有效，但在运行时候无效。典型的例子是 servlet-api,编译和测试项目的时候需要该依赖，但在运行项目的时候，由于容器以及提供，就不需要 Maven 重复地引入一遍。
- **runtime:**运行时依赖范围。使用此依赖范围的 Maven 依赖，对于测试和运行 classpath 有效，但在编译主代码时无效。典型的例子是 JDBC 驱动实现，项目主代码的编译只需要 JDK 提供的 JDBC 接口，只有在执行测试或者运行项目的时候才需要实现上述接口的具体 JDBC 驱动。
- **system:**系统依赖范围。该依赖与三种 classpath 的关系，和 provided 依赖范围完全一致，但是，使用 system 范围的依赖时必须通过 systemPath 元素显示地指定依赖文件的路径。由于此类依赖不是通过 Maven 仓库解析的，而且往往与本机系统绑定，可能构成构建的不可移植，因此应该谨慎使用。systemPath 元素可以引用环境变量
- **import:**导入依赖范围。该依赖范围不会对三种 classpath 产生实际的影响。 上述除 import 以外的各种依赖范围与三种 classpath 的关系如下

```xml
<dependency>
    <groupId>javax.sql</groupId>
    <artifactId>jdbc-stdext</artifactId>
    <Version>2.0</Version>
    <scope>system</scope>
    <systemPath>${java.home}/lib/rt.jar</systemPath>
</dependency>
```

## 排除依赖

有时候你引入的依赖中包含你不想要的依赖包，你想引入自己想要的，这时候就要用到排除依赖了，比如下图中 spring-boot-starter-web 自带了 logback 这个日志包，我想引入 log4j2 的，所以我先排除掉 logback 的依赖包，再引入想要的包就行了

```xml
<exclusions>
    <exclusion>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-logging</artifactId>
    </exclusion>
</exclusions>
```

## doc

- [maven 入门](https://juejin.im/post/5a4a5e2bf265da4322418d7f)
