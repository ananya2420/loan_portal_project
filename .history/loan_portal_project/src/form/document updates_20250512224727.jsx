import React from 'react';
import { useNavigate } from 'react-router-dom';

const DocumentUpdates = ({ userData, setUserData }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    setUserData((prev) => ({ ...prev, documentUpdates: { isUpdated: true } }));
    navigate('/apply/updated-picture');
  };

  return (
    <div>
      <h2>Document Updates</h2>
      <p>Assuming documents are up-to-date.</p>
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default DocumentUpdates;
