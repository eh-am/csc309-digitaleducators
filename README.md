#Getting started

**IF YOU ARE THE TA, PLEASE READ OUR [TA-README](TA-README.md)!**

We are going to use [Yeoman generator](http://timothymartin.azurewebsites.net/yeoman-mean-generator/), as it provides a lot of stuff we are going
to use.

To run this project we will need to:
- install globally: yo, grunt-cli, bower and generator-angular-fullstack
	note: if you are under linux use "sudo" as you will need administrator privileges.
- install locally: grunt
- execute bower and npm install (read note below if you get error)
```
$ npm install -g yo grunt-cli bower generator-angular-fullstack
$ npm install grunt
$ bower install
$ npm install
```
NOTE: if you are under linux and get "/usr/bin/end: No such file or directory" error when trying to run "bower install", execute the following:
$ sudo ln -s /usr/bin/nodejs /usr/bin/node
and try again.


Start mongo daemon
```
$ mongod
```

Then, inside the folder of this project, run
```
$ grunt serve
```

And access our page on http://localhost:3000/ !

##Troubleshooting

If you run into file access/permission problems during the installation, please refer to this guide:
https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md.

# Other observations
We are going to use 2 basic users for testing (just for keeping an standard), those are:

Admin
```
email: admin@admin.com
password: admin
```

User
```
email: test@test.com
password: test
```

##Deploy

If you wish to build and run the production (optimized) version, execute:
```
$ grunt build
$ cd dist/
$ npm start --production
```
NOTE: if "grunt build" fails (especially under linux), use "grunt build --force" instead.

A nice walkthrough to understand what's the workflow when using
this generator can be found here:
http://tylerhenkel.com/building-an-angular-node-comment-app-using-yeoman/.
Keep the generator-angular-fullstack documentation in hand as well:
https://github.com/DaftMonk/generator-angular-fullstack/blob/master/readme.md
