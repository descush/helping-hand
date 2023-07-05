import express from "express";
import Entry from "../models/Entry";
import { ObjectId } from "mongodb";
import { getClient } from "../db";

export const entryRouter = express.Router();

//ENDPOINTS
// Delete an entry
entryRouter.delete('/entries/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid entry ID' });
            return;
        }
        const client = await getClient();
        const result = await client.db().collection<Entry>('entries').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Entry not found' });
        } else {
            res.status(204).json(); // No content
        }
    } catch (err) {
        console.error("ERROR", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// Delete all entries
entryRouter.delete('/entries', async (req, res) => {
    try {
        const client = await getClient();
        await client.db().collection<Entry>('entries').deleteMany({});
        res.status(204).json(); // No content
    } catch (err) {
        console.error("ERROR", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// Get all entries
entryRouter.get('/entries', async (req, res) => {
    try {
        const client = await getClient();
        const results = await client.db().collection<Entry>('entries').find().toArray()
        console.log(results)
        res.status(200).json(results);
    } catch (err) {
        console.error("ERROR", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get one entry
entryRouter.get('/entries/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid entry ID' });
            return;
        }
        const client = await getClient();
        const result = await client.db().collection<Entry>('entries').findOne({ _id: new ObjectId(id) });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Entry not found' });
        }
    } catch (err) {
        console.error("ERROR", err);
        res.status(404).json({ message: "ID Not Found" });
    }
});

// Create an entry
entryRouter.post('/entries', async (req, res) => {
    try {
        const newEntry = req.body as Entry;
        const client = await getClient();
        const result = await client
            .db()
            .collection<Entry>('entries')
            .insertOne(newEntry);

        if (result.acknowledged && result.insertedId) {
            const insertedId = result.insertedId;
            const insertedEntry = await client
                .db()
                .collection<Entry>('entries')
                .findOne({ _id: insertedId });

            if (insertedEntry) {
                console.log(insertedEntry);
                res.status(201).json(insertedEntry);
            } else {
                res.status(500).json({ message: "Failed to create entry" });
            }
        } else {
            res.status(500).json({ message: "Failed to create entry" });
        }
    } catch (err) {
        console.error("Error creating entry:", err);
        res.status(500).json({ message: "Failed to create entry" });
    }
});

// Replace an entry
entryRouter.put("/entries/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body as Entry;
    delete data._id;
    try {
        const client = await getClient();
        const result = await client
            .db()
            .collection<Entry>('entries')
            .replaceOne({ _id: new ObjectId(id) }, data);
        if (result.modifiedCount === 0) {
            res.status(404).json({ message: "Not Found" });
        } else {
            data._id = new ObjectId(id);
            res.status(200).json(data);
        }
    } catch (err) {
        console.error("Error creating entry:", err);
        res.status(404).json({ message: "Failed to replace entry" });
    }
});