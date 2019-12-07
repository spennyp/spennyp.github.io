mapboxgl.accessToken = 'pk.eyJ1Ijoic3Blbm55cDMiLCJhIjoiY2pnb2I2azZ4MjI3ZjJ4cW4ycGR0djN6NiJ9.ZMKwiY9LeX2fWuWQ9fEWUw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-55, 55],
    zoom: 2.5
});
map.addControl(new mapboxgl.NavigationControl());
var layerList = document.getElementById('menu');
map.setStyle('mapbox://styles/mapbox/dark-v10');


$(document).ready(function() { 
    $("#travelToggle").click(function() { 
        if ($('#travelCheckbox').is(':checked')) {
            $("#travelCheckbox").prop('checked', false)
            $(".travelMarker").toggleClass("travelMarker mapboxgl-marker mapboxgl-marker-anchor-center travelMarkerHidden hidden");
        } else {
            $("#travelCheckbox").prop('checked', true)
            $(".travelMarkerHidden").toggleClass("hidden travelMarkerHidden travelMarker mapboxgl-marker mapboxgl-marker-anchor-center");
        }
    }); 
});

$(document).ready(function() { 
    $("#jobToggle").click(function() { 
        if ($('#jobCheckbox').is(':checked')) {
            $("#jobCheckbox").prop('checked', false)
            $(".jobMarker").toggleClass("jobMarker mapboxgl-marker mapboxgl-marker-anchor-center jobMarkerHidden hidden");
        } else {
            $("#jobCheckbox").prop('checked', true)
            $(".jobMarkerHidden").toggleClass("hidden jobMarkerHidden jobMarker mapboxgl-marker mapboxgl-marker-anchor-center");
        }
    }); 
});



var jobGeoJson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-119.440, 39.538]
        },
        properties: {
            title: 'Tesla Gigafactory 1',
            description: 'Production Engineering Intern for model 3 battery pack',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-122.9571, 49.2111]
        },
        properties: {
            title: 'BC Hydro Edmonds',
            description: 'Electrical Engineering Intern, Power Distrubtion Planning',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-123.1147, 49.2838]
        },
        properties: {
            title: 'Logic&Form',
            description: 'Software Engineering Intern',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-63.629, 44.8142]
        },
        properties: {
            title: 'Cutting Edge Lawn and Landscape',
            description: 'Founder and Owner',
            date: "Nov 1, 2019"
        }
    }]
};

var travelGeoJson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-121.8081, 36.2704]
        },
        properties: {
            title: 'Big Sur',
            description: 'Weekend backpacking trip',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-0.1276, 51.5073]
        },
        properties: {
            title: 'London, England',
            description: 'Europe Trip 2016',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-1.57854, 52.2851]
        },
        properties: {
            title: 'Warwick, England',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-2.991665, 53.407154]
        },
        properties: {
            title: 'Liverpool, England',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-1.0815361, 53.9590555]
        },
        properties: {
            title: 'York, England',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-3.1883749, 55.9533456]
        },
        properties: {
            title: 'Edinburgh, Scotland',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-4.2501693, 55.8611443]
        },
        properties: {
            title: 'Glasgow, Scotland',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-3.9360012, 56.1181242]
        },
        properties: {
            title: 'Striling, Scotland',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [0.1626687, 43.0939831]
        },
        properties: {
            title: 'Oban, Scotland',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-5.9302761, 54.5964411]
        },
        properties: {
            title: 'Belfast, Northern Ireland',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-6.2602732, 53.3497645]
        },
        properties: {
            title: 'Dublin, Ireland',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [2.2985748, 48.8738419]
        },
        properties: {
            title: 'Carfif, Whales',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-0.3690815, 49.1828008]
        },
        properties: {
            title: 'Caen, France',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-1.5541362, 47.2186371]
        },
        properties: {
            title: 'Nantes, France',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-0.5800364, 44.841225]
        },
        properties: {
            title: 'Bordeaux, France',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-1.475099, 43.4933379]
        },
        properties: {
            title: 'Bayonne and Biarittz, France',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-1.475099, 43.4933379]
        },
        properties: {
            title: 'San Sebastian, Spain',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-2.9349915, 43.2630051]
        },
        properties: {
            title: 'Bilbao, Spain',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-3.7035825, 40.4167047]
        },
        properties: {
            title: 'Madrid, Spain',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [2.1774322, 41.3828939]
        },
        properties: {
            title: 'Barcelona, Spain',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [12.3345898, 45.4371908]
        },
        properties: {
            title: 'Venice, Italy',
            description: '',
            date: "Nov 1, 2019"
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [2.3514616, 48.8566969]
        },
        properties: {
            title: 'Paris, France',
            description: '',
            date: "Nov 1, 2019"
        }
    }]
};

// add job markers to map
jobGeoJson.features.forEach(function (marker) {
    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'jobMarker';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p><p>' + marker.properties.date + '</p>' + '<button type="button" class="jobMoreInfoButton moreInfoButton" data-toggle="modal" data-target="#myModal">More info</button>'))
        .addTo(map);
});

// add travel markers to map
travelGeoJson.features.forEach(function (marker) {
    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'travelMarker';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p><p>' + marker.properties.date + '</p>' + '<button type="button" class="travelMoreInfoButton moreInfoButton" data-toggle="modal" data-target="#myModal">More info</button>'))
        .addTo(map);
});

// disable map rotation using right click + drag
map.dragRotate.disable();
 
// disable map rotation using touch rotation gesture
map.touchZoomRotate.disableRotation();
