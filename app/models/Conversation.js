var Conversation = Backbone.Model.extend({
  initialize: function(options){
    this.userID = options.id
    this.urlRoot = 'http://shintech.ninja:8000/api/users/' + this.userID + '/conversations' 
  } 
});

module.exports = Conversation;