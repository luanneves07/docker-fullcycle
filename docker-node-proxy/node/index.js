const express = require('express');
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);

createTableIfNotExists();

const sql = `INSERT INTO people(name) values('Luan')`;
connection.query(sql);

app.get('/', (req, res) => {
    let html = '<h1>Full Cycle</h1>';
    connection.query(`SELECT name FROM people`, (error, result) => {
        if (error) {
            connection.end();
            throw error;
        }
        html = html.concat('<ul>');
        result.forEach(db => {
            html = html.concat(`<li>${db.name}</li>`);
        });
        html = html.concat('</ul>');
        res.send(html);
    });
});

app.post('/:name', (req, res) => {
    const { name } = req.params;
    const sql = `INSERT INTO people(name) values('${name}')`;
    connection.query(sql);
    res.send('<h1>Full Cycle</h1>');
});

app.listen(port, () => {
    console.log(`Server started. Port::${port}`);
})

function createTableIfNotExists() {
    const table = `CREATE TABLE IF NOT EXISTS people ( id int not null auto_increment, name varchar(255), primary key (id) );`;
    connection.query(table);
}