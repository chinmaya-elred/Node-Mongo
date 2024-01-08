const { error } = require('console');
const express = require ('express')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

db.connect(err => {
    if(err){
        throw error
    }
    console.log('MqSQL connected')
})

const app = express();
app.get('/createdb' , (req, res) => {
    let sql  = 'CREATE DATABASE nodemysql';
    db.query(sql , (err) =>{
        if(err){
            throw err
        }
        res.send('Database Created')
    })
})

app.get('/createEmployee', (req, res) => {

    let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255) , designation VARCHAR(255), PRIMARY KEY(id))'

     db.query(sql, err => {
        if (err) {
            throw err
        } else {
            res.send( "Employee table created")
        }
    })
})

app.get('/employee1', (req, res) => {

    let post = {
        name: 'Chinmaya',
        designation: 'react developer'
    }

    let sql = 'INSERT INTO employee SET ?'
     db.query(sql, post, err => {
        if (err) {
            throw err
        } else {
            res.send("Employee added Sucessfully")
        }
    })
})

app.get('/getEmployees', (req, res) => {
    let sql = 'SELECT * FROM employee';
    db.query(sql, (err, response) => {
        if (err) {
            throw err
        } else {
            console.log(response)
            res.send("Employee fetched Sucessfully")
        }
    })

})


app.get('/updateEmployee/:id', (req, res) => {
    const name = 'Rajesh';
    const designation = 'Node Developer'
    let sql = `UPDATE employee SET name = '${name}', designation = '${designation}' WHERE id= ${req.params.id}`;
    let query = db.query(sql, (err) => {
        if (err) {
            throw err
        } else {
            res.send("Employee updated Sucessfully")
        }
    })
})

app.get('/deleteEmployee/:id', (req, res) =>{
    let sql = `DELETE FROM employee WHERE id= ${req.params.id}`
    db.query(sql, (err) =>{
        if(err){
            throw err
        }
        else{
            res.send('Emplyee Deleted Successfully')
        }
    })
})


app.listen(3000 , () =>{
    console.log('Server started with port 3000')
})