import React, { useState, useEffect } from 'react';
import { useRoutes, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { supabase } from './client'; // Import the client you made
import './App.css';
import heroImg from './assets/creatorverse.jpg';

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

  const location = useLocation();
  const showHeader = location.pathname === '/';

  const headerStyle = {
    padding: '3rem 1rem',
    backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    borderRadius: '10px',
    minHeight: '220px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  };

  return (
    <main className="container">
      {showHeader && (
        <header className="hero" style={headerStyle}>
          <h1 style={{ fontSize: '4rem', margin: '0.2rem 0', textTransform: 'lowercase', fontFamily: "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>
            creatorverse
          </h1>
          <p className="lead">Discover and save your favorite content creators.</p>
          
        </header>
      )}

      {/* routed pages (ShowCreators will render under the header on the landing route) */}
      {element}
    </main>
  );
}

export default App;
