#   模拟实现new

需满足：

1.  绑定this
2.  新建一个对象
3.  将对象链接到原型
4.  返回新的对象

```
    /**
    * 因为new是关键字，所以不能直接覆盖。
    * 我们这边用create来模拟实现。
    */

    function create () {
    let obj = {}
    let Con = [].shift.call(arguments)
    // 链接原型，使得新建对象可以访问到构造函数原型上的属性
    obj.__proto__ = Con.prototype
    // 绑定this
    Con.apply(obj, arguments)
    return obj
    }
```
构造函数返回值有如下三种情况：

-   1、有 return ，返回一个对象，实例只能访问返回对象中的实例
-   2、没有 return ，即返回 undefined，实例只能访问到构造函数中的属性，和情况1完全相反。
-   3、返回 undefined 以外的基本类型，等于没有返回，实例只能访问到构造函数中的属性，和情况1完全相反。

综上，所以需要判断下返回的值是不是一个对象，如果是对象则返回这个对象，不然返回新创建的 obj对象。
```
    /**
    * 因为new是关键字，所以不能直接覆盖。
    * 我们这边用create来模拟实现。
    */

    function create () {
    let obj = {}
    let Con = [].shift.call(arguments)
    // 链接原型，使得新建对象可以访问到构造函数原型上的属性
    obj.__proto__ = Con.prototype
    // 绑定this
    let ret = Con.apply(obj, arguments)
    return ret instanceof Object ? ret : obj
    }
```
```
// 测试用例
    function Car(color) {
        this.color = color;
    }
    Car.prototype.start = function() {
        console.log(this.color + " car start");
    }

    var car = create(Car, "black");
    car.color;
    // black

    car.start();
    // black car start
```

#   模拟实现instanceof 
`instanceof` 运算符用来检测 `constructor.prototype` 是否存在于参数 object 的原型链上。
```
    function instanceof1 (left, right) {
        // 获取类型原型
        let prototype = right.prototype
        // 获取对象原型
        left = left.__proto__
        // 判断对象的类型是否等于类型的原型
        while (true) {
            if (left === null)
                return false
            if (left === prototype)
                return true
            left = left.__proto__
        }
    }
```