import React, { useEffect, useState } from "react";
import axios from "axios";

const List = () => {
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
            <h2>To Do List</h2>
            {properties.length === 0 ? (
                <p>No properties found.</p>
            ) : (
                properties.map((property, index) => (
                    <div key={index} className="card">
                        <p><strong>To Do:</strong> ${property.entry}</p>
                    </div>
                ))
            )} 
        </div>
    );
};

export default Listing;