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
                title: 'Why Hands??',
                content: 'Our hands go where we go, making this measuring method perfect in every setting. Hand size also generally corresponds with body size, making the portions personalized. This method is easy and nearly as accurate as measuring with a scale! Hand measuring is intended to be done by estimation, you do not need to hold the food in your hand to measure.'
            },
            {
                id: 2,
                title: 'How to Hand Measure',
                content: 'Serving sizes are as follows: Protein - one palm, Vegetable- one fist, Carb - one cupped hand, and Fat - one thumb. Servings per meal: 1-2 protein (6/day), 1-2 vegetables (4-6/day), 0-1 carbs (3/day), and 0-1 fats (3/day). Servings can vary based on goals. Some foods can be considered a combination of things, such as sweetened yogurt (carb and protein) or potato chips (carb and fat).'
            },
            {
                id: 3,
                title: 'Features',
                content: 'Sign in with Google. Add an entry for each food type at meals. Click More Info to see a full entry. Change between light and dark theme in settings.'
            },
            {
                id: 4,
                title: 'About the Creators',
                content: 'Jeremy Schlossman, Justin Green, Desiree Cushing, and Shelby Wright are FullStack Javascript Developers and Grand Circus graduates. This final project is created with React, express, and firebase.'
            }
        ]);
    }, []);

    const handleButtonClick = () => {
        window.open('https://www.precisionnutrition.com/hand-portion-faq', '_blank');
    };

    return (
        <div className="container">
            <h2>About Helping Hand</h2>
            <AccordionItem items={items} />
            <button className='abtBtn' onClick={handleButtonClick}>Learn More Here</button>
            <Link className='abtBtn' to={'/'}><button>Home</button></Link>
        </div>
    );
}