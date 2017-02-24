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
		if(confirm('Really reset?')) {
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