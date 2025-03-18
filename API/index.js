const express = require('express');
const mysql = require('mysql')
const app = express()
const bodyParser = require("body-parser")
const cors = require('cors')
const response = require('./response')
const host = "localhost"
const port = 3001

const database = mysql.createConnection({
    host: host,
    user: "root",
    password: "",
    database: "karyawan"
})
const tableName = "users"

app.use(cors())
app.use(bodyParser.json())

//connect to database
database.connect((err) =>{
    if(err) throw err
    console.log("Database connected")
})

//Main gates of API

app.get("/", (req, res) => {
    res.send("Wellcome to API")
}) 

//Get Users
app.get("/users", (req, res) => {
    const sql = `SELECT * FROM ${tableName}`
    database.query(sql, (err, rows) => {
       if(err) throw err
       response(200, rows, "Succeed Getting Data", res)
   })
})

//Get Users by ID
app.get("/users/:id", (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM ${tableName} WHERE id = ${id}`
    database.query(sql, (err, fields) => {
        if(err) throw err
        response(200, fields, "Succeed Getting Data", res)
    })
})

//Submit Users Data
app.post("/users", (req, res) => {
    const { name, email, password_hash, role } = req.body
    const sql = `INSERT INTO ${tableName} (name, email, password_hash, role) VALUES ('${name}', '${email}', '${password_hash}', '${role}')`
    database.query(sql, (err, fields) => {
        if(err) response(500, "Invalid", "Error", res)
        if(fields?.affectedRows){ 
            response(200, fields, "Succeed Adding Data", res)
        }
    })
})

//Update Data
app.put("/users", (req, res) => {
    const { id, name, email, password_hash, role } = req.body
    const sql = `UPDATE ${tableName} SET name = '${name}', email = '${email}', password_hash = '${password_hash}', role = '${role}' WHERE id = ${id}`
    database.query(sql, (err, fields) => {
        if(err) response(404, "Invalid", "Error", res)
        if(fields?.affectedRows){ 
            response(200, fields, "Succeed Updating Data", res)
        }
    })
})

//Delete Data
app.delete("/users", (req, res) => {
    const { id } = req.body
    const sql = `DELETE FROM ${tableName} WHERE id = ${id}`
    const sqlAutoInc = `ALTER TABLE ${tableName} AUTO_INCREMENT = 1;`
    database.query(sql, (err, fields) => {
        if(err) response(500, "Invalid", "Error", res)
        if(fields?.affectedRows){ 
            response(200, fields, "Succeed Deleting Data", res)
            database.query(sqlAutoInc)
        }
    })
})

//Running the server
app.listen(port, () => {
    console.log(`Server is running in ${`${host}:${port}`} `)
})