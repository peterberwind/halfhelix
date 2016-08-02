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

function initEvents() {
    initAllAnchor('.anchor-js');
    videoMobilePause();
    initMenuToggle();
    colorHeader();
    initHeaderBlockParalax(".hero-section__paralax-block");
    if ($('.home').length > 0) {
    } else {
        initForm();
    }

    // initHeaderColoring();
}




initEvents();



// Hard code for map marker animation
// $(window).scroll(function(event) {
//     scroll = $(window).scrollTop();
//     if ( scroll+50 >= $('#map2').offset().top && scroll <= $('#map2').offset().top + $('#map2').innerHeight() ) {
//         $('.marker-label').addClass('animate')
//     }
//     else {
//         $('.marker-label').removeClass('animate')
//     }
// });
