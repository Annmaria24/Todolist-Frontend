import React, { useEffect, useState } from "react";
import axios from "axios";
// import './Listing.css';
const Listing = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetchProperties();
    });

    const fetchProperties = async () => {
        try {
            const response = await axios.get("http://localhost:3000/itemInserting");
            setProperties(response.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    return (
        <div>
          <h2>To-Do List</h2>
          <ul className="todo-list">
            {properties.length === 0 ? (
              <p>No tasks found.</p>
            ) : (
              properties.map((property, index) => (
                <li key={index} className="todo-item">
                  <span className="todo-text">{property.entry}</span>
                  <div className="todo-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      );
    };

export default Listing;