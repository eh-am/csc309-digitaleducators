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

And access our page on http://localhost:9000/ !


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