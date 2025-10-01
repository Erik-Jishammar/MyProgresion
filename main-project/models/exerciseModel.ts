import { Collection, ObjectId, MongoClient } from "mongodb";

export interface Exercise {
    _id?: ObjectId;
    name: string;
    reps: number; 
    sets: number; 
    weight: number;
}
const uri = "mongodb://127.0.0.1:27017"; // MongoDB setup
const client = new MongoClient(uri);

let collection: Collection<Exercise>; 

async function connectDB (): Promise<void> {
    
 
    try {
        await client.connect();
        const db = client.db("trainingApp");
        collection = db.collection<Exercise>("exercises");
        console.log('MongoDB ansluten');

    } catch(err){
        console.log('Misslyckades med att ansluta till mongoDB', err);}
        };

 function getCollection(): Collection<Exercise> {
    if( !collection){
        throw new Error ('MongoDB collection är inte ansluten ännu')
    }
    return collection;
}

export {getCollection, connectDB}; 