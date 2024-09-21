---
title: CSS3笔记
description: CSS2与CSS3的基础笔记
tags:
  - 前端
  - CSS
  - 笔记
---

# CSS 笔记

## 一、CSS 的编写位置

### 1.行内样式

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>行内样式</title>
</head>
<body>
    <!-- 不推荐行内样式，重复量大，不可以复用 -->
    <h1 style="color: red;font-size: 60px;">学习最简单的CSS</h1>
</body>
</html>

### 2.内部样式

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>内部样式</title>
    <!-- 优势：
    结构清晰，可以复用
    缺点：
    样式与结构不完全分离，其他HTML文档无法复用 -->
    <style>
      h1 {
        color: red;
        font-size: 60px;
      }
      h2{
        color: green;
        font-size: 80px;

      }
      img{
        width: 200px;
      }
    </style>
  </head>
  <body>
    <h1>学习最简单的CSS</h1>
    <h2>看看效果</h2>
    <img src="../images/小姐姐.gif" alt="美女">
  </body>
</html>

```

### 3.外部样式

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>外部样式</title>
    <link rel="stylesheet" href="./position3.css">
</head>
<body>
    <h1>学习最简单的CSS</h1>
    <h2>看看效果</h2>
    <img src="../images/小姐姐.gif" alt="美女">
</body>
</html>

```css
/* 结构与样式完全分离，所有HTML文件都可以复用，结构清晰，建立的缓存可以提升读取速度 */
h1 {
    color: red;
    font-size: 60px;
}
h2{
color: green;
font-size: 80px;

}
img{
width: 200px;
}
```

## 二、样式表的优先级

规则：行内样式>内部样式=外部样式,后会覆盖前

## 三、语法规范

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>语法规范</title>
    <style>
        /* 给文件添加样式 */
      h1 {    /* 选择器 */
        /* 声明块 */
        color: blue;
        font-size: 40px;
      }
    </style>
  </head>
  <body>
    <h1>学习前端</h1>
  </body>
</html>

## 四、代码风格

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS代码风格</title>
    <!-- 展开风格 -->
    <style>
      h1 {
        color: blue;
        font-size: 40px;
      }
    </style>
    <!-- 紧凑风格 -->
    <!-- <style>h1 {color: blue;font-size: 40px;}</style> -->
</head>
<body>
    <h1>学习CSS</h1>
</body>
</html>

## 五、CSS基本选择器

### 1.通配选择器

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>通配选择器</title>
    <style>
      * {
        color: blue;
        font-size: 40px;
      }
    </style>
  </head>
  <body>
    <h1>欢迎来到土味官网，土的味道我知道</h1>
    <br />
    <h2>土味情话</h2>
    <h3>作者：优秀的网友们</h3>
    <p>万水千山总是情，爱我多点行不行！</p>
    <p>草莓、蓝莓、蔓越莓，今天你想我了没？</p>
    <p>我心里给你留了一块地，我的死心塌地！</p>
  </body>
</html>

### 2.元素选择器

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>元素选择器</title>
    <style>
      h2 {
        color: chocolate;
      }
      h3 {
        color: green;
      }
      h1 {
        font-size: 50px;
      }
      p {
        color: red;
      }
    </style>
  </head>
  <body>
    <h1>欢迎来到土味官网，土的味道我知道</h1>
    <br />
    <h2>土味情话</h2>
    <h3>作者：优秀的网友们</h3>
    <p>万水千山总是情，爱我多点行不行！</p>
    <p>草莓、蓝莓、蔓越莓，今天你想我了没？</p>
    <p>我心里给你留了一块地，我的死心塌地！</p>
    <br />
    <h2>反杀土味情话</h2>
    <h3>作者：更优秀的网友们</h3>
    <p>一寸光阴一寸金，劝你死了这条心！</p>
    <p>西瓜、南瓜、哈密瓜，把你打成大傻瓜！</p>
    <p>我心里只有一块地，我的玛莎拉蒂！</p>
  </body>
</html>

### 3.类选择器

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>类选择器</title>
    <style>
        /*选中页面中所有类名为speak的元素*/
        .speak {
            color: red;
        }
        /*选中页面中所有类名为answer的元素*/
        .answer {
            color: green;
        }
        .big {
            font-size: 60px;
        }
    </style>
  </head>
  <body>
    <h1>欢迎来到土味官网，士的味道我知道</h1>
    <br />
    <h2>土味情话</h2>
    <h3>作者：优秀的网友们</h3>
    <p class="speak big">我对你说：万水千山总是情，爱我多点行不行！</p>
    <p class="speak">我对你说：草莓、蓝莓、蔓越莓，今天你想我了没？</p>
    <p class="speak">我对你说：我心里给你留了一块地，我的死心塌地！</p>
    <br />
    <h2>反杀土味情话</h2>
    <h3>作者：更优秀的网友们</h3>
    <p class="answer">你回答我：一寸光阴一寸金，劝你死了这条心！</p>
    <p class="answer">你回答我：西瓜、南瓜、哈密瓜，把你打成大傻瓜！</p>
    <p class="answer">你回答我：我心里只有一块地，我的玛莎拉蒂！</p>
  </body>
</html>

### 4.id选择器

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>id选择器</title>
    <style>
        #earthy {
            color: red;
        }
        #turn-earthy {
            color: green;
        }
        .turn {
            font-size: 40px;
        }
    </style>
</head>
<body>
    <h1>欢迎来到土味官网，土的味道我知道</h1>
    <br />
    <h2 id="earthy">土味情话</h2>
    <h3>作者：优秀的网友们</h3>
    <p>万水千山总是情，爱我多点行不行！</p>
    <p>草莓、蓝莓、蔓越莓，今天你想我了没？</p>
    <p>我心里给你留了一块地，我的死心塌地！</p>
    <br />
    <h2 id="turn-earthy" class="turn">反杀土味情话</h2>
    <h3>作者：更优秀的网友们</h3>
    <p>一寸光阴一寸金，劝你死了这条心！</p>
    <p>西瓜、南瓜、哈密瓜，把你打成大傻瓜！</p>
    <p>我心里只有一块地，我的玛莎拉蒂！</p>
</body>
</html>

## 六、CSS复合选择器

### 1.交集选择器

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>交集选择器</title>
    <style>
      .rich {
        color: gold;
      }
      .beauty {
        color: red;
      }
      p.beauty {
        color: green;
      }
      .rich.beauty {
        color: orange;
      }
    </style>
  </head>
  <body>
    <h2 class="rich">土豪张三</h2>
    <h2 class="beauty">明星李四</h2>
    <h2 class="rich beauty">土豪明星王五</h2>
    <hr />
    <p class="beauty">小狗旺财</p>
    <p class="beauty">小猪佩奇</p>
  </body>
</html>

### 2.并集选择器

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>并集选择器</title>
    <style>
      .rich {
        color: gold;
      }
      .beauty {
        color: red;
      }
      .dog {
        color: blue;
      }
      .pig {
        color: green;
      }
      #suxi,
      .rich,
      .beauty,
      .dog,
      .pig {
        font-size: 40px;
        background-color: gray;
        width: 180px;
      }
    </style>
  </head>
  <body>
    <h2 class="rich">土豪张三</h2>
    <h2 class="beauty">明星李四</h2>
    <h2>破产王五（不加任何样式）</h2>
    <hr />
    <p class="dog">小狗旺财</p>
    <p class="pig">小猪佩奇</p>
    <p id="suxi">小羊苏西</p>
  </body>
</html>
<!-- 注意：
1.并集选择器，我们一般竖着写。
2.任何形式的选择器，都可以作为并集选择器的一部分。
3.并集选择器，通常用于集体声明，可以缩小样式表体积。 -->

### 3.后代选择器

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=l.0" />
    <title>后代选择器</title>
    <style>
      ul li {
        color: red;
      }
      ol li {
        color: green;
      }
      ul li a {
        color: orange;
      }
      ol li a {
        color: gray;
      }
      .subject li.front-end {
        color: blue;
      }
      .subject div.front-end {
        color: chocolate;
      }
    </style>
  </head>
  <body>
    <ul>
      <li>抽烟</li>
      <li>喝酒</li>
      <li>
        <a href="#">烫头</a>
      </li>
    </ul>
    <hr />
    <ol>
      <li>张三</li>
      <li>李四</li>
      <li>
        <a href="#">王五</a>
      </li>
    </ol>
    <hr />
    <ol class="subject">
      <li class="front-end">前端</li>
      <div class="front-end">学科介绍：学好前端，挂帅杨帆！</div>
      <li>Java</li>
      <li>大数据</li>
      <li>UI</li>
    </ol>
  </body>
</html>

### 4.子代选择器

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>子代选择器</title>
    <style>
      div > a {
        color: red;
      }
      div > p > a {
        color: skyblue;
      }
      .foot > a {
        color: chocolate;
      }
    </style>
  </head>
  <body>
    <div>
      <a href="#">张三</a>
      <a href="#">李四</a>
      <a href="#">王五</a>
      <p>
        <a href="#">赵六</a>
      </p>
      <div class="foot">
        <a href="#">孙七</a>
      </div>
    </div>
  </body>
</html>

### 5.兄弟选择器

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>兄弟选择器</title>
    <style>
        /* 选中div后紧紧相邻的兄弟p元素（睡在我下铺的兄弟）——相邻兄弟选择器 */
        /* div+p {
            color: red;
        } */
        /* 选中div后所有的兄弟p元素（睡在我下铺的所有兄弟）——通用兄弟选择器 */
        div~p {
            color: red;
        }
        li+li {
            color: chocolate;
        }
    </style>
  </head>
  <body>
    <div>尚硅谷</div>
    <p>前端</p>
    <p>Java</p>
    <p>大数据</p>
    <p>UI</p>
    <ol>
        <li>主页</li>
        <li>秒杀</li>
        <li>订单</li>
        <li>我的</li>
    </ol>
  </body>
</html>

### 6.属性选择器

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>属性选择器</title>
    <style>
        /* 第一种写法：选中具有title属性的元素 */
        /* [title] {
            color: red;
        } */
        /* 第二种写法：选中具有title属性，且属性值为atguigu1的元素 */
        /* [title="atguigu1"] {
            color: blue;
        } */
        /* 第三种写法：选中具有tit1e属性，且属性值以字母a开头的元素 */
        /* [title^="a"] {
            color: blue;
        } */
        /* 第四种写法：选中具有tit1e属性，且属性值以字母u结尾的元素 */
        /* [title$="4"] {
            color: blue;
        } */
        /* 第五种写法：选中具有title属性，且属性值包含字母u的元素 */
        [title*="u"] {
            color: blue;
        }
    </style>
  </head>
  <body>
    <div title="atguigu1">尚硅谷1</div>
    <div title="atguigu2">尚硅谷2</div>
    <div title="guigu3">尚硅谷3</div>
    <div title="guigu4">尚硅谷4</div>
  </body>
</html>

### 7.伪类选择器_概念

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>伪类选择器_概念</title>
    <style>
      /* 什么是伪类？ - 很像类，但不是类，是元素特殊状态的一种描述 */
      /* 选中的是没有访问过的a元素 */
      a:link {
        color: orange;
      }
      /* 选中的是访问过的a元素 */
      a.visited {
        color: gray;
      }
    </style>
  </head>
  <body>
    <a href="https://www.baidu.com">去百度</a>
    <a href="https://www.jd.com">去京东</a>
  </body>
</html>

### 8.伪类选择器_动态伪类

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>伪类选择器_动态伪类</title>
    <style>
      /* 选中的是没有访问过的a元素 */
      a:link {
        color: orange;
      }
      /* 选中的是访问过的a元素 */
      a:visited {
        color: chocolate;
      }
      /* 选中的是鼠标悬浮状态的a元素 */
      a:hover {
        color: skyblue;
      }
      /* 选中的是激活状态的a元素 */
      a:active {
        color: pink;
      }
      /* 选中的是鼠标悬浮的span元素 */
      span:hover {
        color: brown;
      }
      /* 选中的是激活的span元素 */
      span:active {
        color: pink;
        font-size: 15px;
      }
      /* focus：获取焦点的元素。表单类元素才能使用：focus伪类。 */
      input:focus,select:focus {
        color: red;
        background-color: grey;
      }
    </style>
  </head>
  <body>
    <a href="https://www.baidu.com">去百度</a>
    <a href="https://www.jd.com">去京东</a>
    <span>学习前端</span>
    <br>
    <input type="text"><br>
    <input type="text"><br>
    <input type="text"><br>
    <select name="chengshi">
        <option value="beijing">北京</option>
        <option value="shanghai">上海</option>
        <option value="guangzhou">广州</option>
    </select>
  </body>
</html>

### 9.伪类选择器_结构伪类

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>伪类选择器_结构伪类_3</title>
    <style>
      /* 选中div中倒数第n个的儿子p元素（按照所有兄弟） - 看结构1 */
      /* div p:nth-last-child(3) {
        color: red;
      } */

      /* 选申div申倒数第n个的儿子p元素（按照所有同类型的兄弟） - 看结构1 */
      /* div p:nth-last-of-type(2) {
        color: red;
      } */

      /* 选中的是没有兄弟的span元素 - 看结构2 */
      /* span:only-child {
        color: red;
      } */

      /* 选中的是没有同类型兄弟的span元素 - 看结构2 */
      /* span:only-of-type {
        color: red;
      } */

      /* 选中的是HTML根元素 */
      /* :root {
        background-color: gray;
      } */

      /* 选中的是没有内容的div元素 */
      div:empty {
        width: 100px;
        height: 100px;
        background-color: red;
      }

    </style>
  </head>
  <body>
    <!-- 结构1 -->
    <!-- <div>
      <span>测试1</span>
      <p>张三：98分</p>
      <p>李四：88分</p>
      <p>王五：78分</p>
      <p>赵六：68分</p>
      <p>孙七：58分</p>
      <p>老八：48分</p>
      <span>测试2</span>
    </div> -->

    <!-- 结构2 -->
    <!-- <div>
        <span>测试1</span>
    </div>
    <div>
      <span>测试2</span>
      <p>张三：98分</p>
      <p>李四：88分</p>
      <p>王五：78分</p>
      <p>赵六：68分</p>
      <p>孙七：58分</p>
      <p>老八：48分</p>
    </div> -->
    
    <!-- 结构3 -->
    <div></div>
  </body>
</html>

```

### 10.伪类选择器_否定伪类

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>伪类选择器_否定伪类</title>
    <style>
        /* 选中的是div的儿子p元素，但是排除类名为fail的元素 */
        /* div>p:not(.fail) {
            color: red;
        } */

        /* 选中的是div的儿子p元素，但是排除title属性值以“你要加油”开头的 */
        /* div>p:not([title^="你要加油"]) {
            color: red;
        } */

        /* 选中的是div的儿子p元素，但排除第一个儿子p元素 */
        div>p:not(:first-child) {
            color: red;
        }
    </style>
  </head>
  <body>
    <div>
      <p>张三：98分</p>
      <p>李四：88分</p>
      <p>王五：78分</p>
      <p>赵六：68分</p>
      <p class="fail" title="你要加油啊！孙七">孙七：58分</p>
      <p class="fail" title="你要加油啊！老八">老八：48分</p>
    </div>
  </body>
</html>
```

### 11.伪类选择器_UI伪类

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>伪类选择器_UI伪类</title>
    <style>
      /* 选中的是勾选的复选框或单选按钮 */
      input:checked {
        width: 100px;
        height: 100px;
      }

      /* 选中的是被禁用的input元素 */
      input:disabled {
        background-color: gray;
      }
      /* 选中的是可用的input元素 */
      input:enabled {
        font-size: 60px;
      }
    </style>
  </head>
  <body>
    <input type="checkbox" />
    <input type="radio" name="gender" />
    <input type="radio" name="gender" />
    <input type="text" />
    <input type="text" disabled />
  </body>
</html>
```

### 12.伪类选择器_目标伪类

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>伪类选择器_目标伪类</title>
    <style>
        div {
            background-color: gray;
            height: 600px;
        }
        div:target {
            background-color: green;
        }
    </style>
</head>
<body>
    <a href="#diyige">去看第1个</a>
    <a href="#dierge">去看第2个</a>
    <a href="#disange">去看第3个</a>
    <a href="#disige">去看第4个</a>
    <a href="#diwuge">去看第5个</a>
    <a href="#diliuge">去看第6个</a>
    <div id="diyige">第1个</div>
    <br>
    <div id="dierge">第2个</div>
    <br>
    <div id="disange">第3个</div>
    <br>
    <div id="disige">第4个</div>
    <br>
    <div id="diwuge">第5个</div>
    <br>
    <div id="diliuge">第6个</div>
</body>
</html>
```

### 13.伪类选择器_语言伪类

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>伪类选择器_语言伪类</title>
    <style>
        div:lang(en) {
            color: red;
        }
        :lang(zh-CN) {
            color: aqua;
        }
    </style>
</head>
<body>
    <div>尚硅谷</div>
    <div lang="en">atguigu</div>
    <p>前端</p>
    <span>你好</span>
</body>
</html>
```

### 14.伪元素选择器

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>伪元素选择器</title>
    <style>
        /*什么是伪元素？ - 很像元素，但不是元素(element),是元素中的一些特殊位置*/

        /*选中的是div中的第一个文字*/
        div::first-letter {
            color: red;
            font-size: 60px;
        }
        /* 选中的是div中的第一行文字 */
        div::first-line {
            background-color: yellow;
        }
        /* 选中的是div中被鼠标选择的文字 */
        div::selection {
            background-color: green;
            color: orange;
        }
        /* 选中的是input元素中的提示文字 */
        input::placeholder {
            color: pink;
        }
        /* 选中的是p元素最开始的位置，随后创建一个子元素 */
        p::before {
            content: "￥";
            color: gold;
        }
        /* 选中的是p元素最后的位置，随后创建一个子元素 */
        p::after {
            content: ".00";
        }
    </style>
</head>
<body>
    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, qui earum temporibus illo vero neque. Quam voluptas quod necessitatibus exercitationem tenetur, nihil cumque veniam delectus recusandae impedit ad dicta eligendi quia unde. Perferendis ratione cum illum, obcaecati harum ducimus, libero itaque dignissimos, nobis iste repudiandae magnam culpa exercitationem rerum excepturi? Quisquam sequi ea ducimus rem aspernatur neque sapiente quos totam?</div>
    <br>
    <input type="text" placeholder="请输入你的用户名">
    <p>199</p>
    <p>299</p>
    <p>399</p>
    <p>499</p>
</body>
</html>
```

## 七、CSS选择器优先级

### 1.选择器优先级_简单

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>选择器优先级_简单</title>
    <style>
    /* 行内 > ID选择器 > 类选择器 > 元素选择器 > 通配选择器 */
    #atguigu {
        color: orange;
    }
    .slogan {
        color: yellow;
    }
    h2 {
        color: green;
    }
    * {
        color: red;
    }
    </style>
</head>
<body>
    <h2 class="slogan" id="atguigu">尚硅谷</h2>
</body>
</html>
```



### 2.选择器的优先级_复杂

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>选择器的优先级_复杂</title>
    <style>
        /* 格式：(a,b,c)
        a：ID选择器的个数
        b：类、伪类、属性选铎器的个数
        c：元素、伪元素选器的个数 */
        #atguigu {
            color: orange;
        }
        .container span.slogan {
            color: red;
        }
        div>p>span:nth-child(1) {
            color: green;
        }
        .slogan {
            color: pink !important;
        }
    </style>
</head>
<body>
    <div class="container">
        <p>
            <span class="slogan" id="atguigu" style="color: blue;">尚硅谷</span>
            <span>学习前端</span>
        </p>
    </div>
</body>
</html>

## 八、CSS三大特性

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS三大特性</title>
    <link rel="stylesheet" href="index.css" />
    <style>
      /* 1. 层叠性 */
      /* 概念：如果发生了样式冲突，那就会根据一定的规则（选择器优先级），进行样式的层叠（覆盖）。 */
      h2 {
        color: red;
      }
      /* 2. 继承性 */
      /* 概念：元素会自动拥有其父元素、或其祖先元素上所设置的某些样式。
规则：优先继承离得近的。 */
      div {
        color: green;
        font-size: 40px;
        background-color: skyblue;
      }
      p {
        color: purple;
      }
      /* 3. 优先级 */
      /* 简单聊： !important > 行内样式 > ID选择器 > 类选择器 > 元素选择器 > * > 继承的样式。
      详细聊：需要计算权重。 */
      * {
        color: gray;
      }
    </style>
  </head>
  <body>
    <h2 id="atguigu">尚硅谷</h2>
    <hr />
    <div>
      div中的文字<br />
      <span>span中的文字1</span>
      <span>span中的文字2</span>
      <span>span中的文字3</span>
      <p>
        <span>span中的文字4</span>
      </p>
    </div>
  </body>
</html>
```

## 九、CSS像素_颜色

### 1.像素

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>像素</title>
    <style>
        .atguigu {
            width: 100px;
            height: 100px;
            background-color: red;
        }
    </style>
</head>
<body>
    <div class="atguigu"></div>
</body>
</html>

### 2.颜色

第一种表示：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>颜色_第一种表示_颜色名</title>
    <style>
        /* 编写方式：直接使用颜色对应的英文单词，编写比较简单 */
        .atguigu {
            color: red;
        }
    </style>
</head>
<body>
    <h2 class="atguigu">尚硅谷</h2>
</body>
</html>
```

第二种表示：

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>颜色_第二种表示_rgb或rgba</title>
    <style>
        /* 编写方式：使用红、黄、蓝这三种光的三原色进行组合。
        r表示红色
        g表示绿色
        b表示蓝色
        a表示透明度 */
        .atguigu1 {
            color: rgb(255,0,0);
        }
        .atguigu2 {
            color: rgb(0,255,0);
        }
        .atguigu3 {
            color: rgb(0,0,255);
        }
        .atguigu4 {
            color: rgb(138,43,226);
        }
        .atguigu5 {
            color: rgb(100%,0%,0%);
        }
        .atguigu6 {
            color: rgba(255,0,0,0.4);
        }
    </style>
</head>
<body>
    <h2 class="atguigu1">1</h2>
    <h2 class="atguigu2">2</h2>
    <h2 class="atguigu3">3</h2>
    <h2 class="atguigu4">4</h2>
    <h2 class="atguigu5">5</h2>
    <h2 class="atguigu6">6</h2>
</body>
</html>

第三种表示：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>颜色_第三种表示_HEX或HEXA</title>
    <style>
        /* HEX的原理同与rgb一样，依然是通过：红、绿、蓝色进行组合，只不过要用6个数字，分成3组来表达，
        格式为：#rrggbb */
        /* 每一位数字的取值范围是：0~f,即：（0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f)
        所以每一种光的最小值是：0，最大值是：ff */
        .atguigu1 {
            color: #ff0000;
        }
        .atguigu2 {
            color: #00ff00;
        }
        .atguigu3 {
            color: #0000ff;
        }
        .atguigu4 {
            color: #87ceeb88;
        }
        /* 如果每种颜色的两位都是相同的，就可以简写 */
        /* 但要注意前三位简写了，那么透明度就也要简写 */
        .atguigu5 {
            color: #fcdf;
        }
    </style>
</head>
<body>

    <h2 class="atguigu1">1</h2>
    <h2 class="atguigu2">2</h2>
    <h2 class="atguigu3">3</h2>
    <h2 class="atguigu4">4</h2>
    <h2 class="atguigu5">5</h2>

</body>
</html>
```

第四种表示：

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>颜色_第四种表示_HSL或HELA</title>
    <style>
        /* HSL是通过：色相、饱和度、亮度，来表示一个颜色的，格式为：hsl(色相，饱和度，亮度)
        色相：取值范围是~360度
        饱和度：取值范围是0%~100%。（向色相中对应颜色中添加灰色，0%全灰，100%没有灰)
        亮度：取值范围是0%~100%。(0%亮度没了，所以就是黑色。100%亮度太强，所以就是白色了) */
        .atguigu1 {
            color: hsl(0deg, 100%, 50%);
        }
        .atguigu2 {
            color: hsl(60deg, 100%, 50%);
        }
        .atguigu3 {
            color: hsl(120deg, 100%, 50%);
        }
        .atguigu4 {
            color: hsl(180deg, 100%, 50%);
        }
        .atguigu5 {
            color: hsl(240deg, 100%, 50%);
        }
        .atguigu6 {
            color: hsla(0, 0%, 50%, 0.414);
        }
    </style>
</head>
<body>
    <h2 class="atguigu1">1</h2>
    <h2 class="atguigu2">2</h2>
    <h2 class="atguigu3">3</h2>
    <h2 class="atguigu4">4</h2>
    <h2 class="atguigu5">5</h2>
    <h2 class="atguigu6">6</h2>
</body>
</html>

## 十、CSS常用字体属性

### 1.字体大小

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>字体大小</title>
    <style>
        /* body {
            font-size: 20px;
        } */
        .atguigu1 {
            font-size: 40px;
        }
        .atguigu2 {
            font-size: 30px;
        }
        .atguigu3 {
            font-size: 20px;
        }
        .atguigu4 {
            font-size: 20px;
        }
        .atguigu5 {
            /* 浏览器能够接受的最小字体是12px */
            font-size: 3px;
        }
    </style>
</head>
<body>
    <div class="atguigu1">1</div>
    <div class="atguigu2">2</div>
    <div class="atguigu3">3</div>
    <div class="atguigu4">4</div>
    <div class="atguigu5">5</div>
    <div>6</div>
</body>
</html>

### 2.字体族

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>字体族</title>
    <style>
        .atguigu1 {
            font-size: 100px;
            font-family: "微软雅黑";
        }
        .atguigu2 {
            font-size: 100px;
            font-family: "宋体";
        }
        .atguigu3 {
            font-size: 100px;
            font-family: "楷体";
        }
        .atguigu4 {
            font-size: 100px;
            font-family: "华文彩云";
        }
        .atguigu5 {
            font-size: 100px;
            font-family: "翩翩体-简","楷体","微软雅黑";
        }
        .atguigu6 {
            font-size: 100px;
            font-family: "HanziPen SC","STCaiyun","STHuPo","Microsoft YaHei",sans-serif;
        }
    </style>
</head>
<body>
    <div class="atguigu1">1</div>
    <div class="atguigu2">2</div>
    <div class="atguigu3">3</div>
    <div class="atguigu4">4</div>
    <div class="atguigu5">5</div>
    <div class="atguigu6">6</div>
</body>
</html>

### 3.字体风格

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>字体风格</title>
    <style>
        /* 1. normal ：正常（默认值）
        2. italic ：斜体（使用字体自带的斜体效果）
        3. oblique ：斜体（强制倾斜产生的斜体效果） */
        .atguigu1 {
            font-size: 100px;
            font-style: normal;
        }
        /* 实现斜体时，更推荐使用 italic 。 */
        .atguigu2 {
            font-size: 100px;
            font-style: italic;
        }
        .atguigu3 {
            font-size: 100px;
            font-style: oblique;
        }
        em {
            font-size: 100px;
        }
    </style>
</head>
<body>
    <div class="atguigu1">1</div>
    <div class="atguigu2">2</div>
    <div class="atguigu3">3</div>
    <em>4</em>
</body>
</html>

### 4.字体粗细

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-0">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>字体粗细</title>
    <style>
        /* 1.ghter:细
        2.normal:正常
        3.bo1d:粗
        4.bolder：很粗（多数字体不支持） */
        /* 100~300等同于1 lighter,400~500等同于normal,600及以上等同于bold */
        div {
            font-size: 100px;
        }
        .atguigu1 {
            font-weight: lighter;
        }
        .atguigu2 {
            font-weight: normal;
        }
        .atguigu3 {
            font-weight: bold;
        }
        .atguigu4 {
            font-weight: bolder;
        }
        .atguigu5 {
            font-weight: 100;
        }
    </style>
</head>
<body>
    <div class="atguigu1">1</div>
    <div class="atguigu2">2</div>
    <div class="atguigu3">3</div>
    <div class="atguigu4">4 </div>
    <div class="atguigu5">5 </div>
</body>
</html>

### 5.字体复合属性

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>字体复合属性</title>
    <style>
        /* 编写规则：
        1.字体大小、字体族必须都写上。
        2.字体族必须是最后一位、字体大小必须是倒数第二位。
        3.各个属性间用空格隔开。 */
        .atguigu {
            font: bold italic 100px "STCaiyun","STHuPo",sans-serif;
        }
    </style>
</head>
<body>
    <div class="atguigu">你好</div>
</body>
</html>

## 十一、CSS常用文本属性

### 1.文本颜色

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>文本颜色</title>
    <style>
        div {
            font-size: 90px;
        }
        .atguigu1 {
            color: red;
        }
        .atguigu2 {
            color: rgb(255, 0, 0);
        }
        .atguigu3 {
            color: rgba(255, 0, 0, 0.5);
        }
        .atguigu4 {
            color: #00f;
        }
        .atguigu5 {
            color: #00f8;
        }
        .atguigu6 {
            color: hsl(0, 100%, 50%);
        }
        .atguigu7 {
            color: hsla(0, 100%, 50%,0.5);
        }
    </style>
</head>
<body>
    <div class="atguigu1">1</div>
    <div class="atguigu2">2</div>
    <div class="atguigu3">3</div>
    <div class="atguigu4">4</div>
    <div class="atguigu5">5</div>
    <div class="atguigu6">6</div>
    <div class="atguigu7">7</div>
</body>
</html>

### 2.文本间距

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>文本间距</title>
    <style>
        div {
            font-size: 30px;
        }
        .atguigu2 {
            /* 字母间距 */
            letter-spacing: 20px;
        }
        .atguigu3 {
            /* 单词间距 */
            word-spacing: 20px;
        }
    </style>
</head>
<body>
    <div >You got a dream,.you gotta protect it.1</div>
    <div class="atguigu2">You got a dream,.you gotta protect it.2</div>
    <div class="atguigu3">You got a dream,.you gotta protect it.3</div>
</body>
</html>





(续...)
