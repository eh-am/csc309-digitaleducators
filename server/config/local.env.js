'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:3000',
  SESSION_SECRET:   'digitaleducators-secret',

  FACEBOOK_ID:      '535579569939327',
  FACEBOOK_SECRET:  '58b3281d3d878e4959260d6d211e9f1a',

  TWITTER_ID:       'yMzoHfuhv9nN0xAyHMhqUWhys',
  TWITTER_SECRET:   'FjhGJ3zxcRKvWO8rmLsaDvZLXfkm5LIZnMSZMHcQmH6rXTmWZC',

  GOOGLE_ID:        '501731194684-dp4ehdiq0umauec37nvp3eq7u02qu9ms.apps.googleusercontent.com',
  GOOGLE_SECRET:    '0H-QjL1tjze4LuCQqWEiofgz',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
