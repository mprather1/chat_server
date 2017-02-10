var express = require("express");
var router = express.Router();
var users = require("./db").users;
var messages = require("./db").messages
var conversations = require("./db").conversations;

router.route("/users")
  .get(users.getAllUsers)
  .post(users.createUser)

router.route("/users/:id")
  .get(users.getSingleUser)
  .put(users.updateUser)
.delete(users.removeUser)

router.route('/users/:userID/conversations')
  .get(conversations.getAllConversations)
  .post(conversations.createConversation)
  
router.route('/users/:userID/conversations/:id')
  .get(conversations.getSingleConversation)
  .put(conversations.updateConversation)
  .delete(conversations.removeConversation)
  
router.route('/conversations/:conversationID/messages')
  .post(messages.createMessage)
  .get(messages.getAllMessages)
  
router.route('/conversations/:conversationID/messages/:id')
  .get(messages.getSingleMessage)
  .put(messages.updateMessage)
  .delete(messages.removeMessage)

module.exports = router;