
require('dotenv').config({path: '.env'});

const config = {
  dev: process.env.NODE_ENV,
  port: 3000,
  portDB: process.env.PORTDB,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME
};

module.exports = { config };

/*
const mongoose =require("mongoose");
require('dotenv').config({path: 'variables.env'});

const conectarDB = async ()=>{
    try {
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log('DataBase conectada');
    } catch (error) {
        console.log('hubo un error');
        console.log(error);
        process.exit(1); //detener la app
    }
}

module.exports = conectarDB;
*/