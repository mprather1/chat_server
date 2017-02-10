var User = require("../models/User")

var Users = Backbone.Collection.extend({
  url: 'http://shintech.ninja:8000/api/users',
  model: User
});

module.exports = Users;