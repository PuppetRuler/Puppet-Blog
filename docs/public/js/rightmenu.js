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

// 添加样式到文档
const styleElement = document.createElement('style');
styleElement.textContent = style;
document.head.appendChild(styleElement);

// 添加 HTML 结构
const menuHTML = `
<section class="darkmenu">
    <ul class="dark-menu-list">
        <li>
            <i class="iconfont icon-fuzhi"></i>
            <span class="menu-copy" onclick="copy()">Copy</span>
        </li>
        <li>
            <i class="iconfont icon-niantie"></i>
            <span class="menu-paste" onclick="paste()">Paste</span>
        </li>
        <li>
            <i class="iconfont icon-jianqie"></i>
            <span class="menu-cut">Cut</span>
        </li>
        <li>
            <i class="iconfont icon-xiazaidaoru"></i>
            <span class="menu-download">Download</span>
        </li>
        <li class="divider"></li>
        <li>
            <i class="iconfont icon-shanchu"></i>
            <span class="menu-delete">Delete</span>
        </li>
    </ul>
</section>
`;

const container = document.createElement('div');
container.innerHTML = menuHTML;
doc.body.appendChild(container.firstElementChild);

const darkmenu = doc.querySelector('.darkmenu');
const darkMenuList = doc.querySelector('.dark-menu-list');
const darkMenuItemList = doc.querySelectorAll('.dark-menu-list li');

// 监听右击事件
doc.body.addEventListener('contextmenu', (e) => {
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

// 复制功能
async function copy() {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    try {
      await navigator.clipboard.writeText(selectedText);
      alert('复制成功');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  } else {
    alert('No text selected');
  }
}

// 粘贴功能
async function paste() {
  try {
    const text = await navigator.clipboard.readText();
    document.getElementById('inputField').value = text;
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
  }
}

// 点击其他区域关闭菜单
doc.addEventListener('click', (e) => {
  darkMenuList.classList.remove('menu-show');
  darkMenuItemList.forEach(li => {
    li.classList.remove('menu-item-show');
  });
  darkmenu.style.display = "none";
});
