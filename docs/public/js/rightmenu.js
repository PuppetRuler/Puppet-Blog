// rightmenu.js

const doc = document;

// 添加样式
const style = `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.darkmenu {
    height: 100%;
    position: relative;
}

.darkmenu {
    flex: 1;
}

.dark-menu-list {
    list-style: none;
    background: linear-gradient(
        -45deg,
        rgba(10, 20, 28, 0.2) 0%,
        rgba(10, 20, 28, 0.7) 50%
    );
    border: none;
    border-radius: 6px;
    backdrop-filter: blur(5px);
    overflow: hidden;
    position: fixed;
    top: 100px;
    left: 100px;
    z-index: 999;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08),
                0 2px 2px rgb(0 0 0 / 3%),
                0 4px 4px rgb(0 0 0 / 4%),
                0 10px 8px rgb(0 0 0 / 5%),
                0 15px 15px rgb(0 0 0 / 6%),
                0 30px 30px rgb(0 0 0 / 7%),
                0 70px 65px rgb(0 0 0 / 9%);
    transform-origin: top left;
    transform: scale(0.5);
    height: 0;
    transition: transform .2s ease-in-out,
                height .3s ease-in-out,
                opacity .3s ease-in-out;
}

.dark-menu-list li:not(.divider) {
    border-radius: 4px;
    padding: 10px 30px 9px 11px;
    font-size: 14px;
    user-select: none;
    cursor: pointer;
    color: #fff;
}

.dark-menu-list li:not(.divider) span {
    margin-left: 4px;
}

.dark-menu-list li:not(.divider):hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.dark-menu-list li.divider {
    height: 1px;
    background-color: rgba(255, 255, 255, 0.1);
    user-select: none;
}

.dark-menu-list li {
    opacity: 0;
    transform: translateX(-30px);
    transition: opacity .2s ease-in-out,
                transform .3s ease-in-out;
}

.dark-menu-list.menu-show {
    opacity: 1;
    height: var(--height);
    transform: scale(1);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark-menu-list li.menu-item-show {
    opacity: 1;
    transform: translateX(0px);
}
`;



// 添加 HTML 结构
const menuHTML = `
<section class="darkmenu">
    <ul class="dark-menu-list">
        <li onclick="copy()">
            <span class="menu-copy">复制内容</span>
        </li>
        <li class="divider"></li>
        <li onclick="changeBackground()">
            <span class="change-background">切换背景图</span>
        </li>
        <li class="divider"></li>
        <li onclick="copyAddress()">
            <span class="copy-address">复制本页地址</span>
        </li>
</section>
`;


const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// 电脑端代码
if (!isMobile) {
  // 添加样式到文档
  const styleElement = document.createElement('style');
  styleElement.textContent = style;
  document.head.appendChild(styleElement);

  // 添加HTML到文档
  const container = document.createElement('div');
  container.innerHTML = menuHTML;
  doc.body.appendChild(container.firstElementChild);

  const darkmenu = doc.querySelector('.darkmenu');
  const darkMenuList = doc.querySelector('.dark-menu-list');
  const darkMenuItemList = doc.querySelectorAll('.dark-menu-list li');
  darkmenu.style.opacity = '0';

  // 监听右击事件
  doc.body.addEventListener('contextmenu', (e) => {
    darkmenu.style.opacity = '1';
    darkmenu.style.display = "block";
    e.preventDefault();

    const { clientX, clientY } = e;

    darkMenuList.setAttribute('style', `--width: ${darkMenuList.scrollWidth}; --height: ${darkMenuList.scrollHeight}`);
    darkMenuList.style.top = clientY + 'px';
    darkMenuList.style.left = clientX + 'px';

    darkMenuList.classList.add('menu-show');
    darkMenuItemList.forEach(li => {
      li.classList.add('menu-item-show');
    });
  });

  // 点击其他区域关闭菜单
  doc.addEventListener('click', (e) => {
    darkMenuList.classList.remove('menu-show');
    darkMenuItemList.forEach(li => {
      li.classList.remove('menu-item-show');
    });
    darkmenu.style.display = "none";
  });
}

// 复制功能
const copy = async () => {
  var textToCopy = window.getSelection();
  try {
    await navigator.clipboard.writeText(textToCopy);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

const images = [
  'https://fastly.jsdelivr.net/gh/PuppetRuler/drawing-board@main/images/1724780835507large_evb08_a.jpg',
  'https://fastly.jsdelivr.net/gh/PuppetRuler/drawing-board@main/images/1724787392341%E3%81%9D%E3%81%AE%E4%BB%96_%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%93%E3%82%B8%E3%83%A5%E3%82%A2%E3%83%AB%E8%A3%8F_01.jpg',
  'https://fastly.jsdelivr.net/gh/PuppetRuler/drawing-board@main/images/1724787326109%E3%81%9D%E3%81%AE%E4%BB%96_%E3%82%AD%E3%83%A3%E3%83%A9%E7%B4%B9%E4%BB%8B%EF%BC%9A%E3%83%9F%E3%83%AA%E3%83%A3_01.jpg',
  'https://fastly.jsdelivr.net/gh/PuppetRuler/drawing-board@main/images/1724787637521%E3%82%A2%E3%82%A4_%E5%A4%A2%E3%81%AE%E7%B5%82%E3%82%8F%E3%82%8A%E3%81%AB%EF%BC%88%E6%B5%81%E8%8A%B1%E3%83%BB%E3%82%82%E3%82%82%EF%BC%89_01.jpg',
  'https://fastly.jsdelivr.net/gh/PuppetRuler/drawing-board@main/images/1724780599506large_eva04_a.jpg',
  'https://fastly.jsdelivr.net/gh/PuppetRuler/drawing-board@main/images/1724778936500large_Ren_01d.png',
  'https://fastly.jsdelivr.net/gh/PuppetRuler/drawing-board@main/images/1724779116501large_Syugou_01a.png',
  'https://fastly.jsdelivr.net/gh/PuppetRuler/drawing-board@main/images/1724778729498large_Haru_03b.png',
  'https://fastly.jsdelivr.net/gh/PuppetRuler/drawing-board@main/images/1724780878506large_evc05_a.jpg',
  '/img/bg.jpg'
];

let currentIndex = 0;
let vpHome = document.querySelector('.VPHome');
const preloadedImages = [];

// 预加载当前和下一张图片
function preloadImages() {
  const img1 = new Image();
  img1.src = images[currentIndex];
  console.log(img1.src);
  preloadedImages.push(img1);

  const nextIndex = (currentIndex + 1) % images.length;
  const img2 = new Image();
  img2.src = images[nextIndex];
  preloadedImages.push(img2);
  console.log(img2.src);
}

// 更换背景图
function changeBackground() {
  if (vpHome) {
    vpHome.style.setProperty('--bg-image', `url(${images[currentIndex]})`);
    currentIndex = (currentIndex + 1) % images.length; // 循环索引
    preloadImages(); // 预加载下一个背景图
  }
}
// 预加载
preloadImages();

const copyAddress = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};