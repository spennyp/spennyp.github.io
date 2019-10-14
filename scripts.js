function changeColor() { 
    var colors = ["salmon", "aqua","yellow","#cc99ff","#99ffcc","#ffff99"],
    selectedColor = colors[Math.floor(Math.random()*colors.length)]
    document.body.style.backgroundColor = selectedColor;
    animate();
}

var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var tx = window.innerWidth;
var ty = window.innerHeight;
canvas.width = tx;
canvas.height = ty;

var mousex = 0;
var mousey = 0;

addEventListener("mousemove", function() {
  mousex = event.clientX;
  mousey = event.clientY;
});


var grav = 0.99;
c.strokeWidth=5;
function randomColor() {
  return (
    "rgba(" +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.ceil(Math.random() * 10) / 10 +
    ")"
  );
}

function Ball() {
  this.color = randomColor();
  this.radius = Math.random() * 20 + 14;
  this.startradius = this.radius;
  this.x = Math.random() * (tx - this.radius * 2) + this.radius;
  this.y = Math.random() * (ty - this.radius);
  this.dy = Math.random() * 2;
  this.dx = Math.round((Math.random() - 0.5) * 10);
  this.vel = Math.random() /5;
  this.update = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();
  };
}

var bal = [];
for (var i=0; i<50; i++){
    bal.push(new Ball());
}

function animate() {
  if (tx != window.innerWidth || ty != window.innerHeight) {
    tx = window.innerWidth;
    ty = window.innerHeight;
    canvas.width = tx;
    canvas.height = ty;
  }
  requestAnimationFrame(animate);
  c.clearRect(0, 0, tx, ty);
  for (var i = 0; i < bal.length; i++) {
    bal[i].update();
    bal[i].y += bal[i].dy;
    bal[i].x += bal[i].dx;
    if (bal[i].y + bal[i].radius >= ty) {
      bal[i].dy = -bal[i].dy * grav;
    } else {
      bal[i].dy += bal[i].vel;
    }
    if(bal[i].x + bal[i].radius > tx || bal[i].x - bal[i].radius < 0){
        bal[i].dx = -bal[i].dx;
    }
    if(mousex > bal[i].x - 20 &&
      mousex < bal[i].x + 20 &&
      mousey > bal[i].y -50 &&
      mousey < bal[i].y +50 &&
      bal[i].radius < 70){
        //bal[i].x += +1;
        bal[i].radius +=5;
      } else {
        if(bal[i].radius > bal[i].startradius){
          bal[i].radius += -5;
        }
      }
    }
}

setInterval(function() {
  bal.push(new Ball());
  bal.splice(0, 1);
}, 400);

function toggleMenu(x) {
  x.classList.toggle("change"); 
  var items = document.getElementById("myTopnav");
  if (items.className === "topnav") {
    items.className += " responsive";
  } else {
    items.className = "topnav";
  } 
}

function toggleButton(x) {
  x.classList.toggle("change"); 
}

$('#teslaDetailsButton').click(function(){
    $('#teslaDetails').slideToggle(600);
});

$('#bcHydroDetailsButton').click(function(){
  $('#bcHydroDetails').slideToggle(600);
});

$('#logicAndFormDetailsButton').click(function(){
  $('#logicAndFormDetails').slideToggle(600);
});

$('#supermileageDetailsButton').click(function(){
  $('#supermileageDetails').slideToggle(600);
});

$('#robotCompDetailsButton').click(function(){
  $('#robotCompDetails').slideToggle(600);
});

$('#cuttingEdgeDetailsButton').click(function(){
  $('#cuttingEdgeDetails').slideToggle(600);
});

$(window).resize(function() {
  if(window.width > 1000) {
    $('#teslaDetails').slideDown(600)
  } 
});

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1Ijoic3Blbm55cDMiLCJhIjoiY2pnb2I2azZ4MjI3ZjJ4cW4ycGR0djN6NiJ9.ZMKwiY9LeX2fWuWQ9fEWUw';
var map = new mapboxgl.Map({
  container: 'testId',
  style: 'mapbox://styles/mapbox/streets-v11'
});



