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

function initBlackAreaList() {
    var blackItemlist = $(DARK_AREA_ITEMS),
        TOP_IDENT = 25;

    blackAreaList = [];

    for (var i = blackItemlist.length - 1; i >= 0; i--) {
        var bItem = $(blackItemlist[i]);
        blackAreaList.push({
            start: bItem.offset().top - TOP_IDENT,
            end: bItem.offset().top + bItem.innerHeight() - TOP_IDENT
        });
    };
}

function inBlackArea(scrollTop) {
    for (var i = blackAreaList.length - 1; i >= 0; i--) {
        if ((blackAreaList[i].end > scrollTop) && (blackAreaList[i].start < scrollTop)) {
            return true;
        };
    }
    return false;
}

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

function headerSetState(state) {
    switch (state) {
        case 'no-name':
            $(header).removeClass('header--transparent').addClass('header--whitout-studio-name').addClass('header--white');
            $('.mobile-toggle').addClass('white');
            break;
        case 'transparent':
            $(header).addClass('header--transparent');
            break;
        case 'default':
            $(header).addClass('header--transparent');
            $(header).removeClass('header--transparent').removeClass('header--whitout-studio-name').removeClass('header--white');
            $('.mobile-toggle').removeClass('white');
            break;
        case 'white':
            $(header).addClass('header--white').removeClass('header--whitout-studio-name');

            break;
    }
}

function difficultHomeHeaderLogic(scrollTop) {
    var operaFixValue = 2;
    if (scrollTop === 0) {
        headerSetState('no-name');
    } else if ((scrollTop > 0) && (scrollTop < window.innerHeight)) {
        headerSetState('transparent');
    // } else if ((scrollTop >= $('body').height() - window.innerHeight - operaFixValue)) {
    //     headerSetState('white');
    } else {
        headerSetState('default');
    }
}

function defaultHeaderLogic(scrollTop) {
    if ((scrollTop >= $('html').height() - window.innerHeight) || (inBlackArea(scrollTop))) {
        headerSetState('white');
    } else {
        headerSetState('default');
    }
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


function initEvents() {
    initAllAnchor('.anchor-js');
    videoMobilePause();
    initMenuToggle();
    if ($('.home').length > 0) {
        initHeaderBlockParalax(".black-section__paralax-block");

        $(document).ready(function() {
            difficultHomeHeaderLogic($(window).scrollTop());
        });

        $(window).load(function() {
            initPagination();
            if ($(".project-article").length > 0) {
                $(".project-article").stick_in_parent();
            }
        });

        $(window).scroll(function() {
            difficultHomeHeaderLogic($(window).scrollTop());
        });

    } else {
        initForm();
        initBlackAreaList();

        $(document).ready(function() {
            defaultHeaderLogic($(window).scrollTop());
        });
        $(window).scroll(function() {
            defaultHeaderLogic($(window).scrollTop());
        });
        $(window).resize(function() {
            initBlackAreaList();
            defaultHeaderLogic($(window).scrollTop());
        });
    }

    // initHeaderColoring();
}

function initHeaderColoring() {
    var darkArea = $('.is-dark-area');
    var darkAreaTop = darkArea.offset().top;
    var darkAreaBottom = darkArea.height();

    $(window).scroll(function(event) {
        var scroll = $(window).scrollTop();

        if(darkArea.length>0) {
            if(scroll>= darkAreaTop && scroll<=darkAreaBottom) {
                console.log('white');
                headerSetState('white');
            }
        }

    }).scroll();
}

initEvents();



// Hard code for map marker animation
$(window).scroll(function(event) {
    scroll = $(window).scrollTop();
    if ( scroll+50 >= $('#map2').offset().top && scroll <= $('#map2').offset().top + $('#map2').innerHeight() ) {
        $('.marker-label').addClass('animate')
    }
    else {
        $('.marker-label').removeClass('animate')
    }
});
