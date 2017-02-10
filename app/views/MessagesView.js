var MessageView = require("./MessageView");

var MessagesView = Backbone.Marionette.CollectionView.extend({
  childView: MessageView,
  tagName: 'ol',
  className: 'messages-view',
  initialize: function(){
    this.listenTo(this.collection, 'sync', this.render())
  }
});

module.exports = MessagesView;