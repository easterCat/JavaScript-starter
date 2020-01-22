## 使用 intellij 创建一个 spring 项目

![](https://raw.githubusercontent.com/easterCat/img-package/master/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202020-01-21%20%E4%B8%8B%E5%8D%889.08.14.png)

## 开始项目

- Interface ：GreetingService
- Class：GreetingServiceImpl
- MainClass：HelloApp
- 配置 Bean：HelloWorld.xml

新建 src/main/HelloWorld.java

```java
package main;

import org.springframework.context.support.ClassPathXmlApplicationContext;
public class HelloWorld {
    public static void main(String[]args) throws Exception{
        ClassPathXmlApplicationContext context =
                new ClassPathXmlApplicationContext(
                        "HelloWorld.xml");

        GreetingService greetingService = (GreetingService) context.getBean("greetingService");
        greetingService.sayGreeting();
    }
}
```

新建 src/main/GreetingService.java

```java
package main;

public interface GreetingService {
    void sayGreeting();
}
```

新建 src/main/GreetingServiceImpl.java

```java
package main;

public class GreetingServiceImpl implements GreetingService{
    private String greeting;
    public GreetingServiceImpl() {

    }
    public GreetingServiceImpl(String greeting) {
        this.greeting = greeting;
    }

    @Override
    public void sayGreeting() {
        System.out.println(greeting);
    }

    public void setGreeting(String greeting) {
        this.greeting = greeting;
    }
}
```

> Bean，我们通俗的来解释就是你创建的打算交给 Spring 进行管理，并且在使用的时候通过注入的方式直接申请的类。我们只需要按照某种方式，把我们的自己创建的类告诉 Spring，让他去接纳我们的类，并且进行管理和实例化对象。我们需要通过 XML 方式 , 在你的项目里创建 hello.xml 文件.

新建 src/HelloWorld.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="greetingService" class="main.GreetingServiceImpl">
        <property name="greeting" value="Hello World!"></property>
    </bean>
</beans>
```

最后右键 HelloWorld.java 运行代码,控制台输入 Hello World!

## spring 作用

我们通过 xml 文件，以某种方式在 Spring 中配置了我们的 Bean，Spring 负责管理和实 例化我们的对象。

```java
ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("HelloWorld.xml");
GreetingService greetingService = (GreetingService) context.getBean("greetingService");
greetingService.sayGreeting();
```

我们从 Spring 的 BeanFactory 中，获得我们的对象的代码。仿佛是我们找到了 Hello.xml 文件
然后，我们创建了一个对象并执行对象的 sayGreeting()。

```java
GreetingServiceImpl greetingService = new GreetingServiceImpl("Hello World!");
greetingService.sayGreeting();
```
