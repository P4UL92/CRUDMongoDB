const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('./config/db');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb://dbadmin:dbadmin108@10.0.0.122:27017?useUnifiedTopology=true`;
//const MONGO_URI = `mongodb://${config.dbHost}:${config.portDB}/${DB_NAME}?useUnifiedTopology=true`;
//const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;
console.log(`Prueba, conexion a la bd con la URI: ${MONGO_URI}`);

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          }

          console.log('Conexion exitosa a mongo con mogodb Driver');
          resolve(this.client.db(this.dbName));
        });
      });
    }

    return MongoLib.connection;
  }
  
  /// CRUD ///
  async getAll(collection, args) {
    console.log(args);
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(args)
        .toArray();
    });
  }

  async get(collection, args) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({ '_id': ObjectId(args._id)  }); //return db.collection(collection).findOne({ _id: ObjectId(id) });

    });
  }

  async create(collection , body) {
    return this.connect().then(db => {
      return db.collection(collection).insert(body);
    });
  }

  async update(collection, body, _id) {

    return this.connect().then(db => {
      return db.collection(collection).updateOne(
        {
           "_id": ObjectId(_id)
        },
        {
           "$set":  body 
        },
        {
           "upsert":true
        });
  
    });

    
  }

  async delete(collection,args) {

    console.log(args);
    return this.connect().then(db => {
      return db.collection(collection).deleteOne({ '_id': ObjectId(args._id)  });
    });

  }

 
}

module.exports = MongoLib;
