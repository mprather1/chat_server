var Marionette = require("marionette");
var LoginView = require("./views/LoginView");
var User = require("./models/User");
var Conversation = require("./models/Conversation")
var ChatView = require("./views/ChatView");
var UserView = require("./views/UserView")
var Cookie = require("js-cookie");
var UserFormView = require("./views/UserFormView")

var Controller = Marionette.Object.extend({
  
  initialize: function(options){
    
    window.app = options.app;
    
  },
  login: function(){
    window.app.view.showChildView('main', new LoginView())
  },
  userFormView: function(){
    window.app.view.showChildView('main', new UserFormView());
  }, 
  homePage: function(){
    var user = new User({ id: Cookie.get('userID')})
    user.fetch({
      success: function(){
        console.log("Successfully fetched user...")
        window.app.view.showChildView('main', new UserView({ model: user }))
      }
    })
  },
  getSingleConversation: function(options){
    var conversation = new Conversation({ id: options })
    conversation.fetch({
      success: function(data){
        console.log("Successfully fetched /conversations/" + data.id)
      }
    }).then(function(){
      window.singleConversationView = new ChatView({ model: conversation })
      window.app.view.showChildView('main', window.singleConversationView)
    })
}
});

module.exports = Controller;