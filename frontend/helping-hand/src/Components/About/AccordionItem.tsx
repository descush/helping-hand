import React, { useState } from 'react';
import './About.css';
import '../../index.css';

export interface AccordionItemProps {
    items: {
        id: number;
        title: string;
        content: string;
    }[];
}

export function AccordionItem(props: AccordionItemProps) {
    const [activeIndex, setActiveIndex] = useState(-1);

    const toggleAccordion = (index: number) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    };

    return (
        <div className="accordion">
            {props.items.map((item, index) => (
                <div className="accordion-item" key={item.id}>
                    <button
                        id={`accordion-button-${item.id}`}
                        aria-expanded={index === activeIndex}
                        onClick={() => toggleAccordion(index)}
                    >
                        <span className="accordion-title">{item.title}</span>
                        <span className="icon" aria-hidden="true"></span>
                    </button>
                    {index === activeIndex && (
                        <div className="accordion-content">
                            <p>{item.content}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}