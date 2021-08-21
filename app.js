const express = require('express');
const path = require('path');
const config = require('config');
const mongoose = require('mongoose')
const fetch = require('node-fetch');
const { format } = require('date-fns');
const oneDay = 86400000;
const CarListModel = require('./models/CarPriceList.js');
const router = require('./routes/routes.js')
const passport = require('passport');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use('/account', router);
app.use(express.static(path.join(__dirname, 'content')))
app.get('/', (req, res) => {
    res.send('Main webpage')
});

Array.prototype.max = function() {
    return Math.max.apply(null, this);
};
  
Array.prototype.min = function() {
    return Math.min.apply(null, this);
};

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

//returns JSON
async function request(url, method = 'GET', body = null, headers = {}) {
    try {
        const response = await fetch(url, { method, body, headers });
        if (!response.ok) {
            throw new Error(data.message || '[ERROR]: Bad request')
        }
        return await response.json();
    } catch (err) {
        console.log(err.message)
    }
};

async function autoRiaRequestHandler(url, model = 'BMW X5') {
    let data = await request(url);
    await data.prices.sort( (a, b) => a-b )
    return {
        model,
        minPrice: data.prices.min(),
        maxPrice: data.prices.max(),
        averagePrice: parseFloat(data.arithmeticMean.toFixed(2)),
        date: format(new Date(), 'yyyy-MM-dd HH:mm')
    };
};

async function dataGathering() {
    let data = await autoRiaRequestHandler(config.autoRIAapi);
    await CarListModel.sendData(data);
};

function IntervalGathering(ms, numberOfCycles) {
    dataGathering();
    let timerId = setInterval(() => {
        dataGathering();
    }, ms)
    setTimeout(() => {
        clearInterval(timerId)
    }, ms * numberOfCycles)
};

// ****************************************************************************************************************
// server start point

mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
app.listen(PORT, () => console.log(`[STATUS]: server ok. Listening on port ${PORT}`));

IntervalGathering(oneDay, 365);

