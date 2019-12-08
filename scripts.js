function toggleMenu(x) {
  x.classList.toggle("change"); 
  var items = document.getElementById("myTopnav");
  if (items.className === "topnav") {
    items.className += " responsive";
  } else {
    items.className = "topnav";
  } 
}

// Auto formatting code blocks
$(document).ready(function() { 
  $("pre code").each(function(){
    var html = $(this).html();
    var pattern = html.match(/\s*\n[\t\s]*/);
    $(this).html(html.replace(new RegExp(pattern, "g"),'\n'));
  });
});

$(document).ready(function() { 
  $("#teslaDescriptionButton").click(function() { 
      $("#teslaDescription").slideToggle(); 
  }); 
});

$(document).ready(function() { 
  $("#supermileageDescriptionButton").click(function() { 
      $("#supermileageDescription").slideToggle(); 
  }); 
});

$(document).ready(function() { 
  $("#hydroDescriptionButton").click(function() { 
      $("#hydroDescription").slideToggle(); 
  }); 
});

$(document).ready(function() { 
  $("#robotDescriptionButton").click(function() { 
      $("#robotDescription").slideToggle(); 
  }); 
});

$(document).ready(function() { 
  $("#logicDescriptionButton").click(function() { 
      $("#logicDescription").slideToggle(); 
  }); 
});

$(document).ready(function() { 
  $("#cuttingEdgeDescriptionButton").click(function() { 
      $("#cuttingEdgeDescription").slideToggle(); 
  }); 
});

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1Ijoic3Blbm55cDMiLCJhIjoiY2pnb2I2azZ4MjI3ZjJ4cW4ycGR0djN6NiJ9.ZMKwiY9LeX2fWuWQ9fEWUw';
var map = new mapboxgl.Map({
  container: 'testId',
  style: 'mapbox://styles/mapbox/streets-v11'
});

$(document).ready(function() { 
  $("pre code").each(function(){
    var html = $(this).html();
    var pattern = html.match(/\s*\n[\t\s]*/);
    $(this).html(html.replace(new RegExp(pattern, "g"),'\n'));
  });
});

