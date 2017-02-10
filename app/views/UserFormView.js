var UserFormView = Backbone.Marionette.View.extend({
  template: require("../templates/user-form-template.html"),
  events: {
    'click #user-submit': 'handleClick'
  },
  className: 'panel panel-default form-view',
  handleClick: function(e){
    e.preventDefault();
    
    var formData = new FormData();
    formData.append('upload', $('#avatar')[0].files[0]);
    formData.append('first_name', $('[name="first_name"]').val());
    formData.append('last_name', $('[name="last_name"]').val());
    formData.append('username', $('[name="username"]').val());
    formData.append('password', $('[name="password"]').val());
    formData.append('avatar', "/pictures/" + $('#avatar')[0].files[0].name);
    
    $.ajax({
      url: '/api/users',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
        console.log(data);
        Backbone.history.navigate('#login', { trigger: true});
      }
    });
    
  }
});

module.exports = UserFormView;