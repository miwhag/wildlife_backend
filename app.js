const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sendGrid = require('@sendgrid/mail');
const app = express(); 
require('dotenv').config()
console.log(process.env);

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    next();
});


app.get('/', (req, res, next) => {
    res.send('API Status: Running ')
});

app.post('/emails', (req, res, next) => {

    sendGrid.setApiKey(process.env.API_KEY);
    const msg = {
        to: 'miwha.geschwind@gmail.com', 
        from: req.body.email, 
        subject: 'Wildlife Rescue Website Contact', 
        text: req.body.message
    }

    sendGrid.send(msg)
    .then(result => {
        res.status(200).json({
        success: true
})
    })
    .catch(err => {
        console.log('error:', err);
        res.status(401).json({
            success: false
        })
    })

});

app.listen(3030, '0.0.0.0')

// const PORT = process.env.PORT || 3030
// app.listen(PORT, () => {
//     console.log(`Listening on ${PORT}`)
// })
