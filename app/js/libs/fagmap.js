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
 
function initMap(mapId, markerIconURL) { 
    if ($('#' + mapId).length > 0) { 
        window.fagMap = {}; 
        fagMap.settings = {}; 
        fagMap.markers = []; 
        fagMap.themes = {}; 
        fagMap.markersObjList = []; 
 
 
 
 
        fagMap.mapSettings = { 
            zoom: 12, 
            center: { 
                lat: 40.720, 
                lng: -73.996 
            }, 
            disableDefaultUI: true, 
            styles: map.themes.lightGray, 
            markerIcon: markerIconURL, 
            googleLogoDisable: true, 
            zoomControl: true 
        }; 
 
 
        fagMap.parseCord = function(str) { 
            var cords = str.split(','); 
 
            return { 
                lat: +cords[0], 
                lng: +cords[1] 
            }; 
        }; 
 
        fagMap.initMapData = function() { 
            var $dataMap = $('.data-map')[0], 
                $dataMarkers = $('.data-pointmarker'), 
                mapCords = $($dataMap).attr('data-cord'), 
                mapZoom = +$($dataMap).attr('data-zoom'); // str to number 
 
            if (!isNaN(mapZoom)) { 
                fagMap.mapSettings.zoom = mapZoom; 
            } 
 
            fagMap.mapSettings.center = fagMap.parseCord(mapCords); 
 
            for (var i = 0; i < $dataMarkers.length; i++) { 
                var obj = { 
                    cord: fagMap.parseCord($($dataMarkers[i]).attr('data-cord')), 
                    title: $($dataMarkers[i]).attr('data-title'), 
                    link: $($dataMarkers[i]).attr('data-link'), 
                    location: $($dataMarkers[i]).attr('data-location'), 
                    postNumber: $($dataMarkers[i]).attr('data-post-number'), 
                    position: fagMap.parseCord($($dataMarkers[i]).attr('data-cord')) 
                } 
                fagMap.markers.push(obj); 
            } 
        } 
 
        fagMap.addMarker = function(position) { 
            var marker = new google.maps.Marker({ 
                position: position, 
                icon: fagMap.mapSettings.markerIcon, 
                map: fagMap.map 
            }); 
            fagMap.markersObjList.push(marker); 
            return marker; 
        } 
 
        fagMap.setMarkers = function() { 
            //console.log(fagMap.markers); 
            for (var i = 0; i < fagMap.markers.length; i++) { 
 
                var marker, box, tmp; 
 
                marker = fagMap.addMarker(fagMap.markers[i].position); 
 
 
                //tmp = '<h3>' + fagMap.markers[i].title + '</h3><div class="infoBox__text">' + fagMap.markers[i].location + '</div><a href="' + fagMap.markers[i].link + '">' + fagMap.markers[i].postNumber + ' posts</a>'; 
 
                // box = new InfoBox({ 
                //     content: tmp, 
                //     disableAutoPan: false, 
                //     pixelOffset: new google.maps.Size(-95, 0), 
                //     boxStyle: { 
                //         opacity: 1, 
                //         width: "190px" 
                //     }, 
                //     closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif", 
                //     infoBoxClearance: new google.maps.Size(1, 1) 
                // }); 
 
                // google.maps.event.addListener(marker, 'click', function() { 
                //     $('.infoBox img').click(); 
                //     box.open(fagMap.map, this); 
                // }) 
            } 
 
        } 
 
        fagMap.initMapData(); 
        fagMap.mapDiv = document.getElementById(mapId); 
        fagMap.map = new google.maps.Map(fagMap.mapDiv, fagMap.mapSettings); 
        fagMap.setMarkers(); 
    }; 
} 
 
$(document).ready( 
    function() { 
 

 
        if($('#map').length>0) { 
 
            function init() { 
 
              var mapOptions = { 
                  zoom: 14, 
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
                  scale: 0, //tamaño 0 
                }, 
                map: myMap, 
                draggable: true, 
                labelAnchor: new google.maps.Point(40, 40), 
                labelClass: "marker-label", // the CSS class for the label 
              }); 
            } 
            google.maps.event.addDomListener(window, 'load', init); 
        } 
    } 
); 
