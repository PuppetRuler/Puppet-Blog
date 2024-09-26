const removeButtonHTML = `
<i id="closeButton"></i>
`;

// 电脑端代码
if (!window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  let b = document.createElement('div');
  b.innerHTML = removeButtonHTML;
  doc.body.appendChild(b.firstElementChild);

  let closeButton = document.getElementById('closeButton');
  closeButton.classList.add("iconfont");
  closeButton.classList.add("icon-yueduye-mulu");
  closeButton.classList.add("el-icon");

  let VPLocalNav;
  let VPDoc;
  let VPContent;
  let asideElement;
  closeButton.addEventListener('click', function () {
    VPLocalNav = document.querySelector('.VPLocalNav');
    VPDoc = document.querySelector('.VPDoc');
    asideElement = document.querySelector('.VPSidebar');
    VPContent = document.querySelector('.VPContent');
    if (asideElement.style.transform != 'translateX(-300px)') {
      VPLocalNav.classList.remove('has-sidebar');
      VPContent.classList.remove('has-sidebar');
      VPDoc.classList.remove('has-sidebar');
      VPDoc.classList.remove('has-aside');
      // 隐藏 aside 元素
      if (asideElement) {
        asideElement.style.transform = 'translateX(-300px)';
      }
    } else {
      VPLocalNav.classList.add('has-sidebar');
      VPContent.classList.add('has-sidebar');
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
  document.querySelector('.VPLocalNav').classList.remove('Doc_Transform');
  document.querySelector('.VPContent').classList.remove('Doc_Transform');
  document.querySelector('.VPDoc').classList.remove('Doc_Transform');
});