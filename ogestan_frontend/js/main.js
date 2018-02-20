$(document).ready(function(){

    //mobile menu
	var menuActive = false;
	var openDurationStatus = false;
    $('.header-nav .menu-icon').on('click', function(){
	    if(openDurationStatus){
		    return false;
		}
		openDurationStatus = true;
	    var nav = $('.header-nav');
		var menu = $('.main-menu');
	    if(!nav.hasClass('active')){
		    menuActive = true;
			nav.addClass('active');		    
		    menu.slideDown(function(){
			    openDurationStatus = false;
			});
		}
		else{
		    menuActive = false;
		    nav.removeClass('active');
			menu.slideUp(function(){
			    openDurationStatus = false;
			});
		}
	});
	
	//call popup
	var popupOpen = false;
	function popupForm(){
		if(!popupOpen && !messageOpen){
		    $('.popup').css('display', 'block');
			$('.cover').css('display', 'block');
			popupOpen = true;
		}
		else{
		    $('.popup').css('display', 'none');
			$('.cover').css('display', 'none');
			popupOpen = false;
		}
		$('.popup-form input[type=text]').val('');
	}
	$('.call-popup, .popup .close').on('click', function(){
        popupForm();
		return false;
	});
	
	//website messages
	var messageOpen = false;
	function messageText(){
		var messageText = $('.popup-message .popup-message-text').html();
		if(messageText){
			if(!messageOpen){
				$('.popup-message').css('display', 'block');
				$('.cover').css('display', 'block');
				messageOpen = true;
			}
			else{
				$('.popup-message').css('display', 'none');
				$('.cover').css('display', 'none');
				messageOpen = false;
			}
		}
	}
	messageText();
	$('.popup-message .close').on('click', function(){
	    messageText();
	});
	$('.cover').on('click', function(){
	    if(messageOpen){
		    messageText();
		}
		if(popupOpen){
		    popupForm();
		}
	});
	
	//fit body-content height
	function fitMainHeight(){
	    $('body').css('height', 'auto');
	    var windowHeight = $(window).height();
	    var bodyHeight = $('body').height();
	    if(bodyHeight<windowHeight){
	        mainHeight = $('.body-content').height();
	        $('.body-content').css('min-height', (mainHeight+(windowHeight-bodyHeight)));
	    }
	}
	fitMainHeight();
	
	//fixed blocks function
	var scrollTop = false;
	function fixedElement(elem, parentElem, reset){
	    if(elem && parentElem && elem[0] !== undefined && parentElem[0] !== undefined){
			var elemHeight = elem.height();
			var parentElemHeight = parentElem.height();
			var parentElemTopOffset = Math.ceil(parentElem.offset().top);
			var bodyScrollTop = $(document).scrollTop();
			if(reset){
				elem.css({
				    position: 'relative',
					top: 0,
					bottom: 'auto',
					zIndex: 10
				});
				return true;
			}
			if(bodyScrollTop > parentElemTopOffset && 
			   bodyScrollTop < ((parentElemTopOffset+parentElemHeight)-elemHeight) && 
			   scrollTop == false){
				elem.css({
				    position: 'fixed',
					top: 0,
					bottom: 'auto',
					zIndex: 10
				});
				scrollTop = true;
			}
			else if(bodyScrollTop < parentElemTopOffset && scrollTop == true || 
			        bodyScrollTop > ((parentElemTopOffset+parentElemHeight)-elemHeight) && 
					scrollTop == true){
				var topPos = 0;
				if(bodyScrollTop < parentElemTopOffset){
				    topPos = 0;
				}
				else{
				    topPos = (parentElemHeight-elemHeight);
				}
				elem.css({
				    position: 'absolute',
					top: topPos,
					bottom: 'auto',
					zIndex: 10
				});
				scrollTop = false;
			}
			else if(bodyScrollTop > ((parentElemTopOffset+parentElemHeight)-elemHeight) && 
			        elemHeight < parentElemHeight && 
					scrollTop == false){
				elem.css({
				    position: 'absolute',
					bottom: 0,
					top: 'auto',
					zIndex: 10
				});
			}
		}		
	}
	
	//actions on scroll
	$(document).on('scroll', function(){
	
	    //fixed block for page in page
		if($(window).width() > 999){
		    fixedElement($('.block-left-fixed'), $('.page-wrap'));
		}
		else{
		    fixedElement($('.block-left-fixed'), $('.page-wrap'), true);
		}
		
	});
	
	//on resize
	$(window).resize(function() {
	
        if($(window).width() > 1023){
		    $('.main-menu').css('display', 'block');
		}
		else if(!menuActive){
		    $('.main-menu').css('display', 'none');
		}
		
    });
	
});