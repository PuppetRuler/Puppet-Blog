import { defineConfig } from 'vitepress'

// 导入主题的配置
import { blogTheme } from './blog-theme'

// 如果使用 GitHub/Gitee Pages 等公共平台部署
// 通常需要修改 base 路径，通常为“/仓库名/”
// 如果项目名已经为 name.github.io 域名，则不需要修改！
// const base = process.env.GITHUB_ACTIONS === 'true'
//   ? '/vitepress-blog-sugar-template/'
//   : '/'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls: true,
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  // base,
  lang: 'zh-cn',
  title: '傀儡小屋',
  description: '傀儡师的个人博客',
  lastUpdated: true,
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    // ['link', { rel: 'icon', href: `${base}favicon.ico` }], // 修改了 base 这里也需要同步修改
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', { src: '/js/title.js' }],
    ['script', { src: '/js/rightmenu.js', defer: 'true' }],
    ['script', { src: '/js/cancel-canvas.js', defer: 'true' }],
    ['script', { src: '/js/removeAside.js', defer: 'true' }]
  ],
  // markdown配置
  markdown: {
    math: true,
    image: {
      lazyLoading: true
    },
  },
  themeConfig: {
    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 3],
      label: '目录'
    },
    // 默认文案修改
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '相关文章',
    lastUpdatedText: '上次更新于',

    // 设置logo
    logo: '/img/logo.webp',
    // editLink: {
    //   pattern:
    //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
    //   text: '去 GitHub 上编辑内容'
    // },
    nav: [
      {
        text: '前端',
        items: [
          { text: '笔记', link: '/Front_End/Notes/index.md' },
          { text: '踩坑日常', link: '/Front_End/Mistakes/index.md' },
          { text: '奇技淫巧', link: '/Front_End/Skills/index.md' }
        ]
      },
      { text: 'Modern Design', link: '/Modern_Design/index.md' },
      { text: 'Android', link: '/Android/index.md' },
      { text: 'HarmonyOS', link: '/HarmonyOS/index.md' },
      {
        text: '逆向学习',
        items: [
          { text: '逆向技巧', link: '/Reverse/Skills/index.md' },
          { text: '逆向工具', link: '/Reverse/Tools/index.md' }
        ]
      },
      {
        text: 'Java笔记',
        items: [
          { text: '笔记', link: '/Java/Notes/index.md' },
        ]
      },
      {
        text: '工具使用',
        items: [
          { text: '安卓工具', link: '/Tools/Android' },
          { text: '电脑工具', link: '/Tools/PC' },
          { text: 'Galgame工具', link: '/Tools/Galgame' },
        ]
      },
      { text: '杂谈', link: '/Chats/index.md' },
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/PuppetRuler'
      }
    ]
  }
})
