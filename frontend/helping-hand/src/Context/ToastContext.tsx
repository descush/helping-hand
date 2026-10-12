import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Toast.css";

export interface ToastOptions {
    message: string;
    tone?: "default" | "success" | "error";
    action?: { label: string; onClick: () => void };
    link?: { label: string; to: string };
}

interface ToastContextModel {
    showToast: (toast: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextModel>({ showToast: () => { } });

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toast, setToast] = useState<(ToastOptions & { key: number }) | null>(null);
    const timer = useRef<ReturnType<typeof setTimeout>>();

    const showToast = useCallback((options: ToastOptions) => {
        setToast({ ...options, key: Date.now() });
    }, []);

    // Toasts with an action stay up a little longer so there's time to hit Undo
    useEffect(() => {
        if (!toast) return;
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setToast(null), toast.action ? 5000 : 3000);
        return () => clearTimeout(timer.current);
    }, [toast]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-region" role="status" aria-live="polite">
                {toast && (
                    <div className={`toast ${toast.tone ?? "default"}`} key={toast.key}>
                        <span className="toast-message">{toast.message}</span>
                        {toast.action && (
                            <button
                                type="button"
                                className="toast-action"
                                onClick={() => { toast.action!.onClick(); setToast(null); }}
                            >
                                {toast.action.label}
                            </button>
                        )}
                        {toast.link && (
                            <Link className="toast-action" to={toast.link.to} onClick={() => setToast(null)}>
                                {toast.link.label}
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </ToastContext.Provider>
    );
}
