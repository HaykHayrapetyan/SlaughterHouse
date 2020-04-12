const express = require('express')
const app = express()
const { Pool } = require('pg')

require('dotenv').config()


let connectionString = process.env.postgresconnect

const pool = new Pool({
    connectionString,
    ssl: true
})


app.get('/', (req, res) => {
    pool.query('Select * FROM users')
    .then(result => {
        return result.rows
    })
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(500).send(err)
    })
})


//     pool.connect((err, client, done) => {
//         if(err){
//             res.send(err)
//         }

//         client.query('Select * FROM users Where id = $1', [2])
//         .then(result => {
//             return result.rows
//         })
//         .then(data => {
//             res.status(200).send(data)
//         })
//         .catch(err => {
//             res.status(500).send(err)
//         })
//         .finally(()=>{
//             done()
//         })
//     })

// })




app.use('/api', require('./Controllers'))
app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/other', (req, res) => {
    res.send('helloOther')
})

app.listen(3000)