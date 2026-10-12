import './ProgressRing.css';

interface Props {
    value: number;
    max: number;
    size?: number;
    strokeWidth?: number;
    children?: React.ReactNode; // shown in the middle of the ring
}

// Circular progress ring; turns orange once the target is reached
export function ProgressRing({ value, max, size = 112, strokeWidth = 6, children }: Props) {
    const radius = 40 - strokeWidth / 2 - 1;
    const circumference = 2 * Math.PI * radius;
    const progress = max > 0 ? Math.min(value / max, 1) : 0;
    return (
        <div className="ring-wrap" style={{ width: size, height: size }}>
            <svg className="ring" viewBox="0 0 80 80" aria-hidden="true">
                <circle className="ring-track" cx="40" cy="40" r={radius} strokeWidth={strokeWidth} />
                <circle
                    className={`ring-fill ${value >= max ? "complete" : ""}`}
                    cx="40" cy="40" r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - progress)}
                />
            </svg>
            {children && <div className="ring-center">{children}</div>}
        </div>
    );
}
