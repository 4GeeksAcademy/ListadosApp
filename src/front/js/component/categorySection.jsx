// CategorySection.jsx
import React from "react";
import "../../styles/categorySection.css";
import { dummyData } from "../component/dummyData";

export const CategorySection = ({ title, category }) => {
    const items = dummyData[category] || [];

    return (
        <section className="category-section">
            <h2 className="category-title">{title}</h2>
            <div className="category-items">
                {items.map((item, index) => (
                    <div key={index} className="category-card">
                        <img src={item.image} alt={item.title} className="category-image" />
                        <div className="category-info">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <span className="category-price">{item.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};