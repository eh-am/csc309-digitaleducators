'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
           // 8080,
            3000,
  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            'mongodb://localhost/digitaleducators'
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || '535579569939327',
    clientSecret: process.env.FACEBOOK_SECRET || '58b3281d3d878e4959260d6d211e9f1a'
  },
  google: {
    clientId: process.env.GOOGLE_ID || '501731194684-dp4ehdiq0umauec37nvp3eq7u02qu9ms.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || '0H-QjL1tjze4LuCQqWEiofgz',
  },
};
