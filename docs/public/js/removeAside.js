const removeButtonHTML = `
<span id="closeButton"><i></i></span>
`;

let isMob = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
// 电脑端代码
if (!isMob) {
  let b = document.createElement('div');
  b.innerHTML = removeButtonHTML;
  doc.body.appendChild(b.firstElementChild);

  let closeButton = document.getElementById('closeButton');
  closeButton.firstChild.classList.add("iconfont");
  closeButton.firstChild.classList.add("icon-yueduye-mulu");
  closeButton.firstChild.classList.add("el-icon");

  let VPLocalNav;
  let VPDoc;
  let VPContent;
  let VPNavBarTitle;
  let asideElement;
  closeButton.addEventListener('click', function () {
    VPLocalNav = document.querySelector('.VPLocalNav');
    VPDoc = document.querySelector('.VPDoc');
    asideElement = document.querySelector('.VPSidebar');
    VPContent = document.querySelector('.VPContent');
    VPNavBarTitle = document.querySelector('.VPNavBarTitle');
    if (asideElement.style.transform != 'translateX(-100%)') {
      VPLocalNav.classList.remove('has-sidebar');
      VPContent.classList.remove('has-sidebar');
      VPDoc.classList.remove('has-sidebar');
      VPNavBarTitle.classList.remove('has-sidebar');
      VPDoc.classList.remove('has-aside');
      // 隐藏 aside 元素
      if (asideElement) {
        asideElement.style.transform = 'translateX(-100%)';
      }
    } else {
      VPLocalNav.classList.add('has-sidebar');
      VPContent.classList.add('has-sidebar');
      setTimeout(() => {
        VPNavBarTitle.classList.add('has-sidebar');
      }, 500);
      VPDoc.classList.add('has-sidebar');
      VPDoc.classList.add('has-aside');
      // 恢复 aside 元素位置
      if (asideElement) {
        asideElement.style.transform = 'translateX(0)';
      }
    }
  });
}

document.querySelector('.title').addEventListener('onclick', () => {
  if (document.querySelector('.VPLocalNav') && document.querySelector('.VPContent') && document.querySelector('.VPDoc').classList.remove('Doc_Transform') && document.querySelector('.VPNavBarTitle').classList.remove('Doc_Transform')) {
    document.querySelector('.VPLocalNav').classList.remove('Doc_Transform');
    document.querySelector('.VPContent').classList.remove('Doc_Transform');
    document.querySelector('.VPDoc').classList.remove('Doc_Transform');
    document.querySelector('.VPNavBarTitle').classList.remove('Doc_Transform');
  }
});