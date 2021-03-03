/* 
	HerokuSwitch
	2021 (c) Lipino

	Repository: https://github.com/thielicious/HerokuSwitch

	SYNTAX: node herokuswitch -<option>
	EXAMPLE: node script.js -off (turns the app off) 

	It is required to adjust the configuration below before using:
*/


// CONFIGURATION (must edit)
const cfg = {
	app: '', // insert your app's name here (Ex. 'myApp')
	resource: '' // choose your process resource type ('Worker' or 'web' )
}


// PROGRAM (edit on your own risk)
const 
	child_process = require('child_process'),
	args = process.argv

if ((cfg.app || cfg.resource) == '') {
	console.log('Not properly configured. Make sure you open herokuswitch.js to configure the options before.')
} else {
	try {
		child_process.exec('heroku', (error, stdout, stderr) => {
			if (stderr) console.error(stderr)
			if (stdout) {
				const 
					app = '-a '+cfg.app,
					h = 'heroku',
					heroku = {
						maint: h+' maintenance:',
						scale: h+' ps:scale '+cfg.resource+'=',
						start: 'start cmd /k'
					},
					cmd = async (command, cb = null) => {
						await child_process.exec(command, (error, stdout, stderr) => {
							if (stderr) console.error(stderr)
							if (stdout) cb != null ? cb() : console.log(stdout)
						})
					}

				if (args.length > 2) {
					args.forEach(k => {
						switch (k) {
							// display the log of the app
							case '-log': cmd(`${heroku.start} "${h} logs --tail ${app}"`); break // OK
							// restart the app
							case '-restart': cmd(`${h} ps:restart ${app}`); break // OK
							// turn on the app
							case '-on': 
								cmd(`${heroku.maint}off ${app}`)
									.then(cmd(`${heroku.scale}1 ${app}`)); break
							// turn off the app
							case '-off': 
								cmd(`${heroku.maint}on ${app}`)
									.then(cmd(`${heroku.scale}0 ${app}`)); break
							// look up the remaining dynos and used up resources
							case '-dynos': cmd(`${h} ps ${app}`); break
							// update the Heroku CLI (global)
							case '-update': cmd(`${heroku.start} "npm update -g ${h} && exit"`); break // OK
							default: return
						}
					})
				} else {
					console.error('Missing parameter.')
				}
			}
		})
	} catch(e) {
		console.error('Heroku CLI is required. Type "npm i -g heroku" to install.');
		return
	}
}
