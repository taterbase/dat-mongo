var tail = require('oplog-transform-tail')

module.exports = function hook(dat, done) {

  tail({

    url: dat.options.mongoOplogUrl,

    insert: function(_id, doc, cb) {
      dat.put(_id, doc, function(err) {
        if (err)
          console.log(err)

        cb(err)
      })
    },

    update: function(_id, ready) {
      dat.get(_id, function(err, retrievedDoc) {
        if (err)
          return console.log(err)

        if (!retrievedDoc)
          return console.log("Doc with _id " + _id + " not in dat, could not update")

        var version = retrievedDoc.version

        ready(retrievedDoc, function(err, updatedDoc, cb) {
          updatedDoc.version = version
          dat.put(_id, updatedDoc, function(err) {
            if (err)
              console.log(err)

            cb(err)
          })
        })
          
      })
    },

    remove: function(_id, cb) {
      dat.delete(_id, function(err) {
        if (err)
          console.log(err)

        cb(err)
      })
    }

  })

  done()

}
