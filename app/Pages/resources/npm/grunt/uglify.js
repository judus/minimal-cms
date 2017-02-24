module.exports = {
  options: {
    mangle: {
      except: ['jQuery, u']
    },
    compress: {
      drop_console: true
    },
    preserveComments: false,
    sourceMap: true
  },
  dist: {
    files: {
      '<%= paths.destination %>/js/main.min.js': [
        '<%= paths.destination %>/js/main.js'
      ],
      '<%= paths.destination %>/js/cms.min.js': [
        '<%= paths.destination %>/js/cms.js'
      ],
      '<%= paths.destination %>/vendor/css3-mediaqueries-js/css3-mediaqueries.min.js': [
        '<%= paths.destination %>/vendor/css3-mediaqueries-js/css3-mediaqueries.js'
      ],
      '<%= paths.destination %>/vendor/fastclick/fastclick.min.js': [
        '<%= paths.destination %>/vendor/fastclick/fastclick.js'
      ],
      '<%= paths.destination %>/vendor/json2/json2.min.js': [
        '<%= paths.destination %>/vendor/json2/json2.js'
      ],
      '<%= paths.destination %>/vendor/ie9-js/IE9.min.js': [
        '<%= paths.destination %>/vendor/ie9-js/IE9.js'
      ],
      '<%= paths.destination %>/vendor/vendor.min.js': [
        '<%= paths.destination %>/vendor/vendor.js'
      ]
    }
  }
};
