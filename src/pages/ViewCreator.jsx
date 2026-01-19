import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
    const { id } = useParams(); // This grabs the :id from the URL
    const [creator, setCreator] = useState(null);

    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase
                .from('creators')
                .select()
                .eq('id', id) // Filter the database for this specific ID
                .single(); // We only expect one result

            if (error) {
                console.log(error);
            } else {
                setCreator(data);
            }
        };
        fetchCreator();
    }, [id]);

    if (!creator) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="ViewCreator">
            {creator.imageURL && (
                <img src={creator.imageURL} alt={creator.name} style={{ maxWidth: '400px' }} />
            )}
            <h1>{creator.name}</h1>
            <p>{creator.description}</p>
            
            <a href={creator.url} target="_blank" rel="noreferrer">
                <button>Visit Channel</button>
            </a>

            <div className="actions">
                <Link to={`/creators/${id}/edit`}><button className="secondary">Edit</button></Link>
                <Link to="/"><button className="outline">Back to All Creators</button></Link>
            </div>
        </div>
    );
};

export default ViewCreator;