// Home.jsx
import React from "react";
import { SearchBar } from "../component/searchBar.jsx";
import { CategorySection } from "../component/categorySection.jsx";
import { Footer } from "../component/footer";
import "../../styles/home.css";

export const Home = () => {
    return (
        <div className="home">
            <header className="home-banner">
                <div className="banner-content">
                    <h1>Everything you need, all in one place, for your dream Icelandic adventure</h1>
                    <p>
                        As Iceland's largest travel agency, we search over 2000 travel service providers to find you the
                        best deals at the best prices—guaranteed.
                    </p>
                </div>
                <SearchBar />
            </header>

            <main>
                <CategorySection 
                    title="Top things to do in Iceland" 
                    category="things" 
                    items={[{
                        title: "Explore an Ice Cave",
                        image: "https://placehold.co/600x400",
                        link: "#"
                    }, {
                        title: "Find the Northern Lights",
                        image: "https://placehold.co/600x400",
                        link: "#"
                    }, {
                        title: "Golden Circle Adventure",
                        image: "https://placehold.co/600x400",
                        link: "#"
                    }]}
                />
                <CategorySection 
                    title="Best travel plans in Iceland" 
                    category="plans" 
                    items={[{
                        title: "8-Day Winter Tour",
                        image: "https://placehold.co/600x400",
                        link: "#"
                    }, {
                        title: "5-Day Northern Lights",
                        image: "https://placehold.co/600x400",
                        link: "#"
                    }, {
                        title: "7-Day Self-Drive Adventure",
                        image: "https://placehold.co/600x400",
                        link: "#"
                    }]}
                />
                <CategorySection 
                    title="Top tours in Iceland" 
                    category="tours" 
                    items={[{
                        title: "Crystal Ice Cave Tour",
                        image: "https://placehold.co/600x400",
                        link: "#"
                    }, {
                        title: "South Coast Tour",
                        image: "https://placehold.co/600x400",
                        link: "#"
                    }, {
                        title: "Golden Circle Tour",
                        image: "https://placehold.co/600x400",
                        link: "#"
                    }]}
                />
                <CategorySection 
                    title="Top attractions in Iceland" 
                    category="attractions" 
                    items={[{
                        title: "Blue Lagoon",
                        image: "https://placehold.co/600x400",
                        link: "#"
                    }, {
                        title: "Gullfoss Waterfall",
                        image: "https://placehold.co/600x400",
                        link: "#"
                    }, {
                        title: "Reykjavik City",
                        image: "https://placehold.co/600x400",
                        link: "#"
                    }]}
                />
                <CategorySection 
                    title="Best travel tips for Iceland" 
                    category="tips" 
                    items={[{
                        title: "Top 10 Things to Do",
                        image: "https://placehold.co/600x400",
                        link: "#"
                    }, {
                        title: "Northern Lights Guide",
                        image: "https://placehold.co/600x400",
                        link: "#"
                    }, {
                        title: "Packing for Iceland",
                        image: "https://placehold.co/600x400",
                        link: "#"
                    }]}
                />
                <CategorySection 
                    title="Travel Community" 
                    category="community" 
                    items={[{
                        title: "Travelers' Tips",
                        image: "https://placehold.co/600x400",
                        link: "#"
                    }, {
                        title: "Local Insights",
                        image: "https://placehold.co/600x400",
                        link: "#"
                    }, {
                        title: "Specialists' Advice",
                        image: "https://placehold.co/600x400",
                        link: "#"
                    }]}
                />
            </main>

            <Footer />
        </div>
    );
};
