
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const cors = require('cors');
//const CONFIG = require('./config');
app.use(cors());

     //Смена порта
const port = 8000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'e-shop'
});

app.connect((err) => {
    if(err) {
        console.log('Ошибка подключения к MySQL: ', err);
    }
    else {
        console.log('Подключено к MySQL:'); 
    }
});

app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, result) => {
       if(err) {
         return res.status(500).send('Ошибка запроса к MySQL');
       }else {
         res.json(result);
       }
    })
});

                    //Маршрутизация 

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/moredetaile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'moredetaile.html'))
});

app.get('cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart'))
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`)
});


                //   Подключение с импортом

//app.get('/products', (req, res) => {
//    const connection = mysql.createConnection(CONFIG);
//    connection.connect();

//    const query = 'SELECT * FROM products';

//    connection.query(query, (error, results) => {
//        if (error) {
//            console.error('MySQL Error:', error);
//            res.status(500).json({ error: 'Database error' });
//        } else {
//            res.json(results);
//        }
//        connection.end();
//    });
//});

//app.listen(PORT, () => {
//    console.log(`Сервер запущен на http://localhost:${PORT}`);
//});
