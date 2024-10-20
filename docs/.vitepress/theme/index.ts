import BlogTheme from '@sugarat/theme'
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import ImgBlur from './components/ImgBlur.vue'
import Player from './components/Player.vue'
import { h, render } from 'vue'

// 自定义样式重载
import './style.scss'

// pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// 自定义主题色
// import './user-theme.css'

export default {
  ...BlogTheme,
  enhanceApp({ app }) {
    app.use(pinia);
    app.component('ImgBlur', ImgBlur);
    app.component('Player', Player);
    const playerVNode = h(Player);
    // 将 VNode 渲染到指定的 DOM 容器中
    try {
      render(playerVNode, document.body);
    } catch (error) {
      console.log(error);
    }
  }
}
