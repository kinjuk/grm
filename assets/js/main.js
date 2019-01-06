(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill
			$('form').placeholder();

		// Prioritize "important" elements on medium
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Off-Canvas Navigation

			// Navigation Panel Toggle
				$('<a href="#navPanel" class="navPanelToggle"></a>')
					.appendTo($body);

			// Navigation Panel
				$(
					'<div id="navPanel">' +
						$('#nav').html() +
						'<a href="#navPanel" class="close"></a>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'right'
					});

			// Fix: Remove transitions on WP<10
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navPanel')
						.css('transition', 'none');


	});

})(jQuery);

var map = '';
var center;

function initialize() {
		var mapOptions = {
				zoom: 16,
				center: new google.maps.LatLng(41.543224, -8.785117),
				scrollwheel: false

		};

		map = new google.maps.Map(document.getElementById('google-map'),  mapOptions);

		google.maps.event.addDomListener(map, 'idle', function() {
			calculateCenter();
		});

		google.maps.event.addDomListener(window, 'resize', function() {
			map.setCenter(center);
		});
}

function calculateCenter() {
		center = map.getCenter();
}

function loadGoogleMap(){
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA1Bt3Wk5SvYPwja_bKN8E1SU2KWGBY2uo&v=3.exp&sensor=false&' + 'callback=initialize';
		document.body.appendChild(script);
}

$(document).ready(function(){

		loadGoogleMap();

		$('.current-year').text(new Date().getFullYear());

});
