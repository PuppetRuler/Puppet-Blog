---
title: Webpack基础配置
description: 翻出几个成旧的配置表,开始玄学做法...
prev:
  text: 'Node'
  link: '/Front_End/Notes/Node'
next:
  text: 'Ajax'
  link: '/Front_End/Notes/Ajax'
tags:
  - Webpack
  - 前端
  - 笔记
---

# Webpack配置表

## 介绍

**`Webpack` 是一个静态资源打包工具。**

它会以一个或多个文件作为打包的入口，将我们整个项目所有文件编译组合成一个或多个文件输出出去。

输出的文件就是编译好的文件，就可以在浏览器段运行了。

我们将 `Webpack` 输出的文件叫做 `bundle`。

> Webpack 本身功能是有限的:
>
> - 开发模式：仅能编译 JS 中的 `ES Module` 语法
> - 生产模式：能编译 JS 中的 `ES Module` 语法，还能压缩 JS 代码

- 开发模式

```
npx webpack ./src/main.js --mode=development
```

- 生产模式

```
npx webpack ./src/main.js --mode=production
```

`npx webpack`: 是用来运行本地安装 `Webpack` 包的。

`./src/main.js`: 指定 `Webpack` 从 `main.js` 文件开始打包，不但会打包 `main.js`，还会将其依赖也一起打包进来。

`--mode=xxx`：指定模式（环境）。

默认 `Webpack` 会将文件打包输出到 `dist` 目录下。

## 5大核心概念

1. entry（入口）

指示 Webpack 从哪个文件开始打包

2. output（输出）

指示 Webpack 打包完的文件输出到哪里去，如何命名等

3. loader（加载器）

webpack 本身只能处理 js、json 等资源，其他资源需要借助 loader，Webpack 才能解析

4. plugins（插件）

扩展 Webpack 的功能

5. mode（模式）

主要由两种模式：

- 开发模式：development
- 生产模式：production

## `webpack.dev.js`

```js
const os = require("os");
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const threads = os.cpus().length; // cpu核数

module.exports = {
    // 入口
    entry: './src/main.js',  // 相对路径
    // 输出
    output: {
        // 所有文件的输出路径
        path: undefined,
        // 入口文件打包文件名
        filename: 'static/js/[name].js',
        // 给打包输出的其他文件命名
        chunkFilename:"static/js/[name].chunk.js",
        // 图片、字体等通过type:asset处理资源命名方式
        assetModuleFilename:"static/media/[hash:6][ext][query]",
        // 自动清空上次打包的内容
        // 原理:在打包时，将path整个目录清空，再进行打包
        clean: true,
    },
    // 加载器
    module: {
        rules: [
            // loaders的配置
            {
                // 每个文件只能被其中一个loader配置处理
                oneOf: [
                    {
                        test: /\.css$/,  //只检测.css文件
                        use: [
                            // 执行顺序,从左到右（从上到下）
                            "style-loader",   // 将js中css通过创建style标签添加html文件中生效
                            "css-loader"  // 将css资源编译成commonjs的模块到js中
                        ],
                    },
                    {
                        test: /\.less$/,
                        // loader:'XXX',  // 只能使用1个loader
                        use: [
                            'style-loader',
                            'css-loader',
                            'less-loader',  // 将less编译成css文件
                        ],
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: [
                            // 将 JS 字符串生成为 style 节点
                            'style-loader',
                            // 将 CSS 转化成 CommonJS 模块
                            'css-loader',
                            // 将 Sass 编译成 CSS
                            'sass-loader',
                        ],
                    },
                    {
                        test: /\.styl$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            'stylus-loader',  // 将stylus编译成css文件
                        ],
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp|svg)$/,
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                // 小于10kb的图片转base64
                                // 优点:减少请求数量    缺点:体积会增大
                                maxSize: 10 * 1024  //10kb
                            }
                        },
                        // generator: {
                        //     // 将图片文件输出到 static/imgs 目录中
                        //     // 将图片文件命名 [hash:8][ext][query]
                        //     // [hash:8]: hash值取8位
                        //     // [ext]: 使用之前的文件扩展名
                        //     // [query]: 添加之前的query参数
                        //     filename: 'static/images/[hash:6][ext][query]'
                        // }
                    },
                    {
                        test: /\.(ttf|woff2?|map3|map4|avi)$/,
                        type: 'asset/resource',
                        // generator: {
                        //     // 输出名称
                        //     filename: 'static/media/[hash:6][ext][query]'
                        // }
                    },
                    {
                        test: /\.js$/,
                        // exclude: /node_modules/,  // 排除node_modules中的js文件(这些文件不处理)
                        include:path.resolve(__dirname,'../src'),  // 只处理src下的文件，其他文件不处理
                        use: [
                            {
                                loader: "thread-loader", // 开启多进程
                                options: {
                                    works: threads, // 进程数量
                                }
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    // presets: ["@babel/preset-env"]
                                    cacheDirectory: true, // 开启babel缓存
                                    cacheCompression: false, //关闭缓存压缩
                                    plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                                }
                            }
                        ],
                    },
                ]
            }
        ]
    },
    // 插件
    plugins: [
        // plugin的配置
        new ESLintPlugin({
            // 检测哪些文件
            context: path.resolve(__dirname, '../src'),
            exclude:"node_modules",  //默认值
            cache: true, //开启缓存
            cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache'),
            threads, // 开启多进程和设置进程数量
        }),
        new HtmlWebpackPlugin({
            // 模板:以public/index.html文件创建新的html文件
            // 新的html文件特点:1.结构与原来一致 2.自动引入打包输出的文件
            template: path.resolve(__dirname, '../public/index.html')
        }),
    ],
    // 开发服务器:不会输出打包资源，在内存里面编译
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: false, // 是否自动打开浏览器
        hot: true //开启HMR(默认值)
    },
    // 模式
    mode: 'development',
    devtool: "cheap-module-source-map",
};
```

## `webpack.prod.js`

```js
const os = require("os");
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const terserWebpackPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const threads = os.cpus().length; // cpu核数

// 用来获取处理样式的loader
function getStyleLoader(pre) {
    return [
        // 执行顺序,从右到左（从下到上）
        MiniCssExtractPlugin.loader,  // 提取css成单独文件
        'css-loader',  // 将css资源编译成commonjs的模块到js中
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ],
                },
            },
        }, pre
    ].filter(Boolean);
}

module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出
    output: {
        // 所有文件的输出路径
        path: path.resolve(__dirname, '../dist'),
        // 入口文件打包文件名
        filename: 'static/js/[name].[contenthash:6].js',
        // 给打包输出的其他文件命名
        chunkFilename:"static/js/[name].chunk.[contenthash:6].js",
        // 图片、字体等通过type:asset处理资源命名方式s
        assetModuleFilename:"static/media/[hash:6][ext][query]",
        // 自动清空上次打包的内容
        // 原理:在打包时，将path整个目录清空，再进行打包
        clean: true,
    },
    // 加载器
    module: {
        rules: [
            // loaders的配置
            {
                oneOf: [
                    {
                        test: /\.css$/,  //只检测.css文件
                        use: getStyleLoader(),
                    },
                    {
                        test: /\.less$/,
                        // loader:'XXX',  // 只能使用1个loader
                        use: getStyleLoader('less-loader'),
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: getStyleLoader('sass-loader'),
                    },
                    {
                        test: /\.styl$/,
                        use: getStyleLoader('stylus-loader'),
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp|svg)$/,
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                // 小于10kb的图片转base64
                                // 优点:减少请求数量    缺点:体积会增大
                                maxSize: 10 * 1024  //10kb
                            }
                        },
                        // generator: {
                        //     // 将图片文件输出到 static/imgs 目录中
                        //     // 将图片文件命名 [hash:8][ext][query]
                        //     // [hash:8]: hash值取8位
                        //     // [ext]: 使用之前的文件扩展名
                        //     // [query]: 添加之前的query参数
                        //     filename: 'static/images/[hash:6][ext][query]'
                        // }
                    },
                    {
                        test: /\.(ttf|woff2?|map3|map4|avi)$/,
                        type: 'asset/resource',
                        // generator: {
                        //     // 输出名称
                        //     filename: 'static/media/[hash:6][ext][query]'
                        // }
                    },
                    {
                        test: /\.js$/,
                        // exclude: /node_modules/,  // 排除node_modules中的js文件(这些文件不处理)
                        include: path.resolve(__dirname, '../src'),  // 只处理src下的文件，其他文件不处理
                        use: [
                            {
                                loader: "thread-loader", // 开启多进程
                                options: {
                                    works: threads, // 进程数量
                                }
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    // presets: ["@babel/preset-env"]
                                    cacheDirectory: true, // 开启babel缓存
                                    cacheCompression: false, //关闭缓存压缩
                                }
                            }
                        ],

                    },
                ]
            }
        ]
    },
    // 插件
    plugins: [
        // plugin的配置
        new ESLintPlugin({
            // 检测哪些文件
            context: path.resolve(__dirname, '../src'),
            exclude: "node_modules",
            cache: true, //开启缓存
            cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache'),
            threads, // 开启多进程和设置进程数量
        }),
        new HtmlWebpackPlugin({
            // 模板:以public/index.html文件创建新的html文件
            // 新的html文件特点:1.结构与原来一致 2.自动引入打包输出的文件
            template: path.resolve(__dirname, '../public/index.html')
        }),
        // 将js内的css代码提取出来
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:6].css',
            chunkFilename:"static/css/[name].[contenthash:6].chunk.css",
        }),
        // new CssMinimizerPlugin(),
        // new terserWebpackPlugin({
        //     parallel: threads, // 开启多进程和设置进程数量
        // }),
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true,
          }),
    ],
    optimization: {
        // 压缩的操作
        minimizer: [
            // 压缩css
            new CssMinimizerPlugin(),
            // 压缩js
            new terserWebpackPlugin({
                parallel: threads, // 开启多进程和设置进程数量
            }),
            // 压缩图片
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminGenerate,
                    options: {
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            [
                                "svgo",
                                {
                                    plugins: [
                                        "preset-default",
                                        "prefixIds",
                                        {
                                            name: "sortAttrs",
                                            params: {
                                                xmlnsOrder: "alphabetical",
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
            // PWA离线技术
            new PreloadWebpackPlugin({
                // rel: 'preload',
                // as: 'script',
                rel:'prefetch'
            }),
        ],
        // 配置代码分割
        splitChunks:{
            chunks: "all", // 对所有模块都进行分割
            // 其他使用默认选项
        },
        // 避免b文件未使用代码发生变化导致其他文件hash值被改变,导致需要重新加载
        runtimeChunk: {
            name:(entrypoint) => `runtime~${entrypoint.name}.js`
        }
    },
    // 模式
    mode: 'production',
    devtool: "source-map",
};
```

## 自定义plugin或自定义loader

- plugin:

```js
/* 
    1.webpack加载webpack.config.js中的所有配置,此时就会new TestPlugin(),执行插件的constructor
    2.webpack创建compiler对象
    3.遍历所有plugins中插件,调用插件的apply方法
    4.执行剩下编译流程(触发各个hooks事件)
*/
class TestPlugin {
    constructor() {
        console.log("TestPlugin constructor");
    }

    apply(compiler) {
        debugger;
        console.log("compiler",compiler);
        console.log("TestPlugin apply");

        // 由文档可知，environment是同步钩子，所以需要使用tap注册
        compiler.hooks.environment.tap("TestPlugin", () => {
            console.log("TestPlugin environment");
        });

        // 由文档可知，emit是异步串行钩子 AsyncSeriesHook
        compiler.hooks.emit.tap("TestPlugin", (compilation) => {
            console.log("compilation",compilation);
            console.log("TestPlugin emit 111");
        });

        compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
            setTimeout(() => {
                console.log("TestPlugin emit 222");
                callback();
            }, 2000);
        });

        compiler.hooks.emit.tapPromise("TestPlugin", (compilation) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log("TestPlugin emit 333");
                    resolve();
                }, 1000);
            });
        });

        // 由文档可知，make是异步并行钩子 AsyncParallelHook
        compiler.hooks.make.tapAsync("TestPlugin",(compilation,callback) => {
            // 需要在compilation hooks触发前注册才能使用
            compilation.hooks.seal.tap("TestPlugin",() => {
                console.log("TestPlugin Seal");
            })

            setTimeout(() => {
                console.log("TestPlugin make 111");
                callback()
            }, 3000);
        })
        
        compiler.hooks.make.tapAsync("TestPlugin",(compilation,callback) => {
            setTimeout(() => {
                console.log("TestPlugin make 222");
                callback()
            }, 1000);
        })

        compiler.hooks.make.tapAsync("TestPlugin",(compilation,callback) => {
            setTimeout(() => {
                console.log("TestPlugin make 333");
                callback()
            }, 2000);
        })
    }
}

module.exports = TestPlugin;
```

示例:

```js
const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin');

class InlineChunkWebpackPlugin {
    constructor(tests) {
        this.tests = tests;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('InlineChunkWebpackPlugin', (compilation) => {
            // 1.获取html-webpack-plugin的hooks
            const hooks = HtmlWebpackPlugin.getHooks(compilation);
            // 2.注册 html-webpack-plugin的hooks -> alterAssetTagGroups
            hooks.alterAssetTagGroups.tap('InlineChunkWebpackPlugin', (assets) => {
                assets.headTags = this.getInlineChunk(assets.headTags, compilation.assets);
                assets.bodyTags = this.getInlineChunk(assets.bodyTags, compilation.assets);
            });

            // 删除runtime文件
            hooks.afterEmit.tap("InlineChunkWebpackPlugin", () => {
                // 3.从里面将script的runtime文件变成inline script
                Object.keys(compilation.assets).forEach(filepath => {
                    if (this.tests.some(test => test.test(filepath))) {
                        delete compilation.assets[filepath];
                    }
                });
            });
        });
    }

    getInlineChunk(tags, assets) {
        /* 
            目前:{
                tagName: 'script',
                voidTag: false,
                meta: { plugin: 'html-webpack-plugin' },
                attributes: { defer: true, type: undefined, src: 'js/runtime~main.js.js' }
            },
            希望:{
                tagName: 'script',
                innerHTML:runtime文件的内容
                closeTag:true
            },
        */

        return tags.map((tag) => {
            if (tag.tagName !== "script") return tag;
            // 获取文件资源路径
            const filepath = tag.attributes.src;
            if (!filepath) return tag;

            if (!this.tests.some(test => test.test(filepath))) return tag;

            return {
                tagName: "script",
                innerHTML: assets[filepath].source(),
                closeTag: true,
            };
        });
    }
}

module.exports = InlineChunkWebpackPlugin;
```

- loader:

```js
module.exports = function (content) {
/*
  1. 直接使用style-loader，只能处理样式
    不能处理样式中引入的其他资源

    use: ["./loaders/style-loader"],

  2. 借助css-loader解决样式中引入的其他资源的问题

    use: ["./loaders/style-loader", "css-loader"],

    问题是css-loader暴露了一段js代码，style-loader需要执行js代码，得到返回值，再动态创建style标签，插入到页面上
    不好操作

  3. style-loader使用pitch loader用法
*/
// const script = `
//   const styleEl = document.createElement('style');
//   styleEl.innerHTML = ${JSON.stringify(content)};
//   document.head.appendChild(styleEl);
// `;
// return script;
};

module.exports.pitch = function (remainingRequest) {
    // remainingRequest 剩下还需要处理的loader
    // console.log(remainingRequest); // C:\Users\86176\Desktop\webpack\source\node_modules\css-loader\dist\cjs.js!C:\Users\86176\Desktop\webpack\source\src\css\index.css

    // 1. 将 remainingRequest 中绝对路径改成相对路径（因为后面只能使用相对路径操作）
    const relativePath = remainingRequest
      .split("!")
      .map((absolutePath) => {
        // 返回相对路径
        return this.utils.contextify(this.context, absolutePath);
      })
      .join("!");

    // console.log(relativePath); // ../../node_modules/css-loader/dist/cjs.js!./index.css

    // 2. 引入css-loader处理后的资源
    // 3. 创建style，将内容插入页面中生效
    const script = `
      import style from "!!${relativePath}";
      const styleEl = document.createElement('style');
      styleEl.innerHTML = style;
      document.head.appendChild(styleEl);
    `;

    // 中止后面loader执行
    return script;
};
```

## 打包Vue的配置

```js
const path = require('path');
const { DefinePlugin } = require('webpack');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

const isProduction = process.env.NODE_ENV === 'production';

// 返回处理样式loader
function getStylesLoader(pre) {
    return [
        isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader",
        "css-loader",
        {
            // 处理css兼容性问题
            // 配合package.json中browserslist来指定兼容性
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: ["postcss-preset-env"],
                },
            },
        },
        pre && {
            loader: pre,
            options: pre === "sass-loader" ? {
                additionalData: `@use "@/styles/element/index.scss" as *;`,
            } : {}
        },
    ].filter(Boolean);
}

module.exports = {
    entry: "./src/main.js",
    output: {
        path: isProduction ? path.resolve(__dirname, "../dist") : undefined,
        filename: isProduction ? "static/js/[name].[contenthash:10].js" : "static/js/[name].js",
        chunkFilename: isProduction ? "static/js/[name].[contenthash:10].chunk.js" : "static/js/[name].chunk.js",
        assetModuleFilename: "static/media/[hash:10][ext][query]",
        clean: true,
    },
    module: {
        rules: [
            // 处理css
            {
                test: /\.css$/,
                use: getStylesLoader()
            },
            {
                test: /\.less$/,
                use: getStylesLoader("less-loader")
            },
            {
                test: /\.s[ac]ss$/,
                use: getStylesLoader("sass-loader")
            },
            {
                test: /\.styl$/,
                use: getStylesLoader("stylus-loader")
            },
            // 处理图片
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
            },
            // 处理其他资源
            {
                test: /\.(woff2?|ttf)$/,
                type: "asset/resource",
            },
            // 处理js
            {
                test: /\.(js)$/,
                include: path.resolve(__dirname, "../src"),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                },
            },
            // vue-loader不支持oneof
            {
                test: /\.vue$/,
                loader: 'vue-loader',  // 内部会给vue文件注入HMR功能代码
                options: {
                    // 开启缓存
                    cacheDirectory: path.resolve(__dirname, "../node_modules/.cache/vue-loader")
                }
            },
        ],
    },
    // 处理html
    plugins: [
        new EslintWebpackPlugin({
            context: path.resolve(__dirname, '../src'),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache')
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html")
        }),
        isProduction && new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:10].css",
            chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
        }),
        // 将public下面的资源复制到dist目录去（除了index.html）
        isProduction && new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public"),
                    to: path.resolve(__dirname, "../dist"),
                    toType: "dir",
                    noErrorOnMissing: true, // 不生成错误
                    globOptions: {
                        // 忽略文件
                        ignore: ["**/index.html"],
                    },
                    info: {
                        // 跳过terser压缩js
                        minimized: true,
                    },
                },
            ],
        }),
        new VueLoaderPlugin(),
        // cross-env定义的环境变量给打包工具使用
        // DefinePlugin定义环境变量给源代码使用，从而解决vue3页面警告的问题
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
        // 按需加载ElementPlus
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [
                ElementPlusResolver({
                    // 自定义主题,引入sass
                    importStyle: "sass"
                })
            ],
        }),
    ].filter(Boolean),
    optimization: {
        // 压缩的操作
        minimize: isProduction,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin(),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminGenerate,
                    options: {
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            [
                                "svgo",
                                {
                                    plugins: [
                                        "preset-default",
                                        "prefixIds",
                                        {
                                            name: "sortAttrs",
                                            params: {
                                                xmlnsOrder: "alphabetical",
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
        ],
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vue: {
                    test: /[\\/]node_modules[\\/]vue(.*)?[\\/]/,
                    name: "vue-chunk",
                    priority: 40,
                },
                elementPlus: {
                    test: /[\\/]node_modules[\\/]element-plus[\\/]/,
                    name: "elementPlus-chunk",
                    priority: 30,
                },
                libs: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "libs-chunk",
                    priority: 20,
                },
            }

        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`,
        },
    },
    // webpack解析模块加载选项
    resolve: {
        // 自动补全文件拓展名
        extensions: [".vue", ".js", ".json"],
        // 路径别名
        alias: {
            "@": path.resolve(__dirname, "../src"),
        },
    },
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "cheap-module-source-map",
    devServer: {
        host: "localhost",
        port: 3000,
        open: false,
        hot: true, // 开启HMR
        historyApiFallback: true, // 解决前端路由刷新404问题
    },
    // 关闭性能分析，提升打包速度
    performance: false,
};
```

## 打包React的配置

```js
const path = require('path');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

// 返回处理样式loader
function getStylesLoader(pre) {
    return [
        "style-loader",
        "css-loader",
        {
            // 处理css兼容性问题
            // 配合package.json中browserslist来指定兼容性
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: ["postcss-preset-env"],
                },
            },
        },
        pre
    ].filter(Boolean);
}

modules.exports = {
    entry: "./src/main.js",
    output: {
        path: undefined,
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        assetModuleFilename: "static/media/[hash:10][ext][query]",
    },
    modules: {
        rules: [
            // 处理css
            {
                test: /\.css$/,
                use: getStylesLoader()
            },
            {
                test: /\.less$/,
                use: getStylesLoader("less-loader")
            },
            {
                test: /\.s[ac]ss$/,
                use: getStylesLoader("sass-loader")
            },
            {
                test: /\.styl$/,
                use: getStylesLoader("stylus-loader")
            },
            // 处理图片
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
            },
            // 处理其他资源
            {
                test: /\.(woff2?|ttf)$/,
                type: "asset/resource",
            },
            // 处理js
            {
                test: /\.(jsx|js)$/,
                include: path.resolve(__dirname, "../src"),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                },
            },
        ],
    },
    // 处理html
    plugins: [
        new EslintWebpackPlugin({
            context: path.resolve(__dirname, '../src'),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache')
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html")
        }),
    ],
    mode: "development",
    devtool: "cheap-module-source-map",
    optimization: {
        // 代码分割配置
        splitChunks: {
            chunks: "all",
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`
        },
    },
    devServer: {
        host: "localhost",
        port: 3000,
        open: false,
        hot: true
    }
};
```

