## 下载

打开 Maven 官网下载页面：[http://maven.apache.org/download.cgi](http://maven.apache.org/download.cgi)
下载:apache-maven-3.5.0-bin.tar.gz

解压下载的安装包到某一目录，比如：/usr/local/apache-maven-3.6.3

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
