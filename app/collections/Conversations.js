var Conversation = require("../models/Conversation");

var Conversations = Backbone.Collection.extend({
  initialize: function(options){
    this.userID = options.id
    this.url = 'http://shintech.ninja:8000/api/users/' + this.userID + '/conversations' 
  } 
})

module.exports = Conversations;