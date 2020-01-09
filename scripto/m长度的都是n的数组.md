```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>m长度的都是n的数组</title>
  </head>
  <body></body>
  <script>
    var a = initArray(10, 1);
    console.log(a);
    function initArray(m, n) {
      var aa = [];
      (function loop(m, n) {
        if (m > 0) {
          aa[m - 1] = loop(m - 1, n);
        }
        return n;
      })(m, n);
      return aa;
    }
  </script>
</html>
```
