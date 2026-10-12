import { FoodEntry } from "../Interface/FoodEntry";

// Where entries live: the browser for guests, Firestore for signed-in users
// (FirestoreStore.ts, loaded only after sign-in), memory only for the demo. Every store notifies subscribers with the full list.
export interface EntryStore {
    subscribe(onChange: (entries: FoodEntry[]) => void, onError: (error: Error) => void): () => void;
    add(entry: FoodEntry): Promise<FoodEntry>;
    update(id: string, changes: Partial<FoodEntry>): Promise<void>;
    remove(id: string): Promise<void>;
}


function newId() {
    return typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// Keep only what the app displays, so stored entries stay small
export function slimEntry(entry: FoodEntry): FoodEntry {
    const keep = ["Energy", "Protein", "Carbohydrate", "Total lipid"];
    return {
        id: entry.id,
        fdcId: entry.fdcId,
        description: entry.description,
        servingAmount: entry.servingAmount ?? 1,
        servingType: entry.servingType,
        timestamp: new Date(entry.timestamp),
        foodNutrients: entry.foodNutrients
            ?.filter(n => keep.some(k => n.nutrientName.startsWith(k)))
            .map(({ nutrientId, nutrientName, unitName, value }) =>
                ({ nutrientId, nutrientName, unitName, value } as NonNullable<FoodEntry["foodNutrients"]>[number])),
    };
}

// ---------- Browser / memory store ----------

export function createLocalStore(storageKey: string | null, initial: FoodEntry[] = []): EntryStore {
    let entries: FoodEntry[] = initial.map(e => ({ ...slimEntry(e), id: e.id ?? newId() }));
    const listeners = new Set<(entries: FoodEntry[]) => void>();

    if (storageKey) {
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                entries = (JSON.parse(saved) as FoodEntry[]).map(e => ({ ...e, timestamp: new Date(e.timestamp) }));
            }
        } catch { }
    }

    function commit(next: FoodEntry[]) {
        entries = next;
        if (storageKey) {
            try {
                localStorage.setItem(storageKey, JSON.stringify(entries));
            } catch { }
        }
        listeners.forEach(listener => listener(entries));
    }

    return {
        subscribe(onChange) {
            listeners.add(onChange);
            onChange(entries);
            return () => { listeners.delete(onChange); };
        },
        async add(entry) {
            const saved = { ...slimEntry(entry), id: entry.id ?? newId() };
            commit([...entries, saved]);
            return saved;
        },
        async update(id, changes) {
            commit(entries.map(e => e.id === id ? { ...e, ...changes } : e));
        },
        async remove(id) {
            commit(entries.filter(e => e.id !== id));
        },
    };
}

export const GUEST_STORAGE_KEY = "hh-entries";

export function readGuestEntries(): FoodEntry[] {
    let entries: FoodEntry[] = [];
    createLocalStore(GUEST_STORAGE_KEY).subscribe(e => { entries = e; }, () => { })();
    return entries;
}

export function clearGuestEntries() {
    try {
        localStorage.removeItem(GUEST_STORAGE_KEY);
    } catch { }
}
