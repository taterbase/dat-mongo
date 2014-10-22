[![build status](https://travis-ci.org/taterbase/dat-mongo.svg)](https://travis-ci.org/taterbase/dat-mongo)
#dat-mongo

A [MongoDB](http://mongodb.org) plugin for [dat](http://dat-data.com) for realtime data changes

##Usage

Create a `dat.json` with the `hooks.listen` plugin identified and a `mongoOplogUrl` defined.

```json
{
  "name": "dat-mongo",

  "hooks": {
    "listen": "dat-mongo"
  },

  "mongoOplogUrl": "127.0.0.1:27017/local"
}
```

Now `dat listen`.

##Caveats

This requires your Mongo instance to be running as a [replica set](http://docs.mongodb.org/manual/reference/replica-configuration/) so that operations are written to the [oplog](http://docs.mongodb.org/manual/core/replica-set-oplog/).


___

Made with ⚡️ by [@taterbase](https://twitter.com/taterbase)
