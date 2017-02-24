module.exports = {
	options: {
		separator: ';\n',
		stripBanners: {
			block: false,
			line: false
		}
	},
	dist: {
		src: [
			'<%= paths.source %>/js/main.js',
			'<%= paths.source %>/js/components/sticky-footer.js'
		],
		dest: '<%= paths.destination %>/js/main.js',
	},
	cms: {
		src: [
			'<%= paths.source %>/vendor/moment/moment.min.js',
			'<%= paths.source %>/vendor/datetimepicker/js/bootstrap-datetimepicker.min.js',

			'<%= paths.source %>/js/cms.js'
		],
		dest: '<%= paths.destination %>/js/cms.js',
	},
	fallback: {
		src: [
			'<%= paths.source %>/js/fallback.js',
		],
		dest: '<%= paths.destination %>/js/fallback.js',
	},

	vendor: {
		src: [
			'<%= paths.source %>/vendor/json2/json2.min.js',
			'<%= paths.source %>/vendor/css3-mediaqueries-js/css3-mediaqueries.min.js',
			'<%= paths.source %>/vendor/tether/js/tether.min.js',
			'<%= paths.source %>/vendor/moment/moment.min.js',
			'<%= paths.source %>/vendor/bootstrap/js/bootstrap.min.js',
			'<%= paths.source %>/vendor/datetimepicker/js/bootstrap-datetimepicker.min.js',
			'<%= paths.source %>/vendor/fastclick/fastclick.js'
		],
		dest: '<%= paths.destination %>/vendor/vendor.js',
	},


};
