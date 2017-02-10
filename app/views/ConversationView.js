var ConversationView = Backbone.Marionette.View.extend({
  template: require("../templates/conversation-view-template.html"),
  serializeData: function(){
    return {
      "id": this.model.get('id'),
      "title": this.model.get('title'),
      "_user": this.model.get('_user')
    }
  }
});

module.exports = ConversationView;