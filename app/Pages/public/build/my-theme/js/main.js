/*!
 * minimal-framework
 * https://github.com/judus/minimal-framework
 * Last updated: 2017-02-19
 * 
 * Made by Julien Duseyau
 * 
 * Copyright (c) 2017 Julien Duseyau
 * License MIT license
 */
;(function($, window, document) {
	'use strict';

	var el;

	var app = {
		name: 'minimal',
		lang: null,
		registry: [],
		isMobile: false,
		isTouch: Modernizr.touchevents,
		isIos: /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
		isAndroid: /(Android)/gi.test(navigator.userAgent),

		// app init
		init: function() {
			el = {
				html: $('html')
			};

			this.register(handleStickyFooter);

			FastClick.attach(document.body);
			this.lang = el.html.attr('lang');
			this.isIos && el.html.addClass('is-ios');
			this.isAndroid && el.html.addClass('is-android');

			this.runFunctions();
		},

		// register init function
		register: function(fn) {
			return this.registry.push(fn) - 1;
		},

		// unregister function from registry
		unregister: function(i) {
			/^f/.test(typeof i) ?
				(i = this.registry.indexOf(i)) > -1 ?
					this.registry.splice(i, 1) :
					void(0) :
				this.registry.splice(i, 1);
		},

		// run functions from registry
		runFunctions: function() {
			var fn = this.registry;
			for(var i in fn) {
				fn[i]();
			}
		}

	};

	// attach app to window object
	window.app = app;

	// DOM ready
	$(app.init.bind(app));

})(jQuery, window, document);;
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

