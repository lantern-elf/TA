const express = require('express');
const mysql = require('mysql')
const app = express()

const host = "localhost"
const port = 3001

const database = mysql.createConnection({
    host: host,
    user: "root",
    password: "",
    database: "karyawan"
})

//connect to database
database.connect((err) =>{
    if(err) throw err
    console.log("Database connected")
})

//Main gates of API
app.get("/", (req, res) => {
    res.send("Wellcome to API")
}) 

app.get("/users", (req, res) => {
   database.query("SELECT * FROM users", (err, rows) => {
       if(err) throw err
       res.json({
            success: true,
            message: "Succeed getting data",
            data: rows,
       })
   })
})

//Running the server
app.listen(port, () => {
    console.log(`Server is running in ${`${host}:${port}`} `)
})