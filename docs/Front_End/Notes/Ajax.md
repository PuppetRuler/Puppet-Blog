---
title: Ajax笔记
description: Ajax的笔记
prev:
  text: 'Webpack'
  link: '/Front_End/Notes/Webpack'
next:
  text: 'Promise'
  link: '/Front_End/Notes/Promise'
tags:
  - Ajax
  - 前端
  - 笔记
---



# AJAX笔记

## 介绍

AJAX全称为Asynchronous JavaScript And XML,就是异步的JS和XML。通过AJAX可以在浏览器中向服务器发送异步请求，最大的优势：无刷新获取数据。 AJAX不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式。

## 特点

### AJAX的优点 

- 可以无需刷新页面而与服务器端进行通信。
- 允许你根据用户事件来更新部分页面内容。

### AJAX的缺点

- 没有浏览历史，不能回退
- 存在跨域问题（同源)
- SE0不友好

## 基本使用

```js
const result = document.getElementById('result');
//绑定键盘按下事件
window.onkeydown = function(){
    //发送请求
    const xhr = new XMLHttpRequest();
    //设置响应体数据的类型
    xhr.responseType = 'json';
    //初始化
    xhr.open('GET','http://127.0.0.1:8000/json-server');
    //发送
    xhr.send();
    //事件绑定
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status < 300){
                //
                // console.log(xhr.response);
                // result.innerHTML = xhr.response;
                // 1. 手动对数据转化
                // let data = JSON.parse(xhr.response);
                // console.log(data);
                // result.innerHTML = data.name;
                // 2. 自动转换
                console.log(xhr.response);
                result.innerHTML = xhr.response.name;
            }
        }
    }
}
```

