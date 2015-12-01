#Getting started

We are going to use [Yeoman generator](http://timothymartin.azurewebsites.net/yeoman-mean-generator/), as it provides a lot of stuff we are going
to use.


To run this project, first install yo, grunt-cli, bower and generator-angular-fullstack:

```
$ npm install -g yo grunt-cli bower generator-angular-fullstack
```

Start mongo daemon
```
$ mongod
```

Then, inside the folder of this project, run
```
$ grunt serve
```

###formatar
para funcionar tive que usar mais isso (windows)
npm install -g  grunt 
npm install -g bower
bower install
npm install
##talvez dê para tirar alguns comandos, depois testo.

And access our page on http://localhost:9000/ !

##Troubleshooting

If you run into file access/permission problems during the installation, please refer to this guide:
https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md.

npm install -g grunt npm install -g bower
bower install
npm install

# Other stuff
We are going to use 2 basic users for testing (just for keeping an standard),
those are

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

A nice walkthrough to understand what's the workflow when using 
this generator can be found here:
http://tylerhenkel.com/building-an-angular-node-comment-app-using-yeoman/.
Keep the generator-angular-fullstack documentation in hand as well:
https://github.com/DaftMonk/generator-angular-fullstack/blob/master/readme.md
