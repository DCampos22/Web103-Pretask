import React, { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

const AddCreator = () => {
    // 1. Setup state for form inputs
    const [creator, setCreator] = useState({ name: "", url: "", description: "", imageURL: "" });
    const navigate = useNavigate(); // For redirecting after submission

    // 2. Function to update state as user types
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCreator((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 3. Asynchronous function to add to database
    const addCreator = async (event) => {
        event.preventDefault(); // Stop page from refreshing

        const { error } = await supabase
            .from('creators')
            .insert({
                name: creator.name, 
                url: creator.url, 
                description: creator.description, 
                imageURL: creator.imageURL
            });

        if (error) {
            console.error('Error adding creator:', error);
            alert("Oops! Something went wrong.");
        } else {
            // Step 7 requirement: the new creator should appear in the list
            // Redirecting home will trigger a re-fetch in App.jsx
            navigate('/');
        }
    };

    return (
        <div className="AddCreator">
            <h2>Add a New Content Creator</h2>
            <form onSubmit={addCreator}>
                <label>Name</label>
                <input type="text" name="name" value={creator.name} onChange={handleChange} required />

                <label>URL (Channel/Page Link)</label>
                <input type="url" name="url" value={creator.url} onChange={handleChange} required />

                <label>Description</label>
                <textarea name="description" value={creator.description} onChange={handleChange} required></textarea>

                <label>Image URL (Optional)</label>
                <input type="text" name="imageURL" value={creator.imageURL} onChange={handleChange} placeholder="Link to an image..." />

                <button type="submit">Submit Creator</button>
            </form>
        </div>
    );
};

export default AddCreator;