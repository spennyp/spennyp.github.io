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

var geojson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-121.8081, 36.2704]
        },
        properties: {
            title: 'Big Sur Hike',
            description: 'California'
        }
    }],
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-121.8081, 36.2704]
        },
        properties: {
            title: 'Big Sur Hike',
            description: 'California'
        }
    }]
};

// add markers to map
geojson.features.forEach(function (marker) {
    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
        .addTo(map);
});

// disable map rotation using right click + drag
map.dragRotate.disable();
 
// disable map rotation using touch rotation gesture
map.touchZoomRotate.disableRotation();

map.on('load', function() {
    map.addSource('population', {
    'type': 'vector',
    'url': 'mapbox://mapbox.660ui7x6'
    });
     
    map.addLayer({
    'id': 'state-population',
    'source': 'population',
    'source-layer': 'state_county_population_2014_cen',
    'maxzoom': 1,
    'type': 'fill',
    'filter': ['==', 'isState', true],
    'paint': {
    'fill-color': [
    'interpolate',
    ['linear'],
    ['get', 'population'],
    0, '#F2F12D',
    500000, '#EED322',
    750000, '#E6B71E',
    1000000, '#DA9C20',
    2500000, '#CA8323',
    5000000, '#B86B25',
    7500000, '#A25626',
    10000000, '#8B4225',
    25000000, '#723122'
    ],
    'fill-opacity': 0.75
    }
    }, 'waterway-label');
});

// Add legend
// L.mapbox.legendControl().addLegend('<strong>My walk from the White House to the hill!</strong>').addTo(map);