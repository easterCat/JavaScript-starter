# List

## List

在集合类中，List 是最基础的一种集合：它是一种有序链表。

List 的行为和数组几乎完全相同：List 内部按照放入元素的先后顺序存放，每个元素都可以通过索引确定自己的位置，List 的索引和数组一样，从 0 开始。

数组和 List 类似，也是有序结构，如果我们使用数组，在添加和删除元素的时候，会非常不方便。

我们考察 List 接口，可以看到几个主要的接口方法：

- 在末尾添加一个元素：void add\(E e\)
- 在指定索引添加一个元素：void add\(int index, E e\)
- 删除指定索引的元素：int remove\(int index\)
- 删除某个元素：int remove\(Object e\)
- 获取指定索引的元素：E get\(int index\)
- 获取链表大小（包含元素的个数）：int size\(\)

## List 的特点

使用 List 时，我们要关注 List 接口的规范。List 接口允许我们添加重复的元素，即 List 内部的元素可以重复,List 还允许添加 null.

```text
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("aaaa");
        list.add("cccc");
        list.add("aaaa"); // 允许重复添加元素
        list.add("null"); // List还允许添加null
        System.out.println(list.size());
        System.out.println(list.get(3));
    }
}
```

## 创建/遍历 List

除了使用 ArrayList 和 LinkedList，我们还可以通过 List 接口提供的 of\(\)方法，根据给定元素快速创建 List,但是 List.of\(\)方法不接受 null 值，如果传入 null，会抛出 NullPointerException 异常。

创建

```text
List<Integer> list = List.of(1, 2, 5);
```

遍历的两种方法

第一种方式并不推荐，一是代码复杂，二是因为 get\(int\)方法只有 ArrayList 的实现是高效的，换成 LinkedList 后，索引越大，访问速度越慢。

所以我们要始终坚持使用迭代器 Iterator 来访问 List。Iterator 本身也是一个对象，但它是由 List 的实例调用 iterator\(\)方法的时候创建的。Iterator 对象知道如何遍历一个 List，并且不同的 List 类型，返回的 Iterator 对象实现也是不同的，但总是具有最高的访问效率。

Iterator 对象有两个方法：boolean hasNext\(\)判断是否有下一个元素，E next\(\)返回下一个元素。

通过 Iterator 遍历 List 永远是最高效的方式。并且，由于 Iterator 遍历是如此常用，所以，Java 的 for each 循环本身就可以帮我们使用 Iterator 遍历。

```text
import java.util.Iterator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Method1(); // for循环根据索引配合get(int)方法遍历
        Method2(); // 迭代器Iterator
        Method3();
    }

    public static void Method1() {
        List<String> list = List.of("asdasd", "aaaaaa", "bbbbbb"); // 创建list
        int size = list.size();
        for (int i = 0; i < size; i++) {
            String s = list.get(i);
            System.out.println(s);
        }
    }

    public static void Method2() {
        List<String> list = List.of("1111111", "22222222", "33333333");
        for (Iterator<String> it = list.iterator(); it.hasNext(); ) {
            String s = it.next();
            System.out.println(s);
        }
    }

    public static void Method3() {
        List<String> list = List.of("阿达硕大的所", "嘎嘎嘎嘎嘎", "发");
        for (String s : list) {
            System.out.println(s);
        }
    }
}
```

实际上，只要实现了 Iterable 接口的集合类都可以直接用 for each 循环来遍历，Java 编译器本身并不知道如何遍历集合对象，但它会自动把 for each 循环变成 Iterator 的调用，原因就在于 Iterable 接口定义了一个 Iterator iterator\(\)方法，强迫集合类必须返回一个 Iterator 实例

## List 和 Array 转换

```text
import java.util.Iterator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Method1();
        Method2();
        Method3();
        Method4();
    }

    // 第一种是调用toArray()方法直接返回一个Object[]数组：
    // 这种方法会丢失类型信息，所以实际应用很少
    public static void Method1() {
        List<String> list = List.of("asdasd", "aaaaaa", "bbbbbb"); // 创建list
        Object[] array = list.toArray();
        for (Object s : array) {
            System.out.println(s);
        }
    }

    // 第二种方式是给toArray(T[])传入一个类型相同的Array，List内部自动把元素复制到传入的Array中：
    public static void Method2() {
        List<Integer> list = List.of(12, 33, 55);
        Integer[] array = list.toArray(new Integer[3]);
        for (Integer n : array) {
            System.out.println(n);
        }
    }

    // 注意到这个toArray(T[])方法的泛型参数<T>并不是List接口定义的泛型参数<E>，所以，我们实际上可以传入其他类型的数组，例如我们传入Number类型的数组，返回的仍然是Number类型：
    public static void Method3() {
        List<Integer> list = List.of(12, 34, 56);
        Number[] array = list.toArray(new Number[3]);
        for (Number n : array) {
            System.out.println(n);
        }
    }

    // Array变为List就简单多了，通过List.of(T...)方法
    public static void Method4() {
        Integer[] array = {1, 2, 3};
        List<Integer> list = List.of(array);

        for (Number value : list) {
            System.out.println(value);
        }
    }
}
```

## 判断 list 的元素存在和下标

```text
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Method1();
    }

    // boolean contains(Object o)方法来判断List是否包含某个指定元素
    // int indexOf(Object o)方法可以返回某个元素的索引，如果元素不存在，就返回-1
    public static void Method1() {
        List<String> list = List.of("11111", "22222", "33333"); // 创建list
        System.out.println(list.contains("11111"));
        System.out.println(list.contains("444"));
        System.out.println(list.indexOf("22222"));
        System.out.println(list.indexOf("555"));
    }
}
```
