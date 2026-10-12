import { ReactNode, useState, useMemo, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FoodContext, { EntryMode } from "./FoodContext";
import AuthContext from "./AuthContext";
import { useToast } from "./ToastContext";
import { FoodEntry } from "../Interface/FoodEntry";
import { getDemoEntries, isDemoMode } from "../demoData";
import { totalsByDay } from "../stats";
import {
    clearGuestEntries, createLocalStore, EntryStore, GUEST_STORAGE_KEY, readGuestEntries
} from "../Services/EntryStore";

// Firestore is only downloaded once someone signs in
const loadFirestoreStore = () => import("../Services/FirestoreStore").then(m => m.createFirestoreStore);

interface Props {
    children: ReactNode;
}

const STARTED_KEY = "hh-started";
const NO_ENTRIES: FoodEntry[] = [];

function readStarted() {
    try {
        return localStorage.getItem(STARTED_KEY) === "true";
    } catch {
        return false;
    }
}

export function FoodContextProvider({ children }: Props) {
    const { user, authReady } = useContext(AuthContext);
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [demo, setDemo] = useState(isDemoMode);
    const [started, setStarted] = useState(readStarted);
    const [foodEntry, setFoodEntry] = useState<FoodEntry[]>([]);
    // The store the current entries came from; entries are "ready" only once the active store has delivered
    const [loadedFrom, setLoadedFrom] = useState<EntryStore | null>(null);

    const uid = user?.uid;
    const mode: EntryMode = demo ? "demo" : uid ? "user" : "guest";

    // Pick where entries live: memory for the demo, Firestore when signed in, the browser otherwise
    const [store, setStore] = useState<EntryStore | null>(null);
    useEffect(() => {
        if (demo) return setStore(createLocalStore(null, getDemoEntries()));
        if (!authReady) return setStore(null);
        if (!uid) return setStore(createLocalStore(GUEST_STORAGE_KEY));

        let cancelled = false;
        setStore(null);
        loadFirestoreStore().then(createFirestoreStore => {
            if (!cancelled) setStore(createFirestoreStore(uid));
        });
        return () => { cancelled = true; };
    }, [demo, authReady, uid]);

    // Returning signed-in users skip the landing page from now on
    useEffect(() => {
        if (uid) startAsGuest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid]);

    const reportError = useCallback((error: unknown) => {
        console.error("Entry storage error:", error);
        showToast({ message: "Couldn't save your entries. Check your connection and try again.", tone: "error" });
    }, [showToast]);

    useEffect(() => {
        if (!store) return;
        return store.subscribe(
            entries => {
                setFoodEntry(entries);
                setLoadedFrom(store);
            },
            error => {
                reportError(error);
                setFoodEntry([]);
                setLoadedFrom(store);
            }
        );
    }, [store, reportError]);

    const entriesReady = store !== null && loadedFrom === store;
    const visibleEntries = entriesReady ? foodEntry : NO_ENTRIES;

    // When a guest signs in, move what they logged into their account
    useEffect(() => {
        if (!uid || demo) return;
        const guestEntries = readGuestEntries();
        if (guestEntries.length === 0) return;
        loadFirestoreStore()
            .then(createFirestoreStore => {
                const account = createFirestoreStore(uid);
                return Promise.all(guestEntries.map(entry => account.add(entry)));
            })
            .then(() => {
                clearGuestEntries();
                showToast({ message: `Moved ${guestEntries.length} entries to your account`, tone: "success" });
            })
            .catch(reportError);
    }, [uid, demo, showToast, reportError]);

    // The existing per-category daily totals, keyed by date
    const dailySubmissions = useMemo(() => {
        const days = totalsByDay(visibleEntries);
        const pick = (key: keyof typeof days[string]) =>
            Object.fromEntries(Object.entries(days).map(([date, totals]) => [date, totals[key]]));
        return { protein: pick("protein"), veggies: pick("veggies"), carbs: pick("carbs"), fat: pick("fat") };
    }, [visibleEntries]);

    async function addFood(food: FoodEntry) {
        if (!store) return undefined;
        try {
            return await store.add(food);
        } catch (error) {
            reportError(error);
            return undefined;
        }
    }

    function updateFood(id: string, changes: Partial<FoodEntry>) {
        store?.update(id, changes).catch(reportError);
    }

    function removeFood(id: string) {
        store?.remove(id).catch(reportError);
    }

    function startAsGuest() {
        setStarted(true);
        try {
            localStorage.setItem(STARTED_KEY, "true");
        } catch { }
    }

    function startDemo() {
        setDemo(true);
        navigate("/?demo");
    }

    function exitDemo() {
        setDemo(false);
        navigate("/", { replace: true });
    }

    return (
        <FoodContext.Provider
            value={{
                foodEntry: visibleEntries,
                entriesReady,
                mode,
                addFood,
                updateFood,
                removeFood,
                dailyProteinSubmissions: dailySubmissions.protein,
                dailyVeggieSubmissions: dailySubmissions.veggies,
                dailyCarbSubmissions: dailySubmissions.carbs,
                dailyFatSubmissions: dailySubmissions.fat,
                hasStarted: started || demo || !!uid || visibleEntries.length > 0,
                startAsGuest,
                startDemo,
                exitDemo,
            }}
        >
            {children}
        </FoodContext.Provider>
    );
}
