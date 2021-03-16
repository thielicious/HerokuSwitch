const Heroku = require('heroku-undyno')

const sw = new Heroku({
    app: 'myApp',
    resource: 'Worker'
})

sw.exec()
