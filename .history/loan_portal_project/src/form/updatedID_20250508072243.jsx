//Application For Structure


import React, { useState } from 'react';
import incomeproof from "../assets/incomeproof.png";

const UpdatedPicture = () => {
  const [picture, setPicture] = useState('');

  const handleChangePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2>Updated Picture</h2>
      <input type="file" accept="image/*" onChange={handleChangePicture} />
      

      <div>
        <h4>Preview</h4>
        <img
          src={picture || incomeproof}
          alt="Updated Preview"
          style={{ width: '200px', height: 'auto' }}
        />
      </div>
    </div>
  );
};

export default UpdatedPicture;