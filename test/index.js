var mclient = require('mongodb').MongoClient
  , db
  , async = require('async')
  , Dat = require('dat')
  , dat
  , should = require('should')
  , rmdir = require('rmdir-recursive')

describe('dat-mongo', function() {

  it('should work', function(done) {
    this.timeout(5000)
    dat = new Dat('./test/', function() {
      dat.init(function() {
        dat.listen(function() {
          mclient.connect('mongodb://127.0.0.1:27017', function(err, conn) {
            db = conn.db('dat-mongo-test').collection('dat-mongo')

            async.series([
              function(finish) {
                db.insert({sup: 'bae'}, finish)
              },
              function(finish) {
                db.insert({another: 'bae'}, finish)
              },
              function(finish) {
                db.update({sup: 'bae'}, {$set: {fun: "times"}}, {multi: false}, finish)
              },
              function(finish) {
                db.remove({another: 'bae'}, finish)
              }
            ], function(err, docs) {
              setTimeout(function() {
                async.parallel([
                  function(finish) {
                    dat.get(docs[0][0]._id, function(err, doc) {
                      should.exist(doc)
                      doc.sup.should.eql('bae')
                      doc.fun.should.eql('times')
                      finish(err)
                    })
                  },
                  function(finish) {
                    dat.get(docs[1][0]._id, function(err, doc) {
                      should.not.exist(doc)
                      err.message.should.eql('Key was deleted')
                      finish()
                    })
                  }
                ], done)
              }, 3000)
            })
          })
        })
      })
    })
  })

  after(function(done) {
    async.parallel([
      function(finish) {
        db.drop(finish)
      },
      function(finish) {
        rmdir('./test/.dat', finish)
      }
    ], done)
  })

})
