$(document).ready(function() {
  
  var sousRubriqueActive,

      scroller = null,
      
      firstLoad =true,
      firstResize = true,
      canClickMenu = true,
      firstFooterHover = true,
      sousRubrique = false,
      submenuOn = false,
      canResize = false,

      menuIndex = 0,
      deltaProgress = 0,
      minHeight = 490,
      thumbHeight = 440,
      videoTimer = 300,
      vidTimeout, newClass, oldClass,

      easeInQuad = "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
      easeOutQuad = "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
      easeInOutQuint = "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
      easeInOutExpo = "cubic-bezier(1.000, 0.000, 0.000, 1.000)",

      subHomeImg = {
        "home" : "home_bg.jpg",
        "apropos-home" : "rub1_bg.jpg",
        "montres-home" : "rub2_bg.jpg",
        "masks-home" : "rub3_bg.jpg",
        "artistes-home" : "rub4_bg.jpg",
        "contact-home" : "rub5_bg.jpg"
      },
      subHomeVid = {
        "home" : "0",
        "apropos-home" : "apropos",
        "montres-home" : "montres",
        "masks-home" : "masks",
        "artistes-home" : "artistes"
      },
      loaderElement = $("#loader"),
      loaderText = loaderElement.find('p'),
      loaderProgress = loaderElement.find('#progress'),
      overlay = $("#overlay"),
      submenu = $('.submenu');

  /*-----------------------
    feature detections
  -----------------------*/
  
  // old IEs
  if($.browser.msie && $.browser.version < 8){
    window.location = 'update_browser.html';
    return false;
  }

  // video
  var videoTest = document.createElement('video'),
      videoSupport= {
        mediaElement : (videoTest.play) ? true : false ,
        mp4    : Modernizr.video.h264 == "probably" ? true : false,
        ogg    : Modernizr.video.ogg == "probably" ? true : false
      },

      mobileUser  = jQuery.browser.mobile || !videoSupport.mediaElement ,
      touchUser   = Modernizr.touch;
      // touchUser   = !!('ontouchstart' in window) ? true : false;

  // Css3 transitions
  if (!$.support.transition){
    
    $.fn.transition = $.fn.animate;

    easeInQuad = "easeInQuad";
    easeOutQuad = "easeOutQuad";
    easeInOutQuint = "easeInOutQuint";
    easeInOutExpo = "easeInOutExpo";
  }

  // DOM manipulations
  $("li a.prev, li a.next").wrapInner("<span></span>").append('<h4></h4>');
  
  if (mobileUser)
    $('#collaborations img.fullbg').attr("src", "img/4_Artistes_Collaborations_ipad.jpg");
    
  if(touchUser)
    $('footer').append('<div class="touchPager"></div>');

  
  // LOADER 
  var preload_files = 
  [{
      src: "../img/submenu/stores.jpg"
  }, {
      src: "../img/submenu/classic.jpg"
  }, {
      src: "../img/submenu/concept.jpg"
  }, {
      src: "../img/submenu/rehab.jpg"
  }, {
      src: "../img/submenu/presse.jpg"
  }, {
      src: "../img/submenu/limitee.jpg"
  }, {
      src: "../img/submenu/artistes.jpg"
  }, {
      src: "../img/submenu/savoirfaire.jpg"
  }, {
      src: "../img/submenu/origines.jpg"
  }, {
      src: "../img/submenu/collaborations.jpg"

  }, {
      src: "../img/galeries/classic/1.jpg"
  }, {
      src: "../img/galeries/classic/2.jpg"
  }, {
      src: "../img/galeries/classic/4.jpg"
  }, {
      src: "../img/galeries/classic/3.jpg"
  }, {
      src: "../img/galeries/classic/front/1.jpg"
  }, {
      src: "../img/galeries/classic/front/2.jpg"
  }, {
      src: "../img/galeries/classic/front/4.jpg"
  }, {
      src: "../img/galeries/classic/front/3.jpg"
  }, {
      src: "../img/galeries/classic/thumb/1.jpg"
  }, {
      src: "../img/galeries/classic/thumb/2.jpg"
  }, {
      src: "../img/galeries/classic/thumb/4.jpg"
  }, {
      src: "../img/galeries/classic/thumb/3.jpg"
  }, {
      src: "../img/galeries/limited/1.jpg"
  }, {
      src: "../img/galeries/limited/2.jpg"
  }, {
      src: "../img/galeries/limited/4.jpg"
  }, {
      src: "../img/galeries/limited/3.jpg"
  }, {
      src: "../img/galeries/limited/front/1.jpg"
  }, {
      src: "../img/galeries/limited/front/2.jpg"
  }, {
      src: "../img/galeries/limited/front/4.jpg"
  }, {
      src: "../img/galeries/limited/front/3.jpg"
  }, {
      src: "../img/galeries/limited/thumb/1.jpg"
  }, {
      src: "../img/galeries/limited/thumb/2.jpg"
  }, {
      src: "../img/galeries/limited/thumb/4.jpg"
  }, {
      src: "../img/galeries/limited/thumb/3.jpg"
  }, {
      src: "../img/galeries/rehab/1.jpg"
  }, {
      src: "../img/galeries/rehab/2.jpg"
  }, {
      src: "../img/galeries/rehab/4.jpg"
  }, {
      src: "../img/galeries/rehab/3.jpg"
  }, {
      src: "../img/galeries/rehab/front/1.jpg"
  }, {
      src: "../img/galeries/rehab/front/2.jpg"
  }, {
      src: "../img/galeries/rehab/front/4.jpg"
  }, {
      src: "../img/galeries/rehab/front/3.jpg"
  }, {
      src: "../img/galeries/rehab/thumb/1.jpg"
  }, {
      src: "../img/galeries/rehab/thumb/2.jpg"
  }, {
      src: "../img/galeries/rehab/thumb/4.jpg"
  }, {
      src: "../img/galeries/rehab/thumb/3.jpg"
  }, {
      src: "../img/fleches.png"
  }, {
      src: "../img/3_Masks_Savoir_faire.jpg",
      id: "#savoirfaire"
  }, {
      src: "../img/1_Apropos_concept.jpg",
      id: "#concept"
  }, {
      src: "../img/1_Apropos_points_de_vente.jpg",
      id: "#stores"
  }, {
      src: "../img/1_Apropos_press.jpg",
      id: "#presse"
  }, {
      src: "../img/2_Montres_origines.jpg",
      id: "#origines"
  }, {
      src: "../img/4_Artistes_Collaborations.jpg",
      id: "#collaborations"
  }, {
      src: "../img/4_Artistes_Liste.jpg",
      id: "#artistes-fob"
  }];

  var preload = new createjs.PreloadJS();
  
  //load event handlers
  preload.onFileLoad = handleFileLoaded;
  preload.onComplete = loadComplete;
  preload.onProgress = loadProgress;
  function handleFileLoaded(event) {
  
    // append images to their parent (event.id = parent selector)
    var div =  $(event.id.toString()),
        img = event.result;

    if( div.length > 0 ){
      div.prepend(img);
      $(img).addClass('fullbg');
    }

    // console.log(div, event, "file loaded");
  }
  function loadProgress(result){
    // console.log(result, preload.progress);
    loaderProgress.css( "width", preload.progress*100+"%" );
    loaderText.text( Math.ceil(preload.progress*100)+"%" );
  }
  function loadComplete(result) {
    // console.log( result, imageMap, "queue complete");
    canResize = true;
    $(window).trigger('resize');
    loaderElement.transition({ opacity : 0}, 800, function(){$(this).remove()});
  }

  //process : load files
  preload.loadManifest(preload_files);

  //----> INIT VIDEOS
  $(".sub-home, #home").each(function(){
    var id = this.id;

    if( id != "contact-home_" ){
      
      if(!mobileUser && videoSupport.mediaElement){

        var fileExt,
        video= document.createElement("video");
        
        if( videoSupport.mp4 ){
          fileExt = ".mp4";
        }
        else{
          fileExt = ".ogv";
          videoTimer = 500;
        }

        video.width = 1280;
        video.height = 720;
        video.controls = false;
        video.src = "../video/" +subHomeVid[ id ] + fileExt;
        video.id = "video-"+id;
        video.load();

        video.addEventListener('canplay', function(){
          //console.log("video canplaythrough : ", id);

          if( id != "home" ){
            this.addEventListener("timeupdate", function(){
              // console.timeEnd("play");
              if(this.currentTime.toFixed(1) > 2) { this.pause(); }
            }, false);

            this.addEventListener("play", function(){
              canClickMenu = false;
              $("#vertical").trigger('configuration', ["prev.key", false, false]);
              $("#vertical").trigger('configuration', ["next.key", false, false]);
            }, false);

            this.addEventListener("pause", function(){
              // console.log("pause");
              canClickMenu = true;
              $("#vertical").trigger('configuration', ["prev.key", "up"]);
                $("#vertical").trigger('configuration', ["next.key", "down"]);
            }, false);

            // video.addEventListener("timeupdate", function(){
            //   console.log("time : ",id+" : ", this.currentTime.toFixed(1));
            // });
          }
          else{
            video.loop = "loop";

            if(fileExt==".ogv"){
              video.addEventListener("ended", function(){
                  this.play();
                  //console.log("video ended: home");
              }, false);
            }
          }

          // this.play();
        }, false);

        $(this).prepend(video);
      }
      else{
        var img = new Image();
        img.src = "../img/" + subHomeImg[ id ];

        $(img)
          .width(1280)
          .height(800);

        $(this).prepend(img);
      }

    }
  });

  /*-----------------------
          SLIDERS
  -----------------------*/
  $('#vertical').carouFredSel({
    auto : false,
    circular : false,
    infinite : false,
    align: false,
    direction: "up",

    width: $(window).width(),
    height: $(window).height(),

    items: {
      visible: 1,
      start: false,
      width: 'variable',
      height: 'variable'
    },

    scroll : {
      fx : "scroll",
      easing : "easeInOutQuart",
      duration : 840,
      
      onBefore : function(oldItems, newItems, newSizes, duration){
        var oldId = oldItems.attr("id"),
        newId = newItems.attr("id"),
        header = $("#menu");
        newClass = newItems.attr("class");

        // VIDEO
        if (newId != "contact"){
          if(!mobileUser){
            var video = newItems.find( "video" )[0];
            vidTimeout = setTimeout(function(){ video.play(); }, videoTimer);
          }
        }

        // HOME : toggle menu
        if(oldId == "home"){
          header.css("visibility","visible").transition({opacity: 1}, 700);
        }
        if(newId == "home"){
          header.transition({opacity: 0}, 700, function(){ $(this).css("visibility","hidden"); });
        }

        // MENU
        else{
          menuBar( $("#mainMenu a[href=#"+newId+"]") );
        }

      },

      onAfter : function(oldItems, newItems, newSizes){
        clearTimeout(vidTimeout);

        // RAZ playhead de toutes les vidéos concernées
        var videos = $("video").not("#video-home").not(newItems.find("video"));
        videos.each(function(){
          if($(this)[0].currentTime > 0){
            $(this)[0].currentTime = 0;
          }
        });
        // pause video home
        if( oldItems.attr("id") == "home"){
          if(!mobileUser){
            oldItems.find("video")[0].pause();
          }
        }
        
        //----> Titres des rubriques suivante et précédente
        var prevSection = $('h1',newItems.siblings(':last')).text(),
        nextSection = $('h1',newItems.next()).text();
        newItems.find('a.next h4').text(nextSection);
        newItems.find('a.prev h4').text(prevSection);
      }
    },

    prev : {
      key : "up",
      button : ".prev"
    },
    next : {
      key : "down",
      button : ".next"
    },

    onCreate: function(items) {

      //----> instanciate vertical carousels
      $("ul.horizontal").each(function(){
        
        // sous-rubriques
        $(this).carouFredSel({
          synchronize : [".horizontal", true, true, 0],
          auto : false,
          circular : false,
          infinite : false,
          align: false,

          width: $(window).width(),
          height: $(window).height(),

          direction: "left",

          items: {
            visible: 1,
            width: 'variable',
            height: 'variable'
          },

          // prev : {
          //   key : "left"
          // },
          // next : {
          //   key : "right"
          // },

          scroll : {
            //wipe : true,
            easing : "easeInOutQuint",
            duration : 840,

            onBefore : function(oldItems, newItems, newSizes, duration){
              // galeries
              if( newItems.attr("class") == "galerie" ){
                $(window).trigger('resize');
              }
              
              // retour à l'accueil de rubrique, re-init anim du bloc rouge
              if(newItems.attr("class") == "sub-home") { 
                // redblockAnimated=false ;

                sousRubrique = false;
                $(this).toggleCadre();

                //CONTROLE SUR LES FLECHES LORS DE LA NAV
                //BLOCK NAV HORIZONTAL QUAND JE ME TROUVE SUR VERTICAL
                $("#vertical").trigger('configuration', ["prev.key", "up"]);
                $("#vertical").trigger('configuration', ["next.key", "down"]);

                // bugfix
                window.setTimeout( function(){
                  $("#videoMask").css("visibility", "hidden");
                }, 200 );

              }

              // entrée dans une sous-rubrique
              if(oldItems.attr("class") == "sub-home") { 
                sousRubrique = true;
                $(this).toggleCadre();

                //CONTROLE SUR LES FLECHES LORS DE LA NAV
                //EMPECHER NAV VERTICAL QUAND JE ME TROUVE SUR L'HORIZONTAL
                $("#vertical").trigger('configuration', ["prev.key", false, false]);
                $("#vertical").trigger('configuration', ["next.key", false, false]);

                // bugfix
                window.setTimeout( function(){
                  $("#videoMask").css("visibility", "visible");
                }, 500 );

              }

              // pagination
              var pagerLinks = $(this).parent().parent().find('footer nav a') ;
              pagerLinks.removeClass("selected");
              pagerLinks.filter(':eq('+newItems.attr('rel')+')').addClass("selected");

              // sous-menu
              var submenuOn = $(this).parent().parent().find('.submenu li a');
              submenuOn.removeClass("selected");
              sousRubriqueActive = submenuOn.filter(':eq('+newItems.attr('rel')+')').addClass("selected");

              // hide sous-menu
              if ( submenuOn.length ){
                overlay.toggleOverlay("hide");
                submenu.stop().transition({bottom: "-160px", opacity : 0}, 500, easeInOutExpo, function(){
                    $(this).css("visibility","hidden");
                    overlay.unbind();
                });
              }
            }
          }
        }); // end caroufredsel
      }); 
    }
  });


  /*-----------------------
          EVENTS
  -----------------------*/

  //----> RESIZE
  $(window).on('resize orientationchange',function(event) {
    if( canResize ){

    var viewport = {
      width: $(window).width(),
      height: $(window).height()
    };
    
    //console.log("resize", viewport.width, viewport.height);
    
    //----> vertical
    $('#vertical').height(viewport.height * $('#vertical > div').length ).width( viewport.width );
    $('#vertical').parent().css( viewport );
    $('#vertical > div').css( viewport );

    //----> .horizontal / rubriques
    $('.horizontal').each(function(){
      $(this).css( 'width', viewport.width * $('li', $(this)).length ).css('height', viewport.height);
    });
    $('.horizontal').parent().css( viewport );
    $('.horizontal > li').css( viewport );

    //----> background : accueils rubriques
    if(!mobileUser){
      $("video, img.fullbg").each(function(){ $(this).fullscreenCenterdImg(); });
    }
    else{
      $("img.fullbg, .sub-home > img ").each(function(){ $(this).fullscreenCenterdImg(); });
      $("#home > img").addClass('fullbg');
    }

    //----> titres : accueils rubriques
    $("h1").not("#home h1").each(function(){ $(this).center($(window)); });

    //----> sous menu : accueils rubriques
    $(".subnav").each(function(){
      var h1 = $(this).siblings("h1");
      $(this)
      .css({ "left" : parseInt(viewport.width - $(this).width(), 10) / 2 })
      .css("top", h1.position().top + h1.height() );
    });

    //----> flèches
    $(".prev").each(function(){
      $(this).css("top", (viewport.height / 6) );
    });
    $(".next").each(function(){
      $(this).css("bottom", (viewport.height / 11) );
    });
    
    //----> blocs texte
    $(".textblock").each(function(){
      
      $(this).height(bloc);
      //  cadre - marge du bloc - padding
      var bloc = viewport.height - 140 - 60 -120,
      titre = $(this).find("h2").outerHeight(true),
      text = bloc - titre;

      // galeries
      if( $(this).parents(".galerie").length ){
          text = viewport.height - 475 - titre;
      }

      // contact
      if( $(this).parents(".legalblock").length ){
        $(this).parents(".legalblock").center($(window));
        text = viewport.height - (viewport.height*56/100) - titre;
      }

      // 

      //----> scrollbars
      $(this).find(".box, .box .antiscroll-inner").height(text);
      
      if( $(this).find(".box-inner").height() <= text )
        $(this).find(".antiscroll-scrollbar-vertical").css('display', 'none');
      else
        $(this).find(".antiscroll-scrollbar-vertical").css('display', 'block');

    });


    //----> sous-menu
    submenu.each(function(){

      var subwidth = viewport.width - 140;
      var items = $("li", $(this));

      $(this).width( subwidth );
      items.width( subwidth / items.length );
      
      $( "h3", $(this) ).each(function(){
        $(this).center( $(this).parent() );
      });
    });

    //----> galeries
    $('.galerie').each(function(){
      var wrap = $(this).find('.wrap'),
      wrapLeft = $(this).find('.wrap-left'),
      wrapRight = $(this).find('.wrap-right'),
      back = $(this).find('.slides-back'),
      front = $(this).find('.wrap-front'),
      text = $(this).find('.textblock.white'),
      fleches = $(this).find(".fleches"),
      textPos = text.position().left,
      nb = wrapLeft.find("li").length;
      
      var blocHeight = viewport.height - 140 - 60 - 120 - 100,
      //  cadre - marge du bloc - padding - thumbs
      titreHeight = $(this).find("h2").outerHeight(true),
      textHeight = blocHeight - titreHeight - 50;
      //console.log(thumbHeight, blocHeight);
      if( thumbHeight > (blocHeight + 120) ){
        front.height( blocHeight + 120 );
      } else {
        front.height( thumbHeight );
      }

      fleches.css("left", textPos - 90);
      wrap.width( viewport.width - 140 ).height( viewport.height - 140 );
      wrapLeft.width( textPos ).height( viewport.height - 140 );
      wrapRight.width( viewport.width - 140 - textPos ).height( viewport.height - 140 );

      // pour les écrans > 27"
      if( viewport.width > 1890){
        wrapLeft.find('img').css({'width': viewport.width , 'height' : 'auto' } );
        wrapRight.find('img').css({'width': viewport.width , 'height' : 'auto' } );
      }

      $(".textblock", this).height(blocHeight);
      $(".box, .box .antiscroll-inner", $(this)).height(textHeight);

    });
    

    //bugfix scrollbars
    $('.box-wrap').each(function(){
      if( !$(this).find(".antiscroll-scrollbar").length ){
        $(this).antiscroll();
      }
    })

    if(firstResize){
      if(!mobileUser){
        $("#video-home")[0].play();
        $("#video-home").css('visibility','visible');
      }

      $("#wrapper").animate({
        opacity: 1
      }, 500);
      firstResize = false;

    }
    }
  });

  //----> LOAD
  $(window).on('load', function(){
    //console.log("load");
    
    createGaleries();

    $(".horizontal").each(function(){
        $(this).trigger('updateSizes');      
    });

    //----> blocs texte
    $('.box-wrap').antiscroll();

    var viewport = {
      width: $(window).width(),
      height: $(window).height()
    };
    
    $(".textblock").each(function(){
      //  cadre - marge du bloc - padding
      var bloc = viewport.height - 140 - 60 -120,
      titre = $(this).find("h2").outerHeight(true),
      text = bloc - titre;

      $(this).height(bloc);
      $(this).find(".box, .box .antiscroll-inner").height(text);

      //----> SCROLLBARS : masquées si non-nécessaires
      if( $(this).find(".box-inner").height() <= text ){
        $(this).find(".antiscroll-scrollbar-vertical").css('display', 'none');
      }else{
        $(this).find(".antiscroll-scrollbar-vertical").css('display', 'block');
      }
    });

    //loader bloqué
    // window.setTimeout(function(){
    //   if( $("#html5Loader").length && firstResize){
    //     //console.log("loader bloqué");
    //     canResize = true;
    //     $(window).trigger('resize');
    //     $("#html5Loader").remove();
    //   }
    // }, 200);
  });

  //----> ROLL prev / next
  if( !touchUser ){

    $(".prev, .next")
    .on("mouseenter", function(){

      $(this).find("span").stop().transition({ height : 23},300);
      $(this).find("h4").stop().transition({ opacity : 1},300);

      // overlay.toggleOverlay("show");  
    })
    .on("mouseleave click", function(){

      $(this).find("span").stop().transition({ height : 43},300);
      $(this).find("h4").stop().transition({ opacity : 0},300);

      // overlay.toggleOverlay("hide");
    });
  }

  //----> ROLL subnav
  if(!touchUser){
    $(".subnav a")
    .on("mouseenter", function(){
      $(this).parent().prev("li.sep").addClass('on');
    })
    .on("mouseleave click", function(){
      $(this).parent().prev("li.sep").removeClass('on')
    });
  }

  //----> SOUS-MENU
  if( !touchUser ){
    
    $(".caroufredsel_wrapper + footer")
    .on("mouseenter", function(){
      $(this).showSubMenu();
      
      if(firstFooterHover){
        sousRubriqueActive = submenu.find("a.selected");
        firstFooterHover = false;
      }
      
      overlay.bind("mouseenter", function(){
        overlay.toggleOverlay("hide");

        $(this).hideSubMenu();

        submenu.find("a").removeClass('selected');
        sousRubriqueActive.addClass("selected");
        firstFooterHover = true;
      });
    });

    //rollover
    submenu.find("li")
    .on('mouseenter', function(){
      
      $(this).siblings('li').children('a').removeClass('selected');
      $(this).find("a").addClass('selected');
    })
  } else {
    $(".touchPager").on( 'touchstart', function(){
      var that = $(this).parent();
      
      that.showSubMenu();
      overlay.bind('touchstart', function(){
        overlay.toggleOverlay("hide");
        that.hideSubMenu();
      });
    });
  }

  //----> MENU
  $("#mainMenu a")
  .on('click', function(e){ menuClick(e, $(this)); }) // click
  .on("touchend touchstart", function(){ // touch
    $(this).transition({ opacity : 1}, 1);
  });
  $("#clickCatch").on("click", function(e){ e.preventDefault(); });


  //----> BACK home
  $("#wrapper > header #logo").on('click', function(e){
    e.preventDefault();
    if( sousRubrique ){
      $(".horizontal").each(function(){
        $(this).trigger('slideTo', [0, 0, null, null, function(){
          // onAfter : scroll vertical
          $("#vertical").trigger('slideTo', [ "#home" ]) ;
        }]);
      });
    }else{
      $("#vertical").trigger('slideTo', [ "#home" ]) ;
    }
  });


  //----> BACK sub-home
  if(!touchUser){
    $("a.back").on("click", function(e){
      e.preventDefault();
      
      $("#vertical").trigger('pause');

      $(this).parent().siblings('.submenu')
      .stop().animate({
          bottom: "-100px", opacity : 0
        }, 200, 
        function(){
          $(this).css( "visibility" , "hidden" );
          overlay.toggleOverlay("hide");
          $(this).toggleCadre();
      });

      $(".horizontal")
      .trigger('slideTo', [0, 0, null, null, function(){
        $("#vertical").trigger('resume');
      }]);
      
    });
  } else {
    $("a.back").on("click", function(e){
      e.preventDefault();
      $("#vertical").trigger('pause');

      $(".horizontal")
      .trigger('slideTo', [0, 0, null, null, function(){
        $("#vertical").trigger('resume');
      }]);
    });

  }

  //----> GALERIES
  $("a.galnext").on('click', function(e){
    e.preventDefault();
    var front = $(this).parent().siblings('.wrap-front').find('.slides-front');
    var left = $(this).parent().siblings('.wrap-left').find('.slides-back');
    var right = $(this).parent().siblings('.wrap-right').find('.slides-back');
    front.trigger('next');
    left.trigger('prev');
    right.trigger('prev');
  });

  $("a.galprev").on('click', function(e){
    e.preventDefault();
    var front = $(this).parent().siblings('.wrap-front').find('.slides-front');
    var left = $(this).parent().siblings('.wrap-left').find('.slides-back');
    var right = $(this).parent().siblings('.wrap-right').find('.slides-back');
    front.trigger('prev');
    left.trigger('next');
    right.trigger('next');
  });

  $(".galerie .thumbs li")
  .on('click', function(e){

    if($(this).attr("class") == "active" ) { 
      e.preventDefault();
    }
    else { 
      $(this).siblings().removeClass("active");
      $(this).addClass("active");
    }

    var front = $(this).parent().siblings('.wrap-front').find('.slides-front');
    var left = $(this).parent().siblings('.wrap-left').find('.slides-back');
    var right = $(this).parent().siblings('.wrap-right').find('.slides-back');
    
    front.trigger('slideTo', [ $(this).index() ]) ;
    left.trigger('slideTo', [ $(this).index() ]) ; 
    right.trigger('slideTo', [ $(this).index() ]) ;
  });
  
  /**********************
  * FUNCTIONS
  **********************/
  function createGaleries(){
    //create GALERIES
    //console.log("create galeries");
    $(".galerie").each(function(){
      
      //left
      $(this).find('.wrap-left .slides-back').carouFredSel({
        auto : false,
        circular : true,
        direction: "right",

        scroll : {
          easing : "easeInOutQuint",
          duration : 900
        },

        items: {
          visible: 1,
          width: 'variable',
          height: 'variable'
        }
      });

      // right
      $(this).find('.wrap-right .slides-back').carouFredSel({
        auto : false,
        circular : true,
        direction: "right",

        scroll : {
          easing : "easeInOutQuint",
          duration : 900
        },

        items: {
          visible: 1,
          width: 'variable',
          height: 'variable'
        }
      });

      // front
      $(this).find('.slides-front').carouFredSel({
        auto : false,
        circular : true,
        direction: "left",

        scroll : {
          easing : "easeInOutQuint",
          duration : 900,
          onBefore : function (oldItems, newItems, newSizes, duration){

            var selector = newItems.parents().find('.wrap-front').siblings('.thumbs').children('li');
            selector.removeClass('active');
            //.find('img').css("opacity", "0.4");
            selector.filter(':eq('+newItems.attr("rel")+')').addClass('active');
            //.find('img').css("opacity", "1");

          }
        },
        
        items: {
          visible: 1,
          width: 360,
          height: 'variable'
        }
      });
    });
  }

  function menuClick(e, element){
    // console.log("menuClick");

    if( element.attr("target")!="_blank" ){
      e.preventDefault();

      // clic désactivé si rubrique en cours
      if( !canClickMenu ) return false;

      // déplacement de la barre
      menuBar( element ); 

      // remise à zéro de tous les carousels horizontaux
      if( sousRubrique ){
        $(".horizontal").trigger('slideTo', [0, 0, null, null, function(){
          // onAfter : scroll vertical
          $("#vertical").trigger('slideTo', [ $("#vertical div#" + element.attr("href")) ]) ;
        }]);
        
      } else {
        
        $("#vertical").trigger('slideTo', [ $("#vertical div#" + element.attr("href")) ]) ;
      }
    }
  }

  function menuBar(target){

    var border = $("#border", "#mainMenu"),
    newIndex = target.index("#mainMenu a"),
    newParent = target.parent(),
    newParentWidth = newParent.width(),
    newParentPosition = newParent.position().left,
    oldParentPosition = $("#mainMenu li:eq("+menuIndex+")").position().left,
    newWidth;

    

    if( border.length ){
      $("#clickCatch").css("display","block");

      if( newIndex > menuIndex ){ // droite
        
        newWidth = newParentPosition;
        newWidth += newParentWidth;
        newWidth -= oldParentPosition;

        border
        .transition({ width : newWidth }, 300)
        .transition({ width : newParentWidth, left : newParentPosition+'px' }, 300, function(){ $("#clickCatch").css("display","none"); });
      
      } else { // gauche
        
        newWidth = $("#mainMenu li:eq("+menuIndex+")").width();
        newWidth += oldParentPosition;
        newWidth -= newParentPosition;

        border
        .transition({ width : newWidth, left : newParentPosition+'px' }, 300)
        .transition({ width : newParentWidth }, 300, function(){ $("#clickCatch").css("display","none"); });
        
      }

    } else {
      border = $('<div id="border"></div>');
      border.height( newParent.height()+1 ).appendTo($("#mainMenu"))
      .transition(
        {
          width : newParentWidth,
          left : newParentPosition+'px'
        }, 300
      );
    }

    $("#mainMenu a").removeClass("active, on");
    target.addClass("on");

    menuIndex = target.index("#mainMenu a");
  }

  $.fn.toggleOverlay = function(toggle){

    this.stop();

    if ( toggle == "hide" && this.css('visibility')!="hidden"){ 
      this.animate({opacity: 0}, 300, "easeOutQuad", function(){ 
        $(this).css("visibility", "hidden");
      });
    } 
    if(toggle == "show" && this.css('visibility')=="hidden"){
      this
      .css("visibility", "visible")
      .animate({opacity: 1}, 600, "easeInOutExpo");
    }

    return this;
  };

  $.fn.toggleCadre = function(){
    var cadre = $("#cadre"),
    footer = $("footer", this.parent().parent()),
    footerOpacity, width;

    if( parseInt(cadre.css("borderTopWidth"), 10) > 0 ) {
      footerOpacity = width = 0;
      oldClass = "active"; newClass = "on";

      //FOR IE9
      $('.subnav a').css({'color': '#F13'});
      $('.subnav a').hover(function(){
         $(this).css({'color': '#fff'});
      });
      $('.subnav a').mouseleave(function(){
         $(this).css({'color': '#F13'});
      });
    } else {
      footerOpacity = 1; width=70;
      oldClass = "on"; newClass = "active";
    }

    cadre.stop().transition(
      { borderTopWidth : width + "px",
        borderLeftWidth : width + "px",
        borderRightWidth : width + "px",
        borderBottomWidth : width + "px"
      }, 1000, easeInOutExpo
    );
    
    if(footerOpacity == 1){
      $("#mainMenu #border").fadeOut();
      footer.show().transition({opacity: footerOpacity}, 1000, easeInOutExpo, function(){
        footer.css("background-color","black");
      });
    } else {
      $("#mainMenu #border").fadeIn();
      footer.transition({opacity: footerOpacity}, 500, easeInOutExpo, function(){
        $(this).hide().css("background-color","transparent");
      });
    } 

    $("#mainMenu a."+oldClass).removeClass(oldClass).addClass(newClass);
    
    return this;
  };

  $.fn.showSubMenu = function(){
    submenuOn = true;
    var submenu = this.siblings(".submenu");

    overlay.toggleOverlay("show");

    submenu.css("visibility","visible").stop().transition({opacity: 1}, 1, function(){
      $(this).transition({bottom: "70px"}, 500, easeInOutExpo );
    });

    return this;
  };

  $.fn.hideSubMenu = function(){
    submenu.stop().transition({bottom: "-160px"}, 500, easeInOutExpo, function(){
      $(this).css("visibility","hidden");
      overlay.unbind();
    });

    return this;
  };

  $.fn.fullscreenCenterdImg = function () {
    var win = $(window),
    winRatio = win.width() / win.height(),
    imgRatio = this.width() / this.height();

    //----> ratio
    if ( winRatio < imgRatio ) {
      this.css({ "height" : win.height() , "width" : "auto" });
    } else {
      this.css({ "width" : win.width() , "height" : "auto" });
    }

    //----> centrage
    this.css({
      "left" : ( win.width() - this.width() ) / 2 , 
      "top" : ( win.height() - this.height() ) / 2 
    });
    
    return this;
  };

  $.fn.center = function (el) {
    this.css({ 
      "position":"absolute",
      "top" : ((el.height() - this.height()) / 2),
      "left": ((el.width() - this.width()) / 2)
    });

    return this;
  };

}, false); // end DOMready

//----> STATS
  // var stats = new Stats();
  // stats.getDomElement().style.position = 'absolute';
  // stats.getDomElement().style.left = '0px';
  // stats.getDomElement().style.top = '0px';
  // document.body.appendChild(stats.getDomElement());
  // setInterval(function () {
  //   stats.update();
  // }, 1000 / 60);


/**
jQuery.browser.mobile (http://detectmobilebrowser.com/)
**/
(function(a){jQuery.browser.mobile=/android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);