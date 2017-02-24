function onContextMenu(e, row) {

	e.preventDefault();
	$(this).treegrid('select', row.id);

	$(".easyui-menu").each(function() {
		$(this).menu('show', {
			left: e.pageX,
			top: e.pageY
		});
	});
}

var idIndex = 1000;

var append = function(target) {
	var node = $('#'+ target).treegrid('getSelected');

	$.ajax({
		url: "/minimal/nodes/"+node.id+"/append",
		method: 'POST',
		success: function(response) {
			console.log(response);
			$('#' + target).treegrid('reload', node.id);

		}
	})

}


var copyCutPaste = function(I)
{
	I = I || {};

	I.tree = I.tree || null;
	I.mode = I.mode || 'copy';
	I.copyId = I.copyId || null;
	I.pasteId = I.pasteId || null;

	I.getCopyId = function() {
		return $('#' + I.tree).treegrid('getSelected').id;
	}

	I.getPasteId = function() {
		return $('#' + I.tree).treegrid('getSelected').id;
	}

	I.copy = function() {
		I.copyId = I.getCopyId();
		I.mode = 'copy';

		console.log(I);
	}

	I.cut = function() {
		I.copyId = I.getCopyId();
		I.mode = 'cut';
		console.log(I);
	}

	I.paste = function() {
		I.pasteId = I.getPasteId();

		console.log(I);
		$.ajax({
			url: '/minimal/nodes/'+I.mode,
			method: 'POST',
			data: {
				copyId: I.copyId,
				pasteId: I.pasteId
			},
			success: function(response) {
				$('#' + I.tree).treegrid('reload', I.copyId);
				$('#' + I.tree).treegrid('reload', I.pasteId);
			}
		});
	}
	return I;
}

/*
var remove = function(target) {
	var node = $('#' + target).treegrid('getSelected');

	$.ajax({
		//url: "/minimal/nodes"/" + node.id + "/destroy",
		url: "/minimal/nodes"/" + node.id + "/destroy",
		method: "DELETE",
		success: function(response) {
			console.log(response);

			$('#' + target).treegrid('reload', node.id);
			///$('#' + target).treegrid('getData', node.id);
			//$('#' + target).treegrid('expand', node.id);
			/*
			$('#' + target).treegrid('append', {
				parent: node.id,
				data: [{
					id: idIndex++,
					name: 'New node'
				}]
			});
			* /
		}
	})


}
*/

var remove = function remove(target) {
	var node = $('#' + target).treegrid('getSelected');
	if(node) {

		$.ajax({
			url: "/minimal/nodes/" + node.id ,
			//url: "/nodes",
			method: "DELETE",
			success: function(response) {
				console.log(response);
			}
		});

		$('#'+ target).treegrid('remove', node.id);
	}
}

var collapse = function (target) {
	var node = $('#'+ target).treegrid('getSelected');
	if(node) {
		$('#'+ target).treegrid('collapse', node.id);
	}
}

var expand = function(target) {
	var node = $('#' + target).treegrid('getSelected');
	if(node) {
		$('#' + target).treegrid('expand', node.id);
	}
}

var ctAreaAdd = function() {
	var footer = $('<div id="ctAreaAddFooter">');
	var win = $('<div id="ctAreaAddWindow">');

	footer.appendTo('body');
	win.appendTo('body');
	win.html('Hello');

	win.window({
		width: 800,
		height: 600,
		modal: true,
		footer: '#ctAreaAddFooter'
	});

	win.window('open');
}

var submitForm = function(btn) {
	var form = btn.parents('form');

	$.ajax({
		url: form.attr('action'),
		data: form.serialize(),
		method: 'POST',
		success: function(response){
			console.log(response);
		}
	});
}



var openActionCount = 0;

var openInWindow = function(target) {
	var node = $('#' + target).treegrid('getSelected');
	if(node) {
		var win = $('#win').clone();
		win.attr('id', win.attr('id')+'-'+openActionCount++);
		win.window({
			width: 600,
			height: 400,
			modal: false,
			onLoad: function() {
				App.init();
			}
		}).window('refresh', 'minimal/nodes/23');

	}
}

var handleTreeLists = function() {
	$('.treelist').each(function() {
		$(this).tree({
			url: '/minimal/nodes',
			formatter: function(node) {
				return node.name;
			}
		});
	});
}

var handleTreeGrids = function() {

	$.extend($.fn.treegrid.methods, {
		editCell: function(jq, param) {

			return jq.each(function() {
				var tg = $(this);
				var opts = $(this).treegrid('options');
				var fields = $(this).treegrid('getColumnFields', true).concat($(this).treegrid('getColumnFields'));
				for(var i = 0; i < fields.length; i++) {
					var col = $(this).treegrid('getColumnOption', fields[i]);
					col.editor1 = col.editor;
					if(fields[i] != param.field) {
						col.editor = null;
					}
				}
				$(this).treegrid('beginEdit', param.index);

				var ed = $(this).treegrid('getEditor', param);

				if(ed) {

					if($(ed.target).hasClass('combobox-f')) {
						var oldValue = $(ed.target).combobox('getValue');

						$(ed.target).combobox({
							value: oldValue,
							formatter: function(node) {
								return node.name;
							},
							onSelect: function() {
								var newValue = $(ed.target).combobox('getValue');
								if (oldValue != newValue && newValue != null)
								{
									$.ajax({
										url: '/minimal/nodes/' + param.index,
										method: 'POST',
										data: {
											_method: 'PUT',
											field: param.field,
											value: $(ed.target).combobox('getValue')
										},
										success: function(response) {
											tg.treegrid('updateRow', {
												index: response.id,
												row: response
											});
											tg.treegrid('endEdit', param.index);
										}
									});
								} else {
									tg.treegrid('endEdit', param.index);
								}
							}
						});



					} else if ($(ed.target).hasClass('textbox-f')) {


						$(ed.target).textbox('textbox').focus();

					} else {
						$(ed.target).focus();
					}
				}

				for(var i = 0; i < fields.length; i++) {
					var col = $(this).treegrid('getColumnOption', fields[i]);
					col.editor = col.editor1;
				}

				$(ed.target).keypress(function(e) {
					var key = e.keyCode || e.which;
					if(key == 9) {
						e.preventDefault();

						$.ajax({
							url: '/minimal/nodes/' + param.index,
							method: 'POST',
							data: {
								_method: 'PUT',
								field: param.field,
								value: $(ed.target).val()
							}
						});

						tg.treegrid('endEdit', param.index);
						return false;
					}
				});


			});
		},

		enableCellEditing: function(jq) {
			return jq.each(function() {
				var dg = $(this);
				var opts = dg.treegrid('options');
				opts.oldOnDblClickCell = opts.onDblClickCell;
				opts.onDblClickCell = function(column, node) {
					if(opts.editIndex != undefined) {
						if(dg.treegrid('validateRow', opts.editIndex)) {
							dg.treegrid('endEdit', opts.editIndex);
							opts.editIndex = undefined;
						} else {
							return;
						}
					}
					dg.treegrid('select', node.id);
					dg.treegrid('editCell', {
						index: node.id,
						field: column
					});

					$('body').click(function() {
						dg.treegrid('endEdit', opts.editIndex);
						;
					})

					opts.editIndex = node.id;
					opts.oldOnDblClickCell.call(this, node.id, column);
				}
			});

		}
	});

	$('.treegrid').each(function() {
		var treegrid = $(this);
		$(this).treegrid({
			url: $(this).data('url'),
			formatter: function(node) {
				return node.name;
			},
			onClickRow: function(index, row) {
				currentNode = index;
				$.ajax({
					url: '/minimal/nodes/'+index.id+'/tabs',
					success: function(response) {
						$('#content').html(response);
						App.initTabs();
					}
				});

			},
			onLoadSuccess: function(row) {
				treegrid.treegrid('enableDnd', row ? row.id : null);
			},
			onAfterEdit: function(index) {
				treegrid.treegrid('load', index.id);
			},
			onStartDrag: function(row) {
				console.log(row);
			},
			onDragOver: function(targetRow, sourceRow) {
				console.log('Possible to drop ' + sourceRow.id + ' in ' + targetRow.id);
			},
			onDrop: function(targetRow, sourceRow, point) {
				console.log('Dropped '+sourceRow.id+' in '+targetRow.id+' at point '+point);
				$.ajax({
					url: '/minimal/nodes/move',
					method: 'POST',
					data: {
						sourceId: sourceRow.id,
						targetId: targetRow.id,
						point: point
					},
					success: function(response) {
					}
				});

			}

		});

		//$(this).treegrid('enableFilter').treegrid('enableCellEditing');
		$(this).treegrid('enableCellEditing');

	});
}

var handleTabs = function() {
	$('.easyui-tabs').each(function() {
		var tabs = $(this);
		$(this).tabs({
			onSelect: function(title, index) {
			},
			onLoad: function() {
				App.initPropertyGrid();
				App.initCodeEditor();
				App.initActions();
				App.initCKEditor();
				App.initCKFinder();
				App.initDatepicker();
			}
		});
		$(this).tabs('resize', {
			width: '100%',
			height: $(this).height()
		});

	})
}


var CodeEditor = function(I) {
	I = I || {};

	I.theme = I.theme || 'default';
	I.select = I.select || $('select[name=theme]');
	I.element = I.element || $('textarea.codemirror');
	I.form = I.form || I.element.parents('form');
	I.clickedElement = null;
	I.currentAction = null;

	I.makeEditor = CodeMirror.fromTextArea(I.element.get(0), {
		mode: "php",
		lineNumbers: true,
		indentWithTabs: true,
		smartIndent: true,
		electricChars: false,
		theme: I.theme
	});

	I.editor = I.editor || I.makeEditor;

	I.submit = function() {
		if(confirm('Really overwrite?')) {
			I.element.val(I.editor.getValue());
			var data = I.form.serialize();
			$.ajax({
				url: I.form.attr('action'),
				data: data,
				method: 'POST',
				success: function(response) {
					I.editor.setValue(response);
				}
			});
		}
	}

	I.reset = function() {
		if (confirm('Really reset?')) {
			I.editor.setValue(I.element.val());
		}
	}

	I.select.on('change', function() {
		I.editor.setOption("theme", I.select.val());
	});

	I.form.find('[data-action]').click(function(e) {
		e.preventDefault();

		I.clickedElement = $(this);
		I.currentAction = I.clickedElement.data('action');

		if(I.currentAction == 'submitCodeEditor') {
			I.submit();
		}
		if(I.currentAction == 'resetCodeEditor') {
			I.reset();
		}
	});

	return I;
}


var handleCodeEditor = function() {
	$('textarea.codemirror').each(function() {
		CodeEditor({element: $(this)});
	});
}

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

var handleDatepicker = function() {
	//$('.datepicker').datepicker();
	//$('.datetimepicker').datetimepicker();
};


var handleCKFinder = function() {
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

var handleContextMenus = function() {

	$(".easyui-menu").each(function() {
		var target = $(this).data('target');
		var copier = copyCutPaste({tree: target});

		$(this).find('div[data-action]').each(function(){
			$(this).click(function() {

				var action = $(this).data('action');

				if(action == 'append') {
					console.log('append action');
					append(target);
				}

				if(action == 'open') {
					console.log('open in window action');
					openInWindow(target);
				}

				if(action == 'remove') {
					console.log('remove action');
					remove(target);
				}

				if(action == 'collapse') {
					console.log('collapse action');
					collapse(target);
				}

				if(action == 'expand') {
					console.log('expand action');
					expand(target);
				}

				if(action == 'copy') {
					copier.copy();

				}

				if(action == 'cut') {
					copier.cut();
				}

				if(action == 'paste') {
					copier.paste();
				}

			})
		});
	});

}

var handlePropertyGrid = function() {
	$('.property-grid').each(function() {
		var url = null;

		if (currentNode != null)
		{
			url = $(this).data('url').replace('{id}', currentNode.id)
		}

		$(this).propertygrid({
			url: url,
			method: 'GET',
			showGroup: true,
			scrollbarSize: 0,
			onLoadSuccess: function() {
				$('.easyui-draggable').draggable({
					revert: true,
					proxy: function(source) {
						var p = $('<div style="border:1px solid #ccc;width:80px"></div>');
						p.html($(source).html()).appendTo('body');
						return p;
					}
				});
				$('.easyui-droppable').droppable({
					onDragEnter: function(e, source) {

					},
					onDragLeave: function(e, source) {

					},
					onDrop: function(e, source) {
						var nodeId = $(source).data('node');
						$.ajax({
							url: '/minimal/nodes/'+nodeId+'/json',
							success: function() {
								console.log(response);
							}
						});
						$(source).appendTo($(this));
					}
				});
			}
		});
	})

}

var handleActions = function() {
	$('body').find('a[data-action]').each(function() {
		console.log($(this).data('action'));
		$(this).click(function() {
			var action = $(this).data('action');

			if(action == 'ctAreaAdd') {
				console.log('ctAreaAdd action');
				ctAreaAdd();
			}

			if(action == 'submit') {
				submitForm($(this));
			}

			if(action == 'submit') {
				submitCodeEditor($(this));
			}

		})
	})
}



var App = function() {
	"use strict";
	/*
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	*/

	return {
		init: function() {

			handleTreeLists();
			handleTreeGrids();
			handleContextMenus();
			handlePropertyGrid();
			handleCodeEditor();
			handleCKEditor();
			handleCKFinder();
			handleDatepicker();
			handleActions();

		},
		initTabs: function() {
			handleTabs();
		},
		initPropertyGrid: function() {
			handlePropertyGrid();
		},
		initCodeEditor: function() {
			handleCodeEditor();
		},
		initDatepicker: function() {
			handleDatepicker();
		},
		initCKEditor: function() {
			handleCKEditor();
		},
		initCKFinder: function() {
			handleCKFinder();
		},
		initActions: function() {
			handleActions();
		}
	};
}();



