import React, { useState, useEffect } from 'react';
import { useRoutes, Link } from 'react-router-dom';
import { supabase } from './client'; // Import the client you made
import './App.css';

// Import your pages
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';

function App() {
  const [creators, setCreators] = useState([]);

  // The asynchronous function to fetch data
  useEffect(() => {
    const fetchCreators = async () => {
      const { data } = await supabase
        .from('creators')
        .select()
        .order('created_at', { ascending: false });
      
      setCreators(data);
    };

    fetchCreators();
  }, []);

  // Define routes and pass the creators data to ShowCreators
  const element = useRoutes([
    {
      path: "/",
      element: <ShowCreators data={creators} />
    },
    {
      path: "/creators/new",
      element: <AddCreator />
    },
    {
      path: "/creators/:id",
      element: <ViewCreator />
    },
    {
      path: "/creators/:id/edit",
      element: <EditCreator />
    }
  ]);

  return (
    <div className="App">
       {/* ... your header/nav code ... */}
       {element}
    </div>
  );
}

export default App;
