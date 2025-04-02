import React, { useEffect, useState } from "react";
import axios from "axios";
// import './Listing.css';
const Listing = () => {
    const [properties, setProperties] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedText, setEditedText] = useState("");


    useEffect(() => {
      fetchProperties();
    }, []);
    
  

    const fetchProperties = async () => {
        try {
            const response = await axios.get("http://localhost:3000/itemInserting");
            setProperties(response.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    const handleEditClick = (index) => {
      setEditIndex(index);
      setEditedText(properties[index].entry);
    };
  
    // Handle input change during editing
    const handleInputChange = (e) => {
      setEditedText(e.target.value);
    };
    
    const handleSaveClick = async (id) => {
      try {
        await axios.put(`http://localhost:3000/itemInserting/${id}`, {
          entry: editedText,
        });
        await fetchProperties();
        setEditIndex(null);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    };
    
    const handleDeleteClick = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/itemInserting/${id}`);
        fetchProperties();
      } catch (error) {
        console.error("Error deleting task:", error);
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
            <li key={property._id} className="todo-item">
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editedText}
                    onChange={handleInputChange}
                  />
                  <button onClick={() => handleSaveClick(property._id)}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="todo-text">{property.entry}</span>
                  <div className="todo-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteClick(property._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
      );
    };

export default Listing;