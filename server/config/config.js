

// =======================================
// PUERTO
// =======================================
// es igual al process.env.PORT ó  3000
process.env.PORT = process.env.PORT || 3000;


// =======================================
// ENVIRONMENT
// =======================================

environment = process.env.NODE_ENV || 'dev';

let urlDB;

if (environment === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://fernando:12345@cafe.uby8kn7.mongodb.net/?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;