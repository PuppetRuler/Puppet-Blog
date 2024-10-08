import BlogTheme from '@sugarat/theme'
import ImgBlur from './components/ImgBlur.vue'

// 自定义样式重载
import './style.scss'

// 自定义主题色
// import './user-theme.css'

export default {
  ...BlogTheme,
  enhanceApp({ app }) {
    app.component('ImgBlur', ImgBlur)
  }
}
