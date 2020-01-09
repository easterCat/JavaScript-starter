## 累加

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>242.有效的字母异位数</title>
  </head>
  <body></body>
  <script>
    // 累计
    var isAnagram = function(s, t) {
      if (s.length !== t.length) return false;
      let obj = {};
      let len = s.length;
      let result = true;
      for (let i = 0; i < len; i++) {
        obj[s.charAt(i)] ? obj[s.charAt(i)]++ : (obj[s.charAt(i)] = 1);
      }
      for (let i = 0; i < len; i++) {
        if (!obj[t.charAt(i)]) {
          result = false;
          break;
        }
        obj[t.charAt(i)]--;
        if (obj[t.charAt(i)] < 0) {
          result = false;
          break;
        }
      }
      return result ? Object.values(obj).every(i => i >= 0) : result;
    };
    console.log(isAnagram("anagram", "nagaram"));
  </script>
</html>
```

## 排序

```
    // 数组排序
    var isAnagram = function(s, t) {
      if (s.length !== t.length) return false;
      s = s
        .split("")
        .sort()
        .join();
      t = t
        .split("")
        .sort()
        .join();

      return s === t;
    };
```

## 哈希

```
 // 哈希
    var isAnagram = function(s, t) {
      if (s.length !== t.length) return false;

      for (let i = 0; i < s.length; i++) {
        obj[s.charAt(i)] ? obj[s.charAt(i)]++ : (obj[s.charAt(i)] = 1);
        obj[t.charAt(i)] ? obj[t.charAt(i)]-- : (obj[t.charAt(i)] = -1);
      }
      return Object.valyes(obj).every(i => i === 0);
    };
```
