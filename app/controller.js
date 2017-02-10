var Marionette = require("marionette");
var LoginView = require("./views/LoginView")

var Controller = Marionette.Object.extend({
  
  initialize: function(options){
    
    this.app = options.app;
    
  },
  login: function(){
    this.app.view.showChildView('main', new LoginView())
  }
});

module.exports = Controller;