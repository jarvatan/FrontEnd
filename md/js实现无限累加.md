#   javascript 函数 add(1)(2)(3)(4)实现无限极累加 —— 一步一步原理解析
>   用js 实现一个无限极累加的函数， 形如:
>   add(1) //=> 1; 
>   add(1)(2)  //=> 2; 
>   add(1)(2)(3) //=>  6; 
>   add(1)(2)(3)(4) //=> 10; 
>   以此类推...

1. 我们要了解一个知识点： **当我们直接对函数使用 `alert()` 或 `console.log()` 时，函数的 `toString()` 方法会被调用。**
```
    function s(a) {
		return a+1
	}
	console.log(s)
    // undefined
```
2. 我们现在对函数s重写TOString。
```
    function s(a) {
		return a+1
	}
    s.toString = function() {
        return 1
    }
	console.log(s)
    // f 1
    typeof(s)
    // "function"
```
3.  我们现在将函数s包裹起来，返回一个函数，此时形成了一个闭包。
```
    function add(a) {
        function s(a) {
		    return a+1
        }
        s.toString = function() {
            return a
        }
        return s
    }
    console.log(add(2)) // f 2
```
4.  稍作修改
```
    function add(a) {
        function s(b) {
            a = a + b
		    return s
        }
        s.toString = function() {
            return a
        }
        return s
    }
    console.log(add(1)(2)(3)(4)) // f 10
``` 
收工~