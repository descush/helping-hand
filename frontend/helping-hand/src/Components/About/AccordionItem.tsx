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
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleAccordion = (index: number) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    };

    return (
        <div className="accordion card">
            {props.items.map((item, index) => (
                <div className="accordion-item" key={item.id}>
                    <button
                        id={`accordion-button-${item.id}`}
                        aria-expanded={index === activeIndex}
                        aria-controls={`accordion-panel-${item.id}`}
                        onClick={() => toggleAccordion(index)}
                    >
                        <span className="accordion-title">{item.title}</span>
                        <span className="icon" aria-hidden="true"></span>
                    </button>
                    <div
                        className="accordion-content"
                        id={`accordion-panel-${item.id}`}
                        role="region"
                        aria-labelledby={`accordion-button-${item.id}`}
                        hidden={index !== activeIndex}
                    >
                        <div>
                            <p>{item.content}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
