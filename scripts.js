function changeColor() { 
    var colors = ["salmon", "aqua","yellow"],
    selectedColor = colors[Math.floor(Math.random()*colors.length)]
    document.body.style.backgroundColor = selectedColor;
}
