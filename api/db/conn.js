require('dotenv').config({path: __dirname + '/.env'});

// import { MongoClient } from "mongodb";

const { MongoClient } = require('mongodb');

const mongURL = process.env.ATLAS_URI;
const dbName = process.env.DB_NAME;

let db = null;

async function connectToDatabase() {
    if (db){
        return db;
    }

    try {
        const client = await MongoClient.connect(mongURL);
        db = client.db(dbName);
        console.log('Conexão estabelecida com sucesso.');
        return db;
    } catch (err) {
        console.log('Erro ao conectar ao MongoDB: ', err);
        throw err;
    }
}

module.exports = {
    connectToDatabase
}

// const connectionString = process.env.ATLAS_URI || "";
// const client = new MongoClient(connectionString);

// let conn;
// let db;

// async function connectToMongoDB(){
//     try{
//         conn = await client.connect();
//     } catch(error) {
//         console.log(error);
//     }
    
//     db = conn.db("my_steam");
// }

// connectToMongoDB();

// module.exports = db;