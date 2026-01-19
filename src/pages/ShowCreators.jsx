import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { supabase } from '../client';

const ShowCreators = (props) => {
  const [creators, setCreators] = useState(props.data || []);

  useEffect(() => {
    let mounted = true;

    // If parent passed data, use it; otherwise fetch from Supabase
    if (props.data && props.data.length > 0) {
      setCreators(props.data);
      return;
    }

    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase fetch error:', error);
          return;
        }

        if (mounted) setCreators(data || []);
      } catch (err) {
        console.error('Unexpected error fetching creators:', err);
      }
    };

    fetchCreators();

    return () => {
      mounted = false;
    };
  }, [props.data]);

  return (
    <section className="ShowCreators">
      {/* Button to navigate to AddCreator page */}
      <Link to="/creators/new">
        <button className="add-button">➕ Add a New Creator</button>
      </Link>

      <div className="creators-grid">
        {creators && creators.length > 0 ? (
          creators.map((creator) => (
            <Card 
              key={creator.id}
              id={creator.id}
              name={creator.name}
              url={creator.url}
              description={creator.description}
              imageURL={creator.imageURL || creator.imageurl}
            />
          ))
        ) : (
          <h3>No Creators Found. Add your favorites to get started! 🚀</h3>
        )}
      </div>
    </section>
  );
};

export default ShowCreators;