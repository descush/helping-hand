import * as functions from "firebase-functions";
import { MongoClient } from "mongodb";

const uri: string = functions.config().mongodb.uri;

const client: MongoClient = new MongoClient(uri);

export const getClient = async () => {
    try {
        await client.connect();
        return client;
    } catch (error) {
        console.error("error connecting")
        throw error;
    }

};

//does anyone know why using dot env?