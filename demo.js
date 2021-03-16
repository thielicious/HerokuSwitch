const Heroku = require('heroku-undyno')

const sw = new Heroku({
    app: '<AppNameHere>',
    resource: 'Worker'
})

sw.exec()
