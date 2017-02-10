var Message = Backbone.Model.extend({
  initialize: function(options){
    console.log(options)
    this.conversation = options.conversationID
    this.url = 'http://shintech.ninja:8000/api/conversations/' + this.conversation + '/messages'
  }
});

module.exports = Message;