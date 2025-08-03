$(document).ready(function() {
    "use strict";
    
    
    /* ==========================
	   JOIN-US FORM
	=============================*/

	$('#submit_btn').on('click', function() { 
        var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields		
		$("#join-us-form input[required=true]").each(function(){
			$(this).css('border-color',''); 
			if(!$.trim($(this).val())){ //if this field is empty 
				$(this).css('border','solid 1px red'); //change border color to red   
				proceed = false; //set do not proceed flag
			}
			//check invalid email
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
			if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
				$(this).css('border','solid 1px red'); //change border color to red   
				proceed = false; //set do not proceed flag				
			}	
		});
        if(proceed) //everything looks good! proceed...
        {
			//get input field values data to be sent to server
            var post_data = {
				'first_name'	: $('input[name=first_name]').val(),
                'last_name'		: $('input[name=last_name]').val(),				
				'user_email'	: $('input[name=email]').val(), 
				'phone_number'	: $('input[name=phone]').val(), 
				'website'		: $('input[name=website]').val()
			};
	        //Ajax post data to server
            $.post('join_us.php', post_data, function(response){ 
				if(response.type == 'error'){ //load json data from server and output message     
					var output = '<div class="error">'+response.text+'</div>';
				}else{
				    output = '<div class="success">'+response.text+'</div>';
					//reset values in all input fields
					$("#join-us-form  input[required=true]").val(''); 
				}
				$("#join-us-results").hide().html(output).slideDown();
            }, 'json');
        }
    });
    
    //reset previously set border colors and hide all message on .keyup()
    $("#join-us-form  input[required=true]").keyup(function() { 
        $(this).css('border-color',''); 
        $("#join-us-results").slideUp();
    });
    

    // Anchor Smooth Scroll
    $('body').on('click', '.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 80)
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

  

    // Review
    $('.review-text').slick({
        dots: true,
        infinite: true,
        arrows: false,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
	
    // Video Lightbox
    $('.swipebox-video').swipebox();

    // Scrollspy
    $('body').scrollspy({
        target: ".navbar",
        offset: 105
    })

    // Stellar
    $.stellar({
        horizontalOffset: 50,
        verticalOffset: 50,
        responsive: true
    });

    // Fixed Header
    $(window).scroll(function() {
        var value = $(this).scrollTop();
        if (value > 80)
            $(".navbar-inverse").css("background", "#fff");
        else
            $(".navbar-inverse").css("background", "transparent");
    });
   
	
	// Fixed Header
    $(window).scroll(function() {
        var value = $(this).scrollTop();
        if (value > 80)
            $(".navbar-lg .navbar-nav > li > a").css("color", "#024d94" );
        else
            $(".navbar-lg .navbar-nav > li > a").css("color", "#024d94");
    });
	
	// Fixed Header
    $(window).scroll(function() {
        var value = $(this).scrollTop();
        if (value > 80)
            $(".navbar-inverse").css("box-shadow", " 0 1px 8px rgba(0,0,0,.2)" );
        else
            $(".navbar-inverse").css("box-shadow", "none" );
    });

    

});

// Product Filter
$(window).load(function() {
    "use strict";
    var $container = $('.portfolio-grid');
    $container.isotope({
        layoutMode: "masonry",
        masonry: {
            columnWidth: 5
        },
        itemSelector: '.portfolio-item',
        transitionDuration: '0.8s'
    });
    var $optionSets = $('.portfolio-filter'),
        $optionLinks = $optionSets.find('a');
    $optionLinks.on(function() {
        var $this = $(this);
        // don't proceed if already selected
        if ($this.hasClass('active')) {
            return false;
        }
        var $optionSet = $this.parents('.portfolio-filter');
        $optionSet.find('.active').removeClass('active');
        $this.addClass('active');
        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');

        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[key] = value;
        if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
            changeLayoutMode($this, options);
        } else {
            // otherwise, apply new options
            $container.isotope(options);
        }
        return false;
    });
});


$('.count').each(function() {
    $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
    }, {
        duration: 2000,
        easing: 'swing',
        step: function(now) {
            $(this).text(Math.ceil(now));
        }
    });
});

$(function() {
    $('.btn-circle').on('click', function() {
        $('.btn-circle.btn-info').removeClass('btn-info').addClass('btn-default');
        $(this).addClass('btn-info').removeClass('btn-default').blur();
    });
});




