var Marionette = require("marionette");
var Controller = require("./controller");

var Router = Marionette.AppRouter.extend({
  
  initialize: function(options){
    this.controller = new Controller({ app: options.app });
  },
  appRoutes: {
    'login': 'login',
    'new/user': 'userFormView',
    'home': 'homePage',
    'conversations/:id/messages': 'getSingleConversation'    
  }
});

module.exports = Router;