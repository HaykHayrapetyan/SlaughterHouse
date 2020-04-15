const express = require('express')
const app = express()
const { Pool } = require('pg')

require('dotenv').config()


let connectionString = process.env.postgresconnect

// const pool = new Pool({
//     connectionString,
//     ssl: true
// })


// app.get('/', (req, res) => {
//     pool.query('Select * FROM users')
//     .then(result => {
//         return result.rows
//     })
//     .then(data => {
//         res.status(200).send(data)
//     })
//     .catch(err => {
//         res.status(500).send(err)
//     })
// })


// //     pool.connect((err, client, done) => {
// //         if(err){
// //             res.send(err)
// //         }

// //         client.query('Select * FROM users Where id = $1', [2])
// //         .then(result => {
// //             return result.rows
// //         })
// //         .then(data => {
// //             res.status(200).send(data)
// //         })
// //         .catch(err => {
// //             res.status(500).send(err)
// //         })
// //         .finally(()=>{
// //             done()
// //         })
// //     })

// // })




// app.use('/api', require('./Controllers'))
// app.get('/', (req, res) => {
//     res.send('hello')
// })


connectionString += '?ssl=true'
const Sequelize = require('sequelize')
const sequelize = new Sequelize(connectionString)


const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },   
    name: {
        type: Sequelize.STRING,
        allowNull: true
    } 
}, {
    timestamps: false,
    freezeTableName: true
})


const Car = sequelize.define('cars', {
    carId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },   
    carName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    userId: {
        type: Sequelize.INTEGER
    } 
}, {
    timestamps: false,
    freezeTableName: true
})


User.destroy({
    where: {
        id: 5
    }
}).then(data => {
    console.log(data)
})
.catch(err => {
    console.log(err)
})


User.update({name: 'Vazgen'}, {
    where: {
        id: 5
    }
}).then(data => {
    console.log(data)
})
.catch(err => {
    console.log(err)
})

User.bulkCreate([
    {id: 4, name: 'Albert'},
    {id: 5, name: 'EliHayk'}
]).then(data => {
    console.log(data)
})
.catch(err => {
    console.log(err)
})

User.hasMany(Car, {foreignKey: 'userId'})
Car.belongsTo(User, {foreignKey: 'userId'})



User.findAll({
    attributes: ['name'],
    include: [
        {
            model: Car,
            attributes: ['carName']
        }
    ],
    raw: true,
    where: {
        id: {
           [Sequelize.Op.between]: [1, 2] 
        }
    }
})
.then(data => {
    console.log(data)
})
.catch(err => {
    console.log(err)
})    

Car.findAll({
    attributes: ['carId', 'carName'],
    raw: true
})
.then(data => {
    console.log(data)
})
.catch(err => {
    console.log(err)
})  

app.get('/', async (req, res) => {
    
    // User.findAll({raw: true})
    // .then(data => {
    //     console.log(data)
    // })
    // .catch(err => {
    //     console.log(err)
    // })    
})

app.get('/newbranch', async (req, res) => {
    
    // User.findAll({raw: true})
    // .then(data => {
    //     console.log(data)
    // })
    // .catch(err => {
    //     console.log(err)
    // })    
})

app.listen(3000)


