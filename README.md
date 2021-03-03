### WHAT IT IS

Activates/Deactivates an app running on the PaaS Heroku without wasting free dynos in one go. 

### INSTALLATION

1. HerokuSwitch is working with the official [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli), install it: `npm i -g heroku`
2. Then install HerokuSwitch using NPM: `npm i herokuswitch --save`
3. Go to the app's folder in node_modules and open `herokuswitch.js`
4. Configure the following object:
```
// CONFIGURATION (must edit)
const cfg = {
	app: '', // insert your app's name here (Ex. 'myApp')
	resource: '' // choose your process resource type ('Worker' or 'web' )
}
```

### USAGE

Open the terminal. The syntax is: <br>
`node herokuswitch -<option>`

Choose an option to execute it.<br>
Example: `node herokuswitch -off`

This turns off the app completely by turning on maintenance mode and deactivates the process resource type in one go. It's less to type and faster. You might as well create a .bat file, insert the command and the only thing you need to do is to click it.


### OPTIONS

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
