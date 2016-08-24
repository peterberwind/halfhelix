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
        }
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
    });

    $(window).resize(function() {
        getListOffset();
        setCurrentArticles($(window).scrollTop());
    });
}


function goToSelector(selector, time) {
    $('html, body').animate({
        scrollTop: $(selector).offset().top
    }, time);
}


function initForm() {
    if ($('.hire-form-wrapper').length > 0) {
        $(document).ready(function() {
            $('.hire-form-wrapper').find('.form__submit').click(function() {
                $('.form').hide();
                $('.hire-success').show();
                goToSelector('body', 300);
                return false;
            });
        });
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
    $(selector).click(function(event) {
        event.preventDefault();
        var url = $(this).attr('href');
        goToSelector(url, 750);
    });
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

function runPreloader() {
    if ($('.preloader').length>0 && localStorage.getItem('preloader')!='1') {
        var $svgElement = $('.preloader_mask');
        var preloader_speed = 6000;
        var y_end = 0;


        function animatePreloader($el, attrs, speed) {

            // duration in ms
            speed = speed || 400;

            var start = {}, // object to store initial state of attributes
                timeout = 20, // interval between rendering loop in ms
                steps = Math.floor(speed/timeout), // number of cycles required
                cycles = steps; // counter for cycles left

            // populate the object with the initial state
            $.each(attrs, function(k,v) {
                start[k] = $el.attr(k);
            });

            (function loop() {
                $.each(attrs, function(k,v) {  // cycle each attribute
                    var pst = (v - start[k])/steps;  // how much to add at each step
                    $el.attr(k, function(i, old) {
                        return +old + pst;  // add value do the old one
                    });
                });

                if (--cycles) // call the loop if counter is not exhausted
                    {
                        setTimeout(loop, timeout);
                    }
                else // otherwise set final state to avoid floating point values
                    {
                        $el.attr(attrs);
                        $('body').removeClass('preloader-visible');
                        localStorage.setItem('preloader', '1');
                    }

            })(); // start the loop
        }
        animatePreloader($('.preloader_mask'), {y: 0}, 5000);



    } else {
        $('body').removeClass('preloader-visible');
    }
}


function rollSmile() {
    if ($('#homesmile').length>0) {

        $(window).resize(function(event) {
            var $smile = $('#homesmile svg');

            var winwidth = $(window).width()-17;

            var center = winwidth/2;

            $('.hero-section').mousemove(function(event) {
                var grad = 720/winwidth;
                var deg = (event.pageX-center)*grad;
                $smile.css({'transform': 'rotate('+deg+'deg)'});
                $('#homesmile').css({left: event.pageX+'px'})
            });
        }).resize();
    }
}

function makeDivSquare() {
    $(window).resize(function(event) {
        var $el = $('.squarediv')
        var width = $el.width();
        $el.height(width);
    }).resize();
}

function initEvents() {
    // rollSmile();
    runPreloader();
    initAllAnchor('.anchor-js');
    videoMobilePause();
    initMenuToggle();
    colorHeader();
    showProjects();
    makeDivSquare();
    initHeaderBlockParalax(".hero-section__paralax-block");
    if ($('.home').length > 0) {
    } else {
        initForm();
    }

    // initHeaderColoring();
}


initEvents();



// Hard code for map marker animation

if($('#map').length>0) {
    $(window).scroll(function(event) {
        scroll = $(window).scrollTop();
        if ( scroll+50 >= $('#map').offset().top && scroll <= $('#map').offset().top + $('#map').innerHeight() ) {
            $('.marker-label').addClass('animate')
        }
        else {
            $('.marker-label').removeClass('animate')
        }
    });
}

// Homepage Animation

new Vivus('hh-svg', {
  type: 'delayed',
  duration: 500,
  animTimingFunction: Vivus.EASE
});
