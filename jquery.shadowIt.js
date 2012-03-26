/*
	SHADOW IT
	Plugin created by Etienne TREMEL
	http://www.etiennetremel.net
	
	Allow you to add a nice shadow around an image.
	It's a 9rule system using jQuery
	
	Check the CSS file if you want to change the font style.
*/

(function($){
	 var methods = {
	 	init : function( options ) {
	 		var defaults = {
				heightTop:			5,	//Height of the top image shadow
				widthLeft:			23,	//Width of the left image shadow
				heightBottom:		23,	//Height of the bottom image shadow
				widthRight:			25,	//Width of the right image shadow
				borderSize:	{
					top:	0,	//Border Size (you can you use that as a polaroid image)
					right:	0,
					bottom:	0,
					left:	0
				},
				useTitle:			false,	//If true, show the content from the alt attribute of the picture
				backgroundColor: 	'#DDD',
				layout: 			'<div class="wShadow">'+
									'	<div class="top">'+
									'		<div class="topleft"><img src="../images/shadow_topleft.png" /></div>'+
									'		<div class="topcenter"><img src="../images/shadow_topcenter.png" /></div>'+
									'		<div class="topright"><img src="../images/shadow_topright.png" /></div>'+
									'	</div>'+
									'	<div class="wrapper">'+
									'		<div class="left"><img src="../images/shadow_left.png" /></div>'+
									'		<div class="image">'+
									'			<div class="title"></div>'+
									'		</div>'+
									'		<div class="right"><img src="../images/shadow_right.png" /></div>'+
									'	</div>'+
									'	<div class="bottom">'+
									'		<div class="bottomleft"><img src="../images/shadow_bottomleft.png" /></div>'+
									'		<div class="bottomcenter"><img src="../images/shadow_bottomcenter.png" /></div>'+
									'		<div class="bottomright"><img src="../images/shadow_bottomright.png" /></div>'+
									'	</div>'+
									'</div>',
				complete: function(element) {
					//Code here
				}
			};
		        
	        var settings = $.extend({}, defaults, options);
	       
			return this.each(function(){
				var image = $(this);
				
				image.load(function() {
					
					var imageWidth = $(this).width();
					var imageHeight = $(this).height();
					var width = imageWidth + settings.borderSize.left + settings.borderSize.right;
					var height = imageHeight + settings.borderSize.top + settings.borderSize.bottom;
					var element = $(settings.layout);
					var cloneImage=$(this).clone();
					
					element.width(parseInt(width + settings.widthLeft + settings.widthRight));
					element.height(parseInt(height + settings.heightTop + settings.heightBottom));
					
					element.find('.image').css({
						'padding-top': 		settings.borderSize.top + 'px',
						'padding-right': 	settings.borderSize.right + 'px',
						'height':			imageHeight + settings.borderSize.bottom + 'px',
						'padding-left':		settings.borderSize.left + 'px',
						'backgroundColor': 	settings.backgroundColor
					});
					
					element.find('.title').width(imageWidth)
										  .height(settings.borderSize.bottom);
					
					if(settings.useTitle) element.find('.title').append(cloneImage.attr('alt'));
					
					cloneImage.removeAttr('width')
							  .removeAttr('height')
							  .width(imageWidth)
							  .height(imageHeight);
	
					element.find('.left, .left img, .right, .right img').height(height);
					element.find('.topcenter, .topcenter img, .bottomcenter, .bottomcenter img').width(width);
					element.find('.topleft, .left, .left img, .bottomleft').width(settings.widthLeft);
					element.find('.topright, .right, .right img, .bottomright').width(settings.widthRight);
					
					element.find('.topleft, .topcenter, .topcenter img, .topright').height(settings.heightTop);
					element.find('.bottomleft, .bottomcenter, .bottomcenter img, .bottomright').height(settings.heightBottom);
					
					element.find('.image').prepend(cloneImage);
					image.replaceWith(element);
					
					//Callback
					if(typeof settings.complete=='function') settings.complete($(this));
					
				}).each(function() {
					 if(this.complete) image.load();
				});				
			});
		}
	};

	$.fn.shadowIt = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.shadowIt' );
		}    
	};

})(jQuery);