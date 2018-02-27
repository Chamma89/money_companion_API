var express = require('express')
var app = express()
var cors = require('cors')
var pgp = require('pg-promise')()
const PORT = process.env.PORT || 9000
const DBURL = process.env.DATABASE_URL || 'http://localhost:5432'

app.use(cors())

const cn = {
    url: (DBURL),
    database: 'money_companion'
}

const db = pgp(cn)

app.get('/api/mc', (req, res) => {
    return db.one('SELECT * FROM users')
    .then(function (user) {
        res.json({
            user: user
        })
    })
})

app.listen(PORT, () => console.log(`Server started on ${PORT}`))
