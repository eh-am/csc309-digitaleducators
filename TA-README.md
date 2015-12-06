We developed our application using a Yeoman generator called angular-fullstack-generator,
in this way, the application has two "version": the development version and the
production version.

(We are supposing that you already have a mongo daemon running on port 27017)

To just run the application, you are better to run the production version, to do
that, you have three options:
- Access our deployed application on http://digitaleducators.herokuapp.com/
- Access our builded version with the following commands:
```
  npm install --production
  npm start --production
```

- Install all the necessaries development tools to build our application (it
may take some time). To do that, after installing the tools (which the how to
is explained later in this tutorial), run
```
  grunt build
  cd dist
  npm start --production
```


The side effects of running a production version are that you cannot see
each file individually, as we are minifying our files (.css, .js ones), you also
cannot run tests. If you really want to do so, you will have to run our development version.

Running the development version may take some time, as you will have to install
some tools (grunt, yeoman, bower, generator-angular-fulltstack). Notice that this
may still not work, as impossible incompatibilities from different node/OS/npm versions
may occur.
First, clone our repo, and enter it via the terminal.

To install all the tools, run:
```
npm install -g yo grunt grunt-cli bower generator-fullstack
npm install // to install all backend dependencies
bower install // to install all frontend dependencies
```

Then, run
```
grunt serve
```

to start the server.

You now should be able to our application on http://localhost:3000 !

If you want to run some tests, run
```
grunt test:server
```


We have provided two default users, so that you can test our application. Those
are:

The admin:
email: admin@admin.com
password: admin

Test user:
email: test@test.com
password: test

Any questions, feel free to contact us on github or via email:
github:eh-am and email:edu.aleixomartins@mail.utoronto.ca

Thank you!
