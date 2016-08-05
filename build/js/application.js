/**================================================
JS : MY CUSTOM SCRIPTS
===================================================*/

var header = $('.header'),
    paralaxBlock,
    scrollTop = $(window).scrollTop(),
    blackAreaList = [],
    DARK_AREA_ITEMS = '.is-dark-area',
    articles = {
        currentArticle: 0,
        nextArticle: 1,
        listOffset: []
    };


function setCurrentArticles(scrollTop) {
    var topIndent = 200;
    for (var i = articles.listOffset.length; i > 0; i--) {
        if ((scrollTop) > (articles.listOffset[i] - topIndent)) {
            break;
        };
    }

    if (!(articles.currentArticle === i)) {
        articles.currentArticle = i;
        articles.nextArticle = i + 1;
        $('.number-widget__current').text(i + 1);

        $(articles.articlesList).addClass('hidden');
        $(articles.articlesList[articles.currentArticle]).removeClass('hidden');
    }
}

function getListOffset() {
    var l = articles.itemList.length;
    articles.listOffset = [];
    for (var i = 0; i < l; i++) {
        articles.listOffset.push($(articles.itemList[i]).offset().top);
    }
}

function initPagination() {
    articles.itemList = $('.projects-list__item');
    articles.articlesList = $('.project-article');

    $('.number-widget__all').text(articles.itemList.length);

    getListOffset();
    setCurrentArticles($(window).scrollTop());

    $(articles.articlesList).addClass('hidden');
    $(articles.articlesList[articles.currentArticle]).removeClass('hidden');

    $(window).scroll(function() {
        setCurrentArticles($(window).scrollTop());
    })

    $(window).resize(function() {
        getListOffset();
        setCurrentArticles($(window).scrollTop());
    })
}


function initForm() {
    if ($('.hire-form-wrapper').length > 0) {
        $(document).ready(function() {
            $('.hire-form-wrapper').find('.form__submit').click(function() {
                $('.form').hide();
                $('.hire-success').show();
                goToSelector('body', 300)
                return false;
            });
        })
    }
}

function initHeaderBlockParalax(selector) {
    if ($(selector).length > 0) {
        paralaxBlock = $(selector);
        $(window).scroll(function() {
            $(paralaxBlock).css('transform', 'translateY(' + $(window).scrollTop() / 2 + 'px)');
            if ($(window).scrollTop() > window.innerHeight / 2.4) {
                paralaxBlock.addClass('hidden');
            } else {
                paralaxBlock.removeClass('hidden');
            }
        });
    }
}

function initAllAnchor(selector) {
    $(document).ready(
        $(selector).click(function(event) {
            event.preventDefault();
            var url = $(this).attr('href');
            goToSelector(url, 750)
        })
    );
}

function goToSelector(selector, time) {
    $('html, body').animate({
        scrollTop: $(selector).offset().top
    }, time);
}

function initMenuToggle() {
    $('.mobile-toggle').click(function(event) {
        $(this).toggleClass('open');
        $('.header__nav').toggle();
    });
}

function videoMobilePause() {
    if ($('.bg-video').length>0) {
        $(window).resize(function(event) {

            if($(window).width()<1000) {
                $('.bg-video').hide().get(0).pause();
            } else {
                $('.bg-video').show().get(0).play();
            }
        }).resize();
    }

}


function colorHeader() {
    $(window).scroll(function(event) {
        var scroll = $(this).scrollTop();
        var scrollColor = $('.hero-section').height();
        if (scroll>=scrollColor) {
            $('.header').addClass('header-dark');
        }
        else {
            $('.header').removeClass('header-dark');
        }
    });
}

function showProjects() {
    var total = $('.hidden-projects').length;
    var count = 1;
    $('#showProjects').click(function(event) {
        $('.hidden-projects').eq(count-1).fadeIn(500);
        count++;
        if (count==total+1) {
            $(this).remove();
        }
    });
}

function initEvents() {
    initAllAnchor('.anchor-js');
    videoMobilePause();
    initMenuToggle();
    colorHeader();
    showProjects();
    initHeaderBlockParalax(".hero-section__paralax-block");
    if ($('.home').length > 0) {
    } else {
        initForm();
    }

    // initHeaderColoring();
}




initEvents();



// Hard code for map marker animation
$(window).scroll(function(event) {
    scroll = $(window).scrollTop();
    if ( scroll+50 >= $('#map').offset().top && scroll <= $('#map').offset().top + $('#map').innerHeight() ) {
        $('.marker-label').addClass('animate')
    }
    else {
        $('.marker-label').removeClass('animate')
    }
});

var coverVid=function(a,b,c){function d(a,b){var c=null;return function(){var d=this,e=arguments;window.clearTimeout(c),c=window.setTimeout(function(){a.apply(d,e)},b)}}function e(){var d=a.parentNode.offsetHeight,e=a.parentNode.offsetWidth,f=b,g=c,h=d/g,i=e/f;i>h?(a.style.height="auto",a.style.width=e+"px"):(a.style.height=d+"px",a.style.width="auto")}document.addEventListener("DOMContentLoaded",e),window.addEventListener("resize",d(e,50)),a.style.position="absolute",a.style.top="50%",a.style.left="50%",a.style["-webkit-transform"]="translate(-50%, -50%)",a.style["-ms-transform"]="translate(-50%, -50%)",a.style.transform="translate(-50%, -50%)",a.parentNode.style.overflow="hidden";var f=a.getAttribute("poster");a.removeAttribute("poster"),a.parentNode.style.backgroundImage="url("+f+")",a.parentNode.style.backgroundSize="cover",a.parentNode.style.backgroundPosition="center center";var g="undefined"!=typeof a.canPlayType?!0:!1,h=!1;(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))&&(h=!0),(!g||h)&&a&&a.parentNode&&a.parentNode.removeChild(a)};window.jQuery&&jQuery.fn.extend({coverVid:function(){return coverVid(this[0],arguments[0],arguments[1]),this}});
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
            initMap('map', 'images/marker.png'); 
        } 
 
        if($('#map2').length>0) { 
 
            function init() { 
 
              var mapOptions = { 
                  zoom: 16, 
                  center: new google.maps.LatLng(40.7175099, -73.9909217), 
                  mapTypeId: google.maps.MapTypeId.ROADMAP, 
                  disableDefaultUI: true, 
                  styles: map.themes.lightGray 
              }; 
 
              var myMap = new google.maps.Map(document.getElementById('map2'), mapOptions); 
 
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
