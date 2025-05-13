//Application For Structure

import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpdatedPicture = ({ userData, setUserData }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    setUserData((prev) => ({ ...prev, updatedPicture: { uploaded: true } }));
    navigate('/review');
  };

  return (
    <div>
      <h2>Upload Updated Picture</h2>
      <p>Imagine file upload here</p>
      <button onClick={handleSubmit}>Go to Review</button>
    </div>
  );
};

export default UpdatedPicture;
