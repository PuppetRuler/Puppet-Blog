---
title: JS的重点梳理(简略)
description: 一点小小的对基础的回顾
prev:
  text: 'Node'
  link: '/Front_End/Notes/Node'
next:
  text: 'CSS'
  link: '/Front_End/Notes/CSS3'
tags:
  - 前端
  - JavaScript
  - 笔记
---

# JavaScript重点梳理

## 一、DOM操作

### 1.DOM对象

document对象

​    -document对象表示的是整个网页
​    -document对象的原型链
​        HTMLDocument - Document - Node - EventTarget - object.prototype - null
​    -凡是在原型链上存在的对象的属性和方法都可以通过Document去调用
​    -部分属性：
​      document.documentElement->html根元素
​      document.head->head元素
​      document.title->title元素
​      document.body->body元素
​      document.links->获取页面中所有的超链接
​      ...

### 2.元素节点

```js
/* 
    元素节点对象(element)
        -在网页中，每一个标签都是一个元素节点
        -如何获取元素节点对象？
            1.通过document对象来获取元素节点
            2.通过document对象来创建元素节点
        -通过document来获取已有的元素节点：
            document.getElementById()
                -根据id获取一个元素节点对象
            document.getElementsByClassName(
                -根据元素的class属性值获取一组元素节点对象
                -返回的是一个类数组对象
                -该方法返回的结果是一个实时更新的集合
                    当网页中新添加元素时，集合也会实时的刷新
            document.getElementsByTagName()
                -根据标签名获取一组元素节点对象
                -返回的结果是可以实时更新的集合
                - document.getElementsByTagName("*")获取页面中所有的元素
            document.getElementsByName()
                -根据name属性获取一组元素节点对象
                -返回一个实时更新的集合
                -主要用于表单项
            document.querySelectorAll()
                -根据选择器去页面中查询元素
                -会返回一个类数组（不会实时更新）
            document.querySelector()
                -根据选择器去页面中查询第一个符合条件的元素

        -创建一个元素节点
            document.createElement()
                -根据标签名创建一个元素节点对象
*/

const btn = document.getElementById("btn");

const spans = document.getElementsByClassName("s1");

const divs = document.getElementsByTagName("div");

const genderInput = document.getElementsByName("gender");

const divs2 = document.querySelectorAll("div")

const div = document.querySelector("div")

/* 
    div元素的原型链
        HTMLDivElement - HTMLElement - Element - Node -...

    通过元素节点对象获取其他节点的方法
        element.childNodes  获取当前元素的子节点(会包含空白的子节点)(不实用)
        element.children  获取当前元素的子元素
        element.firstElementChild  获取当前元素的第一个子元素
        element.lastElementChild  获取当前元素的最后一个子元素
        element.nextElementSibling  获取当前元素的下一个兄弟元素
        element.previousElementSibling  获取当前元素的前一个兄弟元素
        element.parentNode  获取当前元素的父节点
        element.tagName  获取当前元素的标签名

*/

const box1 = document.getElementById("box1");

const spans = box1.getElementsByTagName("span")

const cns = box1.childNodes

const children = box1.children
```



### 3.属性节点

```js
/* 
    属性节点(Attr)
        在DOM也是一个对象，通常不需要获取对象而是直接通过元素即可完成对其的各种操作
        -如何操作属性节点：
            方式一：
                读取：元素.属性名（注意，class属性需要使用className来读取）
                        读取一个布尔值时，会返回true或false
                修改：元素.属性名=属性值
            方式二：
                读取：元素.getAttribute(属性名)

                修改：元素.setAttribute(属性名，属性值)

                删除：元素.removeAttribute(属性名)
*/

const input = document.querySelector("[name=username]");

console.log(input.type)

input.setAttribute("value","孙悟空")
```

### 4.文本节点

```js
/* 
在DOM中，网页中所有的文本内容都是文本节点对象
    可以通过元素来获取其中的文本节点对象，但是我们通常不会这么做

    我们可以直接通过元素去修改其中的文本
        修改文本的三个属性
            element.textContent获取或修改元素中的文本内容
                -获取的是标签中的内容，不会考虑css样式

            element.innerText获取或修改元素中的文本内容
                -innerText获取内容时，会考虑css样式
                -通过innerText去读取CSS样试，会触发网页的重排（计算CSS样式）
                -当字符串中有标签时，会自动对标签进行转义
                -<li>=>&lt;li&gt;
            element.innerHTML获取或修改元素中的html代码
                -可以直接向元素中添加html代码
                -innerHTML插入内容时，有被xss注入的风险
*/

const box1 = document.getElementById("box1")

// const text = box1.firstChild
console.log(box1.textContent);
```

### 5.JS的执行顺序

网页是自上向下加载的，如果将s代码编写到网页的上边，JS代码在执行时，网页还没有加载完毕，这时会出现无法获取到DOM对象的情况(ps:经常出错)

如何解决这个问题：
    1.将script标签编写到body的最后(优先级最高)(*****)
    2.将代码编写到window.onload的回调函数中

```js
window.onload function (){
    const btn = document.getElementById("btn")
    console.log(btn)
}
```

​    3.将代码编写到document.对象的DOMContentLoaded的回调函数中(执行时机更早)

```js
document.addEventListener("DOMContentLoaded",function() {
    const btn = document.getElementById("btn")
    console.log(btn)
}
```

​    4.将代码编写到外部的js文件中，然后以defer的形式进行引入(执行时机更早，早于DOMContentLoaded)(*****)

6.节点的复制

使用cloneNode()方法对节点进行复制时，它会复制节点的所有特点包括各种属性

- 这个方法默认只会复制当前节点，而不会复制节点的子节点
- 可以传递一个true作为参数，这样该方法也会将元素的子节点一起复制

### 6.事件的委派

```js
/* 
    我希望：
        只绑定一次事件,既可以让所有的超链接，包括当前的和未来新建的超链接都具有这些事件

    思路：
        可以将事件统一绑定给document,这样点击超链接时由于事件的冒泡，
            会导致document上的点击事件被触发，这样只绑定饮，所有的超链接都会具有这些事件

    委派就是将本该绑定给多个元素的事件，统一绑定给document,这样可以降低代码复杂度方便维护
*/
const btn = document.querySelector(".btn");
const list = document.querySelector("#list");
//    const links = document.querySelectorAll("ul a");  //无法实时获取到数据
const links = list.getElementsByTagName("a")  //可以实时获取到数据

//点击按钮后，在ul中新添加li
btn.addEventListener("click", function () {
    list.insertAdjacentHTML("beforeend", '<li><a href="javascript:;">新超链接</a></li>');
})

document.addEventListener("click",function(event){
    if([...links].includes(event.target)){
        alert(event.target.textContent)
    }
})
```

### 7.事件的捕获

```js
/* 
    事件的传播机制：
        -在DOM中，事件的传播可以分为三个阶段：
            1.事件的捕获(由祖先元素向目标元素进行事件的捕获)(由外向内)
            2.目标阶段（触发事件的对象）
            3.冒泡阶段(由目标元素向祖先元素进行事件的冒泡)(由内向外，默认)

        -事件的捕获，指事件从外向内的传导，
            当前元素触发事件以后，会先从当前元素最大的祖先元素开始向当前元素进行事件的捕获

        -如果希望在捕获阶段触发事件，可以将addEventListener的第三个参数设置为true
            一般情况下我们不希望事件在捕获阶段触发，所有通常都不需要设置第三个参数
*/
const box1 = document.getElementById("box1")
const box2 = document.getElementById("box2")
const box3 = document.getElementById("box3")

box1.addEventListener("click",function(event){
    alert("1"+event.eventPhase)  //eventPhase表示事件触发的阶段
    //1捕获阶段  2目标阶段  3冒泡阶段
})

box2.addEventListener("click",function(event){
    alert("2"+event.eventPhase)
})

box3.addEventListener("click",function(event){
    alert("3"+event.eventPhase)
})
```

### 8.BOM

- BOM
     - 浏览器对象模型
     - BOM为我们提供了一组对象，通过这组对象可以完成对浏览器的各种操作
     - BOM对象：
         - Window  ---  代表浏览器窗口（全局对象)
         - Navigator  ---  浏览器的对象(可以用来识别浏览器)
         - Location  ---  浏览器的地址栏信息
         - History  ---  浏览器的历史记录(控制浏览器前进后退)
         - Screen  ---  屏幕的信息
         - BOM对象都是作为window对象的属性保存的，所以可以直接在JS中访问这些对象

- Navigator  ---  浏览器的对象（可以用来识别浏览器)
  - userAgent返回一个用来描述浏览器信息的字符串

### 9.定时器

通过定时器，可以使代码在指定时间后执行

- 设置定时器的方式有两种：
  - setTimeout()
    - 参数：
      	1.回调函数（要执行的代码）
          2.间隔的时间（毫秒）
          3.关闭定时器:clearTimeout()
  - setInterval()（每间隔一段时间代码就会执行一次)
              - 参数：
                    1.回调函数（要执行的代码）
                    2.间隔的时间（毫秒）

## 二、JQuery(光学过,没用过)

### 1.引入Jquery

src="https://code.jquery.com/jquery-3.7.0.js"

### 2.JQuery核心

引入jQuery库，其实就是向网页中添加了一个新的函数$(jQuery)
- $ 是jQuery中的核心函数，jQuery的所有功能都是通过该函数来进行的
- 两种作用
    1. 将它作为工具类使用
        - 在核心函数中jQuery为我们提供了多个工具方法
    2. 将它作为函数使用
        - 将一个函数作为$的参数
            - 这个函数会在文档加载完毕之后执行
            - 相当于：
                document.addEventListener("DOMContentLoaded", function(){})
        - 将选择器字符串作为参数
            - jQuery自动去网页中查找元素
            - 作用类似于 document.querySelectorAll("...")
            - 注意：
                通过jQuery核心函数查询到的结果并不是原生的DOM对象，
                    而是一个经过jQuery包装过的新的对象，这个对象我们称其为jQuery对象
                    jQuery对象中为我们提供了很多新的方法，方便我们做各种DOM操作
                        但是jQuery对象不能直接调用原生DOM对象的方法
                        通过我们为jQuery对象命名时，会使用$开头，加以区分
        - 将DOM对象作为参数
            - 可以将DOM对象转换为jQuery对象，从而使用jQuery对象的方法
        - 将html代码作为参数
            - 会根据html代码来创建元素（jQuery对象）

### 3.示例

```js
$(function(){
    $(document).on("click","a",function(ele){
        //取消默认行为
        ele.preventDefault

        // alert(this) //委托时jq将this设置为了触发事件的对象

        // var tr = this.parentNode.parentNode
        var $tr = $(this).parents("tr")  //在当前元素的祖先中寻找tr

        if(confirm(`确认要删除【${$tr.children()[0].textContent}】`)){
            $tr.remove()
        }
    })

    //添加
    $("#btn").on("click",function(){
        //获取用户输入内容
        var name = $("#name").val().trim()  //去掉里面的空格
        var email = $("#email").val().trim()
        var salary = $("#salary").val().trim()

        //创建一个tr
        var $tr = $("<tr><td></td><td></td><td></td><td><a href='javascript:;'>删除</a></td></tr>")

        // 添加内容
        var $tds = $tr.find("td")
        $tds.eq(0).text(name)
        $tds.eq(1).text(email)
        $tds.eq(2).text(salary)

        $("tbody").append($tr)

    })
})
```

