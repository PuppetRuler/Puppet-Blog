---
title: 手撕Axios
description: 实现一个自定义的Axios
prev:
  text: 'Promise'
  link: '/Front_End/Notes/Promise'
next:
  text: 'TypeScript'
  link: '/Front_End/Notes/TypeScript'
tags:
  - Axios
  - 前端
  - 笔记
---

# 实现一个自定义的Axios

## 发送请求模拟实现

```js
// axios 发送请求  axios Axios.prototype.request  bind
// 1.声明构造函数
function Axios(config){
    this.config = config
}
Axios.prototype.request = function(config){
    //发送请求
    // 创建一个Promise对象
    let promise = Promise.resolve(config)
    // 声明一个数组
    let chains = [dispatchRequest,undefined]// undefined 占位
    // 调用then方法指定回调
    let result = promise.then(chains[0],chains[1])
    //返回 promise 的结果
    return result
}

// 2.dispatchRequest 函数
function dispatchRequest(config){
    // 调用适配器发送请求
    return xhrAdapter(config).then((response) => {
        // 响应的结果进行转换处理
        // ...
        return response
    },(error) => {
        throw error
    })
}

// 3. adapter 适配器
function xhrAdapter(config){
    console.log('xhrAdapter 函数执行');
    return new Promise((resolve,reject)=>{
        // 发送AJAX请求
        let xhr = new XMLHttpRequest()
        // 初始化
        xhr.open(config.method,config.url)
        // 发送
        xhr.send()
        // 绑定事件
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300){
                    resolve({
                        // 配置对象
                        config:config,
                        // 响应体
                        data:xhr.response,
                        // 响应头
                        headers:xhr.getAllResponseHeaders(),  //字符串 parseHeaders
                        // xhr请求对象
                        request:xhr,
                        // 响应状态码
                        status:xhr.status,
                        // 响应状态字符串
                        statusText:xhr.statusText
                    })
                }else{
                    // 失败状态
                    return new Error('error')
                }
            }
        }
    })
}

// 4.创建axios对象
let axios = Axios.prototype.request.bind(null)

axios({
    method:'GET',
    url:'http://localhost:3000/posts'
}).then(response =>{
    console.log(response);
})
```

## 拦截器模拟实现



```js
// 构造函数
function Axios(config) {
    this.config = config;
    this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
    };
}

// 发送请求    难点与重点
Axios.prototype.request = function (config) {
    // 创建一个promise对象
    let promise = Promise.resolve(config);
    // 创建一个数组
    const chains = [dispatchRequest, undefined];
    // 处理拦截器
    // 请求拦截器 将请求拦截器的回调 压入到 chains 的前面 request.handlers = []
    this.interceptors.request.handlers.forEach(item => {
        chains.unshift(item.fulfilled, item.rejected);
    });
    // 响应拦截器
    this.interceptors.response.handlers.forEach(item => {
        chains.push(item.fulfilled, item.rejected);
    });

    // 遍历
    while (chains.length > 0) {
        promise = promise.then(chains.shift(), chains.shift());
    }

    return promise;
};

//发送请求
function dispatchRequest(config) {
    // 返回一个 promise 对象
    return new Promise((resolve, reject) => {
        resolve({
            status: 200,
            statusText: 'OK'
        });
    });
}

// 创建实例
let context = new Axios({});
// 创建axios函数
let axios = Axios.prototype.request.bind(context);
// 将 context 属性 config interceptors 添加到 axios 函数对象身上
Object.keys(context).forEach(key => {
    axios[key] = context[key];
});

// 拦截器管理器的构造函数
function InterceptorManager() {
    this.handlers = [];
}
InterceptorManager.prototype.use = function (fulfilled, rejected) {
    this.handlers.push({
        fulfilled,
        rejected
    });
};


// 以下为功能测试代码
// 设置请求拦截器  config:配置对象
axios.interceptors.request.use(function (config) {
    //修改config中的参数
    console.log('请求拦截器  成功 -1');
    return config;
}, function (error) {
    console.log('请求拦截器  失败 -1');
    return Promise.reject(error);
});
// 设置请求拦截器
axios.interceptors.request.use(function (config) {
    console.log('请求拦截器  成功 -2');
    return config;
}, function (error) {
    console.log('请求拦截器  失败 -2');
    return Promise.reject(error);
});

// 设置响应拦截器
axios.interceptors.response.use(function (response) {
    console.log('响应拦截器  成功 -1');
    return response;
}, function (error) {
    console.log('响应拦截器  失败 -1');
    return Promise.reject(error);
});
// 设置响应拦截器
axios.interceptors.response.use(function (response) {
    console.log('响应拦截器  成功 -2');
    return response;
}, function (error) {
    console.log('响应拦截器  失败 -2');
    return Promise.reject(error);
});

//发送请求
axios({
    method: 'GET',
    url: 'http://localhost:3000/posts'
}).then(response => {
    console.log(response);
}).catch(reason => {
    console.log('自定义失败的回调');
})
```

## 取消请求模拟实现

```js
//构造函数
function Axios(config) {
    this.config = config;
}
//原型 request 方法
Axios.prototype.request = function (config) {
    return dispatchRequest(config);
};
//dispatchRequest 函数
function dispatchRequest(config) {
    return xhrAdapter(config);
}
//xhrAdapter
function xhrAdapter(config) {
    return new Promise((resolve, reject) => {
        //发送 AJAX 请求
        const xhr = new XMLHttpRequest();
        //初始化
        xhr.open('GET', 'http://localhost:3000/posts');
        //发送
        xhr.send();
        //绑定事件
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    //设置为成功的状态
                    resolve({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                } else {
                    reject(new Error('请求失败'));
                }
            }
        };
        // 关于取消请求的处理
        if (config.cancelToken) {
            // 对 CancelToken 对象身上的 Promise 对象指定成功的回调
            config.cancelToken.promise.then(response => {
                xhr.abort();
                //将整体结果设置为失败
                reject(new Error('请求已经被取消'))
            });
        }
    });
}

//创建 axios 函数
const context = new Axios({});
const axios = Axios.prototype.request.bind(context);

// CancelToken 构造函数
function CancelToken(executor) {
    // 声明一个变量
    var resolvePromise;
    // 为实例添加对象
    this.promise = new Promise((resolve) => {
        //将 resolve 赋值给 resolvePromise
        resolvePromise = resolve;
    });
    // 调用 executor 函数
    executor(function () {
        // 执行 resolvePromise 函数
        resolvePromise();
    });
}


// 获取按钮   以上为模拟实现的代码
const btns = document.querySelectorAll('button');
// 2.声明全局变量
let cancel = null;
//发送请求
btns[0].onclick = function () {
    // 检测上一次的请求是否已经完成
    if (cancel !== null) cancel();

    //创建 cancelToken 的值
    let cancelToken = new CancelToken(function (c) {
        cancel = c;
    });

    axios({
        method: 'GET',
        url: 'http://localhost:3000/posts',
        // 1.添加配置对象
        cancelToken: cancelToken
    }).then(response => {
        console.log(response);
        // 将cancel初始化
        cancel = null;
    });
};

btns[1].onclick = function () {
    cancel();
    // 将cancel的值初始化
    // cancel = null;
}
```

