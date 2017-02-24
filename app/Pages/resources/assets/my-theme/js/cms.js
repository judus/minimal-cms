;(function($, window, document) {
	'use strict';

	var mainBar = $('.minimal-bar-main');
	var modal = $('#minimal-modal-empty');

	var init = function() {

		if ($('html.minimal').length > 0) {

			$('html.minimal').addClass('minimal-hide-btn-labels');

			if (mainBar.hasClass('on')) {
				$('html').addClass('minimal-on');
			}

			handleMainEditButton();
			handleNewPageButton();
			handleDuplicatePageButton();
			handleActivatePageButton();
			handleActivateButton();
			handleAreaAddButton();
			handleEditElementButton();
			handleDuplicateButton();
			handleTimerElementButton();
			handleCacheElementButton();
			handleGetterButton();
			handleButtonForm();
			handleSortables();
			handleDatepickers();
			handleCKEditor();
			handleCKFinder();
			handleSettingsButton();
		}
	};

	var handleMainEditButton = function() {
		var toggle = 1;

		if(mainBar.hasClass('on')) {
			toggle = 0;
		}

		mainBar.find('button.toggle-edit').on('click', function(e) {
			$.post($(this).data('remote'), {toggle: toggle}, function() {
				location.reload();
			});
		});
	};

	var handleActivateButton = function() {
		$('.minimal-bar-element .toggle-edit').on('click', function(e) {
			var button = $(this);
			var element = button.parents('.minimal-element').first();
			var nodeId = element.data('id');

			$.post($(this).data('remote'), {node: nodeId}, function(node) {
				if(node.active === 1) {
					element.removeClass('minimal-mute');
					button.find('i.fa-toggle-on').show();
					button.find('i.fa-toggle-off').hide();
				} else {
					element.addClass('minimal-mute');
					button.find('i.fa-toggle-on').hide();
					button.find('i.fa-toggle-off').show();
				}
			});
		});
	};

	var handleActivatePageButton = function() {
		var button = $('.minimal-bar .minimal-activate-page');
		var element = $('body');

		if (button.data('active') !== 1) {
			element.addClass('minimal-mute');
		}

		button.on('click', function(e) {
			var nodeId = button.data('id');
			$.post($(this).data('remote'), {node: nodeId}, function(node) {
				if(node.active === 1) {
					element.removeClass('minimal-mute');
					button.find('i.fa-toggle-on').show();
					button.find('i.fa-toggle-off').hide();
				} else {
					element.addClass('minimal-mute');
					button.find('i.fa-toggle-on').hide();
					button.find('i.fa-toggle-off').show();
				}
			});
		});
	};

	var handleAreaAddButton = function() {
		$('.minimal-bar .add-cte').on('click', function(e) {
			e.preventDefault();

			var form = $(this).parents('form');
			var remote = form.attr('action');
			var values = form.serialize();

			$.post(remote, values, function(response) {
				modal.find('.modal-content').html(response);
				openModal(response, function() {
					handleElementSelect();
				});
			});
		});
	};

	var handleElementSelect = function() {
		$('.minimal.select-cte').on('click', function(e) {
			e.preventDefault();

			var form = $(this).parents('form');
			var remote = form.attr('action');
			var values = form.serialize();

			$.post(remote, values, function(response) {
				openModal(response);
			});
			return false;
		});
	};

	var handleEditElementButton = function() {
		$('.minimal-bar .edit-cte').on('click', function(e) {
			$.get($(this).data('remote'), function(response) {
				openModal(response);
			});
		});
	};

	var handleTimerElementButton = function() {
		$('.minimal-bar .timer-cte').on('click', function(e) {
			$.get($(this).data('remote'), function(response) {
				openModal(response);
			});
		});
	};

	var handleCacheElementButton = function() {
		$('.minimal-bar .cache-cte').on('click', function(e) {
			$.get($(this).data('remote'), function(response) {
				openModal(response);
			});
		});
	};

	var handleGetterButton = function() {
		$('.minimal-bar .minimal-getter').on('click', function(e) {
			$.get($(this).data('remote'), function(response) {
				openModal(response);
			});
		});
	};

	var handleDuplicateButton = function() {
		$('.minimal-bar .minimal-duplicate').on('click', function(e) {
			var button = $(this);
			var element = button.parents('.minimal-element').first();
			var nodeId = element.data('id');

			$.post(button.data('remote'), {node: nodeId}, function(node) {
				location.reload();
			});
		});
	};

	var handleDuplicatePageButton = function() {
		$('.minimal-bar .minimal-duplicate-page').on('click', function(e) {
			var button = $(this);
			var element = button.parents('.minimal-element').first();
			var nodeId = $(this).data('id');

			$.post(button.data('remote'), {node: nodeId}, function(response) {
				//window.location.replace(response);
			});
		});
	};

	var openModal = function(content, callback) {
		modal.find('.modal-content').html(content);
		modal.find('.modal-dialog').removeClass('modal-fluid');
		modal.find('.modal-dialog').addClass('modal-lg');

		typeof callback === 'function' && callback(modal);
		handleDatepickers();
		handleCKEditor();
		handleCKFinder();
		modal.modal('show');
	};

	var openModalName = function(name, content, callback) {
		var modal = $('#'+name);

		if (content.length > 0) {
			modal.find('.modal-content').html(content);
			modal.find('.modal-dialog').removeClass('modal-fluid');
			modal.find('.modal-dialog').addClass('modal-lg');
			typeof callback === 'function' && callback(modal);
			handleDatepickers();
			handleCKEditor();
			handleCKFinder();
		}

		modal.modal('show');
	};

	var handleNewPageButton = function() {
		$('.minimal-bar .page-new').on('click', function(e) {
			$.get($(this).data('remote'), function(response) {
				openModal(response);
				/*
				modal.find('.modal-content').html(response);
				modal.modal('show');
				*/
			});
		});
	};

	var modalSettingsIsLoaded = false;
	var handleSettingsButton = function() {
		$('.minimal-bar .minimal-settings').on('click', function(e) {

			$.get($(this).data('remote'), function(response) {
				openModalName('minimal-modal-settings', response, function(modal) {
					var dialog = modal.find('.modal-dialog');
					dialog.removeClass('modal-lg');
					dialog.addClass('modal-fluid');
				});
				/*
				modal.find('.modal-content').html(response);
				modal.modal('show');
				*/
			});
		});
	};

	var handleButtonForm = function() {
		$('.minimal-bar .minimal-form-submit').on('click', function(e) {
			$(this).find('form').submit();
		});
	};

	var handleSortables = function() {
		var receiver;

		$('.minimal-sortable').sortable({
			handle: ".minimal-bar .title",
			placeholder: "minimal-drop-placeholder",
			connectWith: ".minimal-sortable",
			start: function() {
				receiver = null;
				$('body').addClass('minimal-drag');
			},
			stop: function(event, ui) {
				var source = $(ui.item);
				var next = source.next();
				var target = $(event.target);

				var data = {
					source_id: source.data('id')
				};

				if (receiver !== null) {
					data.target_id = receiver.data('id');
				} else {
					data.target_id = target.data('id');
				}

				if (next.length > 0) {
					data.next_id = next.data('id');
				}

				$.post('/minimal/contents/move', data);

				$('body').removeClass('minimal-drag');
			},
			receive: function(event, ui) {
				receiver = $(event.target);
			}
		});
	};

	var handleDatepickers = function() {
		$('.datepicker').datepicker({
			format: 'YYYY-MM-DD',
		});
		$('.datetimepicker').datetimepicker({
			format: 'YYYY-MM-DD HH:mm:ss',
		});
	};

	var handleCKEditor = function() {
		/**
		 * Makes the ckEditor
		 */

		$('textarea.ckeditor').each(function() {
			var editorId = $(this).attr('id');
			$(this).ckeditor(
				//CKEDITOR.replace(editorId,
				{
					customConfig: '/assets/pages/public/build/my-theme/js/ckconfig.js',

				}, function(e) {
					delete CKEDITOR.instances[$(e).attr('id')];
				});
		});
	};

	var handleCKFinder = function () {
		$('.ckfinder.ckfile').each(function() {
			$(this).click(function() {
				var target = $(this).parent().find('input');
				CKFinder.popup({
					chooseFiles: true,
					onInit: function(finder) {
						finder.on('files:choose', function(evt) {
							var file = evt.data.files.first();
							target.val(file.getUrl());
						});
					}
				});
			})
		});
		$('.ckfinder.ckimage').each(function() {
			$(this).click(function() {
				var target = $(this).parent().find('input');
				CKFinder.popup({
					chooseFiles: true,
					onInit: function(finder) {
						finder.on('files:choose', function(evt) {
							var file = evt.data.files.first();
							target.val(file.getUrl());
						});
						finder.on('file:choose:resizedImage', function(evt) {
							target.val(evt.data.resizedUrl);
						});
					}
				});
			})
		});
	}

	init();

})(jQuery, window, document);
