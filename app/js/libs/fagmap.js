"use strict"; 
 
window.map = {}; 
map.themes = {}; 
map.themes.lightGray = [{ 
    "featureType": "water", 
    "elementType": "geometry", 
    "stylers": [{ 
        "color": "#e9e9e9" 
    }, { 
        "lightness": 22 
    }] 
}, { 
    "featureType": "landscape", 
    "elementType": "geometry", 
    "stylers": [{ 
        "color": "#f5f5f5" 
    }, { 
        "lightness": 20 
    }] 
}, { 
    "featureType": "road.highway", 
    "elementType": "geometry.fill", 
    "stylers": [{ 
        "color": "#ffffff" 
    }, { 
        "lightness": 17 
    }] 
}, { 
    "featureType": "road.highway", 
    "elementType": "geometry.stroke", 
    "stylers": [{ 
        "color": "#ffffff" 
    }, { 
        "lightness": 29 
    }, { 
        "weight": 0.2 
    }] 
}, { 
    "featureType": "road.arterial", 
    "elementType": "geometry", 
    "stylers": [{ 
        "color": "#ffffff" 
    }, { 
        "lightness": 18 
    }] 
}, { 
    "featureType": "road.local", 
    "elementType": "geometry", 
    "stylers": [{ 
        "color": "#ffffff" 
    }, { 
        "lightness": 16 
    }] 
}, { 
    "featureType": "poi", 
    "elementType": "geometry", 
    "stylers": [{ 
        "color": "#f5f5f5" 
    }, { 
        "lightness": 21 
    }] 
}, { 
    "featureType": "poi.park", 
    "elementType": "geometry", 
    "stylers": [{ 
        "color": "#dedede" 
    }, { 
        "lightness": 21 
    }] 
}, { 
    "elementType": "labels.text.stroke", 
    "stylers": [{ 
        "visibility": "on" 
    }, { 
        "color": "#ffffff" 
    }, { 
        "lightness": 16 
    }] 
}, { 
    "elementType": "labels.text.fill", 
    "stylers": [{ 
        "saturation": 26 
    }, { 
        "color": "#777777" 
    }, { 
        "lightness": 40 
    }] 
}, { 
    "elementType": "labels.icon", 
    "stylers": [{ 
        "visibility": "off" 
    }] 
}, { 
    "featureType": "transit", 
    "elementType": "geometry", 
    "stylers": [{ 
        "color": "#f2f2f2" 
    }, { 
        "lightness": 19 
    }] 
}, { 
    "featureType": "administrative", 
    "elementType": "geometry.fill", 
    "stylers": [{ 
        "color": "#fefefe" 
    }, { 
        "lightness": 20 
    }] 
}, { 
    "featureType": "administrative", 
    "elementType": "geometry.stroke", 
    "stylers": [{ 
        "color": "#fefefe" 
    }, { 
        "lightness": 17 
    }, { 
        "weight": 1.2 
    }] 
}]; 

 

if($('#map').length>0) { 
    var map;
    function initMap() { 
      var mapOptions = { 
          zoom: 14, 
          draggable: !("ontouchend" in document),
          center: new google.maps.LatLng(40.7175099, -73.9909217), 
          mapTypeId: google.maps.MapTypeId.ROADMAP, 
          disableDefaultUI: true, 
          styles: map.themes.lightGray 
      }; 

      var myMap = new google.maps.Map(document.getElementById('map'), mapOptions); 

      var marker = new MarkerWithLabel({ 
        position: myMap.getCenter(), 
        icon: { 
          path: google.maps.SymbolPath.CIRCLE, 
          scale: 0,
        }, 
        map: myMap, 
        draggable: false, 
        labelAnchor: new google.maps.Point(40, 40), 
        labelClass: "marker-label", 
      }); 
    }
    // initMap() 

    google.maps.event.addDomListener(window, 'load', initMap); 
} 
