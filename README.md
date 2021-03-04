# What is it about<br>
Activates/Deactivates the app running on the PaaS Heroku in one go. 

# Installation<br>
Node package manager [NPM](https://nodejs.org/en/download/) is required.

1. undyno.js is working with the official [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli), install it: `npm i -g heroku`
2. Then install un-dyno using NPM: `npm i undyno --save`
3. Create a JavaScript file with the following content that loads and sets up the module:
```
const Heroku = require('./heroku-undyno.js') // imports the module

const undyno = new Heroku({
    app: 'myApp', // the app's name you specified on Heroku
    resource: 'Worker' // the process dyno type (there exist only 'Worker" or 'web')
})

undyno.exec() // executes the code together with the settings made above
```
Just use the [demo](https://github.com/thielicious/HerokuSwitch/demo.js) file and configure.

# USAGE<br>
Assuming you created a file called `undyno.js` in the root folder of your project:<br>
Open the terminal. The syntax is:<br>
`node undyno -<option>`

Choose an option to execute it.<br>
Example: `node undyno -off`

This turns off the app completely by turning on maintenance mode and deactivates the process resource (Dyno) type in one go.

# METHODS<br>
```
const undyno = new HerokuUndyno(
	app: '<AppNameHere>',
	resource: <'Worker' or 'web'>
})
```
*(optional)* The arguments configure the options upon creating a new instance. Configures the options used for the Heroku app. For `app` use the name of your deployed Heroku app. For `resource` chose either `Worker` or `web` for the dyno process resource. You may leave this blank and use `.config()` later on instead.

```
undyno.config({
	app: '<AppNameHere>',
	resource: <'Worker' or 'web'>
})
```
*(optional)* Use this method instead if you haven't set the options yet.

`undyno.exec()`<br>
*(required)* This method simply executes the code together with the configured options.

# OPTIONS<br>
`-off`<br>
Turns off the app on Heroku by turning on maintenance mode and process resource type off.

`-on`<br>
Turns the app on again by turning the maintenance mode off and enables the specific resource type defined in the configuration, see installation.

`-log`<br>
Displays the log of the app in a new terminal window.

`-restart`<br>
Restarts the app on Heroku.

`-dynos`<br>
Looks up the remaining dynos and used up resources.

`-update`<br>
Updates the Heroku CLI (Heroku module required)

-----

If you encounter any errors, don't hesitate to open up an [issue](https://github.com/thielicious/HerokuSwitch/issues), thank you!
