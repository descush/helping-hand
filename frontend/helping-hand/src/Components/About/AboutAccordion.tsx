import React, { useEffect, useState } from 'react';
import { AccordionItem } from './AccordionItem';
import './About.css';
import { Link } from 'react-router-dom';

interface Item {
    id: number;
    title: string;
    content: string;
}

export function AboutAccordion() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        setItems([
            {
                id: 1,
                title: 'Why hands?',
                content: 'Our hands go where we go, making this measuring method perfect in every setting. Hand size also generally corresponds with body size, making the portions personalized. This method is easy and nearly as accurate as measuring with a scale! Hand measuring is intended to be done by estimation, you do not need to hold the food in your hand to measure.'
            },
            {
                id: 2,
                title: 'How to hand measure',
                content: 'Serving sizes are as follows: Protein - one palm, Vegetable- one fist, Carb - one cupped hand, and Fat - one thumb. Servings per meal: 1-2 protein (6/day), 1-2 vegetables (4-6/day), 0-1 carbs (3/day), and 0-1 fats (3/day). Servings can vary based on goals. Some foods can be considered a combination of things, such as sweetened yogurt (carb and protein) or potato chips (carb and fat).'
            },
            {
                id: 3,
                title: 'Features',
                content: 'Sign in with Google. Search for foods and add an entry with the number of hand portions you ate. Track your progress toward each daily target on the Today page. Change between light and dark theme in settings.'
            },
            {
                id: 4,
                title: 'About the creators',
                content: 'Jeremy Schlossman, Justin Green, Desiree Cushing, and Shelby Wright are FullStack Javascript Developers and Grand Circus graduates. This final project is created with React, express, and firebase.'
            }
        ]);
    }, []);

    return (
        <main className="page page-narrow">
            <header className="page-header">
                <span className="eyebrow">About</span>
                <h2>Nutrition, handled.</h2>
                <p>Helping Hand makes portion tracking simple: no scales, no apps full of numbers, just your hands.</p>
            </header>
            <AccordionItem items={items} />
            <div className="about-actions">
                <a
                    className="btn"
                    href="https://www.precisionnutrition.com/hand-portion-faq"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn more about hand portions ↗
                </a>
                <Link to={'/'} className="btn btn-secondary">Back to today</Link>
            </div>
        </main>
    );
}
