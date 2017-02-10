var Message = require("../models/Message");

var Messages = Backbone.Collection.extend({
  model: Message,
  initialize: function(options){
    console.log(options)
    this._conversation = options.conversationID;
    this.url = "http://shintech.ninja:8000/api/conversations/" + this._conversation + "/messages"
  }
});

module.exports = Messages;