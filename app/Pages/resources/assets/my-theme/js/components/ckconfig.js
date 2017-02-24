CKEDITOR.editorConfig = function(config) {
	// Define changes to default configuration here. For example:
	config.language = 'en';
	// config.uiColor = '#AADC6E';
	config.skin = 'moono';
	config.stylesSet = 'customstyles:/assets/pages/public/build/my-theme/js/ckconfig.js';
	config.allowedContent = true;
	config.filebrowserBrowseUrl = '/assets/pages/public/build/my-theme/vendor/ckfinder/ckfinder.html';
	config.filebrowserImageBrowseUrl = '/assets/pages/public/build/my-theme/vendor/ckfinder/ckfinder.html?type=Images';
	config.filebrowserFlashBrowseUrl = '/assets/pages/public/build/my-theme/vendor/ckfinder/ckfinder.html?type=Flash';
	config.filebrowserUploadUrl = '/assets/pages/public/build/my-theme/vendor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files';
	config.filebrowserImageUploadUrl = '/assets/pages/public/build/my-theme/vendor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images';
	config.filebrowserFlashUploadUrl = '/assets/pages/public/build/my-theme/vendor/core/connector/php/connector.php?command=QuickUpload&type=Flash';
	config.filebrowserWindowWidth = '800';
	config.filebrowserWindowHeight = '600';
	/*
		config.removePlugins = 'div, language, smiley, iframe, flash, specialchar, '
								+'symbols, templates, newpage, save, print, '
								+'preview, font, a11yhelp, placeholder, locationmap, '
								+'googledocs, forms, fontawesome, spellchecker, '
								+'about, autosave, slideshow, uploadcare, '
								+'texttransform, scayt, wsc, pagebreak';
	*/
};
