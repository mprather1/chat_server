var UserView = Backbone.Marionette.View.extend({
  template: require("../templates/user-view-template.html"),

  serializeData: function(){
    return {
      'fullName': this.model.get('first_name') + " " + this.model.get('last_name'),
      'avatar': this.model.get('avatar')
    }
  }
});

module.exports = UserView;
