## Bean

Bean 是一种对象，我们使用 Spring 容器来控制其生命周期，进行对象的创建和分发。Spring 提供了多种容器，并分为两种：BeanFactory 和 应用上下文。

```java
ApplicationContext context = new ClassPathXmlApplicationContext("spring.xml");
     OneManBand oneManBand = (OneManBand) context.getBean("onemanband");
```

ApplicationContext 提供三种经常使用的实现方式;

1. ClassPathXmlApplicationContext : 从类路径中 XML 文件载入上下文定义信息。
2. FileSystemXmlApplicationContext : 从文件系统中 XML 文件载入上下文定义信息，所以需要完整路径。
3. XmlWebApplicationContext：从 Web 系统中 Xml 载入上下文定义信息。

## Setter 注入和构造注入

Setter 注入，顾名思义就是使用 Bean 中的属性设置器来注入对象中的属性，那么构造注入也就是利用含参构造函数来注入属性。Setter 注入的行为可以理解为我们使用无参构造函数来构造对象，然后调用属性设置器注入对象。同理，构造注入的行为可以理解为，我们利用含参构造函数直接构造对象。

#### Setter 注入

```
<bean id="duke" class="Juggler">
   <property name="beanBags" value="5"></property>
</bean>
```

#### 构造注入

```
<bean id="duke" class="Juggler">
   <constructor-arg value="15"></constructor-arg>
</bean>
```

#### Bean 注入对象属性

```xml
<bean id="sonnet29" class="Sonnet29"></bean>
<bean id="duke" class="PoeticJuggler">
        <constructor-arg value="15"></constructor-arg>
        <constructor-arg ref="sonnet29"></constructor-arg>
</bean>
```

#### 内部 Bean

```xml
<bean id="sonnet29" class="Sonnet29"></bean>
<bean id="duke" class="PoeticJuggler">
        <constructor-arg value="15"></constructor-arg>
        <constructor-arg>
            <bean class="Sonnet29"></bean>
        </constructor-arg>
</bean>
```

#### 装配集合

```xml

<bean id="guitar" class="Guitar" scope="singleton"></bean>
    <bean id="piano" class="Piano" scope="singleton"></bean>
    <bean id="saxophone" class="Saxophone" scope="singleton"></bean>

    <bean id="onemanband" class="OneManBand">
        <property name="instruments">
            <set>
                <ref bean="guitar"></ref>
                <ref bean="piano"></ref>
                <ref bean="saxophone"></ref>
            </set>
        </property>
</bean>
```

#### 属性是空值

```xml
<property name="somenull"><null/></property>
```
