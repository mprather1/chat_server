var User = Backbone.Model.extend({
  urlRoot: 'http://shintech.ninja:8000/api/users'
});

module.exports = User;