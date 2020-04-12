const express = require('express')
const router = express()

router.get('/', (req, res) => {

    pool.connect((err, client, done) => {
        if(err){
            res.send(err)
        }

        client.query('Select * FROM users Where id = $1', [2])
        .then(result => {
            return result.rows
        })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
        .finally(()=>{
            done()
        })
    })
})

module.exports = router