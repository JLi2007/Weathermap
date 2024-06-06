//why is there 5 errors, it works fine...

const { MongoClient } = require("mongodb");

require("dotenv").config();

const url = process.env.MONGO_KEY;                                                                                                                                   

const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);