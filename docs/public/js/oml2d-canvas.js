let stage;
let homePage;
const observer = new MutationObserver(() => {
  stage = document.querySelector("#oml2d-stage");
  homePage = document.querySelector(".VPHome");
  if(stage){
    if (!homePage) {
      stage.style.zIndex = '-10'
    } else {
      stage.style.zIndex = '9998';
    }
  }
});

// 配置观察器
observer.observe(document, { childList: true, subtree: true });