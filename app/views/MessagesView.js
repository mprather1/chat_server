var MessageView = require("./MessageView");

var MessagesView = Backbone.Marionette.CollectionView.extend({
  childView: MessageView,
  tagName: 'ol',
  className: 'messages-view',

});

module.exports = MessagesView;