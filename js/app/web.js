define(['webFrag'], function (webFrag) {

    return {

        controller       : new ScrollMagic(),
        smDebug          : false,
        currentActiveLink: null,
        sections         : ['#tratamientos-faciales', '#tratamientos-corporales', '#contacto'],

        initWeb: function () {
//            this.centerSectionContent();
            this.configureHeader();
            this.configureNavScroll();
            this.configureSlideScroll();
            this.configureSectionEffects();
            this.setFormValidationMsg();

        },

        setFormValidationMsg: function () {
            var msg = "";
            var elements = document.getElementsByTagName("INPUT");

            for (var i = 0; i < elements.length; i++) {
                elements[i].oninvalid = function (e) {
                    if (!e.target.validity.valid) {
                        switch (e.target.id) {
                            case 'password' :
                                e.target.setCustomValidity("Campo requerido.");
                                break;
                            case 'username' :
                                e.target.setCustomValidity("Campo requerido.");
                                break;
                            default :
                                e.target.setCustomValidity("Campo requerido.");
                                break;

                        }
                    }
                };
                elements[i].oninput = function (e) {
                    e.target.setCustomValidity(msg);
                };
            }
        },

        centerSectionContent: function () {

            var $sections = $(this.sections.join(', ')),
                me = this;

            $.each($sections, function (index, value) {
                me.centerVertical($(value).children('.container'), $(value), 'padding-top');
            });
        },

        configureHeader: function () {
            this.configureHeaderBig();
            this.configureHeaderBS();
            //this.configureHeaderHoverLinks()

        },

        configureHeaderBig: function () {

            var controller = this.controller;

            // build tween
            var tween = TweenMax.to("#header-big", 0.5,
                {
                    //backgroundPosition: '-100px -100px',
                    backgroundPosition: '0 50px',
                    opacity           : 0
                }
            );

            // build scene
            var scene = new ScrollScene(
                {
                    duration: 500
                })
                .setTween(tween)
                .addTo(controller);

            // show indicators (requires debug extension)
            if (this.smDebug) scene.addIndicators({zindex: 1000});

            /*

             var backgroundPos = $('#header-big').css('backgroundPosition').split(" "),
             xPos = Number(backgroundPos[0].replace(/[^0-9-]/g, '')),
             yPos = Number(backgroundPos[1].replace(/[^0-9-]/g, ''));
             $(window).bind('scroll', function (e) {
             var scrollPosition = $(window).scrollTop();
             if (scrollPosition > 0) {
             $('#header-big').css('background-position', '-100px ' + (yPos + scrollPosition ) + 'px');
             }
             else if (scrollPosition === 0) {
             $('#header-big').css('background-position', '-100px ' + yPos + 'px');
             }
             });
             */


        },

        configureHeaderBS: function () {

            var $header = $('header');

            if (($header.hasClass('hidden')) && $(window).scrollTop() > 250) {
                $header.removeClass('hidden');
            }

            $(window).scroll(function () {
                    if ($header.hasClass('hidden') && $(window).scrollTop() > 250) {
                        $header.removeClass('hidden');
                        TweenMax.fromTo($header, 0.5,
                            {
                                opacity: 0
                            },
                            {
                                opacity: 1
                            }
                        );
                        TweenMax.from($header.children('*'), 0.5,
                            {
                                height: '50px'
                            }
                        );
                    }
                    else if (!($header.hasClass('hidden')) && $(window).scrollTop() < 250) {

                        TweenMax.to($header, 0.5,
                            {
                                opacity   : 0,
                                onComplete: function () {
                                    $header.addClass('hidden');
                                }
                            }
                        );
                    }
                }
            );
        },

        configureSlideScroll: function () {

            var controller = this.controller;


            /*
             $(window).bind('scroll', function (e) {
             var scrollPosition = $(window).scrollTop();
             $('#tratamientos-faciales-header').css('top', (0 - (scrollPosition * 3)) + 'px');
             });
             */

            /*
             $(window).bind('scroll', function (e) {
             var scrollPosition = $(window).scrollTop();
             if (scrollPosition > 400) {
             $('#header-big').addClass('hidden');
             } else {
             $('#header-big').removeClass('hidden');
             }
             //$('#tratamientos-faciales-header').css('top', (0 - (scrollPosition * 3)) + 'px');
             });
             */

//            $(window).bind('scroll', function (e) {
//                var scrollPosition = $(window).scrollTop();
//                if (scrollPosition > 400) {
//                    $('#tratamientos-faciales-header').addClass('hidden');
//                } else {
//                    $('#tratamientos-faciales-header').removeClass('hidden');
//                }
//                //$('#tratamientos-faciales-header').css('top', (0 - (scrollPosition * 3)) + 'px');
//            });

        },

        centerVertical: function (child, parent, property, offset) {
            var offset = offset || 0;
            var parentHeight = parent.height(),
                childHeight = child.height();
            // Handle edge cases with padding or margins affecting child.height() calculation
            if (child.find("h1").length) {
                childHeight = child.find("h1").height();
            }
            // Position the child with an inline style
            child.css(property, ((parentHeight - childHeight) / 2 - offset));
        },

        configureSectionEffects: function () {

            var controller = this.controller;

            //****** #intro
            var tweenIntro = TweenMax.to("#intro", 0.5,
                {
                    opacity: 0
                }
            );
            var scene0 = new ScrollScene(
                {
                    triggerElement: "#intro p",
                    duration      : 1000,
                    offset        : 400 //-100
                })
                .setTween(tweenIntro)
                .addTo(controller);

            //****** #tratamientos-faciales-header
            var tween = TweenMax.fromTo("#tratamientos-faciales-header", 0.5,
                {
                    backgroundPosition: '0 -800px',
                    opacity           : 0
                },
                {
                    backgroundPosition: '0 50px',
                    opacity           : 1
                }
            );
            var scene = new ScrollScene(
                {
                    triggerElement: "#tratamientos-faciales-header",
                    duration      : 1000,
                    offset        : -300 //-100
                })
                .setTween(tween)
                .addTo(controller);
            if (this.smDebug) scene.addIndicators({parent: $(window), zindex: 100});

            //#tratamientos-faciales glyphicon
            $('#tratamientos-faciales span.glyphicon-circle-arrow-down').hover(
                function () {
                    TweenMax.to("#tratamientos-faciales span.glyphicon", 0.1,
                        {
                            fontSize: '60px',
                            color   : '#038C65'
                        }
                    );
                },
                function () {
                    TweenMax.to("#tratamientos-faciales span.glyphicon-circle-arrow-down", 0.2,
                        {
                            fontSize: '40px',
                            color   : '#333'
                        }
                    );
                }
            );


            //****** #tratamientos-corporales-header
            var tween = TweenMax.fromTo("#tratamientos-corporales-header", 0.5,
                {
                    backgroundPosition: '-600px -800px', //-300
                    opacity           : 0
                },
                {
                    //backgroundPosition: '-300px -215px',
                    backgroundPosition: '-398px -40px',
                    opacity           : 1
                }
            );
            var scene = new ScrollScene(
                {
                    triggerElement: "#tratamientos-corporales-header",
                    duration      : 1500,
                    offset        : -100 //-100
                })
                .setTween(tween)
                .addTo(controller);
            if (this.smDebug) scene.addIndicators({parent: $(window), zindex: 100});

            $('#tratamientos-corporales span.glyphicon-circle-arrow-down').hover(
                function () {
                    TweenMax.to("#tratamientos-corporales span.glyphicon", 0.1,
                        {
                            fontSize: '60px',
                            color   : '#038C65'
                        }
                    );
                },
                function () {
                    TweenMax.to("#tratamientos-corporales span.glyphicon-circle-arrow-down", 0.2,
                        {
                            fontSize: '40px',
                            color   : '#333'
                        }
                    );
                }
            );


            /*

             controller.addTween($('#benefits'),
             TweenMax.from($('#benefits img'), 0.5,
             {
             left: '-400px'
             }
             ), 0, -300
             );

             controller.addTween($('#why-algor'),
             TweenMax.to($('#why-algor img'), 0.5,
             {
             //                        opacity: 0.5,
             scale: 1.4
             }
             ), 0
             );

             controller.addTween($('#marketing-explanation'),
             TweenMax.from($('#marketing-explanation img'), 0.5,
             {
             opacity: 0.5,
             scale  : 0
             }
             ), 0
             );

             controller.addTween($('#how-works'),
             TweenMax.from($('#how-works img'), 0.5,
             {
             height: 0
             }
             ), 0
             );

             var staggerTween = new TimelineMax();

             staggerTween.append(
             function () {
             $('#spv li span').addClass('hidden');
             }
             );

             staggerTween.append(TweenMax.staggerTo($('#spv li span'), 0.1,
             {
             scale      : 1.5,
             marginRight: '20px',
             onStart    : function () {
             $(this.target).removeClass('hidden');
             }
             }
             , 0.1));

             controller.addTween($('#spv'), staggerTween);

             */
        },

        configureNavScroll: function () {

            var speed = 1500;

            $('header img').click(function (event) {
                event.preventDefault();
//                me.updateActiveNavLink($(this).parent('li'));
                $('html, body').animate({ scrollTop: 0}, speed,
                    function () {
                    }
                );
            });

            $('.tratamientos-faciales-nav-link').click(function (event) {
                event.preventDefault();
//                me.updateActiveNavLink($(this).parent('li'));
                $('html, body').animate({ scrollTop: $('#tratamientos-faciales').offset().top - 320}, speed,
                    function () {
                    }
                );
            });

            $('#tratamientos-faciales span.glyphicon-circle-arrow-down').click(function (event) {
                event.preventDefault();
//                me.updateActiveNavLink($(this).parent('li'));
                $('html, body').animate({ scrollTop: $('#tratamientos-faciales .carousel').offset().top - 190}, 1000,
                    function () {
                    }
                );
            });

            $('#tratamientos-corporales span.glyphicon-circle-arrow-down').click(function (event) {
                event.preventDefault();
//                me.updateActiveNavLink($(this).parent('li'));
                $('html, body').animate({ scrollTop: $('#tratamientos-corporales .carousel').offset().top - 190}, 1000,
                    function () {
                    }
                );
            });


            $('.tratamientos-corporales-nav-link').click(function (event) {
                event.preventDefault();
//                me.updateActiveNavLink($(this).parent('li'));
                $('html, body').animate({ scrollTop: $('#tratamientos-corporales').offset().top - 320}, speed + 500,
                    function () {
                    }
                );
            });

            $('.contacto-nav-link').click(function (event) {
                event.preventDefault();
//                me.updateActiveNavLink($(this).parent('li'));
                $('html, body').animate({ scrollTop: $('#contacto').offset().top}, speed,
                    function () {
                    }
                );
            });

            $('.encuentranos-nav-link').click(function (event) {
                event.preventDefault();
//                me.updateActiveNavLink($(this).parent('li'));
                $('html, body').animate({ scrollTop: $('#encuentranos').offset().top}, speed,
                    function () {
                    }
                );
            });

        },


        updateActiveNavLink: function (li) {
            if (this.currentActiveLink) {
                this.currentActiveLink.removeClass('active');
            }
            this.currentActiveLink = li;
            li.addClass('active');
        },

        clearActiveNavLink: function () {
            if (this.currentActiveLink) {
                this.currentActiveLink.removeClass('active');
            }
        },

        configureHeaderHoverLinks: function () {
//            $( 'header li' ).hover(
//                function() {
//                    $( this ).append( $( "<span> ***</span>" ) );
//                }, function() {
//                    $( this ).find( "span:last" ).remove();
//                }
//            );

            $('header li').hover(function () {

                    if ($(this).hasClass('active')) return;
                    TweenMax.to($(this), 0.2, {
                            scale     : 1.02,
                            fontWeight: 'bold'
                        }
                    )

                },
                function () {
                    TweenMax.to($(this), 0.2, {
                            scale     : 1,
                            fontWeight: 'normal'
                        }
                    )

                });
        }
    }

})
;

 