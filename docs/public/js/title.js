document.addEventListener("visibilitychange",() => {
  if(document.visibilityState === "visible"){
      document.title = "Ciallo～(∠・ω< )⌒☆."
  }else if(document.visibilityState === "hidden"){
      document.title = "你要去哪里？(。・∀・)ノ"
  }
})