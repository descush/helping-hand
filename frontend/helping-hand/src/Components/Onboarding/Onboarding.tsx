import { useEffect, useRef, useState } from 'react';
import { categories } from '../../categories';
import logo from '../../Assets/logo.png';
import './Onboarding.css';

const ONBOARDED_KEY = 'hh-onboarded';

export function hasOnboarded() {
    try {
        return localStorage.getItem(ONBOARDED_KEY) === 'true';
    } catch {
        return true;
    }
}

function markOnboarded() {
    try {
        localStorage.setItem(ONBOARDED_KEY, 'true');
    } catch { }
}

const steps = [
    {
        icon: logo,
        title: 'Welcome to Helping Hand',
        text: "Instead of weighing food or counting calories, you'll measure portions with your hand. It takes about 30 seconds to learn.",
    },
    ...categories.map(category => ({
        icon: category.icon,
        title: `${category.servingType} = ${category.label}`,
        text: {
            protein: 'One palm-sized portion (size and thickness) of meat, fish, eggs, or tofu. Aim for about 6 a day.',
            veggies: 'One fist-sized portion of vegetables. Aim for 4–6 a day, so 1–2 at each meal.',
            carbs: 'One cupped handful of grains, starches, or fruit. Aim for about 3 a day.',
            fat: 'One thumb-sized portion of oils, nuts, cheese, or avocado. Aim for about 3 a day.',
        }[category.key],
    })),
    {
        icon: logo,
        title: "You're all set",
        text: 'Tap +1 on any card to log a quick portion, or search for a specific food. Your rings fill up as you go.',
    },
];

export function Onboarding({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState(0);
    const primaryButton = useRef<HTMLButtonElement>(null);
    const isLast = step === steps.length - 1;

    function finish() {
        markOnboarded();
        onClose();
    }

    useEffect(() => {
        primaryButton.current?.focus();
    }, [step]);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') finish();
        }
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const current = steps[step];

    return (
        <div className='modal-backdrop' onClick={finish}>
            <div
                className='modal card'
                role='dialog'
                aria-modal='true'
                aria-labelledby='onboarding-title'
                onClick={e => e.stopPropagation()}
            >
                <div className='onboarding-step' key={step}>
                    <div className='hand-icon xl'><img src={current.icon} alt='' /></div>
                    <h2 id='onboarding-title'>{current.title}</h2>
                    <p>{current.text}</p>
                </div>

                <div className='step-dots' aria-label={`Step ${step + 1} of ${steps.length}`}>
                    {steps.map((_, i) => <span key={i} className={i === step ? 'active' : ''} />)}
                </div>

                <div className='modal-actions'>
                    {step > 0
                        ? <button className='btn-secondary' onClick={() => setStep(step - 1)}>Back</button>
                        : <button className='btn-ghost' onClick={finish}>Skip</button>}
                    <button ref={primaryButton} onClick={() => isLast ? finish() : setStep(step + 1)}>
                        {isLast ? "Let's go" : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
}
