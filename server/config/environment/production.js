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
    clientID: process.env.FACEBOOK_ID || '',
    clientSecret: process.env.FACEBOOK_SECRET || ''
  },
  google: {
    clientId: process.env.GOOGLE_ID || '',
    clientSecret: process.env.GOOGLE_SECRET || '',
  },
};
