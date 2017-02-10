var ConversationView = require("./ConversationView");

var ConversationsView = Backbone.Marionette.CollectionView.extend({
  childView: ConversationView
});

module.exports = ConversationsView;