var db = require("../init");

function getAllMessages(req, res, next){
  db.any('select * from messages where _conversation = $1', parseInt(req.params.conversationID))
  .then(function(data){
    res.status(200)
    .json(data);
  })
  .catch(function(err){
    return next(err);
  });
}

function getSingleMessage(req, res, next){
  var messageID = parseInt(req.params.conversationID);
  db.one('select * from messages where id = $1', messageID)
  .then(function(data){
    res.status(200)
    .json(data);
  })
  .catch(function(err){
    return next(err);
  });
}

function createMessage(req, res, next){
  db.none('insert into messages(content, author, time, avatar_img, _conversation )' + 'values( $1, $2, $3, $4, $5 )', [req.body.content, req.body.author, req.body.time, req.body.avatar_img, parseInt(req.params.conversationID)])
  .then(function(){
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted ONE message'
    });
  })
  .catch(function(err){
    return next(err);
  });
}

function updateMessage(req, res, next){
  db.none('update messages set content=$1 where id=$2', [req.body.content, parseInt(req.params.id)])
  .then(function(){
    console.log('tets')
    res.status(200)
    .json({
      status: 'success',
      message: 'Updated ONE message'
    })
  })
  .catch(function(err){
    return next(err)
  })
}

function removeMessage(req, res, next){
  db.result('delete from messages where id=$1', req.params.id)
  .then(function(data){
    res.status(200)
    .json({
      status: 'success',
      message: `Removed ${data.rowCount} message`
    })
  })
}

module.exports = {
  getAllMessages: getAllMessages,
  getSingleMessage: getSingleMessage,
  createMessage: createMessage,
  updateMessage: updateMessage,
  removeMessage: removeMessage
};