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
    db.one('SELECT * FROM savings ORDER BY ID DESC LIMIT 1')
        .then(function (data) {
            res.json({ user: data })
        })
})


app.post('/api/mc/update', function(req, res){
    var currentbalance = req.body.currentbalance;
    var income = req.body.income;
    var closingbalance = req.body.closingbalance;
    var month = req.body.month;
    // debugger
    var spending = (Number(closingbalance) - (Number(currentbalance) + Number(income)))
    var saving = Number(spending) + Number(income)
    db.none('INSERT INTO savings(currentbalance, income, closingbalance, spending, saving, month) VALUES($1, $2, $3, $4, $5, $6)', [currentbalance, income, closingbalance, spending, saving, month]
    ).then(function(){
        console.log('success')
    })

    res.send(closingbalance)
})

// db.any('select * from users where active = $1', [true])
//     .then(data => {
//         console.log('DATA:', data); // print data;
//     })

app.listen(PORT, () => console.log(`Server started on ${PORT}`))
