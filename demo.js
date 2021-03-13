const Heroku = require('./heroku-undyno.js')

const sw = new Heroku({
    app: '<AppNameHere>',
    resource: 'Worker'
})

sw.exec()
