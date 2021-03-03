const Heroku = require('./heroku-undyno.js')

const sw = new Heroku({
    app: 'mihojs',
    resource: 'Worker'
})

sw.exec()