---
title: 手撕Promise
description: Promise自定义实现
prev:
  text: 'Ajax'
  link: '/Front_End/Notes/Ajax'
next:
  text: 'Axios'
  link: '/Front_End/Notes/Axios'
tags:
  - 前端
  - Promise
  - 笔记
---

# Promise自定义实现

```js
//声明构造函数
function Promise(executor) {
    //添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    this.callbacks = [];
    //保存实例对象的this的值
    const self = this;  //self _this that
    //resolve函数
    function resolve(data) {
        // 判断状态
        if (self.PromiseState !== 'pending') return;
        //1.修改对象的状态(promiseState)
        self.PromiseState = 'fulfilled';  //resolved
        //2.设置对象结果值(promiseResult)
        self.PromiseResult = data;
        //调用成功的回调函数
        self.callbacks.forEach((item) => {
            item.onResolved(data);
        });
    }
    //reject函数
    function reject(data) {
        // 判断状态
        if (self.PromiseState !== 'pending') return;
        //1.修改对象的状态(promiseState)
        self.PromiseState = 'rejected';
        //2.设置对象结果值(promiseResult)
        self.PromiseResult = data;
        //调用失败的回调函数
        setTimeout(() => {
            self.callbacks.forEach((item) => {
                item.onRejected(data);
            });
        });
    }
    try {
        //同步调用"执行器函数"
        executor(resolve, reject);
    } catch (e) {
        // 修改Promise对象状态为失败
        reject(e);
    }
}

//添加then方法
Promise.prototype.then = function (onResolved, onRejected) {
    const self = this;
    // 判断回调函数参数
    if (typeof onRejected !== 'function') {
        onRejected = reason => {
            throw reason;
        };
    }
    if (typeof onResolved !== 'function') {
        onResolved = value => value;
    }
    return new Promise((resolve, reject) => {
        function callback(type) {
            try {
                let result = type(self.PromiseResult);
                //判断
                if (result instanceof Promise) {
                    //如果是Promise的对象
                    result.then(v => {
                        resolve(v);
                    }, r => {
                        reject(r);
                    });
                } else {
                    // 结果的对象状态为【成功】
                    resolve(result);
                }
            } catch (e) {
                reject(e);
            }
        }
        // 调用回调函数  PromiseState
        if (this.PromiseState === 'fulfilled') {
            setTimeout(() => {
                callback(onResolved);
            });
        }
        if (this.PromiseState === 'rejected') {
            setTimeout(() => {
                callback(onRejected);
            });
        }
        if (this.PromiseState === 'pending') {
            // 保存回调函数
            this.callbacks.push({
                onResolved: function () {
                    callback(onResolved);
                },
                onRejected() {
                    callback(onRejected);
                }
            });
        }
    });
};

//添加catch方法
Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

//添加resolve方法
Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then((v) => {
                resolve(v);
            }, (r) => {
                reject(r);
            });
        } else {
            resolve(value);
        }
    });
};

//添加reject方法
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
};

//添加all方法
Promise.all = function(promises){
    return new Promise((resolve,reject) => {
        //声明变量
        let count = 0
        let arr = []
        // 遍历
        for(let i = 0;i<=promises.length;i++){
            promises[i].then(v => {
                // 得知对象状态是成功
                // 每个promise对象 都成功
                count++
                // 将当前promise对象成功的结果存入到数组
                arr[i] = v
                // 判断
                if(count === promises.length){
                    // 修改状态
                    resolve(arr)
                }
            },r => {
                reject(r)
            })
        }
    })
}

//添加race方法
Promise.race = function(promises){
    return new Promise((resolve,reject) => {
        for(let i = 0;i<=promises.length;i++){
            promises[i].then(v => {
                // 修改返回对象的状态为 【成功】
                resolve(v)
            },r => {
                // 修改返回对象的状态为 【失败】
                reject(r)
            })
        }
    })
}
```

