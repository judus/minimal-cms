module.exports = {
  all: {
    options: {
      config: 'grunt/configs/.csscomb.json'
    },
    files: {
      '<%= paths.destination %>/css/main.css': ['<%= paths.destination %>/css/main.css'],
      '<%= paths.destination %>/css/minimal.css': ['<%= paths.destination %>/css/minimal.css'],
      '<%= paths.source %>/scss/minimal.scss': ['<%= paths.source %>/scss/minimal.scss']
    }
  }
};
