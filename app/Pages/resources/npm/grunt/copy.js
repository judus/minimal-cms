module.exports = {
	jquery: {
		files: [
			{
				expand: true,
				cwd: 'bower_components/jquery/dist',
				src: ['**/jquery.min.js'],
				dest: '<%= paths.source %>/vendor/jquery'
			},
			{
				expand: true,
				cwd: 'bower_components/cookie',
				src: ['**/cookie.min.js'],
				dest: '<%= paths.source %>/vendor/cookie'
			},

		],
	},
	bootstrap: {
		files: [
			{
				expand: true,
				cwd: 'bower_components/bootstrap/dist',
				src: ['**/bootstrap.min.js'],
				dest: '<%= paths.source %>/vendor/bootstrap'
			},
			{
				expand: true,
				cwd: 'bower_components/bootstrap/dist',
				src: ['**/bootstrap.min.css'],
				dest: '<%= paths.source %>/vendor/bootstrap'
			}
		],
	},
	fontawesome: {
		files: [
			{
				expand: true,
				cwd: 'bower_components/font-awesome/css',
				src: ['**/font-awesome.min.css'],
				dest: '<%= paths.source %>/vendor/font-awesome'
			},
			{
				expand: true,
				cwd: 'bower_components/font-awesome/fonts',
				src: ['**/*.*'],
				dest: '<%= paths.source %>/fonts'
			}
		],
	},
	tether: {
		files: [
			{
				expand: true,
				cwd: 'bower_components/tether/dist',
				src: ['**/tether.min.js'],
				dest: '<%= paths.source %>/vendor/tether'
			},
			{
				expand: true,
				cwd: 'bower_components/tether/dist',
				src: ['**/tether.min.css'],
				dest: '<%= paths.source %>/vendor/tether'
			}
		]
	},
	fastclick: {
		files: [
			{
				expand: true,
				cwd: 'bower_components/fastclick/lib',
				src: ['fastclick.js'],
				dest: '<%= paths.source %>/vendor/fastclick'
			},
		],
	},
	moment: {
		files: [
			{
				expand: true,
				cwd: 'bower_components/moment/min',
				src: ['moment.min.js'],
				dest: '<%= paths.source %>/vendor/moment'
			},
		],
	},
	ie9js: {
		files: [
			{
				expand: true,
				cwd: 'bower_components/ie9-js/lib',
				src: ['IE9.js'],
				dest: '<%= paths.source %>/vendor/ie9-js/'
			},
		],
	},
	css3mediaqueries: {
		files: [
			{
				expand: true,
				cwd: 'bower_components/css3-mediaqueries-js',
				src: ['css3-mediaqueries.js'],
				dest: '<%= paths.source %>/vendor/css3-mediaqueries-js/'
			},
		],
	},
	json2: {
		files: [
			{
				expand: true,
				cwd: 'bower_components/json2',
				src: ['json2.js'],
				dest: '<%= paths.source %>/vendor/json2'
			},
		],
	},
	datepicker: {
		files: [
			{
				expand: true,
				cwd: 'bower_components/eonasdan-bootstrap-datetimepicker/build/js',
				src: ['bootstrap-datetimepicker.min.js'],
				dest: '<%= paths.source %>/vendor/datetimepicker/js'
			},
			{
				expand: true,
				cwd: 'bower_components/eonasdan-bootstrap-datetimepicker/build/css',
				src: ['bootstrap-datetimepicker.min.css'],
				dest: '<%= paths.source %>/vendor/datetimepicker/css'
			},
			{
				expand: true,
				cwd: 'bower_components/eonasdan-bootstrap-datetimepicker/build/css',
				src: ['bootstrap-datetimepicker-standalone.min.css'],
				dest: '<%= paths.source %>/vendor/datetimepicker/css'
			},
		],
	},

	ckeditor: {
		files: [
			{
				expand: true,
				cwd: '<%= paths.source %>/js/components',
				src: ['ckconfig.js'],
				dest: '<%= paths.destination %>/js/'
			},
			{
				expand: true,
				cwd: '<%= paths.source %>/js/components',
				src: ['ckstyles.js'],
				dest: '<%= paths.destination %>/js/'
			},
			{
				expand: true,
				cwd: '<%= paths.source %>/vendor/ckfinder',
				src: ['**/**'],
				dest: '<%= paths.destination %>/vendor/ckfinder'
			},
			{
				expand: true,
				cwd: 'bower_components/ckeditor',
				src: ['**/**'],
				dest: '<%= paths.destination %>/vendor/ckeditor'
			}
		],
	},

	dist: {
		files: [
			{
				expand: true,
				cwd: '<%= paths.source %>',
				src: ['fonts/**', 'vendor/**/*.js', '**/*.php'],
				dest: '<%= paths.destination %>'
			},
			{
				expand: true,
				cwd: '<%= paths.source %>',
				src: ['audio/**'],
				dest: '<%= paths.destination %>'
			}
		],

	},

};
