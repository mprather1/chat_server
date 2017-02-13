var ConversationView = require("./ConversationView");

var ConversationsView = Backbone.Marionette.CollectionView.extend({
  childView: ConversationView,
  tagName: 'ul',
  initialize: function(){
    this.listenTo(this.collection, 'sync', this.render)
  }
});

module.exports = ConversationsView;