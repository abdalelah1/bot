const bodyParser = require('body-parser');
const { productCategory, myFunction2 } = require('./bot-functions');

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
    database: 'bookdb',
    multipleStatements: true
});
mysqlConnection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.post('/webhook', (request, response) => {
    let intents = new Map()
    console.log('from post')
    const _agent = new WebhookClient({ request: request, response: response });
    function welcome(agent) {
        console.log('from start welcome')
        return agent.add('welcome to abdalelah agent!')

    }
    
    if (_agent.intent=='product-info') 
    {
        mysqlConnection.query('SELECT * FROM mainapp_category', (err, rows, fields) => {
            if (!err) {
              let listofCategory=[];
                function product_category(agent) {
                    
                   for (i in rows)
                   {
                    listofCategory.push(rows[i].Category_name)
                   }
                    console.log('from product_category',listofCategory)
                    return agent.add(['we have this category ',...listofCategory])     
                }
                intents.set('product-info',product_category)
                _agent.handleRequest(intents)
            }
            else
                console.log(err)
        }    
    )
            
    }
    else {
    console.log(productCategory())
    console.log('from end intent',_agent.intent )
    function welcome(agent) {
        return agent.add('welcome to radfaatttt agent!')
    }
    console.log(_agent.query)
    console.log(_agent.parameters)
   
}
 
  



})


app.get('/', (req, res) => {
    var data = {};
    queries = 'SELECT * FROM NAME';

}
)
app.listen(PORT, (error) => {
    if (!error)
        console.log(`Server is Successfully Running,
                   and App is listening on port `+ PORT)

    else
        console.log("Error occurred, server can't start", error);
}
);