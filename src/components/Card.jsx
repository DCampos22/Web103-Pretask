import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {
  return (
    <article className="card creator-card">
      {/* Show image if imageURL exists */}
  {props.imageURL && <img src={props.imageURL} alt={props.name} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />}
      
      <h3>{props.name}</h3>
      <p>{props.description}</p>
      
      <a href={props.url} target="_blank" rel="noreferrer">Visit Channel</a>
      <br /><br />

      <div className="button-group" style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', justifyContent: 'center' }}>
        <Link to={`/creators/${props.id}`}><button>View Details</button></Link>
        <Link to={`/creators/${props.id}/edit`}><button>Edit</button></Link>
      </div>
    </article>
  );
};

export default Card;