var db = require("../init");

function getAllConversations(req, res, next){
  db.any('select * from conversations where $1 = any (_user)', req.params.userID)
  .then(function(data){
    res.status(200)
      .json(data);
  });
}

function getSingleConversation(req, res, next){
  var conversationID = parseInt(req.params.id);
  db.one('select * from conversations where id = $1', conversationID)
  .then(function(data){
    res.status(200)
    .json(data);
  })
  .catch(function(err){
    return next(err);
  });
}

function createConversation(req, res, next){
  db.none('insert into conversations( title, _user )' + 'values( $1, ARRAY[$2, $3] )', [req.body.title, parseInt(req.params.userID), req.body.participant])
  .then(function(){
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one conversation'
    });
  })
  .catch(function(err){
    return next(err);
  });
}

function updateConversation(req, res, next){
  db.none('update conversations set title=$1 where id=$2', [req.body.title, parseInt(req.params.userID)])
    .then(function(){
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated user'
        });
    })
    .catch(function(err){
      return next(err);
    });
}

function removeConversation(req, res, next){
  var conversationID = parseInt(req.params.id);
  db.result('delete from conversations where id = $1', conversationID)
  .then(function(data){
    res.status(200)
    .json({
      status: 'success',
      message: `Removed ${data.rowCount} conversation`
    });
  })
  .catch(function(err){
    return next(err)
  })
  
}

module.exports = {
  getAllConversations: getAllConversations,
  getSingleConversation: getSingleConversation,
  createConversation: createConversation,
  updateConversation: updateConversation,
  removeConversation: removeConversation
};