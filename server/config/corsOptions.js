const allowedOrigins = require('./allowedOrigins');


const  corsOptions = {
    origin: 'https://lost-n-found-69q4b.ondigitalocean.app/'
    /*(origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || origin) {
            callback(null, true)
        } else {
            callback(new Error('Not Allowed by CORS'));
        }

    }, optionsSuccessStatus: 200*/
}
module.exports = corsOptions;