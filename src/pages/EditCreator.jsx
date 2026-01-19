import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // 1. State for the form (initially empty)
    const [creator, setCreator] = useState({ name: "", url: "", description: "", imageURL: "" });

    // 2. Load the existing data into the form
    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase
                .from('creators')
                .select()
                .eq('id', id)
                .single();

            if (error) {
                console.log(error);
            } else {
                setCreator(data);
            }
        };
        fetchCreator();
    }, [id]);

    // 3. Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCreator((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 4. Update function
    const updateCreator = async (event) => {
        event.preventDefault();

        const { error } = await supabase
            .from('creators')
            .update({ 
                name: creator.name, 
                url: creator.url, 
                description: creator.description, 
                imageURL: creator.imageURL 
            })
            .eq('id', id);

        if (error) {
            console.log(error);
        } else {
            // Take user back to the gallery to see the changes
            navigate('/');
        }
    };

    // 5. Delete function
    const deleteCreator = async () => {
        const ok = window.confirm('Are you sure you want to delete this creator? This cannot be undone.');
        if (!ok) return;

        try {
            const { error } = await supabase
                .from('creators')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Delete error:', error);
                alert('Failed to delete creator. See console for details.');
                return;
            }

            // After deletion navigate back to the list
            navigate('/');
        } catch (err) {
            console.error('Unexpected delete error:', err);
            alert('An unexpected error occurred while deleting.');
        }
    };

    return (
        <div className="EditCreator">
            <h2>Edit Content Creator</h2>
            <form onSubmit={updateCreator}>
                <label>Name</label>
                <input type="text" name="name" value={creator.name} onChange={handleChange} required />

                <label>URL</label>
                <input type="url" name="url" value={creator.url} onChange={handleChange} required />

                <label>Description</label>
                <textarea name="description" value={creator.description} onChange={handleChange} required></textarea>

                <label>Image URL (Optional)</label>
                <input type="text" name="imageURL" value={creator.imageURL} onChange={handleChange} />

                <button type="submit" className="update-btn">Update Creator</button>
                <button type="button" className="delete-btn" onClick={deleteCreator} style={{ marginLeft: '8px', background: '#e53e3e', color: 'white' }}>
                    Delete Creator
                </button>
            </form>
        </div>
    );
};

export default EditCreator;