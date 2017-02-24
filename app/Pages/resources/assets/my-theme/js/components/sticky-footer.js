var handleStickyFooter = function() {
	'use strict';

	$(document).ready(function() {
		var stickyFooter = function() {
			var docHeight = $(window).height();
			var footerHeight = $('footer').height();
			var footerTop = $('footer').position().top + footerHeight;

			if(footerTop < docHeight) {
				//$('footer').css('margin-top', (docHeight - footerTop) + 'px');
				$('footer').css('position', 'absolute');
				$('footer').css('left', '0');
				$('footer').css('right', '0');
				$('footer').css('bottom', '0');
			}
		};

		stickyFooter();

		$(window).resize(function() {
			stickyFooter();
		});
	});
};

