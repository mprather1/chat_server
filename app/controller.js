var Marionette = require("marionette");
var LoginView = require("./views/LoginView");
var UserFormView = require("./views/UserFormView")

var Controller = Marionette.Object.extend({
  
  initialize: function(options){
    
    this.app = options.app;
    
  },
  login: function(){
    this.app.view.showChildView('main', new LoginView())
  },
  userFormView: function(){
    this.app.view.showChildView('main', new UserFormView());
  },  
});

module.exports = Controller;