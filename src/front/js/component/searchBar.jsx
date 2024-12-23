// searchBar.jsx
import React, { useState } from "react";
import "../../styles/searchBar.css";

export const SearchBar = () => {
  const [activeTab, setActiveTab] = useState("tours");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="search-bar">
      <div className="search-bar-tabs">
        <button
          className={`tab ${activeTab === "tours" ? "active" : ""}`}
          onClick={() => handleTabClick("tours")}
        >
          Tours
        </button>
        <button
          className={`tab ${activeTab === "cars" ? "active" : ""}`}
          onClick={() => handleTabClick("cars")}
        >
          Cars
        </button>
        <button
          className={`tab ${activeTab === "hotels" ? "active" : ""}`}
          onClick={() => handleTabClick("hotels")}
        >
          Hotels
        </button>
        <button
          className={`tab ${activeTab === "flights" ? "active" : ""}`}
          onClick={() => handleTabClick("flights")}
        >
          Flights
        </button>
      </div>

      <div className="search-bar-form">
        {activeTab === "tours" && (
          <>
            <input type="text" placeholder="Select starting location" className="form-input" />
            <input type="date" className="form-input" />
            <input type="date" className="form-input" />
            <select className="form-select">
              <option value="1">1 traveler</option>
              <option value="2">2 travelers</option>
              <option value="3">3 travelers</option>
              <option value="4">4 travelers</option>
            </select>
          </>
        )}

        {activeTab === "cars" && (
          <>
            <input type="text" placeholder="Pick-up location" className="form-input" />
            <input type="date" className="form-input" />
            <input type="date" className="form-input" />
            <select className="form-select">
              <option value="economy">Economy</option>
              <option value="4x4">4x4 / SUV</option>
              <option value="luxury">Luxury</option>
            </select>
          </>
        )}

        {activeTab === "hotels" && (
          <>
            <input type="text" placeholder="Destination" className="form-input" />
            <input type="date" className="form-input" />
            <input type="date" className="form-input" />
            <select className="form-select">
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
            </select>
          </>
        )}

        {activeTab === "flights" && (
          <>
            <input type="text" placeholder="From (City or Airport)" className="form-input" />
            <input type="text" placeholder="To (City or Airport)" className="form-input" />
            <input type="date" className="form-input" />
            <input type="date" className="form-input" />
          </>
        )}

        <button className="search-button">Search Now</button>
      </div>
    </div>
  );
};
