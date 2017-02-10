var Cookie = require("js-cookie");
var moment = require("moment");

var MessageView = Backbone.Marionette.View.extend({
  template: require("../templates/message-view-template.html"),
  tagName: 'li',
  initialize: function(){
    this.date = moment(this.model.get('time')).format("LLLL");
    var cookie = Cookie.get('userID');
    var author = this.model.get('author') ;
    if(author == cookie){
      this.$el.addClass('self');
    } else {
      this.$el.addClass('other');
    }
  },
  serializeData: function(){
    return {
      "content": this.model.get('content'),
      "author": this.model.get('author'),
      "time": this.date,
      "avatar": this.model.get('avatar_img')
    };
  }
});

module.exports = MessageView;