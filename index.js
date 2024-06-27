const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const settings = mysql.createConnection({
    host: 'mysql-1378c953-sahilnihalchandani83-8bab.j.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_WzxmT2sISJ5RE7mw5mz',
    database: 'mayank',
    port: 27510
});

settings.connect(err => {
    if (err) {
        console.error("MySQL connection failed: ", err);
        process.exit(1);
    }
    console.log("MySQL Successfully Connected");
});

app.post('/tasksubmit', (req, res) => {
    const { todoData, username } = req.body;
    console.log(req.body);
    const use2 = `USE ??`;
    const checkdata = `show tables`
    const query = `INSERT INTO todoTask(task) VALUES (?)`;
    const selectval = `SELECT * FROM todoTask`;
    settings.query(use2, [username], (err, results) => {
        if (err) {
            console.log(`Database Doesnt change ${usename}`)
        }
        console.log("Database Changed");
        settings.query(checkdata, (err, results) => {
            if (err) {
                console.log(`Database Doesnt change ${usename}`)
            }
            console.log(results);
            
            settings.query(query, [todoData], (err, result) => {
                if (err) {
                    console.log('Failed to insert data: ', err);
                    return res.status(500).send('Failed to Insert Data');
                }
                console.log("Data Inserted")
                settings.query(selectval, (err, results1) => {
                    if (err) {
                        return res.status(500).send('Failed to retrieve data');
                    }
                    res.send(results1);
                    console.log(results1)
                });
            });
        });
    });
});

app.post('/registersubmit', (req, res) => {
    const { name, phone, password } = req.body;
    const use2 = "USE mayank";
    const query2 = "INSERT INTO register(name, phone, password) VALUES (?, ?, ?)";
    const database = `CREATE DATABASE IF NOT EXISTS ??`;
    const use = `USE ??`;
    const tableQuery = `CREATE TABLE IF NOT EXISTS todoTask(id INT AUTO_INCREMENT PRIMARY KEY, task VARCHAR(2000))`;

    settings.query(use2, (err, result) => {
        if (err) {
            console.error('Failed to insert data: ', err);
            return res.status(500).send('Failed to insert data');
        }
        settings.query(query2, [name, phone, password], (err, result) => {
            if (err) {
                console.error('Failed to insert data: ', err);
                return res.status(500).send('Failed to insert data');
            }

            settings.query(database, [name], (err, result) => {
                if (err) {
                    console.error('Failed to create database: ', err);
                    return res.status(500).send('Failed to create database');
                }

                settings.query(use, [name], (err, result) => {
                    if (err) {
                        console.error('Failed to switch database: ', err);
                        return res.status(500).send('Failed to switch database');
                    }

                    settings.query(tableQuery, (err, result) => {
                        if (err) {
                            console.error('Failed to create table: ', err);
                            return res.status(500).send('Failed to create table');
                        }
                        res.send('User registered and todoTask table created successfully');
                    });
                });
            });
        });
    });
});
app.post('/showfirst', (req, res) => {
    const username1 = req.body.username;
    console.log(username1)
    const selectval = `SELECT * FROM todoTask`;
    const use = `USE ??`;
    settings.query(use,[username1],(err, result)=> {
        if (err) {
            console.log('Failed to insert data: ', err);
            
        }
        settings.query(selectval,(err,result)=>{
            if(err) throw err
            res.send(result);
        })
    });

})
app.post('/logincheck', (req, res) => {
    const { names, passes } = req.body;
    const use2 = "USE mayank";
    const sql = `SELECT * FROM register WHERE name = ? AND password = ?`;
    const useff = `USE ??`;
    const queryfetch = `select * from todoTask`;

    settings.query(use2, (err, result) => {
        if (err) {
            console.error('Failed to switch database: ', err);
            return res.status(500).send('Failed to switch database');
        }
        settings.query(sql, [names, passes], (err, result) => {
            if (err) {
                console.error('Error during login check: ', err);
                return res.status(500).send("Internal Server Error");
            }
            if (result.length > 0) {
                res.json({ success: true, message: "Logged in Successfully" });
                settings.query(useff, [names], (err, result) => {
                    if (err) {
                        console.error('Error occurred: ', err);
                    } else {
                        console.log("Database switched successfully");
                    }
                });
            } else {
                res.status(401).json({ success: false, message: "No Record Found" });
            }
           
        });
    });
});

app.post('/delete', (req, res) => {
    const{task,username,todoid} = req.body;
    const use7 = `use ??`
    const delete1 = `delete from todoTask where id=?`;
    settings.query(use7,[username],(err,results)=>{
        if(err) throw err;
        settings.query(delete1,[todoid],(err,results1)=>{
            if(err) throw err;
        })
    })
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
