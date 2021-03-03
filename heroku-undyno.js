/* 
	heroku-undyno.js
	2021 (c) Thielicious
	thielicious.github.io
	--------------------

	Repository: https://github.com/thielicious/heroku-undyno

	SYNTAX: node <filename> -<option>
	EXAMPLE: node switch.js -off (turns the app off) 
*/

'use strict'

const 
	child_process = require('child_process'),
	args = process.argv


class HerokuUndyno {

	constructor(config = null) {
		this.config(config)
	}

	config(config) {
		this.cfg = {
			app: config.app,
			resource: config.resource
		}
	}

	async #cmd(command, cb = null) {
		await child_process.exec(command, (error, stdout, stderr) => {
			if (stderr) console.error(stderr)
			if (stdout) cb != null ? cb() : console.log(stdout)
		})
	}

	#options(args) {
		const 
			app = '-a '+this.cfg.app,
			h = 'heroku',
			heroku = {
				maint: h+' maintenance:',
				scale: h+' ps:scale '+this.cfg.resource+'=',
				start: 'start cmd /k'
			}
		if (args.length > 2) {
			args.forEach(k => {
				switch (k) {
					// display the log of the app
					case '-log': this.#cmd(`${heroku.start} "${h} logs --tail ${app}"`); break
					// restart the app
					case '-restart': this.#cmd(`${h} ps:restart ${app}`); break
					// turn on the app
					case '-on': 
						this.#cmd(`${heroku.maint}off ${app}`)
							.then(this.#cmd(`${heroku.scale}1 ${app}`)); break
					// turn off the app
					case '-off': 
						this.#cmd(`${heroku.maint}on ${app}`)
							.then(this.#cmd(`${heroku.scale}0 ${app}`)); break
					// look up the remaining dynos and used up resources
					case '-dynos': this.#cmd(`${h} ps ${app}`); break
					// update the Heroku CLI (global)
					case '-update': this.#cmd(`${heroku.start} "npm update -g ${h} && exit"`); break
					default: return
				}
			})
		} else {
			console.error('Missing parameter.')
		}
	}
	
	exec() {
		if (!this.cfg.app || !this.cfg.resource) {
			console.log('Not properly configured. Make sure you open herokuswitch.js to configure the options before.')
		} else {
			try {
				child_process.exec('heroku', (error, stdout, stderr) => {
					if (stderr) console.error(stderr)
					if (stdout) {
						this.#options(args)
					}
				})
			} catch(e) {
				console.error('Heroku CLI is required. Type "npm i -g heroku" to install.')
			}
		}
	}
}

module.exports = HerokuUndyno