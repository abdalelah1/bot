const bodyParser = require('body-parser');
const express = require('express');
const app = express().use(bodyParser.json());
const PORT = process.env.PORT || 3000;
const dialogflow = require('dialogflow')
const { WebhookClient } = require('dialogflow-fulfillment');
const { request, response, query } = require('express');
const mysql = require('mysql')
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'test',
    password: '1234',
    database: 'test',
    multipleStatements: true
});
mysqlConnection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.post('/webhook', (request, response) => {
    console.log('from post')
    const _agent = new WebhookClient({ request: request, response: response });
    function welcome(agent) {
        console.log('from start welcome')
        return agent.add('welcome to abdalelah agent!')

    }
   
    console.log('from end welcome')
    function welcome(agent) {
        return agent.add('welcome to radfaatttt agent!')
    }
    let intents = new Map()
    intents.set('Default Welcome Intent', welcome)
    console.log(_agent.query)
    _agent.handleRequest(intents)



})


app.get('/', (req, res) => {
    var data = {};
    queries = 'SELECT * FROM NAME';
    mysqlConnection.query('SELECT * FROM name', (err, rows, fields) => {
        if (!err) {

            console.log(rows[0].id)
            console.log(rows)
            
            res.status(200).send((rows[0].id).toString())


        }
        else
            console.log(err)



    }

    )

})
app.listen(PORT, (error) => {
    if (!error)
        console.log(`Server is Successfully Running,
                   and App is listening on port `+ PORT)

    else
        console.log("Error occurred, server can't start", error);
}
);