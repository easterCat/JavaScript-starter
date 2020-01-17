# java 排序算法

![](https://raw.githubusercontent.com/easterCat/img-package/master/img/sort.png)

## 冒泡排序

````
// 冒泡排序
public class BubbleSort {
    /**
     * N个数字要排序完成,总共进行N-1趟排序,每i趟的排序次数为(N-i)次,所以可以用双重循环语句,外层控制循环多少趟,内层控制每一趟的循环次数.
     *
     * @param args
     */
    public static void main(String[] args) {
        int arr[] = {26, 15, 29, 66, 99, 88, 36, 77, 111, 1, 6, 8, 8};
        int length = arr.length;

        for (int i = 0; i < length; i++) {
            // 内层循环控制每一趟排序多少次,减去i避免多余的渲染
            for (int j = 0; j < length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // 把小的值交换到前面
                    int tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
                }
            }

            // 列举每次排序的数据
            for (int a = 0; a < length; a++) {
                System.out.print(arr[a] + "\t");
            }
            System.out.println("");
        }

        System.out.println("最终排序结果：");
        for (int a = 0; a < length; a++) {
            System.out.print(arr[a] + "\t");
        }
    }
}

```

## 选择排序

执行顺序

- 给定的一组总记录,进过一轮比较后得到最小的记录
- 将该记录的位置与总记录首位进行对调
- 接着对不包括最小的记录之外的记录进行新一轮的比较,获取第二小的记录
- 然后将第二小的记录与总记录的第二位进行对调
- 重复进行比较=>对调过程
- ......
- 可以进行比较的数据只剩下最后一个,停止排序

```
// 选择排序
// 执行顺序
//
//        - 给定的一组总记录,进过一轮比较后得到最小的记录
//        - 将该记录的位置与总记录首位进行对调
//        - 接着对不包括最小的记录之外的记录进行新一轮的比较,获取第二小的记录
//        - 然后将第二小的记录与总记录的第二位进行对调
//        - 重复进行比较=>对调过程
//        - ......
//        - 可以进行比较的数据只剩下最后一个,停止排序
public class QuickSort {
    public static void main(String[] args) {
        int[] arr = {20, 60, 51, 81, 285, 12, 165, 51, 81, 318, 186, 9, 70};
        for (int a : arr) {
            System.out.print(a + " ");
        }

        System.out.println("\n" + "---------------从小到大---------------");

        arr = toSmall(arr);
        for (int a : arr) {
            System.out.print(a + " ");
        }

        System.out.println("\n" + "---------------从大到小---------------");

        arr = toBig(arr);
        for (int a : arr) {
            System.out.print(a + " ");
        }
    }

    public static int[] toSmall(int[] arr) {
        int length = arr.length;
        for (int i = 0; i < length; i++) {
            for (int j = i + 1; j < length; j++) {
                if (arr[i] > arr[j]) {
                    int center = arr[j];
                    arr[j] = arr[i];
                    arr[i] = center;
                }
            }
        }
        return arr;
    }

    public static int[] toBig(int[] arr) {
        int length = arr.length;
        for (int i = 0; i < length - 1; i++) {
            for (int j = i + 1; j < length; j++) {
                if (arr[i] < arr[j]) {
                    int center = arr[j];
                    arr[j] = arr[i];
                    arr[i] = center;
                }
            }
        }
        return arr;
    }
}
```

## 快速排序

执行顺序

- 先从数列中取出一个数作为基准数
- 分区过程,将比这个数大的数全放到它的右边,小于或等于它的数全放到它的左边
- 再对左右区间重复第二步,直到各区间只有一个数

```
// 快速排序
// 挖坑填数+分治法
// 执行顺序
//
//        - 先从数列中取出一个数作为基准数
//        - 分区过程,将比这个数大的数全放到它的右边,小于或等于它的数全放到它的左边
//        - 再对左右区间重复第二步,直到各区间只有一个数
public class main {
    public static void main(String[] args) {
        int[] arr = {20, 60, 51, 81, 285, 12, 165, 51, 81, 318, 186, 9, 70};

        System.out.println("\n" + "---------------快速排序---------------");

        quickSort(arr, 0, arr.length - 1);

        for (int a : arr) {
            System.out.print(a + " ");
        }
    }

    public static void quickSort(int s[], int l, int r) {
        if (l < r) {
            //Swap(s[l], s[(l + r) / 2]); //将中间的这个数和第一个数交换 参见注1
            int i = l, j = r, x = s[l];
            while (i < j) {
                // 从右向左找第一个小于x的数
                while (i < j && s[j] >= x) {
                    j--;
                }
                if (i < j) {
                    s[i++] = s[j];
                }
                // 从左向右找第一个大于等于x的数
                while (i < j && s[i] < x) {
                    i++;
                }
                if (i < j) {
                    s[j--] = s[i];
                }
            }
            s[i] = x;
            quickSort(s, l, i - 1); // 递归调用
            quickSort(s, i + 1, r);
        }
    }
}
```

## doc

- [avaScript 数据结构与算法之美 - 强烈推荐 GitHub 上值得前端学习的数据结构与算法项目](https://github.com/biaochenxuying/blog/issues/43)
````
