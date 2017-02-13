var socket = io();
var Message = require("../models/Message");
var Messages = require("../collections/Messages");
var MessagesView = require("./MessagesView");
var Cookie = require("js-cookie");
var User = require("../models/User");

var ChatWindowView = Backbone.Marionette.View.extend({
  template: require("../templates/chat-view-template.html"),
  initialize: function(){
    var cookie = Cookie.get('userID');
    var author = new User({ id: cookie});
    var cid = this.model.get('id')
    author.fetch({
      success: function(){
        console.log("Successfully fetched user...");
      }
    });
    var messages = new Messages({ conversationID: this.model.get('id')});
    messages.fetch({
      success: function(){
        console.log("Successfully fetched messages...");
      }
    });
    socket.on('play', function(audio) {
      var sound = new Audio(audio.sound);
      sound.play();
    });
    socket.on('chat message', function(msg){
      console.log(cid)
      console.log(msg)
      if(cid === msg.conversationID){
              messages.add(msg);
      window.scrollTo(0, document.body.scrollHeight);
      }

    });
    this.messages = messages;
    this.author = author;
  },
  regions: {
    main: {
      el: '.discussion'
    }
  },
  events: {
    'click button': 'handleClick'
  },
  onRender: function(){
    this.showChildView('main', new MessagesView({ collection: this.messages }));
  },
  handleClick: function(e){
    e.preventDefault();
    var message = new Message({ content: $('#m').val(), author: this.author.get('id'), time: new Date(), avatar_img: this.author.get('avatar'), conversationID: this.model.get('id') });
    message.save();
    socket.emit('chat message', message);
    $('#m').val('');
    return false;
  }  
});

module.exports = ChatWindowView;