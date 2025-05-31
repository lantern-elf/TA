const express = require('express');
const mysql = require('mysql')
const app = express()
const bodyParser = require("body-parser")
const cors = require('cors')
const response = require('./response')
const bcrypt = require('bcrypt');
const host = "localhost"
const port = 3001

const database = mysql.createConnection({
    host: host,
    user: "root",
    password: "",
    database: "internflow"
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
    const sql = `SELECT * FROM ${tableName} WHERE id = ?`;
    database.query(sql, [id], (err, fields) => {
        if(err) throw err
        response(200, fields, "Succeed Getting Data", res)
    })
})

//Submit Users Data
app.post("/users", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 13); // Hash the plain password
        const sql = `INSERT INTO ${tableName} (name, email, password_hash, role) VALUES (?, ?, ?, ?)`;
        const values = [name, email, hashedPassword, role];
        database.query(sql, values, (err, fields) => {
            if (err) return response(500, null, "Error adding user", res);
            if (fields?.affectedRows) {
                response(200, fields, "Succeed Adding Data", res);
            }
        });
    } catch (err) {
        response(500, null, "Server error", res);
    }
});

//Update Data
app.put("/users", async (req, res) => {
    const { id, name, email, role } = req.body;
    try {
        const sql = `UPDATE ${tableName} SET name = ?, email = ?, role = ? WHERE id = ?`;
        const values = [name, email, role, id];

        database.query(sql, values, (err, fields) => {
            if (err) return response(500, null, "Error updating user", res);
            if (fields?.affectedRows) {
                response(200, fields, "Succeed Updating Data", res);
            } else {
                response(404, null, "User not found", res);
            }
        });
    } catch (err) {
        response(500, null, "Server error", res);
    }
});

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

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const sql = `SELECT * FROM ${tableName} WHERE email = ?`;
    database.query(sql, [email], async (err, result) => {
        if (err) return response(500, null, "Database error", res);
        if (result.length === 0) {
            return response(401, null, "Email not registered", res);
        }

        const user = result[0];

        try {
            // Compare hashed password
            const match = await bcrypt.compare(password, user.password_hash);
            if (!match) {
                return response(401, null, "Incorrect password", res);
            }

            // Don't send password hash back
            delete user.password_hash;

            return response(200, user, "Login successful", res);
        } catch (error) {
            console.error(error);
            return response(500, null, "Server error", res);
        }
    });
});

app.get("/tasks", (req, res) => {
    const sql = `SELECT * FROM tasks`;

    database.query(sql, (err, rows) => {
        if (err) return response(500, null, "Error fetching tasks", res);
        response(200, rows, "Succeed Getting Tasks", res);
    });
});

app.post("/tasks", async (req, res) => {
    const { user_id, title, description, status, due_date } = req.body;

    const sql = `
        INSERT INTO tasks (user_id, title, description, status, due_date)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [user_id, title, description, status || 'in_progress', due_date];

    database.query(sql, values, (err, result) => {
        if (err) return response(500, null, "Error creating task", res);
        response(201, result, "Task created successfully", res);
    });
});

app.get("/tasks/user/:user_id", (req, res) => {
    const { user_id } = req.params;

    const sql = `SELECT * FROM tasks WHERE user_id = ?`;
    database.query(sql, [user_id], (err, rows) => {
        if (err) return response(500, null, "Error fetching user tasks", res);
        response(200, rows, "Succeed Getting User's Tasks", res);
    });
});

app.get("/tasks/:id", (req, res) => {
    const { id } = req.params;

    const sql = `SELECT * FROM tasks WHERE id = ?`;
    database.query(sql, [id], (err, row) => {
        if (err) return response(500, null, "Error fetching task", res);
        response(200, row, "Succeed Getting Task", res);
    });
});

app.put("/tasks", (req, res) => {
    const { id, title, description, status, due_date } = req.body;

    const sql = `
        UPDATE tasks 
        SET title = ?, description = ?, status = ?, due_date = ?
        WHERE id = ?
    `;

    const values = [title, description, status, due_date, id];

    database.query(sql, values, (err, fields) => {
        if (err) return response(500, null, "Error updating task", res);
        if (fields?.affectedRows) {
            response(200, fields, "Succeed Updating Task", res);
        } else {
            response(404, null, "Task not found", res);
        }
    });
});

app.delete("/tasks", (req, res) => {
    const { id } = req.body;

    const sql = `DELETE FROM tasks WHERE id = ?`;
    database.query(sql, [id], (err, fields) => {
        if (err) return response(500, null, "Error deleting task", res);
        if (fields?.affectedRows) {
            response(200, fields, "Succeed Deleting Task", res);
        } else {
            response(404, null, "Task not found", res);
        }
    });
});

//Running the server
app.listen(port, () => {
    console.log(`Server is running in http://${`${host}:${port}`} `)
})