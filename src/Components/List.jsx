import React, { useState } from 'react';
import axios from 'axios';
import './List.css';
import Listing from './Listing';
export default function List() {
  const [property, setProperty] = useState({
    entry: ""
  })
  
  const handleChange = (e) =>{
    setProperty({...property, [e.target.name]: e.target.value })
  }
   
  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      await axios.post("https://todolist-backend-i4nj.onrender.com/itemInserting", property)
      alert("Property added successfully")
    }catch(error){
      alert("Failed to add propoerty")
    }
  }
  return (
    <div className="container">
      <h1>My To-Do List</h1>
      <div className="todo-form">
        <form onSubmit={handleSubmit}>
        <input type="text" name="entry" value={property.entry} onChange={handleChange} id="todo-input" placeholder="Enter a task" />
        <button type="submit" id="add-btn">Add</button>
        </form>
      </div>
    <Listing/>
    </div>
  );
}
