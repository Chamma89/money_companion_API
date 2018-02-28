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

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/api/mc', (req, res) => {

    // res.send('sdfsdf')
    db.one('SELECT * FROM users where id = 4')
        .then(function (data) {
            res.json({ user: data })
        })
})


app.post('/api/mc/update', function(req, res){
    var customerName = req.body.name;
    var customerEmail = req.body.email;
    var customerPhone = req.body.phone;
    db.none('INSERT INTO users(name, email, phone) VALUES($1, $2, $3)', [customerName, customerEmail, customerPhone]
    ).then(function(){
        console.log('success')
    })

    res.send(customerName)
})

// db.any('select * from users where active = $1', [true])
//     .then(data => {
//         console.log('DATA:', data); // print data;
//     })

app.listen(PORT, () => console.log(`Server started on ${PORT}`))
