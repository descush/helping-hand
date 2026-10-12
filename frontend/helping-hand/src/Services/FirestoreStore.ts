import {
    collection, deleteDoc, doc, DocumentData, getFirestore, onSnapshot, orderBy, query, setDoc, Timestamp, updateDoc, where
} from "firebase/firestore";
import { app } from "../firebaseConfig";
import { FoodEntry } from "../Interface/FoodEntry";
import { EntryStore, slimEntry } from "./EntryStore";

// Loaded with a dynamic import so visitors who never sign in don't download the Firestore SDK

const HISTORY_DAYS = 60;
const db = getFirestore(app);

// users/{uid}/entries

// Firestore rejects undefined values, so drop them
function toFirestore(entry: Partial<FoodEntry>) {
    const data: DocumentData = {};
    Object.entries(entry).forEach(([key, value]) => {
        if (value === undefined || key === "id") return;
        data[key] = value instanceof Date ? Timestamp.fromDate(value) : value;
    });
    return data;
}

export function createFirestoreStore(uid: string): EntryStore {
    const entriesRef = collection(db, "users", uid, "entries");

    return {
        subscribe(onChange, onError) {
            const since = new Date();
            since.setDate(since.getDate() - HISTORY_DAYS);
            const recent = query(entriesRef, where("timestamp", ">=", Timestamp.fromDate(since)), orderBy("timestamp"));
            return onSnapshot(
                recent,
                snapshot => onChange(snapshot.docs.map(d => {
                    const data = d.data();
                    return { ...data, id: d.id, timestamp: (data.timestamp as Timestamp).toDate() } as FoodEntry;
                })),
                onError
            );
        },
        async add(entry) {
            const ref = entry.id ? doc(entriesRef, entry.id) : doc(entriesRef);
            const saved = { ...slimEntry(entry), id: ref.id };
            await setDoc(ref, toFirestore(saved));
            return saved;
        },
        async update(id, changes) {
            await updateDoc(doc(entriesRef, id), toFirestore(changes));
        },
        async remove(id) {
            await deleteDoc(doc(entriesRef, id));
        },
    };
}
