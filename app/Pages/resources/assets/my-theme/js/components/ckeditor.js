;(function($, window, document) {
	'use strict';

	/**
	 * Makes the ckEditor
	 */
	var loadCkeditor = function() {
		$('textarea.editor').livequery(function() {
			var editorId = $(this).attr('id');
			$(this).ckeditor(
				//CKEDITOR.replace(editorId,
				{
					customConfig: '/assets/admin/js/ckconfig.js',
				}, function(e) {
					delete CKEDITOR.instances[$(e).attr('id')];
				});
		});
	}
	loadCkeditor();

})(jQuery, window, document);