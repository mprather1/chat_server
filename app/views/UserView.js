var Conversations = require("../collections/Conversations")
var ConversationsView = require("./ConversationsView");

var UserView = Backbone.Marionette.View.extend({
  template: require("../templates/user-view-template.html"),
  regions: {
    conversations: {
      el: '#conversations-view'
    }
  },
  initialize: function(){
    this.conversations = new Conversations({ id: this.model.get('id')})
  },
  serializeData: function(){
    return {
      'fullName': this.model.get('first_name') + " " + this.model.get('last_name'),
      'avatar': this.model.get('avatar')
    }
  },
  onRender: function(){
    
    this.showChildView('conversations', new ConversationsView({ collection: this.conversations }))
    this.conversations.fetch({
      success: function(){
        console.log("Successfully fetched conversations...")
      }
    })
  }
});

module.exports = UserView;
