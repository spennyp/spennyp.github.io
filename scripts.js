function toggleMenu(x) {
  x.classList.toggle("change"); 
  var items = document.getElementById("myTopnav");
  if (items.className === "topnav") {
    items.className += " responsive";
  } else {
    items.className = "topnav";
  } 
}

$(document).ready(function() { 
  $("#teslaDetailsButton").click(function() { 
      $("#teslaDetails").slideToggle(); 
  }); 
});

$(document).ready(function() { 
  $("#supermileageDetailsButton").click(function() { 
      $("#supermileageDetails").slideToggle(); 
  }); 
});

$(document).ready(function() { 
  $("#hydroDetailsButton").click(function() { 
      $("#hydroDetails").slideToggle(); 
  }); 
});

$(document).ready(function() { 
  $("#robotCompDetailsButton").click(function() { 
      $("#robotCompDetails").slideToggle(); 
  }); 
});

$(document).ready(function() { 
  $("#logicAndFormDetailsButton").click(function() { 
      $("#logicAndFormDetails").slideToggle(); 
  }); 
});

$(document).ready(function() { 
  $("#cuttingEdgeDetailsButton").click(function() { 
      $("#cuttingEdgeDetails").slideToggle(); 
  }); 
});


var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1Ijoic3Blbm55cDMiLCJhIjoiY2pnb2I2azZ4MjI3ZjJ4cW4ycGR0djN6NiJ9.ZMKwiY9LeX2fWuWQ9fEWUw';
var map = new mapboxgl.Map({
  container: 'testId',
  style: 'mapbox://styles/mapbox/streets-v11'
});



