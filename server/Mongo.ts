import {MongoClient} from 'mongodb';

const url:any = process.env.MONGO_KEY;
const client = new MongoClient(url);

async function connectToMongo(){
    try{
        await client.connect();
        console.log("Connected to database")
    }catch(e){
        console.error("Error connecting to mongo", e);
        throw e;
    }
}

async function closeMongo(){
    try{
        await client.close();
        console.log("Closed database");
    }catch(e){
        console.error("Error closing connection", e);
        throw e;
    }
}

async function insertData(data: any){
    try{
        const database = client.db("weatherDatabase");
        let collectionName = ""
        if (data.weather){
            collectionName = "weatherCollection"
        }else{
            collectionName = "locationCollection"
        } 
    
        if (collectionName){
            const collection = database.collection(collectionName);
            await collection.insertOne(data);
            console.log("Inserted data into MONGODB");


           const query = {name:"Windsor"};
           const location = "Milan" //Or whatever city I want to update//delete

           console.log(query, location)
           
        //    const location = await findDocuments(collection,query);
        //    const update = await updateDocuments(collection, location);
        //    const deletion = await deleteDocuments(collection, location)


        //    console.log("${query}:", location)
        //    console.log(`${location}:`, JSON.stringify(update));
        //    console.log(`all instances of ${location} deleted`, deletion)
        
        }else{
            console.log("Insert did not work")
        }

    }catch(e){
        console.error("Error inserting into Mongo", e);
        throw e;
    }
}


// //Some practice functions that I wanted to try

// async function findDocuments(collection:any,query:any){
//     try{
//         const result = await collection.find(query).toArray();
//         return result;
//     }catch (e) {
//         console.error("Error finding documents:", e);
//         throw e;
//     }
// }

// async function updateDocuments(collection:any, location:any){
//     try{
//         const result = await collection.updateMany(
//             {name: location},
//             {
//                 //Dummy 
//                 $set: {
//                     lat: `00000 ${location}`
//                 }
//             },
//             { upsert: true }
//         )
//         return result;
//     }catch(e){
//         console.error("error in update", e)
//     }

// }

// async function deleteDocuments(collection:any, query:any){
//     try{
//         const result = await collection.deleteMany({name:{$regex:query}});
//         return result;
//     }catch(e){
//         console.error("error in deletion", e);
//     }
// }

export{connectToMongo, closeMongo,insertData}